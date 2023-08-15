import initMongoose from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";
import { TrainerReviewType } from "@/model/trainerDataSubSchemas/trainerReview";
import TrainerData, {
  PopulatedTrainerDataType,
  TrainerDataType,
} from "@/model/trainerData";
import { HydratedDocument } from "mongoose";
import User, { TrainerType } from "@/model/user";

export async function POST(req: NextRequest, res: NextResponse) {
  const session = await getServerSession(authOptions);
  console.log("session: ", session, "here");

  try {
    await initMongoose();
  } catch (e) {
    console.log("Failed connecting to database: ", e);
    return NextResponse.json(
      { message: "Failed connecting to database" },
      { status: 500 }
    );
  }

  const { userId, description, rating, trainerDataId } = await req.json();

  if (!userId || !description || !rating) {
    return NextResponse.json(
      { message: "Wszystkie pola są wymagane" },
      { status: 400 }
    );
  }

  if (session?.user?._id !== userId) {
    return NextResponse.json(
      { message: "Zaloguj się aby dodać opinię" },
      { status: 400 }
    );
  }

  try {
    const reviewProps: Omit<TrainerReviewType, "_id" | "createdAt"> = {
      rating,
      description,
      username: session?.user.username || "",
      userAvatar: session?.user.image || undefined,
      userId: userId,
      isTrainer: session?.user.isTrainer || false,
    };
    const trainerData: HydratedDocument<PopulatedTrainerDataType> | null =
      await TrainerData.findOne({ _id: trainerDataId }).exec();
    const trainer: HydratedDocument<TrainerType> | null = await User.findById(
      trainerData?.userId
    );

    if (!trainerData || !trainer) {
      return NextResponse.json(
        { message: "Nie ma takiego trenera" },
        { status: 400 }
      );
    }

    let hasAlreadyPostedAnOpinion: boolean = false;
    trainerData.reviews.forEach((review) => {
      if (JSON.stringify(review.userId._id) === JSON.stringify(userId)) {
        hasAlreadyPostedAnOpinion = true;
      }
    });

    if (hasAlreadyPostedAnOpinion) {
      return NextResponse.json(
        {
          message:
            "Nie możesz dodać więcej niż jednej opinii na temat jednego trenera",
        },
        { status: 400 }
      );
    }

    // typescript is salty about _id field but mongoose creates it automatically
    // @ts-expect-error
    trainerData.reviews = [...trainerData.reviews, reviewProps];
    trainer.rating =
      trainerData.reviews
        .map((review) => review.rating)
        .reduce(
          (accumulator: number, currentValue: number) =>
            accumulator + currentValue
        ) / trainerData.reviews.length;

    await Promise.all([trainerData.save(), trainer.save()]);
    return NextResponse.json({}, { status: 200 });
  } catch (e) {
    console.log("Review error: ", e);
    if (e instanceof Error) {
      return NextResponse.json({ message: e.message }, { status: 400 });
    }
    return NextResponse.json({}, { status: 400 });
  }
}

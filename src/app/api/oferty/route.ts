import User from "@/model/user";
import initMongoose from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import TrainerData, {
  PopulatedTrainerDataType,
  TrainerDataType,
  TrainerOfferType,
} from "@/model/trainerData";
import { HydratedDocument } from "mongoose";

interface reqType {
  name: string;
  description: string;
  userId: string;
  price: number;
  duration?: string;
  amountOfWorkouts?: number;
  pricePer?: string;
}

export async function POST(req: NextRequest, res: NextResponse) {
  await initMongoose();

  const {
    userId,
    name,
    price,
    description,
    duration,
    amountOfWorkouts,
    pricePer,
  }: reqType = await req.json();
  if (!userId) {
    return NextResponse.json({
      status: 400,
      message: "Nie znaleziono trenera z tymi danymi",
    });
  }
  const trainerData: null | HydratedDocument<TrainerDataType> =
    await TrainerData.findOne({ userId: userId }).exec();

  if (!trainerData) {
    return NextResponse.json({
      status: 400,
      message: "Nie znaleziono trenera z tymi danymi",
    });
  }

  const newOffer: TrainerOfferType = {
    offerTitle: name,
    offerDescription: description,
    offerPrice: price.toString(),
  };
  if (duration?.length || !!amountOfWorkouts || pricePer?.length) {
    newOffer.offerFields = {};
  }
  if (duration?.length) {
    // @ts-expect-error
    newOffer.offerFields.duration = duration;
  }
  if (!!amountOfWorkouts) {
    // @ts-expect-error
    newOffer.offerFields.amountOfWorkouts = amountOfWorkouts;
  }
  if (pricePer?.length) {
    // @ts-expect-error
    newOffer.offerFields.pricePer = pricePer;
  }

  try {
    trainerData.offers = [...trainerData.offers, newOffer];
    await trainerData.save();

    return NextResponse.json({}, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      { message: "Błąd podczas dodawania oferty" },
      { status: 400 }
    );
  }
}

// export async function PATCH(req: Request, res: Response) {
//   try {
//     await initMongoose();
//   } catch (e) {
//     console.log("Failed connecting to database: ", e);
//     return NextResponse.json(
//       { message: "Failed connecting to database" },
//       { status: 500 }
//     );
//   }

//   try {
//     const users = await User.find({}).exec();
//     return NextResponse.json(users, { status: 200 });
//   } catch (e) {
//     return NextResponse.json(
//       { message: "Błąd wczytywania użytkowników z bazy danych" },
//       { status: 400 }
//     );
//   }
// }

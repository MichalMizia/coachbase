import { TrainerDataType } from "./../../../../model/trainerData";
import TrainerData from "@/model/trainerData";
import initMongoose from "@/lib/db";
import PendingRequest from "@/model/pendindRequest";
import User, { TrainerType, UserRolesType } from "@/model/user";
import { NextRequest, NextResponse } from "next/server";
import mongoose, { HydratedDocument, ObjectId } from "mongoose";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    await initMongoose();
  } catch (e) {
    console.log("Failed connecting to database: ", e);
    return NextResponse.json(
      {
        message: "Failed connecting to database",
      },
      {
        status: 400,
      }
    );
  }

  const {
    email,
    roles,
    summary,
    city,
    slug,
  }: {
    email: string;
    roles: UserRolesType[];
    summary: string;
    slug: string;
    city: string;
  } = await req.json();

  try {
    const user: HydratedDocument<TrainerType> = await User.findOneAndUpdate(
      { email: email },
      {
        roles: roles,
        summary: summary,
        tags: roles,
        city: city,
        slug: slug,
        isTrainer: true,
      }
    ).exec();
    const id = new mongoose.Types.ObjectId(user._id);
    const TrainerDataProps: TrainerDataType = {
      userSlug: slug,
      userId: id,
      socialMedia: {
        instagram: "",
        facebook: "",
        email: email,
      },
      offers: [],
      testimonials: [],
      faq: [],
      reviews: [],
      images: [],
    };
    await Promise.all([
      PendingRequest.deleteOne({ email: email }).lean().exec(),
      TrainerData.create(TrainerDataProps),
    ]);
  } catch (e) {
    return NextResponse.json(
      {
        message: "Błąd przy zapisywaniu konta",
      },
      {
        status: 400,
      }
    );
  }

  return NextResponse.json({
    status: 200,
  });
}

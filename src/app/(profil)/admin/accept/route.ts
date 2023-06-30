import { TrainerDataType } from "./../../../../model/trainerData";
import TrainerData from "@/model/trainerData";
import initMongoose from "@/lib/db/db";
import PendingRequest from "@/model/pendindRequest";
import User, { UserRolesType } from "@/model/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    await initMongoose();
  } catch (e) {
    console.log("Failed connecting to database: ", e);
    return NextResponse.json({
      status: 400,
      message: "Failed connecting to database",
    });
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
    const user = await User.findOneAndUpdate(
      { email: email },
      {
        roles: roles,
        summary: summary,
        city: city,
        slug: slug,
        isTrainer: true,
      }
    ).exec();
    const TrainerDataProps: TrainerDataType = {
      userSlug: slug,
      heroSection: {
        content: summary,
      },
      socialMedia: {
        instagram: "",
        facebook: "",
        email: email,
      },
      tags: roles,
    };
    await Promise.all([
      PendingRequest.deleteOne({ email: email }),
      TrainerData.create(TrainerDataProps),
    ]);
  } catch (e) {
    return NextResponse.json({
      status: 400,
      message: "Błąd przy zapisywaniu konta",
    });
  }

  return NextResponse.json({
    status: 200,
  });
}

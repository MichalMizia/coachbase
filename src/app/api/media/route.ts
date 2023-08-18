import initMongoose from "@/lib/db";
import TrainerData from "@/model/trainerData";
import User from "@/model/user";
import { NextRequest, NextResponse } from "next/server";

interface reqType {
  instagram: string | null;
  facebook: string | null;
  email: string | null;
  city: string;
  tags: string[];
  slug: string;
}

export async function POST(req: NextRequest) {
  const { instagram, facebook, email, city, tags, slug }: reqType =
    await req.json();
  console.log(instagram);

  if (
    typeof instagram !== "string" ||
    typeof facebook !== "string" ||
    typeof email !== "string" ||
    !Array.isArray(tags)
  ) {
    return NextResponse.json(
      {
        message: "Incorrect request types",
      },
      {
        status: 400,
      }
    );
  }

  try {
    await initMongoose();
  } catch (e) {
    console.log("Failed connecting to database: ", e);
    return NextResponse.json(
      {
        message: "Failed connecting to database",
      },
      { status: 400 }
    );
  }

  const TrainerDataQuery: any = { socialMedia: {} };
  if (instagram?.length) {
    TrainerDataQuery.socialMedia.instagram = instagram;
  }
  if (facebook?.length) {
    TrainerDataQuery.socialMedia.facebook = facebook;
  }
  if (email?.length) {
    TrainerDataQuery.socialMedia.email = email;
  }
  const isUpdatingTrainerData =
    instagram?.length || facebook?.length || email?.length;

  let userQuery: any = {};
  if (city) {
    userQuery.city = city;
  }
  if (tags?.length) {
    userQuery.tags = tags;
  }

  console.log(TrainerDataQuery);

  if (isUpdatingTrainerData) {
    try {
      await Promise.all([
        TrainerData.findOneAndUpdate({ userSlug: slug }, TrainerDataQuery),
        User.findOneAndUpdate({ slug: slug }, userQuery),
      ]);
    } catch (e) {
      return NextResponse.json({}, { status: 400 });
    }

    return NextResponse.json({}, { status: 200 });
  } else {
    try {
      await User.findOneAndUpdate({ slug: slug }, userQuery);
    } catch (e) {
      return NextResponse.json({}, { status: 400 });
    }
    return NextResponse.json({}, { status: 200 });
  }
}

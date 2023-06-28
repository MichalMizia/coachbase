import {
  TrainerDataType,
  TrainerMediaType,
} from "./../../../model/trainerData";
import initMongoose from "@/lib/db/db";
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

  const isUpdatingCity = city && city.length;

  if (
    typeof instagram !== "string" ||
    typeof facebook !== "string" ||
    typeof email !== "string" ||
    !Array.isArray(tags)
  ) {
    return NextResponse.json({
      status: 400,
      message: "Incorrect request types",
    });
  }

  try {
    await initMongoose();
  } catch (e) {
    console.log("Failed connecting to database: ", e);
    return NextResponse.json({
      status: 400,
      message: "Failed connecting to database",
    });
  }

  let res = null;
  const updatedMedia: TrainerMediaType = {
    socialMedia: {
      instagram: instagram,
      facebook: facebook,
      email: email,
    },
    tags: tags,
  };

  if (isUpdatingCity) {
    try {
      await Promise.all([
        TrainerData.findOneAndUpdate({ userSlug: slug }, updatedMedia),
        User.findOneAndUpdate({ slug: slug }, { city: city }),
      ]);
    } catch (e) {
      return NextResponse.json({ status: 400 });
    }

    return NextResponse.json({ status: 200 });
  }

  try {
    await TrainerData.findOneAndUpdate({ userSlug: slug }, updatedMedia);
  } catch (e) {
    return NextResponse.json({ status: 400 });
  }

  return NextResponse.json({ status: 200 });
}

import initMongoose from "@/lib/db/db";
import PendingRequest from "@/model/pendindRequest";
import User, { UserRolesType } from "@/model/user";
import { NextRequest, NextResponse } from "next/server";
import slugify from "slugify";

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

  console.log("Mongoose connected while registering a trainer");
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
    await User.updateOne(
      { email: email },
      {
        roles: roles,
        summary: summary,
        city: city,
        slug: slug,
        isTrainer: true,
      }
    );
    await PendingRequest.deleteOne({ email: email });

    return NextResponse.json({
      status: 200,
    });
  } catch (e) {
    return NextResponse.json({
      status: 400,
      message: "Błąd przy zapisywaniu konta",
    });
  }
}

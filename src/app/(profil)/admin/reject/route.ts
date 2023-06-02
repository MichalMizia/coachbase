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

  console.log("Mongoose connected while registering a trainer");
  const {
    email,
    roles,
    summary,
  }: { email: string; roles: UserRolesType[]; summary: string } =
    await req.json();
  try {
    await User.updateOne(
      { email: email },
      { roles: roles, summary: summary, isTrainer: true }
    );
    await PendingRequest.deleteOne({ email: email });
  } catch (e) {
    return NextResponse.json({
      status: 400,
      message: "Błąd przy tworzeniu konta",
    });
  }
}

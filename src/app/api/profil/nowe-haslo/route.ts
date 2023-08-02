import User, { IUser } from "@/model/user";
import initMongoose from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { HydratedDocument } from "mongoose";
const bcrypt = require("bcrypt");

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    await initMongoose();
  } catch (e) {
    console.log("Failed connecting to database: ", e);
    return NextResponse.json(
      { message: "Failed connecting to database" },
      { status: 500 }
    );
  }

  const { userId, newPassword } = await req.json();

  if (!userId || !newPassword) {
    return NextResponse.json({}, { status: 400 });
  }

  try {
    const user: HydratedDocument<IUser> | null = await User.findById(userId);
    if (!user) {
      return NextResponse.json({}, { status: 400 });
    }

    const hashedPwd = await bcrypt.hash(newPassword, 10);
    user.password = hashedPwd;
    await user.save();
  } catch (e) {
    console.log(e);
    return NextResponse.json({}, { status: 400 });
  }
  return NextResponse.json({ message: "success" }, { status: 200 });
}

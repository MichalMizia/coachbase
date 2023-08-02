import User, { IUser } from "@/model/user";
import initMongoose from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { sendResetPasswordEmail } from "./sendResetPasswordEmail";

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

  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({}, { status: 400 });
  }

  try {
    const user: IUser | null = await User.findOne({ email: email });
    if (!user) {
      return NextResponse.json({}, { status: 400 });
    }

    // const key: jwt.Secret = {}
    const secret: string | undefined = process.env.RESET_TOKEN_SECRET;
    if (!secret) {
      throw new Error("Reset token secret key was not defined");
    }
    const user_token = jwt.sign({ id: user._id }, secret, {
      expiresIn: "1h",
    });

    const url = `${process.env.BASE_URL}reset-hasla/${user_token}/${user._id}`;
    console.log("Here in email reset: ", email, user_token);

    await sendResetPasswordEmail(email, url);
  } catch (e) {
    console.log(e);
    return NextResponse.json({}, { status: 400 });
  }
  return NextResponse.json({ message: "success" }, { status: 200 });
}

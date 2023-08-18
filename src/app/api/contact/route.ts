import User, { IUser } from "@/model/user";
import initMongoose from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { sendContactEmail } from "./sendContactEmail";
import axios from "axios";

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

  const { email, username, message, token } = await req.json();

  if (!email || !username || !message) {
    return NextResponse.json({}, { status: 400 });
  }

  const response = await axios.post(
    `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`
  );

  if (!response.data.success) {
    return NextResponse.json(
      { message: "Wypełnij poprawnie recaptche." },
      { status: 400 }
    );
  }

  try {
    await sendContactEmail({
      username: username,
      email: email,
      message: message,
    });
  } catch (e) {
    console.log(e);
    return NextResponse.json({}, { status: 400 });
  }
  return NextResponse.json({ message: "success" }, { status: 200 });
}

import initMongoose from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";
import EmailList from "@/model/emailList";
import { sanitize } from "isomorphic-dompurify";

interface PostRequestType {
  email: string;
}

export async function POST(req: NextRequest, res: NextResponse) {
  await initMongoose();

  const session = await getServerSession(authOptions);

  const { email }: PostRequestType = await req.json();
  if (!email) {
    return NextResponse.json({
      status: 400,
      message: "Email jest wymagany",
    });
  }

  const duplicateEmail = await EmailList.findOne({ email: email })
    .lean()
    .exec();

  if (duplicateEmail) {
    return NextResponse.json({
      status: 409,
      message: "Ten email jest już zapisany do newslettera",
    });
  }

  try {
    await EmailList.create({
      email: sanitize(email),
      isTrainer: session?.user?.isTrainer || false,
    });

    return NextResponse.json({}, { status: 200 });
  } catch (e) {
    return NextResponse.json({ status: 400 });
  }
}

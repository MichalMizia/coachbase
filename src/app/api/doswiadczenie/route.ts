import { HydratedDocument } from "mongoose";
import initMongoose from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import TrainerData, { TrainerDataType } from "@/model/trainerData";
import { sanitize } from "isomorphic-dompurify";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";

interface reqType {
  userId: string;
  content: string;
}

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

  const { userId, content }: reqType = await req.json();

  if (!userId) {
    return NextResponse.json(
      {
        message: "Ten użytkownik nie istnieje",
      },
      { status: 400 }
    );
  }

  const session = await getServerSession(authOptions);

  if (session?.user?._id !== userId) {
    return NextResponse.json(
      { message: "Nie masz uprawnień do zmiany opisu" },
      { status: 403 }
    );
  }

  if (!content.length) {
    return NextResponse.json(
      {
        message: "Opis jest wymagany",
      },
      { status: 400 }
    );
  }

  try {
    const trainer: HydratedDocument<TrainerDataType> | null =
      await TrainerData.findOne({
        userId: userId,
      });
    if (!trainer) {
      return NextResponse.json(
        {
          message: "Ten trener nie istnieje",
        },
        { status: 400 }
      );
    }

    trainer.experience = sanitize(content);

    await trainer.save();

    return NextResponse.json({}, { status: 200 });
  } catch (e) {
    console.log("api error: ", e);
    return NextResponse.json(
      { message: "Błąd podczas zmieniania opisu" },
      { status: 400 }
    );
  }
}

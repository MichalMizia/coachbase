import User from "@/model/user";
import initMongoose from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import TrainerData, { TrainerDataType } from "@/model/trainerData";
import { HydratedDocument } from "mongoose";

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

  const { slug } = await req.json();
  if (!slug) {
    return NextResponse.json({
      status: 400,
      message: "Nie znaleziono trenera z tymi danymi",
    });
  }
  const trainerData: null | HydratedDocument<TrainerDataType> =
    await TrainerData.findOne({ slug: slug });
  if (!trainerData) {
    return NextResponse.json({
      status: 400,
      message: "Nie znaleziono trenera z tymi danymi",
    });
  }

  try {
  } catch (e) {
    return NextResponse.json(
      { message: "Błąd podczas dodawania oferty" },
      { status: 400 }
    );
  }
}
export async function PATCH(req: Request, res: Response) {
  try {
    await initMongoose();
  } catch (e) {
    console.log("Failed connecting to database: ", e);
    return NextResponse.json(
      { message: "Failed connecting to database" },
      { status: 500 }
    );
  }

  try {
    const users = await User.find({}).exec();
    return NextResponse.json(users, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      { message: "Błąd wczytywania użytkowników z bazy danych" },
      { status: 400 }
    );
  }
}

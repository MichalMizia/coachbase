import User from "@/model/user";
import initMongoose from "@/lib/db/db";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: Response) {
  try {
    await initMongoose();
  } catch (e) {
    console.log("Failed connecting to database: ", e);
    return NextResponse.json(
      { message: "Failed connecting to database" },
      { status: 500 }
    );
  }

  console.log("Mongoose connected");
  //   return NextResponse.json({ message: "connected" }, { status: 200 });
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

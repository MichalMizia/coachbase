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

  const { email }: { email: string } = await req.json();
  try {
    await PendingRequest.deleteOne({ email: email });

    return NextResponse.json({ status: 200 });
  } catch (e) {
    return NextResponse.json({
      status: 400,
      message: "Błąd przy tworzeniu konta",
    });
  }
}

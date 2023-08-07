import initMongoose from "@/lib/db";
import { isStringUnsafe } from "@/lib/utils";
import User, { IUser } from "@/model/user";
import { HydratedDocument } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest, res: NextResponse) {
  try {
    await initMongoose();
  } catch (e) {
    console.log("Failed connecting to database: ", e);
    return NextResponse.json(
      { message: "Failed connecting to database" },
      { status: 500 }
    );
  }

  const { userId, username, email, defaultEmail, defaultName } =
    await req.json();

  try {
    const user: HydratedDocument<IUser> | null = await User.findById(
      userId
    ).exec();

    if (!user) {
      return NextResponse.json(
        { message: "Nie znaleziono takiego użytkownika" },
        { status: 400 }
      );
    }

    const duplicateUsername = await User.findOne({ username: username })
      .lean()
      .exec();
    if (duplicateUsername && duplicateUsername.email !== defaultEmail) {
      return NextResponse.json(
        { message: "Konto z tą nazwą już istnieje" },
        { status: 409 }
      );
    }
    const duplicateEmail = await User.findOne({ email: email }).lean().exec();
    if (duplicateEmail && duplicateEmail.username !== defaultName) {
      return NextResponse.json(
        {
          message: "Do tego adresu email przypisane jest już konto",
        },
        { status: 409 }
      );
    }

    if (isStringUnsafe(username)) {
      return NextResponse.json(
        { message: "No hack here buddy" },
        { status: 400 }
      );
    }

    user.email = email;
    user.username = username;

    await user.save();
    return NextResponse.json({}, { status: 200 });
  } catch (e) {
    return NextResponse.json({}, { status: 400 });
  }
}

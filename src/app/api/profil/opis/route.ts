import User, { TrainerType } from "@/model/user";
import initMongoose from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { sanitize } from "isomorphic-dompurify";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";
import { HydratedDocument } from "mongoose";

interface reqType {
  id?: string;
  summary?: string;
}

export async function POST(req: NextRequest, res: NextResponse) {
  await initMongoose();

  const { id, summary }: reqType = await req.json();

  const session = await getServerSession(authOptions);

  if (!id) {
    return NextResponse.json(
      {
        message: "Ten użytkownik nie istnieje",
      },
      { status: 400 }
    );
  }
  if (session?.user?._id !== id) {
    return NextResponse.json(
      { message: "Nie masz uprawnień do zmiany opisu" },
      { status: 403 }
    );
  }

  if (!summary?.length) {
    return NextResponse.json(
      {
        message: "Opis jest wymagany",
      },
      { status: 400 }
    );
  }

  try {
    const trainer: HydratedDocument<TrainerType> | null = await User.findOne({
      isTrainer: true,
      _id: id,
    });
    console.log(trainer);

    if (!trainer) {
      return NextResponse.json(
        {
          message: "Nie ma takiego trenera",
        },
        { status: 400 }
      );
    }

    trainer.summary = sanitize(summary);
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
// export async function PATCH(req: Request, res: Response) {
//   try {
//     await initMongoose();
//   } catch (e) {
//     console.log("Failed connecting to database: ", e);
//     return NextResponse.json(
//       { message: "Failed connecting to database" },
//       { status: 500 }
//     );
//   }

//   try {
//     const users = await User.find({}).exec();
//     return NextResponse.json(users, { status: 200 });
//   } catch (e) {
//     return NextResponse.json(
//       { message: "Błąd wczytywania użytkowników z bazy danych" },
//       { status: 400 }
//     );
//   }
// }

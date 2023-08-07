import { HydratedDocument } from "mongoose";
import User, { TrainerType } from "@/model/user";
import initMongoose from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import TrainerData, { TrainerDataType } from "@/model/trainerData";
import { sanitize } from "isomorphic-dompurify";

interface reqType {
  slug?: string;
  summary: string | null;
  bio: string | null;
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

  const { slug, summary, bio }: reqType = await req.json();

  if (!slug) {
    return NextResponse.json({
      status: 400,
      message: "Nie znaleziono użytkownika w bazie danych",
    });
  }

  try {
    if (summary?.length && bio?.length) {
      const [trainer, trainerData]: [
        HydratedDocument<TrainerType>,
        HydratedDocument<TrainerDataType>
      ] = await Promise.all([
        User.findOne({ slug: slug }),
        TrainerData.findOne({ userSlug: slug }),
      ]);

      if (!trainer || !trainerData) {
        return NextResponse.json({
          status: 400,
          message: "Nie znaleziono użytkownika w bazie danych",
        });
      }

      trainer.summary = sanitize(summary);
      trainerData.bio = sanitize(bio);
      await Promise.all([trainer.save(), trainerData.save()]);

      return NextResponse.json(
        { message: "Pomyślnie zmieniono opisy" },
        { status: 200 }
      );
    } else if (bio?.length) {
      // when the user is editing only the llong bio
      const trainerData: HydratedDocument<TrainerDataType> | null =
        await TrainerData.findOne({ userSlug: slug });
      if (!trainerData) {
        return NextResponse.json({
          status: 400,
          message: "Nie znaleziono użytkownika w bazie danych",
        });
      }

      trainerData.bio = sanitize(bio);
      console.log("Profile API: ", slug, summary, bio);
      await trainerData.save();

      return NextResponse.json(
        { message: "Pomyślnie zmieniono długi opis" },
        { status: 200 }
      );
    } else if (summary && summary.length) {
      // when the user is editing only the short bio
      // @ts-expect-error
      const trainer: HydratedDocument<TrainerType> = await User.find({
        slug: slug,
        isTrainer: true,
      });
      if (!trainer) {
        return NextResponse.json({
          status: 400,
          message: "Nie znaleziono użytkownika w bazie danych",
        });
      }

      trainer.summary = sanitize(summary);
      await trainer.save();

      return NextResponse.json(
        { message: "Pomyślnie zmieniono krótki opis" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Opisy są wymagane" },
        { status: 400 }
      );
    }
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

// utils
import initMongoose from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import mongoose, { Document } from "mongoose";
// auth
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";
import News, { NewsType } from "@/model/news";

export async function POST(req: NextRequest, res: NextResponse) {
  const session = await getServerSession(authOptions);

  const { userId, content, title, photoUrl } = await req.json();
  if (!userId) {
    return NextResponse.json(
      {
        message: "Ten użytkownik nie istnieje",
      },
      { status: 400 }
    );
  }
  if (session?.user?._id !== userId) {
    return NextResponse.json(
      { message: "Nie masz uprawnień do dodania artykułu" },
      { status: 403 }
    );
  }

  try {
    await initMongoose();

    const postOptions: Omit<NewsType, "updatedAt" | "createdAt" | "_id"> = {
      userId: new mongoose.Types.ObjectId(userId),
      title: title,
      content: content,
      photoUrl: photoUrl.length ? photoUrl : undefined,
      impressions: 0,
    };
    const newPost = await News.create(postOptions);

    if (!newPost) {
      return NextResponse.json({}, { status: 400 });
    }

    return NextResponse.json({ id: newPost._id }, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json({}, { status: 400 });
  }
}
export async function DELETE(req: NextRequest, res: NextResponse) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({}, { status: 403 });
  }

  const { id, userId } = await req.json();
  if (!id) {
    return NextResponse.json(
      {
        message: "Ten post nie istnieje w aktulnościach",
      },
      {
        status: 400,
      }
    );
  }

  if (userId !== session.user._id) {
    return NextResponse.json(
      {
        message: "Nie masz uprawnień do usunięcia tego posta",
      },
      {
        status: 403,
      }
    );
  }

  try {
    await initMongoose();

    const deleted: Document<NewsType> | null = await News.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json(
        {
          message: "Taki post nie istnieje w aktualnościach",
        },
        {
          status: 400,
        }
      );
    }

    return NextResponse.json({}, { status: 200 });
  } catch (e) {
    return NextResponse.json({}, { status: 400 });
  }
}
// export async function PATCH(req: NextRequest, res: NextResponse) {
//   try {
//     await initMongoose();
//   } catch (e) {
//     console.log("Failed connecting to database: ", e);
//     return NextResponse.json(
//       { message: "Failed connecting to database" },
//       { status: 500 }
//     );
//   }

//   const { newsId, photoUrl, title, summary, content, published, tags } =
//     await req.json();

//   console.log("tags: ", tags, title, summary);

//   if (
//     !title?.length ||
//     !summary.length ||
//     !content?.length ||
//     !Array.isArray(tags)
//   ) {
//     return NextResponse.json(
//       { message: "Tytuł, podsumowanie i kontent artykułu są wymagane" },
//       { status: 400 }
//     );
//   }

//   const news: HydratedDocument<NewsType> = await News.findById(newsId).exec();

//   if (!news) {
//     return NextResponse.json(
//       { message: "Nie ma takiego artykułu" },
//       { status: 400 }
//     );
//   }

//   news.title = title;
//   news.summary = summary;
//   news.content = content;
//   news.tags = tags;
//   if (published) {
//     news.published = true;
//     news.slug = slugify(title.toLowerCase(), { strict: true, lower: true });
//   }
//   if (photoUrl) {
//     news.photoUrl = photoUrl;
//   }

//   try {
//     await news.save();
//     return NextResponse.json({}, { status: 200 });
//   } catch (e) {
//     return NextResponse.json({}, { status: 400 });
//   }
// }

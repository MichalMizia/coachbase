// utils
import initMongoose from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import mongoose, { Document, HydratedDocument } from "mongoose";
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
export async function PATCH(req: NextRequest, res: NextResponse) {
  await initMongoose();

  const { newsId, photoUrl, title, content, userId } = await req.json();

  if (!title?.length || !content?.length) {
    return NextResponse.json(
      { message: "Tytuł, i opis aktualności są wymagane" },
      { status: 400 }
    );
  }

  if (!newsId) {
    return NextResponse.json(
      { message: "Nie ma takiego wpisu w aktualnościach" },
      { status: 400 }
    );
  }

  const session = await getServerSession(authOptions);

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
      { message: "Nie masz uprawnień do edycji tego wpisu" },
      { status: 403 }
    );
  }

  const news: HydratedDocument<NewsType> = await News.findById(newsId).exec();

  if (!news) {
    return NextResponse.json(
      { message: "Nie ma takiego wpisu w aktualnościach" },
      { status: 400 }
    );
  }

  news.title = title;
  news.content = content;
  if (photoUrl) {
    news.photoUrl = photoUrl;
  }

  try {
    await news.save();
    return NextResponse.json({}, { status: 200 });
  } catch (e) {
    return NextResponse.json({}, { status: 400 });
  }
}

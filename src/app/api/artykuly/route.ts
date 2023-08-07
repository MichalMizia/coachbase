// utils
import initMongoose from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import Article, { ArticleType } from "@/model/article";
import mongoose, { Document, HydratedDocument } from "mongoose";
import { randomFacts } from "@/config/global";
// auth
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";
import axios from "axios";
import slugify from "slugify";

export async function POST(req: NextRequest, res: NextResponse) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({}, { status: 403 });
  }

  const { id } = await req.json();
  if (!id) {
    return NextResponse.json(
      {
        message: "Ten użytkownik nie istnieje",
      },
      { status: 400 }
    );
  }

  try {
    await initMongoose();
    console.log("id: ", id);
    // const content =
    //   randomFacts[Math.round(Math.random() * (randomFacts.length - 1))];
    const content =
      "Zacznij kreować swój nowy artykuł, kiedy zakończysz edycję możesz opublikować go lub zapisać bez publikowania ze statusem draft";

    const articleOptions: Omit<ArticleType, "updatedAt" | "createdAt" | "_id"> =
      {
        userId: id,
        title: "Artykuł bez tytułu",
        content: `<p>${content}</p>`,
        published: false,
        impressions: 0,
        summary: "Krótkie podsumowanie twojego artykułu",
        slug: "",
      };
    const newPost = await Article.create(articleOptions);
    console.log(newPost);

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
        message: "Ten artykuł nie istnieje",
      },
      {
        status: 400,
      }
    );
  }

  if (userId !== session.user._id) {
    return NextResponse.json(
      {
        message: "Nie masz uprawnień do usunięcia tego artykułu",
      },
      {
        status: 403,
      }
    );
  }

  try {
    await initMongoose();

    const deleted: Document<ArticleType> | null =
      await Article.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json(
        {
          message: "Ten artykuł nie istnieje",
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
  try {
    await initMongoose();
  } catch (e) {
    console.log("Failed connecting to database: ", e);
    return NextResponse.json(
      { message: "Failed connecting to database" },
      { status: 500 }
    );
  }

  const { articleId, photoUrl, title, summary, content, published } =
    await req.json();

  if (!title?.length || !summary.length || !content?.length) {
    return NextResponse.json(
      { message: "Tytuł, podsumowanie i kontent artykułu są wymagane" },
      { status: 400 }
    );
  }

  const article: HydratedDocument<ArticleType> = await Article.findById(
    articleId
  ).exec();

  if (!article) {
    return NextResponse.json(
      { message: "Nie ma takiego artykułu" },
      { status: 400 }
    );
  }

  article.title = title;
  article.summary = summary;
  article.content = content;
  if (published) {
    article.published = true;
    article.slug = slugify(title);
  }
  if (photoUrl) {
    article.photoUrl = photoUrl;
  }

  try {
    await article.save();
    return NextResponse.json({}, { status: 200 });
  } catch (e) {
    return NextResponse.json({}, { status: 400 });
  }
}

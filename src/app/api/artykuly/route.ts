// utils
import initMongoose from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import Article, { ArticleType } from "@/model/article";
import mongoose, { Document, HydratedDocument } from "mongoose";
// auth
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";
import slugify from "slugify";

export async function POST(req: NextRequest, res: NextResponse) {
  const session = await getServerSession(authOptions);

  const { id } = await req.json();
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
      { message: "Nie masz uprawnień do dodania artykułu" },
      { status: 403 }
    );
  }

  try {
    await initMongoose();
    // const content =
    //   randomFacts[Math.round(Math.random() * (randomFacts.length - 1))];
    const content =
      "Zacznij kreować swój nowy artykuł, kiedy zakończysz edycję możesz opublikować go lub zapisać bez publikowania ze statusem draft";

    const articleOptions: Omit<ArticleType, "updatedAt" | "createdAt" | "_id"> =
      {
        userId: new mongoose.Types.ObjectId(id),
        title: "Artykuł bez tytułu",
        content: `<p>${content}</p>`,
        published: false,
        impressions: 0,
        summary: "Krótkie podsumowanie twojego artykułu",
        slug: "",
        tags: ["Trening"],
      };
    const newPost = await Article.create(articleOptions);

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

  const { articleId, photoUrl, title, summary, content, published, tags } =
    await req.json();

  console.log("tags: ", tags, title, summary);

  if (
    !title?.length ||
    !summary.length ||
    !content?.length ||
    !Array.isArray(tags)
  ) {
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
  article.tags = tags;
  if (published) {
    article.published = true;
    article.slug = slugify(title.toLowerCase());
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

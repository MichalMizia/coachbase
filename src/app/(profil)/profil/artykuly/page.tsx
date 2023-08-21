// auth
import authOptions from "@/lib/auth";
import { getServerSession } from "next-auth";
// utils
import { redirect } from "next/navigation";
import { fetchTrainerFromEmail } from "@/lib/fetching/fetchTrainer";
import initMongoose from "@/lib/db";
// components
import { Separator } from "@/components/ui/separator";
// types
import Article, { ArticleType } from "@/model/article";
import { TrainerType, UserType } from "@/model/user";
import ArticleCard from "./@components/ArticleCard";
import { NewArticleButton } from "./@components/NewArticleButton";

const getUserArticles = async (
  userId: string
): Promise<ArticleType[] | null> => {
  await initMongoose();
  const articles: ArticleType[] = await Article.find({ userId: userId })
    .sort("-updatedAt")
    .lean()
    .exec();
  return articles;
};

const Page = async () => {
  // await new Promise((resolve) => setTimeout(resolve, 2000));

  const session = await getServerSession(authOptions);

  if (!session?.user.email) {
    redirect("/login");
  }
  const articles = await getUserArticles(session.user._id);

  // when the user is logged in as a trainer
  return (
    <div className="flex h-full flex-col items-stretch justify-start overflow-y-auto px-4 py-6 lg:px-8">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold text-gray-800">Artykuły</h2>
          <p className="text-h6 text-text_readable">
            Zmiany tutaj będą wyświetlane w twojej ofercie.
          </p>
        </div>
        <NewArticleButton id={session.user._id} />
      </div>
      <Separator className="my-4 bg-gray-300" />

      {articles && (
        <ul className="w-full space-y-2">
          {articles.map((article) => (
            <ArticleCard
              key={article._id.toString()}
              id={article._id.toString()}
              title={article.title}
              photoUrl={article.photoUrl || null}
              date={article.updatedAt}
              userId={session.user._id}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default Page;

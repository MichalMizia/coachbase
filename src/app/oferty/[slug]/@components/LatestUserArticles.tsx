import initMongoose from "@/lib/db";
import Article, { ArticleType } from "@/model/article";

interface LatestUserArticlesProps {
  userId: string;
  username: string;
}

const getArticles = async (id: string): Promise<ArticleType[]> => {
  await initMongoose();

  const articles: ArticleType[] = await Article.find({
    published: true,
    slug: new RegExp(".*"),
    userId: id,
  })
    .limit(4)
    .sort("-createdAt")
    .lean()
    .exec();

  return articles;
};

const LatestUserArticles = async ({
  userId,
  username,
}: LatestUserArticlesProps) => {
  const articles = await getArticles(userId);

  if (!articles?.length) {
    return (
      <p className="text-h6 text-text_readable">
        {username} nie ma jeszcze artykułów
      </p>
    );
  }
  return (
    <ul className="mt-2 flex flex-col items-stretch justify-start">
      {articles.map((article) => {
        return (
          <a key={article.slug} href={article.slug}>
            {article.title}
          </a>
        );
      })}
    </ul>
  );
};

export default LatestUserArticles;

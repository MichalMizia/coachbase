import initMongoose from "@/lib/db";
import Article, { ArticleType } from "@/model/article";
import Link from "next/link";

interface LatestArticlesProps {
  amount?: number;
}

const getArticles = async (amount: number): Promise<ArticleType[] | null> => {
  await initMongoose();

  const articles: ArticleType[] = await Article.find({
    published: true,
    slug: new RegExp(".*"),
  })
    .sort("-createdAt")
    .limit(amount)
    .lean()
    .exec();

  return articles;
};

const LatestArticles = async ({ amount }: LatestArticlesProps) => {
  const articles = await getArticles(amount || 4);

  if (!articles?.length) {
    return <p className="text-center text-h6">Jeszcze nic tu nie ma</p>;
  }

  return (
    <ul className="mt-2 flex flex-col items-stretch justify-start">
      {articles.map((article) => {
        return (
          <Link
            title={article.title}
            key={`/blog/${article.slug}`}
            href={article.slug}
          >
            {article.title}
          </Link>
        );
      })}
    </ul>
  );
};

export default LatestArticles;

import Article, { ArticleType } from "@/model/article";
import ArticleCard from "../edytor/[postId]/@components/ArticleCard";

interface AdminArticlesProps {
  adminId: string;
}

const getArticles = async (adminId: string) => {
  const articles: ArticleType[] = await Article.find({
    userId: adminId,
  })
    .lean()
    .exec();

  return articles;
};

const AdminArticles = async ({ adminId }: AdminArticlesProps) => {
  const articles = await getArticles(adminId);

  return (
    <div className="space-y-2">
      <div className="space-y-1">
        <h3 className="text-h4 font-semibold text-gray-800">Artykuły</h3>
      </div>
      <ul className="requests grid grid-flow-row grid-cols-1 gap-x-2 gap-y-4 md:grid-cols-2 xl:grid-cols-3">
        {articles.length &&
          articles.map((article) => (
            <ArticleCard
              key={article._id.toString()}
              id={article._id.toString()}
              title={article.title}
              photoUrl={article.photoUrl || null}
              date={article.updatedAt}
              userId={adminId}
            />
          ))}
      </ul>
    </div>
  );
};

export default AdminArticles;

import initMongoose from "@/lib/db";
import { cn, formatDate } from "@/lib/utils";
import Article, { ArticleType } from "@/model/article";
import Image from "next/image";
import Link from "next/link";
import ImagePlaceholder from "@/../public/assets/image-placeholder.jpg";
import { HTMLProps } from "react";

interface LatestUserArticlesProps extends HTMLProps<HTMLUListElement> {
  userId: string;
  username: string;
  limit?: number;
  liClassName?: string;
}

const getArticles = async (
  id: string,
  limit: number | undefined
): Promise<ArticleType[]> => {
  await initMongoose();

  const articles: ArticleType[] = await Article.find({
    published: true,
    slug: new RegExp(".*"),
    userId: id,
  })
    .limit(limit || 4)
    .sort("-createdAt")
    .lean()
    .exec();

  return articles;
};

const LatestUserArticles = async ({
  userId,
  username,
  limit,
  className,
  liClassName,
  ...props
}: LatestUserArticlesProps) => {
  const articles = await getArticles(userId, limit);

  if (!articles?.length) {
    return (
      <p className="text-h6 text-text_readable">
        {username} nie dodał jeszcze żadnych artykułów.
      </p>
    );
  }
  return (
    <ul
      {...props}
      className={cn(
        "flex w-full flex-col items-stretch justify-start",
        className
      )}
    >
      {articles.map((article) => {
        return (
          <li
            key={article._id}
            className={cn(
              "flex w-full items-stretch justify-stretch border-b border-black/10 py-2",
              liClassName
            )}
          >
            <Link
              className="h-full w-full"
              key={article.slug}
              href={`/blog/${article.slug}`}
            >
              <article className="flex items-center justify-start gap-2">
                <div className="relative aspect-square h-14 w-14">
                  <Image
                    fill
                    className="aspect-square rounded-full object-cover shadow-md shadow-black/20"
                    src={article.photoUrl || ImagePlaceholder}
                    alt={`Miniatura artykułu ${article.title}`}
                  />
                </div>
                <div className="flex flex-col items-start justify-center">
                  <h3 className="text-h5 font-semibold leading-7 text-gray-800">
                    {article.title}
                  </h3>
                  <p className="text-sm text-text_readable">
                    {formatDate(article.createdAt)}
                  </p>
                </div>
              </article>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default LatestUserArticles;

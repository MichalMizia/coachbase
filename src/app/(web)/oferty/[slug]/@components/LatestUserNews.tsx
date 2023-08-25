import initMongoose from "@/lib/db";
import { cn, formatDate } from "@/lib/utils";
import Image from "next/image";
import ImagePlaceholder from "@/../public/assets/image-placeholder.jpg";
import { HTMLProps } from "react";
import News, { NewsType } from "@/model/news";
import AvatarSvg from "@/../public/assets/avatar.svg";
import NewsArticle from "./NewsArticle";
import { sanitize } from "isomorphic-dompurify";

interface LatestUserNewsProps extends HTMLProps<HTMLUListElement> {
  userId: string;
  username: string;
  limit?: number;
  liClassName?: string;
  userAvatar?: string;
}

const getNews = async (
  id: string,
  limit: number | undefined
): Promise<NewsType[]> => {
  await initMongoose();

  const news: NewsType[] = await News.find({
    userId: id,
  })
    .limit(limit || 4)
    .sort("-updatedAt")
    .lean()
    .exec();

  return news;
};

const LatestUserNews = async ({
  userId,
  username,
  limit,
  className,
  liClassName,
  userAvatar,
  ...props
}: LatestUserNewsProps) => {
  const news = await getNews(userId, limit);

  if (!news?.length) {
    return (
      <p className={cn("text-h6 text-text_readable", liClassName)}>
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
      {news.map((post, ind) => {
        return (
          <li
            key={JSON.stringify(post._id)}
            className={cn(
              "relative flex w-full flex-col items-stretch justify-stretch gap-3 overflow-x-hidden border-b border-black/10 py-2 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:-translate-x-full after:bg-secondary_custom/75 after:transition-all after:duration-500 hover:after:translate-x-0",
              liClassName
            )}
          >
            <header className="flex items-center justify-start gap-2">
              <div className="relative aspect-square h-14 w-14 max-w-[56px] flex-1">
                <Image
                  fill
                  className="aspect-square rounded-full object-cover shadow-md shadow-black/20"
                  src={userAvatar || AvatarSvg}
                  alt={`Zdjęcie profilowe - ${username}`}
                />
              </div>
              <div className="flex flex-col items-start justify-center">
                <h3 className="line-clamp-2 text-h5 font-semibold leading-7 text-gray-800">
                  {post.title}
                </h3>
                <p className="text-sm text-text_readable">
                  {formatDate(post.createdAt)}
                </p>
              </div>
            </header>
            <div className="relative aspect-video w-full">
              <Image
                fill
                className="aspect-square rounded-sm object-cover shadow-md shadow-black/20"
                src={post.photoUrl || ImagePlaceholder}
                alt={`Miniatura artykułu ${post.title}`}
              />
            </div>
            <article
              className={cn("xsmall-article flow")}
              style={{ "--flow-space": "!0.2em" } as React.CSSProperties}
              dangerouslySetInnerHTML={{ __html: sanitize(post.content) }}
            ></article>
          </li>
        );
      })}
    </ul>
  );
};

export default LatestUserNews;

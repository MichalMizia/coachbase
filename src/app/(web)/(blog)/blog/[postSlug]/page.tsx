// utils
import initMongoose from "@/lib/db";
import { cn, formatDate } from "@/lib/utils";
import { sanitize } from "isomorphic-dompurify";
// components
import Link from "next/link";
// types
import Article, { PopulatedArticleType } from "@/model/article";
// assets
import Image from "next/image";
import AvatarSvg from "@/../public/assets/avatar.svg";
import ImagePlaceholder from "@/../public/assets/image-placeholder.jpg";
import { Skeleton } from "@/components/ui/skeleton";
// dynamic imports
import dynamic from "next/dynamic";
const LatestUserArticles = dynamic(
  () => import("@/app/(web)/oferty/[slug]/@components/LatestUserArticles"),
  {
    loading: () => (
      <div className="flex flex-col items-stretch justify-start">
        {[...Array(4).keys()].map((ind) => (
          <li
            key={ind}
            className={cn(
              "flex h-20 w-full items-center space-x-4 border-b border-black/10 px-4 py-4 lg:px-6",
              ind % 2 ? "bg-bg" : "bg-white"
            )}
          >
            <Skeleton
              style={{ animationDelay: `calc(100ms*${ind})` }}
              className="h-12 w-12 rounded-full"
            />
            <div className="space-y-2">
              <Skeleton
                style={{ animationDelay: `calc(100ms*${ind})` }}
                className="h-4 w-[250px]"
              />
              <Skeleton
                style={{ animationDelay: `calc(100ms*${ind})` }}
                className="h-4 w-[200px] rounded-md bg-blue-100"
              />
            </div>
          </li>
        ))}
      </div>
    ),
  }
);

interface pageProps {
  params: {
    postSlug: string;
  };
}

const getArticle = async (
  slug: string
): Promise<PopulatedArticleType | null> => {
  await initMongoose();

  const article: PopulatedArticleType | null = await Article.findOne({
    published: true,
    slug: { $regex: new RegExp(slug, "i") },
  })
    .populate("userId")
    .lean()
    .exec();
  console.log(article);

  return article;
};

const Page = async ({ params }: pageProps) => {
  // await new Promise((resolve) => setTimeout(resolve, 2000));
  const { postSlug } = params;
  console.log(postSlug);

  const article = await getArticle(postSlug);
  if (!article) {
    throw new Error("Nie ma takiego artykułu");
  }

  return (
    <main className="container-md relative flex min-h-[calc(100vh-66px)] flex-col items-start justify-center py-6 text-text_readable md:py-8 lg:flex-row lg:py-10">
      <article className="w-full flex-[2]">
        <div className="mx-auto max-w-3xl">
          <header className="flex items-center justify-start gap-4 px-4 py-2">
            <div className="relative aspect-square h-[72px] w-[72px] max-w-[72px] flex-1 rounded-full shadow-md">
              <Image
                fill
                className="aspect-square self-start rounded-full object-cover shadow-black/20"
                src={article.userId?.avatar || AvatarSvg}
                alt={`Avatar ${article.userId?.username || article.title}`}
              />
            </div>

            <div className="flex flex-col items-start justify-center">
              <h1
                style={{ fontSize: "var(--size-step-2)" }}
                className="font-bold leading-10 text-gray-800"
              >
                {article.title}
              </h1>
              <p className="text-h6 leading-5">
                {formatDate(article.createdAt)}
                {", "}
                <Link
                  href={`/oferty/${article.slug}`}
                  title={`Oferta ${article.userId?.username}`}
                  className="inline text-body text-gray-700 hover:opacity-90"
                >
                  {article.userId?.username}
                </Link>
              </p>
            </div>
          </header>
          <div className="relative mb-3 mt-1 aspect-video w-full lg:mb-5 lg:mt-3">
            <Image
              fill
              className="rounded-md object-cover shadow-md shadow-black/20"
              src={article.photoUrl || ImagePlaceholder}
              alt={`Avatar ${article.userId?.username || article.title}`}
            />
          </div>
          <main
            dangerouslySetInnerHTML={{ __html: sanitize(article.content) }}
            className="flow article !max-w-none"
          ></main>
        </div>
      </article>
      <aside className="top-[70px] mt-3 flex min-h-[50vh] flex-1 flex-col items-start justify-start rounded-md border border-black/10 bg-white pb-4 shadow-md lg:sticky">
        <header className="w-full border-b border-gray-300 px-4 py-2 lg:px-6">
          <h3
            style={{ fontSize: "var(--size-step-1)" }}
            className="py-2 font-semibold leading-7 text-gray-800"
          >
            Pozostałe artykuły - {article.userId.username}
          </h3>
        </header>
        <div className="w-full">
          <LatestUserArticles
            userId={article.userId?._id}
            username={article.userId?.username}
            liClassName="py-4 border-black/10 px-4 lg:px-6"
            omit={[article.title]}
          />
        </div>
        {/* <div className="w-full border-b border-t border-gray-300 px-4 py-2 lg:px-6">
          <h3
            style={{ fontSize: "var(--size-step-1)" }}
            className="font-semibold leading-10 text-gray-800"
          >
            Zobacz także
          </h3>
        </div>
        <div className="w-full">
          <LatestArticles
            userId={article.userId?._id}
            username={article.userId?.username}
            liClassName="py-4 border-black/10 px-4 lg:px-6"
            omit={[article.title]}
          />
        </div> */}
      </aside>
    </main>
  );
};

export default Page;

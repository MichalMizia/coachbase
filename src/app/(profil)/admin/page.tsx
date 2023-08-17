import authOptions from "@/lib/auth";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import RequestCard from "./RequestCard";
import { PendingRequestType } from "@/model/pendindRequest";
import { fetchAllPendingRequests } from "@/lib/fetching/fetchPendingRequests";
// assets
import Image from "next/image";
import AvatarSvg from "@/../public/assets/avatar.svg";
import { NewArticleButton } from "./edytor/[postId]/@components/NewArticleButton";
import { Separator } from "@/components/ui/separator";
import Article, { ArticleType } from "@/model/article";
import ArticleCard from "../profil/artykuly/@components/ArticleCard";

export const metadata: Metadata = {
  title: "Admin Page",
  robots: {
    index: false,
    googleBot: {
      index: false,
    },
  },
};

const adminId = process.env.ADMIN_ID as string;

const getArticles = async () => {
  const articles: ArticleType[] = await Article.find({
    userId: adminId,
  })
    .lean()
    .exec();

  return articles;
};

const Page = async ({}) => {
  const session = await getServerSession(authOptions);

  const whitelisted_emails = process.env.WHITELISTED_EMAILS?.split(
    ", "
  ) as string[];
  if (
    !session ||
    !session.user.email ||
    !whitelisted_emails.includes(session.user.email)
  ) {
    return notFound();
  }

  const articles = await getArticles();
  const pendingRequests: PendingRequestType[] = await fetchAllPendingRequests();

  return (
    <main className="py-8">
      <div className="container-md">
        <div className="flex w-full items-center justify-between">
          <div className="z-[2] flex flex-col items-start gap-2 pt-8 xs:flex-row xs:items-center xs:pt-0">
            <Image
              width={56}
              height={56}
              src={AvatarSvg}
              alt=""
              className="aspect-square rounded-full object-cover"
            />
            <div className="">
              <h2 className="text-h4 font-semibold text-gray-800">Admin</h2>
              <p className="max-w-md text-sm text-text_readable sm:text-h6">
                Requesty założenia konta biznesowego na CoachBase oraz artykuły
                od założyciela
              </p>
            </div>
          </div>
          <NewArticleButton id={adminId} />
        </div>

        <Separator className="my-4 h-[2px] w-full bg-slate-300" />

        <div className="space-y-2">
          <div className="space-y-1">
            <h3 className="text-h4 font-semibold text-gray-800">
              Requesty Trenerskie
            </h3>
          </div>
          <ul className="requests grid grid-flow-row grid-cols-1 gap-x-2 gap-y-4 md:grid-cols-2 xl:grid-cols-3">
            {pendingRequests.map((request) => (
              <RequestCard
                key={request.email}
                roles={request.roles}
                description={request.summary}
                name={request.username}
                email={request.email}
                link={request.link}
                city={request.city}
              />
            ))}
          </ul>
        </div>

        <Separator className="my-4 h-[2px] w-full bg-slate-300" />

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
      </div>
    </main>
  );
};

export default Page;

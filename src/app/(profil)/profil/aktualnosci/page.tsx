// auth
import authOptions from "@/lib/auth";
import { getServerSession } from "next-auth";
// utils
import { redirect } from "next/navigation";
import initMongoose from "@/lib/db";
// components
import { Separator } from "@/components/ui/separator";
// types
import News, { NewsType } from "@/model/news";
import TrainerNewsCard from "./@components/TrainerNewsCard";
4;
// lazy loaded stuff
import dynamic from "next/dynamic";
import { PencilIcon } from "lucide-react";
import AddNewsDialog from "./@components/AddNewsDialog";
const AvatarImageForm = dynamic(
  () => import("../@components/AvatarImageForm"),
  {
    loading: () => (
      <div className="h-14 w-14 animate-pulse rounded-full bg-gray-100"></div>
    ),
  }
);

const getUserNews = async (userId: string): Promise<NewsType[]> => {
  await initMongoose();
  const news: NewsType[] = await News.find({ userId: userId })
    .sort("-updatedAt")
    .lean()
    .exec();
  return news;
};

const Page = async () => {
  // await new Promise((resolve) => setTimeout(resolve, 2000));

  const session = await getServerSession(authOptions);

  if (!session?.user._id) {
    redirect("/login");
  }
  const trainerNews = await getUserNews(session.user._id);
  console.log(trainerNews);

  // when the user is logged in as a trainer
  return (
    <div className="flex h-full flex-col items-stretch justify-start overflow-y-auto px-4 py-6 lg:px-8">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center justify-start gap-2">
          <AvatarImageForm
            imgSrc={session.user.image}
            id={session.user._id}
            username={session.user.username}
            className="!relative !translate-y-0 xs:h-[70px] xs:w-[70px]"
          />
          <div className="space-y-1">
            <h2 className="ml-1.5 text-2xl font-semibold text-gray-800">
              Aktualności
            </h2>
            <AddNewsDialog
              dialogTrigger={
                <div className="flex max-w-lg items-center justify-start rounded-[1000px] border border-black/10 py-2 pl-3 pr-12 text-sm text-text_readable shadow-md outline outline-1 outline-transparent transition-all hover:border-indigo_custom/30 hover:outline-indigo_custom/40 sm:text-h6">
                  <PencilIcon className="mr-2 h-5 w-5 text-secondary_dark" />
                  <span>
                    Cześć {session.user.username.split(" ")[0]}, co u Ciebie?
                  </span>
                </div>
              }
              userId={session.user._id}
            />
          </div>
        </div>
      </div>
      <Separator className="my-4 bg-gray-300" />

      {!!trainerNews?.length ? (
        <ul className="grid w-full max-w-5xl grid-cols-1 items-stretch justify-center space-y-2 lg:grid-cols-2">
          {trainerNews.map((post) => (
            <TrainerNewsCard
              key={post._id.toString()}
              id={post._id.toString()}
              title={post.title}
              photoUrl={post.photoUrl || null}
              date={post.updatedAt}
              userId={session.user._id}
              content={post.content}
            />
          ))}
        </ul>
      ) : (
        <p className="text-base text-text_readable">
          Nie masz jeszcze żadnych aktualności
        </p>
      )}
    </div>
  );
};

export default Page;

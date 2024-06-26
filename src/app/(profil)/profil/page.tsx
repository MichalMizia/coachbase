// auth
import authOptions from "@/lib/auth";
import { getServerSession } from "next-auth";
// types
import { TrainerType } from "@/model/user";
import TrainerData, {
  PopulatedTrainerDataType,
  TrainerDataType,
} from "@/model/trainerData";
import { Separator } from "@/components/ui/separator";
// utils
import { redirect } from "next/navigation";
import initMongoose from "@/lib/db";
// components
import ImageUpdateForm from "@/components/forms/ImageUpdateForm";
import MobileImageUpdateForm from "./@components/MobileImageUpdateForm";
import TrainerFAQCard from "./@components/TrainerFaqCard";
// lazy loaded stuff
import dynamic from "next/dynamic";
import { DescriptionUpdateForm } from "@/components/forms/DescriptionUpdateForm";
import Button from "@/components/ui/Button";
import Link from "next/link";
const MainContentForm = dynamic(() => import("./@components/MainContentForm"), {
  loading: () => <div></div>,
});
const AvatarImageForm = dynamic(() => import("./@components/AvatarImageForm"), {
  loading: () => (
    <div className="h-14 w-14 animate-pulse rounded-full bg-gray-100"></div>
  ),
});

export interface PageProps {
  user?: TrainerType;
  userData?: TrainerDataType;
}

const getUser = async (
  id: string
): Promise<PopulatedTrainerDataType | null> => {
  await initMongoose();

  const trainer = await TrainerData.findOne({ userId: id })
    .populate("userId")
    .lean()
    .exec();

  return trainer;
};

const Page = async () => {
  // await new Promise((resolve) => setTimeout(resolve, 2000));

  const session = await getServerSession(authOptions);
  if (!session?.user?._id) {
    redirect("/rejestracja");
  }

  const userData = await getUser(session.user._id);
  if (!userData) {
    throw new Error("Brak danych powiązanych z tym trenerem");
  }
  const user = userData?.userId;
  // when the user is logged in as a trainer
  return (
    <div className="flex h-full w-full flex-col items-stretch justify-start overflow-y-auto overflow-x-hidden px-4 pb-6 pt-0 xs:pt-6 lg:px-8">
      <div className="border-1 mx-auto aspect-video w-screen -translate-x-4 cursor-pointer rounded-t-[24px] border-b-0 border-white shadow-md shadow-black/20 xs:hidden">
        <MobileImageUpdateForm
          imgSrc={user.image}
          id={user._id}
          className="rounded-t-[24px]"
        />
      </div>
      <div className="relative flex flex-wrap items-center justify-between">
        <div className="z-[2] flex flex-col items-start gap-2 pt-8 xs:flex-row xs:items-center xs:pt-0">
          <AvatarImageForm
            imgSrc={user.avatar}
            id={user._id}
            username={user.username}
          />
          <div className="">
            <h2 className="text-h4 font-semibold text-gray-800">
              Cześć, {user.username.split(" ")[0]}
            </h2>
            <p className="max-w-md text-sm text-text_readable sm:text-h6">
              Uzupełniaj swój profil i przyciągaj klientów
            </p>
          </div>
        </div>
        <Link href={`/oferty/${user.slug}`} title="Zobacz swój Profil">
          <Button
            variant="outlined"
            size="large"
            className="hidden text-gray-700 md:flex"
          >
            Zobacz swój Profil
          </Button>
          <p className="mt-1 translate-y-1 text-sm text-blue-500 underline hover:opacity-80 md:hidden">
            Zobacz swój Profil
          </p>
        </Link>
      </div>
      <Separator className="my-4 bg-gray-300" />

      <div className="hidden xs:block">
        <div className="mb-2 flex items-center justify-between gap-4">
          <div className="space-y-0.5">
            <h2 className="text-xl font-semibold text-gray-800">
              Zdjęcie Profilowe
            </h2>
          </div>
        </div>
        <ImageUpdateForm imgSrc={user.image} id={user._id} />
      </div>
      <DescriptionUpdateForm id={user._id} summary={user.summary} />
      <Separator className="my-4 bg-gray-300" />
      {/* <div className="">
        <div className="mb-2 flex items-center justify-between gap-4">
          <div className="space-y-0.5">
            <h2 className="text-xl font-semibold text-gray-800">
              Najczęściej zadawane pytania
            </h2>
            {userData.faq.length > 0 ? (
              <p>
                Dodawaj kolejne pytania do swojego FAQ aby zwiększać zasięgi
              </p>
            ) : (
              <p>Nie masz jeszcze żadnych pytań w swoim FAQ, dodaj pierwsze!</p>
            )}
          </div>
        </div>
        {!!userData.faq.length && (
          <ul className="w-full space-y-2">
            {userData.faq.map((question) => (
              <TrainerFAQCard
                key={question.question}
                question={question.question}
                answer={question.answer}
                userId={user._id}
              />
            ))}
          </ul>
        )}
      </div> */}
      <MainContentForm userId={user._id} content={userData.content || ""} />
    </div>
  );
};

export default Page;

{
  /* <div className="flex items-start justify-center gap-8">
  <ul className="flex w-full flex-1 flex-col items-center justify-center">
    <li className="w-full rounded-sm bg-white px-8 py-6 shadow shadow-[#00000030]">
      <header className="flex w-full">
        Ulubione <HeartIcon />
      </header>
    </li>
  </ul>
  <div className="flex-1">
    <ChangeNameForm name={session.user.name} />
  </div>
</div>; */
}

// {
//   "Version": "2012-10-17",
//   "Statement": [
//       {
//           "Effect": "Allow",
//           "Action": [
//               "s3:*",
//               "s3-object-lambda:*"
//           ],
//           "Resource": "*"
//       }
//   ]
// }

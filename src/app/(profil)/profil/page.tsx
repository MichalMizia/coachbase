import authOptions from "@/lib/auth";
import { ChevronRightIcon, Edit, HeartIcon, HomeIcon } from "lucide-react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import {
  fetchTrainer,
  fetchTrainerFromEmail,
} from "@/lib/fetching/fetchTrainer";
import { TrainerType, UserType } from "@/model/user";
import { fetchTrainerData } from "@/lib/fetching/fetchTrainerData";
import TrainerData, { TrainerDataType } from "@/model/trainerData";
import { Separator } from "@/components/ui/separator";
import ImageUpdateForm from "@/components/profile/forms/ImageUpdateForm";
import { DescriptionUpdateForm } from "@/components/profile/forms/DescriptionUpdateForm";
import Button from "@/components/ui/Button";
import initMongoose from "@/lib/db";

export interface PageProps {
  user?: TrainerType;
  userData?: TrainerDataType;
}

// const getUser = async (slug: string) => {
//   await initMongoose();

//   const trainer = await TrainerData.find({ userSlug: slug }).populate(
//     "userSlug"
//   );
//   return trainer;
// };

const Page = async () => {
  // await new Promise((resolve) => setTimeout(resolve, 2000));

  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    redirect("/rejestracja");
  }

  const user: TrainerType = await fetchTrainerFromEmail(session.user.email);
  const userData: TrainerDataType = await fetchTrainerData(user.slug);
  if (!user._id) {
    redirect("/rejestracja");
  }
  // const user2 = await getUser(user.slug);
  // console.log("Trainer populate: ", user2);

  // when the user is logged in as a trainer
  return (
    <div className="flex h-full flex-col items-stretch justify-start px-4 py-6 lg:px-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold text-gray-800">Profil</h2>
          <p className="text-h6 text-text_readable">
            Zmiany tutaj będą wyświetlane w twojej ofercie.
          </p>
        </div>
      </div>
      <Separator className="my-4 bg-gray-300" />
      <div>
        <div className="mb-2 flex items-center justify-between gap-4">
          <div className="space-y-0.5">
            <h2 className="text-xl font-semibold text-gray-800">
              Zdjęcie Profilowe
            </h2>
          </div>
        </div>
        <ImageUpdateForm imgSrc={user.image} id={user._id} />
      </div>
      <Separator className="my-4 bg-gray-300" />
      <div className="">
        <DescriptionUpdateForm
          summary={user.summary}
          content={userData.heroSection.content}
          slug={user.slug}
        />
      </div>
      
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

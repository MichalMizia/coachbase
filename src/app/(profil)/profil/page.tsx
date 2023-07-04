import ChangeNameForm from "@/components/auth/ChangeNameForm";
import ProfileInfoSection from "@/components/profile/ProfileInfoSection";
import authOptions from "@/lib/auth";
import { ChevronRightIcon, HeartIcon, HomeIcon } from "lucide-react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import HeaderCards from "@/components/profile/HeaderCards";
import {
  fetchTrainer,
  fetchTrainerFromEmail,
} from "@/lib/fetching/fetchTrainer";
import { TrainerType, UserType } from "@/model/user";
import { fetchTrainerData } from "@/lib/fetching/fetchTrainerData";
import { TrainerDataType } from "@/model/trainerData";

interface pageProps {}

const page = async ({}: pageProps) => {
  // await new Promise((resolve) => setTimeout(resolve, 2000));

  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    redirect("/rejestracja");
  }

  if (!session.user.isTrainer) {
    return (
      <main className="bg-primary">
        <header className="w-full bg-white shadow">
          <div className="container-md flex items-center justify-between px-2">
            <nav className="flex w-fit items-center justify-center gap-3 pb-4 pt-6 ">
              <a href="/">
                <HomeIcon size={20} className="text-blue-600" />
              </a>
              <ChevronRightIcon size={20} />
              <h1 className="font-semibold text-blue-600">Profil</h1>
            </nav>
          </div>
        </header>
        <h1 className="text-2xl font-semibold text-black">
          Witaj spowrotem, {session.user.username}
        </h1>
        {/* <ProfileInfoSection
          user={session.user}
          isTrainer={session.user.isTrainer}
        /> */}
      </main>
    );
  }

  const user: TrainerType = await fetchTrainerFromEmail(session.user?.email);
  const userData: TrainerDataType = await fetchTrainerData(user.slug);

  // when the user is logged in as a trainer
  return (
    <main className="bg-primary">
      <header className="w-full bg-white shadow">
        <div className="container-md flex items-center justify-between px-2">
          <nav className="flex w-fit items-center justify-center gap-3 pb-4 pt-6 ">
            <a href="/">
              <HomeIcon size={20} className="text-blue-600" />
            </a>
            <ChevronRightIcon size={20} />
            <h1 className="font-semibold text-blue-600">Profil</h1>
          </nav>
          <HeaderCards user={user} userData={userData} />
        </div>
      </header>
      <ProfileInfoSection
        user={user}
        heroContent={userData.heroSection.content}
      />
    </main>
  );
};

export default page;

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

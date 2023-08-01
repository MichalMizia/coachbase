import authOptions from "@/lib/auth";
import { ChevronRightIcon, HeartIcon, HomeIcon } from "lucide-react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import HeaderCards from "@/components/profile/HeaderCards";
import {
  fetchTrainer,
  fetchTrainerFromEmail,
} from "@/lib/fetching/fetchTrainer";
import User, { type IUser } from "@/model/user";
import { fetchTrainerData } from "@/lib/fetching/fetchTrainerData";
import { TrainerDataType } from "@/model/trainerData";
import { Sidebar } from "./@components/Sidebar";
import NavigationToggle from "./@components/NavigationToggle";
import initMongoose from "@/lib/db";

const getUser = async (email: string): Promise<IUser | null> => {
  await initMongoose();
  const user: IUser | null = await User.findOne({ email: email }).lean().exec();
  return user;
};

export default async function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    redirect("/rejestracja");
  }
  const user = await getUser(session.user.email);
  if (!user) {
    redirect("/rejestracja");
  }

  if (!user.isTrainer) {
    return (
      <main className="bg-bg">
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

  const userData: TrainerDataType = await fetchTrainerData(user.slug);
  // const newUser = { ...user, _id: user._id.toString() };

  // when the user is logged in as a trainer
  return (
    <main className="flex h-[calc(100vh-122px)] max-w-[100vw] flex-col items-stretch justify-start overflow-hidden overflow-x-hidden bg-white nav:h-[calc(100vh-70px)]">
      <header className="z-[2] w-full shadow-md shadow-[#00000020]">
        <div className="container-md flex items-center justify-between px-2 lg:flex-row-reverse">
          <NavigationToggle />
          <HeaderCards user={user} userData={userData} />
          <nav className="hidden w-fit items-center justify-center gap-1.5 pb-4 pt-6 xs:flex md:gap-[10px]">
            <a href="/">
              <HomeIcon size={20} className="text-blue-600" />
            </a>
            <ChevronRightIcon size={20} />
            <h1 className="font-semibold text-blue-600">Profil</h1>
          </nav>
        </div>
      </header>
      {/* <ProfileInfoSection
          user={user}
          heroContent={userData.heroSection.content}
        /> */}
      <section className="relative h-full w-full flex-1 overflow-hidden border-t border-gray-300">
        <div className="grid h-full lg:grid-cols-5">
          <Sidebar className="h-full border-gray-300 lg:static lg:translate-x-0 lg:border-r" />
          <div className="col-span-3 overflow-y-auto border-l lg:col-span-4">
            {children}
            <div className="-z-10 h-20 w-full"></div>
          </div>
        </div>
      </section>
    </main>
  );
}

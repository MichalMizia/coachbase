import authOptions from "@/lib/auth";
import { ChevronLeft, ChevronRightIcon, HomeIcon } from "lucide-react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import User, { type IUser } from "@/model/user";
import initMongoose from "@/lib/db";
import { ReactNode } from "react";
import PrevRouteBtn from "@/components/PrevRouteBtn";
import dynamic from "next/dynamic";
const UserSidebar = dynamic(() => import("./@components/UserSidebar"));

// const getUser = async (email: string): Promise<IUser | null> => {
//   await initMongoose();
//   const user: IUser | null = await User.findOne({ email: email }).lean().exec();
//   return user;
// };

export default async function ProfileLayout({
  children,
}: {
  children: ReactNode;
  components: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  console.log("Session in profile: ", session);
  if (!session?.user?.email) {
    redirect("/rejestracja");
  }

  if (session.user.isTrainer) {
    redirect("/profil");
  }

  // when the user is logged in as a trainer
  return (
    <main className="flex h-screen w-screen flex-col items-stretch justify-start overflow-hidden bg-white">
      <section className="relative h-full w-full flex-1 border-t border-gray-300">
        {/* desktop grid */}
        <div className="grid h-full rounded-lg lg:grid-cols-4 lg:rounded-none xl:[grid-template-columns:320px_1fr]">
          <UserSidebar className="col-span-1 hidden h-full max-w-xs lg:block" />
          <div className="col-span-3 w-full overflow-y-hidden bg-blue-500 lg:bg-transparent xl:col-span-1">
            <div className="h-full w-full overflow-y-auto rounded-t-[24px] border border-white bg-white pb-14">
              {children}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

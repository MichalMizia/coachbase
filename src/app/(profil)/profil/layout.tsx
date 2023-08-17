import authOptions from "@/lib/auth";
import { ChevronLeft, Loader } from "lucide-react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ReactNode, Suspense } from "react";
import PrevRouteBtn from "@/components/PrevRouteBtn";
import dynamic from "next/dynamic";
const MobileDrawer = dynamic(() => import("./@components/MobileDrawer"));
const Sidebar = dynamic(() => import("./@components/Sidebar"));

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

  if (!session.user.isTrainer) {
    redirect("konto-uzytkownika");
  }

  // when the user is logged in as a trainer
  return (
    <main className="flex h-screen w-full flex-col items-stretch justify-start overflow-hidden bg-white">
      {/* <header className="z-[2] w-full shadow-md shadow-[#00000020]">
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
      </header> */}

      <section className="relative h-full w-full flex-1 border-t border-gray-300">
        {/* mobile navigation */}
        <div className="relative isolate w-full overflow-hidden bg-blue-500 py-1 before:absolute before:-left-6 before:-top-3 before:-z-10 before:h-24 before:w-32 before:rotate-45 before:rounded-[30%] before:border-black/20 before:bg-indigo_custom/20 before:shadow-md before:shadow-black/20 after:absolute after:-right-3 after:-top-2 after:h-20 after:w-24 after:-rotate-45 after:rounded-[40%] after:bg-indigo_custom/50 lg:hidden">
          <div className="container-md flex items-center justify-between">
            <PrevRouteBtn variant="text" className="hover:bg-black/10">
              <ChevronLeft className="text-white" />
            </PrevRouteBtn>
            <Suspense fallback={null}>
              <MobileDrawer />
            </Suspense>
          </div>
        </div>
        {/* desktop grid */}
        <div className="grid h-full rounded-lg lg:grid-cols-4 lg:rounded-none xl:[grid-template-columns:320px_1fr]">
          <Suspense
            fallback={
              <div className="col-span-1 hidden h-full max-w-xs items-center justify-center bg-white lg:flex">
                <Loader size={24} className="text-gray-700" />
              </div>
            }
          >
            <Sidebar className="col-span-1 hidden h-full max-w-xs lg:block" />
          </Suspense>
          <div className="col-span-3 w-full overflow-y-hidden bg-blue-500 lg:bg-transparent xl:col-span-1">
            <div className="h-full w-full overflow-y-auto rounded-t-[24px] border border-white bg-white pb-16 lg:pb-0">
              {children}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

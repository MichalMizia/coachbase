import LoginButton from "@/components/LoginButton";
import ChangeNameForm from "@/components/auth/ChangeNameForm";
import LocationCard from "@/components/profile/LocationCard";
import SocialMediaCard from "@/components/profile/SocialMediaCard";
import TagsCard from "@/components/profile/TagsCard";
import Button from "@/components/ui/Button";
import authOptions from "@/lib/auth";
import { ChevronRightIcon, HeartIcon, HomeIcon, LogIn } from "lucide-react";
import { getServerSession } from "next-auth";

interface pageProps {}

const page = async ({}: pageProps) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <main className="bg-gray-100">
        <section className="container-md flex flex-col items-center justify-center bg-gray-100 py-[15vh]">
          <h1 className="text-5xl font-semibold">
            Zaloguj się aby zobaczyć swój profil
          </h1>
          <Button className="relative top-[1px] mt-8 rounded-xl px-4 text-lg">
            <a href="/login" className="flex items-center justify-center gap-1">
              Zaloguj
              <LogIn size={20} className="relative top-[1px] text-white" />
            </a>
          </Button>
        </section>
      </main>
    );
  } else {
    // when the user is logged in
    return (
      <main className="bg-primary">
        <header className="w-full bg-white pb-4 pt-6 shadow">
          <div className="container-md px-2">
            <nav className="flex w-fit items-center justify-center gap-3">
              <a href="/">
                <HomeIcon size={20} className="text-blue-600" />
              </a>
              <ChevronRightIcon size={20} />
              <h1 className="font-semibold text-blue-600">Profil</h1>
            </nav>
          </div>
        </header>
        <section className="py-6 text-gray-800">
          <div className="container-md">
            {/* <h1 className="mb-6 text-3xl font-semibold">Profil</h1> */}
            <section className="[&>*:nth-child(4)]:border-r-none mb-4 flex w-full items-center justify-center rounded-sm bg-white py-2 shadow shadow-[#00000030]">
              <LocationCard />
              <TagsCard />
              <SocialMediaCard />
            </section>
            <div className="flex items-start justify-center gap-8">
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
            </div>
          </div>
        </section>
      </main>
    );
  }
};

export default page;

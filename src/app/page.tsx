//assets
import Image from "next/image";
import barbell from "@/../../public/assets/barbell2.jpg";
//components
import HomepageOffers from "@/components/homepage/HomepageOffers";
import Button from "@/components/ui/Button";
import { MessagesSquareIcon } from "lucide-react";
// utils
import { fetchAllTrainers } from "@/lib/fetching/fetchTrainers";
import { TrainerType } from "@/model/user";
import { getServerSession } from "next-auth";
// auth

export default async function Home() {
  const trainersData: TrainerType[] = await fetchAllTrainers();

  const session = await getServerSession();
  console.log(session?.expires, session?.user);

  return (
    <main>
      <section className="hero relative flex min-h-[calc(100vh-67px)] lg:h-[calc(100vh-67px)]">
        <div className="flex-1 py-10 lg:bg-white">
          <div className="flex h-full flex-col items-start gap-20 px-10 xs:justify-between lg:gap-0">
            <h1 className="z-[5] max-w-xl text-center text-2xl font-[500] tracking-[101%] text-gray-100 xs:text-4xl md:text-5xl lg:w-[150%] lg:text-left lg:text-black">
              Twoje cele, nasza pasja - znajdź idealnego trenera już teraz!
            </h1>
            <p className="xs:text-md relative z-[5] mx-auto w-[115%] max-w-[600px] text-center text-[15px] text-gray-300 after:absolute after:left-0 after:top-0 after:h-1 after:w-1/2 after:max-w-[100px] after:rounded after:bg-secondary lg:ml-7 lg:max-w-md lg:text-left lg:text-[17px] lg:text-text lg:after:-left-7 lg:after:top-[1px] lg:after:h-[100%] lg:after:w-[6px]">
              Coach Base pozwala Ci znaleźć idealnego trenera personalnego,
              który dopasuje się do Twoich celów, preferencji i stylu życia.
              Niezależnie od tego, czy chcesz zrzucić zbędne kilogramy, zbudować
              mięśnie, poprawić wydolność czy po prostu zdrowo się odżywiać,
              mamy dla Ciebie odpowiedniego eksperta.
            </p>
            <div className="flex items-stretch justify-center gap-4 pl-2">
              <Button variant="primary" className="xs:text-[18px]">
                <a
                  href="/oferty"
                  title="oferty"
                  className="flex items-center justify-center gap-2"
                >
                  <MessagesSquareIcon className="xs:text-md text-sm" />
                  Oferty
                </a>
              </Button>
              <Button variant="primary_outlined" className="xs:text-[18px]">
                <a href="/blog" title="baza wiedzy">
                  Baza wiedzy
                </a>
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute isolate -z-10 h-full w-full flex-1 lg:relative lg:self-stretch">
          <div className="absolute left-0 top-0 z-[2] h-20 w-20 bg-[#FFFFFF99] after:absolute after:left-full after:top-full after:h-20 after:w-20 after:bg-[#FFFFFF20]" />
          <div className="absolute left-20 top-0 z-[2] h-20 w-20 bg-[#FFFFFF70] after:absolute after:left-full after:top-0 after:h-20 after:w-20 after:bg-[#FFFFFF20]" />
          <div className="absolute left-0 top-20 z-[2] h-20 w-20 bg-[#FFFFFF70] after:absolute after:left-0 after:top-full after:h-20 after:w-20 after:bg-[#FFFFFF20]" />
          {/* <div className="bg-gradient-fade top absolute right-0 z-[2] h-full w-full"></div> */}
          <Image
            src={barbell}
            alt="Sztanga z obciążeniem"
            className="absolute h-full w-full object-cover brightness-50 lg:inset-0 lg:brightness-90"
          />
        </div>
      </section>

      <HomepageOffers data={trainersData} />
    </main>
  );
}

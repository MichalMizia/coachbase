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
import authOptions from "@/lib/auth";
// auth

export default async function Page() {
  const trainersData: TrainerType[] = await fetchAllTrainers();

  const session = await getServerSession(authOptions);

  //

  return (
    <main>
      <section className="hero relative flex lg:h-[calc(100dvh-67px)] lg:min-h-[calc(100dvh-67px)]">
        <div className="h-full flex-1 self-center px-5 py-16 xs:px-10 lg:self-stretch lg:bg-white lg:py-10">
          <div className="mx-auto flex  w-[92%] max-w-2xl flex-col items-center justify-between lg:h-full">
            <header className="w-full">
              <h1 className="mx-auto text-center text-3xl font-semibold text-white sm:text-5xl lg:mx-0 lg:w-[120%] lg:text-left lg:text-black xxl:text-6xl">
                Twoje cele, nasza pasja - znajdź idealnego trenera już teraz!
              </h1>
              <p className="relative mt-8 text-center text-sm text-gray-300 sm:text-lg lg:ml-5 lg:mt-10 lg:max-w-[600px] lg:text-left lg:text-text lg:after:absolute lg:after:-left-5 lg:after:top-[2px] lg:after:h-full lg:after:w-[6px] lg:after:rounded-xl lg:after:bg-secondary ">
                Coach Base pozwala Ci znaleźć idealnego trenera personalnego,
                który dopasuje się do Twoich celów, preferencji i stylu życia.
                Niezależnie od tego, czy chcesz zrzucić zbędne kilogramy,
                zbudować mięśnie, poprawić wydolność czy po prostu zdrowo się
                odżywiać, mamy dla Ciebie odpowiedniego eksperta.
              </p>
            </header>
            <div className="mt-20 flex items-stretch justify-center gap-4 p-2 lg:mt-0 lg:flex-1 lg:items-end lg:self-start">
              <Button
                variant="primary"
                className="xs:text-[18px] lg:text-xl xl:text-2xl"
              >
                <a
                  href="/oferty"
                  title="oferty"
                  className="flex items-center justify-center gap-2"
                >
                  <MessagesSquareIcon className="xs:text-md text-sm" />
                  Oferty
                </a>
              </Button>
              <Button
                variant="primary_outlined"
                className="xs:text-[18px] lg:text-xl xl:text-2xl"
              >
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

      <HomepageOffers data={JSON.parse(JSON.stringify(trainersData))} />
    </main>
  );
}

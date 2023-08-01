"use client";

// components
import { Globe2Icon, MessagesSquareIcon } from "lucide-react";
import PhotoSection from "./PhotoSection";
import Button from "@/components/ui/Button";
// import { MultiSelect } from "react-multi-select-component";
// types
import { TrainerType, UserRolesType } from "@/model/user";
// utils
import { Session } from "next-auth";
// hooks
import SearchBarOffers from "@/components/offers/OffersSearchbar";
// images
import Image from "next/image";
import HeroImg from "../../../public/assets/hero.jpg";
import DumbellImg from "../../../public/assets/dumbells.jpg";
import { Icons } from "@/components/ui/icons";

interface OffersPageProps {
  session: Session | null;
  jsonData: string;
}

export type SortingType = "Najlepiej oceniane" | "Najnowsze" | "Najbliżej";

export interface RolesType {
  name: UserRolesType;
  visible: boolean;
}

// export const sortingOptions = ["Najnowsze", "Najlepiej oceniane", "Najbliżej"];

const OffersPage = ({ session, jsonData }: OffersPageProps) => {
  const trainers: TrainerType[] = JSON.parse(jsonData);
  // const [roles, setRoles] = useState<RolesType[]>([
  //   {
  //     name: "Trener",
  //     visible: true,
  //   },
  //   {
  //     name: "Dietetyk",

  //     visible: true,
  //   },
  //   {
  //     name: "Fizjoterapeuta",
  //     visible: true,
  //   },
  // ]);

  return (
    <main className="text-gray-200">
      <section className="relative isolate flex h-[calc(100dvh-67px)] w-full items-center bg-[#00000030] py-16">
        <Image
          className="absolute inset-0 -z-10 h-full w-full object-cover brightness-[0.4]"
          src={HeroImg}
          alt=""
          loading="lazy"
        />
        <div className="container-md flex h-full flex-col items-center justify-around lg:max-h-[22rem]">
          <header>
            <h1
              style={{ fontSize: "var(--size-step-4)" }}
              className="text-center font-bold text-white"
            >
              Znajdź idealnego trenera
            </h1>
            <p
              className="mx-auto max-w-2xl text-center"
              style={{ fontSize: "var(--size-step-0)" }}
            >
              CoachBase to miejsce mające połączyć klientów z ekspertami fitness
              którzy pomogą im zrealizować swoje cele.
            </p>
          </header>
          <SearchBarOffers />
        </div>
      </section>

      <section className="border-b-2 bg-white py-8 shadow-md md:py-12 lg:py-16">
        <div className="container-md !max-w-[1100px]">
          <header className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h2
                style={{ fontSize: "var(--size-step-3)" }}
                className="font-semibold text-gray-800 "
              >
                Polecane
              </h2>
              <p
                style={{ fontSize: "var(--size-step-0)" }}
                className=" text-text_readable"
              >
                Zobacz często wyszukiwane kategorie.
              </p>
            </div>
          </header>

          <PhotoSection />
        </div>
      </section>

      <section className="border-b-2 py-8 md:py-12 lg:py-16">
        <div className="container-md">
          <header className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h2
                style={{ fontSize: "var(--size-step-3)" }}
                className="font-semibold text-gray-800 "
              >
                Najnowsze Oferty
              </h2>
              <p
                style={{ fontSize: "var(--size-step-0)" }}
                className=" text-text_readable"
              >
                Oto trenerzy którzy ostatnio założyli konto na CoachBase
              </p>
            </div>
            {/* <a href="#search">
              <Button variant="default" className="text-lg text-white">
                <Icons.page className="mr-2 h-4 w-4" />
                Oferty
              </Button>
            </a> */}
          </header>

          <ul className="scrollbar-custom mt-4 flex h-[32vh] max-w-full items-stretch justify-start overflow-x-auto rounded-md md:mt-6 md:h-[36vh] lg:mt-8 lg:h-[40vh]">
            {trainers.map((trainer) => {
              return (
                <a
                  key={trainer._id}
                  href={`/oferty/${trainer.slug}`}
                  title={`Oferta ${trainer.username}`}
                  className="bg-slate-200 even:bg-slate-300"
                >
                  <li className="group relative isolate flex aspect-[16/11] h-full items-end justify-stretch overflow-hidden rounded-md shadow-sm transition-all hover:shadow-lg hover:shadow-black/40 lg:aspect-video">
                    <div className="absolute left-2 top-2 rounded-xl bg-blue-600 px-3 py-1 text-h6 font-semibold uppercase text-white">
                      {trainer.city}
                    </div>
                    {trainer.image && (
                      <img
                        src={trainer.image}
                        alt={`Zdjęcie Profilowe ${trainer.username}`}
                        className="absolute inset-0 -z-[2] h-full w-full object-cover brightness-[0.8] transition-all duration-200 group-hover:scale-105"
                      />
                    )}
                    <main className="w-full bg-gradient-to-b from-black/20 to-black/80 p-4">
                      <h4
                        className="font-semibold text-white"
                        style={{ fontSize: "var(--size-step-1)" }}
                      >
                        {trainer.username}
                      </h4>
                      <ul className="tags flex w-fit flex-wrap items-center justify-start gap-1 md:gap-2">
                        {trainer.roles?.map((role, ind) => (
                          <li
                            className="relative -top-0.5 rounded-sm font-sans text-[10px] font-[600] uppercase tracking-wider text-gray-100 underline decoration-teal-400/60 md:font-bold"
                            key={ind}
                          >
                            {role}
                          </li>
                        ))}
                      </ul>
                      <p className="text-h6">{trainer.summary}</p>
                    </main>
                  </li>
                </a>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="relative isolate py-6 lg:py-8">
        <main className="container-md">
          <div className="">
            <h2
              className="font-bold text-white"
              style={{ fontSize: "var(--size-step-4)" }}
            >
              Chcesz do nich dołączyć?
            </h2>
            <p
              className="text-gray-200"
              style={{ fontSize: "var(--size-step-0)" }}
            >
              Załóż darmowe konto trenera i stwórz swoją prywatną stronę
              internetową
            </p>
            <a href="/rejestracja-trenera">
              <Button
                variant="primary"
                size="large"
                className="mt-4 rounded-lg"
                style={{ fontSize: "var(--size-step-0)" }}
              >
                <Icons.user className="mr-2 h-5 w-5" />
                Załóż Konto Biznesowe
              </Button>
            </a>
          </div>
        </main>
        <Image
          src={DumbellImg}
          alt=""
          className="absolute inset-0 -z-[2] h-full w-full object-cover brightness-50"
        />
      </section>

      {/* <OffersSection data={currentTrainers} /> */}
    </main>
  );
};

export default OffersPage;

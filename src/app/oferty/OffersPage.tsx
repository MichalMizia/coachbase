"use client";

// components
import { Globe2Icon, MessagesSquareIcon } from "lucide-react";
// import { MultiSelect } from "react-multi-select-component";
// types
import { TrainerType, UserRolesType } from "@/model/user";
// utils
import { Session } from "next-auth";
import OffersSection from "@/components/offers/OffersSection";
// hooks
import { useMemo, useState } from "react";
import SearchBarOffers from "@/components/offers/SearchOffers";
import RolesSearch from "@/components/offers/RolesSearch";

interface OffersPageProps {
  session: Session | null;
  jsonData: string;
}

export type SortingType = "Najlepiej oceniane" | "Najnowsze" | "Najbliżej";

export interface RolesType {
  name: UserRolesType;
  visible: boolean;
}

export const sortingOptions = ["Najnowsze", "Najlepiej oceniane", "Najbliżej"];

const OffersPage = ({ session, jsonData }: OffersPageProps) => {
  const data: TrainerType[] = JSON.parse(jsonData);
  const [sorting, setSorting] = useState<SortingType>("Najlepiej oceniane");
  const [roles, setRoles] = useState<RolesType[]>([
    {
      name: "Trener",
      visible: true,
    },
    {
      name: "Dietetyk",

      visible: true,
    },
    {
      name: "Fizjoterapeuta",
      visible: true,
    },
  ]);
  const [city, setCity] = useState<string>("");
  const [query, setQuery] = useState<string>("");

  const currentRoles = useMemo(() => {
    let tempRoles: UserRolesType[] = [];
    roles.forEach((role) => {
      role.visible ? tempRoles.push(role.name) : null;
    });
    return tempRoles;
  }, [roles]);

  const currentTrainers = useMemo(() => {
    return data.filter(
      (trainer) =>
        trainer.roles.some((role) => currentRoles.includes(role)) &&
        trainer.username.toLowerCase().includes(query.toLowerCase())
    );
  }, [city, query, sorting, currentRoles, data]);

  console.log(city);
  return (
    <main>
      {/* <header className="flex items-center justify-center gap-3 bg-gray-200 p-7 shadow-inner shadow-[#00000050]">
        <Globe2Icon className="relative top-[2px] text-blue-600" size={32} />
        <h1 className="text-4xl text-black">
          Znajdź idealnego trenera już teraz!
        </h1>
      </header> */}
      <section className="border-b-2 border-gray-300 pb-6 pt-8">
        <div className="container-md flex flex-col items-stretch justify-between gap-5">
          <section className="flex w-full flex-col items-center justify-center gap-4 lg:flex-row lg:justify-between">
            <h1 className="mb-4 text-2xl font-semibold text-black lg:text-3xl">
              Oferty
            </h1>
            <SearchBarOffers
              city={city}
              setCity={setCity}
              query={query}
              setQuery={setQuery}
              sorting={sorting}
              setSorting={setSorting}
            />
          </section>
          <RolesSearch roles={roles} setRoles={setRoles} />
        </div>
      </section>

      <OffersSection data={currentTrainers} />
    </main>
  );
};

export default OffersPage;

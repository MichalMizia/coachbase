"use client";

// components
import { MessagesSquareIcon } from "lucide-react";
// import { MultiSelect } from "react-multi-select-component";
// types
import { TrainerType, UserRolesType } from "@/model/user";
// utils
import { Session } from "next-auth";
import OffersSection from "@/components/offers/OffersSection";
// hooks
import { useMemo, useState } from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import SearchBarOffers from "@/components/offers/SearchOffers";
import RolesSearch from "@/components/offers/RolesSearch";

interface OffersPageProps {
  session: Session | null;
  data: TrainerType[];
}

export type SortingType = "Najlepiej oceniane" | "Najnowsze" | "Najbliżej";

export interface RolesType {
  name: UserRolesType;
  visible: boolean;
}

export const sortingOptions = ["Najnowsze", "Najlepiej oceniane", "Najbliżej"];

const OffersPage = ({ session, data }: OffersPageProps) => {
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
    return data.filter((trainer) =>
      trainer.roles.some((role) => currentRoles.includes(role))
    );
  }, [city, query, sorting, roles]);
  console.log(currentRoles);

  return (
    <main>
      <header className="border-b-2 border-gray-300 pb-6 pt-8">
        <div className="container-md flex flex-col items-stretch justify-between gap-5">
          <section className="flex w-full flex-col items-center justify-between lg:flex-row">
            <div className="flex items-center justify-center gap-1">
              <MessagesSquareIcon size={26} className="text-blue-600" />
              <h1 className="text-3xl font-semibold">Oferty</h1>
            </div>
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
      </header>

      <OffersSection data={currentTrainers} />
    </main>
  );
};

export default OffersPage;

"use client";

import { useTrainerStore } from "@/lib/state/slug-state-generation";
import { TrainerDataType } from "@/model/trainerData";
import { TrainerType } from "@/model/user";
import OfferTabsAbout from "./OfferTabsAbout";
import OfferTabsOffers from "./OfferTabsOffers";
import OfferTabsReviews from "./OfferTabsReviews";
import OfferTabsArticles from "./OfferTabsArticles";

interface OfferTabsProps {
  trainer: TrainerType;
  trainerData: TrainerDataType;
}

const OfferTabs = ({ trainer, trainerData }: OfferTabsProps) => {
  const { selectedNavItem } = useTrainerStore();

  return (
    <main className="mt-5 min-h-[100px] w-full rounded-sm bg-white shadow-md shadow-black/25 outline outline-1 outline-black/5">
      {selectedNavItem === "O mnie" ? (
        <OfferTabsAbout trainerData={trainerData} />
      ) : selectedNavItem === "Oferty" ? (
        <OfferTabsOffers />
      ) : selectedNavItem === "Opinie" ? (
        <OfferTabsReviews />
      ) : (
        <OfferTabsArticles />
      )}
    </main>
  );
};

export default OfferTabs;

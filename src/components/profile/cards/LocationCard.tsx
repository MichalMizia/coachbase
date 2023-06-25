"use client";

import { LocateIcon } from "lucide-react";
import Button from "../../ui/Button";
import Modal from "react-modal";
import { Dispatch, SetStateAction } from "react";

type MenuType = "" | "SocialMedia" | "Location" | "Tags";
interface LocationCardProps {
  setOpenMenu: Dispatch<SetStateAction<MenuType>>;
}

const LocationCard = ({ setOpenMenu }: LocationCardProps) => {
  return (
    <div className="flex flex-1 flex-col self-stretch border-r border-r-text px-6 py-2 last-of-type:border-r-0">
      <header className="flex items-end gap-3">
        <LocateIcon className="relative top-[1px] text-orange-500" />
        <h4>Lokalizacja</h4>
      </header>
      <div className="mt-4 flex w-full flex-1 flex-col items-start justify-between gap-2">
        <p className="text-sm text-text">Rzeszów ul.Lenartowicza 17</p>
        <Button
          onClick={() => setOpenMenu("Location")}
          aria-label="Otwórz edycję lokalizacji"
          className="font-sm hover-circle-overlay bg-secondary py-[6px] tracking-[102%] hover:bg-secondary"
        >
          Edit
        </Button>
      </div>
    </div>
  );
};

export default LocationCard;

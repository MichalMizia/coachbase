"use client";

import { LocateIcon } from "lucide-react";
import Button from "../ui/Button";
import Modal from "react-modal";
import { useState } from "react";

interface LocationCardProps {}

const LocationCard = ({}: LocationCardProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="flex flex-1 flex-col self-stretch border-r border-r-text px-6 py-2 last-of-type:border-r-0">
      <header className="flex items-end gap-3">
        <LocateIcon className="relative top-[1px] text-orange-500" />
        <h4>Lokalizacja</h4>
      </header>
      <div className="mt-4 flex w-full flex-1 flex-col items-start justify-between gap-2">
        <p className="text-sm text-text">Rzeszów ul.Lenartowicza 17</p>
        <Button
          onClick={() => setIsOpen(true)}
          aria-label="Otwórz edycję lokalizacji"
          className="font-sm hover-circle-overlay bg-secondary py-[6px] tracking-[102%] hover:bg-secondary"
        >
          Edit
        </Button>
        <Modal
          isOpen={isOpen}
          onRequestClose={() => setIsOpen(false)}
          contentLabel="Example Modal"
          className="fixed left-1/2 top-1/2 z-[9999] h-full max-h-96 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 border border-text bg-white p-10 shadow-white"
        >
          <Button
            className="font-sm hover-circle-overlay bg-secondary py-[6px] tracking-[102%] hover:bg-secondary"
            onClick={() => setIsOpen(false)}
          >
            Zamknij
          </Button>
          <div>I am a modal</div>
          <form>
            <input />
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default LocationCard;

"use client";

import { useRef, useState } from "react";
import { classNames } from "@/lib/utils";
import { BookmarkIcon, LocateIcon, TagsIcon } from "lucide-react";
import Button from "../ui/Button";
import MediaForm from "./forms/MediaForm";
import { TrainerType } from "@/model/user";
import { TrainerDataType } from "@/model/trainerData";
import useMediaQuery from "@/lib/hooks/useMediaQuery";

interface HeaderCardsProps {
  user: TrainerType;
  userData: TrainerDataType;
}

export type MenuType = "" | "SocialMedia" | "Location" | "Tags";

const HeaderCards = ({ user, userData }: HeaderCardsProps) => {
  const sidebarRef = useRef<HTMLElement>(null);
  const [openMenu, setOpenMenu] = useState<MenuType>("");
  const isMobile = useMediaQuery("(max-width: 670px)");

  if (openMenu !== "") {
    sidebarRef.current?.focus();
  }

  return (
    <section className="flex h-full max-w-[360px] flex-grow items-stretch justify-end self-stretch rounded bg-white pt-1.5 text-text_readable md:justify-center">
      {isMobile ? (
        <Button
          onClick={() => setOpenMenu("Tags")}
          className="h-full flex-col justify-between self-stretch rounded-none border-l border-r px-4 py-2.5 pt-3"
          variant="text"
        >
          <header className="flex items-center justify-between gap-1">
            <TagsIcon size={18} className="relative top-[1px] text-green-600" />
            <LocateIcon
              size={18}
              className="relative top-[1px] text-orange-500"
            />
            <BookmarkIcon
              size={18}
              className="relative top-[1px] text-blue-600"
            />
          </header>
          Ustawienia
        </Button>
      ) : (
        <>
          <Button
            variant="text"
            onClick={() => setOpenMenu("Tags")}
            aria-label="Otwórz edycję lokalizacji"
            className="flex flex-1 flex-col items-center justify-center gap-0.5 rounded-none border-l border-r px-4 py-2.5"
          >
            <TagsIcon size={20} className="relative top-[1px] text-green-600" />
            <h4 className="text-text_readable">Tagi</h4>
          </Button>
          <Button
            variant="text"
            onClick={() => setOpenMenu("Location")}
            aria-label="Otwórz edycję tagów"
            className="flex flex-1 flex-col items-center justify-center gap-0.5 rounded-none border-l border-r px-4 py-2.5"
          >
            <LocateIcon
              size={20}
              className="relative top-[1px] text-orange-500"
            />
            <h4 className="text-text_readable">Lokalizacja</h4>
          </Button>
          <Button
            variant="text"
            onClick={() => setOpenMenu("SocialMedia")}
            aria-label="Otwórz edycję social mediów"
            className="flex flex-1 flex-col items-center justify-center gap-0.5 rounded-none border-l border-r px-4 py-2.5"
          >
            <BookmarkIcon
              size={20}
              className="relative top-[1px] text-blue-600"
            />
            <h4 className="text-text_readable">SocialMedia</h4>
          </Button>
        </>
      )}
      <aside
        className={classNames(
          "fixed bottom-0 right-0 top-[67px] z-50 flex h-full w-full max-w-md flex-col items-center justify-start gap-4 bg-white px-4 outline outline-transparent transition-all duration-[400] focus:outline-blue-500 xs:px-8",
          openMenu === "" ? "translate-x-full " : "translate-x-0 shadow-cover"
        )}
        // onBlur={() => setOpenMenu("")}
        ref={sidebarRef}
        tabIndex={openMenu === "" ? -1 : 0}
      >
        <MediaForm
          setOpenMenu={setOpenMenu}
          media={userData.socialMedia}
          tags={userData.tags}
          city={user.city}
          slug={user.slug}
        />
      </aside>
    </section>
  );
};

export default HeaderCards;

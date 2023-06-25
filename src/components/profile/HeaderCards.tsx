"use client";

import { useRef, useState } from "react";
import LocationCard from "./cards/LocationCard";
import SocialMediaCard from "./cards/SocialMediaCard";
import TagsCard from "./cards/TagsCard";
import { classNames } from "@/lib/utils";
import SocialMediaForm from "./forms/SocialMediaForm";
import { LucideSidebarClose } from "lucide-react";

interface HeaderCardsProps {}

const HeaderCards = ({}: HeaderCardsProps) => {
  type MenuType = "" | "SocialMedia" | "Location" | "Tags";
  const sidebarRef = useRef<HTMLElement>(null);
  const [openMenu, setOpenMenu] = useState<MenuType>("");

  if (openMenu !== "") {
    sidebarRef.current?.focus();
  }

  const currMed = {
    instagram: "",
    facebook: "",
    email: "",
  };

  return (
    <section className="[&>*:nth-child(4)]:border-r-none mb-4 flex w-full items-center justify-center rounded-sm bg-white py-2 shadow shadow-[#00000030]">
      <LocationCard setOpenMenu={setOpenMenu} />
      <TagsCard setOpenMenu={setOpenMenu} />
      <SocialMediaCard setOpenMenu={setOpenMenu} media={[]} />
      <aside
        className={classNames(
          "fixed bottom-0 right-0 top-[67px] z-50 flex h-full w-full max-w-md flex-col items-center justify-start gap-4 bg-white px-4 outline outline-transparent transition-all duration-[400] focus:outline-blue-500 xs:px-8",
          openMenu === "" ? "translate-x-full " : "translate-x-0 shadow-cover"
        )}
        // onBlur={() => setOpenMenu("")}
        ref={sidebarRef}
        tabIndex={openMenu === "" ? -1 : 0}
      >
        <header className="mt-6 flex w-full items-center justify-between">
          <button
            onClick={() => setOpenMenu("")}
            className="p-2 transition-all hover:scale-105 focus:scale-105 focus:border focus:border-blue-500"
          >
            <LucideSidebarClose />
          </button>
          <h4 className="text-xl font-semibold tracking-[0.00125em]">
            Social Media
          </h4>
        </header>
        {openMenu === "SocialMedia" ? (
          <SocialMediaForm media={currMed} />
        ) : null}
      </aside>
    </section>
  );
};

export default HeaderCards;

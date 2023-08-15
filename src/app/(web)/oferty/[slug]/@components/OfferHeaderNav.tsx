"use client";

import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ProfileNavigationOptionType,
  profileNavigationOptions,
} from "@/config/profileOptions";
import { classNames } from "@/lib/utils";

interface OfferHeaderNavProps {
  shouldShowFaq?: boolean;
}

const OfferHeaderNav = ({ shouldShowFaq }: OfferHeaderNavProps) => {
  return (
    <>
      {/* <div
        className="absolute bottom-0 left-0 h-0.5 w-[25%] bg-black transition-all"
        style={{ transform: `translateX(${currentIndex * 100}%)` }}
      ></div> */}
      {/* {profileNavigationOptions.map((opt) => (
        <li
          className={classNames(
            "flex flex-1 cursor-pointer justify-center border-b-2 border-transparent p-2 pt-1 transition-all hover:border-gray-400"
          )}
          role="button"
          onClick={() => setSelectedNavItem(opt)}
          key={opt}
        >
          {opt}
        </li>
      ))} */}
      <TabsList
        className={classNames(
          `mt-4 w-full border border-b-0 !border-indigo_custom/20 md:mt-4`
        )}
        defaultValue={profileNavigationOptions[0]}
      >
        {profileNavigationOptions.map((opt) => {
          if (opt === "FAQ" && !shouldShowFaq) {
            return null;
          }
          return (
            <TabsTrigger key={opt} tabIndex={0} className="flex-1" value={opt}>
              {opt}
            </TabsTrigger>
          );
        })}
      </TabsList>
    </>
  );
};

export default OfferHeaderNav;

"use client";

import {
  profileNavigationOptions,
  useTrainerStore,
} from "@/lib/state/slug-state-generation";
import { classNames } from "@/lib/utils";

interface OfferHeaderNavProps {}

const OfferHeaderNav = ({}: OfferHeaderNavProps) => {
  const { selectedNavItem, setSelectedNavItem } = useTrainerStore();

  const currentIndex = profileNavigationOptions.indexOf(selectedNavItem);
  return (
    <ul
      className={classNames(
        `relative mt-4 flex items-end justify-start border-t pt-2`
      )}
    >
      <div
        className="absolute bottom-0 left-0 h-0.5 w-[25%] bg-black transition-all"
        style={{ transform: `translateX(${currentIndex * 100}%)` }}
      ></div>
      {profileNavigationOptions.map((opt) => (
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
      ))}
    </ul>
  );
};

export default OfferHeaderNav;

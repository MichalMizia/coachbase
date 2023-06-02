import { option } from "../homepage/HomepageOffers";
import { classNames } from "@/lib/utils";
import { Fragment } from "react";
import { UserRolesType } from "@/model/user";

interface TabsProps {
  options: option[];
  active: UserRolesType;
  setActive: (active: UserRolesType) => void;
  className?: string;
}

export default function Tabs({
  options,
  active,
  setActive,
  className,
}: TabsProps) {
  return (
    <div
      className={classNames(
        "w-screen border-spacing-1 border-slate-300 rounded-md border-solid border py-4 px-2",
        className!
      )}
    >
      <ul className="w-full flex text-sm text-center text-gray-600 gap-2 [li:not(li:last-child):border-r-1] [li:not(li:last-child):border-slate-300]">
        {options.map((option: option, ind: number) => {
          return (
            <Fragment key={ind}>
              <div
                className={`${
                  active === option.title
                    ? "text-emerald-500 font-semibold"
                    : "hover:text-gray-800 hover:font-semibold transition-all"
                } flex flex-col gap-1 items-center justify-center cursor-pointer flex-1`}
                onClick={() => setActive(option.title)}
              >
                {option.icon}
                {option.title}
              </div>
              {ind + 1 < options.length && (
                <div className="align-self-stretch bg-slate-300 self-stretch w-[2px]" />
              )}
            </Fragment>
          );
        })}
      </ul>
    </div>
  );
}

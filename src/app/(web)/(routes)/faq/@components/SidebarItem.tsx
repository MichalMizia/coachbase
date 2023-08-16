import { classNames } from "@/lib/utils";
import { LucideProps } from "lucide-react";
import { Dispatch, ReactNode, SetStateAction } from "react";

interface SidebarItemProps {
  name: string;
  isSidebarOpen: boolean;
  icon: (props: LucideProps) => ReactNode;
  active: boolean;
  setActive: Dispatch<SetStateAction<string>>;
}

export const SidebarItem = ({
  name,
  isSidebarOpen,
  icon,
  active,
  setActive,
}: SidebarItemProps) => {
  return (
    <button
      onClick={() => setActive(name)}
      className={classNames(
        "flex items-center justify-between gap-2 px-2 py-2 text-sm transition-all lg:px-4 lg:text-[16px]",
        active
          ? "bg-slate-200"
          : "hover:bg-slate-100 focus:border-blue-500 focus:bg-slate-100"
      )}
      title={name}
    >
      {icon({
        className: !active ? "text-text_readable" : "text-secondary_dark",
        size: 22,
      })}
      <span
        className={classNames(
          "max-w-[120px] flex-1 origin-left text-center md:max-w-[150px]",
          isSidebarOpen
            ? "duration-[400ms] static scale-x-100 opacity-100 transition-all"
            : "absolute scale-x-0 opacity-0",
          active ? "text-black" : ""
        )}
      >
        {name}
      </span>
    </button>
  );
};

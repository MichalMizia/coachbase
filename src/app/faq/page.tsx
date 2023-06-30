"use client";

// data
import { FaqItem, faqItemsHeader, faqItemsMain } from "@/content/faq";
import { classNames } from "@/lib/utils";
// types
import { LucideProps, SidebarCloseIcon, SidebarOpenIcon } from "lucide-react";
import { Dispatch, ReactNode, SetStateAction, useMemo, useState } from "react";

interface SidebarItemProps {
  name: string;
  isSidebarOpen: boolean;
  icon: (props: LucideProps) => ReactNode;
  active: boolean;
  setActive: Dispatch<SetStateAction<string>>;
}

const SidebarItem = ({
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
    >
      {icon({
        className: !active ? "text-text_readable" : "text-secondary_dark",
        size: 22,
      })}
      <span
        className={classNames(
          "max-w-[120px] flex-1 origin-left text-center md:max-w-[150px]",
          isSidebarOpen
            ? "static scale-x-100 opacity-100 transition-all duration-[400ms]"
            : "absolute scale-x-0 opacity-0",
          active ? "text-black" : ""
        )}
      >
        {name}
      </span>
    </button>
  );
};

const page = ({}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(() => {
    if (window.innerWidth >= 900) {
      return true;
    }
    return false;
  });
  const [active, setActive] = useState<string>("O Projekcie");
  const allItems: FaqItem[] = useMemo(() => {
    return faqItemsHeader.concat(faqItemsMain);
  }, [faqItemsHeader, faqItemsMain]);

  return (
    <main className="min-h-screen bg-white py-6 text-gray-800 lg:py-10">
      <aside className="fixed left-0 top-0 z-20 flex min-h-screen w-auto flex-col justify-start border-r bg-white pt-[75px] shadow-md shadow-[#00000020] transition-all duration-500">
        <button
          className="relative w-full border-b bg-primary p-2 transition-all hover:bg-slate-300 lg:px-4"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <SidebarOpenIcon
            className={classNames(
              "transition-all",
              isSidebarOpen ? "rotate-180" : "rotate-0"
            )}
          />
        </button>
        <div className="flex w-full flex-col justify-center border-b">
          {faqItemsHeader.map((item) => (
            <SidebarItem
              setActive={setActive}
              key={item.id}
              active={item.item === active}
              icon={item.icon}
              name={item.item}
              isSidebarOpen={isSidebarOpen}
            />
          ))}
        </div>
        <div className="flex w-full flex-col justify-center border-b">
          {faqItemsMain.map((item) => (
            <SidebarItem
              setActive={setActive}
              active={item.item === active}
              key={item.id}
              icon={item.icon}
              name={item.item}
              isSidebarOpen={isSidebarOpen}
            />
          ))}
        </div>
      </aside>
      <section
        id="main"
        className="-z-10 max-w-2xl pl-12 pr-2 md:mx-auto md:w-[90%] md:p-0"
      >
        <h1 className="mb-2 text-2xl font-semibold text-black lg:mb-4 lg:text-4xl">
          {active}
        </h1>
        {allItems.find((item) => item.item === active)?.content}
      </section>
    </main>
  );
};

export default page;

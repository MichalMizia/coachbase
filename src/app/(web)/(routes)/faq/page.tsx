"use client";

// data
import { FaqItem, faqItemsHeader, faqItemsMain } from "@/config/faq";
// import { useQueryStore } from "@/lib/state/media-queries-generation";
import { classNames } from "@/lib/utils";
// types
import { SidebarOpenIcon } from "lucide-react";
import { Metadata } from "next";
import { useMemo, useState } from "react";
import { SidebarItem } from "./@components/SidebarItem";

// export const metadata: Metadata = {
//   title: "FAQ - CoachBase",
//   description: "Strona z najczęściej zadawanymi pytaniami do firmy CoachBase",
// };

const Page = ({}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(() => {
    if (window.innerWidth >= 900) {
      return true;
    }
    return false;
  });
  const [active, setActive] = useState<string>("O Projekcie");
  const allItems: FaqItem[] = useMemo(() => {
    return faqItemsHeader.concat(faqItemsMain);
  }, []);

  return (
    <main className="min-h-screen bg-white py-6 text-gray-800 lg:py-10">
      <aside className="fixed left-0 top-0 z-20 flex min-h-screen w-auto flex-col justify-start border-r bg-white pt-[75px] shadow-md shadow-[#00000020] transition-all duration-500">
        <button
          className="relative w-full border-b bg-bg p-2 transition-all hover:bg-slate-300 lg:px-4"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          aria-haspopup="menu"
          aria-controls="sidebar"
          aria-label={
            isSidebarOpen ? "Zamknij pasek nawigacji" : "Otwórz pasek nawigacji"
          }
          title={
            isSidebarOpen ? "Zamknij pasek nawigacji" : "Otwórz pasek nawigacji"
          }
        >
          <SidebarOpenIcon
            className={classNames(
              "transition-all",
              isSidebarOpen ? "rotate-180" : "rotate-0"
            )}
          />
        </button>
        <div
          className="flex w-full flex-col justify-center border-b"
          id="sidebar"
        >
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
      {/* <section className="z-10 flex h-screen w-screen items-center justify-center bg-white">
        <div className="relative isolate aspect-square h-96 rounded-full bg-gradient-to-tr from-blue-300 via-blue-500 to-indigo-500">
          <div className="absolute inset-0 z-10 m-auto aspect-square h-[320px] overflow-hidden rounded-full bg-white">
            <SendIcon
              size={420}
              strokeWidth={1.5}
              className="absolute left-[40%] top-[60%] z-20 -translate-x-1/2 -translate-y-1/2 opacity-[0.12]"
            />
          </div>
          <p className="quick absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 font-serif text-[200px] font-semibold tracking-tight text-gray-900">
            <span className="relative -top-8 left-1">C</span>
            <span className="relative right-1 top-8">B</span>
          </p>
          <div className="absolute right-0 top-0 z-20 aspect-[18/4] w-36 -translate-x-[10%] translate-y-[100%] -rotate-45 rounded-[300%] bg-gradient-to-r from-blue-500 to-indigo-500"></div>
          <div className="absolute bottom-0 left-0 z-20 aspect-[18/4] w-36 -translate-x-[5%] -translate-y-[170%] -rotate-45 rounded-[300%] bg-gradient-to-r from-blue-400 via-blue-400 to-blue-500"></div>
        </div>
      </section> */}
    </main>
  );
};

export default Page;

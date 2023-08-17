"use client";

// data
import { useLocalStorage } from "@/lib/hooks/useLocalStorage";
// types
import { Suspense, useRef, useState } from "react";
import Sidebar from "./@components/Sidebar";
import { Loader2 } from "lucide-react";
import FaqContent from "./@components/FaqContent";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Page = ({}) => {
  const [active, setActive] = useLocalStorage<string>(
    "FAQ_ITEM_KEY",
    "O Projekcie",
    localStorage
  );
  const [open, setOpen] = useState(false);

  return (
    <section className="relative h-full w-full flex-1 border-t border-gray-300">
      <div className="grid h-full rounded-lg lg:grid-cols-4 lg:rounded-none xl:[grid-template-columns:320px_1fr]">
        <Suspense
          fallback={
            <div className="col-span-1 hidden h-full max-w-xs items-center justify-center bg-white lg:flex">
              <Loader2 size={24} className="text-gray-700" />
            </div>
          }
        >
          <div className="col-span-1 hidden h-full w-full max-w-xs self-stretch overflow-auto border-r-2 border-indigo-500/20 bg-bg pb-8 transition-all lg:block">
            <Sidebar
              setOpen={undefined}
              setActive={setActive}
              active={active}
              className=""
            />
          </div>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <div className="absolute right-[5vw] top-8 z-10 h-14 w-14 scale-75 cursor-pointer rounded-2xl bg-blue-500 p-3 text-white transition-all duration-300 hover:bg-blue-600 lg:hidden">
                <div className="absolute inset-0 m-auto flex h-10 w-[38px] flex-col items-start justify-center gap-[7px]">
                  <span className="h-[4px] w-[19px] rounded-lg bg-white"></span>
                  <span className="h-[4px] w-[38px] rounded-lg bg-white"></span>
                  <span className="h-[4px] w-[19px] self-end rounded-lg bg-white"></span>
                </div>
              </div>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="!z-[1000] col-span-1 block h-full w-full max-w-xs self-stretch overflow-auto border-r-2 border-indigo-500/20 bg-bg !px-0 pb-8 transition-all lg:hidden"
            >
              <Sidebar
                setActive={setActive}
                active={active}
                className=""
                setOpen={setOpen}
              />
            </SheetContent>
          </Sheet>
        </Suspense>
        <div className="col-span-3 w-full overflow-y-hidden bg-blue-500 lg:bg-transparent xl:col-span-1">
          <div className="scrollbar-custom h-full w-full overflow-y-auto rounded-t-[24px] border border-white bg-white pb-16 lg:pb-0">
            <FaqContent active={active} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;

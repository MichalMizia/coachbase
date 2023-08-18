"use client";

import { cn } from "@/lib/utils";
import Logo from "@/components/custom/Logo";
import { faqItemsHeader, faqItemsMain } from "@/config/faq";
import { MutableRefObject } from "react";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  active: string;
  setActive: (arg: string) => void;
  setOpen?: (arg: boolean) => void;
}

export default function Sidebar({
  active,
  setActive,
  className,
  setOpen,
  ...props
}: SidebarProps) {
  return (
    <div className="space-y-4 pb-4">
      <div className="border-b-2 border-indigo_custom/20 py-6">
        <Logo className="!text-gray-800" />
      </div>
      <div className="px-3 py-2">
        <h2 className="mb-2  px-4 text-lg font-semibold tracking-tight text-black">
          Projekt
        </h2>
        <div className="">
          {faqItemsHeader.map((item) => (
            <button
              key={item.item}
              onClick={() => {
                setActive(item.item);
                if (setOpen) {
                  setOpen(false);
                }
              }}
              className={cn(
                "flex w-full items-center justify-stretch rounded-md px-6 py-3 font-semibold text-gray-700 outline-none transition-all",
                active?.includes(item.item)
                  ? " bg-indigo_custom/90 text-white"
                  : "hover:bg-indigo_custom/20"
              )}
            >
              {item.icon({ className: "mr-2 h-5 w-5" })}
              {item.item}
            </button>
          ))}
        </div>
      </div>
      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight text-black">
          Dla Trenera
        </h2>
        {faqItemsMain.map((item) => (
          <button
            key={item.item}
            onClick={() => setActive(item.item)}
            className={cn(
              "flex w-full items-center justify-stretch rounded-md px-6 py-3 font-semibold text-gray-700 outline-none transition-all",
              active?.includes(item.item)
                ? " bg-indigo_custom/90 text-white"
                : "hover:bg-indigo_custom/20"
            )}
          >
            {item.icon({ className: "mr-2 h-5 w-5" })}
            {item.item}
          </button>
        ))}
      </div>
    </div>
  );
}

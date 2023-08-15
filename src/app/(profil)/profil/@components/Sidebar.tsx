"use client";

import { cn } from "@/lib/utils";
import { CalendarDays, FileText } from "lucide-react";
import { usePathname } from "next/navigation";
import Logo from "@/components/custom/Logo";
import { Icons } from "@/components/ui/icons";
import Link from "next/link";
import { HoverCard, HoverCardContent } from "@/components/ui/hover-card";
import { HoverCardTrigger } from "@radix-ui/react-hover-card";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function Sidebar({ className, ...props }: SidebarProps) {
  const pathname = usePathname();
  return (
    <div
      className={cn(
        "h-screen w-full self-stretch overflow-auto border-r-2 border-indigo-500/20 bg-bg pb-8 transition-all",
        className
      )}
      {...props}
    >
      <div className="space-y-4 pb-4">
        <div className="border-b-2 border-indigo_custom/20 py-6">
          <Logo className="!text-gray-800" />
        </div>
        <div className="px-3 py-2">
          <h2 className="mb-2  px-4 text-lg font-semibold tracking-tight text-black">
            Profil
          </h2>
          <div className="">
            <Link href="/profil" title="O mnie">
              <button
                className={cn(
                  "flex w-full items-center justify-stretch rounded-md px-6 py-3 font-semibold text-gray-700 outline-none transition-all",
                  pathname?.endsWith("profil")
                    ? " bg-indigo_custom/90 text-white"
                    : "hover:bg-indigo_custom/20"
                )}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2 h-4 w-4"
                >
                  <rect width="7" height="7" x="3" y="3" rx="1" />
                  <rect width="7" height="7" x="14" y="3" rx="1" />
                  <rect width="7" height="7" x="14" y="14" rx="1" />
                  <rect width="7" height="7" x="3" y="14" rx="1" />
                </svg>
                O mnie
              </button>
            </Link>
            <Link href="/profil/oferty" title="Oferty">
              <button
                className={cn(
                  "flex w-full items-center justify-stretch rounded-md px-6 py-3 font-semibold text-gray-700 outline-none transition-all",
                  pathname?.includes("oferty")
                    ? " bg-indigo_custom/90 text-white"
                    : "hover:bg-indigo_custom/20"
                )}
              >
                <Icons.logo className="mr-2 h-4 w-4" />
                Oferty
              </button>
            </Link>
            <Link href="/profil/efekty" title="Efekty współpracy z trenerem.">
              <button
                className={cn(
                  "flex w-full items-center justify-stretch rounded-md px-6 py-3 font-semibold text-gray-700 outline-none transition-all",
                  pathname?.includes("efekty")
                    ? " bg-indigo_custom/90 text-white"
                    : "hover:bg-indigo_custom/20"
                )}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-line-chart mr-2 h-4 w-4"
                >
                  <path d="M3 3v18h18" />
                  <path d="m19 9-5 5-4-4-3 3" />
                </svg>
                Efekty
              </button>
            </Link>
            {/* <Link href="/profil/faq" title="Twoje FAQ">
              <button
                className={cn(
                  "flex w-full items-center justify-stretch rounded-md px-6 py-3 font-semibold text-gray-700 outline-none transition-all",
                  pathname?.includes("faq")
                    ? " bg-indigo_custom/90 text-white"
                    : "hover:bg-indigo_custom/20"
                )}
              >
                <Icons.logo className="mr-2 h-4 w-4" />
                Twoje FAQ
              </button>
            </Link> */}
            <Link href="/profil/artykuly" title="Artykuły">
              <button
                className={cn(
                  "flex w-full items-center justify-stretch rounded-md px-6 py-3 font-semibold text-gray-700 outline-none transition-all",
                  pathname?.includes("artykuly")
                    ? " bg-indigo_custom/90 text-white"
                    : "hover:bg-indigo_custom/20"
                )}
              >
                <FileText size={16} className="mr-2 h-4 w-4" />
                Artykuły
              </button>
            </Link>
            <HoverCard>
              <HoverCardTrigger asChild>
                <Link
                  href="/profil/informacje"
                  title="Tagi/Lokalizacja/Social Media"
                >
                  <button
                    className={cn(
                      "flex w-full items-center justify-stretch rounded-md px-6 py-3 font-semibold text-gray-700 outline-none transition-all",
                      pathname?.includes("/informacje")
                        ? " bg-indigo_custom/90 text-white"
                        : "hover:bg-indigo_custom/20"
                    )}
                  >
                    <Icons.settings size={16} className="mr-2 h-4 w-4" />
                    Informacje
                  </button>
                </Link>
              </HoverCardTrigger>
              <HoverCardContent className="w-80 translate-x-[15%]">
                <div className="flex justify-between space-x-4">
                  <div className="space-y-1">
                    <h4 className="text-h6 font-semibold">
                      Informacje Profilowe
                    </h4>
                    <p className="text-sm">
                      W tej sekcji możesz dodać swoje specjalizacje czyli tagi
                      które pomagają uplasować się wyżej w wynikach
                      wyszukiwania, zmienić lokalizację czy dodać linki do
                      swoich mediów
                    </p>
                    <div className="flex items-center pt-2">
                      <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
                      <span className="text-xs text-muted-foreground">
                        Edytuj
                      </span>
                    </div>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>
        </div>
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight text-black">
            Ustawienia
          </h2>
          <div className="mx-2 min-h-[180px] rounded-md bg-slate-100 shadow-md">
            {/* <Button
              size="large"
              variant="text"
              className="w-full justify-start text-text_readable"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2 h-4 w-4 text-slate-500"
              >
                <path d="M21 15V6" />
                <path d="M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                <path d="M12 12H3" />
                <path d="M16 6H3" />
                <path d="M12 18H3" />
              </svg>
              Playlists
            </Button>
            <Button
              size="large"
              variant="text"
              className="w-full justify-start text-text_readable"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2 h-4 w-4 text-slate-500"
              >
                <circle cx="8" cy="18" r="4" />
                <path d="M12 18V2l7 4" />
              </svg>
              Songs
            </Button>
            <Button
              size="large"
              variant="text"
              className="w-full justify-start text-text_readable"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2 h-4 w-4 text-slate-500"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              Made for You
            </Button>
            <Button
              size="large"
              variant="text"
              className="w-full justify-start text-text_readable"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2 h-4 w-4 text-slate-500"
              >
                <path d="m12 8-9.04 9.06a2.82 2.82 0 1 0 3.98 3.98L16 12" />
                <circle cx="17" cy="7" r="5" />
              </svg>
              Artists
            </Button>
            <Button
              size="large"
              variant="text"
              className="w-full justify-start text-text_readable"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2 h-4 w-4 text-slate-500"
              >
                <path d="m16 6 4 14" />
                <path d="M12 6v14" />
                <path d="M8 8v12" />
                <path d="M4 4v16" />
              </svg>
              Albums
            </Button> */}
          </div>
        </div>
      </div>
    </div>
  );
}

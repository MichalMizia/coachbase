"use client";

import { cn } from "@/lib/utils";
import { CalendarDays } from "lucide-react";
import { usePathname } from "next/navigation";
import Logo from "@/components/custom/Logo";
import { Icons } from "@/components/ui/icons";
import Link from "next/link";
import { HoverCard, HoverCardContent } from "@/components/ui/hover-card";
import { HoverCardTrigger } from "@radix-ui/react-hover-card";

interface UserSidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function UserSidebar({ className, ...props }: UserSidebarProps) {
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
            <HoverCard>
              <HoverCardTrigger asChild>
                <Link href="/konto-uzytkownika" title="Ustawienia">
                  <button
                    className={cn(
                      "flex w-full items-center justify-stretch rounded-md px-6 py-3 font-semibold text-gray-700 outline-none transition-all",
                      pathname?.startsWith("/konto-uzytkownika")
                        ? " bg-indigo_custom/90 text-white"
                        : "hover:bg-indigo_custom/20"
                    )}
                  >
                    <Icons.settings size={16} className="mr-2 h-4 w-4" />
                    Ustawienia
                  </button>
                </Link>
              </HoverCardTrigger>
              <HoverCardContent className="w-80 translate-x-[15%]">
                <div className="flex justify-between space-x-4">
                  <div className="space-y-1">
                    <h4 className="text-h6 font-semibold">Ustawienia</h4>
                    <p className="text-sm">
                      W tej sekcji możesz zmienić swoje preferencję, dodać
                      zdjęcie profilowe, zmienić email lub złożyć wniosek o
                      zostanie trenerem
                    </p>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
            {/* <Link href="/profil/opinie" title="Opinie">
              <button
                className={cn(
                  "flex w-full items-center justify-stretch rounded-md px-6 py-3 font-semibold text-gray-700 outline-none transition-all",
                  pathname?.includes("opinie")
                    ? " bg-indigo_custom/90 text-white"
                    : "hover:bg-indigo_custom/20"
                )}
              >
                <Icons.logo className="mr-2 h-4 w-4" />
                Twoje Opinie
              </button>
            </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
}

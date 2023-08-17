"use client";

// assets
import { AlbumIcon, MessagesSquareIcon, NewspaperIcon } from "lucide-react";
import Logo from "./custom/Logo";
// components
import Link from "next/link";
import LoginButton from "./LoginButton";
// hooks / utils
import useMediaQuery from "@/lib/hooks/useMediaQuery";
import { cn } from "@/lib/utils";
import { type Session } from "next-auth";
// ts
import { HomeConfig } from "@/types";
// styles
import { usePathname } from "next/navigation";
import ProfileLink from "./ProfileLink";
import Button from "./ui/Button";

interface NavbarProps {
  session: Session | null;
}

const homeConfig: HomeConfig = {
  mainNav: [
    {
      title: "Oferty",
      href: "/oferty",
      icon: (
        <MessagesSquareIcon
          className="h-[19px] w-[19px] md:h-[26px] md:w-[26px] nav:mr-2 nav:mt-[2px] nav:h-[22px] nav:w-[22px]"

          // stroke="#5E6E81"
        />
      ),
    },
    {
      title: "Artykuły",
      href: "/blog",
      icon: (
        <NewspaperIcon className="h-[19px] w-[19px] md:h-[26px] md:w-[26px] nav:mr-2 nav:mt-[2px] nav:h-[22px] nav:w-[22px]" />
      ),
    },
    {
      title: "FAQ",
      href: "/faq",
      icon: (
        <AlbumIcon className="h-[19px] w-[19px] md:h-[26px] md:w-[26px] nav:mr-2 nav:mt-[2px] nav:h-[22px] nav:w-[22px]" />
      ),
    },
  ],
};

export default function Navbar({ session }: NavbarProps) {
  const isLarge = useMediaQuery("(min-width: 1120px)");
  const pathname = usePathname();

  return (
    <header className="fixed left-0 right-0 top-0 z-[999] w-full bg-blue-500 bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 py-4 text-white shadow-sm shadow-slate-400">
      <div className="container-md mx-auto flex w-[95%] items-end justify-between gap-4 lg:gap-8">
        <Logo className="scale-90" />

        <nav className="fixed bottom-0 left-0 right-0 w-full bg-white nav:static nav:flex nav:w-fit nav:!translate-x-0 nav:items-end nav:justify-center nav:bg-transparent">
          <ul className="flex w-full list-none items-center border-t border-text nav:w-fit nav:justify-center nav:border-none nav:tracking-tight nav:lg:gap-2">
            {homeConfig.mainNav.map((navEl) => {
              return (
                <Button
                  variant="text"
                  size="small"
                  key={navEl.title}
                  name={navEl.title}
                  className={cn(
                    pathname?.includes(navEl.href) ? "bg-blue-100" : "",
                    "flex-1 rounded-none text-sm text-text_readable  even:border-x even:border-text hover:bg-[#00000010] md:text-lg nav:rounded-md nav:border-none nav:bg-transparent nav:text-[17px] nav:font-normal nav:text-gray-100"
                  )}
                >
                  <Link
                    className={cn(
                      "flex h-full w-full flex-col items-center justify-center nav:flex-row"
                    )}
                    title={navEl.title}
                    href={navEl.href}
                  >
                    {navEl.icon}
                    {navEl.title}
                  </Link>
                </Button>
              );
            })}
          </ul>
        </nav>

        <section
          id="profile"
          className="flex items-center justify-center gap-2 lg:gap-4"
        >
          {/* <Link href="/">
            <HeartIcon />
          </Link> */}
          <ProfileLink username={session?.user.username} isLarge={isLarge} />
          <LoginButton session={session} />
        </section>
      </div>
    </header>
  );
}

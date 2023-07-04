"use client";

// assets
import Logo from "./ui/Logo";
import {
  AlbumIcon,
  HeartIcon,
  MessagesSquareIcon,
  NewspaperIcon,
  UserIcon,
} from "lucide-react";
// components
import Link from "next/link";
import LoginButton from "./LoginButton";
// hooks / utils
import { Session } from "next-auth";
import useMediaQuery from "@/lib/hooks/useMediaQuery";
import { useState } from "react";
import { classNames } from "@/lib/utils";
// ts
import { HomeConfig } from "@/types";
// styles
import "../css/nav.css";
import Button from "./ui/Button";
import { usePathname } from "next/navigation";
import ProfileLink from "./ProfileLink";

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
          className="mr-2 mt-[2px]"
          size={20}
          // stroke="#5E6E81"
        />
      ),
    },
    {
      title: "Artykuły",
      href: "/blog",
      icon: <NewspaperIcon className="mr-2 mt-[2px]" size={20} />,
    },
    {
      title: "FAQ",
      href: "/faq",
      icon: <AlbumIcon className="mr-2 mt-[2px]" size={20} />,
    },
  ],
};

export default function Navbar({ session }: NavbarProps) {
  const isMobile = useMediaQuery("(max-width: 800px)");
  const isLarge = useMediaQuery("(min-width: 1120px)");
  const pathname = usePathname();

  return (
    <header className="fixed left-0 right-0 top-0 z-[999] w-full bg-blue-500 bg-gradient-to-r from-blue-700 via-blue-500 to-blue-400 py-4 text-white shadow-sm shadow-slate-400">
      <div className="container-md mx-auto flex w-[95%] items-end justify-between gap-4 lg:gap-8">
        <Logo className="scale-90" />

        <nav
          className={classNames(
            isMobile
              ? "fixed bottom-0 left-0 right-0 w-full bg-white"
              : "flex !translate-x-0 items-end justify-center"
          )}
        >
          <ul
            className={classNames(
              !isMobile
                ? "justify-center tracking-tight lg:gap-2"
                : "w-full border-t border-text",
              "flex list-none items-center"
            )}
          >
            {homeConfig.mainNav.map((navEl) => {
              return (
                <Button
                  variant="text"
                  key={navEl.title}
                  className={classNames(
                    navEl.disabled ? "text-gray-300" : "text-white",
                    isMobile
                      ? pathname?.includes(navEl.href)
                        ? "flex-1 rounded-none bg-blue-100 text-sm text-gray-800 even:border-x even:border-text_readable md:text-lg"
                        : "flex-1 rounded-none text-sm text-gray-800 even:border-x even:border-text_readable md:text-lg"
                      : "text-[17px] font-[400]",
                    "hover:bg-[#00000010]"
                  )}
                >
                  <Link
                    className={classNames(
                      "flex h-full w-full items-center justify-center",
                      isMobile ? "flex-col gap-0.5" : ""
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

        {/* {!isMobile ? null : (
          <button
            onClick={handleMenuToggle}
            className={classNames(
              isMenuOpen ? "menu-toggle-active" : "",
              "menu-toggle"
            )}
          >
            <span></span>
          </button>
        )} */}
      </div>
    </header>
  );
}

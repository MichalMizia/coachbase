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
import useMediaQuery from "@/lib/useMediaQuery";
import { useState } from "react";
import { classNames } from "@/lib/utils";
// ts
import { HomeConfig } from "@/types";
// styles
import "../css/nav.css";
import Button from "./ui/Button";

interface NavbarProps {
  session: Session | null;
}

const homeConfig: HomeConfig = {
  mainNav: [
    {
      title: "Oferty",
      href: "/oferty",
      icon: <MessagesSquareIcon className="mr-2 mt-[2px]" size={20} />,
    },
    {
      title: "Artykuły",
      href: "/blog",
      icon: <NewspaperIcon className="mr-2 mt-[2px]" size={20} />,
    },
    {
      title: "O nas",
      href: "/o-nas",
      icon: <AlbumIcon className="mr-2 mt-[2px]" size={20} />,
    },
  ],
};

export default function Navbar({ session }: NavbarProps) {
  const isMobile = useMediaQuery("(max-width: 900px)");
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-[999] w-full bg-blue-500 bg-gradient-to-r from-blue-700 via-blue-500 to-blue-400 py-4 text-white shadow-sm shadow-slate-400">
      <div className="mx-auto flex w-[95%] max-w-7xl items-end justify-between gap-8 lg:w-[90%]">
        <Logo />

        <nav
          className={classNames(
            isMobile
              ? "fixed bottom-0 right-0 top-0 z-10 flex h-screen w-screen max-w-xl items-center justify-center bg-white bg-gradient-to-br from-violet-100 via-white to-rose-100 backdrop-blur-[2px] transition-transform duration-500"
              : "flex !translate-x-0 items-end justify-center",
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <ul
            className={classNames(
              "flex list-none items-center justify-center gap-2 tracking-tight",
              isMobile ? "flex-col gap-[15vh] px-4" : "mr-4"
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
                      ? "text-2xl font-semibold"
                      : "text-[17px] font-[400]",
                    "hover:bg-[#00000010]"
                  )}
                >
                  {navEl.icon}
                  <a href={navEl.href}>{navEl.title}</a>
                </Button>
              );
            })}
          </ul>
        </nav>

        <section
          id="profile"
          className="flex items-center justify-center gap-4"
        >
          <Link href="/">
            <HeartIcon />
          </Link>
          <Link href="/profil">
            <UserIcon />
          </Link>
          <LoginButton session={session} />
        </section>

        {!isMobile ? null : (
          <button
            onClick={handleMenuToggle}
            className={classNames(
              isMenuOpen ? "menu-toggle-active" : "",
              "menu-toggle"
            )}
          >
            <span></span>
          </button>
        )}
      </div>
    </header>
  );
}

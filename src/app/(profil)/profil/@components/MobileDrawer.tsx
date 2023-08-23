"use client";

// icons
import Logo from "@/components/custom/Logo";
import { cn } from "@/lib/utils";
import { Command, FileText, Mailbox, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HTMLAttributes } from "react";
import { Drawer } from "vaul";

interface MobileDrawerProps extends HTMLAttributes<HTMLDivElement> {}

const MobileDrawer = ({ className, ...props }: MobileDrawerProps) => {
  const pathname = usePathname();

  return (
    <Drawer.Root shouldScaleBackground fixedHeight>
      <Drawer.Trigger asChild>
        <div className="relative z-10 h-14 w-14 scale-75 cursor-pointer rounded-full p-2 text-white transition-all duration-300 hover:bg-black/20">
          <div className="absolute inset-0 m-auto flex h-10 w-[38px] flex-col items-start justify-center gap-[7px]">
            <span className="h-[4px] w-[19px] rounded-lg bg-white"></span>
            <span className="h-[4px] w-[38px] rounded-lg bg-white"></span>
            <span className="h-[4px] w-[19px] self-end rounded-lg bg-white"></span>
          </div>
        </div>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="fixed bottom-0 left-0 right-0 z-30 flex max-h-[85vh] flex-col rounded-t-[10px] bg-bg">
          <div
            className={cn(
              "h-full w-full self-stretch overflow-auto pb-8 transition-all",
              className
            )}
            {...props}
          >
            <div className="mx-auto h-full max-w-sm">
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
                    <Link
                      href="/profil/doswiadczenie"
                      title="Doświadczenie trenerskie"
                    >
                      <button
                        className={cn(
                          "flex w-full items-center justify-stretch rounded-md px-6 py-3 font-semibold text-gray-700 outline-none transition-all",
                          pathname?.includes("doswiadczenie")
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
                        Doświadczenie
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
                        <Command className="mr-2 h-4 w-4" />
                        Oferty
                      </button>
                    </Link>

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
                        <Settings size={16} className="mr-2 h-4 w-4" />
                        Informacje
                      </button>
                    </Link>
                  </div>
                </div>
                <div className="px-3 py-2">
                  <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight text-black">
                    Co u ciebie?
                  </h2>
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
                  <Link href="/profil/aktualnosci" title="Aktualności">
                    <button
                      className={cn(
                        "flex w-full items-center justify-stretch rounded-md px-6 py-3 font-semibold text-gray-700 outline-none transition-all",
                        pathname?.includes("aktualnosci")
                          ? " bg-indigo_custom/90 text-white"
                          : "hover:bg-indigo_custom/20"
                      )}
                    >
                      <Mailbox size={16} className="mr-2 h-4 w-4" />
                      Aktualności
                    </button>
                  </Link>
                </div>
                <div className="px-3 py-2">
                  <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight text-black">
                    Ustawienia
                  </h2>
                  <Link href="/profil/ustawienia" title="Ustawienia Konta">
                    <button
                      className={cn(
                        "flex w-full items-center justify-stretch rounded-md px-6 py-3 font-semibold text-gray-700 outline-none transition-all",
                        pathname?.endsWith("ustawienia")
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
                        className="mr-2 h-4 w-4 text-current"
                      >
                        <path d="m16 6 4 14" />
                        <path d="M12 6v14" />
                        <path d="M8 8v12" />
                        <path d="M4 4v16" />
                      </svg>
                      Konto
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default MobileDrawer;

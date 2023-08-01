"use client";

import useMediaQuery from "@/lib/hooks/useMediaQuery";
import { useQueryStore } from "@/lib/state/media-queries-generation";
import { classNames } from "@/lib/utils";
import { XIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { ToastBar, Toaster, toast } from "react-hot-toast";

interface ProvidersProps {
  children: ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
  const isMobile = useMediaQuery("(max-width: 800px)");
  const isLarge = useMediaQuery("(min-width: 960px)");

  const { setIsMobile, setIsLarge } = useQueryStore();
  useEffect(() => {
    setIsMobile(isMobile);
  }, [isMobile]);
  useEffect(() => {
    setIsLarge(isLarge);
  }, [isLarge]);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false}>
        {(t) => (
          <ToastBar
            toast={t}
            style={{
              padding: t.className?.includes("custom") ? "0" : "8px 10px",
            }}
          >
            {({ icon, message }) =>
              t.className?.includes("custom") ? (
                <div
                  className={classNames(
                    "flex items-stretch rounded-sm shadow-md shadow-[#00000020]",
                    t.type === "success"
                      ? "bg-green-100 outline outline-2 outline-green-500"
                      : t.type === "error"
                      ? "border border-red-400 bg-red-100"
                      : ""
                  )}
                >
                  <div className="flex items-center justify-center gap-2 p-4">
                    {t.type === "success" || t.type === "error" ? (
                      <div className="aspect-square scale-125 rounded-full border bg-white p-2">
                        {icon}
                      </div>
                    ) : (
                      icon
                    )}
                    {message}
                  </div>
                  {t.type !== "loading" && (
                    <div className="flex items-start justify-end self-stretch p-1">
                      <button
                        className="z-10 rounded-full p-1 transition-all hover:bg-[#00000010]"
                        onClick={() => toast.dismiss(t.id)}
                      >
                        <XIcon />
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  {icon}
                  {message}
                </>
              )
            }
          </ToastBar>
        )}
      </Toaster>
      {/* <Toaster position="top-center" reverseOrder={false} /> */}
      {children}
    </>
  );
};

export default Providers;

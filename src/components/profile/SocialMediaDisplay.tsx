"use client";

import useMediaQuery from "@/lib/hooks/useMediaQuery";
import { classNames } from "@/lib/utils";
import { FacebookIcon, InstagramIcon, MailIcon } from "lucide-react";

interface SocialMediaDisplayProps {
  instagram?: string;
  facebook?: string;
  email?: string;
  className?: string;
}

const SocialMediaDisplay = ({
  instagram,
  facebook,
  email,
  className,
}: SocialMediaDisplayProps) => {
  const isMobile = useMediaQuery("(max-width: 500px)");

  return (
    <div
      className={classNames(
        "isolate z-10 flex items-stretch justify-center gap-1 rounded-b-lg text-black md:gap-2",
        className!
      )}
    >
      {instagram && instagram.length ? (
        <a
          href={instagram}
          target="_blank"
          referrerPolicy="no-referrer"
          className="group relative isolate flex aspect-square items-center justify-center border-b border-b-white p-3"
        >
          <InstagramIcon size={isMobile ? 20 : 22} className="z-10" />
          <p className="absolute bottom-0 left-[calc(100%-4px)] top-0 z-20 flex h-full origin-left scale-x-0 items-center bg-white pl-3 pr-2 text-sm transition-all duration-[400ms] group-hover:scale-x-100 md:text-[17px]">
            {instagram}
          </p>
        </a>
      ) : null}
      {facebook && facebook.length ? (
        <a
          href={facebook}
          target="_blank"
          referrerPolicy="no-referrer"
          className="group relative flex aspect-square items-center justify-center border-b border-b-white  p-2"
        >
          <FacebookIcon size={isMobile ? 20 : 22} className="z-10" />
          <p className="absolute bottom-0 left-[calc(100%-4px)] top-0 z-20 flex h-full origin-left scale-x-0 items-center bg-white  pl-3 pr-2 text-sm transition-all duration-[400ms] group-hover:scale-x-100 md:text-[17px]">
            {facebook}
          </p>
        </a>
      ) : null}
      {email && email.length ? (
        <a
          href={email}
          target="_blank"
          referrerPolicy="no-referrer"
          className="group relative flex aspect-square items-center justify-center border-b border-b-white p-2"
        >
          <MailIcon size={isMobile ? 20 : 22} className="z-10" />
          <p className="absolute bottom-0 left-[calc(100%-4px)] top-0 z-20 flex h-full origin-left scale-x-0 items-center bg-white pl-3 pr-2 text-sm transition-all duration-[400ms] group-hover:scale-x-100 md:text-[17px]">
            {email}
          </p>
        </a>
      ) : null}
    </div>
  );
};

export default SocialMediaDisplay;

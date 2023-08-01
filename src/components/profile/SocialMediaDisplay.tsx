"use client";

import useMediaQuery from "@/lib/hooks/useMediaQuery";
import { classNames, copyToClipboard } from "@/lib/utils";
import { FacebookIcon, InstagramIcon, MailIcon } from "lucide-react";
import { toast } from "react-hot-toast";

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
        "isolate z-10 flex items-stretch justify-center gap-1 rounded-b-lg text-black",
        className!
      )}
    >
      {instagram && instagram.length ? (
        <a
          href={instagram}
          target="_blank"
          referrerPolicy="no-referrer"
          className="flex aspect-square items-center justify-center border-b border-b-white px-0.5"
        >
          <InstagramIcon
            size={isMobile ? 17 : 21}
            className="z-10 text-gray-800"
          />
        </a>
      ) : null}
      {facebook && facebook.length && (
        <a
          href={facebook}
          target="_blank"
          referrerPolicy="no-referrer"
          className="flex aspect-square items-center justify-center border-b border-b-white p-1"
        >
          <FacebookIcon
            size={isMobile ? 17 : 21}
            className="z-10 text-gray-800"
          />
        </a>
      )}
      {email && email.length && (
        <button
          title="Email"
          onClick={() => {
            copyToClipboard(email);
            toast.success("Skopiowano email");
          }}
          className="flex aspect-square items-center justify-center border-b border-b-white p-1"
        >
          <MailIcon size={isMobile ? 17 : 21} className="z-10 text-gray-800" />
        </button>
      )}
    </div>
  );
};

export default SocialMediaDisplay;

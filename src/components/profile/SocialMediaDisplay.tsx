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
        "flex items-stretch justify-center gap-1",
        className!
      )}
    >
      {instagram && instagram.length ? (
        <a
          title="Instagram"
          href={instagram}
          target="_blank"
          referrerPolicy="no-referrer"
          rel="nofollow"
          className="flex aspect-square items-center justify-center border-b border-b-white px-0.5"
        >
          <InstagramIcon size={isMobile ? 17 : 21} className="text-gray-800" />
        </a>
      ) : null}
      {facebook && facebook.length && (
        <a
          title="Facebook"
          href={facebook}
          target="_blank"
          referrerPolicy="no-referrer"
          rel="nofollow"
          className="flex aspect-square items-center justify-center border-b border-b-white p-1"
        >
          <FacebookIcon size={isMobile ? 17 : 21} className="text-gray-800" />
        </a>
      )}
      {email && email.length && (
        <a
          title="Email"
          href={`mailto:${email}`}
          target="_blank"
          referrerPolicy="no-referrer"
          rel="nofollow"
          className="flex aspect-square items-center justify-center border-b border-b-white p-1"
        >
          <MailIcon size={isMobile ? 17 : 21} className="text-gray-800" />
        </a>
      )}
    </div>
  );
};

export default SocialMediaDisplay;

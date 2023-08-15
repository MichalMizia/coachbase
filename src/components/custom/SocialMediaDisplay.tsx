"use client";

import useMediaQuery from "@/lib/hooks/useMediaQuery";
import { cn } from "@/lib/utils";
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
  return (
    <div
      className={cn("flex items-stretch justify-center gap-0.5", className!)}
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
          <InstagramIcon className="h-6 w-6 text-gray-800" />
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
          <FacebookIcon className="h-6 w-6 text-gray-800" />
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
          <MailIcon className="h-6 w-6 text-gray-800" />
        </a>
      )}
    </div>
  );
};

export default SocialMediaDisplay;

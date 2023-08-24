import { cn } from "@/lib/utils";
import { SendIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { HTMLProps } from "react";
import ImagePlaceholder from "@/../public/assets/image-placeholder.jpg";

interface OfferCardProps extends HTMLProps<HTMLLIElement> {
  username: string;
  id: string;
  slug: string;
  avatar?: string;
  image?: string;
  city: string;
  summary: string;
}

const OfferCard = ({
  username,
  id,
  slug,
  avatar,
  image,
  city,
  summary,
}: OfferCardProps) => {
  return (
    <li className="flex w-full max-w-md items-stretch justify-stretch">
      <Link
        href={`/oferty/${slug}`}
        rel="dofollow"
        hrefLang="pl"
        className="group relative flex h-full w-full flex-col items-stretch justify-start rounded-md bg-white shadow-sm transition-all hover:shadow-md"
      >
        <header className="flex h-[70px] items-center justify-start gap-2 px-4 py-3">
          <div className="relative flex aspect-square h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-violet-300 bg-blue-400 bg-gradient-to-tr from-orange-500/50 via-blue-500 to-blue-400 p-1 text-sm font-semibold text-white shadow-lg shadow-[#00000030]">
            {avatar ? (
              <Image
                src={avatar}
                alt={`Avatar ${username}`}
                className=" object-cover"
                fill
              />
            ) : (
              username
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()
            )}
          </div>
          <div className="">
            <h4
              style={{ fontSize: "var(--size-step-0)" }}
              className="font-[500] text-gray-800"
            >
              {username}
            </h4>
            <p className="relative -top-1 text-h6">{city}</p>
          </div>
        </header>
        <div className="relative isolate aspect-video w-full border-l-2 border-r-2 border-white shadow-md">
          <Image
            className="object-cover"
            src={image || ImagePlaceholder}
            alt={`Zdjęcie Profilowe ${username}`}
            fill
          />
        </div>
        <main className={cn("flex h-full flex-1 flex-col justify-between p-4")}>
          <header>
            {/* <StarsRating className="mb-1" rating={.rating} /> */}
            <p
              id="description"
              className="arial line-clamp-6 text-h6 text-gray-700"
            >
              {summary}
            </p>
          </header>

          <div className="mt-2 flex items-stretch justify-start gap-4">
            <button className="mt-2 flex items-center justify-center gap-1 rounded-sm px-2 py-1 text-sm text-gray-700 ring-1 ring-gray-400 transition-all duration-300 hover:ring-2 hover:ring-gray-600 hover:ring-offset-1 focus:ring-2 focus:ring-gray-600 focus:ring-offset-1 md:gap-2">
              <SendIcon size={16} className="translate-y-[1px]" />
              Zobacz ofertę
            </button>
          </div>
        </main>
      </Link>
    </li>
  );
};

export default OfferCard;

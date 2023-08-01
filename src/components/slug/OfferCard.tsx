import { classNames } from "@/lib/utils";
import { Calendar } from "lucide-react";

type OfferCardProps = {
  title: string;
  icon: string;
  className?: string;
  price?: number;
  duration?: string;
} & (
  | { text: string; listContent?: string[] }
  | { listContent: string[]; text?: string }
);

const OfferCard = ({
  title,
  icon,
  text,
  listContent,
  price,
  duration,
  className,
}: OfferCardProps) => {
  return (
    <li
      className={classNames(
        "relative flex max-w-xl flex-col items-center justify-center rounded-lg bg-[#ffffff20] px-4 py-8 shadow-lg shadow-[#00000050] after:absolute after:right-3 after:top-3 after:h-4 after:w-4 after:rounded-full after:bg-[#ffffff50]",
        className!
      )}
    >
      <header className="flex flex-col items-center justify-center gap-2 xs:flex-row">
        <Calendar size={30} />
        <h4 className="text-lg font-semibold text-white lg:text-xl">{title}</h4>
      </header>
      {price && (
        <div className="mb-6 mt-4 text-xl lg:text-2xl">
          <span className="mr-0.5 scale-[0.96] text-indigo-200">PLN</span>
          <span className="font-[500] tracking-wide text-white">{price}</span>
          {duration && (
            <>
              <span className="relative top-1 text-4xl">/</span>
              <span className="relative top-0.5 text-sm uppercase">
                miesiąc
              </span>
            </>
          )}
        </div>
      )}
      {text && (
        <p className="max-w-md px-1 text-center xs:px-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates
          voluptate sapiente nobis voluptatem ad ullam ab fugit sed dolore
          ipsum?
        </p>
      )}
    </li>
  );
};

export default OfferCard;

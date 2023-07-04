import { classNames } from "@/lib/utils";
import { ActivityIcon } from "lucide-react";

interface LogoProps {
  className?: string;
}

const Logo = ({ className }: LogoProps) => {
  return (
    <a
      href="/oferty"
      title="Oferty"
      className={classNames(
        className!,
        "group relative -top-1 right-2 flex items-center justify-center text-3xl font-bold text-white decoration-solid transition-colors duration-500"
      )}
    >
      <ActivityIcon className="group:hover relative left-[8px] top-[17px] text-secondary" />
      <span className="relative overflow-hidden after:absolute after:bottom-0 after:left-[2px] after:h-[2.5px] after:w-full after:bg-secondary after:content-['']">
        CoachBase
      </span>
    </a>
  );
};

export default Logo;

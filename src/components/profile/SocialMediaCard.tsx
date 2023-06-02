import {
  BookmarkIcon,
  FacebookIcon,
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
} from "lucide-react";
import Button from "../ui/Button";

interface SocialMediaCardProps {}

const SocialMediaCard = ({}: SocialMediaCardProps) => {
  return (
    <div className="flex flex-1 flex-col self-stretch border-r border-r-text px-6 py-2 last-of-type:border-r-0">
      <header className="flex items-end gap-3">
        <BookmarkIcon className="relative top-[1px] text-blue-600" />
        <h4>Social Media</h4>
      </header>
      <div className="mt-4 flex w-full flex-1 flex-col items-start justify-between gap-2">
        <ul className=" flex flex-wrap justify-between gap-x-5 gap-y-2 px-1 text-sm text-text">
          <p className="flex items-center justify-center gap-1">
            <InstagramIcon size={18} className="text-black" />
            michalmizia_
          </p>
          <p className="flex items-center justify-center gap-1">
            <LinkedinIcon size={18} className="text-black" />
            Michał Mizia
          </p>
          <p className="flex items-center justify-center gap-1">
            <FacebookIcon size={18} className="text-black" />
            Michał Mizia
          </p>
        </ul>
        <Button className="font-sm bg-secondary py-[6px] tracking-[102%]">
          Edit
        </Button>
      </div>
    </div>
  );
};

export default SocialMediaCard;

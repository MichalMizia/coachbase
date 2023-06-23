import { TagsIcon } from "lucide-react";
import Button from "../ui/Button";

interface TagsCardProps {}

const TagsCard = ({}: TagsCardProps) => {
  return (
    <div className="flex flex-1 flex-col self-stretch border-r border-r-text px-6 py-2 last-of-type:border-r-0">
      <header className="flex items-end gap-3">
        <TagsIcon className="relative top-[1px] text-green-600" />
        <h4>Tagi</h4>
      </header>
      <div className="mt-4 flex w-full flex-1 flex-col items-start justify-between gap-2">
        <ul className=" flex flex-wrap gap-x-1 text-sm text-text">
          <p className="">Trójbój,</p>
          <p className="">Lekkoatletyka,</p>
          <p className=""> Przygotowanie motoryczne</p>
        </ul>
        <Button className="font-sm hover-circle-overlay bg-secondary py-[6px] tracking-[102%] hover:bg-secondary">
          Edit
        </Button>
      </div>
    </div>
  );
};

export default TagsCard;

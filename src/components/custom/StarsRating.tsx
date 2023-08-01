import { classNames, roundHalf } from "@/lib/utils";

interface StarsRatingProps {
  rating?: number | null;
  size?: "small" | "large";
  className?: string;
}

import { StarIcon } from "lucide-react";

const StarsRating = ({ rating, size, className }: StarsRatingProps) => {
  //   const roundedRating = roundHalf(rating);
  //   console.log(Math.round(rating) - roundedRating);
  //   const isHalfStar = Math.round(rating) - roundedRating === 0.5;
  if (rating) {
    const roundedRating = Math.round(rating);

    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(
          <StarIcon
            key={i}
            fill="#facc1570"
            strokeWidth="1.5"
            className="mr-0.5 w-[20px] md:w-[22px]"
            stroke="#facc15"
          />
        );
      } else {
        stars.push(
          <StarIcon
            key={i}
            fill="#f5f5f5"
            strokeWidth="1.5"
            className="mr-0.5 w-[20px] md:w-[22px]"
            stroke="#facc1590"
          />
        );
      }
    }

    return (
      <div
        className={classNames(
          "my-[2px] flex items-center self-end",
          className!
        )}
      >
        {stars}
        <span
          className={classNames(
            size === "small" ? "mx-1" : "mx-2",
            "translate-y-[1px] rounded bg-blue-100 px-2 py-0.5 text-xs font-semibold text-gray-800"
          )}
        >
          {rating}
        </span>
      </div>
    );
  } else {
    return (
      <div
        className={classNames(
          "my-[2px] flex items-center gap-0.5 self-end",
          className!
        )}
      >
        <StarIcon
          fill="#f5f5f5"
          strokeWidth="1.5"
          stroke="#facc1590"
          className="mr-0.5 w-[20px] md:w-[22px]"
        />
        <StarIcon
          fill="#f5f5f5"
          strokeWidth="1.5"
          stroke="#facc1590"
          className="mr-0.5 w-[20px] md:w-[22px]"
        />
        <StarIcon
          fill="#f5f5f5"
          strokeWidth="1.5"
          stroke="#facc1590"
          className="mr-0.5 w-[20px] md:w-[22px]"
        />
        <StarIcon
          fill="#f5f5f5"
          strokeWidth="1.5"
          stroke="#facc1590"
          className="mr-0.5 w-[20px] md:w-[22px]"
        />
        <StarIcon
          fill="#f5f5f5"
          strokeWidth="1.5"
          stroke="#facc1590"
          className="mr-0.5 w-[20px] md:w-[22px]"
        />
        <span className="mx-2 translate-y-[1px] rounded bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-800">
          ??
        </span>
      </div>
    );
  }
};

export default StarsRating;

import { classNames, roundHalf } from "@/lib/utils";

interface StarsRatingProps {
  rating?: number;
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
            size={size === "small" ? 19 : 22}
            key={i}
            fill="#facc15"
            strokeWidth="2"
            stroke="#facc15"
          />
        );
      } else {
        stars.push(
          <StarIcon
            size={size === "small" ? 19 : 22}
            key={i}
            fill="#f5f5f5"
            strokeWidth="2"
            stroke="#facc15"
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
            "rounded bg-blue-100 px-2 py-0.5 text-xs font-semibold text-gray-800"
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
          "my-[2px] flex items-center self-end",
          className!
        )}
      >
        <StarIcon
          size={size === "small" ? 19 : 22}
          fill="#f5f5f5"
          strokeWidth="2"
          stroke="#facc15"
        />
        <StarIcon
          size={size === "small" ? 19 : 22}
          fill="#f5f5f5"
          strokeWidth="2"
          stroke="#facc15"
        />
        <StarIcon
          size={size === "small" ? 19 : 22}
          fill="#f5f5f5"
          strokeWidth="2"
          stroke="#facc15"
        />
        <StarIcon
          size={size === "small" ? 19 : 22}
          fill="#f5f5f5"
          strokeWidth="2"
          stroke="#facc15"
        />
        <StarIcon
          size={size === "small" ? 19 : 22}
          fill="#f5f5f5"
          strokeWidth="2"
          stroke="#facc15"
        />
        <span className="mx-2 rounded bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-800">
          ??
        </span>
      </div>
    );
  }
};

export default StarsRating;

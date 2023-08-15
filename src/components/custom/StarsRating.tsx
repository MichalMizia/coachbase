import { cn } from "@/lib/utils";
import "./custom.css";

interface StarsRatingProps {
  rating?: number | null;
  className?: string;
  starsClassName?: string;
  omitRatingNumber?: boolean;
  amount?: number;
}

const StarsRating = ({
  rating,
  className,
  starsClassName,
  omitRatingNumber,
  amount,
}: StarsRatingProps) => {
  //   const roundedRating = roundHalf(rating);
  //   console.log(Math.round(rating) - roundedRating);
  //   const isHalfStar = Math.round(rating) - roundedRating === 0.5;

  return (
    <div className={cn("flex items-center justify-center gap-1", className)}>
      <div
        className={cn("stars", starsClassName)}
        style={{ "--rating": rating || 0 } as React.CSSProperties}
        aria-label={
          rating
            ? `Ocena tej oferty wynosi ${rating} na 5 gwiazdek`
            : "Nie ma jeszcze opinii na temat tej oferty"
        }
      ></div>
      {!omitRatingNumber && (
        <span className="ml-1 rounded-sm bg-bg p-1 text-[13px] font-semibold text-slate-500 shadow-sm">
          {rating ? rating : "??"}
          {!!amount && `,  ${amount} opinii`}
        </span>
      )}
    </div>
  );
};

export default StarsRating;

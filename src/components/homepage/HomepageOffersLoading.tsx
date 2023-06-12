import { Loader2Icon } from "lucide-react";

const HomepageOffersLoading = () => {
  return (
    <div className="flex w-full items-center justify-center gap-2 py-10">
      <span className="text-2xl text-text">Loading</span>
      <Loader2Icon className="animate-spin" />
    </div>
  );
};

export default HomepageOffersLoading;

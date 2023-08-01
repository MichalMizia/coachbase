import { ChevronRightIcon, HomeIcon, Loader2Icon } from "lucide-react";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="flex h-full w-full animate-pulse items-center justify-center">
      <Loader2Icon className="h-32 w-32 animate-spin" />
    </div>
  );
}

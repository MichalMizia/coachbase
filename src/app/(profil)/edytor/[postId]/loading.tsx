import { ChevronRightIcon, HomeIcon, Loader2Icon } from "lucide-react";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="fixed inset-0 z-[999] flex min-h-screen w-screen items-stretch justify-stretch  bg-slate-300">
      <div className="flex h-full w-full animate-pulse items-center justify-center bg-white">
        <Loader2Icon className="h-32 w-32 animate-spin" />
      </div>
    </div>
  );
}

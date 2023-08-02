import Logo from "@/components/custom/Logo";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <main className="flex h-screen w-screen items-center justify-center bg-white">
      <div className="animate-ping [animation-duration:4000ms_!important]">
        <Logo className="scale-125 !text-black" />
      </div>
    </main>
  );
}

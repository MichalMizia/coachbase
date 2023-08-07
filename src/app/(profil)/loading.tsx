import Logo from "@/components/custom/Logo";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <main className="flex h-screen w-screen items-center justify-center bg-white">
      <div className="animate-logo">
        <Logo className="scale-125 !text-black lg:scale-150" />
      </div>
    </main>
  );
}

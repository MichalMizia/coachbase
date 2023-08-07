export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <main className="container-md bg-bg py-8">
      <section id="hero" className="flex items-center justify-center gap-8">
        <div
          className="h-[50vh] flex-1 animate-pulse border-gray-400 bg-white"
          style={{ animationDelay: "200ms" }}
        ></div>
        <div className="flex h-[50vh] flex-1 items-center justify-stretch gap-2">
          <div className="flex-1 animate-pulse border-gray-400 bg-white"></div>
          <div className="flex-[2] animate-pulse border-gray-400 bg-white"></div>
        </div>
      </section>
    </main>
  );
}

import { ChevronRightIcon, HomeIcon } from "lucide-react";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <main className="bg-primary">
      <header className="w-full bg-white shadow">
        <div className="container-md flex items-center justify-between px-2">
          <nav className="flex w-fit items-center justify-center gap-3 pb-4 pt-6 ">
            <a href="/">
              <HomeIcon size={20} className="text-blue-600" />
            </a>
            <ChevronRightIcon size={20} />
            <h1 className="font-semibold text-blue-600">Profil</h1>
          </nav>
        </div>
      </header>
      <section className="py-6 text-gray-800">
        <div className="container-md"></div>
      </section>
    </main>
  );
}

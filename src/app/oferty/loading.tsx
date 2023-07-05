import {
  ChevronDown,
  ChevronRightIcon,
  HomeIcon,
  Loader2,
  MapPinIcon,
} from "lucide-react";
import styles from "../../css/loading/offers.module.css";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <main className="bg-primary">
      <section
        className={`${styles.header} border-b-2 border-gray-300 pb-6 pt-8`}
      >
        <div className="container-md flex flex-col items-stretch justify-between gap-5">
          <section className="flex w-full flex-col items-center justify-center gap-4 lg:flex-row lg:justify-between">
            <h1 className="mb-4 text-2xl font-semibold text-black lg:text-3xl">
              Oferty
            </h1>
            <form className="w-full max-w-2xl flex-1 lg:self-end">
              <div className="relative flex">
                <button
                  className="text-md z-10 inline-flex flex-shrink-0 items-center rounded-l-lg border border-slate-500 bg-gray-100 px-3 py-1.5 text-center font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-100 lg:px-4 lg:py-2.5 lg:text-lg"
                  type="button"
                >
                  Sortuj{" "}
                  <ChevronDown
                    size={14}
                    className="ml-1 mt-[2px] transition-all duration-150"
                  />
                </button>
                <div className="relative flex w-full items-center justify-center">
                  <div className="text-md relative z-20 w-[60%] flex-grow animate-pulse self-stretch rounded-r-lg border border-l-2 border-r-2 border-slate-400 border-l-gray-50 bg-gray-50 p-2.5 pr-6 outline-none md:rounded-r-none lg:text-lg">
                    <span className="text-md rounded-lg bg-gray-200 px-1 py-0.5 text-transparent lg:text-lg">
                      Imię I nazwisko trenera
                    </span>
                  </div>
                  <div
                    className={`${styles["desktop_input"]} text-md relative z-20 w-[38%] flex-grow-0 animate-pulse self-stretch rounded-r-lg border-2 border-slate-400 border-l-gray-50 bg-gray-50 p-1.5 pl-[32px] text-transparent outline-2 outline-[#94a3b8] delay-500 lg:p-2.5 lg:text-lg`}
                  ></div>
                  <button
                    type="submit"
                    className="absolute bottom-0 right-0 top-0 z-30 flex aspect-square items-center justify-center rounded-r-lg border border-blue-700 bg-blue-700 p-2.5 text-lg font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
                  >
                    <svg
                      aria-hidden="true"
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      ></path>
                    </svg>
                    <span className="sr-only">Wyszukiwanie</span>
                  </button>
                </div>
              </div>
              <div
                className={`${styles["mobile_input"]} text-md relative h-[44px] w-full rounded-b-[4px] border bg-white py-1`}
              >
                <span className="text-md absolute left-10 top-1/2 -translate-y-1/2 rounded-lg bg-gray-200 px-1 py-[1px] text-transparent">
                  ...Lokalizacja
                </span>
              </div>
            </form>
          </section>
          <section className="flex w-full items-center justify-start gap-10 text-black">
            <div className="flex items-center justify-center gap-1">
              <p>Trener</p>
              <input
                className="relative top-0.5"
                type="checkbox"
                checked={true}
              />
            </div>
            <div className="flex items-center justify-center gap-1">
              <p>Dietetyk</p>
              <input
                className="relative top-0.5"
                type="checkbox"
                checked={true}
              />
            </div>
            <div className="flex items-center justify-center gap-1">
              <p>Fizjoterapeuta</p>
              <input
                className="relative top-0.5"
                type="checkbox"
                checked={true}
              />
            </div>
          </section>
        </div>
      </section>
      <section className="latest-offers bg-primary py-4 md:py-6 lg:py-12">
        <div className="mx-auto w-[96%] max-w-[1280px] lg:w-[92%]">
          <ul className="grid grid-flow-row grid-cols-1 items-start justify-between gap-x-4 lg:grid-cols-2 xxl:grid-cols-3">
            {Array(5)
              .fill("")
              .map((item, ind) => {
                return (
                  <li
                    key={ind}
                    className="group relative mx-auto my-2 flex w-full max-w-3xl animate-pulse items-stretch rounded-l-sm bg-white shadow shadow-[#00000020] transition-shadow duration-300 after:absolute after:left-0 after:top-0 after:h-full after:w-1 after:rounded-l-sm after:bg-secondary hover:shadow-md md:flex-row lg:my-4 lg:flex-col-reverse"
                    style={{ animationDelay: `${ind * 300}ms` }}
                  >
                    <div className="z-[2] flex-1 self-center py-4 pl-5 pr-3 lg:self-start lg:px-6 lg:pb-6 lg:pt-4">
                      <header className="mb-0.5 flex items-center justify-between text-black lg:mb-1">
                        <span className="rounded-md bg-gray-300 text-xl font-semibold text-transparent">
                          Hello There
                        </span>
                      </header>
                      <ul className="tags flex w-fit flex-wrap items-center justify-start gap-1 md:gap-2">
                        <li className="rounded-sm bg-blue-100 px-2 py-[2px] text-[11px] font-[600] uppercase text-transparent md:text-xs md:font-bold lg:text-[10px]">
                          Lorem
                        </li>
                      </ul>
                      <p className="mx-auto mb-[11px] mt-3 w-[105%] rounded-lg bg-gray-200 pb-[1px] text-left text-[13.5px] leading-normal tracking-[0.005em] text-transparent md:w-full md:text-sm md:leading-tight lg:mt-4 lg:pb-5 lg:text-[15px]">
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Id sed perspiciatis ex quaerat aliquid laboriosam,
                        ipsam ab alias.
                      </p>
                      <div className="flex w-full items-start justify-between gap-2">
                        <span className="rounded-sm px-2 py-1 text-[13px] text-transparent ring-1 ring-gray-400 transition-all duration-[400] md:text-sm">
                          .. Zobacz ofertę
                        </span>
                      </div>
                    </div>
                    <div className="mx-auto flex w-full flex-1 border-spacing-1 items-center justify-center overflow-hidden border-2 border-b-0 border-l-0 border-secondary_light bg-slate-50 lg:m-auto lg:aspect-[16/10] lg:border-0">
                      <Loader2
                        className="animate-spin text-gray-500"
                        size={30}
                        strokeWidth={2.5}
                      />
                    </div>
                  </li>
                );
              })}
          </ul>
        </div>
      </section>
    </main>
  );
}

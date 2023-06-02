"use client";

import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useMemo,
  useRef,
  useState,
} from "react";
import { ChevronDown, MessagesSquareIcon } from "lucide-react";
import { classNames } from "@/lib/utils";
import { MapPinIcon } from "lucide-react";
import cities from "../../content/data/miastaShort.json";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import "../../css/search.css";
import { SortingType } from "@/app/oferty/OffersPage";
import debounce from "lodash.debounce";

interface MappedCity {
  name: string;
  id: string;
}

interface SearchBarOffersProps {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  city: string;
  setCity: Dispatch<SetStateAction<string>>;
  sorting: SortingType;
  setSorting: (sorting: SortingType) => void;
}

const SearchBarOffers = ({
  city,
  setCity,
  query,
  setQuery,
  sorting,
  setSorting,
}: SearchBarOffersProps) => {
  const categoriesRef = useRef<HTMLButtonElement>(null);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState<boolean>(false);

  const mappedCities = useMemo(() => {
    let cachedCities: MappedCity[] = [];
    cities.forEach((region) => {
      if (region.cities) {
        region.cities.forEach((city) => {
          if (city?.text_simple) {
            cachedCities.push({ name: city.text_simple, id: city.id });
          }
        });
      }
    });
    return cachedCities;
  }, [cities]);
  // console.log(mappedCities, `Time: ${endTime - startTime} ms`);

  const sortingOptions: string[] = [
    "Najnowsze",
    "Najlepiej oceniane",
    "Najbliżej",
  ];

  return (
    <form className="max-w-2xl flex-1 self-end">
      <div className="relative flex">
        <button
          aria-label={
            isCategoryMenuOpen
              ? "Zamknij menu kategorii"
              : "Otwórz menu kategorii"
          }
          onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
          className="z-10 inline-flex flex-shrink-0 items-center rounded-l-lg border border-slate-500 bg-gray-100 px-4 py-2.5 text-center text-lg font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-700"
          type="button"
        >
          Sortuj{" "}
          <ChevronDown
            size={14}
            className={classNames(
              "ml-1 mt-[2px] transition-all duration-150",
              isCategoryMenuOpen ? "rotate-180" : ""
            )}
          />
        </button>
        <div
          id="dropdown"
          className={classNames(
            "absolute -left-1 top-12 z-10 w-44 divide-y divide-gray-100 rounded-lg bg-white shadow dark:bg-gray-700",
            isCategoryMenuOpen ? "" : "hidden"
          )}
        >
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdown-button"
          >
            {sortingOptions.map((category) => (
              <button
                key={category}
                type="button"
                className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                {category}
              </button>
            ))}
          </ul>
        </div>
        <div className="relative flex w-full items-center justify-center">
          <input
            type="search"
            id="search-dropdown"
            className="z-20 w-[60%] flex-grow border border-l-2 border-slate-400 border-l-gray-50 bg-gray-50 p-2.5 text-lg text-gray-900 outline-none hover:border-slate-500 hover:border-l-gray-50 hover:shadow-md focus:border-slate-500 focus:border-l-gray-50 focus:shadow-inner"
            placeholder="Wyszukaj po nazwie użytkownika"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              debounce(function (e) {
                setCity(e.target.value);
              }, 1000)
            }
          />
          <ReactSearchAutocomplete
            className="right-[2%] z-20 w-[38%] flex-grow-0 !rounded-r-lg border border-l-2 border-slate-400 border-l-gray-50 !bg-gray-50 p-2.5 pl-8 text-lg text-gray-900"
            styling={{ borderRadius: "0" }}
            items={mappedCities}
            placeholder="Lokalizacja"
            inputDebounce={200}
            onSearch={setCity}
          />
          <div className="absolute bottom-0 right-[34.5%] top-0 z-30 flex h-full items-center justify-center">
            <MapPinIcon size={24} className="text-slate-400" />
          </div>
          <button
            type="submit"
            className="absolute bottom-0 right-0 top-0 z-30 flex aspect-square items-center justify-center rounded-r-lg border border-blue-700 bg-blue-700 p-2.5 text-lg font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
    </form>
  );
};

export default SearchBarOffers;

"use client";

import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useMemo,
  useRef,
  useState,
} from "react";
import { ChevronDown } from "lucide-react";
import { classNames } from "@/lib/utils";
import { MapPinIcon } from "lucide-react";
import cities from "../../content/data/miastaShort.json";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import "../../css/search.css";
import { SortingType } from "@/app/oferty/OffersPage";
import debounce from "lodash.debounce";
import useMediaQuery from "@/lib/hooks/useMediaQuery";

export interface MappedCity {
  name: string;
  id: string;
}

interface SearchBarOffersProps {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  city: string;
  setCity: Dispatch<SetStateAction<string>>;
  sorting: SortingType;
  setSorting: Dispatch<SetStateAction<SortingType>>;
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
  const isMobile = useMediaQuery("(max-width: 600px)");

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
  }, []);
  // console.log(mappedCities, `Time: ${endTime - startTime} ms`);

  const sortingOptions: string[] = [
    "Najnowsze",
    "Najlepiej oceniane",
    "Najbliżej",
  ];

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const debouncedSetQuery = debounce(function (newQuery: string) {
    setQuery(newQuery);
  }, 600);

  return (
    <form
      className="w-full max-w-2xl flex-1 lg:self-end"
      onSubmit={(e) => handleSubmit(e)}
    >
      <div className="relative flex">
        <button
          aria-label={
            isCategoryMenuOpen
              ? "Zamknij menu kategorii"
              : "Otwórz menu kategorii"
          }
          onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
          className="text-md z-10 inline-flex flex-shrink-0 items-center rounded-l-lg border border-slate-500 bg-gray-100 px-3 py-1.5 text-center font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-100 lg:px-4 lg:py-2.5 lg:text-lg"
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
            "absolute -left-1 top-12 z-10 w-44 divide-y divide-gray-100 rounded-lg bg-white shadow",
            isCategoryMenuOpen ? "" : "hidden"
          )}
        >
          <ul
            className="py-2 text-sm text-gray-700"
            aria-labelledby="dropdown-button"
          >
            {sortingOptions.map((category) => (
              <button
                key={category}
                type="button"
                className="inline-flex w-full px-4 py-2 hover:bg-gray-100"
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
            autoComplete="off"
            className="text-md z-20 w-[60%] flex-grow self-stretch rounded-r-lg border border-l-2 border-slate-400 border-l-gray-50 bg-gray-50 p-2.5 pr-6 text-gray-900 outline-none placeholder:text-gray-500 hover:border-slate-500 hover:border-l-gray-50 hover:shadow-md focus:border-slate-500 focus:border-l-gray-50 focus:shadow-inner md:rounded-r-none lg:text-lg"
            placeholder="Imię i Nazwisko Trenera"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              debouncedSetQuery(e.target.value)
            }
          />
          {!isMobile ? (
            <>
              <ReactSearchAutocomplete
                className="text-md offers-search relative right-[2%] top-0.5 z-20 w-[38%] flex-grow-0 self-stretch !rounded-r-lg border border-l-2 border-slate-400 border-l-gray-50 !bg-gray-50 p-1.5 text-gray-900 lg:p-2.5 lg:text-lg"
                styling={{ borderRadius: "0" }}
                items={mappedCities}
                placeholder="Lokalizacja"
                inputDebounce={200}
                onSelect={(MappedCity: MappedCity) => setCity(MappedCity.name)}
              />
              <div className="absolute bottom-0 right-[34.5%] top-0 z-30 flex h-full items-center justify-center">
                <MapPinIcon size={24} className="text-slate-400" />
              </div>
            </>
          ) : null}
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
      {isMobile ? (
        <>
          <ReactSearchAutocomplete
            items={mappedCities}
            className="text-md relative -top-1.5 pt-1"
            styling={{ borderRadius: "4px" }}
            placeholder="Lokalizacja"
            inputDebounce={200}
            onSelect={(MappedCity) => setCity(MappedCity.name)}
          />
          {/* <div className="absolute bottom-0 right-[34.5%] top-0 z-30 flex h-full items-center justify-center">
                <MapPinIcon size={24} className="text-slate-400" />
              </div> */}
        </>
      ) : null}
    </form>
  );
};

export default SearchBarOffers;

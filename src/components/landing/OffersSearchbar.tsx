"use client";

import { ChangeEvent, FormEvent, HTMLProps, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import cities from "../../config/data/search-cities.json";
// radix
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useRouter } from "next/navigation";
import { tagOptions } from "@/config/global";
import { Icons } from "../ui/icons";

interface Option {
  value: string;
  label: string;
}

export interface MappedCity {
  name: string;
  id: string;
}

interface SearchBarOffersProps extends HTMLProps<HTMLFormElement> {
  // query: string;
  // setQuery: Dispatch<SetStateAction<string>>;
  // city: string;
  // setCity: Dispatch<SetStateAction<string>>;
  // sorting: SortingType;
  // setSorting: Dispatch<SetStateAction<SortingType>>;
  defaultCity?: string;
  defaultTag?: string;
  defaultQuery?: string;
}

const SearchBarOffers = ({
  className,
  defaultCity,
  defaultTag,
  defaultQuery,
  ...props
}: SearchBarOffersProps) => {
  const [city, setCity] = useState<string>(defaultCity || "");
  const [isOpenCityModal, setIsOpenCityModal] = useState<boolean>(false);

  const [tag, setTag] = useState<string>(defaultTag || "");
  const [isOpenTagModal, setIsOpenTagModal] = useState<boolean>(false);

  console.log(defaultQuery);
  const [query, setQuery] = useState<string>(defaultQuery || "");

  const router = useRouter();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let url = `/oferty?`;
    if (query.length) {
      url = url.concat(`query=${query}&`);
    }
    if (city.length) {
      url = url.concat(`city=${city}&`);
    }
    if (tag.length) {
      url = url.concat(`tag=${tag}&`);
    }

    router.push(url);
  };

  // const tagsListString = useMemo(() => {
  //   return tags
  //     .reverse()
  //     .reduce(
  //       (accumulator: string, currentValue, ind) =>
  //         accumulator + currentValue + ", ",
  //       ""
  //     );
  // }, [tags]);

  return (
    <form
      className={cn("w-full", className)}
      onSubmit={(e) => handleSubmit(e)}
      {...props}
      id="search"
    >
      {/* <div className="relative flex">
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
          {isLarge && (
            <>
              <ReactSearchAutocomplete
                key="desktop-search"
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
          )}
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
      </div> */}
      <div className="mx-auto mt-4 flex w-full max-w-xl flex-col items-stretch gap-2 border-blue-600/30 lg:mt-10 lg:max-w-5xl lg:flex-row lg:gap-0 lg:overflow-hidden lg:rounded-md lg:border-2">
        <Popover open={isOpenCityModal} onOpenChange={setIsOpenCityModal}>
          <PopoverTrigger asChild>
            <button
              role="combobox"
              name="Wyszukaj Miasto Trenera"
              aria-expanded={isOpenCityModal}
              className="arial flex h-full w-full max-w-xl flex-1 items-center justify-between rounded-lg bg-slate-50 px-6 py-[17px] text-base text-text_readable shadow-md transition-shadow hover:shadow-lg hover:shadow-black/25 lg:rounded-none lg:border-r-2 lg:py-5"
            >
              {city ? (
                <p className="text-gray-700">
                  {
                    cities.find(
                      (val) => val.value.toLowerCase() === city.toLowerCase()
                    )?.label
                  }
                </p>
              ) : (
                <p className="text-text">Wybierz Miasto</p>
              )}
              <ChevronsUpDown className="ml-2 h-5 w-5 shrink-0 opacity-50" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="max-h-[440px] overflow-auto">
            <Command>
              <CommandInput placeholder="Wybierz Miasto..." />
              <CommandEmpty>Brak znalezionych miast.</CommandEmpty>
              <CommandGroup>
                {cities.map((val) => (
                  <CommandItem
                    key={val.value}
                    value={val.value}
                    onSelect={(currentValue) => {
                      setCity(currentValue === city ? "" : currentValue);
                      setIsOpenCityModal(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        city === val.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {val.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
        <Popover open={isOpenTagModal} onOpenChange={setIsOpenTagModal}>
          <PopoverTrigger asChild>
            <button
              role="combobox"
              name="Wyszukaj Specjalizację Trenera"
              aria-expanded={isOpenTagModal}
              className="arial flex h-full w-full max-w-xl flex-1 items-center justify-between rounded-lg bg-slate-50 px-6 py-[17px] text-base text-text_readable shadow-md transition-shadow hover:shadow-lg hover:shadow-black/25 lg:rounded-none lg:border-r-2 lg:py-5"
            >
              {tag ? (
                <p className="text-gray-700">
                  {
                    tagOptions.find((val) => val.value.toLowerCase() === tag)
                      ?.label
                  }
                </p>
              ) : (
                <p className="text-text">Kogo Szukasz?</p>
              )}
              <Icons.user className="ml-2 h-5 w-5 shrink-0 opacity-50" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="max-h-[440px] overflow-auto">
            <Command>
              <CommandInput placeholder="Wybierz Specjalizację..." />
              <CommandEmpty>Brak znalezionych tagów.</CommandEmpty>
              <CommandGroup>
                {tagOptions.map((val) => (
                  <CommandItem
                    key={val.value}
                    value={val.value}
                    onSelect={(currentValue) => {
                      setTag(currentValue === tag ? "" : currentValue);
                      setIsOpenTagModal(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        tag === val.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {val.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>

        <input
          type="text"
          role="searchbox"
          autoComplete="off"
          className="hover arial flex h-16 max-w-xl flex-1 items-center justify-start self-stretch rounded-lg bg-slate-50 px-6 py-5 text-base text-text_readable  shadow-md outline-none transition-shadow placeholder:text-text valid:text-gray-800 hover:shadow-lg hover:shadow-black/25 focus:shadow-xl focus:shadow-[#00000030] lg:rounded-none lg:border-r"
          placeholder="Imię i Nazwisko Trenera"
          defaultValue={defaultQuery || ""}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setQuery(e.target.value)
          }
        />
        {/* <input
          type="text"
          role="searchbox"
          id=""
          autoComplete="off"
          className="hover arial h-16 max-w-xl flex-1 rounded-lg bg-slate-50 px-6 py-5 text-base text-text_readable shadow-md outline-none placeholder:text-text hover:shadow-xl hover:shadow-[#00000030] focus:shadow-xl focus:shadow-[#00000030] lg:rounded-none lg:border-l"
          placeholder="Imię i Nazwisko Trenera"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            debouncedSetQuery(e.target.value)
          }
        /> */}

        <label htmlFor="search-btn" className="sr-only">
          Wyszukaj Trenera
        </label>
        <button
          className="flex items-center justify-center gap-2 self-start rounded-lg bg-blue-600 px-5 py-[14px] transition-all hover:bg-blue-700 lg:h-16 lg:min-w-[50px] lg:items-center lg:self-stretch lg:rounded-none lg:p-5"
          role="search"
          id="search-btn"
          type="submit"
          title="Wyszukaj Trenera"
        >
          <p className="text-white lg:hidden">Wyszukaj</p>
          <svg
            aria-hidden="true"
            className="h-5 w-5 rotate-90 text-white"
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
        </button>
      </div>
      {/* {!isLarge && (
        <>
          <ReactSearchAutocomplete
            key="mobile-search"
            items={mappedCities}
            className="text-md relative -top-1.5 pt-1"
            styling={{ borderRadius: "4px" }}
            placeholder="Lokalizacja"
            inputDebounce={200}
            onSelect={(MappedCity) => setCity(MappedCity.name)}
          />
        </>
      )} */}
    </form>
  );
};

export default SearchBarOffers;

{
  /* <Popover open={isOpenTagsModal} onOpenChange={setIsOpenTagsModal}>
          <PopoverTrigger asChild>
            <button
              role="combobox"
              aria-expanded={isOpenTagsModal}
              className="arial flex h-full w-full max-w-xl flex-1 items-center justify-between rounded-lg bg-slate-50 px-6 py-[17px] text-base text-text_readable shadow-md transition-shadow hover:shadow-lg hover:shadow-black/25 lg:rounded-none lg:border-r-2 lg:py-5"
            >
              {tags.length ? (
                <input
                  value={tagsListString}
                  role="contentinfo"
                  className="flex w-full items-center gap-1 overflow-x-auto bg-transparent text-gray-700 outline-none"
                />
              ) : (
                <p className="text-text">Kogo szukasz?</p>
              )}
              <Icons.user className="ml-2 h-5 w-5 shrink-0 opacity-50" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="max-h-[440px] overflow-auto">
            <Command>
              <CommandInput placeholder="Kogo Szukasz..." />
              <CommandEmpty>Brak znalezionych tagów.</CommandEmpty>
              <CommandGroup>
                {tagOptions.map((val) => (
                  <CommandItem
                    key={val.value}
                    value={val.value}
                    onSelect={(currentValue) => {
                      setTags((prevTags) => {
                        if (prevTags.length) {
                          if (prevTags.includes(currentValue)) {
                            return prevTags.filter(
                              (val) => val !== currentValue
                            );
                          }

                          return [...prevTags, currentValue];
                        } else return Array(currentValue);
                      });
                    }}
                  >
                    <Checkbox
                      className={cn("mr-2 h-4 w-4")}
                      checked={
                        tags.length && tags.includes(val.value) ? true : false
                      }
                      onChange={() => {
                        return null;
                      }}
                      role="checkbox"
                      aria-readonly="true"
                    />
                    {val.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover> */
}

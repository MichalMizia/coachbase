"use client";

// types
import { SocialMediaType } from "@/model/trainerData";
import { MenuType } from "../HeaderCards";
// icons
import { FacebookIcon, InstagramIcon, MailIcon } from "lucide-react";
// hooks
import { useForm } from "react-hook-form";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
// utils
import * as z from "zod";
import axios, { AxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
// components
import Button from "@/components/ui/Button";
import { toast } from "react-hot-toast";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { MultiSelect, Option } from "react-multi-select-component";
// data
import { MappedCity } from "@/components/offers/SearchOffers";
import cities from "../../../content/data/miastaShort.json";
import { allTags, tagOptions } from "@/content/global";
// css
import "../../../css/search.css";

// types
interface MediaFormProps {
  media: SocialMediaType;
  tags: string[];
  city: string;
  setOpenMenu: Dispatch<SetStateAction<MenuType>>;
  slug: string;
}

export const SocialMediaSchema = z.object({
  instagram: z.string().url().or(z.literal("")),
  facebook: z.string().url().or(z.literal("")),
  email: z.string().email().or(z.literal("")),
  city: z.string().min(3).max(20),
});

type FormData = z.infer<typeof SocialMediaSchema>;

const MediaForm = ({
  media,
  tags,
  city,
  setOpenMenu,
  slug,
}: MediaFormProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedTags, setSelectedTags] = useState<Option[]>(
    tags.map((tag) => {
      return { value: tag, label: tag };
    }) || []
  );
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(SocialMediaSchema),
  });

  useEffect(() => {
    setValue("city", city);
    setValue("instagram", media.instagram);
    setValue("facebook", media.facebook);
    setValue("email", media.email);
  }, []);

  // city list
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

  async function onSubmit(data: FormData) {
    setIsLoading(true);

    const currentTags = selectedTags.map((val) => val.value);
    console.log("Data: ", data, "\n", "Tags: ", currentTags);

    try {
      await axios.post("/api/media", {
        instagram: data.instagram,
        facebook: data.facebook,
        email: data.email,
        tags: currentTags,
        city: city === "" || data.city === city ? null : data.city,
        slug: slug,
      });
    } catch (e) {
      if (e instanceof z.ZodError) {
        toast.error("Formularz wypełniony niepoprawnie");
        return null;
      }
      toast.error("Coś poszło nie tak");
      return null;
    } finally {
      setIsLoading(false);
      setOpenMenu("");
    }

    toast.success("Zaaktualizowano Media");
  }

  return (
    <form
      className="flex w-full flex-col items-stretch justify-start"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex w-full flex-col justify-start gap-2 border-b-2 pb-6 pt-2">
        <div className="flex w-full justify-center gap-2">
          <input
            type="text"
            {...register("instagram")}
            placeholder={`Instagram link`}
            autoComplete="off"
            autoCorrect="off"
            disabled={isLoading}
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          />
          <div className="flex w-10 items-center justify-center">
            <InstagramIcon className="text-gray-800" strokeWidth={2.25} />
          </div>
        </div>
        {errors?.instagram && (
          <p className="px-1 text-xs text-red-600">
            {errors.instagram.message}
          </p>
        )}
        <div className="flex w-full justify-center gap-2">
          <input
            type="text"
            {...register("facebook")}
            placeholder={`Facebook link`}
            autoComplete="off"
            autoCorrect="off"
            disabled={isLoading}
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          />
          <div className="flex w-10 items-center justify-center">
            <FacebookIcon className="text-gray-800" strokeWidth={2.25} />
          </div>
        </div>
        {errors?.facebook && (
          <p className="px-1 text-xs text-red-600">{errors.facebook.message}</p>
        )}
        <div className="flex w-full justify-center gap-2">
          <input
            type="text"
            {...register("email")}
            placeholder={`Email link`}
            autoComplete="off"
            autoCorrect="off"
            disabled={isLoading}
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          />
          <div className="flex w-10 items-center justify-center">
            <MailIcon className="text-gray-800" strokeWidth={2.25} />
          </div>
        </div>
        {errors?.email && (
          <p className="px-1 text-xs text-red-600">{errors.email.message}</p>
        )}
      </div>
      <div className="flex flex-col items-stretch justify-center gap-2 pt-6">
        <h4 className="mb-4 self-end text-xl font-semibold tracking-[0.00125em] text-gray-800">
          Tagi
        </h4>
        <MultiSelect
          disableSearch={true}
          value={selectedTags}
          onChange={setSelectedTags}
          options={tagOptions}
          labelledBy="Select"
          hasSelectAll={false}
        />
      </div>
      <div className="flex flex-col items-stretch justify-center gap-2 pt-6">
        <h4 className="mb-4 self-end text-xl font-semibold tracking-[0.00125em] text-gray-800">
          Lokalizacja
        </h4>
        <ReactSearchAutocomplete
          className="mb-4"
          styling={{ borderRadius: "8px" }}
          items={mappedCities}
          placeholder="Lokalizacja"
          inputDebounce={200}
          inputSearchString={city}
          onSelect={(city) => setValue("city", city.name)}
          onClear={() => setValue("city", "")}
        />
      </div>
      <pre>{JSON.stringify(errors)}</pre>
      <Button
        isLoading={isLoading}
        type="submit"
        variant="default"
        className="mt-2 text-lg"
      >
        Save
      </Button>
    </form>
  );
};

export default MediaForm;
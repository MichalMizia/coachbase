"use client";

// types
import { SocialMediaType } from "@/model/trainerData";
// icons
import {
  FacebookIcon,
  InstagramIcon,
  MailIcon,
  MapPin,
  SaveIcon,
} from "lucide-react";
// hooks
import { useForm } from "react-hook-form";
import { useEffect, useMemo, useState } from "react";
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
import mappedCities from "@/config/data/citiesList.json";
import { allTags } from "@/config/global";
import { Separator } from "@/components/ui/separator";
// static assets
import "./mediaform.css";
import Image from "next/image";
import AvatarSvg from "@/../public/assets/avatar.svg";

interface MediaFormProps {
  media: SocialMediaType;
  tags: string[];
  city: string;
  slug: string;
  username: string;
  avatar?: string;
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
  slug,
  avatar,
  username,
}: MediaFormProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const tagOptions: Option[] = useMemo(() => {
    return allTags.map((tag) => {
      return { value: tag, label: tag };
    });
  }, []);

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
  }, []);

  async function onSubmit(data: FormData) {
    setIsLoading(true);

    const currentTags = selectedTags.map((val) => val.label);
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
    }

    toast.success("Zaaktualizowano Informacje");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center justify-start gap-2">
          <Image
            width={54}
            height={54}
            className="aspect-square rounded-full object-cover shadow-md shadow-black/20"
            src={avatar || AvatarSvg}
            alt={`Avatar ${username}`}
          />
          <div className="">
            <h2 className="text-2xl font-semibold text-gray-800">
              Twoje Informacje
            </h2>
            <p className="text-h6 text-text_readable">
              Uzupełnij je aby podwyższyć swoje szanse na pozyskanie klientów
            </p>
          </div>
        </div>
        <Button
          isLoading={isLoading}
          type="submit"
          variant="default"
          className="w-full self-end py-3 sm:w-auto sm:self-center sm:py-2"
        >
          <SaveIcon className="mr-1.5 h-5 w-5" />
          Zapisz
        </Button>
      </div>
      <Separator className="my-4 bg-gray-300" />
      <div className="flex w-full flex-col items-stretch justify-start">
        <div className="">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div className="space-y-0.5">
              <h2 className="text-xl font-semibold text-gray-800">Kontakt</h2>
              <p>
                Linki do social mediów będą wyświetlane w twoim profilu jako
                informacje kontaktowe.
              </p>
            </div>
          </div>

          {/* social media updates */}
          <div className="flex w-full max-w-lg flex-col justify-start gap-2">
            <div className="flex w-full justify-center gap-2">
              <input
                type="text"
                {...register("instagram")}
                placeholder={`Instagram link`}
                autoComplete="off"
                autoCorrect="off"
                disabled={isLoading}
                defaultValue={media.instagram}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-1 focus:outline-indigo_custom/30 focus:ring-blue-500"
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
                defaultValue={media.facebook}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-1 focus:outline-indigo_custom/30 focus:ring-blue-500"
              />
              <div className="flex w-10 items-center justify-center">
                <FacebookIcon className="text-gray-800" strokeWidth={2.25} />
              </div>
            </div>
            {errors?.facebook && (
              <p className="px-1 text-xs text-red-600">
                {errors.facebook.message}
              </p>
            )}
            <div className="flex w-full justify-center gap-2">
              <input
                type="text"
                {...register("email")}
                placeholder={`Contact email`}
                autoComplete="off"
                autoCorrect="off"
                disabled={isLoading}
                defaultValue={media.email}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-1 focus:outline-indigo_custom/30 focus:ring-blue-500"
              />
              <div className="flex w-10 items-center justify-center">
                <MailIcon className="text-gray-800" strokeWidth={2.25} />
              </div>
            </div>
            {errors?.email && (
              <p className="px-1 text-xs text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>
          {/* end of social media updates */}
        </div>

        <Separator className="mb-[18px] mt-5 bg-gray-300" />

        <div className="flex flex-col items-stretch justify-center gap-2">
          <div className="mb-3 flex items-center justify-between gap-4">
            <div className="space-y-0.5">
              <h2 className="text-xl font-semibold text-gray-800">Tagi</h2>
              <p>
                Dodaj dziedziny w których się specjalizujesz aby wyświetlać się
                częściej w wynikach wyszukiwania
              </p>
            </div>
          </div>
          <MultiSelect
            value={selectedTags}
            onChange={setSelectedTags}
            options={tagOptions}
            labelledBy="Select"
            hasSelectAll={false}
            className="max-w-lg"
          />
        </div>

        <Separator className="mb-[18px] mt-5 bg-gray-300" />

        <div className="flex flex-col items-stretch justify-center gap-2">
          <div className="mb-3 flex items-center justify-between gap-4">
            <div className="space-y-0.5">
              <h2 className="text-xl font-semibold text-gray-800">
                Lokalizacja
              </h2>
              {/* <p>
                Oprócz miasta wyświetlającego się w profilu możesz dodać
                dokładną lokalizację przy użyciu google maps{" "}
                <MapPin className="mb-0.5 ml-0.5 inline h-5 w-5" />
              </p> */}
              <p>Ustaw miasto w którym Twoi klienci będa mogli cię znaleźć.</p>
            </div>
          </div>
          <ReactSearchAutocomplete
            className="max-w-lg !bg-slate-50"
            styling={{ borderRadius: "8px" }}
            items={mappedCities}
            placeholder="Lokalizacja"
            inputDebounce={200}
            autoFocus={false}
            showItemsOnFocus={true}
            inputSearchString={city ? city : ""}
            onSelect={(city) => setValue("city", city.name)}
            onClear={() => setValue("city", "")}
          />
        </div>
      </div>
    </form>
  );
};

export default MediaForm;

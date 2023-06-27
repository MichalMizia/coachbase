"use client";

// assets
// components
import Button from "@/components/ui/Button";
import { ChevronRightIcon, Loader2, MapPinIcon } from "lucide-react";
import { toast } from "react-hot-toast";
import TextareaAutosize from "react-textarea-autosize";
// utils
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
// lib
import axios, { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { ZodError, z } from "zod";
// validation
import { trainerRegisterSchema } from "@/lib/validations/registerTrainerValidation";
// city data
import cities from "../../../content/data/miastaShort.json";
import { MappedCity } from "@/components/offers/SearchOffers";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { classNames } from "@/lib/utils";
import RegistrationStatus from "@/components/auth/RegistrationStatus";
import { UserRolesType } from "@/model/user";
import { fileSchema } from "@/lib/validations/fileUploadValidation";

type FormData = z.infer<typeof trainerRegisterSchema>;

export default function Page() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(trainerRegisterSchema),
  });
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFormInInitialState, setIsFormInInitialState] =
    useState<boolean>(true);

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
    if (isFormInInitialState && data.isFormInInitialStateCurrently) {
      setIsFormInInitialState(false);
      setValue("isFormInInitialStateCurrently", false);
      return;
    }

    setIsLoading(true);
    console.log("Submitting");

    try {
      if (!data.isFormInInitialStateCurrently) {
        let link: string = "";
        if (
          data.verification.file &&
          data.verification.file.length !== 0 &&
          !data.verification.link
        ) {
          const currFile = data.verification.file[0];
          const formData = new FormData();
          formData.append("image", currFile);

          let res1: AxiosResponse | null = null;
          try {
            res1 = await axios.post("/api/upload-files", formData, {
              headers: { "Content-Type": "multipart/form-data" },
            });
          } catch (e) {
            return toast.error("Coś poszło nie tak");
          }
          console.log(res1);
        }
        console.log(data.verification.file);

        let roles: UserRolesType[] = [];
        if (data.isTrainer) roles.push("Trener");
        if (data.isPhysio) roles.push("Fizjoterapeuta");
        if (data.isDietician) roles.push("Dietetyk");
        console.log("Roles: ", roles);
        if (roles.length === 0) {
          return toast.error("Przynajmniej jedna rola musi być wybrana");
        }
        await axios.post("/api/rejestracja-trenera", {
          username: data.username,
          email: data.email.toLowerCase(),
          password: data.password,
          summary: data.description,
          link: data.verification.link,
          city: data.city,
          roles: roles,
        });
      } else {
        throw new Error("Ye");
      }
    } catch (e) {
      if (
        e instanceof AxiosError &&
        e.response?.status?.toString()[0] === "4" &&
        e.response?.data?.message
      ) {
        toast.error(e.response.data.message);
        return null;
      } else if (e instanceof ZodError) {
        toast.error("Formularz wypełniony niepoprawnie");
        return null;
      }
      toast.error("Coś poszło nie tak podczas rejestracji");
      return null;
    } finally {
      setIsLoading(false);
    }

    toast.success("Zarejestrowano użytkownika");
    router.push("/login");
  }

  const onSecondButtonClick = (): void => {
    if (!isFormInInitialState) {
      return;
    }

    handleSubmit(onSubmit);
  };
  const onFirstButtonClick = (): void => {
    setIsFormInInitialState(true);
    setValue("isFormInInitialStateCurrently", true);
  };

  return (
    <main>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="hero flex min-h-[calc(100vh-67px)] items-center"
      >
        <div className="mx-auto flex w-full flex-col justify-center space-y-4 py-10 transition-all sm:w-[350px]">
          <RegistrationStatus
            isFormInInitialState={isFormInInitialState}
            onSecondButtonClick={onSecondButtonClick}
            onFirstButtonClick={onFirstButtonClick}
          />
          <div className="mb-2 flex flex-col space-y-2 text-center">
            {isFormInInitialState ? (
              <>
                <h1 className="text-4xl font-semibold tracking-tight text-black">
                  Tworzenie Konta Trenerskiego
                </h1>
                <p className="px-8 text-center text-sm text-slate-500">
                  <Link
                    href="/rejestracja"
                    className="hover:text-brand flex items-center justify-center gap-1 underline underline-offset-4"
                  >
                    Chcę utworzyć Konto Użytkownika{" "}
                    <ChevronRightIcon
                      size={16}
                      className="relative top-[1px]"
                    />
                  </Link>
                </p>
              </>
            ) : (
              <>
                <h1 className="text-4xl font-semibold tracking-tight text-black">
                  Czym jest link weryfikacyjny?
                </h1>
                <p className="px-2 text-center text-sm text-slate-500">
                  To nasz sposób weryfikacji wiedzy i kompetencji osób
                  ogłaszających oferty. Może to być link do platformy social
                  media, certyfikatu kursu trenerskiego opinii klientów czy
                  jakiegokolwiek innego źródła które może
                </p>
              </>
            )}
          </div>

          <div className="relative px-2 py-4 sm:p-0">
            {/* first form part */}
            <div
              className={classNames(
                "transition-all duration-500",
                isFormInInitialState
                  ? "static translate-x-0 opacity-100"
                  : "absolute inset-0 translate-x-full opacity-0"
              )}
            >
              <div className="mb-2">
                <label htmlFor="name" className="sr-only">
                  Nazwa użytkownika
                </label>
                <input
                  type="text"
                  {...register("username")}
                  id="name"
                  placeholder="Nazwa użytkownika"
                  autoCapitalize="none"
                  autoComplete="name"
                  autoCorrect="off"
                  disabled={isLoading}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  required
                />
                {errors?.username && (
                  <p className="px-1 text-xs text-red-600">
                    {errors.username.message}
                  </p>
                )}
              </div>
              <div className="mb-2">
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  type="email"
                  {...register("email")}
                  id="email"
                  placeholder="name@example.com"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  disabled={isLoading}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  required
                />
                {errors?.email && (
                  <p className="px-1 text-xs text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className="mb-2">
                <label htmlFor="password" className="sr-only">
                  Hasło
                </label>
                <input
                  type="password"
                  {...register("password")}
                  id="password"
                  placeholder="•••••••••"
                  autoCapitalize="none"
                  autoComplete="off"
                  autoCorrect="off"
                  disabled={isLoading}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  required
                />
                {errors?.password && (
                  <p className="px-1 text-xs text-red-600">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-slate-300" />
                </div>
                <div className="relative my-4 flex justify-center text-xs uppercase">
                  <span className="bg-primary px-2 text-slate-600">
                    Krótki Opis &#40;max 250 znaków&#41;
                  </span>
                </div>
              </div>
              <div>
                <label htmlFor="description" className="sr-only">
                  Krótki Opis &#40;max 250 znaków&#41;
                </label>
                <TextareaAutosize
                  // defaultValue="Nazywam się Michał Mizia i jestem potęznym trenerem personalnym"
                  maxLength={250}
                  {...register("description")}
                  id="description"
                  placeholder="Opis"
                  autoCapitalize="none"
                  autoComplete="off"
                  autoCorrect="off"
                  disabled={isLoading}
                  className="mb-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                />
                {errors?.description && (
                  <p className="px-1 text-xs text-red-600">
                    {errors.description.message}
                  </p>
                )}
              </div>
            </div>

            {/* end of first form part */}

            {/* second form part */}
            <div
              className={classNames(
                "absolute inset-0 transition-all duration-500",
                !isFormInInitialState
                  ? "static block translate-x-0 opacity-100"
                  : "hidden translate-x-full opacity-0"
              )}
            >
              <div className="mb-2">
                <label htmlFor="link" className="sr-only">
                  Link weryfikacyjny
                </label>
                <input
                  type="url"
                  // defaultValue="https://www.instagram.com/michalmizia_/"
                  {...register("verification.link")}
                  id="link"
                  placeholder="Link weryfikacyjny"
                  autoCapitalize="none"
                  autoComplete="off"
                  autoCorrect="off"
                  disabled={isLoading}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  tabIndex={isFormInInitialState ? -1 : 0}
                />
                {/* @ts-expect-error */}
                {errors?.verification?.link && (
                  <p className="px-1 text-xs text-red-600">
                    {/* @ts-expect-error */}
                    {errors.verification.link.message}
                  </p>
                )}
              </div>
              <div className="relative mb-4 mt-4">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-slate-300" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-primary px-2 text-slate-600">
                    Albo załącz plik
                  </span>
                </div>
              </div>
              <div className="mb-2">
                <label htmlFor="file" className="sr-only">
                  Plik weryfikacyjny
                </label>
                <input
                  type="file"
                  {...register("verification.file")}
                  id="file"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  tabIndex={isFormInInitialState ? -1 : 0}
                />
                {/* @ts-expect-error */}
                {errors?.verification?.file && (
                  <p className="px-1 text-xs text-red-600">
                    {/* @ts-expect-error */}
                    {errors.verification.file.message}
                  </p>
                )}
                {/* @ts-expect-error */}
                {errors?.verification && (
                  <p className="px-1 text-xs text-red-600">
                    {/* @ts-expect-error */}
                    {errors.verification.message}
                  </p>
                )}
                {/* <pre>{JSON.stringify(errors)}</pre> */}
              </div>
              <ReactSearchAutocomplete
                // className="mb-4 block w-full rounded-lg bg-gray-50 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                className="mb-4"
                styling={{ borderRadius: "8px" }}
                items={mappedCities}
                placeholder="Lokalizacja"
                inputDebounce={200}
                onSelect={(city) => setValue("city", city.name)}
                onClear={() => setValue("city", "")}
                // onSelect={(MappedCity: MappedCity) => setCity(MappedCity.name)}
              />
              {/* @ts-expect-error */}
              {errors?.city && (
                <p className="relative -top-4 px-1 text-xs text-red-600">
                  Miasto jest wymagane
                </p>
              )}
              <div className="mb-4 flex flex-col items-start justify-between px-1 sm:flex-row sm:items-center">
                <div className="flex items-center justify-center gap-2">
                  <label htmlFor="isTrainer" className="font-semibold">
                    Trener
                  </label>
                  <input
                    id="isTrainer"
                    type="checkbox"
                    {...register("isTrainer")}
                    defaultChecked={true}
                  />
                </div>
                <div className="flex items-center justify-center gap-2">
                  <label htmlFor="isPhysio" className="font-semibold">
                    Fizjoterapeuta
                  </label>
                  <input
                    id="isPhysio"
                    type="checkbox"
                    {...register("isPhysio")}
                  />
                </div>
                <div className="flex items-center justify-center gap-2">
                  <label htmlFor="isDietician" className="font-semibold">
                    Dietetyk
                  </label>
                  <input
                    id="isDietician"
                    type="checkbox"
                    {...register("isDietician")}
                  />
                </div>
              </div>
            </div>

            <input
              type="checkbox"
              checked={isFormInInitialState}
              {...register("isFormInInitialStateCurrently")}
              className="pointer-events-none absolute -z-20 opacity-0"
              aria-hidden="true"
              tabIndex={-1}
            />
            <Button
              type="submit"
              className="z-10 w-full cursor-pointer"
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isFormInInitialState ? "Dalej" : "Utwórz Konto"}
            </Button>
          </div>

          <p className="px-8 text-center text-sm text-slate-500">
            <Link
              href="/login"
              className="hover:text-brand underline underline-offset-4"
            >
              Masz już konto? Zaloguj się
            </Link>
          </p>
        </div>
        {/* <div className="flex-1 self-stretch border-l-2 border-text bg-primary py-10 transition-transform duration-300">
          <div className="mx-auto flex w-full flex-col justify-center space-y-4 sm:w-[350px]"></div>
        </div> */}
      </form>
    </main>
  );
}

"use client";

// assets
// components
import Button from "@/components/ui/Button";
import { ChevronRightIcon, Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";
import TextareaAutosize from "react-textarea-autosize";
// utils
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
// lib
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ZodError, z } from "zod";
// validation
import { trainerRegisterSchema } from "@/lib/validations/registerTrainerValidation";

type FormData = z.infer<typeof trainerRegisterSchema>;

export default function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(trainerRegisterSchema),
  });
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  console.log(errors)
  async function onSubmit(data: FormData) {
    setIsLoading(true);
    console.log("Submitting");

    try {
      await axios.post("/api/rejestracja-trenera", {
        username: data.username,
        email: data.email.toLowerCase(),
        password: data.password,
        summary: data.description,
        link: data.verification.link,
        roles: ["Trener"],
      });
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

  return (
    <main>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="hero flex min-h-[calc(100vh-67px)] items-center"
      >
        <div className="flex-1 self-stretch bg-white py-10">
          <div className="mx-auto flex w-full flex-col justify-center space-y-4 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-4xl font-semibold tracking-tight text-black">
                Tworzenie Konta Trenerskiego
              </h1>
              <p className="px-8 text-center text-sm text-slate-500 dark:text-slate-400">
                <Link
                  href="/rejestracja"
                  className="hover:text-brand flex items-center justify-center gap-1 underline underline-offset-4"
                >
                  Chcę utworzyć Konto Użytkownika{" "}
                  <ChevronRightIcon size={16} className="relative top-[1px]" />
                </Link>
              </p>
            </div>

            <div>
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
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
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
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
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
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
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
                  <span className="bg-white px-2 text-slate-600">
                    Krótki Opis &#40;max 200 znaków&#41;
                  </span>
                </div>
              </div>
              <div>
                <label htmlFor="description" className="sr-only">
                  Krótki Opis &#40;max 200 znaków&#41;
                </label>
                <TextareaAutosize
                  maxLength={200}
                  defaultValue="Nazywam sie Michal Mizia i jestem potężnym trenerem personalnym"
                  {...register("description")}
                  id="description"
                  placeholder="Opis"
                  autoCapitalize="none"
                  autoComplete="off"
                  autoCorrect="off"
                  disabled={isLoading}
                  className="mb-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                />
                {errors?.description && (
                  <p className="px-1 text-xs text-red-600">
                    {errors.description.message}
                  </p>
                )}
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Utwórz Konto
              </Button>
            </div>

            <p className="px-8 text-center text-sm text-slate-500 dark:text-slate-400">
              <Link
                href="/login"
                className="hover:text-brand underline underline-offset-4"
              >
                Masz już konto? Zaloguj się
              </Link>
            </p>
          </div>
        </div>
        <div className="flex-1 self-stretch border-l-2 border-text bg-primary py-10">
          <div className="mx-auto flex w-full flex-col justify-center space-y-4 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-4xl font-semibold tracking-tight text-black">
                Czym jest link weryfikacyjny?
              </h1>
              <p className="px-2 text-center text-sm text-slate-500">
                To nasz sposób weryfikacji wiedzy i kompetencji osób
                ogłaszających oferty. Może to być link do platformy social
                media, certyfikatu kursu trenerskiego opinii klientów czy
                jakiegokolwiek innego źródła które może
              </p>
            </div>
            <div>
              <label htmlFor="link" className="sr-only">
                Link weryfikacyjny
              </label>
              <input
                type="url"
                defaultValue="https://www.instagram.com/michalmizia_/"
                {...register("verification.link")}
                id="link"
                placeholder="Link weryfikacyjny"
                autoCapitalize="none"
                autoComplete="off"
                autoCorrect="off"
                disabled={isLoading}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              />
              {errors?.verification?.link && (
                <p className="px-1 text-xs text-red-600">
                  {errors.verification.link.message}
                </p>
              )}
            </div>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-300" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-primary px-2 text-slate-600">
                  Albo załącz plik
                </span>
              </div>
            </div>
            {/* <div>
              <label htmlFor="file" className="sr-only">
                Plik weryfikacyjny
              </label>
              <input
                type="file"
                {...register("verification.file")}
                id="file"
                disabled={true}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              />
              {errors?.verification?.file && (
                <p className="px-1 text-xs text-red-600">
                  {errors.verification?.file.message}
                </p>
              )}
            </div> */}
          </div>
        </div>
      </form>
    </main>
  );
}

"use client";

// assets
import barbell from "@/../../public/assets/barbell2.jpg";
// components
import Button from "@/components/ui/Button";
import { userRegisterSchema } from "@/lib/validations/registerUserValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { ChevronRightIcon, Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { ZodError, z } from "zod";

type FormData = z.infer<typeof userRegisterSchema>;

export default function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userRegisterSchema),
  });
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false);

  async function onSubmit(data: FormData) {
    setIsLoading(true);

    try {
      const res = await axios.post("/api/rejestracja", {
        username: data.username,
        email: data.email.toLowerCase(),
        password: data.password,
      });
      console.log(res);
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
      <section className="hero flex h-[calc(100vh-67px)] items-center">
        <div className="flex-1 self-stretch bg-white py-10">
          <div className="mx-auto flex w-full flex-col justify-center space-y-4 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-3xl font-semibold tracking-tight text-black">
                Tworzenie Konta
              </h1>
              <p className="px-8 text-center text-sm text-slate-500">
                <Link
                  href="/rejestracja-trenera"
                  className="hover:text-brand flex items-center justify-center gap-1 underline underline-offset-4"
                >
                  Chcę utworzyć Konto Trenera{" "}
                  <ChevronRightIcon size={16} className="relative top-[1px]" />
                </Link>
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
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
                  disabled={isLoading || isGoogleLoading}
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
                  disabled={isLoading || isGoogleLoading}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 "
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
                  disabled={isLoading || isGoogleLoading}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 "
                  required
                />
                {errors?.password && (
                  <p className="px-1 text-xs text-red-600">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading || isGoogleLoading}
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Utwórz Konto
              </Button>
            </form>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-300" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-slate-600">
                  lub dołącz przez
                </span>
              </div>
            </div>
            <Button
              variant="outlined"
              isLoading={isGoogleLoading || isLoading}
              type="button"
              className="mx-auto w-full max-w-sm"
              // onClick={loginWithGoogle}
              disabled={isLoading || isGoogleLoading}
            >
              {isGoogleLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                // google icon
                <svg
                  className="mr-2 h-4 w-4"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fab"
                  data-icon="github"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                  <path d="M1 1h22v22H1z" fill="none" />
                </svg>
              )}{" "}
              Google
            </Button>

            <p className="px-8 text-center text-sm text-slate-500">
              <Link
                href="/login"
                className="hover:text-brand underline underline-offset-4"
              >
                Masz już konto? Zaloguj się
              </Link>
            </p>
          </div>
        </div>
        <div className="relative isolate -z-10 flex-1 self-stretch">
          <div className="absolute left-0 top-0 z-[2] h-20 w-20 bg-[#FFFFFF99] after:absolute after:left-full after:top-full after:h-20 after:w-20 after:bg-[#FFFFFF20]" />
          <div className="absolute left-20 top-0 z-[2] h-20 w-20 bg-[#FFFFFF70] after:absolute after:left-full after:top-0 after:h-20 after:w-20 after:bg-[#FFFFFF20]" />
          <div className="absolute left-0 top-20 z-[2] h-20 w-20 bg-[#FFFFFF70] after:absolute after:left-0 after:top-full after:h-20 after:w-20 after:bg-[#FFFFFF20]" />
          <Image
            src={barbell}
            alt="Sztanga z obciążeniem"
            className="h-full w-full object-cover brightness-90"
          />
        </div>
      </section>
    </main>
  );
}

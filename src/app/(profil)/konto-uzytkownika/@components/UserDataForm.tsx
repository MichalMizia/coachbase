"use client";

// components
import Button from "@/components/ui/Button";
import { Label } from "@/components/ui/label";
import { Save } from "lucide-react";
// hooks
import React from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { useLoadingStore } from "@/lib/state/loading-generation";
import { toast } from "react-hot-toast";
import { Separator } from "@/components/ui/separator";

interface UserDataFormProps {
  defaultName: string;
  defaultEmail: string;
  userId: string;
}

const ProfileUpdateSchema = z.object({
  username: z.string(),
  email: z.string().email(),
});

type FormData = z.infer<typeof ProfileUpdateSchema>;

export function UserDataForm({
  defaultName,
  defaultEmail,
  userId,
}: UserDataFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(ProfileUpdateSchema),
  });
  const { isLoading, setIsLoading } = useLoadingStore();

  const onSubmit = async (data: FormData) => {
    console.log("here");
    setIsLoading(true);
    if (!data) return toast.error("Pola są wymagane");

    try {
      await axios.patch("/api/profil/username", {
        username: data.username,
        email: data.email,
        userId: JSON.parse(userId),
        defaultEmail,
        defaultName,
      });

      toast.success("Pomyślnie zmieniono dane");
    } catch (e) {
      if (
        e instanceof AxiosError &&
        e.response?.status?.toString()[0] === "4" &&
        e.response?.data?.message
      ) {
        toast.error(e.response.data.message);
        return null;
      } else if (e instanceof z.ZodError) {
        toast.error("Formularz wypełniony niepoprawnie");
        return null;
      }
      toast.error("Coś poszło nie tak podczas zmiany danych");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="">
        <div className="mb-4 flex flex-col items-center justify-between gap-x-4 sm:flex-row">
          <div className="space-y-0.5">
            <h2 className="text-xl font-semibold text-gray-800">
              Dane Profilowe
            </h2>
            <p>Nazwa użytkownika używana jest przy dodawaniu pytań lub ocen.</p>
          </div>
          <Button
            className="hidden sm:flex"
            type="submit"
            isLoading={isLoading}
          >
            <Save className="mr-2 h-5 w-5" />
            Zapisz
          </Button>
        </div>

        {/* profile updates */}
        <div className="flex flex-col justify-start gap-6 gap-y-4 md:flex-row lg:gap-10">
          <div className="flex w-full max-w-sm flex-col justify-start gap-1.5">
            <Label htmlFor="username" className="text-gray-700">
              Nazwa użytkownika
            </Label>
            <input
              type="text"
              {...register("username")}
              id="username"
              key="username"
              placeholder={`Nazwa użytkownika`}
              autoComplete="off"
              autoCorrect="off"
              disabled={isLoading}
              defaultValue={defaultName}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-1 focus:outline-indigo_custom/30 focus:ring-blue-500"
            />
            {errors?.username && (
              <p className="px-1 text-xs text-red-600">
                {errors.username.message}
              </p>
            )}
          </div>
          <div className="flex w-full max-w-sm flex-col justify-start gap-1.5">
            <Label htmlFor="email" className="text-gray-700">
              Email
            </Label>
            <input
              type="text"
              {...register("email")}
              id="email"
              key="email"
              placeholder={`Email`}
              autoComplete="off"
              autoCorrect="off"
              disabled={isLoading}
              defaultValue={defaultEmail}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-1 focus:outline-indigo_custom/30 focus:ring-blue-500"
            />
            {errors?.email && (
              <p className="px-1 text-xs text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>
          <Button
            className="mt-2 sm:hidden"
            type="submit"
            isLoading={isLoading}
          >
            <Save className="mr-2 h-5 w-5" />
            Zapisz
          </Button>
        </div>

        <Separator className="mb-[18px] mt-5 bg-gray-300" />
      </div>
    </form>
  );
}

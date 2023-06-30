"use client";

// types
import { TrainerType } from "@/model/user";
import { zodResolver } from "@hookform/resolvers/zod";
// hooks
import { useState } from "react";
import { useForm } from "react-hook-form";
// components
import Button from "../ui/Button";
import ImageUpdateForm from "./forms/ImageUpdateForm";
import TextareaAutosize from "react-textarea-autosize";
// utils
import * as z from "zod";
import { toast } from "react-hot-toast";
import axios, { AxiosError } from "axios";
import { classNames } from "@/lib/utils";

interface ProfileInfoSectionProps {
  user: TrainerType;
  heroContent: string;
}

const ProfileUpdateSchema = z.object({
  username: z
    .string()
    .min(5, "Nazwa powinna zawierać minimum 5 znaków")
    .max(40, "Nazwa powinna zawierać maksimum 40 znaków"),
  email: z.string().email(),
  description: z
    .string()
    .max(250, "Opis powinien zawierać maksimum 250 znaków")
    .min(40, "Opis powinien zawierać minimum 40 znaków"),
  heroContent: z.string(),
});

type FormData = z.infer<typeof ProfileUpdateSchema>;

const ProfileInfoSection = ({ user, heroContent }: ProfileInfoSectionProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(ProfileUpdateSchema),
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isViewingShortDescription, setIsViewingShortDescription] =
    useState<boolean>(true);

  async function onSubmit(data: FormData) {
    setIsLoading(true);

    try {
      const res = await axios.post("/api/", {
        username: data.username,
        email: data.email.toLowerCase(),
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
      } else if (e instanceof z.ZodError) {
        toast.error("Formularz wypełniony niepoprawnie");
        return null;
      }
      toast.error("Coś poszło nie tak podczas rejestracji");
      return null;
    } finally {
      setIsLoading(false);
      setIsEditing(false);
    }

    toast.success("Zarejestrowano użytkownika");
  }

  return (
    <section className="container-md flex w-full justify-center py-8 text-text_readable lg:min-h-[440px]">
      <div className="flex-1 self-stretch">
        <ImageUpdateForm imgSrc={user.image} id={user._id || ""} />
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-1 flex-col items-start justify-start rounded-tr-lg border-secondary px-4 py-3 lg:border-r-2 lg:border-t-2 lg:px-6 lg:py-4"
      >
        <header className="flex w-full flex-col items-start justify-between xl:flex-row xl:items-center">
          <div className="flex items-end justify-center gap-1 md:gap-2">
            {!isEditing ? (
              <h2
                onDoubleClick={() => setIsEditing(true)}
                className="text-xl font-semibold text-black md:text-3xl"
              >
                {user.username}
                {", "}
              </h2>
            ) : (
              <input
                id="name"
                placeholder="Imię i Nazwisko"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                type="text"
                {...register("username")}
                defaultValue={user.username}
              />
            )}
            {!isEditing ? (
              <p
                onDoubleClick={() => setIsEditing(true)}
                className="text-text_readable md:text-lg"
              >
                {user.email}
              </p>
            ) : (
              <input
                id="email"
                placeholder="Email"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                type="text"
                {...register("email")}
                defaultValue={user.email}
              />
            )}
          </div>
          <Button
            isLoading={isLoading}
            className={classNames(
              "px-6 tracking-wide",
              isEditing ? "" : "hidden"
            )}
            type="submit"
          >
            Zapisz
          </Button>
          {!isEditing && (
            <Button
              isLoading={isLoading}
              className="px-6 tracking-wide"
              type="button"
              onClick={() => setIsEditing(true)}
            >
              Edytuj
            </Button>
          )}
        </header>
        <div
          className={classNames(
            "relative isolate mt-4 flex w-full max-w-[300px] items-stretch justify-center rounded-lg border-2 border-gray-300 bg-gray-50 text-sm text-gray-900 after:absolute after:bottom-0 after:left-0 after:top-0 after:h-full after:w-1/2 after:bg-slate-200 after:transition-all after:ease-in-out",
            isViewingShortDescription
              ? "after:rounded-l-lg"
              : "after:translate-x-full after:rounded-r-lg",
            isEditing ? "mt-3" : ""
          )}
        >
          <button
            className={classNames(
              "z-[2] flex-1 rounded-l-lg px-[18px] py-2.5 text-gray-800 transition-all",
              isViewingShortDescription
                ? "cursor-default underline decoration-secondary decoration-2 underline-offset-4"
                : "bg-white hover:bg-slate-100"
            )}
            type="button"
            onClick={() => setIsViewingShortDescription(true)}
          >
            Krótki opis
          </button>
          <button
            className={classNames(
              "z-[2] flex-1 rounded-r-lg px-[18px] py-2.5 text-gray-800 transition-all",
              !isViewingShortDescription
                ? "cursor-default underline decoration-secondary decoration-2 underline-offset-4"
                : "bg-white hover:bg-slate-100"
            )}
            type="button"
            onClick={() => setIsViewingShortDescription(false)}
          >
            Długi opis
          </button>
        </div>
        <p className="text-sm text-text_readable">
          <span className="text-md font-[500] text-teal-600">&#40;!</span>
          Krótki opis widoczny jest w liście ofert a długi opis pojawia się po
          wejściu w profil trenera
          <span className="text-md font-[500] text-teal-600">&#41;</span>
        </p>
        {isViewingShortDescription ? (
          !isEditing ? (
            <p className="mt-2 max-w-xl text-[17px] text-gray-800">
              {user.summary}
            </p>
          ) : (
            <TextareaAutosize
              maxLength={250}
              key="short"
              {...register("description")}
              minRows={3}
              maxRows={8}
              defaultValue={user.summary}
              id="description"
              placeholder="Krótki opis"
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect="off"
              disabled={isLoading}
              className="mt-3 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 lg:max-h-[300px]"
            />
          )
        ) : !isEditing ? (
          <p className="mt-2 max-w-xl text-[17px] text-gray-800">
            {heroContent}
          </p>
        ) : (
          <TextareaAutosize
            {...register("heroContent")}
            defaultValue={heroContent}
            key="long"
            minRows={3}
            id="description"
            placeholder="Długi opis"
            autoCapitalize="none"
            autoComplete="off"
            autoCorrect="off"
            disabled={isLoading}
            className="mt-3 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 lg:max-h-[400px]"
          />
        )}
      </form>
    </section>
  );
};

export default ProfileInfoSection;

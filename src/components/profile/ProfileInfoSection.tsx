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
import { DescriptionUpdateForm } from "./forms/DescriptionUpdateForm";

interface ProfileInfoSectionProps {
  user: TrainerType;
  heroContent: string;
}

const ProfileUpdateSchema = z.object({
  username: z
    .string()
    .min(5, "Nazwa powinna zawierać minimum 5 znaków")
    .max(40, "Nazwa powinna zawierać maksimum 40 znaków")
    .optional(),
  email: z.string().email().optional(),
  description: z
    .string()
    .max(250, "Opis powinien zawierać maksimum 250 znaków")
    .min(40, "Opis powinien zawierać minimum 40 znaków")
    .optional(),
  heroContent: z.string().optional(),
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
    toast.success(
      <div>
        <h4 className="text-sm font-semibold text-black">
          Jeszcze nic tu nie wgrałem mordo
        </h4>
        <p className="text-xs text-gray-800">Odezwę się jak coś tu będzie</p>
      </div>,
      { className: "custom" }
    );

    try {
      // const res = await axios.post("/api/", {
      //   username: data.username,
      //   email: data.email.toLowerCase(),
      // });
      // console.log(res);
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

    // toast.success("Zupdatowano użytkownika");
  }

  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col justify-center pb-4 text-text_readable lg:min-h-[440px] lg:w-[90%] lg:flex-row lg:py-8 xl:w-[85%]">
      <div className="aspect-video flex-1 self-stretch lg:aspect-auto">
        <ImageUpdateForm imgSrc={user.image} id={user._id || ""} />
      </div>

      {/* <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-1 flex-col items-start justify-start rounded-tr-lg border-secondary_custom px-4 py-6 lg:border-r-2 lg:border-t-2 lg:px-6 lg:py-4"
      >
        <header
          className={classNames(
            "flex w-full items-center justify-between",
            isEditing ? "items-start" : ""
          )}
        >
          <div className="flex flex-col flex-wrap items-start justify-start md:flex-row md:items-end">
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
                className="block w-full rounded-t-lg border border-b-0 border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 md:rounded-l-lg md:rounded-t-none md:border-b md:border-r-0"
                type="text"
                {...register("username")}
                defaultValue={user.username}
              />
            )}
            {!isEditing ? (
              <p
                onDoubleClick={() => setIsEditing(true)}
                className="text-text_readable md:ml-1 md:text-lg"
              >
                {user.email}
              </p>
            ) : (
              <input
                id="email"
                placeholder="Email"
                className=" block w-full rounded-b-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 md:rounded-b-none md:rounded-r-lg"
                type="text"
                {...register("email")}
                defaultValue={user.email}
              />
            )}
          </div>
          <Button
            isLoading={isLoading}
            className={classNames(
              "px-6 tracking-wide transition-all",
              isEditing
                ? "max-h-[41px] flex-1 self-stretch md:flex-grow-0"
                : "hidden"
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
        <p className="mb-1 mt-4 px-1 text-sm text-text_readable md:mt-3 md:px-0">
          &#40;!Krótki opis widoczny jest w liście ofert a długi opis pojawia
          się po wejściu w profil trenera&#41;
        </p>
        <div
          className={classNames(
            "relative isolate z-10 flex w-full max-w-[300px] items-stretch justify-center rounded-t-lg border-2 border-b-0 border-gray-300 bg-gray-50 text-sm text-gray-900 after:absolute after:bottom-0 after:left-0 after:top-0 after:h-full after:w-1/2 after:bg-slate-200 after:transition-all after:ease-in-out",
            isViewingShortDescription
              ? "after:rounded-tl-md"
              : "after:translate-x-full after:rounded-tr-md",
            isEditing ? "" : ""
          )}
        >
          <button
            className={classNames(
              "z-[2] flex-1 rounded-l-lg px-[18px] py-2.5 text-gray-800 transition-all",
              isViewingShortDescription
                ? "cursor-default underline decoration-secondary_custom decoration-2 underline-offset-4"
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
                ? "cursor-default underline decoration-secondary_custom decoration-2 underline-offset-4"
                : "bg-white hover:bg-slate-100"
            )}
            type="button"
            onClick={() => setIsViewingShortDescription(false)}
          >
            Długi opis
          </button>
        </div>

        {isViewingShortDescription ? (
          !isEditing ? (
            <p className="relative w-full max-w-xl rounded-b-lg rounded-tr-lg px-1 py-2 pt-2.5 text-[15px] text-gray-800 [box-sizing:padding-box] md:text-[17px] lg:min-h-[100px] lg:border-2 lg:border-gray-300 lg:bg-white lg:px-2">
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
              className="relative w-full max-w-xl rounded-b-lg rounded-tr-lg border-2 border-gray-300 px-2 py-2 pt-2.5 text-[17px] text-sm text-gray-800 [box-sizing:padding-box] focus:border-blue-500 focus:ring-blue-500 lg:max-h-[300px] lg:min-h-[100px] lg:bg-white"
            />
          )
        ) : !isEditing ? (
          <p className="relative w-full max-w-xl rounded-b-lg rounded-tr-lg px-1 py-2 pt-2.5 text-[15px] text-gray-800 [box-sizing:padding-box] md:text-[17px] lg:min-h-[100px] lg:border-2 lg:border-gray-300 lg:bg-white lg:px-2">
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
            className="relative w-full max-w-xl rounded-b-lg rounded-tr-lg border-2 border-gray-300 px-2 py-2 pt-2.5 text-[17px] text-sm text-gray-800 [box-sizing:padding-box] focus:border-blue-500 focus:ring-blue-500 lg:max-h-[300px] lg:min-h-[100px] lg:bg-white"
          />
        )}
      </form> */}
      {/* <DescriptionUpdateForm /> */}
    </section>
  );
};

export default ProfileInfoSection;

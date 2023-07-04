"use client";

// components
import Button from "@/components/ui/Button";
import { LucideUser } from "lucide-react";
import Image from "next/image";
// utils
import { fileUploadSchema } from "@/lib/validations/fileUploadValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";
import { usePathname } from "next/navigation";

interface ImageUpdateFormProps {
  imgSrc: string | null | undefined;
  id: string;
}

type FormData = z.infer<typeof fileUploadSchema>;

const ImageUpdateForm = ({ imgSrc, id }: ImageUpdateFormProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(fileUploadSchema),
  });
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function onSubmit(data: FormData) {
    setIsLoading(true);

    const file = data.files[0];
    console.log(file);

    const formData = new FormData();
    formData.append("image", file);
    formData.append("id", id);

    try {
      await axios.post("/api/profile/change-profile-picture", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
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
      toast.error("Coś poszło nie tak podczas zmiany zdjęcia");
      return null;
    } finally {
      setIsLoading(false);
    }

    toast.success(
      "Zdjęcie profilowe zmienione, żeby zobaczyć zmiany może być potrzebne wylogowanie i ponowne zalogowanie"
    );
  }

  const currentFiles: FileList | null = watch("files") || null;

  return (
    <form
      action=""
      className="after:bg-blue group relative isolate z-10 flex aspect-[16/10] h-full w-full flex-col items-center justify-center overflow-hidden bg-white shadow shadow-[#00000030] transition-shadow after:absolute after:left-1/2 after:top-0 after:z-[2] after:w-6 after:rotate-45 after:bg-blue-50 hover:shadow-lg lg:p-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      {imgSrc ? (
        <>
          <img
            className="absolute inset-auto -z-10 h-full w-full object-cover lg:rounded-sm lg:p-2"
            src={
              currentFiles &&
              currentFiles.length &&
              URL.createObjectURL(currentFiles[0])
                ? URL.createObjectURL(currentFiles[0])
                : imgSrc
            }
            alt="Zdjęcie Profilowe"
          />
          <div className="absolute inset-auto -z-[5] h-full w-full rounded-sm bg-[#00000000] p-2 transition-all duration-300 group-hover:bg-[#00000012]" />
          <div className="mt-auto flex h-auto origin-bottom-left scale-[.8] cursor-pointer items-stretch justify-center self-start justify-self-end md:scale-[.9] lg:scale-100">
            <label htmlFor="file" className="sr-only">
              Zdjęcie profilowe
            </label>
            <input
              multiple={false}
              required
              id="file"
              accept="image/*"
              type="file"
              {...register("files")}
              className="block w-full rounded-l-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            />
            {errors?.files && (
              <p className="absolute -top-1 left-0 bg-white px-[6px] py-[2px] text-sm text-red-600">
                {errors.files.message?.toString()}
              </p>
            )}
            <Button
              type="submit"
              className="rounded-l-none"
              isLoading={isLoading}
              disabled={currentFiles === null}
            >
              Zapisz
            </Button>
          </div>
        </>
      ) : (
        <>
          {currentFiles &&
          currentFiles.length &&
          URL.createObjectURL(currentFiles[0]) ? (
            <>
              <Image
                width={100}
                height={100}
                className="absolute inset-auto -z-10 h-full w-full rounded-sm object-cover p-2"
                alt="Preview zdjęcia profilowego"
                src={URL.createObjectURL(currentFiles[0])}
              />
              <div className="absolute inset-auto -z-[5] h-full w-full rounded-sm bg-[#00000000] p-2 transition-all duration-300 group-hover:bg-[#00000015]" />
            </>
          ) : (
            <div className="mb-8 flex items-center justify-center gap-2">
              <LucideUser />
              <h4 className="text-lg font-semibold">Zdjęcie Profilowe</h4>
            </div>
          )}
          <div className="flex items-stretch justify-center">
            <label htmlFor="file" className="sr-only">
              Plik weryfikacyjny
            </label>
            <input
              multiple={false}
              required
              id="file"
              accept="image/*"
              type="file"
              {...register("files")}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            />
            {errors?.files && (
              <p className="absolute -top-1 left-0 bg-white px-[6px] py-[2px] text-sm text-red-600">
                {errors.files.message?.toString()}
              </p>
            )}
            <Button
              type="submit"
              isLoading={isLoading}
              disabled={currentFiles === null}
            >
              Zapisz
            </Button>
          </div>
        </>
      )}
    </form>
  );
};

export default ImageUpdateForm;

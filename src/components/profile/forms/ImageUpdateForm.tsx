"use client";

// components
import Button from "@/components/ui/Button";
import { LucideUser } from "lucide-react";
import Image from "next/image";
// utils
import { fileUploadSchema } from "@/lib/validations/fileUploadValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { HTMLProps, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";
import { classNames } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ImageUpdateFormProps extends HTMLProps<HTMLFormElement> {
  imgSrc: string | null | undefined;
  id: string;
}

type FormData = z.infer<typeof fileUploadSchema>;

const ImageUpdateForm = ({
  imgSrc,
  id,
  className,
  ...props
}: ImageUpdateFormProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(fileUploadSchema),
  });
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

  const currentFiles: FileList | null | undefined = watch("files");

  return (
    <form
      className={classNames(
        "flex max-w-[800px] items-start justify-start gap-4 xl:gap-6",
        className!
      )}
      onSubmit={handleSubmit(onSubmit)}
      {...props}
    >
      <Card className="aspect-video flex-1 self-stretch overflow-hidden p-1 md:aspect-square xl:aspect-video">
        {imgSrc ? (
          <img
            src={
              currentFiles &&
              currentFiles.length &&
              URL.createObjectURL(currentFiles[0])
                ? URL.createObjectURL(currentFiles[0])
                : imgSrc
            }
            alt="Zdjęcie Profilowe"
            className="h-full w-full rounded-md object-cover"
          />
        ) : currentFiles &&
          currentFiles.length &&
          URL.createObjectURL(currentFiles[0]) ? (
          <img
            alt="Preview zdjęcia profilowego"
            src={URL.createObjectURL(currentFiles[0])}
            className="h-full w-full rounded-md object-cover"
          />
        ) : (
          <div className="mb-8 flex items-center justify-center gap-2">
            <LucideUser />
            <h4 className="text-lg font-semibold">Zdjęcie Profilowe</h4>
          </div>
        )}
      </Card>

      <Card className="max-w-[400px] flex-1">
        <CardHeader>
          <CardTitle className="text-gray-800">
            Edytuj zdjęcie profilowe
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
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
            disabled={currentFiles == undefined}
            className="w-full"
          >
            Zapisz
          </Button>
        </CardContent>
      </Card>
    </form>
  );
};

export default ImageUpdateForm;

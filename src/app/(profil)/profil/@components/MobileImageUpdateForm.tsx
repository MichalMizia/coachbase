"use client";

// components
import Button from "@/components/ui/Button";
import { LucideUser, MoreVertical, PlusCircleIcon } from "lucide-react";
import { toast } from "react-hot-toast";
import Image from "next/image";
// utils
import { fileUploadSchema } from "@/lib/validations/fileUploadValidation";
import { zodResolver } from "@hookform/resolvers/zod";
// utils
import { HTMLProps, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import axios, { AxiosError } from "axios";
import { classNames } from "@/lib/utils";
// shadcn
import { Icons } from "@/components/ui/icons";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface MobileImageUpdateFormProps extends HTMLProps<HTMLFormElement> {
  imgSrc: string | null | undefined;
  id: string;
}

type FormData = z.infer<typeof fileUploadSchema>;

const MobileImageUpdateForm = ({
  imgSrc,
  id,
  className,
  ...props
}: MobileImageUpdateFormProps) => {
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

    const formData = new FormData();
    formData.append("file", file);
    formData.append("id", id);

    const t0 = performance.now();
    try {
      const res = await axios.post(
        "/api/profile/change-profile-picture",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
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
      toast.error("Coś poszło nie tak podczas zmiany zdjęcia");
      return null;
    } finally {
      setIsLoading(false);
    }
    const t1 = performance.now();
    console.log(`Call to image upload2 took ${(t1 - t0) / 1000} seconds.`);

    toast.success("Zdjęcie profilowe zostało zmienione");
  }

  const currentFiles: FileList | null | undefined = watch("files");

  return (
    <div className={classNames("relative aspect-video w-full", className!)}>
      <Dialog>
        <DialogTrigger asChild>
          <div className="">
            <div className="absolute right-6 top-2 z-[2] flex items-center justify-center rounded-full border-slate-100/20 bg-black/10 p-2 text-white shadow-sm">
              <MoreVertical className="h-[18px] w-[18px]" />
            </div>
            {imgSrc ? (
              <Image
                src={
                  currentFiles?.length && URL.createObjectURL(currentFiles[0])
                    ? URL.createObjectURL(currentFiles[0])
                    : imgSrc
                }
                fill
                priority
                alt="Zdjęcie Profilowe"
                className="h-full w-full rounded-t-[24px] object-cover"
              />
            ) : currentFiles?.length && URL.createObjectURL(currentFiles[0]) ? (
              <img
                alt="Preview zdjęcia profilowego"
                src={URL.createObjectURL(currentFiles[0])}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center gap-2">
                <LucideUser />
                <h4 className="text-lg font-semibold">Zdjęcie Profilowe</h4>
              </div>
            )}
          </div>
        </DialogTrigger>
        <DialogContent>
          <form {...props} onSubmit={handleSubmit(onSubmit)} className="static">
            <DialogHeader>
              <DialogTitle className="text-gray-800">Dodaj zdjęcie</DialogTitle>
            </DialogHeader>

            <div className="relative isolate mx-auto my-8 aspect-video flex-1 cursor-pointer overflow-hidden rounded-lg border-black/10 bg-indigo_custom/75 shadow-lg shadow-blue-800/20">
              {errors?.files && (
                <p className="bottom absolute-0 left-0 w-[200%] text-center text-sm text-red-600">
                  {errors.files.message?.toString()}
                </p>
              )}
              <input
                multiple={false}
                required
                id="file"
                accept="image/*"
                type="file"
                {...register("files")}
                className="absolute inset-0 z-[2] h-full w-full cursor-pointer opacity-0"
              />

              {currentFiles?.length && URL.createObjectURL(currentFiles[0]) ? (
                <img
                  alt="Preview zdjęcia profilowego"
                  src={URL.createObjectURL(currentFiles[0])}
                  className="h-full w-full rounded-md object-cover"
                />
              ) : (
                <PlusCircleIcon className="absolute inset-0 m-auto h-16 w-16 text-white" />
              )}
            </div>

            <DialogFooter className="gap-y-2">
              <DialogTrigger asChild>
                <Button variant="outlined" className="pl-2.5  text-gray-800">
                  <Icons.chevronLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
              </DialogTrigger>
              <Button variant="default" isLoading={isLoading}>
                <Icons.media className="mr-2 h-4 w-4" />
                Save
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* <Card className="w-full flex-1 sm:max-w-[400px]">
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
      </Card> */}
    </div>
  );
};

export default MobileImageUpdateForm;

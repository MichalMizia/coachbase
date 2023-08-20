"use client";

// components
import Button from "@/components/ui/Button";
import { PlusCircleIcon } from "lucide-react";
import { toast } from "react-hot-toast";
import Image from "next/image";
import AvatarSvg from "@/../public/assets/avatar.svg";
// utils
import { fileUploadSchema } from "@/lib/validations/fileUploadValidation";
import { zodResolver } from "@hookform/resolvers/zod";
// utils
import { HTMLProps, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import axios, { AxiosError } from "axios";
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
import { cn } from "@/lib/utils";

interface AvatarImageFormProps extends HTMLProps<HTMLFormElement> {
  imgSrc: string | null | undefined;
  id: string;
  username: string;
  imageClassName?: string;
}

type FormData = z.infer<typeof fileUploadSchema>;

const AvatarImageForm = ({
  imgSrc,
  id,
  className,
  username,
  imageClassName,
  ...props
}: AvatarImageFormProps) => {
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

    const t0 = performance.now();
    try {
      const res = await axios.post("/api/profile/change-avatar", formData, {
        headers: { "Content-Type": "multipart/form-data" },
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
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Image
            width={76}
            height={76}
            className={cn(
              imageClassName,
              "absolute top-0 aspect-square -translate-y-[55%] cursor-pointer rounded-full border-2 border-indigo_custom/75 object-cover shadow-black/20 xs:static xs:h-14 xs:w-14 xs:transform-none xs:border-0 xs:shadow-md"
            )}
            src={imgSrc || AvatarSvg}
            alt={`Avatar ${username}`}
          />
        </DialogTrigger>
        <DialogContent className="max-w-sm rounded-md">
          <form {...props} onSubmit={handleSubmit(onSubmit)} className="static">
            <DialogHeader>
              <DialogTitle className="text-gray-800">Dodaj zdjęcie</DialogTitle>
            </DialogHeader>

            <div className="relative isolate mx-auto my-8 aspect-square w-32 flex-1 cursor-pointer overflow-hidden rounded-full border-black/10 bg-indigo_custom/75 shadow-lg shadow-blue-800/20">
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
                <PlusCircleIcon className="absolute inset-0 m-auto h-14 w-14 text-white" />
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
    </div>
  );
};

export default AvatarImageForm;

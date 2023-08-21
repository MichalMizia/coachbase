// utils
import { fileUploadSchema } from "@/lib/validations/fileUploadValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
// radix
import {
  DialogHeader,
  DialogTrigger,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
// components
import Button from "@/components/ui/Button";
import { HTMLAttributes, ReactNode, memo, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import axios, { AxiosError } from "axios";
import { Icons } from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import ImagePlaceholder from "@/../public/assets/image-placeholder.jpg";
import Image from "next/image";

interface AddImagePopupFormProps extends HTMLAttributes<HTMLDivElement> {
  photoUrl: string;
  setPhotoUrl: (value: string) => void;
  imageClassName?: string;
  children: ReactNode;
  formTitle?: string;
  defaultSuccessMessage?: string;
  defaultErrorMessage?: string;
}

type FormData = z.infer<typeof fileUploadSchema>;

const AddImagePopupForm = ({
  photoUrl,
  setPhotoUrl,
  className,
  children,
  imageClassName,
  formTitle,
  defaultSuccessMessage,
  defaultErrorMessage,
  ...props
}: AddImagePopupFormProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(fileUploadSchema),
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function onSubmit(data: FormData, e: any) {
    e.preventDefault();
    e.stopPropagation();

    setIsLoading(true);

    const file = data.files[0];

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(res);
      const url = res.data.resultURLS[0];
      if (!url) {
        throw new Error();
      }

      setPhotoUrl(url);
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
      toast.error(
        defaultErrorMessage || "Coś poszło nie tak podczas dodawania zdjęcia"
      );
      return null;
    } finally {
      setIsLoading(false);
    }

    toast.success(defaultSuccessMessage || "Dodano zdjęcie");
    dialogBtnRef.current?.click();
  }

  const currentFiles: FileList | null = watch("files") || null;
  const dialogBtnRef = useRef<HTMLButtonElement>(null);

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-[460px] sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)} className="static">
          <DialogHeader>
            <DialogTitle className="text-gray-800">
              {formTitle || "Dodaj zdjęcie"}
            </DialogTitle>
          </DialogHeader>

          <div
            className={cn(
              "relative isolate mx-auto my-9 flex-1 cursor-pointer overflow-hidden rounded-full bg-slate-100",
              className
            )}
          >
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
            {photoUrl ? (
              <img
                src={
                  currentFiles?.length && currentFiles[0] instanceof File
                    ? URL.createObjectURL(currentFiles[0])
                    : photoUrl
                }
                alt="Zdjęcie Profilowe"
                className={cn(
                  "h-full w-full rounded-md object-cover",
                  imageClassName
                )}
              />
            ) : (
              <div className="relative isolate h-full w-full">
                <Image
                  alt="Preview zdjęcia profilowego"
                  fill
                  src={
                    currentFiles &&
                    currentFiles.length &&
                    URL.createObjectURL(currentFiles[0])
                      ? URL.createObjectURL(currentFiles[0])
                      : ImagePlaceholder
                  }
                  className={cn(
                    "h-full w-full rounded-md object-cover",
                    imageClassName
                  )}
                />
              </div>
            )}
          </div>

          <DialogFooter className="gap-y-2">
            <DialogTrigger asChild>
              <Button
                ref={dialogBtnRef}
                type="button"
                variant="outlined"
                className="pl-2.5  text-gray-800"
              >
                <Icons.chevronLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            </DialogTrigger>
            <Button
              onClick={handleSubmit(onSubmit)}
              variant="default"
              isLoading={isLoading}
            >
              <Icons.media className="mr-2 h-4 w-4" />
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default memo(AddImagePopupForm);

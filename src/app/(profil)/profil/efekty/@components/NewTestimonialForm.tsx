"use client";

// radix
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
// components
import { PlusCircle, PlusCircleIcon } from "lucide-react";
import Button from "@/components/ui/Button";
import { Label } from "@radix-ui/react-label";
import TextareaAutosize from "react-textarea-autosize";
// utils
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoadingStore } from "@/lib/state/loading-generation";
import * as z from "zod";
import { toast } from "react-hot-toast";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { optionalFileSchema } from "@/lib/validations/fileUploadValidation";

interface NewTestimonialFormProps {
  userId: string;
}

const NewTestimonialSchema = z.object({
  name: z.string({
    required_error: "Nazwa jest wymagana",
  }),
  description: z
    .string({
      required_error: "Opis jest wymagany",
    })
    .min(20, { message: "Opis musi zawierać minimum 20 znaków" }),
  file1: optionalFileSchema,
  file2: optionalFileSchema,
});

type FormData = z.infer<typeof NewTestimonialSchema>;

const NewTestimonialForm = ({ userId }: NewTestimonialFormProps) => {
  const form = useForm<FormData>({
    resolver: zodResolver(NewTestimonialSchema),
  });
  const { isLoading, setIsLoading } = useLoadingStore();
  const [isTranformation, setIsTranformation] = useState<boolean>(false);
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);

    let fileRes: AxiosResponse | null = null;
    // uploading files
    if (data.file1?.length) {
      const formData = new FormData();
      formData.append("file", data.file1[0]);

      if (data.file2?.length) {
        formData.append("file", data.file2[0]);
      }

      try {
        fileRes = await axios.post("/api/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } catch (e) {
        return toast.error("Błąd podczas dodawania zdjęć error");
      }

      if (!fileRes?.data?.resultURLS) {
        return toast.error("Błąd podczas dodawania zdjęć");
      }
    }

    console.log(fileRes);
    try {
      await axios.post("/api/efekty", {
        userId,
        title: data.name,
        description: data.description,
        transformation: isTranformation,
        photoUrls: fileRes?.data?.resultURLS || [],
      });

      toast.success("Dodano efekt współpracy");
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
      } else if (e instanceof Error) {
        return toast.error(e.message);
      }
      return toast.error("Coś poszło nie tak podczas dodawania efektu");
    } finally {
      setIsLoading(false);
    }

    router.refresh();
  };

  const errors = form.formState.errors;
  const register = form.register;

  const currentFile1: FileList | null = form.watch("file1") || null;
  const currentFile2: FileList | null = form.watch("file2") || null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="">
          <PlusCircle className="mr-2 h-4 w-4" />
          Nowy Efekt
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form action="" onSubmit={form.handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle className="text-gray-800">
              Nowy Efekt Współpracy
            </DialogTitle>
            <DialogDescription className="text-text_readable">
              {errors.name && (
                <p className="text-sm text-red-600">{errors.name.message}</p>
              )}
              {errors.description && (
                <p className="text-sm text-red-600">
                  {errors.description.message}
                </p>
              )}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-x-2 gap-y-1">
              <Label htmlFor="select" className="col-span-4 text-gray-800">
                Tytuł
              </Label>

              <input
                type="text"
                placeholder="Tytuł"
                className="col-span-4 flex h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                {...register("name")}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-1">
              <Label htmlFor="description" className="col-span-2 text-gray-800">
                Opis
              </Label>
              <TextareaAutosize
                id="description"
                key="description"
                className="col-span-4 flex h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Opisz efekt współpracy"
                {...register("description")}
                autoFocus={false}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-1">
              <Label
                htmlFor="select"
                className="col-span-4 flex items-center justify-between gap-1 text-gray-800"
              >
                Zdjęcia
                <div className="flex items-center justify-end gap-2">
                  <span className="text-sm text-text_readable">
                    Dodaj przed/po
                  </span>
                  <Checkbox
                    checked={isTranformation}
                    onCheckedChange={(e) => setIsTranformation(!!e.valueOf())}
                  />
                </div>
              </Label>
              <div className="relative col-span-2 aspect-square rounded-md border-2 border-dashed border-slate-300">
                <input
                  className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
                  type="file"
                  id="file1"
                  multiple={false}
                  accept="image/*"
                  {...register("file1")}
                />
                {currentFile1?.length &&
                URL.createObjectURL(currentFile1[0]) ? (
                  <img
                    className="absolute inset-0 h-full w-full rounded-lg object-cover p-1"
                    src={URL.createObjectURL(currentFile1[0])}
                    alt="Preview zdjęcia dodanego do efektu współpracy"
                  />
                ) : (
                  <PlusCircleIcon className="absolute inset-0 m-auto h-1/2 w-1/2 text-slate-500" />
                )}
              </div>
              {isTranformation && (
                <div className="relative col-span-2 aspect-square rounded-md border-2 border-dashed border-slate-300">
                  <input
                    className="absolute inset-0 z-10 h-full w-full cursor-pointer object-cover opacity-0"
                    type="file"
                    id="file2"
                    multiple={false}
                    accept="image/*"
                    {...register("file2")}
                  />
                  {currentFile2?.length &&
                  URL.createObjectURL(currentFile2[0]) ? (
                    <img
                      className="absolute inset-0 h-full w-full rounded-lg object-cover p-1"
                      src={URL.createObjectURL(currentFile2[0])}
                      alt="Preview zdjęcia dodanego do efektu współpracy"
                    />
                  ) : (
                    <PlusCircleIcon className="absolute inset-0 m-auto h-1/2 w-1/2 text-slate-500" />
                  )}
                </div>
              )}
            </div>
            {errors.file1 && (
              <p className="text-sm text-red-600">{errors.file1.message}</p>
            )}
            {errors.file2 && (
              <p className="text-sm text-red-600">{errors.file2.message}</p>
            )}
          </div>

          <DialogFooter className="mt-4">
            <Button type="submit" isLoading={isLoading}>
              Zapisz
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewTestimonialForm;

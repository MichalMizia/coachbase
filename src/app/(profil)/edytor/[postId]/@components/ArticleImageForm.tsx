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
import { Edit, Loader2Icon } from "lucide-react";
import { Dispatch, HTMLAttributes, SetStateAction, useState } from "react";
import { toast } from "react-hot-toast";
import axios, { AxiosError } from "axios";
import { Icons } from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import { useLocalStorage } from "@/lib/hooks/useLocalStorage";

interface ArticleImageFormProps extends HTMLAttributes<HTMLDivElement> {
  photoUrl: string;
  setPhotoUrl: (value: string) => void;
  postId: string;
  userId: string;
}

type FormData = z.infer<typeof fileUploadSchema>;

const ArticleImageForm = ({
  photoUrl,
  setPhotoUrl,
  userId,
  postId,
  className,
  ...props
}: ArticleImageFormProps) => {
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
    formData.append("image", file);

    try {
      const res = await axios.post("/api/upload-files", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(res);
      const url = res.data.resultURL;
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
      toast.error("Coś poszło nie tak podczas dodawania zdjęcia");
      return null;
    } finally {
      setIsLoading(false);
    }

    toast.success("Dodano zdjęcie jako miniaturkę artykułu");
  }

  const currentFiles: FileList | null = watch("files") || null;

  console.log(photoUrl);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div>
          <div className="absolute left-0 top-0 w-screen border-b bg-bg py-4 shadow-inner md:hidden">
            <div className="container-md">
              <Button
                variant="outlined"
                className="w-full border-2 border-secondary_custom/60 bg-white text-gray-700 hover:border-secondary_custom/60"
              >
                <Icons.media className="mr-2 h-4 w-4 text-secondary_custom/90" />
                Zdjęcie Profilowe
              </Button>
            </div>
          </div>

          <div
            className={cn(
              "relative isolate hidden h-40 w-auto max-w-[160px] flex-1 cursor-pointer self-start overflow-hidden rounded-[35%] bg-slate-100 md:block",
              className
            )}
            {...props}
          >
            {/* {errors?.files && (
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
          /> */}
            {/* {(photoUrl || currentFiles?.length) && (
            // decorational div to show the user he can edit the picture
            <div
              aria-hidden="true"
              className="absolute bottom-0 left-0 z-[3] h-12 w-12 rounded-tr-lg bg-blue-500 p-1 shadow-md"
            >
              <Icons.add className="absolute inset-0 m-auto h-6 w-6 -translate-y-0.5 translate-x-0.5 text-white" />
            </div>
          )} */}
            {photoUrl?.length ? (
              <>
                <img
                  src={photoUrl}
                  alt="Miniaturka Artykułu"
                  className="mx-auto h-full w-full max-w-[240px] rounded-md object-cover"
                  loading="lazy"
                />
                <Loader2Icon className="absolute inset-0 -z-10 m-auto h-1/3 w-1/3 animate-pulse animate-timed-spin text-gray-700" />
              </>
            ) : (
              <div className="absolute inset-0 m-auto flex flex-col items-center justify-center gap-2">
                <Icons.post className="h-8 w-8" />
                <h4 className="text-sm font-semibold">Zdjęcie</h4>
              </div>
            )}
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-[460px] sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)} className="static">
          <DialogHeader>
            <DialogTitle className="text-gray-800">Dodaj zdjęcie</DialogTitle>
          </DialogHeader>

          <div
            className={cn(
              "relative isolate mx-auto my-9 h-40 max-w-[160px] flex-1 cursor-pointer overflow-hidden rounded-full bg-slate-100",
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
            {(photoUrl || currentFiles?.length) && (
              // decorational div to show the user he can edit the picture
              <div
                aria-hidden="true"
                className="absolute bottom-0 left-0 z-[3] h-12 w-12 rounded-tr-lg bg-blue-500 p-1 shadow-md"
              >
                <Icons.add className="absolute inset-0 m-auto h-6 w-6 -translate-y-0.5 translate-x-0.5 text-white" />
              </div>
            )}
            {photoUrl ? (
              <img
                src={
                  currentFiles?.length && currentFiles[0] instanceof File
                    ? URL.createObjectURL(currentFiles[0])
                    : photoUrl
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
              <div className="absolute inset-0 m-auto flex flex-col items-center justify-center gap-2">
                <Icons.post className="h-8 w-8" />
                <h4 className="text-sm font-semibold">Zdjęcie</h4>
              </div>
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
  );
};

export default ArticleImageForm;

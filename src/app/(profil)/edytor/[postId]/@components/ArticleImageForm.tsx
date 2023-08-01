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
import { Edit } from "lucide-react";
import { HTMLAttributes, useState } from "react";
import { toast } from "react-hot-toast";
import axios, { AxiosError } from "axios";
import { Icons } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

interface ArticleImageFormProps extends HTMLAttributes<HTMLDivElement> {
  photoUrl?: string;
  postId: string;
  userId: string;
}

type FormData = z.infer<typeof fileUploadSchema>;

const ArticleImageForm = ({
  photoUrl,
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
    console.log(file);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post(
        "/api/profile/change-profile-picture",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      const url = res.data.url;
      if (!url) {
        throw new Error();
      }

      localStorage.setItem(`article_photoUrl_${postId}`, url);
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

    toast.success(
      "Zdjęcie profilowe zmienione, żeby zobaczyć zmiany może być potrzebne wylogowanie i ponowne zalogowanie"
    );
  }

  const currentFiles: FileList | null = watch("files") || null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          className={cn(
            "relative isolate h-40 max-w-[160px] flex-1 cursor-pointer overflow-hidden rounded-full bg-slate-100",
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

          <DialogFooter>
            <DialogTrigger asChild>
              <Button variant="outlined" className="pl-2.5 text-gray-800">
                <Icons.chevronLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            </DialogTrigger>
            <Button variant="default">
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

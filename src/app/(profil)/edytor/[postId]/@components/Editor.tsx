"use client";

// components
import QuillEditor from "@/components/custom/quill/Editor";
import TextAreaAutosize from "react-textarea-autosize";
import Button from "@/components/ui/Button";
import { Icons } from "@/components/ui/icons";
import ArticleImageForm from "./ArticleImageForm";
import { toast } from "react-hot-toast";
// hooks
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useLocalStorage } from "@/lib/hooks/useLocalStorage";
// utils
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { ArticleType } from "@/model/article";
import { articleUploadSchema } from "@/lib/validations/articleValidation";
import axios, { AxiosError } from "axios";
// radix
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface EditorProps {
  className: string;
  post: ArticleType;
  userId: string;
}

type FormData = z.infer<typeof articleUploadSchema>;

const Editor = ({ className, post, userId }: EditorProps) => {
  const [article, setArticle] = useLocalStorage<string>(
    `article_content_${post._id}`,
    post.content,
    sessionStorage
  );
  const [photoUrl, setPhotoUrl] = useLocalStorage<string>(
    `article_photoUrl_${post._id}`,
    post.photoUrl || ""
  );

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(articleUploadSchema),
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [published, setPublished] = useState<boolean>(false);

  const router = useRouter();

  async function onSubmit(data: FormData) {
    setIsLoading(true);

    try {
      const res = await axios.post("/api/", {});
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
      toast.error("Coś poszło nie tak podczas dodawania zdjęcia");
      return null;
    } finally {
      setIsLoading(false);
    }

    toast.success("Zapisano artykuł");
  }

  return (
    <form
      action=""
      onSubmit={handleSubmit(onSubmit)}
      className="fixed inset-0 flex h-screen w-screen max-w-[100vw] flex-col items-stretch justify-start overflow-auto overflow-x-hidden bg-white py-6 pb-0 sm:pb-6"
    >
      <div className="container-md flex flex-col items-start justify-between pb-6 md:flex-row">
        <div className="flex w-full max-w-md flex-col items-start justify-between self-stretch md:py-2 nav:max-w-xl">
          <div className="mb-3 flex flex-wrap items-stretch gap-2">
            <Button
              variant="outlined"
              title="Powrót"
              className="pl-2.5 text-gray-800"
              onClick={() => {
                router.back();
              }}
            >
              <Icons.chevronLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <Button type="submit" variant="default" isLoading={isLoading}>
              <Icons.billing className="mr-2 h-4 w-4" />
              Save
            </Button>
            <Button type="submit" variant="default" isLoading={isLoading}>
              <Icons.logo className="mr-2 h-4 w-4" />
              Save & Publish
            </Button>
          </div>
          <div className="max-w-screen px-2 sm:px-0">
            <input
              placeholder="Artykuł musi mieć tytuł"
              className="mb-1 rounded-md p-1 text-3xl font-semibold text-gray-800 outline-none placeholder-shown:outline-slate-300"
              {...register("title")}
              id="title"
              name="Tytuł"
              defaultValue={post.title}
            />
            <TextAreaAutosize
              placeholder="Artykuł musi mieć podsumowanie"
              className="block w-full max-w-lg resize-none rounded-md px-1 text-h6 text-gray-700 outline-none placeholder-shown:py-0.5 placeholder-shown:outline-slate-300"
              {...register("summary")}
              id="summary"
              name="Podsumowanie"
              defaultValue={post.summary}
            />
          </div>
        </div>
        <ArticleImageForm
          postId={post._id}
          photoUrl={photoUrl}
          setPhotoUrl={setPhotoUrl}
          userId={userId}
          className="w-screen self-end rounded-[25%] xs:w-auto sm:self-start sm:rounded-[35%]"
        />
      </div>
      <div className="mx-auto w-full flex-1 overflow-clip xs:px-1 sm:w-[90%] sm:pb-2 xl:w-[85%]">
        {errors?.title && (
          <p className="bottom absolute-0 left-0 w-[200%] text-center text-sm text-red-600">
            {errors.title.message?.toString()}
          </p>
        )}
        {errors?.summary && (
          <p className="bottom absolute-0 left-0 w-[200%] text-center text-sm text-red-600">
            {errors.summary.message?.toString()}
          </p>
        )}
        <QuillEditor
          id="article"
          key="article"
          // className="flex w-full flex-col rounded-md border border-gray-300 bg-gray-50 text-gray-900 ring-offset-background file:border-0 file:bg-transparent disabled:cursor-not-allowed disabled:opacity-50"
          className={cn(
            "relative -left-[1%] flex h-full max-h-full min-h-full w-[102%] flex-col items-stretch justify-start xs:static xs:w-full",
            className
          )}
          value={article}
          onChange={(e) => {
            setArticle(e);
          }}
        />
      </div>
    </form>
  );
};

export default Editor;

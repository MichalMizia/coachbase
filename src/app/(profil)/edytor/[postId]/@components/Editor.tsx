"use client";

// components
import QuillEditor from "@/components/custom/quill/Editor";
import TextAreaAutosize from "react-textarea-autosize";
import Button from "@/components/ui/Button";
import { Icons } from "@/components/ui/icons";
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
import { Edit, LucideUser } from "lucide-react";
import ArticleImageForm from "./ArticleImageForm";

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

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(articleUploadSchema),
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  return (
    <div className="fixed inset-0 flex h-screen w-screen flex-col items-stretch justify-start overflow-auto bg-white py-6">
      <div className="container-md flex items-start justify-between pb-6">
        <div className="flex w-full max-w-xl flex-col items-start justify-between self-stretch md:py-2">
          <div className="mb-3 flex items-stretch gap-4">
            <Button
              variant="outlined"
              className="pl-2.5 text-gray-800"
              onClick={() => {
                router.back();
              }}
            >
              <Icons.chevronLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <Button variant="default">
              <Icons.billing className="mr-2 h-4 w-4" />
              Save
            </Button>
          </div>
          <div className="">
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
          photoUrl={post.photoUrl || undefined}
          userId={userId}
          className=""
        />
      </div>
      <div className="mx-auto w-full flex-1 overflow-clip px-1 pb-6 sm:w-[90%] xl:w-[85%]">
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
            "flex h-full max-h-full min-h-full w-full flex-col items-stretch justify-start",
            className
          )}
          value={article}
          onChange={(e) => {
            setArticle(e);
          }}
        />
      </div>
    </div>
  );
};

export default Editor;

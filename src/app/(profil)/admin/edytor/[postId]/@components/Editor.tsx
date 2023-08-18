"use client";

// components
import QuillEditor from "@/components/custom/Editor";
import TextAreaAutosize from "react-textarea-autosize";
import Button from "@/components/ui/Button";
import { Icons } from "@/components/ui/icons";
import ArticleImageForm from "./ArticleImageForm";
import { toast } from "react-hot-toast";
// hooks
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useState } from "react";
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
import { Label } from "@/components/ui/label";
import { MultiSelect, Option } from "react-multi-select-component";
import { tagOptions } from "@/config/global";
import "@/components/forms/css/mediaform.css";

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
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(articleUploadSchema),
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [published, setPublished] = useState<boolean>(post.published);

  const router = useRouter();

  const [selectedTags, setSelectedTags] = useState<Option[]>(
    post.tags?.map((tag) => {
      return { value: tag, label: tag };
    }) || []
  );

  async function onSubmit(data: FormData) {
    setIsLoading(true);

    console.log(data.summary, data.title, "title");

    try {
      const res = await axios.patch("/api/artykuly", {
        published: published,
        title: data.title,
        summary: data.summary,
        photoUrl: photoUrl,
        content: article,
        articleId: post._id,
        tags: selectedTags.map((tagOption) => tagOption.value),
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
      toast.error("Coś poszło nie tak podczas dodawania zdjęcia");
      return null;
    } finally {
      setIsLoading(false);
    }

    toast.success("Zapisano artykuł");
    // router.back();
  }

  return (
    <form
      action=""
      onSubmit={handleSubmit(onSubmit)}
      className="fixed inset-0 flex w-screen max-w-[100vw] flex-col items-stretch justify-start overflow-x-hidden bg-white py-6 pb-0 pt-20 xs:h-screen sm:pb-6 sm:pt-6"
    >
      <div className="container-md flex flex-col items-start justify-between pb-6 md:flex-row">
        <div className="flex w-full max-w-md flex-col items-start justify-between self-stretch md:py-2 nav:max-w-xl">
          <div className="mb-3 grid w-full grid-cols-2 flex-wrap items-stretch gap-1.5 min-[360px]:flex xs:gap-2">
            <Button
              variant="outlined"
              title="Powrót"
              className="col-span-1 my-[1px] pl-2.5 text-gray-800"
              onClick={() => {
                router.back();
              }}
            >
              <Icons.chevronLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <Button
              className="col-span-1 my-[1px]"
              type="submit"
              variant="default"
              isLoading={isLoading}
            >
              {!isLoading && <Icons.billing className="mr-2 h-4 w-4" />}
              Save
            </Button>
            <Select
              defaultValue={published ? "Publish" : "Draft"}
              onValueChange={(val) => {
                if (val === "Draft") {
                  setPublished(false);
                } else {
                  setPublished(true);
                }
              }}
            >
              <SelectTrigger className="col-span-2 gap-2 self-stretch border border-secondary_custom/60 text-gray-700 outline outline-1 outline-secondary_custom/60 min-[360px]:w-fit">
                <SelectValue placeholder="Status Artykułu" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Draft">Draft</SelectItem>
                <SelectItem value="Publish">Publish</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="mr-auto flex max-w-full flex-col items-stretch justify-stretch">
            {/* <pre>{JSON.stringify(errors)}</pre> */}
            <div className="mx-auto flex w-[90vw] max-w-full flex-1 flex-col gap-2 sm:w-full sm:min-w-[300px]">
              <Label className="text-body text-gray-800" htmlFor="title">
                Tytuł
              </Label>
              <TextAreaAutosize
                placeholder="Artykuł musi mieć tytuł"
                className="w-full rounded-md border border-black/20 bg-slate-50 px-3 py-2 text-gray-700 shadow-md outline-none outline-offset-0 transition-all placeholder:text-slate-500 hover:border-indigo_custom/20 focus:border-l-indigo_custom/30 focus:outline focus:outline-1 focus:outline-indigo_custom/30"
                {...register("title")}
                onChange={(e) => setValue("title", e.target.value)}
                id="title"
                name="Tytuł"
                defaultValue={post.title}
              />
            </div>
            <div className="mt-4 flex w-[90vw] max-w-full flex-grow flex-col gap-1 sm:w-full sm:min-w-[300px]">
              <Label className="text-body text-gray-800" htmlFor="summary">
                Podsumowanie
              </Label>
              <TextAreaAutosize
                placeholder="Artykuł musi mieć podsumowanie"
                className="w-full rounded-md border border-black/20 bg-slate-50 px-3 py-2 text-gray-700 shadow-md outline-none outline-offset-0 transition-all placeholder:text-slate-500 hover:border-indigo_custom/20 focus:border-l-indigo_custom/30 focus:outline focus:outline-1 focus:outline-indigo_custom/30"
                {...register("summary")}
                onChange={(e) => setValue("summary", e.target.value)}
                id="summary"
                name="Podsumowanie"
                defaultValue={post.summary}
              />
            </div>
            <div className="mt-4 flex w-[90vw] max-w-full flex-grow flex-col gap-1 sm:w-full sm:min-w-[300px]">
              <Label
                id="tags-label"
                className="text-body text-gray-800"
                htmlFor="summary"
              >
                Tagi artykułu
              </Label>
              <MultiSelect
                labelledBy="tags-label"
                className="mt-0.5 rounded-md text-gray-700 shadow-md transition-all placeholder:text-slate-500 hover:border-indigo_custom/20 focus:border-l-indigo_custom/30 focus:outline focus:outline-1 focus:outline-indigo_custom/30"
                options={tagOptions}
                value={selectedTags}
                onChange={setSelectedTags}
                // config
                isCreatable={true}
                hasSelectAll={false}
              />
            </div>
          </div>
        </div>
        <ArticleImageForm
          postId={post._id}
          photoUrl={photoUrl}
          setPhotoUrl={setPhotoUrl}
          userId={userId}
          className=""
        />
      </div>
      <div className="mx-auto w-full flex-1 xs:px-1 sm:w-[90%] sm:pb-2 xl:w-[85%]">
        {errors?.title && (
          <p className="bottom absolute-0 left-0 text-center text-sm text-red-600">
            {errors.title.message?.toString()}
          </p>
        )}
        {errors?.summary && (
          <p className="bottom absolute-0 left-0 text-center text-sm text-red-600">
            {errors.summary.message?.toString()}
          </p>
        )}
        <QuillEditor
          id="article"
          key="article"
          // className="flex w-full flex-col rounded-md border border-gray-300 bg-gray-50 text-gray-900 ring-offset-background file:border-0 file:bg-transparent disabled:cursor-not-allowed disabled:opacity-50"
          className={cn(
            "flex h-[80vh] min-h-full flex-col items-stretch justify-start xs:static xs:w-full",
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

"use client";

import Button from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import axios, { AxiosError } from "axios";
import { sanitize } from "isomorphic-dompurify";
import { Edit, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, HTMLProps, useState } from "react";
import { toast } from "react-hot-toast";
import dynamic from "next/dynamic";
import { useLocalStorage } from "@/lib/hooks/useLocalStorage";

const Editor = dynamic(() => import("@/components/custom/Editor"), {
  loading: () => <div></div>,
});

interface ExperienceEditorProps extends HTMLProps<HTMLDivElement> {
  experience?: string;
  userId: string;
}

const ExperienceEditor = ({
  experience,
  className,
  userId,
  ...props
}: ExperienceEditorProps) => {
  const [content, setContent] = useLocalStorage<string>(
    "LOCAL_STORAGE_EXPERIENCE_KEY",
    experience || "",
    sessionStorage
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  console.log(content);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    setIsLoading(true);
    e.preventDefault();

    try {
      if (!content.length) {
        return toast.error("Opis jest wymagany");
      }

      const res = await axios.post("/api/doswiadczenie", {
        userId,
        content: content,
      });

      toast.success("Zmieniono opis doświadczenia");
    } catch (e) {
      if (
        e instanceof AxiosError &&
        e.response?.status?.toString()[0] === "4" &&
        e.response?.data?.message
      ) {
        return toast.error(e.response.data.message);
      } else {
        return toast.error("Nie udało się zmienić opisu doświadczenia");
      }
    } finally {
      setIsLoading(false);
    }
    router.refresh();
  };

  return (
    <Dialog>
      <section
        className={cn("space-y-4 pb-2", className)}
        {...props}
        id="doswiadczenie"
      >
        <div className="relative flex flex-col items-start justify-between gap-y-2 xs:flex-row xs:items-center">
          <h2 className="text-h4 font-semibold text-gray-800">
            Opis Twojego Doświadczenia
          </h2>
          <DialogTrigger asChild>
            <Button>
              <Edit className="mr-2 h-4 w-4" />
              Edytuj <span className="hidden sm:block">Opis</span>
            </Button>
          </DialogTrigger>
        </div>
        {!!experience?.length ? (
          <article
            className="small-article flow"
            dangerouslySetInnerHTML={{ __html: sanitize(experience) }}
          ></article>
        ) : (
          <p className="text-lg text-text_readable">
            Nie dodałeś jeszcze opisu swojego doświadczenia
          </p>
        )}
        <DialogContent className="!h-[95vh] !w-[95vw] max-w-none overflow-hidden">
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="static flex h-full max-h-full flex-col justify-start overflow-hidden"
          >
            {/* {isLoading && (
                <div className="absolute inset-0 h-full w-full bg-[#00000030] p-8">
                  <Loader2 className="h-full w-full animate-spin" />
                </div>
              )} */}
            <DialogHeader className="">
              <DialogTitle className="text-gray-800">Edytuj opis</DialogTitle>
            </DialogHeader>

            <Editor
              className={`article-editor mt-4 !overflow-y-auto !text-gray-800`}
              value={content}
              onChange={setContent}
            />
            <Button
              isLoading={isLoading}
              type="submit"
              className="ml-auto mt-4 w-fit self-end"
              size="large"
            >
              {!isLoading && <Save className="mr-1 h-5 w-5 text-xl" />}
              Zapisz
            </Button>
          </form>
        </DialogContent>
      </section>
    </Dialog>
  );
};

export default ExperienceEditor;

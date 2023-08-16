"use client";

import Button from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { sanitize } from "isomorphic-dompurify";
import { Edit } from "lucide-react";
import { FormEvent, useRef, useState } from "react";
// lazy loaded
import dynamic from "next/dynamic";
import { toast } from "react-hot-toast";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
const Editor = dynamic(() => import("@/components/custom/Editor"));

interface MainContentFormProps {
  userId: string;
  content: string;
}

const MainContentForm = ({ content, userId }: MainContentFormProps) => {
  const DialogTriggerRef = useRef<HTMLButtonElement>(null);

  const [currentDescription, setCurrentDescription] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const res = await axios.patch("/profil/content", {
        userId,
        content: currentDescription,
      });

      toast.success("Edytowano ofertę");
    } catch (e) {
      if (
        e instanceof AxiosError &&
        e.response?.status?.toString()[0] === "4" &&
        e.response?.data?.message
      ) {
        toast.error(e.response.data.message);
        return null;
      }
    } finally {
      setIsLoading(false);
    }
    router.refresh();
  };

  return (
    <Dialog>
      <div className="max-w-5xl">
        <div className="mb-2 flex items-center justify-between gap-4">
          <div className="space-y-0.5">
            <h2 className="text-xl font-semibold text-gray-800">O mnie</h2>
            <p>
              To główne miejsce w którym klienci będą szukać informacji na twój
              temat
            </p>
          </div>
          <DialogTrigger asChild>
            <Button ref={DialogTriggerRef}>
              <Edit className="mr-1 h-5 w-5" /> Edytuj
            </Button>
          </DialogTrigger>
        </div>
        {content?.length ? (
          <article
            className="article flow !mx-0 !max-w-5xl"
            dangerouslySetInnerHTML={{ __html: sanitize(content) }}
          ></article>
        ) : (
          <p className="">Nie masz jeszcze nic w tej sekcji.</p>
        )}
      </div>

      <DialogContent className="!h-[95vh] !w-[95vw] max-w-none overflow-hidden">
        <form onSubmit={(e) => handleSubmit(e)} className="static">
          {/* {isLoading && (
                <div className="absolute inset-0 h-full w-full bg-[#00000030] p-8">
                  <Loader2 className="h-full w-full animate-spin" />
                </div>
              )} */}

          <DialogHeader className="">
            <DialogTitle className="text-gray-800">Edytuj opis</DialogTitle>
            <Button isLoading={isLoading} className="mt-2 w-fit">
              Zapisz zmiany
            </Button>
          </DialogHeader>

          <Editor
            id="description"
            key="description"
            className="article-editor editor mt-4 h-full w-full flex-1 overflow-y-hidden"
            defaultValue={content}
            value={currentDescription}
            onChange={setCurrentDescription}
          />
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default MainContentForm;

"use client";

import Button from "@/components/ui/Button";
import TextAreaAutosize from "react-textarea-autosize";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ChevronLeft, ImageIcon, Save } from "lucide-react";
import { FormEvent, ReactNode, useRef, useState } from "react";
// lazy loaded
import dynamic from "next/dynamic";
import { CheckmarkIcon, toast } from "react-hot-toast";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import AddImagePopupForm from "@/components/forms/AddImagePopupForm";
// styles
const BubbleEditor = dynamic(() => import("@/components/custom/BubbleEditor"), {
  loading: () => <div></div>,
});

interface AddNewsDialogProps {
  userId: string;
  dialogTrigger: ReactNode;
}

var toolbarOptions = [
  "bold",
  "italic",
  "underline",
  { list: "ordered" },
  { list: "bullet" },
  { header: 2 },
  "link",
]; // toggled buttons

const modules = {
  toolbar: toolbarOptions,
};

const AddNewsDialog = ({ userId, dialogTrigger }: AddNewsDialogProps) => {
  const DialogTriggerRef = useRef<HTMLButtonElement>(null);

  const [photoUrl, setPhotoUrl] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    setIsLoading(true);
    e.preventDefault();

    try {
      if (!content.length || !title.length) {
        return toast.error("Opis i tytuł są wymagane");
      }

      const res = await axios.post("/api/aktualnosci", {
        userId,
        content: content,
        title: title,
        photoUrl: photoUrl,
      });

      toast.success("Dodano do aktualności");
    } catch (e) {
      if (
        e instanceof AxiosError &&
        e.response?.status?.toString()[0] === "4" &&
        e.response?.data?.message
      ) {
        return toast.error(e.response.data.message);
      } else {
        return toast.error("Nie udało się dodać do aktualności");
      }
    } finally {
      setIsLoading(false);
    }
    router.refresh();
    DialogTriggerRef.current?.click();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{dialogTrigger}</DialogTrigger>

      <DialogContent className=" !h-[95vh] !w-[95vw] max-w-none overflow-hidden">
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="static flex h-full max-h-full flex-col justify-start overflow-hidden"
        >
          <DialogHeader className="">
            <DialogTitle className="text-gray-800">
              Dodawanie Aktualności
            </DialogTitle>
          </DialogHeader>

          <div className="mt-4 grid gap-4">
            <div className="ml-1 grid space-y-1">
              <AddImagePopupForm
                photoUrl={photoUrl}
                setPhotoUrl={setPhotoUrl}
                className="!aspect-video !rounded-md"
                defaultSuccessMessage="Dodano zdjęcie do posta"
              >
                <Button
                  className="w-full max-w-sm rounded-2xl border border-black/10 shadow-md outline outline-1 outline-offset-1 outline-transparent transition-all focus-within:outline-indigo_custom/40 hover:border-indigo_custom/30 hover:bg-slate-50"
                  variant="text"
                >
                  {!!photoUrl.length ? (
                    <CheckmarkIcon className="relative left-1 mr-3 justify-self-end" />
                  ) : (
                    <ImageIcon className="mr-2 h-4 w-4 text-secondary_custom" />
                  )}
                  Dodaj Zdjęcie
                </Button>
              </AddImagePopupForm>
            </div>

            <div className="ml-1 grid w-[calc(100%-8px)] max-w-6xl space-y-1">
              <label
                className="ml-1 font-semibold text-gray-800"
                htmlFor="title"
              >
                Tytuł
              </label>
              <TextAreaAutosize
                id="title"
                key="title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="rounded-2xl border border-black/10 px-3 py-2 shadow-md outline outline-1 outline-transparent transition-all focus-within:outline-indigo_custom/40 hover:border-indigo_custom/30"
              />
            </div>

            <div className="ml-1 grid w-[calc(100%-8px)] max-w-6xl space-y-1">
              <label
                className="ml-1 font-semibold text-gray-800"
                htmlFor="content"
              >
                Opis
              </label>
              <BubbleEditor
                id="content"
                key="content"
                modules={modules}
                className="article-editor max-h-full min-h-[50vh] w-full overflow-y-auto rounded-2xl border border-black/10 px-0.5 !text-gray-800 shadow-md outline outline-1 outline-transparent transition-all focus-within:outline-indigo_custom/40 hover:border-indigo_custom/30"
                placeholder="Żeby edytować styl elementu tekstowego, zaznacz go"
                value={content}
                onChange={setContent}
              />
            </div>
          </div>

          <div className="mt-4 flex justify-end gap-2">
            <DialogTrigger asChild>
              <Button
                ref={DialogTriggerRef}
                type="button"
                variant="outlined"
                className="pl-2.5  text-gray-800"
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            </DialogTrigger>
            <Button isLoading={isLoading} type="submit">
              {!isLoading && <Save className="mr-1 h-5 w-5" />}
              Zapisz
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewsDialog;

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
import { Edit, Save } from "lucide-react";
import { FormEvent, Suspense, useEffect, useRef, useState } from "react";
// lazy loaded
import dynamic from "next/dynamic";
import { toast } from "react-hot-toast";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
// styles
import "react-quill/dist/quill.snow.css";
import { useLocalStorage } from "@/lib/hooks/useLocalStorage";
const RichEditor = dynamic(() => import("@/components/custom/RichEditor"));

interface MainContentFormProps {
  userId: string;
  content: string;
}

const MainContentForm = ({ content, userId }: MainContentFormProps) => {
  const DialogTriggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    toast.success(
      (t) => (
        <div className="flex flex-col">
          <h4 className="text-xl font-semibold text-black">Sekcja O Tobie</h4>
          <p className="mt-1 text-gray-700">
            Czy wiesz że uzupełniając swój profil zdecydowanie zwiększasz swoje
            szanse na pozyskanie klientów? Wyróżnij się na tle innych trenerów i
            dodaj opis który pomoże Ci osiągnąć Twój cel.
          </p>
        </div>
      ),
      {
        duration: 10000,
        className: "custom max-w-500",
        position: "bottom-right",
      }
    );
  }, []);

  const [currentDescription, setCurrentDescription] = useLocalStorage<string>(
    "CONTENT_STORAGE_KEY",
    content,
    sessionStorage
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    setIsLoading(true);
    e.preventDefault();

    try {
      if (!currentDescription.length) {
        return toast.error("Opis jest wymagany");
      }

      const res = await axios.post("/api/profil/content", {
        userId,
        content: currentDescription,
      });

      toast.success("Zmieniono opis");
    } catch (e) {
      if (
        e instanceof AxiosError &&
        e.response?.status?.toString()[0] === "4" &&
        e.response?.data?.message
      ) {
        return toast.error(e.response.data.message);
      } else {
        return toast.error("Nie udało się zmienić opisu");
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
            <p className="max-w-2xl">
              Dodając unikalny opis do swojego Profilu Trenera wyróżniasz się i
              drastycznie zwiększasz swoje szanse na pozyskanie klientów.
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
            className="small-article flow !mx-0 !max-w-5xl"
            dangerouslySetInnerHTML={{ __html: sanitize(content) }}
          ></article>
        ) : (
          <p className="max-w-xl cursor-pointer text-body text-gray-700">
            Nie dodałeś jeszcze swojego opisu.
          </p>
        )}
      </div>

      <DialogContent className=" !h-[95vh] !w-[95vw] max-w-none overflow-hidden">
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

          <Suspense
            fallback={
              <div className="mt-4 h-full w-full animate-pulse border border-black/10 bg-slate-100"></div>
            }
          >
            <RichEditor
              isLoading={isLoading}
              className="mt-4"
              value={currentDescription}
              // @ts-expect-error
              setValue={setCurrentDescription}
            />
          </Suspense>
          <Button
            isLoading={isLoading}
            type="submit"
            className="absolute bottom-6 right-6"
            size="large"
          >
            {!isLoading && <Save className="mr-1 h-5 w-5 text-xl" />}
            Zapisz
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default MainContentForm;

"use client";

// components
import Button from "@/components/ui/Button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DialogHeader,
  DialogTrigger,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Edit, Loader2 } from "lucide-react";
import TextareaAutosize from "react-textarea-autosize";
import { Tabs, TabsTrigger, TabsContent, TabsList } from "@/components/ui/tabs";
// hooks
import React, { useRef, useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Editor from "@/components/custom/quill/Editor";
import axios, { AxiosError } from "axios";
import { useLoadingStore } from "@/lib/state/loading-generation";
import { toast } from "react-hot-toast";
import { sanitize } from "isomorphic-dompurify";

interface DescriptionUpdateFormProps {
  summary?: string;
  content?: string;
  slug: string;
}

const ProfileUpdateSchema = z.object({
  summary: z
    .string()
    .max(250, "Krótki powinien zawierać maksimum 250 znaków")
    .min(50, "Krótki powinien zawierać minimum 40 znaków"),
  description: z.string(),
});

type FormData = z.infer<typeof ProfileUpdateSchema>;

export function DescriptionUpdateForm({
  summary,
  content,
  slug,
}: DescriptionUpdateFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(ProfileUpdateSchema),
  });
  const { isLoading, setIsLoading } = useLoadingStore();
  const [currentDescription, setCurrentDescription] = useState<string>(
    content || ""
  );
  const dialogRef = useRef<HTMLDialogElement>(null);

  const onSubmit = async (data: FormData) => {
    console.log("here");
    setIsLoading(true);
    if (!data) return toast.error("Pola są wymagane");

    try {
      console.log(data.description === content, data.description, content);
      const res = await axios.post("/api/profil/opis", {
        slug,
        summary: data.summary !== summary ? data.summary : null,
        description: data.description !== content ? data.description : null,
      });

      toast.success(res.data?.message || "Pomyślnie zmieniono opis");
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
      toast.error("Coś poszło nie tak podczas rejestracji");
      return null;
    } finally {
      setIsLoading(false);
      if (dialogRef.current) {
        dialogRef.current.open = false;
      }
    }
  };

  return (
    <div className="max-w-4xl space-y-[3px]">
      <div className="mb-4 flex max-w-4xl items-start justify-between gap-2 sm:items-center">
        <div className="space-y-[3px]">
          <h2 className="text-xl font-semibold text-gray-800">Opis</h2>
          <p className="text-h6 leading-[1.2em] text-text_readable">
            Krótki opis wyświetla się w liście ofert a długi opis po wejściu w
            profil trenera
          </p>
        </div>
        <Tabs defaultValue="summary">
          <Dialog>
            <DialogTrigger asChild>
              <Button isLoading={isLoading} className="self-start">
                <Edit className="mr-2 h-4 w-4 text-gray-300 " />
                Edytuj
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[460px] sm:max-w-[425px]">
              <form onSubmit={handleSubmit(onSubmit)} className="static">
                {/* {isLoading && (
                <div className="absolute inset-0 h-full w-full bg-[#00000030] p-8">
                  <Loader2 className="h-full w-full animate-spin" />
                </div>
              )} */}
                <TabsList className="absolute bottom-[calc(100%+8px)] left-0 right-0 grid w-full grid-cols-2 rounded-md bg-muted">
                  <TabsTrigger value="summary">Krótki Opis</TabsTrigger>
                  <TabsTrigger value="description">Długi Opis</TabsTrigger>
                </TabsList>
                <DialogHeader>
                  <DialogTitle className="text-gray-800">
                    Edytuj opis
                  </DialogTitle>
                </DialogHeader>
                <TabsContent
                  tabIndex={-1}
                  value="summary"
                  className="bg-white outline-none"
                >
                  <div className="grid gap-4 py-4">
                    <div className="flex flex-col items-start justify-start">
                      <Label
                        htmlFor="summary"
                        className="mb-2 text-text_readable"
                      >
                        Krótki Opis
                      </Label>
                      <TextareaAutosize
                        id="summary"
                        key="summary"
                        className="flex h-10  w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-900 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        minRows={3}
                        autoCorrect="off"
                        autoCapitalize="on"
                        defaultValue={summary}
                        {...register("summary")}
                      />
                      {errors && errors.summary && (
                        <p className="text-sm text-red-500">
                          {errors.summary.message}
                        </p>
                      )}
                    </div>
                  </div>
                </TabsContent>
                <TabsContent
                  tabIndex={-1}
                  value="description"
                  className="bg-white outline-none"
                >
                  <div className="grid gap-4 py-4">
                    <div className="flex flex-col items-start justify-start">
                      <Label
                        htmlFor="description"
                        className="mb-2 text-text_readable"
                      >
                        Długi Opis
                      </Label>
                      <Editor
                        id="description"
                        key="description"
                        className="flex w-full flex-col rounded-md border border-gray-300 bg-gray-50 text-gray-900 ring-offset-background file:border-0 file:bg-transparent disabled:cursor-not-allowed disabled:opacity-50"
                        defaultValue={content}
                        value={currentDescription}
                        onChange={(e) => {
                          setCurrentDescription(e);
                          setValue("description", e);
                        }}
                      />
                      <input
                        type="text"
                        {...register("description")}
                        readOnly
                        className="pointer-events-none absolute -z-10 opacity-0"
                        aria-hidden="true"
                      />
                      {errors && errors.description && (
                        <p className="text-sm text-red-500">
                          {errors.description.message}
                        </p>
                      )}
                    </div>
                  </div>
                </TabsContent>

                <DialogFooter>
                  {/* <p className="p-2 text-lg">{JSON.stringify(errors)}</p> */}
                  <Button isLoading={isLoading}>Zapisz zmiany</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </Tabs>
      </div>
      <div className="mt-2 flex flex-col items-start justify-start gap-4 sm:flex-row xl:gap-6">
        <Card className="max-w-lg flex-1 space-y-0.5">
          <CardHeader>
            <CardTitle className="text-gray-800">Krótki Opis</CardTitle>
            <CardDescription className="text-body text-text_readable">
              {summary && <p>{summary}</p>}
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="max-w-lg flex-1 space-y-0.5">
          <CardHeader>
            <CardTitle className="text-gray-800">Długi Opis</CardTitle>
            <CardDescription className="text-body text-text_readable">
              {content && (
                <div
                  dangerouslySetInnerHTML={{ __html: sanitize(content) }}
                ></div>
              )}
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}

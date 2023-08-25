"use client";

// components
import Button from "@/components/ui/Button";
import TextareaAutosize from "react-textarea-autosize";
// hooks
import React, { HTMLProps } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { useLoadingStore } from "@/lib/state/loading-generation";
import { toast } from "react-hot-toast";
import { SaveIcon } from "lucide-react";
import { useErrorValidation } from "@/lib/hooks/useErrorValidation";
import { useRouter } from "next/navigation";

interface DescriptionUpdateFormProps extends HTMLProps<HTMLFormElement> {
  summary?: string;
  id: string;
}

const ProfileUpdateSchema = z.object({
  summary: z
    .string()
    .max(300, "Krótki powinien zawierać maksimum 300 znaków")
    .min(50, "Krótki powinien zawierać minimum 40 znaków"),
});

type FormData = z.infer<typeof ProfileUpdateSchema>;

export function DescriptionUpdateForm({
  summary,
  id,
}: DescriptionUpdateFormProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(ProfileUpdateSchema),
  });
  const { isLoading, setIsLoading } = useLoadingStore();

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);

    try {
      const res = await axios.post("/api/profil/opis", {
        id,
        summary: data.summary,
      });

      toast.success(res.data?.message || "Pomyślnie zmieniono opis");
    } catch (e) {
      console.log(e);
      if (e instanceof Error && e.message) {
        return toast.error(e.message);
      } else if (e instanceof z.ZodError) {
        return toast.error("Formularz wypełniony niepoprawnie");
      }
      return toast.error("Coś poszło nie tak podczas zmiany opisu");
    } finally {
      setIsLoading(false);
      router.refresh();
    }
  };

  const currentSummary = watch("summary") || null;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-4xl space-y-2 sm:mt-4"
    >
      <div className="flex max-w-4xl items-start justify-between gap-2 sm:flex-row sm:items-center">
        <div className="mb-2 space-y-0.5 sm:mb-0">
          <h2 className="text-xl font-semibold text-gray-800">Opis</h2>
          <p className="max-w-lg">
            Krótki opis(max 300 znaków) wyświetla się gdy użytkownicy
            przeglądają listę ofert.
          </p>
        </div>
        <Button
          isLoading={isLoading}
          disabled={!currentSummary || currentSummary === summary}
          className="hidden sm:flex"
        >
          <SaveIcon className="mr-2 h-5 w-5" />
          Zapisz
        </Button>
      </div>
      <TextareaAutosize
        className="w-full rounded-md border border-black/20 bg-slate-50 px-3 py-2 text-gray-700 shadow-md outline-none outline-offset-0 transition-all placeholder:text-slate-500 hover:border-indigo_custom/20 focus:border-l-indigo_custom/30 focus:outline focus:outline-1 focus:outline-indigo_custom/30"
        {...register("summary")}
        defaultValue={summary || ""}
        placeholder="Twój Krótki Opis wyświetla się w liście ofert"
      />
      {errors.summary && (
        <p className="text-sm text-red-500">{errors.summary.message}</p>
      )}
      <Button
        isLoading={isLoading}
        disabled={!currentSummary || currentSummary === summary}
        size="large"
        className="w-full sm:hidden"
      >
        <SaveIcon className="mr-2 h-5 w-5" />
        Zapisz
      </Button>
    </form>
  );
}

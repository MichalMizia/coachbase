"use client";

import { useState } from "react";
import axios, { AxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import Button from "../ui/Button";

interface ChangeNameFormProps {
  name: string | null | undefined;
}

interface FormData {
  newName: string;
}

const ChangeNameForm = ({ name }: ChangeNameFormProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(z.object({ name: z.string() })),
  });

  async function onSubmit(data: FormData) {
    setIsLoading(true);

    try {
      await axios.patch("/api/rejestracja", {
        username: name,
        newUsername: data.newName,
      });
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
      toast.error("Nie udało się zmienić nazwy użytkownika");
      return null;
    } finally {
      setIsLoading(false);
    }

    setIsLoading(false);

    toast.success("Nazwa zmieniona");
  }

  const currentName: string | null = watch("newName") || null;

  return (
    <form
      action=""
      className="bg-white px-8 py-6 shadow shadow-[#00000030] rounded-sm"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h4 className="mb-4">Zmiana nazwy użytkownika</h4>
      <div className="flex justify-center items-stretch">
        <label htmlFor="email" className="sr-only">
          Email
        </label>
        <input
          defaultValue={name ? name : ""}
          type="name"
          {...register("newName")}
          id="name"
          placeholder="name@example.com"
          autoCapitalize="none"
          autoComplete="name"
          autoCorrect="off"
          disabled={isLoading}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
        {errors?.newName && (
          <p className="px-1 text-xs text-red-600">{errors.newName.message}</p>
        )}
        <Button type="submit" disabled={currentName === name || !currentName}>
          Zaaktualizuj
        </Button>
      </div>
    </form>
  );
};

export default ChangeNameForm;

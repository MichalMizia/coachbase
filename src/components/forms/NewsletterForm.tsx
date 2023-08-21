"use client";

import { FormEvent, useState } from "react";
import Button from "../ui/Button";
import { toast } from "react-hot-toast";
import axios, { AxiosError } from "axios";

interface NewsletterFormProps {}

const NewsletterForm = ({}: NewsletterFormProps) => {
  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await axios.post("/api/newsletter", { email: email });
    } catch (e) {
      if (
        e instanceof AxiosError &&
        e.response?.status?.toString()[0] === "4" &&
        e.response?.data?.message
      ) {
        return toast.error(e.response.data.message);
      }
      return toast.error("Nie udało się zapisać do newslettera");
    } finally {
      setIsLoading(false);
    }

    toast.success("Zapisano email do newslettera");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="my-1 flex w-full flex-col flex-wrap items-stretch justify-stretch"
    >
      <label className="sr-only" htmlFor="email">
        Email
      </label>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        id="email"
        key="email"
        placeholder="Twój email"
        className="w-[200px] rounded-sm bg-white px-3 py-2 text-gray-800 shadow-sm shadow-white/25 outline-none outline-offset-2 placeholder:text-slate-500 focus:shadow-lg focus:outline focus:outline-2 focus:outline-blue-400"
      />
      <Button
        isLoading={isLoading}
        variant="primary"
        className="mt-1 w-[200px] rounded-sm !text-white"
      >
        Zapisz się do Newslettera
      </Button>
    </form>
  );
};

export default NewsletterForm;

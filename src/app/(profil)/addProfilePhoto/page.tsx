"use client";

import Button from "@/components/ui/Button";
import axios from "axios";
import { FormEvent, useRef, useState } from "react";
import { toast } from "react-hot-toast";

interface pageProps {}

const Page = ({}: pageProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    const files = fileInputRef.current?.files;
    if (!files) {
      toast.error("Należy dołączyć plik");
      return;
    }
    if (files?.length !== 1) {
      toast.error("Należy dołączyć maks 1 plik");
      return;
    }

    const file = files[0];
    const formData = new FormData();
    formData.append("image", file);
    console.log(formData);

    try {
      await axios.post("/api/upload-files", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    } catch (e) {
      toast.error("Coś poszło nie tak");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="py-12">
      <div className="container-md">
        <form
          action=""
          className="mx-auto flex w-fit flex-col items-start rounded-sm bg-white p-4 shadow-sm shadow-[#00000030] transition-shadow hover:shadow-md"
          onSubmit={async (e: FormEvent<HTMLFormElement>) => handleSubmit(e)}
        >
          <div className="mb-4">
            <label htmlFor="file" className="sr-only">
              Plik
            </label>
            <input
              multiple={false}
              required
              accept="image/jpeg"
              ref={fileInputRef}
              type="file"
              id="file"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            />
            {/* {errors?.verification?.file && (
              <p className="px-1 text-xs text-red-600">
                {errors.verification?.file.message}
              </p>
            )} */}
          </div>
          <Button isLoading={isLoading} variant="primary_outlined">
            Submit
          </Button>
        </form>
      </div>
    </main>
  );
};

export default Page;

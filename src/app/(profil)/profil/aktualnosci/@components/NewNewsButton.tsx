"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/ui/icons";
import { buttonVariants } from "@/components/ui/Button";
import axios, { AxiosResponse } from "axios";

interface NewNewsButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  id: string;
}

export function NewNewsButton({ className, id, ...props }: NewNewsButtonProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  async function onClick() {
    setIsLoading(true);

    try {
      const res = await axios.post("/api/artykuly", {
        id,
      });
      console.log(res);
      const postId = res?.data.id;

      if (!postId) {
        throw new Error("");
      }
      // This forces a cache invalidation.
      router.refresh();
      toast.success("Utworzono nowy post");
    } catch (e) {
      console.log("here");
      return toast.error("Coś poszło nie tak podczas tworzenia artykułu");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <button
      title="Nowy Artykuł"
      onClick={onClick}
      className={cn(
        buttonVariants(),
        {
          "cursor-not-allowed opacity-60": isLoading,
        },
        className
      )}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Icons.add className="mr-2 h-4 w-4" />
      )}
      Nowy Artykuł
    </button>
  );
}

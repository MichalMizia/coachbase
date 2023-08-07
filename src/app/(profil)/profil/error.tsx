"use client"; // Error components must be Client Components

import PrevRouteBtn from "@/components/PrevRouteBtn";
import Button from "@/components/ui/Button";
import { ChevronLeft } from "lucide-react";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="container-md flex h-[calc(100vh-67px)] flex-col items-center justify-center py-20">
      <h1 className="max-w-lg text-center text-h1 font-semibold leading-tight text-black">
        Pojawił się błąd podczas ładowania profilu
      </h1>
      <p className="mt-4 text-center text-h4 text-text_readable">
        <span className="font-[500]">Błąd:</span> {error.message}
      </p>
      <div className="mt-12 flex justify-center gap-4">
        <PrevRouteBtn variant="outlined" className="text-xl">
          <ChevronLeft className="mr-3 h-6 w-6" />
          Wstecz
        </PrevRouteBtn>
        <Button
          variant="default"
          className="text-xl"
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
        >
          Spróbuj ponownie
        </Button>
      </div>
    </main>
  );
}

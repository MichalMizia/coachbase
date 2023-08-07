"use client"; // Error components must be Client Components

import PrevRouteBtn from "@/components/PrevRouteBtn";
import Button from "@/components/ui/Button";
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
    <main className="container-md flex h-[calc(100vh-67px)] flex-col items-center justify-center gap-4 py-20">
      <h1 className="text-center text-3xl font-semibold text-black">
        Pojawił się błąd podczas ładowania danych trenerów
      </h1>
      <p className="text-center text-lg text-text_readable">{error.message}</p>
      <div className="mt-8 flex items-stretch justify-center gap-4">
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
        <PrevRouteBtn className="text-xl" variant="outlined">
          Powrót
        </PrevRouteBtn>
      </div>
    </main>
  );
}

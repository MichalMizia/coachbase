"use client"; // Error components must be Client Components

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
        Pojawił się błąd podczas wczytywania danych z profilu
      </h1>
      <p className="text-center text-lg text-text_readable">{error.message}</p>
      <Button
        variant="default"
        className="mt-8 text-xl"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Spróbuj ponownie
      </Button>
    </main>
  );
}

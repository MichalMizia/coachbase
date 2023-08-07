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
    <main className="container-md py-20">
      <h1 className="text-center text-4xl font-semibold">Coś poszło nie tak</h1>
      <Button
        variant="default"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Reload
      </Button>
    </main>
  );
}

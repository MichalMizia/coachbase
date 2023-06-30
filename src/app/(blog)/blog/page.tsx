"use client";

import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";

interface pageProps {}

const Page = ({}: pageProps) => {
  const router = useRouter();

  return (
    <main className="py-8">
      <div className="container-md">
        <h1 className="mb-4 text-3xl font-semibold text-black">
          Artykuły{", "}
          <span className="text-lg text-text_readable">Coming soon</span>
        </h1>
        <Button
          onClick={() => router.back()}
          variant="default"
          className="text-xl"
        >
          Go back
        </Button>
      </div>
    </main>
  );
};

export default Page;

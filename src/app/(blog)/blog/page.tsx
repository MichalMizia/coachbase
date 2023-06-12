import Button from "@/components/ui/Button";
import { ArrowUpRightIcon } from "lucide-react";
import Link from "next/link";

interface pageProps {}

const Page = ({}: pageProps) => {
  return (
    <main className="container-md flex h-[70vh] flex-col items-center justify-center gap-8 py-8">
      <h1 className="text-center text-3xl text-black lg:text-5xl">
        Coming soon...
      </h1>
      <Button variant="primary">
        <a href="oferty" className="flex text-lg items-center justify-center gap-1">
          Powrót <ArrowUpRightIcon />
        </a>
      </Button>
    </main>
  );
};

export default Page;

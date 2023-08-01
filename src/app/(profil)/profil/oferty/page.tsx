import Button from "@/components/ui/Button";
import { Separator } from "@/components/ui/separator";
import { PlusCircle } from "lucide-react";

interface PageProps {}

const Page = ({}: PageProps) => {
  return (
    <div className="flex h-full flex-col items-stretch justify-start px-4 py-6 lg:px-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold text-gray-800">Twoje Oferty</h2>
          <p className="text-h6 text-text_readable">
            Zmiany tutaj będą wyświetlane w twojej ofercie.
          </p>
        </div>
        <Button className="">
          <PlusCircle className="mr-2 h-4 w-4" />
          Nowa Oferta
        </Button>
      </div>
      <Separator className="my-4 bg-gray-300" />
    </div>
  );
};

export default Page;

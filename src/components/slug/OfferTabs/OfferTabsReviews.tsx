"use client";

import Button from "@/components/ui/Button";
import { ClipboardCheck, PlusCircleIcon } from "lucide-react";
import { toast } from "react-hot-toast";

interface OfferTabsReviewsProps {}

const OfferTabsReviews = ({}: OfferTabsReviewsProps) => {
  return (
    <div className="mx-auto max-w-3xl">
      <header className="flex items-center justify-between border-b border-gray-300 px-6 py-2">
        <h2 className="text-h3 font-[600]">0 opinii</h2>
        <Button
          variant="primary"
          onClick={() => toast.error("To jeszcze nie działa")}
          className="items-center gap-1"
        >
          <PlusCircleIcon
            size={18}
            className="relative top-[1px] text-gray-200"
          />
          Dodaj opinię
        </Button>
      </header>
      <section className="border-b border-gray-300 px-6 py-4">
        <h4 className="flex w-fit items-center justify-start gap-2 px-1 text-body text-gray-800">
          <ClipboardCheck size={18} className="text-text" />
          Brak Opinii
        </h4>
      </section>
      {/* <section className="border-b border-gray-300 px-6 py-4">
    <h4 className="flex w-fit items-center justify-start gap-2 px-1 text-body text-gray-800">
      <FileText size={18} className="text-text" />
      Zdjęcia
    </h4>
    <main className="max-w-xl px-1 py-3 text-h6">
      {trainerData.heroSection.image}
    </main>
  </section> */}
    </div>
  );
};

export default OfferTabsReviews;

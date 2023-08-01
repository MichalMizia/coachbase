import { BoxesIcon } from "lucide-react";

interface OfferTabsOffersProps {}

const OfferTabsOffers = ({}: OfferTabsOffersProps) => {
  return (
    <div className="mx-auto max-w-3xl">
      <header className="flex items-end justify-between border-b border-gray-300 px-6 py-2">
        <h2 className="text-h3 font-[600]">Oferty</h2>
      </header>
      <section className="border-b border-gray-300 px-6 py-4">
        <main className="max-w-xl px-1 py-3 text-h6">Nothing here yet</main>
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

export default OfferTabsOffers;

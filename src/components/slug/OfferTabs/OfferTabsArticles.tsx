interface OfferTabsArticlesProps {}

const OfferTabsArticles = ({}: OfferTabsArticlesProps) => {
  return (
    <div className="mx-auto max-w-3xl">
      <header className="flex items-end justify-between border-b border-gray-300 px-6 py-2">
        <h2 className="text-h3 font-[600]">Artykuły</h2>
      </header>
      <section className="border-b border-gray-300 px-6 py-4">
        <main className="max-w-xl px-1 py-3 text-h6">Nothing here yet</main>
      </section>
    </div>
  );
};

export default OfferTabsArticles;

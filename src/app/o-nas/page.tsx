interface pageProps {}

const Page = ({}: pageProps) => {
  return (
    <main>
      <section className="container-md flex flex-col py-16 lg:py-24">
        <div className="main-gradient absolute inset-0 -z-10 h-[100dvh] w-[100dvw]"></div>
        <div className="circle-gradient absolute inset-0 -z-[5] h-[100dvh] w-[100dvw]"></div>
        <h1 className="mx-auto max-w-4xl text-center text-3xl font-bold text-black sm:text-5xl xxl:text-6xl">
          Twoje cele, nasza pasja - znajdź idealnego trenera już teraz!
        </h1>
        <p className="relative mx-auto mt-8 sm:text-lg lg:mt-16 lg:max-w-[600px] lg:after:absolute lg:after:-left-5 lg:after:top-[2px] lg:after:h-full lg:after:w-[6px] lg:after:rounded-xl lg:after:bg-secondary xxl:mt-20 ">
          Coach Base pozwala Ci znaleźć idealnego trenera personalnego, który
          dopasuje się do Twoich celów, preferencji i stylu życia. Niezależnie
          od tego, czy chcesz zrzucić zbędne kilogramy, zbudować mięśnie,
          poprawić wydolność czy po prostu zdrowo się odżywiać, mamy dla Ciebie
          odpowiedniego eksperta.
        </p>
      </section>
    </main>
  );
};

export default Page;

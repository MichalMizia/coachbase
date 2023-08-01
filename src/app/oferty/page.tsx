// components
import User, { TrainerType } from "@/model/user";
import SearchBarOffers from "@/components/offers/OffersSearchbar";
// utils
import { getServerSession } from "next-auth";
import initMongoose from "@/lib/db";
// city list
import cities from "@/config/data/search-cities.json";
import { Loader2, LucideUser, SendIcon } from "lucide-react";
import StarsRating from "@/components/custom/StarsRating";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import TrainerData from "@/model/trainerData";
import LatestArticles from "@/components/LatestArticles";
import { Suspense } from "react";
import { tagOptions } from "@/config/global";

export interface mongooseTrainersData extends TrainerType {
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

// const getTrainers = async (): Promise<TrainerType[]> => {
//   await initMongoose();

//   const searchParams = useSearchParams();
//   console.log(searchParams);

//   const trainers: TrainerType[] = await User.find({
//     isTrainer: true,
//     image: new RegExp(".*"),
//   })
//     .limit(10)
//     .sort("-createdAt")
//     .lean()
//     .exec();
//   return trainers;
// };

interface MongooseQuery {
  city?: string;
  tags?: any;
  username?: any;
  isTrainer: true;
}

const getTrainers = async (
  city?: string | null,
  tag?: string | null,
  query?: string | null
): Promise<TrainerType[] | null> => {
  await initMongoose();

  let mongooseQuery: MongooseQuery = { isTrainer: true };
  if (city && city.length) {
    mongooseQuery.city = city;
  }
  if (tag && tag.length) {
    mongooseQuery.tags = { $in: [tag] };
  }
  if (query && query.length) {
    mongooseQuery.username = { $regex: new RegExp(query, "i") };
  }

  console.log(mongooseQuery);
  const trainers: TrainerType[] = await User.find(mongooseQuery)
    .sort("-createdAt")
    .limit(10)
    .lean()
    .exec();

  return trainers || null;
};

const Page = async ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | undefined };
}) => {
  // await new Promise((resolve) => setTimeout(resolve, 1000));
  const session = await getServerSession();

  const city = searchParams?.city?.toString();
  const query = searchParams?.query?.toString();
  const tag = searchParams?.tag?.toString();
  const pageNumber = searchParams?.pageNumber;

  const cityLabel = cities.find(
    (val) => val.value.toLowerCase() === city
  )?.label;
  const tagLabel = tagOptions.find(
    (val) => val.value.toLowerCase() === tag
  )?.label;

  const trainers = await getTrainers(cityLabel, tagLabel, query);

  return (
    // <OffersPage session={session} jsonData={JSON.stringify(trainersData)} />
    // this component is used to get the search params in a client component, then it receives the real offers page as children
    // <SearchParamProvider />
    <main className="text-text_readable">
      <header className="container-md pt-4 lg:pt-0">
        <SearchBarOffers
          defaultCity={city || ""}
          defaultQuery={query || ""}
          defaultTag={tag || ""}
        />
      </header>
      <div className="container-md flex items-start justify-center py-6 md:py-8 lg:py-10">
        <main className="w-full flex-[2]">
          <header>
            <h1
              style={{ fontSize: "var(--size-step-3)" }}
              className="font-bold text-gray-800"
            >
              Oferty{cityLabel && `, ${cityLabel}`}
              {tagLabel && `, ${tagLabel}`}
            </h1>
            <p className="max-w-2xl" style={{ fontSize: "var(--size-step-0)" }}>
              {trainers?.length
                ? "Znajdź specjalistę pasującego do Ciebie!"
                : "Niestety nie mamy tego czego szukasz :("}
            </p>
          </header>
          <ul className="offers-grid mt-4 grid gap-4 md:mt-6 lg:mt-8 lg:gap-3">
            {trainers?.map((trainer) => {
              return (
                <a href={`/oferty/${trainer.slug}`} className="max-w-md">
                  {/* <li className="group relative isolate h-full w-full overflow-hidden rounded-md bg-white p-4 shadow-md transition-all hover:shadow-lg hover:shadow-black/30 sm:p-6">
                    <span className="absolute left-0 top-0 isolate -z-10 h-full w-full -translate-x-3/4 rounded-full bg-blue-600/20" />
                    <header className="flex items-start justify-start gap-4">
                      <div className="relative h-20 w-20 overflow-hidden rounded-full border bg-blue-200 shadow-md sm:h-32 sm:w-32">
                        {trainer.image ? (
                          <img
                            src={trainer.image}
                            alt={`Zdjęcie Profilowe ${trainer.username}`}
                            className="absolute inset-0 h-full w-full scale-105 rounded-full object-cover"
                          />
                        ) : (
                          <LucideUser className="absolute inset-0 m-auto h-[50%] w-1/2 text-gray-700" />
                        )}
                      </div>
                      <div className="mt-4">
                        <ul className="tags flex w-fit flex-wrap items-center justify-start gap-1 md:gap-2">
                          {trainer.roles?.map((role, ind) => (
                            <li
                              className="rounded-sm bg-blue-100 px-2 py-[2px] text-[11px] font-[600] uppercase text-gray-800 md:text-xs md:font-bold md:text-gray-700 lg:text-[10px]"
                              key={ind}
                            >
                              {role}
                            </li>
                          ))}
                        </ul>
                        <h3
                          className="font-semibold text-gray-800"
                          style={{ fontSize: "var(--size-step-1)" }}
                        >
                          {trainer.username}
                        </h3>
                        <StarsRating />
                      </div>
                    </header>
                    <p
                      id="description"
                      className="mt-4 max-w-sm px-2 text-h6 text-gray-700"
                    >
                      {trainer.summary}
                    </p>
                  </li> */}
                  <li className="group relative flex h-full flex-col items-stretch justify-end rounded-md bg-white shadow-sm transition-all hover:shadow-md">
                    {/* <div className="absolute"></div> */}
                    <header className="flex h-[70px] items-center justify-start gap-4 px-4 py-3">
                      <div className="relative flex aspect-square h-10 items-center justify-center overflow-hidden rounded-full border border-violet-300 bg-blue-400 p-1 text-sm font-semibold text-white shadow-lg shadow-[#00000030]">
                        {trainer.avatar ? (
                          <img
                            src={trainer.avatar}
                            alt={`Zdjęcie Profilowe ${trainer.username}`}
                            className="absolute inset-0 h-full w-full object-cover"
                          />
                        ) : (
                          trainer.username
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()
                        )}
                      </div>
                      <div className="">
                        <h4
                          style={{ fontSize: "var(--size-step-0)" }}
                          className="font-[500] text-gray-800"
                        >
                          {trainer.username}
                        </h4>
                        <p className="relative -top-1 text-h6">
                          {trainer.city}
                        </p>
                      </div>
                    </header>
                    {trainer.image ? (
                      <img
                        className="aspect-video h-full w-full flex-1 border-l-2 border-r-2 border-white bg-blue-100 object-cover"
                        src={trainer.image}
                      />
                    ) : (
                      <div className="aspect-video h-full w-full flex-1 border-l-2 border-r-2 border-white bg-blue-100" />
                    )}
                    <main className={cn("flex flex-col justify-between p-4")}>
                      <header>
                        <StarsRating className="mb-1" rating={trainer.rating} />
                        <p
                          id="description"
                          className="arial line-clamp-6 text-h6 text-gray-700"
                        >
                          {trainer.summary}
                        </p>
                      </header>

                      <div className="mt-2 flex items-stretch justify-start gap-4">
                        {/* <Button
                        
                          variant="primary"
                          className="text-h5 tracking-wide text-white"
                        >
                          Oferta
                        </Button> */}
                        <button className="mt-2 flex items-center justify-center gap-1 rounded-sm px-2 py-1 text-sm text-gray-700 ring-1 ring-gray-400 transition-all duration-300 hover:ring-2 hover:ring-gray-600 hover:ring-offset-1 focus:ring-2 focus:ring-gray-600 focus:ring-offset-1 md:gap-2">
                          <SendIcon size={16} className="translate-y-[1px]" />
                          Zobacz ofertę
                        </button>
                      </div>
                    </main>
                  </li>
                </a>
              );
            })}
          </ul>
        </main>
        {/* <aside
          className={cn(
            "absolute -z-10 flex-1 flex-col items-end pb-6 pl-10 opacity-0 lg:relative lg:z-[1] lg:opacity-100",
            trainers?.length ? "pt-2" : "pt-[120px]"
          )}
        >
          <h2
            style={{ fontSize: "var(--size-step-1" }}
            className="w-full text-center font-semibold text-gray-800"
          >
            Najnowsze Artykuły
          </h2>
          <Suspense
            fallback={
              <Loader2 className="mx-auto mt-10 h-12 w-12 animate-spin text-center" />
            }
          >
            <LatestArticles amount={4} />
          </Suspense>
        </aside> */}
      </div>
    </main>
  );
};

export default Page;

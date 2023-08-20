// components
import User, { TrainerType } from "@/model/user";
import SearchBarOffers from "@/components/landing/OffersSearchbar";
import { SendIcon } from "lucide-react";
// import LatestArticles from "@/components/LatestArticles";
// import { Suspense } from "react";
// utils
import initMongoose from "@/lib/db";
import { cn } from "@/lib/utils";
// city list
import cities from "@/config/data/search-cities.json";
// config
import { tagOptions } from "@/config/global";
import { Metadata } from "next";
import Link from "next/link";

export interface mongooseTrainersData extends TrainerType {
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

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
  await new Promise((resolve) => setTimeout(resolve, 4000));

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
                <Link
                  key={trainer._id}
                  href={`/oferty/${trainer.slug}`}
                  rel="dofollow"
                  hrefLang="pl"
                  className="max-w-md"
                >
                  <li className="group relative flex h-full flex-col items-stretch justify-end rounded-md bg-white shadow-sm transition-all hover:shadow-md">
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
                        {/* <StarsRating className="mb-1" rating={trainerD.rating} /> */}
                        <p
                          id="description"
                          className="arial line-clamp-6 text-h6 text-gray-700"
                        >
                          {trainer.summary}
                        </p>
                      </header>

                      <div className="mt-2 flex items-stretch justify-start gap-4">
                        <button className="mt-2 flex items-center justify-center gap-1 rounded-sm px-2 py-1 text-sm text-gray-700 ring-1 ring-gray-400 transition-all duration-300 hover:ring-2 hover:ring-gray-600 hover:ring-offset-1 focus:ring-2 focus:ring-gray-600 focus:ring-offset-1 md:gap-2">
                          <SendIcon size={16} className="translate-y-[1px]" />
                          Zobacz ofertę
                        </button>
                      </div>
                    </main>
                  </li>
                </Link>
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

// page metadata
export async function generateMetadata({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | undefined };
}) {
  const city = searchParams?.city?.toString();
  const tag = searchParams?.tag?.toString();

  let keywords: string[] = [
    "Trener",
    "Dietetyk",
    "Fizjoterapeuta",
    "Ekspert",
    "Usługi",
    "Oferty",
    "Trening personalny",
    "Instruktor fitness",
    "Siłownia",
    "Sport",
    "CoachBase",
    "CoachBase Oferty",
  ];
  let title = "Oferty - Coachbase";
  let description = `Lista ofert trenerów personalnych, dietetyków i fizjoterapeutów, osiągnij z nimi swój cel`;

  if (city && tag) {
    title = `Oferty, ${city}, ${tag} - Coachbase`;
    description = description.concat(`w mieście ${city}`);
    keywords = keywords.concat([city, tag]);
  } else if (city) {
    title = `Oferty, ${city} - Coachbase`;
    keywords = keywords.concat(city);
    description = description.concat(`w mieście ${city}`);
  } else if (tag) {
    title = `Oferty, ${tag} - Coachbase`;
    keywords = keywords.concat(tag);
  }

  // const metadata: Metadata =
  return {
    title: title,
    description: description,
    keywords: keywords,
  };
}

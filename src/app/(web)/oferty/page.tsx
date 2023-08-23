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
import OfferCard from "./@components/OfferCard";

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
            {trainers?.map((trainer) => (
              <OfferCard
                key={trainer._id}
                id={trainer._id}
                summary={trainer.summary}
                username={trainer.username}
                slug={trainer.slug}
                avatar={trainer.avatar}
                image={trainer.image}
                city={trainer.city}
              />
            ))}
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

// // page metadata
// export async function generateMetadata({
//   params,
//   searchParams,
// }: {
//   params: { slug: string };
//   searchParams?: { [key: string]: string | undefined };
// }) {
//   const city = searchParams?.city?.toString();
//   const tag = searchParams?.tag?.toString();

//   let keywords: string[] = [
//     "Trener",
//     "Dietetyk",
//     "Fizjoterapeuta",
//     "Ekspert",
//     "Usługi",
//     "Oferty",
//     "Trening personalny",
//     "Instruktor fitness",
//     "Siłownia",
//     "Sport",
//     "CoachBase",
//     "CoachBase Oferty",
//   ];
//   let title = "Oferty - Coachbase";
//   let description = `Lista ofert trenerów personalnych, dietetyków i fizjoterapeutów, osiągnij z nimi swój cel`;

//   if (city && tag) {
//     title = `Oferty, ${city}, ${tag} - Coachbase`;
//     description = description.concat(`w mieście ${city}`);
//     keywords = keywords.concat([city, tag]);
//   } else if (city) {
//     title = `Oferty, ${city} - Coachbase`;
//     keywords = keywords.concat(city);
//     description = description.concat(`w mieście ${city}`);
//   } else if (tag) {
//     title = `Oferty, ${tag} - Coachbase`;
//     keywords = keywords.concat(tag);
//   }

//   // const metadata: Metadata =
//   return {
//     title: title,
//     description: description,
//     keywords: keywords,
//   };
// }

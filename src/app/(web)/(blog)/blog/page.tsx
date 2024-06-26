// utils
import initMongoose from "@/lib/db";
import { cn, formatDate } from "@/lib/utils";
// types
import Article, { ArticleType, PopulatedArticleType } from "@/model/article";
// assets
import Image from "next/image";
import Link from "next/link";
import AvatarSvg from "@/../public/assets/avatar.svg";
import { Metadata } from "next";

interface pageProps {}

const getData = async (
  username?: string | null,
  tag?: string | null
): Promise<PopulatedArticleType[] | null> => {
  await initMongoose();

  let mongooseQuery = {
    published: true,
    slug: new RegExp(".*"),
  };
  // if (username && username.length) {
  //   mongooseQuery.city = city;
  // }
  // if (tag && tag.length) {
  //   mongooseQuery.tags = { $in: [tag] };
  // }

  const articles: PopulatedArticleType[] = await Article.find(mongooseQuery)
    .sort("-createdAt")
    .populate("userId")
    .limit(10)
    .lean()
    .exec();

  return articles || null;
};

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | undefined };
}) {
  // const city = searchParams?.city?.toString();
  // const tag = searchParams?.tag?.toString();

  let keywords = [
    "Trening",
    "Dietetyka",
    "Fizjoterapia",
    "Zdrowy styl życia",
    "Ćwiczenia fizyczne",
    "Odżywianie",
    "Rehabilitacja",
    "Fitness",
    "Rozciąganie",
    "Plan treningowy",
    "Dieta",
    "Ruch",
    "Zdrowe nawyki",
    "Regeneracja",
    "Trener osobisty",
    "Ból pleców",
    "Aktywność fizyczna",
    "Joga",
    "Zdrowe odchudzanie",
    "Urazy sportowe",
    "Blog",
    "Artykuły",
    "Artykuły treningowe",
    "Artykuły dietetyczne",
    "CoachBase",
    "CoachBase Artykuły",
    "CoachBase",
  ];
  // let title = "Oferty - Coachbase";
  // let description = `Lista ofert trenerów personalnych, dietetyków i fizjoterapeutów, osiągnij z nimi swój cel`;

  // if (city && tag) {
  //   title = `Oferty, ${city}, ${tag} - Coachbase`;
  //   description = description.concat(`w mieście ${city}`);
  //   keywords = keywords.concat([city, tag]);
  // } else if (city) {
  //   title = `Oferty, ${city} - Coachbase`;
  //   keywords = keywords.concat(city);
  //   description = description.concat(`w mieście ${city}`);
  // } else if (tag) {
  //   title = `Oferty, ${tag} - Coachbase`;
  //   keywords = keywords.concat(tag);
  // }

  const metadata: Metadata = {
    title: "Artykuły - CoachBase",
    description:
      "Odkryj cenne porady dotyczące treningu, zdrowego odżywiania i fizjoterapii na blogu CoachBase. Artykuły o ćwiczeniach, dietach i rehabilitacji napisane przez ekspertów zarejestrowanych na CoachBase czekają na Ciebie.",
    keywords: keywords,
  };
  return metadata;
}

const Page = async ({}: pageProps) => {
  const articles = await getData();

  return (
    <main className="text-text_readable">
      {/* <header className="container-md pt-4 lg:pt-0">
        <SearchBarOffers
          defaultCity={city || ""}
          defaultQuery={query || ""}
          defaultTag={tag || ""}
        />
      </header> */}
      <div className="container-md flex min-h-[calc(100vh-66px)] items-start justify-center py-6 md:py-8 lg:py-10">
        <main className="w-full flex-[2]">
          <header>
            <h1
              style={{ fontSize: "var(--size-step-3)" }}
              className="font-bold text-gray-800"
            >
              Artykuły
            </h1>
            <p className="max-w-2xl" style={{ fontSize: "var(--size-step-0)" }}>
              Korzystaj z wiedzy zbieranej przez naszych specjalistów.
            </p>
          </header>
          {articles?.length ? (
            <ul className="offers-grid mt-4 grid gap-4 md:mt-6 lg:mt-8 lg:gap-3">
              {articles?.map((article) => {
                return (
                  <li
                    key={article._id}
                    className="group relative flex h-full max-w-md flex-col items-stretch justify-stretch rounded-md bg-white shadow-sm transition-all hover:shadow-md"
                  >
                    <Link
                      key={article._id}
                      href={`/blog/${article.slug}`}
                      className="flex flex-col items-stretch justify-end"
                    >
                      <header className="flex items-center justify-start gap-2 px-4 py-2">
                        <div className="relative aspect-square h-[54px] w-[54px] max-w-[54px] flex-1 rounded-full shadow-md shadow-black/20">
                          <Image
                            fill
                            className="aspect-square rounded-full object-cover"
                            src={article.userId?.avatar || AvatarSvg}
                            alt={`Avatar ${
                              article.userId?.username || article.title
                            }`}
                          />
                        </div>

                        <div className="flex flex-col items-start justify-center">
                          <h4
                            style={{ fontSize: "var(--size-step-0)" }}
                            className="font-[500] text-gray-800"
                          >
                            {article.title}
                          </h4>
                          <Link
                            href={`/oferty/${article.slug}`}
                            title={`Oferta ${article.userId?.username}`}
                            className="relative -top-1 text-h6 decoration-current decoration-1 underline-offset-2 transition-all hover:underline"
                          >
                            {article.userId?.username}
                          </Link>
                        </div>
                      </header>
                      {article.photoUrl ? (
                        <div className="relative aspect-video h-full w-full">
                          <Image
                            fill
                            className="aspect-video flex-1 border-l-2 border-r-2 border-white bg-blue-100 object-cover"
                            src={article.photoUrl}
                            alt={
                              article.photoAlt ||
                              `Miniatura artykułu o tytule - ${article.title}`
                            }
                          />
                        </div>
                      ) : (
                        <div className="aspect-video h-full w-full flex-1 border-l-2 border-r-2 border-white bg-blue-100" />
                      )}
                      <main className={cn("flex flex-col justify-between p-4")}>
                        {/* <StarsRating className="mb-1" rating={articleD.rating} /> */}
                        <span className="mb-0.5 text-sm">
                          {formatDate(article.createdAt)}
                        </span>
                        <p
                          id="description"
                          className="arial line-clamp-6 text-h6 text-gray-700"
                        >
                          {article.summary}{" "}
                          <span className="text-text_readable">
                            Czytaj dalej...
                          </span>
                        </p>
                      </main>
                    </Link>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="h-20 w-full bg-white">
              <p className="text-xl text-gray-800">
                Niestety nie mamy tego czego szukasz :(
              </p>
            </div>
          )}
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

// components
import StarsRating from "@/components/custom/StarsRating";
import SocialMediaDisplay from "@/components/custom/SocialMediaDisplay";
import OfferHeaderNav from "@/app/(web)/oferty/[slug]/@components/OfferHeaderNav";
import OfferTabs from "@/app/(web)/oferty/[slug]/@components/OfferTabs";
import { Separator } from "@/components/ui/separator";
import { Info, Loader2, Loader2Icon, LucideUser } from "lucide-react";
import LatestUserArticles from "./@components/LatestUserArticles";
import AvatarSvg from "@/../public/assets/avatar.svg";
// utils
import { Suspense } from "react";
import TrainerData, { PopulatedTrainerDataType } from "@/model/trainerData";
import initMongoose from "@/lib/db";
import { Tabs } from "@/components/ui/tabs";
import Image from "next/image";
import ImagePlaceholder from "@/../public/assets/image-placeholder.jpg";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";
import Link from "next/link";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Metadata } from "next";
import { sanitize } from "isomorphic-dompurify";

interface pageProps {
  params: {
    slug: string;
  };
}

const getData = async (
  slug: string
): Promise<PopulatedTrainerDataType | null> => {
  await initMongoose();

  const trainerData: PopulatedTrainerDataType | null =
    await TrainerData.findOne({ userSlug: slug })
      .populate("userId")
      .lean()
      .exec();

  return trainerData;
};

// trainer metadata
export async function generateMetadata({ params }: pageProps) {
  const { slug } = params;
  const trainerData = await getData(slug);
  const trainer = trainerData?.userId;

  let keywords: string[] = [
    "Profil biznesowy",
    "Trener",
    "Dietetyka",
    "Ekspert",
    "Usługi",
    "Oferta",
    "Trening personalny",
    "Instruktor fitness",
    "Siłownia",
    "Sport",
    "Blog",
    "Artykuły",
  ];
  if (trainer?.tags) {
    keywords = keywords.concat(trainer.tags);
  }
  if (trainer?.username) {
    keywords = keywords.concat(trainer.username);
  }
  if (trainer?.city) {
    keywords = keywords.concat(trainer.city);
  }

  const metadata: Metadata = {
    title: `Profil Biznesowy - ${trainer?.username}`,
    description:
      trainer?.summary && trainer.summary.length > 150
        ? trainer?.summary.concat(` Miasto: ${trainer?.city}`)
        : `${trainer?.username} to ${trainer?.roles.join(
            ", "
          )} oferujący swoje usługi w mieście ${
            trainer?.city
          }, oto co ma do powiedzenia o sobie. ${trainer?.summary}`,
    keywords: keywords,
  };
  return metadata;
}

const Page = async ({ params }: pageProps) => {
  const { slug } = params;

  const trainerData = await getData(slug);
  const trainer = trainerData?.userId;
  if (!trainer) {
    throw new Error("Nie ma takiego konta");
  }

  const session = await getServerSession(authOptions);

  return (
    <main className="profile-gradient relative min-h-screen bg-white bg-gradient-to-b text-gray-800">
      <section className="container-md flex max-w-6xl items-start justify-center gap-4 py-4 lg:gap-8 lg:py-6">
        <div className="relative flex max-w-3xl flex-[2] flex-col items-stretch justify-start">
          <Tabs defaultValue="Oferty">
            <header className="max-w-full rounded-sm bg-white pb-0 shadow-md shadow-black/25 outline outline-1 outline-black/5 md:p-6 md:pb-0">
              <div className="mx-auto flex flex-col justify-around gap-4 md:flex-row md:gap-8">
                <div className="relative flex aspect-video max-h-[30vh] flex-[0.5] items-center justify-center rounded-md md:self-stretch">
                  <Image
                    alt={`Zdjęcie profilowe ${trainer.username}`}
                    src={trainer.image || ImagePlaceholder}
                    fill
                    priority
                    className="h-full w-full rounded-md object-cover shadow-md shadow-black/20"
                  />
                </div>

                <section className="mx-auto flex max-w-lg flex-1 flex-col items-start justify-between px-6 md:px-0">
                  <div className="flex h-full flex-col items-stretch justify-start ">
                    <div className="relative flex items-center justify-start gap-2 md:-left-16 md:w-[calc(100%+64px)]">
                      <div className="relative aspect-square h-14 w-14 rounded-full border border-black/10 shadow-md">
                        <Image
                          fill
                          className="aspect-square rounded-full object-cover"
                          alt={`Avatar ${trainer.username}`}
                          src={trainer.avatar || AvatarSvg}
                        />
                      </div>
                      <header className="relative -top-0.5 flex w-full flex-wrap items-center justify-between gap-x-6 self-stretch lg:gap-8">
                        <div className="flex flex-col items-start justify-center">
                          <h3 className="relative top-0.5 text-h4 font-[600] text-black">
                            {trainer.username}
                          </h3>
                          <div className="relative flex flex-wrap items-center justify-start gap-x-3 leading-tight md:-top-0.5">
                            <p className="font-[500] italic">{trainer.city}</p>
                            {/* <div className="relative top-[1px] h-1.5 w-1.5 rounded-full bg-gray-800 opacity-75"></div> */}
                            <HoverCard>
                              <HoverCardTrigger asChild>
                                <div className="cursor-pointer">
                                  <Info className=" mr-0.5 inline h-4 w-4 -translate-y-[1px] text-orange-600/90" />
                                  {trainer.roles.join(", ")}
                                </div>
                              </HoverCardTrigger>
                              <HoverCardContent className="w-64 border-none bg-black/75 text-white outline-none">
                                <div className="flex justify-between space-x-4">
                                  <div className="space-y-1">
                                    Ten{" "}
                                    {trainer.roles
                                      .join(", ")
                                      .toLowerCase()
                                      .concat(
                                        " został zweryfikowany przez firmę CoachBase jako godny zaufania"
                                      )}
                                  </div>
                                </div>
                              </HoverCardContent>
                            </HoverCard>
                          </div>
                        </div>
                      </header>
                    </div>

                    <ul className="flex flex-wrap items-end justify-start gap-1 pt-2">
                      {trainer.tags &&
                        trainer.tags.map((tag, ind) => {
                          // @ts-expect-error
                          if (trainer.roles.includes(tag)) {
                            return null;
                          }
                          return (
                            <li
                              className="w-max rounded-sm bg-blue-100 px-2 py-[2px] text-[11px] font-[500] uppercase"
                              key={ind}
                            >
                              {tag}
                            </li>
                          );
                        })}
                    </ul>
                    <div className="mt-1 flex items-center justify-start gap-2">
                      <StarsRating
                        className="relative -left-1 w-fit"
                        rating={trainer.rating}
                        amount={trainerData.reviews.length}
                      />
                      <SocialMediaDisplay
                        instagram={trainerData.socialMedia?.instagram}
                        facebook={trainerData.socialMedia?.facebook}
                        email={trainerData.socialMedia?.email}
                      />
                    </div>
                    <main className="mt-3 text-h6 text-gray-700 lg:top-0">
                      {trainer.summary}{" "}
                      <Link
                        href="#o-mnie"
                        className="text-text_readable underline decoration-current decoration-1 transition-all hover:opacity-80"
                      >
                        Zobacz więcej...
                      </Link>
                    </main>
                  </div>

                  {/* <footer className="mt-2 flex items-end justify-center gap-1">
                  <Button variant="primary" className="gap-1" size="small">
                    Zapisz
                    <Heart size={18} />
                  </Button>
                </footer> */}
                </section>
              </div>
              {/* <ul className="relative top-3 mt-2 flex flex-wrap items-end justify-start gap-1">
                {trainer.tags &&
                  trainer.tags.map((tag, ind) => {
                    // @ts-expect-error
                    if (trainer.roles.includes(tag)) {
                      return null;
                    }
                    return (
                      <li
                        className="w-max rounded-sm bg-blue-100 px-2 py-[2px] text-[11px] font-[500] uppercase"
                        key={ind}
                      >
                        {tag}
                      </li>
                    );
                  })}
              </ul> */}
              <OfferHeaderNav shouldShowFaq={trainerData.faq.length > 0} />
            </header>

            <OfferTabs session={session} trainerData={trainerData} />
          </Tabs>
        </div>

        <aside className="hidden min-h-[400px] flex-1 self-stretch rounded-sm bg-white p-3 px-4 shadow-md shadow-black/25 outline outline-1 outline-black/5 lg:block">
          <div className="flex items-center justify-between">
            <div className="">
              <h2 className="text-h3 font-semibold text-gray-800">Artykuły</h2>
              <Suspense
                fallback={
                  <Loader2 className="mx-auto mt-10 h-12 w-12 animate-spin text-center" />
                }
              >
                <LatestUserArticles
                  userId={trainer._id}
                  username={trainer.username}
                />
              </Suspense>
            </div>
          </div>
          <Separator className="my-4 bg-gray-300" />
        </aside>
      </section>

      {/* <div className="relative mx-auto max-w-[1280px] lg:w-[90%] xl:w-[85%]">
        <section
          id="hero"
          className="flex flex-col items-stretch justify-center pb-12 pt-2 lg:flex-row lg:gap-10 lg:pb-24 lg:pt-16"
        >
          <div className="relative mx-auto flex aspect-video w-screen flex-1 items-center justify-center rounded border-gray-400 bg-bg shadow shadow-[#00000030] lg:aspect-auto lg:min-h-[400px] lg:w-auto lg:p-2">
            {trainer.image ? (
              <img
                src={trainer.image}
                alt={`Zdjęcie profilowe ${trainer.username}`}
                className="absolute inset-0  h-full w-full object-cover lg:static lg:rounded"
              />
            ) : (
              <LucideUser size={60} className="my-10" />
            )}
          </div>
          <div className="mx-auto flex w-[92%] flex-1 flex-col items-start justify-start border-y-2 py-4 lg:w-full lg:border-secondary_custom lg:px-2">
            <header className="flex w-full flex-col items-start justify-between xl:flex-row xl:items-center">
              <div className="flex items-end justify-center gap-1 md:gap-2">
                <h2 className="text-xl font-semibold text-black md:text-3xl">
                  {trainer.username}
                  {","}
                </h2>
                <p className="text-md font-serif md:text-xl">{trainer.city}</p>
              </div>
              <SocialMediaDisplay
                className="relative -left-2 -top-1 xl:left-0"
                instagram={trainerData.socialMedia?.instagram}
                facebook={trainerData.socialMedia?.facebook}
                email={trainerData.socialMedia?.email}
              />
            </header>

            <main className="md:mt-1 xl:mt-4">
              <div
                className="article"
                dangerouslySetInnerHTML={{
                  __html: sanitize(trainerData.heroSection.content),
                }}
              ></div>
            </main>
          </div>
        </section>
      </div> */}
      {/* {true && (
        <section
          id="offers"
          className="relative bg-slate-900 bg-gradient-to-br from-black via-slate-900 to-slate-800 pb-9 pt-8 text-gray-100 shadow-lg shadow-[#00000030] lg:pb-11 lg:pt-10"
        >
          <h2 className="mx-auto mb-8 text-center text-3xl font-semibold text-white lg:mb-10 lg:text-5xl">
            Oferty
          </h2>
          <ul className="container-md relative flex flex-wrap items-center justify-around gap-4 lg:gap-8">
            <li className="relative flex max-w-xl flex-col items-center justify-center rounded-lg bg-[#ffffff20] px-4 py-8 shadow-lg shadow-[#00000050] after:absolute after:right-3 after:top-3 after:h-4 after:w-4 after:rounded-full after:bg-[#ffffff50]">
              <header className="flex flex-col items-center justify-center gap-2 xs:flex-row">
                <Calendar size={30} />
                <h4 className="text-lg font-semibold text-white lg:text-xl">
                  Prowadzenie miesięczne online
                </h4>
              </header>
              <div className="mb-6 mt-4 text-xl lg:text-2xl">
                <span className="mr-0.5 scale-[0.96] text-indigo-200">PLN</span>
                <span className="font-[500] tracking-wide text-white">100</span>
                <span className="relative top-1 text-4xl">/</span>
                <span className="relative top-0.5 text-sm uppercase">
                  miesiąc
                </span>
              </div>
              <p className="max-w-md px-1 text-center xs:px-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptates voluptate sapiente nobis voluptatem ad ullam ab fugit
                sed dolore ipsum?
              </p>
            </li>
          </ul>
        </section>
      )} */}
      <section
        id="o-mnie"
        className="relative isolate mt-4 border-t border-black/5 shadow-inner"
      >
        <div className="main-gradient absolute inset-0 -z-10 h-full w-full bg-white"></div>
        <div className="container-md flex max-w-6xl items-start justify-center gap-4 pb-4 pt-8 lg:gap-8 lg:pb-6">
          <div className="max-w-3xl flex-[2] border-r-2 pr-2">
            {trainerData.content?.length ? (
              <article
                className="small-article flow mx-auto"
                dangerouslySetInnerHTML={{
                  __html: sanitize(trainerData.content),
                }}
              ></article>
            ) : (
              <header>
                <h2 className="text-h4 font-semibold text-gray-800">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-badge-info mr-2 inline -translate-y-[2px]"
                  >
                    <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                    <line x1="12" x2="12" y1="16" y2="12" />
                    <line x1="12" x2="12.01" y1="8" y2="8" />
                  </svg>
                  O mnie
                </h2>
                <p className="max-w-md text-sm text-text_readable sm:text-h6">
                  {!trainerData.content?.length &&
                    "Ten trener nie dodał jeszcze sekcji o sobie"}
                </p>
              </header>
            )}
          </div>
          <div className="hidden flex-1 lg:flex"></div>
        </div>
      </section>
    </main>
  );
};

export default Page;

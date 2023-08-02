import StarsRating from "@/components/custom/StarsRating";
import SocialMediaDisplay from "@/components/profile/SocialMediaDisplay";
import OfferHeaderNav from "@/components/slug/OfferHeaderNav";
import OfferMainSection from "@/components/slug/OfferTabs/OfferTabs";
import Button from "@/components/ui/Button";
import { Separator } from "@/components/ui/separator";
import { fetchTrainer } from "@/lib/fetching/fetchTrainer";
import { fetchTrainerData } from "@/lib/fetching/fetchTrainerData";
import { TrainerDataType } from "@/model/trainerData";
import User, { TrainerType } from "@/model/user";
import { sanitize } from "isomorphic-dompurify";
import {
  Calendar,
  Heart,
  Loader2,
  Loader2Icon,
  LucideUser,
} from "lucide-react";
import { Suspense } from "react";
import LatestUserArticles from "./@components/LatestUserArticles";

// export async function generateStaticParams() {
//   const trainers: TrainerType[] = await fetchAllTrainers();

//   return trainers.map((trainer) => trainer.slug);
// }

interface pageProps {
  params: {
    slug: string;
  };
}

const Page = async ({ params }: pageProps) => {
  const { slug } = params;
  const trainerPromise: Promise<TrainerType> = fetchTrainer(slug);
  const trainerDataPromise: Promise<TrainerDataType> = fetchTrainerData(slug);
  const [trainer, trainerData] = await Promise.all([
    trainerPromise,
    trainerDataPromise,
  ]);

  return (
    <main className="profile-gradient relative min-h-screen bg-white bg-gradient-to-b text-gray-800">
      <section className="container-md flex max-w-6xl items-start justify-center gap-4 py-4 lg:gap-8 lg:py-6">
        <div className="relative flex max-w-3xl flex-[2] flex-col items-stretch justify-start">
          <header className="max-w-full rounded-sm bg-white p-6 pb-0 shadow-md shadow-black/25 outline outline-1 outline-black/5">
            <div className="mx-auto flex justify-around gap-4">
              <section className="relative isolate h-36 w-36 rounded-sm bg-slate-100 lg:h-40 lg:w-40 xl:h-44 xl:w-44">
                {trainer.image ? (
                  <>
                    <Loader2Icon
                      size={28}
                      className="absolute inset-0 -z-10 m-auto animate-pulse animate-timed-spin text-gray-700"
                    />
                    <img
                      src={trainer.image}
                      alt={`Zdjęcie profilowe ${trainer.username}`}
                      className="aspect-square h-full w-full rounded-sm object-cover shadow-sm"
                      loading="lazy"
                    />
                  </>
                ) : (
                  <LucideUser size={60} className="my-10" />
                )}
              </section>

              <section className="flex max-w-md flex-1 flex-col items-start justify-between">
                <div className="flex h-full flex-col items-stretch justify-start">
                  <header className="relative -top-0.5 flex w-full flex-wrap items-center justify-between gap-x-6 self-stretch lg:gap-8">
                    <h3 className="text-h4 font-[600] text-black">
                      {trainer.username}
                    </h3>
                    <div className="flex items-center justify-center gap-2">
                      <SocialMediaDisplay
                        instagram={trainerData.socialMedia?.instagram}
                        facebook={trainerData.socialMedia?.facebook}
                        email={trainerData.socialMedia?.email}
                      />
                    </div>
                  </header>
                  <ul className="hidden flex-wrap items-end justify-start gap-1 md:flex">
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
                  <main className="mt-3 md:mt-0.5 lg:mt-1">
                    <div className="flex flex-wrap items-center justify-start gap-2">
                      <p className="font-[500] italic">{trainer.city}</p>
                      <div className="relative top-[1px] h-1.5 w-1.5 rounded-full bg-gray-800 opacity-75"></div>
                      <ul>
                        {trainer.roles.map((role, ind) => (
                          <>
                            <li>
                              {role}
                              {ind === trainer.roles.length - 1 ? "" : ", "}
                            </li>
                          </>
                        ))}
                      </ul>
                    </div>
                    <StarsRating className="mt-1" />
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
            <ul className="relative top-3 mt-2 flex flex-wrap items-end justify-start gap-1 md:hidden">
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
            <OfferHeaderNav />
          </header>

          <OfferMainSection trainer={trainer} trainerData={trainerData} />
        </div>

        <aside className="hidden min-h-screen flex-1 rounded-sm bg-white p-3 px-4 shadow-md shadow-black/25 outline outline-1 outline-black/5 lg:block">
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
    </main>
  );
};

export default Page;

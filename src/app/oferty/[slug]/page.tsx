import SocialMediaDisplay from "@/components/profile/SocialMediaDisplay";
import { fetchTrainer } from "@/lib/fetching/fetchTrainer";
import { fetchTrainerData } from "@/lib/fetching/fetchTrainerData";
import { fetchAllTrainers } from "@/lib/fetching/fetchTrainers";
import { TrainerDataType } from "@/model/trainerData";
import User, { TrainerType } from "@/model/user";
import { LucideUser } from "lucide-react";

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
    <main className="min-h-screen bg-white py-2 text-text_readable lg:py-12">
      {/* <SocialMediaDisplay
        className="absolute left-2 top-[67px]"
        instagram="x"
        facebook="x"
        email="x"
        // instagram={trainerData.socialMedia?.instagram}
        // facebook={trainerData.socialMedia?.facebook}
        // email={trainerData.socialMedia?.email}
      /> */}

      <div className="relative mx-auto max-w-[1280px] lg:w-[90%] xl:w-[85%]">
        <section
          id="hero"
          className="flex flex-col items-stretch justify-center lg:flex-row lg:gap-10"
        >
          <div className="relative mx-auto flex aspect-video w-screen flex-1 items-center justify-center rounded border-gray-400 bg-primary shadow shadow-[#00000030] lg:aspect-auto lg:min-h-[400px] lg:w-auto lg:p-2">
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
          <div className="mx-auto flex w-[92%] flex-1 flex-col items-start justify-start border-y-2 py-4 lg:w-full lg:border-secondary lg:px-2">
            <header className="flex w-full flex-col items-start justify-between xl:flex-row xl:items-center">
              <div className="flex items-end justify-center gap-1 md:gap-2">
                <h2 className="text-xl font-semibold text-black md:text-3xl">
                  {trainer.username}
                  {","}
                </h2>
                {/* <span className="mt-0.5 h-2 w-2 rounded-full bg-black" /> */}
                <p className="text-md font-serif md:text-xl">{trainer.city}</p>
              </div>
              <SocialMediaDisplay
                className="relative -left-2 -top-1 xl:left-0"
                instagram="x"
                facebook="x"
                email="x"
              />
            </header>

            <main className="md:mt-1 xl:mt-4">
              <p className="max-w-lg md:text-lg">
                {trainerData.heroSection.content}
              </p>
            </main>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Page;

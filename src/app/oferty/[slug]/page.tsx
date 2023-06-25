import { fetchTrainer } from "@/lib/fetching/fetchTrainer";
import { fetchTrainerData } from "@/lib/fetching/fetchTrainerData";
import { fetchAllTrainers } from "@/lib/fetching/fetchTrainers";
import { TrainerDataType } from "@/model/trainerData";
import User, { TrainerType } from "@/model/user";

export async function generateStaticParams() {
  const trainers: TrainerType[] = await fetchAllTrainers();

  return trainers.map((trainer) => trainer.slug);
}

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
    <main className="container-md py-10">
      <section id="hero" className="flex items-center justify-center py-20">
        {trainer.image ? (
          <img
            src={trainer.image}
            alt={`Zdjęcie profilowe ${trainer.username}`}
          />
        ) : null}
      </section>
    </main>
  );
};

export default Page;

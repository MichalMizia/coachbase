import { fetchTrainer } from "@/lib/fetching/fetchTrainer";
import { fetchAllTrainers } from "@/lib/fetching/fetchTrainers";
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

const getTrainerData = (slug: string) => {};

const Page = async ({ params }: pageProps) => {
  const { slug } = params;
  // @ts-expect-error
  const trainer: TrainerType = await fetchTrainer(slug);
  // const trainerData: TrainerDataType = await getTrainerData(slug)

  return (
    <main>
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

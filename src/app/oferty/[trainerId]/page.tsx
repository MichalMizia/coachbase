import User, { TrainerType } from "@/model/user";

export async function generateStaticParams() {
  const trainers: TrainerType[] = await User.find({
    isTrainer: true,
  }).exec();

  return trainers.map((trainer) => ({
    slug: trainer.slug,
  }));
}

interface pageProps {
  params: {
    slug: string;
  };
}

const getTrainerData = (slug: string) => {};

const page = ({ params }: pageProps) => {
  const { slug } = params;
  // const trainerData: TrainerDataType = await getTrainerData(slug)

  return <div>Slug: {slug}</div>;
};

export default page;

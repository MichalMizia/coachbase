import User, { TrainerType } from "@/model/user";
import { getServerSession } from "next-auth";
import OffersPage from "@/components/landing/OffersPage";
import initMongoose from "@/lib/db";

interface pageProps {}

export interface mongooseTrainersData extends TrainerType {
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

const getTrainers = async (): Promise<TrainerType[]> => {
  await initMongoose();

  const trainers: TrainerType[] = await User.find({
    isTrainer: true,
    image: new RegExp(".*"),
  })
    .limit(10)
    .sort("-createdAt")
    .lean()
    .exec();
  return trainers;
};

const Page = async ({}: pageProps) => {
  // await new Promise((resolve) => setTimeout(resolve, 1000));
  const trainersData: TrainerType[] = await getTrainers();
  const session = await getServerSession();

  return (
    <OffersPage session={session} jsonData={JSON.stringify(trainersData)} />
  );
};

export default Page;

import { fetchAllTrainers } from "@/lib/fetching/fetchTrainers";
import { TrainerType } from "@/model/user";
import { getServerSession } from "next-auth";
import OffersPage from "./OffersPage";

interface pageProps {}

export interface mongooseTrainersData extends TrainerType {
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

const Page = async ({}: pageProps) => {
  // await new Promise((resolve) => setTimeout(resolve, 1000));
  const trainersData: TrainerType[] = await fetchAllTrainers();
  const session = await getServerSession();

  // const serializedTrainersData: TrainerType[] = trainersData.map((trainer) => {
  //   const { __v, createdAt, updatedAt, ...newTrainer } = trainer;
  //   return newTrainer;
  // });
  // console.log(serializedTrainersData);

  return (
    <OffersPage session={session} jsonData={JSON.stringify(trainersData)} />
  );
};

export default Page;

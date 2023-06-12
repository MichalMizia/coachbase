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
  const trainersData: TrainerType[] = await fetchAllTrainers();
  // const serializedTrainersData: TrainerType[] = trainersData.map((trainer) => {
  //   const { __v, createdAt, updatedAt, ...newTrainer } = trainer;
  //   return newTrainer;
  // });
  const session = await getServerSession();
  // console.log(serializedTrainersData);

  return (
    <OffersPage session={session} jsonData={JSON.stringify(trainersData)} />
  );
};

export default Page;

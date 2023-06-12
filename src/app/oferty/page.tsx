import { fetchAllTrainers } from "@/lib/fetching/fetchTrainers";
import { TrainerType } from "@/model/user";
import { getServerSession } from "next-auth";
import OffersPage from "./OffersPage";

interface pageProps {}

const Page = async ({}: pageProps) => {
  const trainersData: TrainerType[] = await fetchAllTrainers();
  console.log(trainersData);
  // const session = await getServerSession();
  // console.log(session);

  // return <OffersPage session={session} data={trainersData} />;
  return <main>Hello</main>;
};

export default Page;

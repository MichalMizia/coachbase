import { fetchAllTrainers } from "@/lib/fetching/fetchTrainers";
import HomepageOffers from "./HomepageOffers";
import { TrainerType } from "@/model/user";

const HomepageOffersSection = async () => {
  const trainersData: TrainerType[] = await fetchAllTrainers();

  return <HomepageOffers data={trainersData} />;
};

export default HomepageOffersSection;

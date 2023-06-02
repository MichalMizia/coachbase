import UserData from "@/model/userData";
import { TrainerDataType } from "@/model/userData";
import { UserType } from "@/model/user";

export async function generateStaticParams() {
  const trainers: UserType[] = await UserData.find({ isTrainer: true }).exec()

  return trainers.map(trainer => ({
    slug: trainer.slug
  }));
}

interface pageProps {
  params: {
    slug: string
  }
}

const getTrainerData = (slug: string) => {
}

const page = ({ params } : pageProps) => {
  const { slug } = params
  // const trainerData: TrainerDataType = await getTrainerData(slug)
  
  
  return <div>page</div>
}

export default page
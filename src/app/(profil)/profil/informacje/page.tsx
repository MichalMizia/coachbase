// components
import { Separator } from "@/components/ui/separator";
// utils and types
import authOptions from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import initMongoose from "@/lib/db";
// types
import TrainerData, { PopulatedTrainerDataType } from "@/model/trainerData";
import MediaForm from "@/components/profile/forms/MediaForm";

interface PageProps {}

const getUser = async (
  id: string
): Promise<PopulatedTrainerDataType | null> => {
  await initMongoose();

  const trainer = await TrainerData.findOne({ userId: id })
    .populate("userId")
    .lean()
    .exec();

  return trainer;
};

const Page = async ({}: PageProps) => {
  const session = await getServerSession(authOptions);
  if (!session?.user?._id) {
    redirect("/rejestracja");
  }

  const userData = await getUser(session.user._id);
  if (!userData) {
    throw new Error("Brak danych powiązanych z tym trenerem");
  }
  const user = userData?.userId;

  return (
    <div className="flex flex-col items-stretch justify-start px-4 py-6 lg:px-8">
      <MediaForm
        media={userData.socialMedia}
        tags={user.tags || []}
        city={user.city}
        slug={user.slug}
        avatar={user.avatar}
        username={user.username}
      />
    </div>
  );
};

export default Page;

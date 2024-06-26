// components
import Button from "@/components/ui/Button";
import { Separator } from "@/components/ui/separator";
import { PlusCircle } from "lucide-react";
// utils and types
import authOptions from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import initMongoose from "@/lib/db";
// types
import TrainerData, { PopulatedTrainerDataType } from "@/model/trainerData";
import NewOfferForm from "./@components/NewOfferForm";
import TrainerOfferCard from "./@components/TrainerOfferCard";

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
    <div className="flex h-full flex-col items-stretch justify-start overflow-y-auto px-4 py-6 lg:px-8">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold text-gray-800">Twoje Oferty</h2>
          <p className="text-h6 text-text_readable">
            Zmiany tutaj będą wyświetlane w twojej ofercie.
          </p>
        </div>
        <NewOfferForm userId={user._id} />
      </div>
      <Separator className="my-4 bg-gray-300" />
      {userData.offers && (
        <ul className="w-full space-y-2">
          {userData.offers.map((offer) => (
            <TrainerOfferCard
              key={offer.title}
              title={offer.title}
              description={offer.description}
              price={offer.price}
              pricePer={offer.pricePer}
              _id={offer._id}
              userId={user._id}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default Page;

// components
import { Separator } from "@/components/ui/separator";
// utils and types
import authOptions from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import initMongoose from "@/lib/db";
// types
import TrainerData, { PopulatedTrainerDataType } from "@/model/trainerData";
import NewTestimonialForm from "./@components/NewTestimonialForm";
import TrainerTestimonialCard from "./@components/TrainerTestimonialCard";
import dynamic from "next/dynamic";
const ExperienceEditor = dynamic(
  () => import("./@components/ExperienceEditor"),
  {
    loading: () => (
      <section>
        <div className="relative flex items-center justify-between">
          <div className="z-[2] flex flex-col items-start gap-2 pt-8 xs:flex-row xs:items-center xs:pt-0">
            <div className="">
              <h2 className="text-h4 font-semibold text-gray-800">
                Opis Twojego Doświadczenie
              </h2>
            </div>
          </div>
        </div>
        <p className="animate-pulse text-lg text-text_readable">Loading...</p>
      </section>
    ),
  }
);
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
          <h2 className="text-2xl font-semibold text-gray-800">
            Twoje Doświadczenie jako {user.roles.join(", ")}
          </h2>
          <p className="text-h6 text-text_readable">
            Opowiedz o swoim doświadczeniu potencjalnym klientom.
          </p>
        </div>
      </div>

      <Separator className="my-4 bg-gray-300" />

      <ExperienceEditor userId={user._id} experience={userData.experience} />

      <Separator className="my-4 bg-gray-300" />

      <section className="space-y-4" id="efekty">
        <div className="relative flex flex-col items-start justify-between gap-y-2 sm:flex-row sm:items-center">
          <div className="z-[2] flex flex-col items-start gap-2 pt-8 xs:flex-row xs:items-center xs:pt-0">
            <div className="">
              <h2 className="text-h4 font-semibold text-gray-800">
                Efekty Twoich podopiecznych
              </h2>
              <p className="max-w-md text-sm text-text_readable sm:text-h6">
                Dodając efekty współpracy z klientami zwiększasz swoją
                wiarygodność.
              </p>
            </div>
          </div>
          <NewTestimonialForm userId={user._id} />
        </div>
        {userData.testimonials && (
          <ul className="w-full space-y-2">
            {userData.testimonials
              .sort((test1, test2) =>
                test1.createdAt > test2.createdAt ? -1 : 0
              )
              .map((testimonial) => (
                <TrainerTestimonialCard
                  key={testimonial.title}
                  title={testimonial.title}
                  description={testimonial.description}
                  transformation={testimonial.transformation}
                  photoAlt={testimonial.photoAlt}
                  photoUrl={testimonial.photoUrl}
                  _id={testimonial._id}
                  userId={user._id}
                />
              ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default Page;

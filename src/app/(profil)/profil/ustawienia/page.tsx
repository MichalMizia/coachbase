// auth
import authOptions from "@/lib/auth";
import { getServerSession } from "next-auth";
// types
import { TrainerType } from "@/model/user";
import TrainerData, {
  PopulatedTrainerDataType,
  TrainerDataType,
} from "@/model/trainerData";
import { Separator } from "@/components/ui/separator";
// utils
import { redirect } from "next/navigation";
import initMongoose from "@/lib/db";
// components
import { UserDataForm } from "../../konto-uzytkownika/@components/UserDataForm";
// lazy loaded stuff
import dynamic from "next/dynamic";
const AvatarImageForm = dynamic(
  () => import("../@components/AvatarImageForm"),
  {
    loading: () => (
      <div className="h-14 w-14 animate-pulse rounded-full bg-gray-100"></div>
    ),
  }
);

export interface PageProps {
  user?: TrainerType;
  userData?: TrainerDataType;
}

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

const Page = async () => {
  // await new Promise((resolve) => setTimeout(resolve, 2000));

  const session = await getServerSession(authOptions);
  if (!session?.user?._id) {
    redirect("/rejestracja");
  }

  const userData = await getUser(session.user._id);
  if (!userData) {
    throw new Error("Brak danych powiązanych z tym trenerem");
  }

  const user = userData?.userId;
  // when the user is logged in as a trainer
  return (
    <div className="flex h-full flex-col items-stretch justify-start overflow-auto px-4 pb-6 pt-0 xs:pt-6 lg:px-8">
      <div className="relative flex items-center justify-between">
        <div className="z-[2] flex flex-col items-start gap-2 pt-8 xs:flex-row xs:items-center xs:pt-0">
          <AvatarImageForm
            imgSrc={user.avatar}
            id={user._id}
            username={user.username}
          />
          <div className="">
            <h2 className="text-h4 font-semibold text-gray-800">Ustawienia</h2>
            <p className="max-w-md text-sm text-text_readable sm:text-h6">
              <span className="font-[500]">Status Konta: Trener</span>
            </p>
          </div>
        </div>
        <p className="hidden self-start text-sm text-blue-500 md:block">
          Zmień zdjęcie klikając w nie
        </p>
      </div>
      <p className="ml-2 translate-y-2 self-start text-sm text-blue-500 md:hidden">
        Zmień zdjęcie klikając w nie
      </p>
      <Separator className="my-4 bg-gray-300" />

      <UserDataForm
        userId={JSON.stringify(user._id)}
        defaultName={user.username}
        defaultEmail={user.email}
        header={
          <div className="space-y-0.5">
            <h2 className="text-xl font-semibold text-gray-800">
              Dane Profilowe
            </h2>
          </div>
        }
      />
    </div>
  );
};

export default Page;

{
  /* <div className="flex items-start justify-center gap-8">
  <ul className="flex w-full flex-1 flex-col items-center justify-center">
    <li className="w-full rounded-sm bg-white px-8 py-6 shadow shadow-[#00000030]">
      <header className="flex w-full">
        Ulubione <HeartIcon />
      </header>
    </li>
  </ul>
  <div className="flex-1">
    <ChangeNameForm name={session.user.name} />
  </div>
</div>; */
}

// {
//   "Version": "2012-10-17",
//   "Statement": [
//       {
//           "Effect": "Allow",
//           "Action": [
//               "s3:*",
//               "s3-object-lambda:*"
//           ],
//           "Resource": "*"
//       }
//   ]
// }

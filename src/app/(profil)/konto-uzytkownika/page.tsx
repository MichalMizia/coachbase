import authOptions from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import User, { IUser } from "@/model/user";

import { Separator } from "@/components/ui/separator";
import initMongoose from "@/lib/db";
import { UserDataForm } from "./@components/UserDataForm";
import PendingRequest, { PendingRequestType } from "@/model/pendindRequest";
// lazy loaded stuff
import dynamic from "next/dynamic";
const AvatarImageForm = dynamic(
  () => import("../profil/@components/AvatarImageForm"),
  {
    loading: () => (
      <div className="h-14 w-14 animate-pulse rounded-full bg-gray-100"></div>
    ),
  }
);

const getUser = async (
  id: string
): Promise<[IUser | null, PendingRequestType | null]> => {
  await initMongoose();

  const user: IUser = await User.findById(id).lean().exec();

  const pendindRequest: PendingRequestType = await PendingRequest.findOne({
    username: user.username,
  })
    .lean()
    .exec();

  return [user, pendindRequest];
};

const Page = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user?._id) {
    redirect("/rejestracja");
  }

  const [user, request] = await getUser(session.user._id);
  if (!user) {
    throw new Error("Brak danych powiązanych z tym użytkownikiem");
  }
  // when the user is logged in as a trainer
  return (
    <div className="flex h-full flex-col items-stretch justify-start overflow-auto px-4 pb-6 pt-0 xs:pt-6 lg:px-8">
      <div className="relative flex items-center justify-between">
        <div className="z-[2] flex flex-col items-start gap-2 pt-8 xs:flex-row xs:items-center xs:pt-0">
          <AvatarImageForm
            imgSrc={user.avatar}
            id={user._id}
            username={user.username}
            imageClassName="!static !h-14 !w-14 !translate-y-0"
          />
          <div className="">
            <h2 className="text-h4 font-semibold text-gray-800">
              Cześć, {user.username.split(" ")[0]}
            </h2>
            <p className="max-w-md text-sm text-text_readable sm:text-h6">
              <span className="font-[500]">Status Konta: </span>
              {request ? "Oczekiwanie na weryfikację" : "Użytkownik"}
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
      />
      {request && (
        <p className="max-w-lg text-sm text-red-600">
          Uwaga: Po zaakceptowaniu konta trenerskiego będziesz musiał zalogować
          się ponownie aby zobaczyć swój profil biznesowy
        </p>
      )}
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

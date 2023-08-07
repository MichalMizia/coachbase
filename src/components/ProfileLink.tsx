import { UserIcon } from "lucide-react";
import Link from "next/link";

interface ProfileLinkProps {
  username?: string;
  isLarge: boolean;
}

const ProfileLink = ({ username, isLarge }: ProfileLinkProps) => {
  const initials =
    username &&
    username
      .split(" ")
      .map((n) => n[0])
      .join("");

  return (
    <a title="Profil" href="/profil">
      {initials ? (
        isLarge ? (
          <div className="flex items-end justify-center gap-2">
            <div className="flex flex-col items-end justify-between">
              <h4 className="text-[15px] font-semibold text-white">
                Witaj spowrotem!
              </h4>
              <p className="text-xs tracking-wide text-gray-100">{username}</p>
            </div>
            <div className="flex aspect-square h-10 items-center justify-center rounded-full border border-violet-300 bg-blue-400 p-1 shadow-lg shadow-[#00000030]">
              {initials}
            </div>
          </div>
        ) : (
          <div className="flex aspect-square h-10 items-center justify-center rounded-full border border-violet-300 bg-blue-400 p-1 shadow-lg shadow-[#00000030]">
            {initials}
          </div>
        )
      ) : (
        <div className="flex aspect-square h-10 items-center justify-center  rounded-full bg-blue-400 p-2 shadow shadow-[#00000030]">
          <UserIcon />
        </div>
      )}
    </a>
  );
};

export default ProfileLink;

"use client";

import { LucideUser } from "lucide-react";
import Image from "next/image";
import ImageUpdateForm from "./forms/ImageUpdateForm";
import { TrainerType } from "@/model/user";

interface ProfileInfoSectionProps {
  user: TrainerType;
}

const ProfileInfoSection = ({ user }: ProfileInfoSectionProps) => {
  return (
    <section className="flex min-h-[400px] w-full justify-center py-8">
      <div className="flex-1 self-stretch">
        <ImageUpdateForm imgSrc={user.image} id={user._id || ""} />
      </div>
      <div className="flex flex-1 items-center justify-center">
        <h1 className="text-2xl font-semibold text-black">{user.username}</h1>
      </div>
    </section>
  );
};

export default ProfileInfoSection;

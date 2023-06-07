"use client";

import { Session } from "next-auth";
import { LucideUser } from "lucide-react";
import Image from "next/image";
import ImageUpdateForm from "./forms/ImageUpdateForm";

interface ProfileInfoSectionProps {
  session: Session;
}

const ProfileInfoSection = ({ session }: ProfileInfoSectionProps) => {
  return (
    <section className="flex min-h-[400px] w-full justify-center py-8">
      <div className="flex-1 self-stretch">
        <ImageUpdateForm imgSrc={session.user.image} id={session.user._id} />
      </div>
      <div className="flex flex-1 items-center justify-center">
        <h1>Michal Mizia</h1>
      </div>
    </section>
  );
};

export default ProfileInfoSection;

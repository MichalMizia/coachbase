"use client";

import Button from "@/components/ui/Button";
import { SocialMediaOptions, SocialMediaType } from "@/model/trainerData";
import {
  FacebookIcon,
  InstagramIcon,
  LucideProps,
  MailIcon,
} from "lucide-react";
import { ReactElement, useState } from "react";

interface SocialMediaFormProps {
  media: SocialMediaType;
}

interface SocialMediaFormType {
  icon: (props: LucideProps) => ReactElement;
  mediaType: SocialMediaOptions;
}

const availableMedia: SocialMediaFormType[] = [
  {
    icon: (props) => <InstagramIcon {...props} />,
    mediaType: "Instagram",
  },
  {
    icon: (props) => <FacebookIcon {...props} />,
    mediaType: "Facebook",
  },
  {
    icon: (props) => <MailIcon {...props} />,
    mediaType: "Email",
  },
];

const SocialMediaForm = ({ media }: SocialMediaFormProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentMedia, setCurrentMedia] = useState<SocialMediaType>(media);

  return (
    <form className="my-auto mt-8 flex w-full flex-col justify-start gap-2">
      {availableMedia.map((med) => (
        <div className="flex w-full justify-center gap-2" key={med.mediaType}>
          <input
            type="text"
            placeholder={`${med.mediaType} link`}
            autoComplete="off"
            autoCorrect="off"
            disabled={isLoading}
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            value={
              med.mediaType === "Instagram"
                ? currentMedia.instagram
                : med.mediaType === "Facebook"
                ? currentMedia.facebook
                : currentMedia.email
            }
            onChange={(e) =>
              setCurrentMedia((media) => {
                if (med.mediaType === "Instagram") {
                  return { ...media, instagram: e.target.value };
                } else if (med.mediaType === "Facebook") {
                  return { ...media, facebook: e.target.value };
                } else {
                  return { ...media, email: e.target.value };
                }
              })
            }
          />
          <div className="flex w-10 items-center justify-center">
            {med.icon({ strokeWidth: 2.25 })}
          </div>
        </div>
      ))}
      <Button type="submit" variant="default" className="mr-10 mt-2">
        Save
      </Button>
    </form>
  );
};

export default SocialMediaForm;

"use client";

// types
import { TrainerType } from "@/model/user";
// components
import { SendIcon } from "lucide-react";
import Image from "next/image";
import StarsRating from "../ui/StarsRating";
import PersonAvatar from "../../../public/assets/undraw_personal_info_re_ur1n.svg";
import useMediaQuery from "@/lib/useMediaQuery";

interface OffersSectionProps {
  data: TrainerType[];
}

const OffersSection = ({ data }: OffersSectionProps) => {
  if (!data || !data.length) {
    return (
      <section className="bg-primary py-12">
        <div className="container-md">
          <h2 className="text-4xl text-black">Brak wyników...</h2>
        </div>
      </section>
    );
  }

  return (
    <section className="latest-offers bg-primary py-12">
      <div className="container-md">
        <ul className="grid grid-flow-row grid-cols-1 items-start justify-between gap-x-5 lg:grid-cols-2 xxl:grid-cols-3">
          {data.map((trainer) => {
            return (
              <li
                key={trainer.username}
                className="group relative my-4 flex w-full max-w-3xl flex-col-reverse rounded-l-sm bg-white shadow shadow-[#00000020] transition-shadow duration-300 after:absolute after:left-0 after:top-0 after:h-full after:w-1 after:rounded-l-sm after:bg-secondary hover:shadow-md md:flex-row lg:flex-col-reverse"
              >
                <div className="flex-1 px-8 pb-8 pt-6 lg:px-6 lg:pb-6 lg:pt-4">
                  <header className="mb-2 flex items-center justify-between text-black lg:mb-1">
                    <h3 className="text-xl font-bold capitalize">
                      {trainer.username}
                    </h3>
                  </header>
                  <ul className="tags flex w-fit items-center justify-center gap-2">
                    {trainer.roles?.map((role, ind) => (
                      <li
                        className="rounded-sm bg-blue-100 px-2 py-[2px] text-[12px] font-bold uppercase text-gray-700 lg:text-[10px]"
                        key={ind}
                      >
                        {role}
                      </li>
                    ))}
                  </ul>
                  <p
                    id="description"
                    className="lg:text-[15px mb-5 mt-4 line-clamp-4 text-left leading-tight"
                  >
                    {trainer.summary}
                  </p>
                  <div className="flex w-full items-start justify-between gap-2">
                    <a
                      href={`oferty/${trainer.slug}`}
                      title={`Profil ${trainer.username}`}
                    >
                      <button className="flex items-center justify-center gap-2 rounded-sm px-2 py-1 text-sm text-gray-700 ring-1 ring-gray-400 transition-all duration-[400] hover:ring-2 hover:ring-gray-600 hover:ring-offset-1 focus:ring-2 focus:ring-gray-600 focus:ring-offset-1">
                        <SendIcon size={18} className="relative -mb-[2px]" />
                        Zobacz ofertę
                      </button>
                    </a>
                    {/* <StarsRating rating={3.7} /> */}
                  </div>
                </div>
                <div className="m-auto h-full flex-1 overflow-hidden">
                  {trainer.image ? (
                    <img
                      src={trainer.image}
                      loading="lazy"
                      alt={`Zdjęcie profilowe ${trainer.username}`}
                      className="h-full w-full rounded-t object-cover transition-all duration-500 group-hover:scale-[1.07]"
                    />
                  ) : (
                    <Image
                      className="h-full w-full object-cover"
                      loading="lazy"
                      alt={`Zdjęcie profilowe ${trainer.username}`}
                      src={PersonAvatar}
                    />
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default OffersSection;

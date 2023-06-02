"use client";

import { ReactNode, useMemo, useState } from "react";
// types
import { TrainerType, UserRolesType, UserType } from "@/model/user";
// components
import StarsRating from "../ui/StarsRating";
import Image from "next/image";
import Link from "next/link";
import Button from "../ui/Button";
// utils
import { classNames } from "@/lib/utils";
// assets
import { SendIcon } from "lucide-react";
import PersonAvatar from "../../../public/assets/undraw_personal_info_re_ur1n.svg";
// react carousel
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { fetchAllTrainers } from "@/lib/fetching/fetchTrainers";
import { toast } from "react-hot-toast";

export interface option {
  title: UserRolesType;
  icon: ReactNode;
}

interface HomepageOffersProps {
  data: TrainerType[] | null;
}

export default function HomepageOffers({ data }: HomepageOffersProps) {
  const [isLatestOffers, setIsLatestOffers] = useState<boolean>(true);

  if (!data) {
    return (
      <h2 className="text-4xl font-semibold text-black">
        Brak połączenia z internetem
      </h2>
    );
  } else {
    const newData = data.reduce((acc, curr, index) => {
      if (index && (index + 1) % 2 === 0) {
        acc.push([data[index - 1], data[index]]);
      }
      return acc;
    }, [] as Array<TrainerType[]>);

    console.log(newData);

    return (
      <section className="latest-offers border-t-2 bg-primary py-12">
        <div className="container-md">
          <header className="flex items-center justify-center gap-10 pb-10">
            <Button variant="text" onClick={() => setIsLatestOffers(true)}>
              <h2
                className={classNames(
                  isLatestOffers
                    ? "text-2xl font-semibold text-black"
                    : "text-[22px] text-gray-700",
                  "transition-all duration-300"
                )}
              >
                Najnowsze oferty
              </h2>
            </Button>
            <Button variant="text" onClick={() => setIsLatestOffers(false)}>
              <h2
                className={classNames(
                  !isLatestOffers
                    ? "text-2xl font-semibold text-black"
                    : "text-[22px] text-gray-700",
                  "transition-all duration-300"
                )}
              >
                Najwyżej oceniane oferty
              </h2>
            </Button>
          </header>
          <main>
            <Carousel
              showThumbs={false}
              centerMode={true}
              centerSlidePercentage={100}
              emulateTouch={true}
              infiniteLoop={true}
              autoPlay={true}
              interval={6000}
              className="flex flex-col items-center justify-center gap-6"
            >
              {newData.map((twoTrainers, ind) => {
                return (
                  <div key={ind}>
                    {twoTrainers.map((trainer, ind) => {
                      return (
                        <div
                          key={trainer.username}
                          className="relative my-4 flex w-full max-w-3xl rounded-l-sm bg-white shadow shadow-[#00000020] transition-shadow duration-300 after:absolute after:left-0 after:top-0 after:h-full after:w-1 after:rounded-l-sm after:bg-secondary hover:shadow-md"
                        >
                          <div className="flex-1 px-8 pb-8 pt-6">
                            <header className="mb-2 flex items-center justify-between text-black">
                              <h3 className="text-xl font-bold capitalize">
                                {trainer.username}
                              </h3>
                            </header>
                            <ul className="tags flex w-fit items-center justify-center gap-2">
                              {trainer.roles?.map((role, ind) => (
                                <li
                                  className="rounded-sm bg-blue-100 px-2 py-[2px] text-[12px] font-bold uppercase text-gray-700"
                                  key={ind}
                                >
                                  {role}
                                </li>
                              ))}
                            </ul>
                            <p
                              id="description"
                              className="mb-5 mt-4 line-clamp-4 text-left leading-tight"
                            >
                              Lorem ipsum dolor sit amet consectetur,
                              adipisicing elit. Consequatur eligendi quod
                              excepturi optio cupiditate! Nemo doloremque
                              ratione qui odio recusandae.
                            </p>
                            <div className="flex w-full items-end justify-between">
                              <button className="flex items-center justify-center gap-2 rounded-sm px-2 py-1 text-gray-700 ring-1 ring-gray-400 transition-all duration-[400] hover:ring-2 hover:ring-gray-600 hover:ring-offset-1 focus:ring-2 focus:ring-gray-600 focus:ring-offset-1">
                                <SendIcon
                                  size={18}
                                  className="relative -mb-[2px]"
                                />
                                Zobacz ofertę
                              </button>
                              <StarsRating rating={3.7} />
                            </div>
                          </div>
                          <div className="m-auto h-full flex-1">
                            <Image
                              className="h-full w-full object-cover"
                              alt={`Zdjęcie profilowe ${trainer.username}`}
                              src={PersonAvatar}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </Carousel>
          </main>
        </div>
      </section>
    );
  }
}
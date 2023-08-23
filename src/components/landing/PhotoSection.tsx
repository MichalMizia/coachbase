import Image from "next/image";
import DietImg from "../../../public/assets/diet.jpg";
import StrengthImg from "../../../public/assets/strength.jpg";
import MartialArtsImg from "../../../public/assets/martial-arts.jpg";
import OnlineImg from "../../../public/assets/online.jpg";
import Link from "next/link";

interface PhotoSectionProps {}

const PhotoSection = ({}: PhotoSectionProps) => {
  return (
    <ul className="mt-4 grid items-stretch justify-stretch justify-items-center gap-4 md:mt-6 lg:mt-8 lg:grid-cols-5 lg:justify-center lg:[grid-auto-rows:26vw] xl:[grid-auto-rows:320px]">
      <li
        id="trening-silowy"
        className="group relative isolate mx-auto flex aspect-video w-full max-w-[650px] cursor-pointer items-stretch justify-stretch overflow-hidden rounded-lg shadow-md  shadow-black/20 transition-all hover:shadow-lg hover:shadow-black/30 lg:col-span-3 lg:mx-0 lg:aspect-auto"
      >
        <Link
          className="flex w-full items-end justify-stretch"
          href="/oferty?tag=trening-silowy"
        >
          <Image
            className="-z-[2] object-cover brightness-90 transition-all duration-500 group-hover:scale-110"
            fill
            priority
            src={StrengthImg}
            alt="Zdjęcie przedstawiające trening siłowy"
          />
          <footer className="w-full bg-gradient-to-b from-black/20 to-black/80 p-4">
            <h4
              className="text-white"
              style={{ fontSize: "var(--size-step-2)" }}
            >
              Trening Siłowy
            </h4>
            <p className="" style={{ fontSize: "var(--size-step-0)" }}></p>
          </footer>
        </Link>
      </li>
      <li
        id="dietetyk"
        className="group relative isolate mx-auto flex aspect-video h-full w-full max-w-[650px] cursor-pointer items-stretch justify-stretch overflow-hidden rounded-lg shadow-md shadow-black/20 transition-all hover:shadow-lg hover:shadow-black/30 lg:col-span-2 lg:mx-0 lg:aspect-auto"
      >
        <Link
          className="flex w-full items-end justify-stretch"
          href="/oferty?tag=dietetyk"
        >
          <Image
            className="-z-[2]  object-cover brightness-90  transition-all duration-500 group-hover:scale-110"
            src={DietImg}
            fill
            priority
            alt="Talerz z ryżem, łososiem i warzywami"
          />
          <footer className="w-full  bg-gradient-to-b from-black/20 to-black/80 p-4">
            <h4
              className="text-white"
              style={{ fontSize: "var(--size-step-2)" }}
            >
              Dietetyka
            </h4>
            <p className="" style={{ fontSize: "var(--size-step-0)" }}></p>
          </footer>
        </Link>
      </li>
      <li
        id="sztuki-walki"
        className="group relative isolate mx-auto flex aspect-video w-full max-w-[650px] cursor-pointer items-stretch justify-stretch overflow-hidden rounded-lg shadow-md shadow-black/20 transition-all hover:shadow-lg hover:shadow-black/30 lg:col-span-2 lg:mx-0 lg:aspect-auto"
      >
        <Link
          className="flex w-full items-end justify-stretch"
          href="/oferty?tag=sztuki-walki"
        >
          <Image
            className="-z-[2] object-cover brightness-90 transition-all  duration-500 group-hover:scale-110"
            src={MartialArtsImg}
            fill
            priority
            alt="Worek bokserski na sali treningowej sztuk walki"
          />
          <footer className="w-full  bg-gradient-to-b from-black/20 to-black/80 p-4">
            <h4
              className="text-white"
              style={{ fontSize: "var(--size-step-2)" }}
            >
              Sztuki Walki
            </h4>
            <p className="" style={{ fontSize: "var(--size-step-0)" }}></p>
          </footer>
        </Link>
      </li>
      <li
        id="online"
        className="group relative isolate mx-auto flex aspect-video w-full max-w-[650px] cursor-pointer items-end justify-stretch overflow-hidden rounded-lg shadow-md shadow-black/20 transition-all hover:shadow-lg hover:shadow-black/30 lg:col-span-3 lg:mx-0 lg:aspect-auto"
      >
        <Link
          className="flex w-full items-end justify-stretch"
          href="/oferty?online=true"
        >
          <Image
            className="-z-[2] object-cover brightness-90 transition-all  duration-500 group-hover:scale-110"
            src={OnlineImg}
            fill
            priority
            alt="Zdjęcie przedstawiające osobe pracująca na laptopie zdalnie"
          />
          <footer className="w-full bg-gradient-to-b from-black/20 to-black/80 p-4">
            <h4
              className="text-white"
              style={{ fontSize: "var(--size-step-2)" }}
            >
              Prowadzenie Online
            </h4>
            <p className="" style={{ fontSize: "var(--size-step-0)" }}></p>
          </footer>
        </Link>
      </li>
    </ul>
  );
};

export default PhotoSection;

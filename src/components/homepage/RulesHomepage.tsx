"use client";

import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { HourglassIcon, VerifiedIcon, UserCheckIcon } from "lucide-react";

const RulesHomepage = () => {
  return (
    <section className="strong-500 bg-slate-100 py-20 lg:py-0 relative border-t-2 border-blue-200 rounded-t-lg">
      <div className="gradient circle-gradient absolute" />
      <div className="flex items-start justify-center gap-8 container-lg flex-col lg:flex-row">
        <h2 className="text-4xl font-semibold flex-grow text-center w-full ml-8 lg:ml-0 lg:mt-16 lg:w-auto">
          Jak zostać trenerem?
        </h2>

        <VerticalTimeline
          lineColor="#60a5fa"
          className="max-w-md lg:max-w-3xl relative -top-6 lg:top-0 py-20 my-6 lg:my-0 lg:py-32"
          layout="2-columns"
        >
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
            contentArrowStyle={{ borderRight: "7px solid  rgb(33, 150, 243)" }}
            iconStyle={{
              background: "rgb(33, 150, 243)",
              color: "#fff",
              border: "none",
            }}
            icon={<HourglassIcon />}
          >
            <h3 className="vertical-timeline-element-title font-semibold text-xl">
              Krok 1
            </h3>
            <p className="font-[350!important]">
              Załóż konto trenera. Napisz krótkie podsumowanie, które będzie
              wyświetlać się na Twoim profilu oraz wybierz dziedziny, którymi
              się zajmujesz.{" "}
            </p>
            <a
              href=""
              className="mt-2 float-right font-[500] text-slate-100 hover:text-white fancy-link-gradient"
            >
              Konto trenera...
            </a>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
            contentArrowStyle={{ borderRight: "7px solid  rgb(33, 150, 243)" }}
            iconStyle={{ background: "#34d399", color: "#fff" }}
            icon={<VerifiedIcon />}
          >
            <h3 className="vertical-timeline-element-title font-semibold text-xl">
              Krok 2
            </h3>
            <p className="font-[350!important]">
              Poczekaj na weryfikację. Poprosimy Cię o podanie poświadczenia
              Twoich kompetencji trenerskich. Może to być{" "}
              <strong>certyfikat</strong>, przykład{" "}
              <strong>pracy z klientem</strong> czy <strong>profil</strong> na
              social mediach.
            </p>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--education"
            contentStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
            contentArrowStyle={{ borderRight: "7px solid  rgb(33, 150, 243)" }}
            iconStyle={{ background: "rgb(233, 30, 99)", color: "#fff" }}
            icon={<UserCheckIcon />}
          >
            <h3 className="vertical-timeline-element-title font-semibold text-xl">
              Krok 3
            </h3>
            <p className="font-[350!important]">
              Wypełnij dane w profilu trenera. Dodaj{" "}
              <strong>opis swojej działalności</strong>,{" "}
              <strong> wyniki pracy z podopiecznymi</strong>,{" "}
              <strong>lokalizację</strong>, <strong>zdjęcia</strong> czy{" "}
              <strong>formularz kontaktowy</strong>. To jak tworzenie własnej
              strony internetowej!
            </p>
          </VerticalTimelineElement>
        </VerticalTimeline>
      </div>
    </section>
  );
};

export default RulesHomepage;

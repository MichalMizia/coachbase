"use client";

// utils
import { PopulatedTrainerDataType } from "@/model/trainerData";
import { TabsContent } from "@/components/ui/tabs";
// radix
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
// components
import AddReviewForm from "./AddReviewForm";
import Button from "@/components/ui/Button";
import { toast } from "react-hot-toast";
// assets
import Image from "next/image";
import { Session } from "next-auth";
import AvatarSvg from "@/../public/assets/avatar.svg";
import {
  ClipboardCheck,
  DollarSign,
  HelpCircle,
  PlusCircleIcon,
} from "lucide-react";
import { Icons } from "@/components/ui/icons";
import { cn, formatDate } from "@/lib/utils";
import StarsRating from "@/components/custom/StarsRating";
import { Separator } from "@/components/ui/separator";
import { sanitize } from "isomorphic-dompurify";

interface OfferTabsProps {
  trainerData: PopulatedTrainerDataType;
  session: Session | null;
}

const OfferTabs = ({ trainerData, session }: OfferTabsProps) => {
  const trainer = trainerData.userId;
  console.log(trainer);

  return (
    <main className="mt-5 min-h-[100px] w-full rounded-sm bg-white shadow-md shadow-black/25 outline outline-1 outline-black/5">
      <TabsContent value="Oferty">
        <div className="relative mx-auto max-h-[600px] max-w-3xl overflow-y-auto">
          <header className="sticky top-0 z-[2] flex items-end justify-between border-b border-gray-300 bg-white px-6 py-2">
            <h2 className="text-h3 font-[600]">
              Oferty: {trainerData.offers.length}
            </h2>
          </header>
          <section className="border-b border-gray-300 px-6 py-4">
            <main className="max-w-xl">
              {trainerData.offers?.length ? (
                <ul className="space-y-2">
                  {trainerData.offers.map((offer) => (
                    <li className="max-w-xl" key={offer._id.toString()}>
                      <article className="flex max-w-xl items-center justify-between rounded-md border p-4 shadow shadow-[#00000030] transition-all hover:shadow-lg hover:shadow-[#00000030]">
                        <main className="grid gap-1">
                          <header className="flex items-center">
                            {offer.photoUrl ? (
                              <Image
                                src={offer.photoUrl}
                                alt={offer.photoAlt || ""}
                                width={56}
                                height={56}
                              />
                            ) : (
                              <div className="mr-2 flex aspect-square h-14 w-14 items-center justify-center rounded-full border-2 border-text_readable bg-bg p-3">
                                <DollarSign className="h-full w-full text-text_readable" />
                              </div>
                            )}

                            <div className="flex flex-col">
                              <h3 className="text-h4 font-[500] text-gray-800">
                                {offer.title}
                              </h3>
                              <span className="text-h6 text-text_readable">
                                {offer.price}zł/{offer.pricePer}
                              </span>
                            </div>
                          </header>

                          <p className="text-text_readable">
                            {offer.description}
                          </p>
                        </main>
                      </article>
                    </li>
                  ))}
                </ul>
              ) : (
                <h4 className="flex w-fit items-center justify-start gap-2 px-1 text-gray-800">
                  <Icons.logo className="h-6 w-6 text-text_readable" />
                  Ten trener nie dodał jeszcze swoich ofert
                </h4>
              )}
            </main>
          </section>
        </div>
      </TabsContent>
      <TabsContent value="Opinie">
        <div className="relative mx-auto max-h-[600px] max-w-3xl overflow-y-auto">
          <header className="flex items-center justify-between border-b border-gray-300 px-6 py-2">
            <h2 className="text-h3 font-[600]">
              {trainerData.reviews.length
                ? `Opinie: ${trainerData.reviews.length}`
                : "0 Opinii"}
            </h2>
            {/* do not display the addReviewform if the trainer is viewing his own profile */}
            {session?.user?._id === trainer._id ? null : session?.user ? (
              <AddReviewForm
                trainerName={trainer.username}
                userId={session?.user._id}
                trainerDataId={trainerData._id}
              />
            ) : (
              <p className="text-sm text-text_readable">
                Zaloguj się aby dodać opinię
              </p>
            )}
          </header>
          <section className="border-b border-gray-300 ">
            {trainerData.reviews.length ? (
              <ul className="space-y-4 pt-4">
                {trainerData.reviews.map((review) => (
                  <li
                    key={review._id.toString()}
                    className="relative isolate flex w-full flex-col items-start border-b border-gray-300 px-6 pb-2 after:absolute after:right-6 after:top-0 after:font-serif after:text-[72px] after:opacity-10 after:[content:'’’']"
                  >
                    <header className="sticky top-0 z-[2] flex items-center justify-start gap-2 bg-white">
                      <div className="relative h-14 w-14">
                        <Image
                          src={review.userAvatar || AvatarSvg}
                          alt={`Avatar osoby dodającej opinie - ${review.username}`}
                          className="aspect-square rounded-full border border-black/5 object-cover shadow-md"
                          fill
                        />
                      </div>
                      <div className="flex h-min flex-col items-start justify-center">
                        <h5 className="relative top-0.5 text-lg font-semibold">
                          {review.username}
                        </h5>
                        <div className="relative -top-0.5 flex items-center justify-start gap-2">
                          <StarsRating
                            starsClassName="!text-2xl"
                            rating={review.rating}
                            omitRatingNumber
                          />
                          <p className=" text-sm text-text_readable sm:text-h6">
                            {formatDate(review.createdAt)}
                          </p>
                        </div>
                      </div>
                    </header>
                    <main className=" my-2 flex w-full flex-col items-start justify-center text-text_readable ">
                      <p className="max-w-2xl px-1 text-body">
                        {review.description}
                      </p>
                    </main>
                  </li>
                ))}
              </ul>
            ) : (
              <h4 className="flex w-fit items-center justify-start gap-2 px-7 py-4 text-body text-gray-800">
                <ClipboardCheck className="h-6 w-6 text-text_readable" />
                Na temat tego trenera nie dodano jeszcze żadnej opinii.
              </h4>
            )}
          </section>
          {/* <section className="border-b border-gray-300 px-6 py-4">
    <h4 className="flex w-fit items-center justify-start gap-2 px-1 text-body text-gray-800">
      <FileText size={18} className="text-text" />
      Zdjęcia
    </h4>
    <main className="max-w-xl px-1 py-3 text-h6">
      {trainerData.heroSection.image}
    </main>
  </section> */}
        </div>
      </TabsContent>
      <TabsContent value="Doświadczenie">
        <div className="relative mx-auto max-h-[600px] max-w-3xl overflow-y-auto">
          <header className="sticky top-0 z-[2] flex items-end justify-between border-b border-gray-300 bg-white px-6 py-2">
            <h2 className="text-h3 font-[600]">Doświadczenie</h2>
          </header>
          <section className="border-b border-gray-300 px-6 py-4">
            {trainerData.experience && !!trainerData.experience.length ? (
              <article
                className="xsmall-article flow"
                dangerouslySetInnerHTML={{
                  __html: sanitize(trainerData.experience),
                }}
              ></article>
            ) : (
              <p>Ten trener nie dodał jeszcze opisu swojego doświadczenia.</p>
            )}
          </section>
          <h3 className="bg-white px-6 pt-4 text-h4 font-[600]">
            Efekty klientów: {trainerData.testimonials.length}
          </h3>
          <section className="border-b border-gray-300 px-6 py-4">
            <main className="max-w-xl">
              {trainerData.testimonials?.length ? (
                <ul className="space-y-2">
                  {trainerData.testimonials.map((testimonial) => (
                    <li
                      key={testimonial._id.toString()}
                      className="relative max-w-xl cursor-pointer space-y-2 overflow-hidden rounded-md border shadow shadow-[#00000030] transition-all hover:shadow-lg hover:shadow-[#00000030]"
                    >
                      {!!testimonial.photoUrl.length && (
                        <div className="relative flex aspect-video items-stretch justify-stretch overflow-hidden rounded-t-md border-2 border-white shadow-md">
                          <div className="relative h-full flex-1">
                            <Image
                              src={testimonial.photoUrl[0]}
                              alt={
                                testimonial.photoAlt[0] ||
                                `Efekt współpracy z trenerem o tytule - ${testimonial.title}`
                              }
                              fill
                              className="border-r object-cover"
                            />
                          </div>
                          {testimonial.photoUrl[1] && (
                            <div className="relative h-full flex-1">
                              <Image
                                src={testimonial.photoUrl[1]}
                                alt={
                                  testimonial.photoAlt[1] ||
                                  `Wynik po zakończeniu współpracy - ${testimonial.title}`
                                }
                                fill
                                className="border-l object-cover"
                              />
                            </div>
                          )}
                        </div>
                      )}
                      <article
                        className={cn(
                          "p-4",
                          !!testimonial.photoUrl.length ? "pt-2" : ""
                        )}
                      >
                        <header className="flex w-full items-center justify-between gap-2">
                          <div className="flex flex-col items-start justify-center">
                            <h3 className="text-body font-[500] text-gray-800">
                              {testimonial.title}
                            </h3>
                            <div className="relative -left-0.5 pr-1 text-lg leading-5 tracking-[-4px] text-transparent [text-shadow:0_0_0_#60a5fa]">
                              ⭐⭐⭐⭐⭐
                            </div>
                          </div>
                        </header>

                        <p className="mt-2 text-text_readable">
                          {testimonial.description}
                        </p>
                      </article>
                    </li>
                  ))}
                </ul>
              ) : (
                <h4 className="flex w-fit items-center justify-start gap-2 px-1 text-gray-800">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-line-chart h-6 w-6 text-text_readable"
                  >
                    <path d="M3 3v18h18" />
                    <path d="m19 9-5 5-4-4-3 3" />
                  </svg>
                  Ten trener nie dodał jeszcze efektów swoich podopiecznych
                </h4>
              )}
            </main>
          </section>
        </div>
      </TabsContent>
      <TabsContent value="FAQ">
        <div className="relative mx-auto max-h-[600px] max-w-3xl overflow-y-auto">
          <header className="sticky top-0 z-[2] flex items-end justify-between border-b border-gray-300 bg-white px-6 py-2">
            <h2 className="text-h3 font-[600]">
              Najczęstsze pytania: {trainerData.faq.length}
            </h2>
          </header>
          <section className="border-b border-gray-300 px-6 py-4">
            <main className="max-w-xl">
              {trainerData.faq?.length ? (
                <ul className="space-y-2">
                  {trainerData.faq.map((question) => (
                    <li
                      key={question.question}
                      className="relative max-w-xl cursor-pointer space-y-2 overflow-hidden rounded-md border shadow shadow-[#00000030] transition-all hover:shadow-lg hover:shadow-[#00000030]"
                    ></li>
                  ))}
                </ul>
              ) : (
                <h4 className="flex w-fit items-center justify-start gap-2 px-1 text-gray-800">
                  <HelpCircle className="h-6 w-6 text-text_readable" />
                  Ten trener nie dodał jeszcze pytań do sekcji FAQ
                </h4>
              )}
            </main>
          </section>
        </div>
      </TabsContent>
    </main>
  );
};

export default OfferTabs;

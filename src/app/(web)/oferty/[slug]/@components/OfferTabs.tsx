"use client";

import { PopulatedTrainerDataType } from "@/model/trainerData";
import OfferTabsAbout from "../../../../../components/slug/OfferTabs/OfferTabsAbout";
import OfferTabsOffers from "../../../../../components/slug/OfferTabs/OfferTabsOffers";
import OfferTabsReviews from "../../../../../components/slug/OfferTabs/OfferTabsReviews";
import OfferTabsArticles from "../../../../../components/slug/OfferTabs/OfferTabsArticles";
import { TabsContent } from "@/components/ui/tabs";
import { ClipboardCheck, PlusCircleIcon } from "lucide-react";
import Button from "@/components/ui/Button";
import { toast } from "react-hot-toast";
import { Icons } from "@/components/ui/icons";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";

interface OfferTabsProps {
  trainerData: PopulatedTrainerDataType;
}

const OfferTabs = ({ trainerData }: OfferTabsProps) => {
  const trainer = trainerData.userId;

  return (
    <main className="mt-5 min-h-[100px] w-full rounded-sm bg-white shadow-md shadow-black/25 outline outline-1 outline-black/5">
      <TabsContent value="Oferty">
        <div className="mx-auto max-w-3xl">
          <header className="flex items-end justify-between border-b border-gray-300 px-6 py-2">
            <h2 className="text-h3 font-[600]">Oferty</h2>
          </header>
          <section className="border-b border-gray-300 px-6 py-4">
            <main className="max-w-xl px-1 py-3 text-h6">
              {trainerData.offers?.length ? (
                <ul className="space-y-2">
                  {trainerData.offers.map((offer) => (
                    <li className="max-w-xl">
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
                              <div className="mr-2 flex aspect-square h-14 w-14 items-center justify-center rounded-full border-2 border-text_readable bg-bg p-2">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                  className="h-full w-full text-gray-700"
                                >
                                  <path d="M7.5 3.375c0-1.036.84-1.875 1.875-1.875h.375a3.75 3.75 0 013.75 3.75v1.875C13.5 8.161 14.34 9 15.375 9h1.875A3.75 3.75 0 0121 12.75v3.375C21 17.16 20.16 18 19.125 18h-9.75A1.875 1.875 0 017.5 16.125V3.375z" />
                                  <path d="M15 5.25a5.23 5.23 0 00-1.279-3.434 9.768 9.768 0 016.963 6.963A5.23 5.23 0 0017.25 7.5h-1.875A.375.375 0 0115 7.125V5.25zM4.875 6H6v10.125A3.375 3.375 0 009.375 19.5H16.5v1.125c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 013 20.625V7.875C3 6.839 3.84 6 4.875 6z" />
                                </svg>
                              </div>
                            )}

                            <div className="flex flex-col">
                              <h3 className="text-h4 font-[500] text-gray-800">
                                {offer.title}
                              </h3>
                              <span className="text-h6 text-text_readable">
                                {offer.price}/{offer.pricePer}
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
                  <Icons.logo size={18} className="text-text" />
                  Ten trener nie dodał jeszcze swoich ofert
                </h4>
              )}
            </main>
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
      <TabsContent value="Opinie">
        <div className="mx-auto max-w-3xl">
          <header className="flex items-center justify-between border-b border-gray-300 px-6 py-2">
            <h2 className="text-h3 font-[600]">0 opinii</h2>
            <Button
              variant="primary"
              onClick={() => toast.error("To jeszcze nie działa")}
              className="items-center gap-1"
            >
              <PlusCircleIcon
                size={18}
                className="relative top-[1px] text-gray-200"
              />
              Dodaj opinię
            </Button>
          </header>
          <section className="border-b border-gray-300 px-6 py-4">
            <h4 className="flex w-fit items-center justify-start gap-2 px-1 text-body text-gray-800">
              <ClipboardCheck size={18} className="text-text" />
              Brak Opinii
            </h4>
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
      <TabsContent value="Efekty"></TabsContent>
      <TabsContent value="FAQ"></TabsContent>
    </main>
  );
};

export default OfferTabs;

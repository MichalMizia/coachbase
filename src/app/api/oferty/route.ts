import initMongoose from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import TrainerData, { TrainerDataType } from "@/model/trainerData";
import { HydratedDocument } from "mongoose";
import { TrainerOfferType } from "@/model/trainerDataSubSchemas/trainerOffer";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";

// Konsultacje Treningowe z Mistrzem Europy w Wyciskaniu i Mistrzem Polski w trójboju, w skład wchodzą:
//   1. Dogłębna ocena techniki bojów i analiza słabych punktów.
//   2. Poprawa wad w wzorcach ruchowych związanych z mobilnością czy koordynacją.
//   3. Ułożenie wytycznych do dalszego treningu

interface PatchRequestType {
  userId: string;
  offerId: string;

  title: string;
  description: string;
  price: number;
  pricePer: string;
}
interface PostRequestType {
  userId: string;

  title: string;
  description: string;
  price: number;
  pricePer: string;
}


export async function POST(req: NextRequest, res: NextResponse) {
  await initMongoose();

  const session = await getServerSession(authOptions);

  const { userId, title, description, price, pricePer }: PostRequestType =
    await req.json();
  if (!title || !description || !price || !pricePer) {
    return NextResponse.json({
      status: 400,
      message: "Wszystie pola są wymagane",
    });
  }
  if (!userId) {
    return NextResponse.json({
      status: 400,
      message: "Nie znaleziono trenera z twoimi danymi",
    });
  }
  if (session?.user._id !== userId) {
    return NextResponse.json({
      status: 403,
      message: "Nie masz uprawnień do dodania tej oferty",
    });
  }

  const trainerData: null | HydratedDocument<TrainerDataType> =
    await TrainerData.findOne({ userId: userId }).exec();

  if (!trainerData) {
    return NextResponse.json({
      status: 400,
      message: "Nie znaleziono trenera z twoimi danymi",
    });
  }

  const newOffer: Omit<TrainerOfferType, "_id"> = {
    title,
    description,
    price: price.toString(),
    pricePer,
  };

  try {
    // ts is salty because i didnt provide object id but mongoose does this automatically
    // @ts-expect-error
    trainerData.offers.push(newOffer);
    await trainerData.save();

    return NextResponse.json({}, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      { message: "Błąd podczas dodawania oferty" },
      { status: 400 }
    );
  }
}

export async function PATCH(req: NextRequest, res: NextResponse) {
  await initMongoose();

  const session = await getServerSession(authOptions);

  const {
    userId,
    title,
    description,
    price,
    pricePer,
    offerId,
  }: PatchRequestType = await req.json();
  if (!title || !description || !price || !pricePer) {
    return NextResponse.json({
      status: 400,
      message: "Wszystie pola są wymagane",
    });
  }
  if (!userId) {
    return NextResponse.json({
      status: 400,
      message: "Nie znaleziono trenera z twoimi danymi",
    });
  }
  if (session?.user._id !== userId) {
    return NextResponse.json({
      status: 403,
      message: "Nie masz uprawnień do edytowania tej oferty",
    });
  }

  const trainerData: null | HydratedDocument<TrainerDataType> =
    await TrainerData.findOne({ userId: userId }).exec();

  if (!trainerData) {
    return NextResponse.json({
      status: 400,
      message: "Nie znaleziono trenera z twoimi danymi",
    });
  }

  const offerBeingEdited = trainerData.offers.find(
    (offer) => JSON.stringify(offer._id) === offerId
  );

  if (!offerBeingEdited) {
    return NextResponse.json({
      status: 400,
      message: "Oferta którą chcesz edytować nie istnieje",
    });
  }

  offerBeingEdited.title = title;
  offerBeingEdited.description = description;
  offerBeingEdited.price = price.toString();
  offerBeingEdited.pricePer = pricePer;

  try {
    await trainerData.save();

    return NextResponse.json({}, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      { message: "Błąd podczas edytowania oferty" },
      { status: 400 }
    );
  }
}

export async function DELETE(req: NextRequest, res: NextResponse) {
  await initMongoose();

  const session = await getServerSession(authOptions);

  const { userId, offerId } = await req.json();
  if (!userId) {
    return NextResponse.json({
      status: 400,
      message: "Nie znaleziono trenera z twoimi danymi",
    });
  }
  if (session?.user._id !== userId) {
    return NextResponse.json({
      status: 403,
      message: "Nie masz uprawnień do usunięcia tej oferty",
    });
  }

  const trainerData: null | HydratedDocument<TrainerDataType> =
    await TrainerData.findOne({ userId: userId }).exec();

  if (!trainerData) {
    return NextResponse.json({
      status: 400,
      message: "Nie znaleziono trenera z twoimi danymi",
    });
  }

  try {
    (trainerData.offers = trainerData.offers.filter(
      (offer) => JSON.stringify(offer._id) !== JSON.stringify(offerId)
    )),
      await trainerData.save();

    return NextResponse.json({}, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      { message: "Błąd podczas usuwania oferty" },
      { status: 400 }
    );
  }
}

import User from "@/model/user";
import initMongoose from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import TrainerData, {
  PopulatedTrainerDataType,
  TrainerDataType,
} from "@/model/trainerData";
import mongoose, { HydratedDocument } from "mongoose";
import { TrainerOfferType } from "@/model/trainerDataSubSchemas/trainerOffer";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";
import {
  NewTrainerTestimonialType,
  TrainerTestimonialType,
} from "@/model/trainerDataSubSchemas/trainerTestimonial";

interface PostRequestType {
  userId: string;

  title: string;
  description: string;
  photoUrls: string[];
  photoAlts: string[];
  transformation: boolean;
}
interface PatchRequestType {
  userId: string;
  testimonialId: string;

  title: string;
  description: string;
  photoUrls: string[];
  photoAlts: string[];
  transformation: boolean;
}

export async function POST(req: NextRequest, res: NextResponse) {
  await initMongoose();

  const session = await getServerSession(authOptions);

  const {
    userId,
    title,
    description,
    photoUrls,
    photoAlts,
    transformation,
  }: PostRequestType = await req.json();
  if (!title || !description) {
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
      message: "Nie masz uprawnień do dodania tego efektu",
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

  console.log(photoUrls);

  const newTestimonial: NewTrainerTestimonialType = {
    title,
    description,
    photoUrl: photoUrls,
    photoAlt: [""],
    transformation: transformation || false,
  };

  try {
    // ts is salty because i didnt provide object id but mongoose does this automatically
    // @ts-expect-error
    trainerData.testimonials = [...trainerData.testimonials, newTestimonial];
    await trainerData.save();

    return NextResponse.json({}, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { message: "Błąd podczas dodawania efektu" },
      { status: 400 }
    );
  }
}

export async function PATCH(req: NextRequest, res: NextResponse) {
  await initMongoose();

  const session = await getServerSession(authOptions);

  const {
    userId,
    testimonialId,

    title,
    description,
    transformation,
    photoAlts,
    photoUrls,
  }: PatchRequestType = await req.json();
  if (!title || !description) {
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

  const testimonialBeingEdited = trainerData.testimonials.find(
    (testimonial) => JSON.stringify(testimonial._id) === testimonialId
  );

  if (!testimonialBeingEdited) {
    return NextResponse.json({
      status: 400,
      message: "Oferta którą chcesz edytować nie istnieje",
    });
  }

  testimonialBeingEdited.title = title;
  testimonialBeingEdited.description = description;
  testimonialBeingEdited.photoUrl = photoUrls;
  testimonialBeingEdited.transformation = transformation;

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

  const { userId, testimonialId } = await req.json();
  if (!userId) {
    return NextResponse.json({
      status: 400,
      message: "Nie znaleziono trenera z twoimi danymi",
    });
  }
  if (session?.user._id !== userId) {
    return NextResponse.json({
      status: 403,
      message: "Nie masz uprawnień do usunięcia tego efektu",
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
    (trainerData.testimonials = trainerData.testimonials.filter(
      (testimonial) =>
        JSON.stringify(testimonial._id) !== JSON.stringify(testimonialId)
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

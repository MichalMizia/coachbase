import { Schema, Types } from "mongoose";

export const TrainerOfferSchema = new Schema<TrainerOfferType>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  pricePer: {
    type: String,
    required: true,
  },
  photoUrl: String,
  photoAlt: String,
});

export interface TrainerOfferType {
  _id: Types.ObjectId;
  title: string;
  description: string;
  price: string;
  pricePer: string;
  photoUrl?: string;
  photoAlt?: string;
}

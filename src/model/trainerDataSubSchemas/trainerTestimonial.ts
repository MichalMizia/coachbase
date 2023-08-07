import { Schema, Types } from "mongoose";

export const TrainerTestimonialSchema = new Schema<TrainerTestimonialType>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    transformation: {
      type: Boolean,
      default: false,
      required: true,
    },
    photoUrl: String,
    photoAlt: String,
  },
  {
    _id: false,
  }
);

export interface TrainerTestimonialType {
  _id: Types.ObjectId;
  title: string;
  description: string;
  photoUrl?: string | string[];
  photoAlt?: string | string[];
  transformation: boolean;
}

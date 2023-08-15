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
    photoUrl: [Schema.Types.String],
    photoAlt: [Schema.Types.String],
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export interface NewTrainerTestimonialType {
  title: string;
  description: string;
  photoUrl: string[];
  photoAlt: string[];
  transformation: boolean;
}

export interface TrainerTestimonialType extends NewTrainerTestimonialType {
  _id: Types.ObjectId;
  createdAt: Date;
}

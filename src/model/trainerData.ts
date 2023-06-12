import { Schema, model, models } from "mongoose";
import { UserRolesType } from "./user";

const TrainerDataSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    content: {
      type: String,
      required: true,
    },
    offers: [
      {
        offerTitle: {
          type: String,
          required: true,
        },
        offerDescription: {
          type: String,
          required: true,
        },
        offerPhotoUrl: {
          type: String,
          required: true,
        },
      },
    ],
    roles: Array,
    testimonials: [
      {
        testimonialRating: {
          type: Number,
        },
        testimonialDescription: {
          type: String,
          required: true,
        },
        testimonialPhotoUrl: {
          type: String,
          required: true,
        },
        testimonialPostedById: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: "User",
        },
      },
    ],
  },
  {
    collection: "TrainerData",
    timestamps: { createdAt: true, updatedAt: false },
  }
);

const TrainerData =
  models?.TrainerData || model("TrainerData", TrainerDataSchema);

export default TrainerData;

export interface TrainerOfferType {
  offerTitle: string;
  offerDescription: string;
  offerPhotoUrl: string;
}
export interface TrainerTestimonialType {
  testimonialTitle: string;
  testimonialDescription: string;
  testimonialPhotoUrl: string;
  testimonialPostedById: string;
}

export interface TrainerDataType {
  userId: string;
  content: string;
  offers?: TrainerOfferType[];
  roles: UserRolesType;
  testimonials?: TrainerTestimonialType[];
}

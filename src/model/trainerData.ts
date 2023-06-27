import { Schema, model, models } from "mongoose";
import { UserRolesType } from "./user";
import { string } from "zod";

const TrainerDataSchema = new Schema(
  {
    userSlug: {
      type: Schema.Types.String,
      required: true,
      ref: "User",
    },
    heroSection: {
      image: String,
      content: {
        type: String,
        required: true,
      },
    },
    tags: {
      type: [String],
      required: true,
      default: [],
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
    // testimonials: [
    //   {
    //     testimonialRating: {
    //       type: Number,
    //     },
    //     testimonialDescription: {
    //       type: String,
    //       required: true,
    //     },
    //     testimonialPhotoUrl: {
    //       type: String,
    //       required: true,
    //     },
    //     testimonialPostedById: {
    //       type: Schema.Types.ObjectId,
    //       required: true,
    //       ref: "User",
    //     },
    //   },
    // ],
    socialMedia: {
      instagram: {
        type: String,
        default: "",
      },
      facebook: {
        type: String,
        default: "",
      },
      email: {
        type: String,
        default: "",
      },
    },
  },
  {
    collection: "TrainerData",
    timestamps: false,
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
export type SocialMediaOptions = "Instagram" | "Facebook" | "Email";
export interface SocialMediaType {
  instagram: string;
  facebook: string;
  email: string;
}

export interface HeroSectionType {
  image?: string;
  content: string;
}

export interface TrainerDataType {
  userSlug: string;
  heroSection: HeroSectionType;
  offers?: TrainerOfferType[];
  socialMedia?: SocialMediaType;
  tags: string[];
  // testimonials?: TrainerTestimonialType[]
}

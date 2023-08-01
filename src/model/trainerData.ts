import { Schema, Types, model, models } from "mongoose";

const TrainerDataSchema = new Schema<TrainerDataType>(
  {
    userSlug: {
      type: Schema.Types.String,
      required: true,
      ref: "User",
    },
    userId: {
      type: Schema.Types.ObjectId,
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
    offers: {
      type: [
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
      required: true,
      default: [],
    },
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
  models?.TrainerData ||
  model<TrainerDataType>("TrainerData", TrainerDataSchema);

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
  userId: Types.ObjectId;
  heroSection: HeroSectionType;
  offers: TrainerOfferType[];
  socialMedia: SocialMediaType;
  // tags: string[];
  // testimonials?: TrainerTestimonialType[]
}

export interface TrainerMediaType {
  socialMedia: SocialMediaType;
  tags?: string[];
  city?: string;
}

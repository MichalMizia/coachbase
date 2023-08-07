import { Schema, Types, model, models } from "mongoose";
import { TrainerType } from "./user";
import {
  TrainerOfferSchema,
  TrainerOfferType,
} from "./trainerDataSubSchemas/trainerOffer";
import {
  TrainerFAQQuestionType,
  TrainerFAQSchema,
} from "./trainerDataSubSchemas/trainerFaq";
import {
  TrainerReviewSchema,
  TrainerReviewType,
} from "./trainerDataSubSchemas/trainerReview";
import {
  TrainerTestimonialSchema,
  TrainerTestimonialType,
} from "./trainerDataSubSchemas/trainerTestimonial";

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
    // trainer options
    offers: {
      type: [TrainerOfferSchema],
      required: true,
      default: [],
    },
    faq: {
      type: [TrainerFAQSchema],
      required: true,
      default: [],
    },
    testimonials: {
      type: [TrainerTestimonialSchema],
      required: true,
      default: [],
    },
    reviews: {
      type: [TrainerReviewSchema],
      required: true,
      default: [],
    },
    images: {
      type: [String],
      required: true,
      default: [],
    },
    // sections: {
    //   type: [
    //     {
    //       offerTitle: {
    //         type: String,
    //         required: true,
    //       },
    //       offerDescription: {
    //         type: String,
    //         required: true,
    //       },
    //       offerPrice: {
    //         type: String,
    //         required: true,
    //       },
    //       offerFields: {
    //         pricePer: String,
    //         amountOfWorkouts: String,
    //         duration: String,
    //       },
    //       offerId: {
    //         type: Schema.Types.ObjectId,
    //         required: true,
    //       },
    //     },
    //   ],
    //   required: true,
    //   default: [],
    // },

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

export interface SocialMediaType {
  instagram: string;
  facebook: string;
  email: string;
}

export interface Image {
  url: string;
  alt?: string;
}

export interface TrainerSectionType {
  required: boolean;
  name: string;
  content: string;
  images: Image[];
  layout: string;
}

export interface TrainerDataType {
  // these allow for identyfying and populating the user
  userSlug: string;
  userId: Types.ObjectId;
  bio?: string;
  // array options
  offers: TrainerOfferType[];
  faq: TrainerFAQQuestionType[];
  reviews: TrainerReviewType[];
  testimonials: TrainerTestimonialType[];

  // all images that a trainer has posted and their social media links
  images: Image[];
  socialMedia: SocialMediaType;
}

export interface PopulatedTrainerDataType
  extends Omit<TrainerDataType, "userId"> {
  userId: TrainerType;
}

// interface for the page where users can update their socialMedia tags and city
export interface TrainerMediaType {
  socialMedia: SocialMediaType;
  tags?: string[];
  city?: string;
}

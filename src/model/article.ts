import { Schema, Types, model, models } from "mongoose";
import { TrainerType } from "./user";

const ArticleSchema = new Schema<ArticleType>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    summary: String,
    tags: { type: [String], required: true },
    published: { type: Boolean, required: true },
    slug: String,
    photoUrl: String,
    photoAlt: String,
    impressions: {
      type: Number,
      default: 0,
    },
  },
  { collection: "Articles", timestamps: true }
);

const Article = models?.Article || model<ArticleType>("Article", ArticleSchema);

type Published = {
  published: true;
  slug: string;
};
type UnPublished = {
  published: false;
  slug: "";
};

export type ArticleType = {
  _id: string;
  summary: string;
  userId: Types.ObjectId;
  title: string;
  content: string;
  photoUrl?: string;
  photoAlt?: string;
  impressions: number;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
} & (UnPublished | Published);

export interface PopulatedArticleType extends Omit<ArticleType, "userId"> {
  userId: TrainerType;
}

export default Article;

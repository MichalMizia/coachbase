import { model, models } from "mongoose";
import { Schema, Types } from "mongoose";

export const NewsSchema = new Schema<NewsType>(
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
    photoUrl: {
      type: String,
      required: false,
    },
    content: {
      type: String,
      required: true,
    },
    impressions: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

const News = models?.News || model<NewsType>("News", NewsSchema);

export interface NewsType {
  // defaults from mongooose
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  userId: Types.ObjectId;
  // main stuff of news
  title: string;
  content: string;
  photoUrl?: string;
  impressions: number;
}

export default News;

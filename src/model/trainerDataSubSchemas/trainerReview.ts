import { Schema, Types } from "mongoose";

export const TrainerReviewSchema = new Schema<TrainerReviewType>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    userAvatar: String,
    isTrainer: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: { createdAt: true, updatedAt: false }, versionKey: false }
);

export interface TrainerReviewType {
  _id: Types.ObjectId;
  username: string;
  userAvatar?: string;
  userId: Types.ObjectId;
  description: string;
  rating: number;
  isTrainer: boolean;
  createdAt: Date;
}

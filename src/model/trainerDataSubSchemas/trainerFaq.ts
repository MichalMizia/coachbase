import { Schema, Types } from "mongoose";

export const TrainerFAQSchema = new Schema<TrainerFAQQuestionType>(
  {
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
  },
  {
    _id: false,
  }
);

export interface TrainerFAQQuestionType {
  question: string;
  answer: string;
}

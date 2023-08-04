import { Schema, Types, model, models } from "mongoose";

const AdviceSchema = new Schema<AdviceType>(
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
    answers: [
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
      },
    ],
  },
  { collection: "Advices", timestamps: true }
);

const Advice = models?.Advice || model<AdviceType>("Advice", AdviceSchema);

export type AdviceAnswerType = {
  userId: Types.ObjectId;
  content: string;
};

export type AdviceType = {
  _id: string;
  userId: Types.ObjectId;
  title: string;
  content: string;
  answers: AdviceAnswerType[];
};

export default Advice;

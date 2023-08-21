import { Schema, model, models } from "mongoose";

const EmailListSchema = new Schema<EmailListType>(
  {
    email: {
      type: String,
      required: true,
    },
    isTrainer: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    collection: "EmailList",
    timestamps: false,
  }
);

const EmailList =
  models?.EmailList || model<EmailListType>("EmailList", EmailListSchema);

export default EmailList;

interface EmailListType {
  email: string;
  isTrainer: boolean;
}

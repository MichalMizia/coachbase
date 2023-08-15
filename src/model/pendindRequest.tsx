import { Schema, model, models } from "mongoose";
import { UserRolesType } from "./user";

const PendingRequestSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    city: String,
    summary: String,
    roles: Array,
  },
  { collection: "PendingRequests" }
);

export const PendingRequest =
  models?.PendingRequest || model("PendingRequest", PendingRequestSchema);

export interface PendingRequestType {
  username: string;
  email: string;
  roles: UserRolesType[];
  summary: string;
  link: string;
  city: string;
}

export default PendingRequest;

import { Schema, model, models } from "mongoose";
const bcrypt = require("bcrypt");

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isTrainer: {
      type: Boolean,
      default: false,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    summary: String,
    roles: Array,
    slug: String,
  },
  { collection: "Users", timestamps: true }
);

UserSchema.methods.comparePassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = models?.User || model("User", UserSchema);

export type UserRolesType = "Trener" | "Dietetyk" | "Fizjoterapeuta";

export interface UserType {
  _id?: string;
  emailVerified?: boolean;
  username: string;
  email: string;
  password: string;
  isTrainer: boolean;
}
export interface TrainerType extends UserType {
  roles: UserRolesType[];
  summary: string;
  slug: string;
}

export default User;

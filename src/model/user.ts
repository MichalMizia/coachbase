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
    image: String,
    city: String,
    slug: String,
    summary: String,
    roles: Array,
  },
  { collection: "Users", timestamps: { createdAt: true, updatedAt: false } }
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
  image: string | null;
  // createdAt: Date;
}
export interface TrainerType extends UserType {
  roles: UserRolesType[];
  summary: string;
  slug: string;
  city: string;
}

export default User;

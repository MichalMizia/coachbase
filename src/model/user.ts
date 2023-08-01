import { Schema, model, models } from "mongoose";
const bcrypt = require("bcrypt");

const UserSchema = new Schema<IUser>(
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
      required: true,
    },
    emailVerified: {
      type: Boolean,
      default: false,
      required: true,
    },
    tags: [String],
    roles: [String],
    rating: Number,
    image: String,
    avatar: String,
    city: String,
    slug: String,
    summary: String,
  },
  { collection: "Users", timestamps: { createdAt: true, updatedAt: false } }
);

UserSchema.methods.comparePassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = models?.User || model("User", UserSchema);

export type UserRolesType = "Trener" | "Dietetyk" | "Fizjoterapeuta";

export interface UserType {
  _id: string;
  emailVerified: boolean;
  username: string;
  email: string;
  password: string;
  image: string | null;
  avatar: string | null;
  isTrainer: false;
}
export interface TrainerType {
  _id: string;
  emailVerified: boolean;
  username: string;
  email: string;
  password: string;
  image: string | null;
  avatar: string | null;
  tags: string[] | null;
  rating: number | null;
  isTrainer: true;
  roles: UserRolesType[];
  summary: string;
  slug: string;
  city: string;
}

export type IUser = UserType | TrainerType;

export default User;

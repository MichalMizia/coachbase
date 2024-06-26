import { DefaultSession, DefaultUser, Session, User } from "next-auth";
import { DefaultJWT, JWT } from "next-auth/jwt";

interface IUser extends Omit<DefaultUser, "name" | "id"> {
  isTrainer: boolean;
  _id: string;
  username: string;
}

declare module "next-auth" {
  interface User extends Omit<DefaultUser, "name" | "id"> {
    isTrainer: boolean;
    _id: string;
    username: string;
  }

  interface Session extends DefaultSession {
    user: User;
  }
}

declare module "next-auth/JWT" {
  interface JWT extends IUser {}
}

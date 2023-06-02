import { Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: User & {
      /** The user's id and role */
      _id: string;
      role: "Trener" | "User";
    };
  }

  interface User {
    isTrainer: boolean;
    username: string;
    _id: string;
  }
}

declare module "next-auth/JWT" {
  interface JWT {
    /** The user's id and role */
    _id: string;
    username: string;
    role: "Trener" | "User";
  }
}

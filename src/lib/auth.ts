import initMongoose from "./db/db";
import User, { UserType } from "@/model/user";

import Credentials from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  // Here we add our login providers
  providers: [
    Credentials({
      name: "credentials",
      // The credentials object is what's used to generate Next Auths default login page - We will not use it however.
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      // Authorize callback is ran upon calling the signin function
      async authorize(credentials, req) {
        initMongoose();

        // Try to find the user and also return the password field
        const user = await User.findOne({ email: credentials?.email }).exec();

        if (!user) {
          throw new Error("No user with a matching email was found.");
        }

        // Use the comparePassword method we defined in our user.js Model file to authenticate
        const pwValid = await user.comparePassword(credentials?.password);

        if (!pwValid) {
          throw new Error("Your password is invalid");
        }

        console.log(user);
        return user;
        // return user;
      },
    }),
  ],
  // All of this is just to add user information to be accessible for our app in the token/session
  callbacks: {
    // We can pass in additional information from the user document MongoDB returns
    // This could be avatars, role, display name, etc...
    async jwt({ token, user }) {
      if (user) {
        console.log("User when setting token: ", user);
        token.email = user.email;
        token._id = user._id;
        token.name = user.username;
        if (user.isTrainer) {
          token.role = "Trener";
        } else {
          token.role = "User";
        }
        token.picture = user.image;
      }

      return token;
    },
    // If we want to access our extra user info from sessions we have to pass it the token here to get them in sync:
    async session({ session, token }) {
      if (token) {
        console.log("Token: ", token);
        session.user._id = token._id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    // Here you can define your own custom pages for login, recover password, etc.
    signIn: "/login", // we are going to use a custom login page (we'll create this in just a second)
  },
};

export default authOptions;

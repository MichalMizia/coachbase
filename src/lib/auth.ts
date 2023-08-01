// @ts-nocheck

import initMongoose from "./db";
import User, { UserType } from "@/model/user";

import Credentials from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import { GetSessionParams } from "next-auth/react";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 3 * 24 * 60 * 60,
  },
  jwt: {
    maxAge: 3 * 24 * 60 * 60,
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
        const user = await User.findOne({ email: credentials?.email });
        console.log("User when fetching: ", user);

        if (!user) {
          throw new Error("No user with a matching email was found.");
        }

        // Use the comparePassword method we defined in our user.js Model file to authenticate
        const pwValid = await user.comparePassword(credentials?.password);

        if (!pwValid) {
          throw new Error("Your password is invalid");
        }

        return user._doc;
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
        token.email = user.email;
        token._id = user._id;
        token.username = user.username;
        token.isTrainer = user.isTrainer;
        token.picture = user.image;
      }

      return token;
    },
    // If we want to access our extra user info from sessions we have to pass it the token here to get them in sync:
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
        session.user.username = token.username;
        session.user.email = token.email;
        session.user.image = token.picture;
        session.user.isTrainer = token.isTrainer;
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

export const getSessionParams: GetSessionParams = {
  req: authOptions,
};

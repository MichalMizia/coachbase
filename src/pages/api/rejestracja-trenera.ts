import initMongoose from "@/lib/db";
import { isStringUnsafe } from "@/lib/utils";
import PendingRequest from "@/model/pendindRequest";
import User, { TrainerType } from "@/model/user";
import { NextApiRequest, NextApiResponse } from "next";
const bcrypt = require("bcrypt");

export interface TrainerRequestType extends TrainerType {
  link?: string;
  city: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //post request
  if (req.method === "POST") {
    try {
      await initMongoose();
    } catch (e) {
      console.log("Failed connecting to database: ", e);
      return res.status(500).json({ message: "Failed connecting to database" });
    }

    // console.log("Mongoose connected while registering a trainer");
    // await trainerController.addNewTrainer(req, res);
    const {
      username,
      email,
      password,
      roles,
      summary,
      link,
      city,
    }: TrainerRequestType = req.body;
    console.log(
      "User data from trainer controller: \n",
      username,
      email,
      password,
      summary,
      roles,
      link,
      city
    );

    if (!username || !email || !password || !city) {
      return res.status(400).json({ message: "Wszystkie pola są wymagane" });
    }

    if (isStringUnsafe([username, city, summary, ...roles])) {
      return res.status(400).json({ message: "No hack here buddy" });
    }

    if (!roles || roles.length === 0 || !Array.isArray(roles)) {
      return res
        .status(400)
        .json({ message: "Konto trenera musi mieć podane role" });
    }

    if (!summary || summary.length < 40 || summary.length > 250) {
      return res
        .status(400)
        .json({ message: "Konto trenera musi mieć krótki opis" });
    }

    const duplicateUsername = await User.findOne({ username: username })
      .lean()
      .exec();
    if (duplicateUsername) {
      return res.status(409).json({ message: "Konto z tą nazwą już istnieje" });
    }
    const duplicateEmail = await User.findOne({ email: email }).lean().exec();
    if (duplicateEmail) {
      return res
        .status(409)
        .json({ message: "Do tego adresu email przypisane jest już konto" });
    }

    const hashedPwd = await bcrypt.hash(password, 10); //10 is the number of hash salts

    try {
      const userPromise = User.create({
        username,
        email,
        password: hashedPwd,
        isTrainer: false,
        emailVerified: false,
      });
      // when accepting the request the summary, roles, isTrainer is added to the user profile

      const pendingRequestPromise = PendingRequest.create({
        username,
        email,
        summary,
        link,
        roles,
        city,
      });

      const [user, pendindRequest] = await Promise.allSettled([
        userPromise,
        pendingRequestPromise,
      ]);
      console.log(user, pendindRequest);

      if (user && pendindRequest) {
        return res
          .status(201)
          .json({ message: `Utworzono konto trenera: ${username}` });
      } else {
        return res
          .status(400)
          .json({ message: "Błąd podczas tworzenia konta trenerskiego" });
      }
    } catch (e) {
      return res
        .status(400)
        .json({ message: "Błąd podczas tworzenia konta trenerskiego" });
    }
  }
  //   else if (req.method === "PATCH") {
  //     // PATCH method for updating
  //     try {
  //       await initMongoose();
  //     } catch (e) {
  //       console.log("Failed connecting to database: ", e);
  //       return res.status(500).json({ message: "Failed connecting to database" });
  //     }

  //     console.log("Mongoose connected while registering a user");
  //     try {
  //       await registerController.updateUsername(req, res);
  //     } catch (e) {
  //       return res.status(400).json({ message: "Błąd przy tworzeniu konta" });
  //     }
  //   }

  //   different methods are not supported
}

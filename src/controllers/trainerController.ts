const bcrypt = require("bcrypt");
import User, { TrainerType } from "@/model/user";
import { NextApiRequest, NextApiResponse } from "next";
import PendingRequest from "@/model/pendindRequest";
import { isStringUnsafe } from "@/lib/utils";

export interface TrainerRequestType extends TrainerType {
  link?: string;
  city: string;
}

const addNewTrainer = async (req: NextApiRequest, res: NextApiResponse) => {
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

  console.log(userPromise, pendingRequestPromise);
  const [user, pendindRequest] = await Promise.all([
    userPromise,
    pendingRequestPromise,
  ]);
  console.log(user, pendindRequest);

  if (user && pendindRequest) {
    return res
      .status(201)
      .json({ message: `Utworzono konto trenera: ${username}` });
  } else {
    return res.status(400).json({ message: "Nieudało się utworzyć konta" });
  }
};

export const trainerController = {
  addNewTrainer,
};

import { registerController } from "@/controllers/userController";
import initMongoose from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

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

    try {
      await registerController.addNewUser(req, res);
    } catch (e) {
      return res.status(400).json({ message: "Błąd przy tworzeniu konta" });
    }
  } else if (req.method === "PATCH") {
    // PATCH method for updating
    try {
      await initMongoose();
    } catch (e) {
      console.log("Failed connecting to database: ", e);
      return res.status(500).json({ message: "Failed connecting to database" });
    }

    console.log("Mongoose connected while registering a user");
    try {
      await registerController.updateUsername(req, res);
    } catch (e) {
      return res.status(400).json({ message: "Błąd przy tworzeniu konta" });
    }
  }

  //   different methods are not supported
}

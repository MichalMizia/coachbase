import { registerController } from "@/controllers/userController";
import initMongoose from "@/lib/db";
import { isEmailUnsafe, isStringUnsafe } from "@/lib/utils";
import User from "@/model/user";
import { NextApiRequest, NextApiResponse } from "next";
const bcrypt = require("bcrypt");

interface newUser {
  username: string;
  email: string;
  password: string;
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

    try {
      const { username, email, password }: newUser = req.body;

      if (!username || !email || !password) {
        return res.status(400).json({ message: "Wszystkie pola są wymagane" });
      }
      if (isStringUnsafe(username) || isEmailUnsafe(email)) {
        return res.status(400).json({ message: "No hack here buddy" });
      }

      const duplicateUsername = await User.findOne({ username: username })
        .lean()
        .exec();
      if (duplicateUsername) {
        return res
          .status(409)
          .json({ message: "Konto z tą nazwą już istnieje" });
      }
      const duplicateEmail = await User.findOne({ email: email }).lean().exec();
      if (duplicateEmail) {
        return res
          .status(409)
          .json({ message: "Do tego adresu email przypisane jest już konto" });
      }

      const hashedPwd = await bcrypt.hash(password, 10); //10 is the number of hash salts

      // kiedy uzytkownik nie jest trenerem
      const user = await User.create({
        username,
        password: hashedPwd,
        email,
        isTrainer: false,
        emailVerified: false,
      });

      if (user) {
        return res
          .status(200)
          .json({ message: `Utworzono konto: ${username}` });
      } else {
        return res
          .status(400)
          .json({ message: "Błąd podczas tworzeniu konta użytkownika" });
      }
      // await registerController.addNewUser(req, res);
    } catch (e) {
      return res
        .status(400)
        .json({ message: "Błąd podczas tworzeniu konta użytkownika" });
    }
  } else {
    return res
      .status(405)
      .json({ mesage: "Metody inne niż post nie są dozwolone" });
  }

  //   different methods are not supported
}

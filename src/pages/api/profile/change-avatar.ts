import { NextApiRequest, NextApiResponse } from "next";
import User, { IUser } from "@/model/user";
import initMongoose from "@/lib/db";
import { uploadToS3 } from "@/lib/uploadToS3";
import mongoose, { HydratedDocument } from "mongoose";
import { JWT, getToken } from "next-auth/jwt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //post request
  let token: JWT | null = null;
  try {
    token = await getToken({ req });

    if (!token?._id) {
      throw new Error();
    }
  } catch (e: any) {
    return res.status(400).json({
      message: e?.message || "Zaloguj się aby zmienić zdjęcie profilowe",
    });
  }
  if (req.method === "POST") {
    try {
      await initMongoose();
      const user: HydratedDocument<IUser> | null = await User.findById(
        token._id
      ).exec();

      console.log(user);
      if (!user) {
        return res.status(400).json({ message: "Nie ma takiego użytkownika" });
      }

      const body = await uploadToS3(req);
      const resultURL = body.file[0].newFilename;

      if (!resultURL) {
        return res
          .status(400)
          .json({ message: "Błąd podczas dodawania zdjęcia" });
      }
      user.avatar = resultURL;

      await user.save();
    } catch (e) {
      return res
        .status(400)
        .json({ message: "Błąd przy zmianie zdjęcia użytkownika" });
    }

    return res.status(200).json({ message: "Zdjęcie zmienione" });
  }

  return res
    .status(405)
    .json({ message: "Methods other than post are not allowed" });
  //   different methods are not supported
}

export const config = {
  api: {
    bodyParser: false,
  },
};

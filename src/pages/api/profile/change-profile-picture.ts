import { NextApiRequest, NextApiResponse } from "next";
import multiparty from "multiparty";
import axios from "axios";
import User from "@/model/user";
import initMongoose from "@/lib/db/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //post request
  if (req.method === "POST") {
    const form = new multiparty.Form();
    const data: any = await new Promise((resolve, reject) => {
      form.parse(req, function (err, fields, files) {
        if (err) reject({ err });
        resolve({ fields, files });
      });
    });
    const id = data.fields.id[0];
    console.log("id: ", id);
    let user = null;
    try {
      await initMongoose();
      user = await User.findOne({ _id: id }).exec();
    } catch (e) {
      return res
        .status(400)
        .json({ message: "Nie można znaleźć użytkownika z tym id" });
    }
    console.log("User: ", user);
    const path = data.files.image[0].path;
    const fileName = data.files.image[0].originalFilename;
    if (!path || !fileName) {
      return res.status(400).json({ message: "Brak pliku lub nazwy pliku" });
    }
    console.log(`Path`, path);
    console.log(`Name`, fileName);

    const isProduction = process.env.NODE_ENV === "production";
    let fileRes = null;
    if (!isProduction) {
      fileRes = await axios.post(
        "http://localhost:3000/api/upload-file-from-path",
        {
          path: path,
          name: fileName,
        }
      );
    } else {
      fileRes = await axios.post(
        "https://coachbase.vercel.app/api/upload-file-from-path",
        {
          path: path,
          name: fileName,
        }
      );
    }
    if (fileRes.statusText !== "OK") {
      return res.status(400).json({ message: "Błąd przy dodawaniu zdjęcia" });
    }

    const resultURL: string = fileRes.data.resultURL;
    user.image = resultURL;
    try {
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

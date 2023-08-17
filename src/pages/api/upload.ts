import { uploadToS3 } from "@/lib/uploadToS3";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    if (req.headers["content-type"]?.includes("multipart/form-data")) {
      try {
        let body = await uploadToS3(req);
        const urls = body.file.map((file) => file.newFilename);
        return res.status(200).json({ resultURLS: urls });
      } catch (e: any) {
        return res
          .status(400)
          .json({ message: e?.message || "Nie udało się dodać zdjęcia" });
      }
    } else {
      return res.status(400).json({ message: "Nie udało się dodać zdjęcia" });
    }
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

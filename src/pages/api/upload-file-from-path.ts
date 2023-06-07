import { NextApiRequest, NextApiResponse } from "next";
import uploadToGoogleDrive from "@/lib/uploadToGoogleDrive";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //post request
  if (req.method === "POST") {
    const { path, name } = req.body;
    if (!path || !name) {
      return res.status(400).json({ message: "Request error" });
    }

    const resultURL = await uploadToGoogleDrive(path, name);
    if (!resultURL) {
      return res.status(400).json({ message: "Request error" });
    }

    return res
      .status(200)
      .json({ message: "File creation succeeded", resultURL: resultURL });
  }

  return res
    .status(405)
    .json({ message: "Methods other than post are not allowed" });
  //   different methods are not supported
}

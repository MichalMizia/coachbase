import { NextApiRequest, NextApiResponse } from "next";
import multiparty from "multiparty";

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
    console.log(`data: `, JSON.stringify(data));
    const files = data?.files;

    return res.status(200).json({ message: "Hello" });
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

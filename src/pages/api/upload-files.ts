// import { NextApiRequest, NextApiResponse } from "next";
// import multiparty from "multiparty";
// import uploadToGoogleDrive from "@/lib/uploadToGoogleDrive";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   //post request
//   if (req.method === "POST") {
//     const form = new multiparty.Form();
//     const data: any = await new Promise((resolve, reject) => {
//       form.parse(req, function (err, fields, files) {
//         if (err) reject({ err });
//         resolve({ fields, files });
//       });
//     });
//     const path = data.files.image[0].path;
//     const fileName = data.files.image[0].originalFilename;

//     if (!path || !fileName) {
//       return res.status(400).json({ message: "Brak pliku lub nazwy pliku" });
//     }
//     console.log(`Path`, path);
//     console.log(`Name`, fileName);

//     const resultURL: string | null = await uploadToGoogleDrive(path, fileName);
//     if (!resultURL) {
//       return res.status(400).json({ message: "Błąd przy dodawaniu pliku" });
//     }

//     return res
//       .status(200)
//       .json({ message: "Zdjęcie dodane pomyślnie", resultURL: resultURL });
//   }

//   return res
//     .status(405)
//     .json({ message: "Methods other than post are not allowed" });
//   //   different methods are not supported
// }

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

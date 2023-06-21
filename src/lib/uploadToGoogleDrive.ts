import { google } from "googleapis";
import * as fs from "fs";

const authClient = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URL
);

authClient.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});


export default async function uploadToGoogleDrive(
  filePath: string,
  name: string
): Promise<void | string> {
  const drive = google.drive({ version: "v3", auth: authClient });

  try {
    const res = await drive.files.create({
      requestBody: {
        mimeType: "image/jpeg",
        name: name,
      },
      media: {
        mimeType: "image/jpeg",
        body: fs.createReadStream(filePath),
      },
    });
    console.log(res)

    const id = res.data.id;
    if (!id) {
      throw new Error("E");
    }
    await drive.permissions.create({
      fileId: id,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
    });

    const fileData = await drive.files.get({
      fileId: id,
      fields: "webViewLink, webContentLink",
    });
    if (!fileData.data.webViewLink) {
      throw new Error("E");
    }
    const resultID = fileData.data.webViewLink.split("/")[5];
    const BASE_URL = "https://drive.google.com/uc?export=view&id=";
    const resultURL = BASE_URL.concat(resultID);

    console.log("Result URL: ", resultURL);
    return resultURL;
  } catch (e) {
    console.log("Error when creating new file");
  }
}

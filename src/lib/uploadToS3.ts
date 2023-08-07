// @ts-nocheck

import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import formidable, { File, Files } from "formidable";
import { NextApiRequest } from "next";
import { PassThrough, Transform } from "stream";

const accessKeyId = process.env.AMAZON_ACCESS_KEY_ID;
const secretAccessKey = process.env.AMAZON_ACCESS_KEY;
const bucketName = process.env.AMAZON_BUCKET;

if (!accessKeyId || !secretAccessKey || !bucketName) {
  throw new Error("Define the Amazon ENV variables");
}

const s3 = new S3Client({
  region: "eu-central-1",
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

interface ResType {
  file: File[];
}

export const uploadToS3 = async (req: NextApiRequest): Promise<ResType> => {
  const s3Uploads: Promise<any>[] = [];

  return new Promise((resolve, reject) => {
    function fileWriteStreamHandler(file: File) {
      const body = new PassThrough();

      const upload = new Upload({
        client: s3,
        params: {
          Bucket: process.env.AMAZON_BUCKET as string,
          Key: `files/${file.originalFilename}`,
          ContentType: file.mimetype || undefined,
          ACL: "public-read",
          Body: body,
        },
      });

      const uploadRequest = upload.done().then((response) => {
        file.newFilename = response.Location;
      });
      s3Uploads.push(uploadRequest);
      return body;
    }

    const form = formidable({
      maxFileSize: 5 * 1024 * 1024, //100 MBs converted to bytes,
      allowEmptyFiles: false,
      multiples: true,
      fileWriteStreamHandler,
    });

    form.parse(req, (error, fields, files) => {
      if (error) {
        reject(error);
        return;
      }

      Promise.all(s3Uploads)
        .then(() => {
          resolve({ ...files });
        })
        .catch(reject);
    });
  });
};

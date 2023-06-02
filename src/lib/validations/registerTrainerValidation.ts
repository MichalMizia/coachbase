import * as z from "zod";

const MAX_FILE_SIZE = 500000;
const ACCEPTED_FILE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "pdf",
  "docx",
];

export const trainerRegisterSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string(),
  description: z.string().max(200).min(20),
  verification: z
    .object({
      link: z.string().url(),
      // zod file verification
      file: z
        .any()
        .refine((files) => files?.length === 0, "Image is required.") // if no file files?.length === 0, if file files?.length === 1
        .refine(
          (files) => files?.[0]?.size >= MAX_FILE_SIZE,
          `Max file size is 5MB.`
        ) // this should be greater than or equals (>=) not less that or equals (<=)
        .refine(
          (files) => ACCEPTED_FILE_TYPES.includes(files?.[0]?.type),
          ".jpg, .jpeg, .png and .webp files are accepted."
        ),
    })
    .partial()
    .refine((data) => data.link || data.file, "Link albo plik do weryfikacji"),
  roles: z.array(z.enum(["Trener", "Dietetyk", "Fizjoterapeuta"])).optional(),
});

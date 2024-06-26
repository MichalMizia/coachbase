import * as z from "zod";

const MAX_FILE_SIZE = 3145728;
const ACCEPTED_FILE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const fileSchema = z
  .instanceof(FileList)
  .refine((files) => files.length === 1, "Zdjęcie jest wymagane.") // if no file files?.length === 0, if file files?.length === 1
  .refine(
    (files) => files?.[0]?.size <= MAX_FILE_SIZE,
    `Maksymalny rozmiar to 3MB.`
  )
  .refine(
    (files) => ACCEPTED_FILE_TYPES.includes(files?.[0]?.type),
    ".jpg, .jpeg, .png są akceptowane."
  );
export const optionalFileSchema = z
  .instanceof(FileList)
  .refine(
    (files) => files.length === 1 || files.length === 0,
    "Zdjęcie jest wymagane."
  ) // if no file files?.length === 0, if file files?.length === 1
  .refine(
    (files) => !files.length || files?.[0]?.size <= MAX_FILE_SIZE,
    `Maksymalny rozmiar to 3MB.`
  ) // this should be greater than or equals (>=) not less that or equals (<=)
  .refine(
    (files) => !files.length || ACCEPTED_FILE_TYPES.includes(files?.[0]?.type),
    ".jpg, .jpeg, .png są akceptowane."
  )
  .or(z.undefined())
  .or(z.null());

export const fileUploadSchema = z.object({
  files: fileSchema,
});

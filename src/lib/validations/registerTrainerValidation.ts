import * as z from "zod";
import { fileSchema } from "./fileUploadValidation";

export const trainerRegisterSchemaPart1 = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string(),
  description: z
    .string()
    .max(200, "Opis powinien zawierać maksimum 200 znaków")
    .min(40, "Opis powinien zawierać minimum 40 znaków"),
  isFormInInitialStateCurrently: z.literal(true),
});

export const trainerRegisterSchemaPart2 = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string(),
  description: z
    .string()
    .max(200, "Opis powinien zawierać maksimum 200 znaków")
    .min(40, "Opis powinien zawierać minimum 40 znaków"),
  verification: z
    .object({
      link: z.string().url({message: "Nieprawidłowy link"}).or(z.literal("")),
      // zod file verification
      file: z.instanceof(FileList).optional(),
    })
    .partial()
    .refine(
      (data) => !!data.link || fileSchema.parse(data.file),
      "Link albo plik jest wymagany do weryfikacji"
    ),
  // roles: z.array(z.enum(["Trener", "Dietetyk", "Fizjoterapeuta"])).optional(),
  city: z.string().min(3).max(20),
  isTrainer: z.boolean().default(true),
  isPhysio: z.boolean().default(false),
  isDietician: z.boolean().default(false),
  isFormInInitialStateCurrently: z.literal(false),
});

export const trainerRegisterSchema = z.discriminatedUnion(
  "isFormInInitialStateCurrently",
  [trainerRegisterSchemaPart1, trainerRegisterSchemaPart2]
);

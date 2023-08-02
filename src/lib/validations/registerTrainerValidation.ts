import * as z from "zod";
import { fileSchema } from "./fileUploadValidation";

const numberRegex: RegExp = /\d/;

export const trainerRegisterSchemaPart1 = z.object({
  username: z
    .string()
    .min(5, "Nazwa powinna zawierać minimum 5 znaków")
    .max(40, "Nazwa powinna zawierać maksimum 40 znaków"),
  email: z.string().email(),
  password: z
    .string()
    .min(8, "Hasło powinno zawierać minimum 8 znaków")
    .refine((str) => numberRegex.test(str), "Hasło powinno zawierać cyfrę"),
  description: z
    .string()
    .max(250, "Opis powinien zawierać maksimum 250 znaków")
    .min(40, "Opis powinien zawierać minimum 40 znaków"),
  isFormInInitialStateCurrently: z.literal(true),
});

export const trainerRegisterSchemaPart2 = z.object({
  username: z
    .string()
    .min(5, "Nazwa powinna zawierać minimum 5 znaków")
    .max(40, "Nazwa powinna zawierać maksimum 40 znaków"),
  email: z.string().email(),
  password: z
    .string()
    .min(8, "Hasło powinno zawierać minimum 8 znaków")
    .refine((str) => numberRegex.test(str), "Hasło powinno zawierać cyfrę"),
  description: z
    .string()
    .max(250, "Opis powinien zawierać maksimum 250 znaków")
    .min(40, "Opis powinien zawierać minimum 40 znaków"),
  verification: z
    .object({
      link: z.string().url({ message: "Nieprawidłowy link" }).or(z.literal("")),
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

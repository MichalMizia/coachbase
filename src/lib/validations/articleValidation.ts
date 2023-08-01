import { fileSchema } from "./fileUploadValidation";
import * as z from "zod";

export const articleUploadSchema = z.object({
  files: fileSchema,
  title: z
    .string()
    .max(40, "Tytuł nie może być dłuższy niż 40 znaków")
    .min(5, "Tytuł nie może być krótszy niż 5 znaków"),
  summary: z
    .string()
    .max(200, "Podusmowanie nie może być dłuższe niż 200 znaków")
    .min(30, "Podusmowanie nie może być dłuższe niż 30 znaków"),
});

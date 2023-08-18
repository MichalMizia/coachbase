import { fileSchema } from "./fileUploadValidation";
import * as z from "zod";

export const articleUploadSchema = z.object({
  title: z
    .string()
    .max(80, "Tytuł nie może być dłuższy niż 80 znaków")
    .min(5, "Tytuł nie może być krótszy niż 5 znaków"),
  summary: z
    .string()
    .max(260, "Podusmowanie nie może być dłuższe niż 260 znaków")
    .min(30, "Podusmowanie nie może być krótsze niż 30 znaków"),
});

import { TrainerType, UserType } from "@/model/user";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export function classNames(...classNames: string[]) {
  return twMerge(clsx(...classNames));
}

// export const fakeData: TrainerType[] = [
//   {
//     username: "john_doe",
//     email: "john_doe@gmail.com",
//     password: "johndoe123",
//     isTrainer: true,
//     roles: ["Dietetyk", "Fizjoterapeuta"],
//     summary:
//       "John Doe is a trainer specializing in Dietetics and Physiotherapy.",
//   },
//   {
//     username: "jane_smith",
//     email: "jane_smith@hotmail.com",
//     password: "janesmith456",
//     isTrainer: false,
//   },
//   {
//     username: "mark_lee",
//     email: "mark_lee@yahoo.com",
//     password: "marklee789",
//     isTrainer: true,
//     roles: ["Trener"],
//     summary: "Mark Lee is a trainer specializing in Training.",
//   },
//   {
//     username: "lisa_jones",
//     email: "lisa_jones@gmail.com",
//     password: "lisajones123",
//     isTrainer: true,
//     roles: ["Trener", "Fizjoterapeuta"],
//     summary:
//       "Lisa Jones is a trainer specializing in Training and Physiotherapy.",
//   },
//   {
//     username: "peter_parker",
//     email: "peter_parker@gmail.com",
//     password: "peterparker123",
//     isTrainer: false,
//   },
//   {
//     username: "samantha_smith",
//     email: "samantha_smith@gmail.com",
//     password: "samanthasmith456",
//     isTrainer: true,
//     roles: ["Dietetyk", "Trener", "Fizjoterapeuta"],
//     summary:
//       "Samantha Smith is a trainer specializing in Dietetics, Training, and Physiotherapy.",
//   },
//   {
//     username: "david_jones",
//     email: "david_jones@yahoo.com",
//     password: "davidjones789",
//     isTrainer: true,
//     roles: ["Dietetyk"],
//     summary: "David Jones is a trainer specializing in Dietetics.",
//   },
//   {
//     username: "amy_lee",
//     email: "amy_lee@hotmail.com",
//     password: "amylee123",
//     isTrainer: false,
//     summary: "Amy Lee is not a trainer.",
//   },
//   {
//     username: "jason_smith",
//     email: "jason_smith@gmail.com",
//     password: "jasonsmith456",
//     isTrainer: true,
//     roles: ["Trener"],
//     summary: "Jason Smith is a trainer specializing in Training.",
//   },
//   {
//     username: "emily_doe",
//     email: "emily_doe@yahoo.com",
//     password: "emilydoe789",
//     isTrainer: false,
//     summary: "Emily Doe is not a trainer.",
//   },
// ];

// export function arrayContainsAnyFromOtherArray = (arr1: any[], arr2: any[]): boolean => {
//   return
// }

export function roundHalf(number: number): number {
  return Math.round(number * 2) / 2;
}

export function isStringUnsafe(text: string | string[]): boolean {
  const regex: RegExp = /[<>\//]/;
  if (typeof text == "string") {
    return regex.test(text);
  }

  var state: boolean = false;
  text.forEach((str) => {
    if (regex.test(str)) state = true;
  });
  return state;
}
export function isEmailUnsafe(email: string) {
  const regex: RegExp = /[<>]/;
  return regex.test(email);
}

export function copyToClipboard(text: string): void {
  navigator.clipboard.writeText(text);
}

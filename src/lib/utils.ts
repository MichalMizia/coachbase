import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function classNames(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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

export function formatDate(input: string | number | Date): string {
  const date = input instanceof Date ? input : new Date(input);
  return date.toLocaleDateString("pl-PL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`;
}

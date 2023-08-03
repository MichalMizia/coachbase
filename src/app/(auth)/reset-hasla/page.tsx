import { Metadata } from "next";
import Link from "next/link";
import { SendPasswordResetForm } from "../@components/SendPasswordResetForm";

export const metadata: Metadata = {
  title: "Zresetuj Hasło - Coachbase",
  description: "Zaloguj się do swojego konta na coachbase.pl",
};

export default function Page() {
  return (
    <main>
      <section className="hero flex h-[calc(100vh-67px)] items-center bg-bg">
        <div className="flex flex-1 items-center self-stretch py-10">
          <div className="mx-auto flex w-[94%] max-w-[350px] flex-col justify-center space-y-4">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-3xl font-semibold tracking-tight text-black">
                Zresetuj hasło
              </h1>
              <p className="text-sm text-slate-500">
                Nie martw się, każdy kiedyś tu był
              </p>
            </div>
            <SendPasswordResetForm  />
            <p className="mt-2 px-8 text-center text-sm text-slate-500">
              <Link
                href="/rejestracja"
                className="hover:text-brand underline underline-offset-4"
                title="Rejestracja"
              >
                Nie masz konta? Zarejestruj się
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
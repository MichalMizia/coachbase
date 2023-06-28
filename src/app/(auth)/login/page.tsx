import { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "@/components/auth/LoginForm";

import { classNames } from "@/lib/utils";
import Button from "@/components/ui/Button";

// import { UserAuthForm } from "@/components/user-auth-form";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
};

export default function LoginPage() {
  return (
    <main>
      <section className="hero flex h-[calc(100vh-67px)] items-center bg-primary">
        <div className="flex flex-1 items-center self-stretch py-10">
          <div className="mx-auto flex w-[94%] max-w-[350px] flex-col justify-center space-y-4">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-3xl font-semibold tracking-tight text-black">
                Witaj spowrotem!
              </h1>
              <p className="text-sm text-slate-500">
                Zaloguj się przy użyciu emaila.
              </p>
            </div>
            <LoginForm />

            <p className="mt-2 px-8 text-center text-sm text-slate-500">
              <Link
                href="/rejestracja"
                className="hover:text-brand underline underline-offset-4"
                title="Rejestracja"
              >
                Nie masz konta? Zarejestruj się
              </Link>
            </p>
            <div className="relative my-2">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-300" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-primary px-2 text-slate-600">albo</span>
              </div>
            </div>
            <Button variant="default">
              <Link
                href="/rejestracja-trenera"
                title="Rejestracja Konta Trenera"
              >
                Utwórz Konto Trenera
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}

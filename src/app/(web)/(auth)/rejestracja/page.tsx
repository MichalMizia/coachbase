import { Metadata } from "next";
import RegisterForm from "../@components/RegisterForm";

export const metadata: Metadata = {
  title: "Rejestracja - Coachbase",
  description: "Zarejestruj konto użytkownika na coachbase.pl",
};

export default function Page() {
  return (
    <main>
      <section className="hero flex h-[calc(100vh-67px)] items-center">
        <RegisterForm />
      </section>
    </main>
  );
}

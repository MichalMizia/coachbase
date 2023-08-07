// city data
import RegisterTrainerForm from "../@components/RegisterTrainerForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rejestracja Trenera - Coachbase",
  description: "Zarejestruj konto trenera na coachbase.pl",
};

export default function Page() {
  return (
    <main>
      <RegisterTrainerForm />
    </main>
  );
}

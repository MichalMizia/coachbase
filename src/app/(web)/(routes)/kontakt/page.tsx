import { Metadata } from "next";
import { ContactForm } from "./@components/ContactForm";

interface PageProps {}

export const metadata: Metadata = {
  title: "Kontakt - CoachBase",
  description: "Strona kontaktowa firmy CoachBase",
};

const site_key = process.env.RECAPTCHA_SITE_KEY as string;

const Page = ({}: PageProps) => {
  return (
    <main className="w-full bg-white py-10 text-gray-800">
      <div className="container-md">
        <header className="mb-8">
          <h1
            style={{ fontSize: "var(--size-step-3)" }}
            className="font-bold leading-[1.25em] text-gray-800"
          >
            Kontakt
          </h1>
          <p className="max-w-4xl" style={{ fontSize: "var(--size-step-0)" }}>
            Jeżeli chcesz zgłosić problem z działaniem strony, masz pomysł na
            nową funkcjonalność lub po prostu chcesz się skontaktować, nie
            wachaj się wysłać wiadomość, postaram się odpisać w ciągu 24h.
          </p>
        </header>
        <ContactForm site_key={site_key} />
      </div>
    </main>
  );
};

export default Page;

import { Metadata } from "next";

interface PageProps {}

export const metadata: Metadata = {
  title: "Kontakt - CoachBase",
  description: "Strona kontaktowa firmy CoachBase",
};

const Page = ({}: PageProps) => {
  return (
    <main className="w-full bg-white py-10 text-gray-800">
      <h1 className="text-h1">Kontakt</h1>
    </main>
  );
};

export default Page;

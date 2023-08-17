import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ - CoachBase",
  description: "Strona z najczęściej zadawanymi pytaniami do firmy CoachBase",
};

export default async function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
  components: React.ReactNode;
}) {
  return (
    <main className="flex h-screen w-full flex-col items-stretch justify-start overflow-hidden bg-white">
      {children}
    </main>
  );
}

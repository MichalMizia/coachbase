import "../css/globals.css";
import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";
// auth
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";

export const metadata = {
  title: "Coach Base",
  description:
    "Baza danych ekspertów w dziedzinie fitnessu, treningu siłowego i dietetyki z całej polski",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className="bg-primary text-text">
        <div id="modals" className="modalss" />
        <Providers>
          <Navbar session={session} />
          {children}
        </Providers>
      </body>
    </html>
  );
}

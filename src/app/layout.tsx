import "../css/globals.css";
import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";
// auth
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";

export const metadata = {
  title: "CoachBase",
  description:
    "Największy portal ekspertów w dziedzinie fitnessu, treningu siłowego i dietetyki z całej polski",
  authors: {
    name: "Michał Mizia",
    url: "https://www.instagram.com/michalmizia_/",
  },
  keywords: [
    "Trener Personalny",
    "Dietetyk",
    "Fizjoterapeuta",
    "Ogłoszenia",
    "Oferty",
    "Social Media",
    "Profil",
    "Zdrowie",
    "Fitness",
    "Lifestyle",
    "Zacznij od dziś",
    "Blog",
    "Wiedza",
    "Nauka",
    "Trening",
  ],
  icons: {
    icon: "/favicon.ico",
    other: [
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        url: "/icons/apple-touch-icon.png",
      },
      {
        rel: "icon",
        sizes: "32x32",
        url: "/icons/favicon-32x32.png",
        type: "image/png",
      },
      {
        rel: "icon",
        sizes: "16x16",
        url: "/icons/favicon-16x16.png",
        type: "image/png",
      },
      {
        rel: "mask-icon",
        url: "/icons/safari-pinned-tab.svg",
      },
      {
        rel: "icon",
        url: "/icons/favicon.ico",
        sizes: "any",
      },
    ],
  },
  manifest: "/icons/site.webmanifest",
  openGraph: {
    type: "website",
    siteName: "CoachBase",
    url: "https://coachbase.pl/oferty",
  },
  themeColor: "#ffffff",
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
        {/* <div id="modals" className="modals" /> */}
        <Providers>
          <Navbar session={session} />
          {children}
        </Providers>
      </body>
    </html>
  );
}

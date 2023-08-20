import "@/css/globals.css";
import "@/css/article.css";
import Providers from "@/components/Providers";
// auth
import { Analytics } from "@vercel/analytics/react";

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
    "CoachBase"
  ],

  icons: {
    icon: "/icons/favicon.ico",
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
  verification: { google: "qpUyWQxaLEGfUfIiRq0_gqPqviHw7vrC506P4Y1p9I4" },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <body className="bg-bg text-text">
        <Providers>
          <Analytics />
          {children}
        </Providers>
      </body>
    </html>
  );
}

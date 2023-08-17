import "@/css/article.css";
import "@/css/globals.css";
// auth
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";
// components
import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";
import Footer from "@/components/Footer";
import Logo from "@/components/custom/Logo";
import { Suspense } from "react";
// analytics
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
  const session = await getServerSession(authOptions);

  return (
    <html lang="pl">
      <body className="web-body relative bg-bg text-text">
        <Providers>
          <Suspense
            fallback={
              <header className="fixed left-0 right-0 top-0 z-[999] w-full bg-blue-500 bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 py-4 text-white shadow-sm shadow-slate-400">
                <div className="container-md mx-auto flex w-[95%] items-end justify-between gap-4 lg:gap-8">
                  <Logo className="scale-90" />
                  <div className="w-[25%] max-w-[200px] animate-pulse bg-white/20"></div>
                  <div className="h-10 w-10 animate-pulse rounded-full border border-violet-300 bg-blue-400 shadow-md"></div>
                </div>
              </header>
            }
          >
            <Navbar session={session} />
          </Suspense>

          <Analytics />
          {children}

          <Suspense
            fallback={
              <header className="fixed left-0 right-0 top-0 z-[999] w-full bg-blue-500 bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 py-4 text-white shadow-sm shadow-slate-400">
                <div className="container-md mx-auto flex w-[95%] items-end justify-between gap-4 lg:gap-8">
                  <Logo className="scale-90" />
                  <div className="w-[25%] max-w-[200px] animate-pulse bg-white/20"></div>
                  <div className="h-10 w-10 animate-pulse rounded-full border border-violet-300 bg-blue-400 shadow-md"></div>
                </div>
              </header>
            }
          >
            <Footer />
          </Suspense>
          <div className="h-[51px] bg-white md:h-[66px] nav:hidden"></div>
        </Providers>
      </body>
    </html>
  );
}

import Link from "next/link";
import Logo from "./custom/Logo";
import NewsletterForm from "./forms/NewsletterForm";

interface FooterProps {}

const Footer = ({}: FooterProps) => {
  return (
    <footer className="border-t border-white/10 bg-gray-900 pt-8 text-gray-300 shadow-inner shadow-white/10">
      <div className="container-md flex-col items-start">
        <header>
          <Logo className="mb-1 w-fit" />
          {/* <p className="ml-6 mt-0.5 text-sm">
            Nie znalazłeś tego czego szukasz?
          </p> */}
        </header>
        <main className="flex flex-wrap gap-x-10 gap-y-6 py-4">
          <div className="flex h-full flex-1 flex-col items-start justify-around gap-1">
            <h4 className="mb-1 text-h5 font-[500] text-white">
              Częste Wyszukiwania
            </h4>
            <a
              className="ml-1 underline decoration-transparent decoration-2 underline-offset-2 transition-all duration-300 hover:text-white hover:decoration-secondary_custom "
              title="Oferty w Warszawie"
              href="/oferty?city=warszawa&"
            >
              Warszawa
            </a>
            <a
              className="ml-1 underline decoration-transparent decoration-2 underline-offset-2 transition-all duration-300 hover:text-white hover:decoration-secondary_custom "
              title="Oferty we Wrocławiu"
              href="/oferty?city=wroclaw&"
            >
              Wrocław
            </a>
            <a
              className="ml-1 underline decoration-transparent decoration-2 underline-offset-2 transition-all duration-300 hover:text-white hover:decoration-secondary_custom "
              title="Oferty Trójboju Siłowego"
              href="/oferty?tag=trojboj-silowy&"
            >
              Trójbój siłowy
            </a>
            <a
              className="ml-1 underline decoration-transparent decoration-2 underline-offset-2 transition-all duration-300 hover:text-white hover:decoration-secondary_custom "
              title="Oferty w Krakowie"
              href="/oferty?city=krakow&"
            >
              Kraków
            </a>
            <a
              className="ml-1 underline decoration-transparent decoration-2 underline-offset-2 transition-all duration-300 hover:text-white hover:decoration-secondary_custom "
              title="Oferty w Rzeszowie"
              href="/oferty?city=rzeszow&"
            >
              Rzeszów
            </a>

            <a
              className="ml-1 underline decoration-transparent decoration-2 underline-offset-2 transition-all duration-300 hover:text-white hover:decoration-secondary_custom "
              title="Oferty Sztuk Walki"
              href="/oferty?tag=sztuki-walki&"
            >
              Sztuki Walki
            </a>
          </div>
          <div className="flex h-full flex-1 flex-col items-start justify-around gap-1">
            <h4 className="mb-1 text-h5 font-[500] text-white">Strony</h4>
            <Link
              className="ml-1 underline decoration-transparent decoration-2 underline-offset-2 transition-all duration-300 hover:text-white hover:decoration-secondary_custom "
              title="Oferty"
              href="/oferty"
            >
              Oferty
            </Link>
            <Link
              className="ml-1 underline decoration-transparent decoration-2 underline-offset-2 transition-all duration-300 hover:text-white hover:decoration-secondary_custom "
              title="Artykuły"
              href="/blog"
            >
              Artykuły
            </Link>
            {/* <Link
              className="ml-1 underline decoration-transparent decoration-2 underline-offset-2 transition-all duration-300 hover:text-white hover:decoration-secondary_custom "
              title="Porady"
              href="/porady"
            >
              Porady
            </Link> */}
            <Link
              className="ml-1 underline decoration-transparent decoration-2 underline-offset-2 transition-all duration-300 hover:text-white hover:decoration-secondary_custom "
              title="FAQ"
              href="/faq"
            >
              FAQ
            </Link>
            <a
              className="ml-1 underline decoration-transparent decoration-2 underline-offset-2 transition-all duration-300 hover:text-white hover:decoration-secondary_custom "
              title="FAQ"
              href="/#search-section"
            >
              Wyszukiwarka
            </a>
          </div>
          <div className="flex h-full flex-1 flex-col items-start justify-around gap-1">
            <h4 className="mb-1 text-h5 font-[500] text-white">Konto</h4>
            <Link
              className="ml-1 underline decoration-transparent decoration-2 underline-offset-2 transition-all duration-300 hover:text-white hover:decoration-secondary_custom "
              title="Profil"
              href="/profil"
            >
              Profil
            </Link>
            <Link
              className="ml-1 underline decoration-transparent decoration-2 underline-offset-2 transition-all duration-300 hover:text-white hover:decoration-secondary_custom "
              title="Login"
              href="/login"
            >
              Login
            </Link>
            <Link
              className="ml-1 underline decoration-transparent decoration-2 underline-offset-2 transition-all duration-300 hover:text-white hover:decoration-secondary_custom "
              title="Rejestracja"
              href="/rejestracja"
            >
              Rejestracja
            </Link>
            <Link
              className="ml-1 underline decoration-transparent decoration-2 underline-offset-2 transition-all duration-300 hover:text-white hover:decoration-secondary_custom "
              title="Konto Biznesowe"
              href="/rejestracja-trenera"
            >
              Konto Biznesowe
            </Link>
          </div>
          <div className="flex h-full flex-1 flex-col items-start justify-around gap-1">
            <h4 className="mb-1 text-h5 font-[500] text-white">Znajdź nas</h4>
            <Link
              className="ml-1 underline decoration-transparent decoration-2 underline-offset-2 transition-all duration-300 hover:text-white hover:decoration-secondary_custom "
              title="Kontakt"
              href="/kontakt"
            >
              Strona Kontaktowa
            </Link>
            <NewsletterForm />
            <div className="flex items-center justify-center gap-2">
              <a
                href="https://www.instagram.com/coachbase_pl/?hl=en"
                referrerPolicy="no-referrer"
                target="_blank"
                rel="nofollow"
                className="isolate z-[2] flex h-8 w-8 items-center justify-center rounded-full bg-white/5 p-1 shadow-white/5 transition-transform duration-300 ease-in-out [box-shadow:0_0_20px_10px_#ffffff12] hover:-translate-y-[5px]"
              >
                <svg
                  className="-z-10 bg-transparent fill-white"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/coachbase_pl/?hl=en"
                referrerPolicy="no-referrer"
                target="_blank"
                rel="nofollow"
                className="isolate z-[2] flex h-8 w-8 items-center justify-center rounded-full bg-white/5 p-1 shadow-white/5 transition-transform duration-300 ease-in-out [box-shadow:0_0_20px_10px_#ffffff12] hover:-translate-y-[5px]"
              >
                <svg
                  className="-z-10 h-full bg-transparent fill-white py-0.5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 320 512"
                >
                  <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
                </svg>
              </a>
            </div>
          </div>
        </main>
        <div className="mt-4 flex items-end justify-between gap-8 pb-0.5 pt-1 text-sm">
          <div className="" id="copyright">
            ©2023 CoachBase - All Rights Reserved.
          </div>
          <Link
            className="underline decoration-transparent underline-offset-2 transition-all duration-300 hover:text-white hover:decoration-secondary_custom hover:decoration-2 "
            title="Polityka Prywatności"
            href="/polityka-prywatnosci"
          >
            Polityka prywatności
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

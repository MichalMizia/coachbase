import {
  FileSignatureIcon,
  LayoutDashboardIcon,
  LucideProps,
  LucideUser,
  Megaphone,
  UsersIcon,
} from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

export interface FaqItem {
  item: string;
  id: number;
  content: ReactNode;
  icon: (props: LucideProps) => ReactNode;
}

<div className="">
  <h1>Coachbase FAQ</h1>
  <h2>O Projekcie</h2>

  <p></p>
  <h2>Dla Trenera</h2>
  <p>
    Trenerze, zastanawiasz si臋 jak pozyska膰 klient贸w? Zwi臋kszenie prezencji
    w internecie jest jedn膮 z najprostszych rzeczy jakie mog膮 Ci w tym pom贸c
    jednak p艂acenie 5000 z艂otych za stron臋 internetow膮 nie jest najbardziej
    przyst臋pne.
  </p>
  <p></p>
  <p>
    Z pomoc膮 przychodzi CoachBase na kt贸rym ca艂kowicie za darmo mo偶esz
    za艂o偶y膰 swoj膮 prywatn膮 stron臋 internetow膮, na kt贸rej poka偶esz
    klientom co mog膮 uzyska膰 z wsp贸艂pracy z tob膮.
  </p>
  <h2>O autorze</h2>
  <p>
    Cze艣膰, nazywam si臋 Micha艂 Mizia i je偶eli dotar艂e艣 a偶 tu to wiedz 偶e
    jestem Ci bardzo wdzi臋czny. Oto par臋 fakt贸w o mnie:
  </p>
  <ul>
    <li>
      Jestem zapalonym tr贸jboist膮 a do moich najwi臋kszych sukces贸w nale偶y:
    </li>
    <li>
      馃Z艂oty medal na Mistrzostwach Polski w Tr贸jboju Si艂owym oraz tytu艂
      najlepszego juniora do lat 18.
    </li>
    <li>
      馃Z艂oty Medal w Wyciskaniu Le偶膮c na Mistrzostwach Europy w tr贸jboju
    </li>
    <li>
      Pasjonuje si臋 web developmentem i 偶ywi臋 g艂臋boka uraz臋 do brzydkich
      stron internetowych, jestem samoukiem.
    </li>
    <li>
      Zacz膮艂em tworzy膰 t膮 aplikacj臋 z my艣l膮 o trenerach kt贸rzy maj膮
      wysoki potencja艂 w bran偶y fitness jednak nie s膮 w stanie powi臋kszy膰
      swoich zasi臋g贸w. Jest to m贸j pewien spos贸b walki z trenerami kopiuj
      wklej poprzez danie szansy tym mniej do艣wiadczonym kt贸rzy nie mieli
      jeszcze szansy wybi膰 si臋 w bran偶y fitness.
    </li>
  </ul>
  <h1>Coachbase FAQ</h1>
  <h2>O Projekcie</h2>
  <p>
    Chcesz w ko艅cu wzi膮膰 si臋 za siebie ale jeste艣 zm臋czony bezowocnym
    powtarzaniem sobie 偶e zaczniesz od nast臋pnego tygodnia? A mo偶e treningi
    nie id膮 po twojej my艣li i czujesz 偶e potrzebujesz opieki profesjonalisty?
  </p>
  <p>
    CoachBase u艂atwi Ci znalezienie idealnego trenera, przez co w ko艅cu
    osi膮gniesz sw贸j cel.
  </p>
  <h3>Jak to dzia艂a?</h3>
  <p>
    Po prostu wpisz miasto w kt贸rym poszukujesz eksperta fitness, nast臋pnie
    dodaj jakich dok艂adnie us艂ug oczekujesz, do tego mo偶esz wyszukiwa膰
    profile trener贸w po imieniu i nazwisku.
  </p>
  <p></p>
  <p>
    Nast臋pnie naci艣nij przycisk wyszukiwania i przegl膮daj profile trener贸w
    odpowiadaj膮ce Twoim preferencjom. Zak艂adaj膮c konto mo偶esz r贸wnie偶
    dodawa膰 opinie do ich profili.
  </p>
  <p></p>
  <p>
    Je偶eli jeste艣 trenerem i chcesz za艂o偶y膰 konto biznesowe, przejd藕 do
    zak艂adki dla trenera
  </p>
  <p></p>
</div>;

export const faqItemsHeader: FaqItem[] = [
  {
    item: "O Projekcie",
    id: 1,
    content: (
      <>
        <h1>O projekcie</h1>
        <blockquote>
          Dobry trener jest jedną z najlepszych <strong>inwestycji</strong>{" "}
          jakich możesz dokonać. Wyglądasz, czujesz się i funkcjonujesz lepiej w
          zdrowym ciele.
        </blockquote>
        <p>
          CoachBase pozwala Ci{" "}
          <strong>znaleźć idealnego trenera personalnego</strong>, który
          dopasuje się do Twoich celów, preferencji i stylu życia. Niezależnie
          od tego, czy chcesz <strong>zrzucić zbędne kilogramy</strong>,{" "}
          <strong>zbudować mięśnie</strong>, <strong>poprawić wydolność</strong>{" "}
          czy po prostu lepiej czuć się we własnym ciele, mamy dla Ciebie
          odpowiedniego eksperta.
        </p>
        <h3>Jak to właściwie działa?</h3>
        <p>
          Trenera możesz wyszukać po <strong>mieście</strong> w którym
          stacjonujesz (lub szukać ofert zdalnych), oraz po{" "}
          <strong>jego specjalnościach</strong>. Wszystkie oferty widoczne na
          CoachBase <strong>przeszły proces weryfikacji</strong> a więc osoby
          stojące za nimi są potwierdzonymi profesjonalistami w swoich
          dziedzinach.
        </p>
        <p>
          Gdy któraś z przeglądanych ofert cię zainteresuje możesz wejść w{" "}
          <strong>profil trenera</strong> i zobaczyć dane na jego temat, np.
          cennik jego ofert, doświadczenie, efekty podopiecznych czy opinie na
          jego temat.
        </p>
        <p>
          Jeżeli jesteś trenerem i chcesz założyc konto biznesowe, zarejestruj
          się pod{" "}
          <Link
            href="/rejestracja-trenera"
            title="Rejestracja Trenera"
            className="text-text_readable underline decoration-1 underline-offset-2 transition-all hover:opacity-80"
          >
            coachbase.pl/rejestracja-trenera
          </Link>{" "}
          lub przejdż do zakładki <strong>Dla Trenera</strong> żeby dowiedzieć
          się więcej.
        </p>
      </>
    ),
    icon: (props) => <UsersIcon {...props} />,
  },
  {
    item: "O Autorze",
    id: 2,
    content: (
      <>
        <h2>O autorze</h2>
        <p>
          Cześć, nazywam się Michał Mizia i jeżeli dotarłeś aż tu to wiedz że
          jestem Ci za to bardzo wdzięczny. CoachBase to projekt który
          rozpocząłem w ramach rozwoju mojego portfolio developerskiego jednak
          przeistoczył się on w coś znacznie większego. Oto kilka innych faktów
          o mnie:
        </p>
        <ul>
          <li>
            Od ponad 4 lat jestem zapalonym trójboistą a do moich największych
            sukcesów należą:
          </li>
          <li>
            <ul>
              <li>
                Złoty medal na Mistrzostwach Polski w Trójboju Siłowym oraz
                tytuł najlepszego juniora do lat 18 w Polsce.
              </li>
              <li>
                Złoty Medal w Wyciskaniu Leżąc na Mistrzostwach Europy w
                trójboju
              </li>
            </ul>
          </li>
          <li>
            Pasjonuje się web developmentem i żywię głęboka urazę do brzydkich
            stron internetowych, ten projekt zacząłem jako dodatek do swojego
            developerskiego portfolio jednak rozwinął się on w coś zdecydowanie
            większego.
          </li>
          <li>
            Z prostego side-projektu CoachBase przeszedł na aplikację tworzoną z
            myślą o osobach z wysokim potencjałem w branży fitness, które nie sa
            w stanie powiększyć swoich zasięgów. W pewien sposób jest to moja
            metoda walki z trenerami kopiuj wklej poprzez danie szansy tym mniej
            doświadczonym którzy nie zdążyli jeszcze porządnie rozpędzić się w
            branży fitness.
          </li>
        </ul>
      </>
    ),
    icon: (props) => <LucideUser {...props} />,
  },
];
export const faqItemsMain: FaqItem[] = [
  {
    item: "Uwaga Trenerze!",
    id: 3,
    content: (
      <>
        <h1>Dlaczego Coachbase?</h1>
        <blockquote>
          Zauważyłeś że świetni trenerzy często mają problem z pozyskaniem
          klientów? Na CoachBase możesz założyć całkowicie darmową stronę
          trenerską, dzięki której rozkręcisz swój biznes.
        </blockquote>
        <p>
          CoachBase jest inicjatywą powstająca od trenerów personalnych, dla
          trenerów personalnych. Jeżeli zastanawiasz się jak pozyskać klientów,
          mamy odpowiedź! Zwiększenie prezencji w internecie jest jedną z
          najprostszych rzeczy jakie mogą Ci w tym pomóc.
        </p>
        <h2>Jak rozwijać swój biznes trenerski?</h2>
        <p>
          Prowadzenie profili w mediach społecznościowych czy aktywny networking
          z najlepszymi w branży to dobre sposoby na przebicie się, jednak
          potencjalny klient w obecnych czasach{" "}
          <strong>nie będzie w stanie</strong> na pierwszy rzut oka odróżnić
          twojego profilu od setek innych.
        </p>
        <p>
          Inną opcją jest własna strona internetowa jednak płacenie za nią 5000
          złotych nie jest najbardziej przystępne.
        </p>
        <p>
          I tu właśnie{" "}
          <strong>CoachBase zapewnia pozytywne cechy obu tych rozwiązań</strong>
          , założenie konta trenerskiego jest w 100% darmowe a do tego pozwala
          na posegregowanie najważniejszych informacji o Tobie, takich jak twoje{" "}
          <strong>
            doświadczenie, oferty, wyniki podopiecznych czy to w czym się
            specjalizujesz
          </strong>
          . Załóż konto aby <strong>wyróżnić się na tle innych</strong> i zacząć
          pozyskiwać klientów.
        </p>
      </>
    ),
    icon: (props) => <Megaphone {...props} />,
  },
  {
    item: "Jak założyć konto trenera?",
    id: 3,
    content: (
      <>
        <h1>Jak założyć Konto Trenera?</h1>
        <blockquote>
          Jeżeli chcesz całkowicie za darmo zwiększyć swoją prezencję w
          internecie i zacząć pozyskiwać klientów, konto trenerskie na CoachBase
          jest dla rozwiązaniem dla Ciebie.
        </blockquote>
        <p>Aby je założyć musisz podjąć następujące kroki: </p>
        <ul>
          <li>
            Przejść do zakładki{" "}
            <Link
              href="/rejestracja-trenera"
              title="Rejestracja Trenera"
              className="text-text_readable underline decoration-1 underline-offset-2 transition-all hover:opacity-80"
            >
              coachbase.pl/rejestracja-trenera
            </Link>{" "}
          </li>
          <li>
            Podać swoje podstawowe dane takie jak email czy imię i nazwisko.
          </li>
          <li>
            Napisać krótki opis siebie i swojej działalności który będzie
            wyświetlał się klientom podczas przeglądania ofert (długi opis i
            więcej rzeczy na swój temat będziesz mógł dodać po utworzeniu konta)
          </li>
          <li>
            Wybrać dziedziny w których się specjalizujesz aby pomóc lepiej
            dobrać klientów pod to czym się zajmujesz.
          </li>
          <li>
            Przejść poprawnie weryfikację(ma na celu zapobiec tworzeniu kont
            przez osoby nie mające odpowiednich kwalifikacji do udzielania porad
            trenerskich). Więcej na ten temat opisane jest w procesie tworzenia
            konta.
          </li>
          <li>
            Postępując w ten sposób utworzysz konto użytkownika oczekujące na
            status konta trenera. Po poprawnej weryfikacji otrzymasz wiadomość
            email mówiącą o tym że twoje konto otrzymało status trenerski.
          </li>
        </ul>
      </>
    ),
    icon: (props) => <FileSignatureIcon {...props} />,
  },
  {
    item: "Edycja Profilu",
    id: 4,
    content: "Kiedyś tu coś będzie",
    icon: (props) => <LayoutDashboardIcon {...props} />,
  },
];

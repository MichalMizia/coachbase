import { Option } from "react-multi-select-component";

export const allTags: string[] = [
  "Trener",
  "Dietetyk",
  "Dietetyk kliniczny",
  "Fizjoterapeuta",
  "Sztuki Walki",
  "Kulturystyka",
  "Trening Siłowy",
  "Przygotowanie Motoryczne",
  "Trening Wytrzymałościowy",
  "Trójbój Siłowy",
  "CrossFit",
  "Fitness",
  "Zajęcia Grupowe",
  "Dieta Ketogeniczna",
  "Trening Funkcjonalny",
  "Trening HIIT",
  "Trening Mobility",
  "Rehabilitacja",
  "Trening Kalisteniczny",
  "Trening Seniorów",
  "Trening TRX",
  "Kettlebell",
  "Trening Obwodowy",
  "Przygotowanie Sportowe",
  "Plyometria",
  "Gimnastyka",
  "Poprawa Postury",
  "Trening Korekcyjny",
  "MMA",
  "Karate",
  "Judo",
  "Jiu-Jitsu",
  "Aikido",
  "Krav Maga",
  "Muay Thai",
  "Kickboxing",
  "Boks",
];

export const tagOptions: Option[] = [
  { label: "Trener", value: "trener" },
  { label: "Dietetyk kliniczny", value: "dietetyk-kliniczny" },
  { label: "Fizjoterapeuta", value: "fizjoterapeuta" },
  { label: "Sztuki Walki", value: "sztuki-walki" },
  { label: "Kulturystyka", value: "kulturystyka" },
  { label: "Trening Siłowy", value: "trening-silowy" },
  { label: "Przygotowanie Motoryczne", value: "przygotowanie-motoryczne" },
  { label: "Trening Wytrzymałościowy", value: "trening-wytrzymalosciowy" },
  { label: "Trójbój Siłowy", value: "trojboj-silowy" },
  { label: "CrossFit", value: "crossfit" },
  { label: "Fitness", value: "fitness" },
  { label: "Zajęcia Grupowe", value: "zajecia-grupowe" },
  { label: "Dieta Ketogeniczna", value: "dieta-ketogeniczna" },
  { label: "Trening Funkcjonalny", value: "trening-funkcjonalny" },
  { label: "Trening HIIT", value: "trening-hiit" },
  { label: "Trening Mobility", value: "trening-mobility" },
  { label: "Rehabilitacja", value: "rehabilitacja" },
  { label: "Trening Kalisteniczny", value: "trening-kalisteniczny" },
  { label: "Trening Seniorów", value: "trening-seniorow" },
  { label: "Trening TRX", value: "trening-trx" },
  { label: "Kettlebell", value: "kettlebell" },
  { label: "Trening Obwodowy", value: "trening-obwodowy" },
  { label: "Przygotowanie Sportowe", value: "przygotowanie-sportowe" },
  { label: "Plyometria", value: "plyometria" },
  { label: "Gimnastyka", value: "gimnastyka" },
  { label: "Poprawa Postury", value: "poprawa-postury" },
  { label: "Trening Korekcyjny", value: "trening-korekcyjny" },
  { label: "MMA", value: "mma" },
  { label: "Karate", value: "karate" },
  { label: "Judo", value: "judo" },
  { label: "Jiu-Jitsu", value: "jiu-jitsu" },
  { label: "Aikido", value: "aikido" },
  { label: "Krav Maga", value: "krav-maga" },
  { label: "Muay Thai", value: "muay-thai" },
  { label: "Kickboxing", value: "kickboxing" },
  { label: "Boks", value: "boks" },
];

type offerOptionType = {
  name: string;
  fields?: {
    amountOfPeople?: string[];
    pricePer?: string[];
    amountOfWorkouts?: boolean;
    duration?: boolean;
  };
};

export const offerOptions: string[] = [
  "Prowadzenie Treningowe Online",
  "Trening Grupowy",
  "Trening Personalny",
  "Pakiet Treningów Personalnych",
  "Konsultacje Treningowe",
  "Konsultacje Dietetyczne",
  "Prowadzenie Dietetyczne",
  "Wizyta Fizjoterapeutyczna",
];

export const randomFacts: string[] = [
  "Japonia to obecnie jedyne cesarstwo na świecie. Tym samym Akihito to jedyny cesarz na świecie sprawujący władzę od 1989 roku.",
  "Księżyc nie posiada atmosfery. Z tego powodu raz pozostawiony ślad pozostanie na nim na zawsze (dopóki nie uderzy w niego meteoryt). Ostatni człowiek stąpający po Srebrnym Globie Gene Cernan obiecał swojej córce, iż pozostawi na jego powierzchni ślad TDC, czyli jej inicjały. Jak powiedział, tak zrobił.",
  "Oglądająć Pulp Fiction można zwrócić uwagę na zegarki, które bez względu na porę zgodnie wskazują godzinę 4:20.",
  "Wenus obraca się wokół swojej osi wolniej niż okrąża Słońce, więc jeden dzień na Wenus trwa dłużej niż jeden rok.",
  "Delfiny śpią z jednym okiem otwartym, aby obserwować swoje otoczenie i unikać niebezpieczeństw.",
  "Na Światowym Szczycie Klimatycznym COP26 w 2021 roku, najbardziej używanym środkiem transportu przez delegacje były samoloty.",
  "Na Jowiszu i Saturnie jest tyle wyładowań atmosferycznych, że cały czas trwają tam burze.",
  "Woda jest jedyną substancją, która występuje w trzech stanach skupienia - ciekłym, stałym i gazowym - w normalnych warunkach.",
  "",
];

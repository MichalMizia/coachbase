import {
  FileSignatureIcon,
  LayoutDashboardIcon,
  LucideProps,
  PersonStandingIcon,
  UsersIcon,
} from "lucide-react";
import { ReactNode } from "react";

export interface FaqItem {
  item: string;
  id: number;
  content: ReactNode;
  icon: (props: LucideProps) => ReactNode;
}

export const faqItemsHeader: FaqItem[] = [
  {
    item: "O Projekcie",
    id: 1,
    content: (
      <div className="text-text_readable">
        <p className="max-w-2xl text-sm md:text-[16px]">
          Coach Base pozwala Ci znaleźć idealnego trenera personalnego, który
          dopasuje się do Twoich celów, preferencji i stylu życia. Niezależnie
          od tego, czy chcesz zrzucić zbędne kilogramy, zbudować mięśnie,
          poprawić wydolność czy po prostu zdrowo się odżywiać, mamy dla Ciebie
          odpowiedniego eksperta.
        </p>
      </div>
    ),
    icon: (props) => <UsersIcon {...props} />,
  },
  {
    item: "O Autorze",
    id: 2,
    content: "Michał Mizia",
    icon: (props) => <PersonStandingIcon {...props} />,
  },
];
export const faqItemsMain: FaqItem[] = [
  {
    item: "Jak założyć konto trenera?",
    id: 3,
    content: "Konto Trenera",
    icon: (props) => <FileSignatureIcon {...props} />,
  },
  {
    item: "Edycja Profilu",
    id: 4,
  content: "Kiedyś tu coś będzie",
    icon: (props) => <LayoutDashboardIcon {...props} />,
  },
];

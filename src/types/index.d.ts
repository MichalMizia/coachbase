import { LucideIcon } from "lucide-react";

export type NavItem = {
  title: string;
  href: string;
  disabled?: boolean;
  icon: LucideIcon;
};

export type HomeConfig = {
  mainNav: navItem[];
};

// "id": "21325",
//         "text": "Bielany Wroc\u0142awskie, gm. Kobierzyce, wroc\u0142awski, Dolno\u015bl\u0105skie",
//         "text_simple": "Bielany Wroc\u0142awskie",
//         "text_gray": "wroc\u0142awski",
//         "lon": "16.97184",
//         "lat": "51.03923",
//         "zoom": "12",
//         "url": "bielany-wroclawskie",
//         "districts": []

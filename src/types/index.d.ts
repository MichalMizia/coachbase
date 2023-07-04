import { ReactElement } from "react";
import { Toast } from "react-hot-toast";

export interface NavItem {
  title: string;
  href: string;
  icon: ReactElement;
  disabled?: boolean;
}

export interface HomeConfig {
  mainNav: NavItem[];
}

// "id": "21325",
//         "text": "Bielany Wroc\u0142awskie, gm. Kobierzyce, wroc\u0142awski, Dolno\u015bl\u0105skie",
//         "text_simple": "Bielany Wroc\u0142awskie",
//         "text_gray": "wroc\u0142awski",
//         "lon": "16.97184",
//         "lat": "51.03923",
//         "zoom": "12",
//         "url": "bielany-wroclawskie",
//         "districts": []

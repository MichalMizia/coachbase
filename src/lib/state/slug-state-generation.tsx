import { create } from "zustand";

export type ProfileNavigationOptions =
  | "O mnie"
  | "Opinie"
  | "Oferty"
  | "Artykuły";
export const profileNavigationOptions: ProfileNavigationOptions[] = [
  "O mnie",
  "Opinie",
  "Oferty",
  "Artykuły",
];

interface GenerationState {
  selectedNavItem: ProfileNavigationOptions;
  setSelectedNavItem: (selectedNavItem: ProfileNavigationOptions) => void;
}

export const useTrainerStore = create<GenerationState>()((set) => ({
  selectedNavItem: "O mnie",
  setSelectedNavItem: (selectedNavItem: ProfileNavigationOptions) =>
    set({ selectedNavItem }),
}));

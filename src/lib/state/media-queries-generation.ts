// import { Dispatch, SetStateAction } from "react";
import { create } from "zustand";

interface GenerationState {
  isMobile: boolean;
  setIsMobile: (isMobile: boolean) => void;
  isLarge: boolean;
  setIsLarge: (isLarge: boolean) => void;
}

export const useQueryStore = create<GenerationState>()((set, get) => ({
  isMobile: false,
  setIsMobile: (isMobile: boolean) => set({ isMobile }),
  isLarge: false,
  setIsLarge: (isLarge: boolean) => set({ isLarge }),
}));

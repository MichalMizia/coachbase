// import { Dispatch, SetStateAction } from "react";
import { create } from "zustand";

interface GenerationState {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

export const useLoadingStore = create<GenerationState>()((set) => ({
  isLoading: false,
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
}));

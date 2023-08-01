import { TrainerDataType } from "@/model/trainerData";
import { TrainerType, UserType } from "@/model/user";
import { create } from "zustand";

interface GenerationState {
  isMenuOpen: boolean;
  setIsMenuOpen: (isMenuOpen: boolean) => void;
}

export const useProfileStore = create<GenerationState>()((set) => ({
  isMenuOpen: false,
  setIsMenuOpen: (isMenuOpen: boolean) => set({ isMenuOpen }),
}));

interface UserGenerationState {
  user: UserType | TrainerType | null;
  userData: null | TrainerDataType;
  setUser: (user: UserType | TrainerType | null) => void;
  setUserData: (userData: null | TrainerDataType) => void;
}

// export const useCurrentUserStore = create<UserGenerationState>()((set) => ({
//   user: null,
//   userData: null,
//   setUser: (user: UserType | TrainerType | null) => set({ user }),
//   setUserData: (userData: null | TrainerDataType) => set({ userData }),
// }));

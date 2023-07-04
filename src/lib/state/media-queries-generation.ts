// import { useEffect } from "react";
// // import { Dispatch, SetStateAction } from "react";
// import { create } from "zustand";

// interface GenerationState {
//   isMobile: boolean;
//   update: () => void;
// }

// const mobileQuery = "(max-width: 660px)";

// export const useQueryStore = create<GenerationState>()((set, get) => ({
//   isMobile: false,
//   update: () => {
//     useEffect(() => {
//       const media = window.matchMedia(mobileQuery);
//       if (media.matches !== get().isMobile) {
//         set({ isMobile: media.matches });
//       }
//       const listener = () => set({ isMobile: media.matches });
//       window.addEventListener("resize", listener);
//       return () => window.removeEventListener("resize", listener);
//     }, []);
//   },
// }));

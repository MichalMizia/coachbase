// "use client";
// import { useQueryStore } from "@/lib/state/media-queries-generation";
// import { useProfileStore } from "@/lib/state/profile-state-generation";
// import { classNames } from "@/lib/utils";

// interface NavigationToggleProps {}

// const NavigationToggle = ({}: NavigationToggleProps) => {
//   const { isLarge } = useQueryStore();
//   const { setIsMenuOpen, isMenuOpen } = useProfileStore();
//   if (!isLarge) {
//     return (
//       <button
//         onClick={() => {
//           setIsMenuOpen(!isMenuOpen);
//         }}
//         className={classNames(
//           "menu-toggle",
//           isMenuOpen ? "menu-toggle-active" : ""
//         )}
//       >
//         <span></span>
//       </button>
//     );
//   } else return null;
// };

// export default NavigationToggle;

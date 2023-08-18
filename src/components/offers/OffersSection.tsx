// "use client";

// // types
// import { TrainerType } from "@/model/user";
// // components
// import { LucideUser, SendIcon } from "lucide-react";
// import Image from "next/image";
// import PersonAvatar from "../../../public/assets/undraw_person.png";
// import { useQueryStore } from "@/lib/state/media-queries-generation";

// interface OffersSectionProps {
//   data: TrainerType[];
// }

// const OffersSection = ({ data }: OffersSectionProps) => {
//   const { isLarge } = useQueryStore();

//   if (!data || !data.length) {
//     return (
//       <section className="bg-bg py-12">
//         <div className="container-md">
//           <h2 className="text-4xl text-black">Brak wyników...</h2>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section className="latest-offers bg-bg py-4 md:py-6 lg:py-12">
//       <div className="mx-auto w-[96%] max-w-[1280px] lg:w-[92%]">
//         <ul className="grid grid-flow-row grid-cols-1 items-start justify-between gap-x-4 lg:grid-cols-2 xxl:grid-cols-3">
//           {data.map((trainer) => {
//             return (
//               <li
//                 key={trainer.username}
//                 className="group relative mx-auto my-2 flex w-full max-w-3xl items-stretch rounded-l-sm bg-white shadow shadow-[#00000020] transition-shadow duration-300 after:absolute after:left-0 after:top-0 after:h-full after:w-1 after:rounded-l-sm after:bg-secondary_custom hover:shadow-md md:flex-row lg:my-4 lg:flex-col-reverse"
//               >
//                 <div className="z-[2] flex-1 self-center py-4 pl-5 pr-3 lg:self-start lg:px-6 lg:pb-6 lg:pt-4">
//                   <header className="mb-0.5 flex items-center justify-between text-black lg:mb-1">
//                     <h3 className="text-xl font-bold capitalize">
//                       {trainer.username}
//                     </h3>
//                   </header>
//                   <ul className="tags flex w-fit flex-wrap items-center justify-start gap-1 md:gap-2">
//                     {trainer.roles?.map((role, ind) => (
//                       <li
//                         className="rounded-sm bg-blue-100 px-2 py-[2px] text-[11px] font-[600] uppercase text-gray-800 md:text-xs md:font-bold md:text-gray-700 lg:text-[10px]"
//                         key={ind}
//                       >
//                         {role}
//                       </li>
//                     ))}
//                   </ul>
//                   <p
//                     id="description"
//                     className="mx-auto mb-[11px] mt-3 line-clamp-6 w-[105%] pb-[1px] text-left text-[13.5px] leading-normal tracking-[0.005em] md:w-full md:text-sm md:leading-tight lg:mb-1 lg:mt-4 lg:pb-5 lg:text-[15px]"
//                   >
//                     {trainer.summary}
//                   </p>
//                   <div className="flex w-full items-start justify-between gap-2">
//                     <a
//                       href={`oferty/${trainer.slug}`}
//                       title={`Profil ${trainer.username}`}
//                     >
//                       <button className="flex items-center justify-center gap-1 rounded-sm px-2 py-1 text-[13px] text-gray-700 ring-1 ring-gray-400 transition-all duration-300 hover:ring-2 hover:ring-gray-600 hover:ring-offset-1 focus:ring-2 focus:ring-gray-600 focus:ring-offset-1 md:gap-2 md:text-sm">
//                         <SendIcon size={16} className="relative -mb-[2px]" />
//                         Zobacz ofertę
//                       </button>
//                     </a>
//                     {/* <StarsRating rating={3.7} /> */}
//                   </div>
//                 </div>
//                 <div className="mx-auto flex w-full flex-1 border-spacing-1 items-center justify-center overflow-hidden border-2 border-b-0 border-l-0 border-secondary_light bg-slate-50 lg:m-auto lg:aspect-[16/10] lg:border-0">
//                   {trainer.image ? (
//                     <img
//                       src={trainer.image}
//                       loading="lazy"
//                       alt={`Zdjęcie profilowe ${trainer.username}`}
//                       className="h-full w-full object-cover transition-all duration-500 group-hover:scale-[1.07] lg:aspect-[16/10] lg:rounded-t"
//                     />
//                   ) : isLarge ? (
//                     <Image
//                       className="h-auto w-full object-cover"
//                       loading="lazy"
//                       alt={`Zdjęcie profilowe ${trainer.username}`}
//                       src={PersonAvatar}
//                     />
//                   ) : (
//                     <LucideUser size={30} className="my-10 text-gray-800" />
//                   )}
//                 </div>
//               </li>
//             );
//           })}
//         </ul>
//       </div>
//     </section>
//   );
// };

// export default OffersSection;

// "use client";

// import { useState } from "react";

// import { cn } from "@/lib/cn";
// import "./progressive-input-stack-style.css";

// const steps = [NameStep, EmailStep, ConfirmationStep];

// export function ProgressiveInputStack() {
//   const [currentStep, setCurrentStep] = useState(0);

//   const nextBtnLabel = currentStep === steps.length - 1 ? "Done" : "Next";

//   return (
//     <div className="min-h-fit w-full flex flex-col items-center justify-center p-6 py-20 pb-40 relative bg-[#121212]">
//       <div className="max-w-84 space-y-5 w-full [--transition-easing:cubic-bezier(.25,.46,.45,.94)]">
//         <h2 className="text-2xl font-medium text-white">Invite a friend</h2>
//         <div className="grid w-full items-start relative perspective-[1000px]">
//           {steps.map((Step, index) => {
//             const isMounted = currentStep >= index;
//             const isBehind = currentStep > index;

//             return (
//               <div
//                 data-mounted={isMounted}
//                 data-behind={isBehind}
//                 key={index}
//                 style={
//                   {
//                     "--index": index,
//                     "--total-steps": currentStep + 1,
//                   } as React.CSSProperties
//                 }
//                 className={cn(
//                   "step w-full relative [grid-area:1/1] [transition:translate_0.3s_var(--transition-easing),scale_0.3s_var(--transition-easing),opacity_0.3s_var(--transition-easing)] data-[behind=true]:scale-[calc(1-(var(--total-steps)-var(--index)-1)*0.05)] data-[behind=true]:translate-y-[calc((var(--total-steps)-var(--index)-1)*-13%)]"
//                 )}
//               >
//                 <Step />
//               </div>
//             );
//           })}
//         </div>

//         <div className="flex items-center justify-between">
//           <button
//             data-mounted={currentStep > 0}
//             data-slot="button"
//             className="prev-btn inline-flex relative items-center justify-center gap-2 whitespace-nowrap font-medium disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-black/50 focus-visible:ring-[3px] disabled:opacity-50 bg-[#242424] px-4 py-2 size-12 rounded-full transition-all active:scale-95 cursor-pointer"
//             onClick={() => {
//               if (currentStep > 0) {
//                 setCurrentStep(currentStep - 1);
//               }
//             }}
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="white"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               className="size-5"
//             >
//               <path d="m12 19-7-7 7-7"></path>
//               <path d="M19 12H5"></path>
//             </svg>
//           </button>
//           <button
//             data-slot="button"
//             data-last-step={currentStep === steps.length - 1}
//             className="next-btn group inline-flex relative items-center justify-center gap-3 whitespace-nowrap disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-white/50 focus-visible:ring-[3px] disabled:opacity-50 bg-white text-black px-4 py-2 hover:text-black h-12 w-24 rounded-full font-bold transition-all active:scale-95 cursor-pointer overflow-hidden"
//             onClick={() => {
//               if (currentStep < steps.length - 1) {
//                 setCurrentStep(currentStep + 1);
//               } else {
//                 setCurrentStep(0);
//               }
//             }}
//           >
//             <span className="group-data-[last-step=false]:-translate-x-[40px] group-data-[last-step=true]:translate-x-0 [transition:translate_0.3s_var(--transition-easing)]">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 className="size-5"
//               >
//                 <path d="M20 6 9 17l-5-5"></path>
//               </svg>
//             </span>
//             <span
//               className="group-data-[last-step=false]:-translate-x-[20px] group-data-[last-step=true]:translate-x-0 [transition:translate_0.3s_var(--transition-easing)]"
//               key={nextBtnLabel}
//             >
//               {nextBtnLabel.split("").map((char, kindex) => (
//                 <span
//                   key={kindex}
//                   className="inline-block text-reveal"
//                   style={
//                     {
//                       "--delay": `calc(0.025s * ${kindex})`,
//                     } as React.CSSProperties
//                   }
//                 >
//                   {char}
//                 </span>
//               ))}
//             </span>
//             <span className="group-data-[last-step=false]:-translate-x-[10px] group-data-[last-step=true]:translate-x-[40px] [transition:translate_0.3s_var(--transition-easing)]">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 className="size-5"
//               >
//                 <path d="M5 12h14"></path>
//                 <path d="m12 5 7 7-7 7"></path>
//               </svg>
//             </span>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// function NameStep() {
//   return (
//     <div className="relative w-full">
//       <input
//         type="text"
//         id="name"
//         className="flex min-w-0 rounded-[12px] bg-[#181818] border border-[#242424] px-4 py-1 transition-[color,box-shadow] h-12 outline-none w-full placeholder:text-[#7f7f7f] text-white"
//         placeholder="Friend's name"
//         autoComplete="off"
//       />
//     </div>
//   );
// }

// function EmailStep() {
//   return (
//     <div className="relative w-full">
//       <input
//         type="email"
//         id="email"
//         className="flex min-w-0 rounded-[12px] bg-[#181818] border border-[#242424] px-4 py-1 transition-[color,box-shadow] h-12 outline-none w-full placeholder:text-[#7f7f7f] text-white"
//         placeholder="Friend's email"
//         autoComplete="off"
//       />
//     </div>
//   );
// }

// function ConfirmationStep() {
//   return (
//     <div className="flex items-center gap-3 rounded-[12px] border border-[#242424] p-4 bg-[#181818]">
//       <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center">
//         <svg
//           width="16"
//           height="16"
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="2"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           className="text-green-500"
//         >
//           <path d="M20 6L9 17l-5-5"></path>
//         </svg>
//       </div>
//       <div className="min-w-0">
//         <p className="text-white font-medium text-sm">
//           Reminder set for tomorrow
//         </p>
//         <p className="text-white/50 text-xs">We'll notify you to check in</p>
//       </div>
//     </div>
//   );
// }

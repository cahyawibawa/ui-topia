// import "./orbit-spinner-style.css";

// export const OrbitingSpinner = () => {
//   const tickCount = 30;

//   return (
//     <div className="relative transform-3d perspective-[300px]">
//       <div className="bg-[#fdfdfc] dark:bg-[#111110] size-[140px] flex items-center justify-center rounded-full">
//         <div className="relative size-[90px] mx-auto rounded-full main-spinner">
//           {Array.from({ length: tickCount }).map((_, i) => {
//             return (
//               <div
//                 key={i}
//                 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 tick-element"
//                 style={{
//                   transform: `rotate(${(360 / tickCount) * i
//                     }deg) translateY(-53px)`,
//                 }}
//               />
//             );
//           })}
//         </div>
//       </div>

//       <svg
//         width="70"
//         height="70"
//         viewBox="0 0 70 70"
//         xmlns="http://www.w3.org/2000/svg"
//         className="rounded-full bg-[#fdfdfc] dark:bg-[#111110] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-orbit"
//       >
//         <circle
//           cx="35"
//           cy="35"
//           r="22"
//           stroke="#ec5433"
//           strokeWidth="7"
//           fill="none"
//         />
//       </svg>
//     </div>
//   );
// };

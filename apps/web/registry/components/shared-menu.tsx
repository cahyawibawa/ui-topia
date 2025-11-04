// "use client";
// import { AnimatePresence, motion } from "framer-motion";
// import { LayoutTemplate, List, Package } from "lucide-react";
// import { useState } from "react";
// import { cn } from "@/lib/utils";

// interface SharedProps {
//   data: {
//     id: number;
//     name: string;
//     price: string;
//     img: string;
//   }[];
//   tabsActiveBgColor?: string;
//   cardColumns?: string;
//   showDivider?: boolean;
//   containerClass?: string;
//   itemContainerClass?: string;
// }

// const viewOptions = [
//   {
//     value: "list",
//     label: "List view",
//     IconComponent: List,
//   },
//   {
//     value: "card",
//     label: "Card view",
//     IconComponent: LayoutTemplate,
//   },
//   {
//     value: "pack",
//     label: "Pack view",
//     IconComponent: Package,
//   },
// ];

// const SharedMenu = ({
//   data,
//   tabsActiveBgColor = "bg-green-800",
//   cardColumns = "grid-cols-2",
//   showDivider = true,
//   containerClass,
//   itemContainerClass,
// }: SharedProps) => {
//   const [status, setStatus] = useState("list");

//   const updateStatus = (newStatus: string) => {
//     setStatus(newStatus);
//   };

//   const itemVariants = {
//     hidden: { y: 0 },
//     visible: { y: 0, transition: { duration: 0.3 } },
//     exit: { y: 0, transition: { duration: 0.3 } },
//   };

//   const packVariants = {
//     hidden: {},
//     visible: { transition: { duration: 0.3 } },
//     exit: { transition: { duration: 0.3 } },
//   };

//   const packImageVariants1 = {
//     initial: { rotate: 0, scale: 1 },
//     animate: { rotate: -10, scale: 1 },
//     exit: { rotate: 0, scale: 1 },
//   };

//   const packImageVariants2 = {
//     initial: { rotate: 0, scale: 1 },
//     animate: { rotate: 10, scale: 1 },
//     exit: { rotate: 0, scale: 1 },
//   };

//   const textVariants = {
//     hidden: { y: 15, opacity: 0 },
//     visible: { y: 0, opacity: 1, transition: { duration: 0.3, delay: 0.4 } },
//     exit: { y: 15, opacity: 0, transition: { duration: 0.3 } },
//   };

//   return (
//     <div className={cn("flex flex-col gap-4", containerClass)}>
//       <div className="flex items-center justify-center gap-1">
//         {viewOptions.map((option) => {
//           const isActive = status === option.value;
//           const Icon = option.IconComponent;
//           // ? nav buttons
//           return (
//             <button
//               key={option.value}
//               onClick={() => updateStatus(option.value)}
//               className={cn(
//                 "flex cursor-pointer items-center justify-center gap-1 rounded-full bg-neutral-800 px-4 py-2 text-white text-xs transition-colors duration-200 ease-in-out sm:text-sm",
//                 isActive &&
//                   tabsActiveBgColor +
//                     " text-white [box-shadow:0_0_12px_-2px_#ffffff_inset]",
//               )}
//               aria-pressed={isActive}
//               title={`Switch to ${option.label}`}
//             >
//               <Icon className="w-5" aria-hidden="true" />
//               {option.label}
//             </button>
//           );
//         })}
//       </div>
//       {showDivider && <hr className="h-1 text-border" />}
//       <div className={cn("relative h-60", itemContainerClass)}>
//         <AnimatePresence mode="sync">
//           {status === "list" && (
//             <motion.div
//               key="list"
//               className="absolute top-0 left-0 w-full"
//               initial="hidden"
//               animate="visible"
//               exit="exit"
//               variants={{
//                 hidden: { opacity: 1 },
//                 visible: { opacity: 1 },
//                 exit: { opacity: 1 },
//               }}
//               transition={{ duration: 0.3 }}
//             >
//               {data.map((item) => (
//                 <motion.div
//                   key={item.id}
//                   className="my-2 flex h-full w-full items-center justify-between"
//                   variants={itemVariants}
//                 >
//                   <div className="flex gap-2">
//                     <motion.img
//                       src={item.img}
//                       alt={item.name}
//                       className="aspect-square w-16 rounded-lg object-cover"
//                       layoutId={`${item.id}_img`}
//                     />
//                     <motion.div
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: 1, transition: { delay: 0.2 } }}
//                       exit={{ opacity: 0 }}
//                     >
//                       <motion.h3
//                         className="font-medium"
//                         layoutId={`${item.id}_heading`}
//                       >
//                         {item.name}
//                       </motion.h3>
//                       <motion.p
//                         className="font-medium text-sm"
//                         layoutId={`${item.id}_price`}
//                       >
//                         {item.price} <span className="text-[#818181]">ETH</span>
//                       </motion.p>
//                     </motion.div>
//                   </div>
//                   <motion.div
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     exit={{ opacity: 0 }}
//                     className="flex items-center gap-1 text-[#818181] text-sm"
//                     layoutId={`${item.id}_id`}
//                   >
//                     #{item.id}
//                   </motion.div>
//                 </motion.div>
//               ))}
//             </motion.div>
//           )}

//           {status === "card" && (
//             <motion.div
//               key="card"
//               className="absolute top-0 left-0 w-full" // Take full width
//               initial="hidden"
//               animate="visible"
//               exit="exit"
//               variants={{
//                 hidden: { opacity: 1 },
//                 visible: { opacity: 1 },
//                 exit: { opacity: 1 },
//               }}
//               transition={{ duration: 0.3 }}
//             >
//               <div className={cn("grid w-full grid-cols-2 gap-4", cardColumns)}>
//                 {data.map((item) => (
//                   <motion.div
//                     key={item.id}
//                     className="flex w-[100%] flex-col gap-2"
//                     variants={itemVariants}
//                   >
//                     <motion.img
//                       src={item.img}
//                       alt={item.name}
//                       className="aspect-square w-[100%] rounded-xl object-cover"
//                       layoutId={`${item.id}_img`}
//                     />
//                     <motion.div
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: 1 }}
//                       exit={{ opacity: 0 }}
//                     >
//                       <motion.h3
//                         className="mb-1 font-medium"
//                         layoutId={`${item.id}_heading`}
//                       >
//                         {item.name}
//                       </motion.h3>
//                       <div className="flex items-center justify-between font-medium text-sm">
//                         <motion.p layoutId={`${item.id}_price`}>
//                           {item.price}{" "}
//                           <span className="text-[#818181]">ETH</span>
//                         </motion.p>
//                         <motion.div
//                           className="flex items-center gap-1 text-[#818181] text-sm"
//                           layoutId={`${item.id}_id`}
//                         >
//                           #{item.id}
//                         </motion.div>
//                       </div>
//                     </motion.div>
//                   </motion.div>
//                 ))}
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {status === "pack" && (
//           <motion.div
//             key="pack"
//             className="absolute top-3 left-0 h-full w-full"
//             initial="hidden"
//             animate="visible"
//             exit="exit"
//             variants={packVariants}
//             transition={{ duration: 0.3 }}
//           >
//             <div className="flex h-[80%] flex-col">
//               <div className="relative h-full ">
//                 <motion.div className="-translate-x-1/2 absolute top-0 left-1/2 aspect-square h-full w-32 transform">
//                   <motion.img
//                     src={data[0].img}
//                     alt={data[0].name}
//                     className="aspect-square rounded-xl object-cover "
//                     variants={packImageVariants1}
//                     initial="initial"
//                     animate="animate"
//                     transition={{ duration: 0.3 }}
//                     layoutId={`${data[0].id}_img`}
//                   />
//                 </motion.div>
//                 <motion.div className="-translate-x-1/2 absolute top-0 left-1/2 z-10 aspect-square h-full w-32 transform">
//                   <motion.img
//                     src={data[1].img}
//                     alt={data[1].name}
//                     className="aspect-square rounded-xl object-cover"
//                     variants={packImageVariants2}
//                     initial="initial"
//                     animate="animate"
//                     transition={{ duration: 0.3 }}
//                     layoutId={`${data[1].id}_img`}
//                   />
//                 </motion.div>
//                 {data.slice(2, data.length).map((item) => (
//                   <motion.div
//                     key={item.id}
//                     className="-translate-x-1/2 absolute top-0 left-1/2 z-40 aspect-square h-full w-32 transform"
//                   >
//                     <motion.img
//                       src={item.img}
//                       alt={item.name}
//                       className="aspect-square rounded-xl object-cover"
//                       variants={packImageVariants2}
//                       initial="initial"
//                       animate="animate"
//                       transition={{ duration: 0.3 }}
//                       layoutId={`${item.id}_img`}
//                     />
//                   </motion.div>
//                 ))}
//               </div>
//               <motion.div
//                 className="text-center"
//                 variants={textVariants}
//                 initial="hidden"
//                 animate="visible"
//               >
//                 <motion.h3 className="font-medium">
//                   {data.length} Collectibles
//                 </motion.h3>
//               </motion.div>
//             </div>
//           </motion.div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SharedMenu;

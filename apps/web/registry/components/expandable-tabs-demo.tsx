"use client";

import { Bell, HelpCircle, Home, Settings, Shield } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { type JSX, useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";

interface Tab {
  title: string;
  icon: JSX.Element;
  type?: never;
}

interface Separator {
  type: "separator";
  title?: never;
  icon?: never;
}

type TabItem = Tab | Separator;

export default function ExpandableTabs() {
  const [selected, setSelected] = useState<number | null>(null);
  // Fix: Initialize ref with HTMLDivElement type
  const outsideClickRef = useRef<HTMLDivElement>(null!);

  useOnClickOutside(outsideClickRef, () => setSelected(null));

  const tabs: TabItem[] = [
    { title: "Dashboard", icon: <Home size={16} /> },
    { title: "Notifications", icon: <Bell size={16} /> },
    { type: "separator" },
    { title: "Settings", icon: <Settings size={16} /> },
    { title: "Support", icon: <HelpCircle size={16} /> },
    { title: "Security", icon: <Shield size={16} /> },
  ];

  const buttonVariants = {
    initial: {
      gap: 0,
      paddingLeft: ".5rem",
      paddingRight: ".5rem",
    },
    animate: (isSelected: boolean) => ({
      gap: isSelected ? ".5rem" : 0,
      paddingLeft: isSelected ? "1rem" : ".5rem",
      paddingRight: isSelected ? "1rem" : ".5rem",
    }),
  };

  const spanVariants = {
    initial: { width: 0, opacity: 0 },
    animate: { width: "auto", opacity: 1 },
    exit: { width: 0, opacity: 0 },
  };

  const transition = { delay: 0.1, type: "spring", bounce: 0, duration: 0.6 };

  const Separator = () => (
    <div className="mx-1 h-[24px] w-[1.2px] bg-[#555555]" aria-hidden="true" />
  );

  return (
    <div className="mx-auto flex items-center justify-center">
      <div
        ref={outsideClickRef}
        className="flex flex-wrap items-center gap-2 rounded-2xl border border-neutral-800 bg-neutral-900 p-1 shadow-[0_6px_24px_rgba(34,42,53,0.12),0_0_0_1px_rgba(34,42,53,0.05),0_4px_8px_rgba(34,42,53,0.08),0_1px_1px_rgba(34,42,53,0.10)]"
      >
        {tabs.map((tab, index) => {
          if (tab.type === "separator") {
            return <Separator key={`separator-${index}`} />;
          }
          return (
            <motion.button
              key={tab.title}
              variants={buttonVariants}
              initial={false}
              animate="animate"
              custom={selected === index}
              onClick={() => setSelected(index)}
              transition={transition}
              className={`${
                selected === index
                  ? "bg-neutral-800 text-opacity-100 [&]:text-blue-500"
                  : "hover:bg-neutral-800"
              } relative flex items-center rounded-xl px-4 py-2 font-medium text-white text-xs transition-colors duration-300`}
            >
              {tab.icon}
              <AnimatePresence initial={false}>
                {selected === index && (
                  <motion.span
                    variants={spanVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={transition}
                    className="overflow-hidden"
                  >
                    {tab.title}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

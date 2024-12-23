"use client";

import { Button } from "@/components/ui/button";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

const arrowVariants: Variants = {
  normal: { y: 0 },
  animate: {
    y: 2,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 10,
      mass: 1,
    },
  },
};

export default function ButtonDemo() {
  const controls = useAnimation();
  return (
    <Button
      onMouseEnter={() => controls.start("animate")}
      onMouseLeave={() => controls.start("normal")}
    >
      <span className="text-zinc-100 dark:text-zinc-600">Download</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <motion.g variants={arrowVariants} animate={controls}>
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" x2="12" y1="15" y2="3" />
        </motion.g>
      </svg>
    </Button>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import type { Transition, Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

const gVariants: Variants = {
  normal: { rotate: 0 }, // if you want to start from a different angle, change this value or remove it entirely
  animate: {
    rotate: 360,
    transition: {
      repeat: Number.POSITIVE_INFINITY,
      duration: 1,
      ease: "linear",
    },
  },
};

const defaultTransition: Transition = {
  type: "spring",
  stiffness: 50,
  damping: 10,
};

export default function ButtonDemo() {
  const controls = useAnimation();
  return (
    <Button
      className="rounded-full"
      variant="outline"
      size="icon"
      aria-label="Spinning"
      onMouseEnter={() => controls.start("animate")}
      onMouseLeave={() => controls.start("normal")}
    >
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
        <motion.g
          transition={defaultTransition}
          variants={gVariants}
          animate={controls}
        >
          <path d="M22 12a1 1 0 0 1-10 0 1 1 0 0 0-10 0" />
          <path d="M7 20.7a1 1 0 1 1 5-8.7 1 1 0 1 0 5-8.6" />
          <path d="M7 3.3a1 1 0 1 1 5 8.6 1 1 0 1 0 5 8.6" />
        </motion.g>
        <circle cx="12" cy="12" r="10" />
      </svg>
    </Button>
  );
}

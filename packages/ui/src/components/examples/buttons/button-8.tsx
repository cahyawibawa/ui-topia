"use client";

import { Button } from "@/components/ui/button";
import type { Transition } from "motion/react";
import { motion, useAnimation } from "motion/react";

const defaultTransition: Transition = {
  type: "spring",
  stiffness: 160,
  damping: 17,
  mass: 1,
};

export default function CopyButton() {
  const controls = useAnimation();

  return (
    <Button
      variant="outline"
      size="icon"
      onMouseEnter={() => controls.start("animate")}
      onMouseLeave={() => controls.start("normal")}
      aria-label="Copy"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <motion.rect
          width="14"
          height="14"
          x="8"
          y="8"
          rx="2"
          ry="2"
          variants={{
            normal: { translateY: 0, translateX: 0 },
            animate: { translateY: -3, translateX: -3 },
          }}
          animate={controls}
          transition={defaultTransition}
        />
        <motion.path
          d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"
          variants={{
            normal: { x: 0, y: 0 },
            animate: { x: 3, y: 3 },
          }}
          transition={defaultTransition}
          animate={controls}
        />
      </svg>
    </Button>
  );
}

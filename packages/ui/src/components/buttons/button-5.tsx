"use client";

import { Button } from "@/components/shadcn-ui/button";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

const pathVariants: Variants = {
  normal: { pathLength: 1, opacity: 1, pathOffset: 0 },
  animate: {
    pathLength: [0, 1],
    opacity: [0, 1],
    pathOffset: [1, 0],
  },
};

const lineVariants: Variants = {
  normal: { pathLength: 1, opacity: 1, pathOffset: 0 },
  animate: {
    pathLength: [0, 1],
    opacity: [0, 1],
    pathOffset: [1, 0],
  },
};

const underVariants: Variants = {
  normal: { pathLength: 1, opacity: 1, pathOffset: 0 },
  animate: {
    pathLength: [0, 1],
    opacity: [0, 1],
    pathOffset: [1, 0],
  },
};

export default function ButtonDemo() {
  const controls1 = useAnimation();
  const controls2 = useAnimation();
  const controls3 = useAnimation();

  return (
    <div className="-space-x-px inline-flex rounded-lg shadow-black/5 shadow-sm rtl:space-x-reverse">
      <Button
        className="rounded-none shadow-none first:rounded-s-lg last:rounded-e-lg focus-visible:z-10"
        variant="outline"
        onMouseEnter={() => controls1.start("animate")}
        onMouseLeave={() => controls1.start("normal")}
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
          <motion.path
            variants={pathVariants}
            transition={{ duration: 0.6 }}
            animate={controls1}
            d="M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8"
          />
        </svg>
        Bold
      </Button>
      <Button
        className="rounded-none shadow-none first:rounded-s-lg last:rounded-e-lg focus-visible:z-10"
        variant="outline"
        onMouseEnter={() => controls2.start("animate")}
        onMouseLeave={() => controls2.start("normal")}
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
          <motion.line
            transition={{ duration: 0.2 }}
            variants={lineVariants}
            animate={controls2}
            x1="19"
            x2="10"
            y1="4"
            y2="4"
          />
          <motion.line
            transition={{ duration: 0.2 }}
            variants={lineVariants}
            animate={controls2}
            x1="14"
            x2="5"
            y1="20"
            y2="20"
          />
          <motion.line
            transition={{
              delay: 0.1,
              duration: 0.4,
            }}
            variants={{
              normal: { pathLength: 1, pathOffset: 0 },
              animate: {
                pathLength: [0, 1],
                pathOffset: [1, 0],
              },
            }}
            animate={controls2}
            x1="15"
            x2="9"
            y1="4"
            y2="20"
          />
        </svg>
        Italic
      </Button>
      <Button
        className="rounded-none shadow-none first:rounded-s-lg last:rounded-e-lg focus-visible:z-10"
        variant="outline"
        size="icon"
        aria-label="Menu"
        onMouseEnter={() => controls3.start("animate")}
        onMouseLeave={() => controls3.start("normal")}
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
          <motion.path
            transition={{ duration: 0.3 }}
            variants={underVariants}
            animate={controls3}
            d="M6 4v6a6 6 0 0 0 12 0V4"
          />
          <motion.line
            x1="4"
            x2="20"
            y1="20"
            y2="20"
            variants={underVariants}
            transition={{
              delay: 0.2,
              duration: 0.4,
            }}
            animate={controls3}
          />
        </svg>
      </Button>
    </div>
  );
}

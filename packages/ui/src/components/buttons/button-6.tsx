import { Button } from "@/components/shadcn-ui/button";
import Image from "next/image";

import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

const circleVariants: Variants = {
  normal: {
    opacity: 1,
    pathLength: 1,
    pathOffset: 0,
    transition: {
      duration: 0.4,
      opacity: { duration: 0.1 },
    },
  },
  animate: {
    opacity: [0, 1],
    pathLength: [0, 1],
    pathOffset: [1, 0],
    transition: {
      duration: 0.3,
      opacity: { duration: 0.1 },
    },
  },
};

const pathVariants: Variants = {
  normal: {
    opacity: 1,
    pathLength: 1,
    transition: {
      delay: 0.3,
      duration: 0.3,
      opacity: { duration: 0.1, delay: 0.3 },
    },
  },
  animate: {
    opacity: [0, 1],
    pathLength: [0, 1],
    transition: {
      delay: 0.3,
      duration: 0.3,
      opacity: { duration: 0.1, delay: 0.3 },
    },
  },
};

export default function ButtonDemo() {
  const controls = useAnimation();
  return (
    <Button
      className="rounded-full py-0"
      variant="outline"
      onMouseEnter={() => controls.start("animate")}
      onMouseLeave={() => controls.start("normal")}
    >
      {/* <div className="me-0.5 flex aspect-square h-full p-1.5">
        <Image
          className="h-auto w-full rounded-full"
          src="/images/avatar.png"
          alt="Profile image"
          width={24}
          height={24}
          aria-hidden="true"
        />
      </div> */}
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
        <motion.circle
          variants={circleVariants}
          animate={controls}
          cx="12"
          cy="12"
          r="4"
        />
        <motion.path
          variants={pathVariants}
          animate={controls}
          d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8"
        />
      </svg>
      <span className="inset-0">kyuotaka</span>
    </Button>
  );
}

"use client";
import { Button } from "@/components/shadcn-ui/button";
import { motion, useAnimation } from "motion/react";

export default function ButtonDemo() {
  const controls = useAnimation();
  return (
    <Button
      className="py-0 pe-0"
      variant="outline"
      onMouseEnter={() => controls.start("animate")}
      onMouseLeave={() => controls.start("normal")}
    >
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={{
          normal: {
            translateX: "0px",
            translateY: "0px",
            rotate: "0deg",
          },
          animate: {
            translateX: "-1px",
            translateY: "-2px",
            rotate: "-12deg",
          },
        }}
        animate={controls}
        transition={{ type: "spring", stiffness: 250, damping: 25 }}
      >
        <path d="M7 10v12" />
        <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" />
      </motion.svg>
      Upvote
      <span className="relative ms-3 inline-flex h-full items-center justify-center rounded-full px-3 font-medium text-muted-foreground text-xs before:absolute before:inset-0 before:left-0 before:w-px before:bg-input">
        86
      </span>
    </Button>
  );
}

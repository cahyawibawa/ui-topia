"use client";

import TextLoop from "@/registry/ui/text-loop";

export default function TextLoopDemo() {
  return (
    <h3 className="inline-flex whitespace-pre-wrap text-base">
      Some days you're{" "}
      <TextLoop
        className="overflow-y-clip font-medium text-yellow-600"
        interval={2.5}
        transition={{
          damping: 80,
          mass: 10,
          stiffness: 900,
          type: "spring",
        }}
        variants={{
          animate: {
            filter: "blur(0px)",
            opacity: 1,
            rotateX: 0,
            y: 0,
          },
          exit: {
            filter: "blur(4px)",
            opacity: 0,
            rotateX: -90,
            y: -20,
          },
          initial: {
            filter: "blur(4px)",
            opacity: 0,
            rotateX: 90,
            y: 20,
          },
        }}
      >
        <span>Healing</span>
        <span>Feeling</span>
        <span>Thriving</span>
        <span>Surviving</span>
      </TextLoop>
    </h3>
  );
}

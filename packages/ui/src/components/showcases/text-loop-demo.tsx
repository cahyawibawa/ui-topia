"use client";

import TextLoop from "@/components/elements/texts/text-loop";

export default function TextLoopDemo() {
  return (
    <h3 className="inline-flex whitespace-pre-wrap text-base">
      Some days you're{" "}
      <TextLoop
        className="overflow-y-clip font-medium text-yellow-600"
        transition={{
          type: "spring",
          stiffness: 900,
          damping: 80,
          mass: 10,
        }}
        interval={2.5}
        variants={{
          initial: {
            y: 20,
            rotateX: 90,
            opacity: 0,
            filter: "blur(4px)",
          },
          animate: {
            y: 0,
            rotateX: 0,
            opacity: 1,
            filter: "blur(0px)",
          },
          exit: {
            y: -20,
            rotateX: -90,
            opacity: 0,
            filter: "blur(4px)",
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

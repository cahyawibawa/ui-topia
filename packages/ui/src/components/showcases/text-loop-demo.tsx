"use client";

import TextLoop from "@/components/texts/text-loop";

export default function TextLoopDemo() {
  return (
    <h3 className="inline-flex whitespace-pre-wrap text-base">
      Make your website look{" "}
      <TextLoop
        className="overflow-y-clip font-medium text-primary"
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
        <span>Shiny</span>
        <span>Intuitive</span>
        <span>Effortless</span>
      </TextLoop>
    </h3>
  );
}

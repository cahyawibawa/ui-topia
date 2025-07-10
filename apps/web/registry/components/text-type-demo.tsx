"use client";

import TextType from "@/registry/ui/text-type";

export default function TextLoopDemo() {
  return (
    <h3 className="inline-flex whitespace-pre-wrap text-base">
      <span>{"Don't forget how "}</span>
      <TextType
        className="text-yellow-600"
        cursorChar={"|"}
        deleteSpeed={40}
        speed={60}
        text={[
          "loved",
          "talented",
          "capable",
          "special",
          "worthy",
          "powerful",
          "inspiring",
          "unstoppable",
          "resilient",
          "boundless",
          "needed",
          "extraordinary",
        ]}
        waitTime={1500}
      />
      <span>{" you are."}</span>
    </h3>
  );
}

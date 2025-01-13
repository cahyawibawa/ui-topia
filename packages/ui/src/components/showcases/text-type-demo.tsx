"use client";

import TextType from "@/components/elements/texts/text-type";

export default function TextLoopDemo() {
  return (
    <h3 className="inline-flex whitespace-pre-wrap text-base">
      <span>{"Don't forget how "}</span>
      <TextType
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
        speed={60}
        className="text-yellow-600"
        waitTime={1500}
        deleteSpeed={40}
        cursorChar={"|"}
      />
      <span>{" you are."}</span>
    </h3>
  );
}

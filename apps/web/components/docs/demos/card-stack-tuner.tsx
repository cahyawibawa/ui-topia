"use client";

import { TuneKit } from "@/components/docs/tune-kit";
import CardStack from "@/registry/ui/card-stack";

const PALETTE = [
  [152, 190],
  [28, 350],
  [250, 200],
  [215, 320],
  [300, 60],
  [90, 20],
  [180, 280],
  [340, 120],
];

/** Gradient art for card `i`: two soft blobs on a tinted ground. */
function Art({ index }: { index: number }) {
  const [a, b] = PALETTE[index % PALETTE.length] ?? [200, 20];
  return (
    <div
      className="size-full"
      style={{
        background: `radial-gradient(70% 60% at 30% 28%, oklch(0.8 0.16 ${a}) 0%, transparent 70%), radial-gradient(60% 55% at 72% 74%, oklch(0.7 0.19 ${b}) 0%, transparent 72%), oklch(0.36 0.07 ${a})`,
      }}
    />
  );
}

export function CardStackTuner() {
  return (
    <TuneKit
      controls={[
        { key: "bounce", label: "Bounce", min: 0, max: 10, value: 3 },
        { key: "scatter", label: "Scatter", min: 0, max: 10, value: 0 },
        { key: "spread", label: "Spread", min: 0, max: 120, value: 60 },
        { key: "cards", label: "Cards", min: 2, max: 8, value: 5 },
        {
          key: "corner",
          label: "Corner",
          min: 0,
          max: 32,
          value: 14,
          unit: "px",
        },
      ]}
      description="A small deck that fans out as you reach it. Hover to draw a card up, click one to bring it to the middle, and click away to put it back."
      title="Card stack"
    >
      {(v) => (
        <CardStack
          bounce={(v.bounce ?? 0) / 10}
          corner={v.corner}
          scatter={(v.scatter ?? 0) / 10}
          spread={v.spread}
        >
          {Array.from({ length: v.cards ?? 5 }, (_, i) => (
            <Art index={i} key={i} />
          ))}
        </CardStack>
      )}
    </TuneKit>
  );
}

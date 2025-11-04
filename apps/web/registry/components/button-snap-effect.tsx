import { Trash2 } from "lucide-react";
import { AnimatePresence } from "motion/react";

import { ThanosSnapEffect } from "./snap-effect";

export default function SnapEffectDemo() {
  return (
    <div className="text-white">
      <AnimatePresence mode="wait">
        <ThanosSnapEffect>
          <button className="inline-flex h-9 items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground text-sm shadow-black/5 shadow-sm outline-offset-2 transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0">
            <Trash2 size={16} strokeWidth={2} />
            Click to delete
          </button>
        </ThanosSnapEffect>
      </AnimatePresence>
    </div>
  );
}

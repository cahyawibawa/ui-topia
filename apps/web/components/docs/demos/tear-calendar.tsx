"use client";

import { Volume2, VolumeX } from "lucide-react";
import { useState } from "react";
import TearCalendar from "@/registry/ui/tear-calendar";

/** The calendar draws its own stage. Sound starts off: audio is opt-in. */
export function TearCalendarDemo() {
  const [sound, setSound] = useState(false);

  return (
    <figure
      className="not-prose relative my-8"
      data-preview-target="tear-calendar"
    >
      <TearCalendar sound={sound} />
      <button
        aria-label={sound ? "Mute sound" : "Turn sound on"}
        aria-pressed={sound}
        className="absolute right-3 bottom-3 z-10 grid size-8 place-items-center rounded-full bg-background text-muted-foreground shadow-[0_0_0_1px_color-mix(in_oklab,var(--foreground)_8%,transparent)] outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
        data-preview-hide
        onClick={() => setSound((v) => !v)}
        onPointerDown={(e) => e.stopPropagation()}
        type="button"
      >
        {sound ? (
          <Volume2 className="size-4" />
        ) : (
          <VolumeX className="size-4" />
        )}
      </button>
    </figure>
  );
}

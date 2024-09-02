"use client";
import Globe from "@/components/globe";
import { Icons } from "@/components/icons";

export default function GlobeCardDemo() {
  return (
    <div className="group relative mx-auto flex h-80 w-full max-w-md flex-col overflow-hidden rounded-2xl border border-muted bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(40%_128px_at_50%_0%,theme(backgroundColor.white/5%),transparent)]"></div>

      <div>
        <Globe
          dark
          baseColor="#777A80"
          glowColor="#50505A"
          markerColor="#22d3ee"
          opacity={0.85}
          brightness={1}
          offsetX={120}
          offsetY={64}
          scale={1.125}
        />
      </div>

      <div className="pointer-events-none mt-auto px-6 pb-6">
        <div className="group-hover:-translate-y-9 relative transition duration-300">
          <div className="text-foreground text-lg transition-all duration-300 group-hover:text-base">
            Interactive components
          </div>

          <p className="mt-2 font-light text-muted-foreground text-sm leading-relaxed">
            Build interactive headlines and content blocks that react as users
            interact with elements or scroll through the page.
          </p>

          <div className="-left-2 absolute bottom-0 translate-y-11 opacity-0 transition duration-300 group-hover:opacity-100">
            <a
              href="/components"
              className="pointer-events-auto inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 font-medium text-white text-xs transition hover:bg-white/5"
            >
              <span>Explore components</span>

              <Icons.arrowUpRight className="size-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

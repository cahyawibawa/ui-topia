"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { MakerCredit } from "@/components/docs/maker-credit";

/**
 * A showcase tile: a looping preview clip with the title and date underneath.
 *
 * The clip plays while the card is near the viewport and pauses when it leaves,
 * rather than on hover, so touch screens see it too. `preload="none"` means a
 * clip is only fetched once it is about to play. Until it has a frame the tile
 * is a pulsing block, and the clip fades in over it. Under reduced motion it
 * never plays and shows its poster.
 *
 * Without a clip (`slug` omitted) the tile shows a quiet placeholder. The maker's
 * credit sits on the tile as its own link, so the card is one link stretched
 * across it rather than a link around another link.
 */
export function VideoCard({
  href,
  title,
  date,
  slug,
  maker,
}: {
  href: string;
  title: string;
  date?: string;
  /** Clip name in /public/previews, when one has been recorded. */
  slug?: string;
  /** Whose work this is, a key of `MAKERS`. */
  maker?: string;
}) {
  const box = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const frame = box.current;
    const el = video.current;
    if (!frame || !el) return;

    const ready = () => {
      frame.dataset.ready = "true";
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      ready();
      return;
    }

    if (el.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) ready();
    el.addEventListener("loadeddata", ready);

    const observer = new IntersectionObserver(
      ([entry]) => {
        // a rejected play is the browser refusing autoplay; the card waits
        if (entry?.isIntersecting) el.play().catch(() => {});
        else el.pause();
      },
      // start 200px early so the placeholder is rarely what a reader sees
      { rootMargin: "200px 0px" },
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      el.removeEventListener("loadeddata", ready);
      el.pause();
    };
  }, []);

  return (
    <div className="group -m-2 relative flex flex-col gap-3 rounded-[1.25rem] p-2 transition-colors duration-200 hover:bg-accent/50 has-[[data-card-link]:focus-visible]:ring-2 has-[[data-card-link]:focus-visible]:ring-ring">
      <Link
        aria-label={title}
        className="absolute inset-0 rounded-[inherit] outline-none"
        data-card-link
        href={href}
      />
      {/* Concentric: card radius 0.75rem + 0.5rem padding = 1.25rem above. */}
      <div
        className="group/clip pointer-events-none relative aspect-[8/5] overflow-hidden rounded-xl bg-muted/60"
        ref={box}
      >
        {slug ? (
          <>
            <span
              aria-hidden
              className="absolute inset-0 bg-muted group-data-[ready=true]/clip:hidden motion-safe:animate-pulse"
            />
            <video
              className="absolute inset-0 size-full select-none object-cover opacity-0 transition-opacity duration-200 group-data-[ready=true]/clip:opacity-100"
              disablePictureInPicture
              loop
              muted
              playsInline
              poster={`/previews/${slug}.webp`}
              preload="none"
              ref={video}
              src={`/previews/${slug}.mp4`}
            />
          </>
        ) : (
          <div className="grid size-full place-items-center bg-[radial-gradient(color-mix(in_oklab,var(--foreground)_10%,transparent)_1px,transparent_1px)] [background-size:14px_14px]">
            <span className="rounded-full border border-dashed bg-background/70 px-2 py-0.5 text-[10px] text-muted-foreground">
              Preview soon
            </span>
          </div>
        )}
        {/* The edge is a layer over the clip: an inset ring on the box itself
            would paint underneath a full-size video and vanish. */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-foreground/8 ring-inset transition-shadow duration-200 group-hover:ring-foreground/15"
        />
        {maker && (
          <MakerCredit
            className="pointer-events-auto absolute bottom-1.5 left-1.5 z-10"
            maker={maker}
            variant="avatar"
          />
        )}
      </div>
      <div className="pointer-events-none flex items-baseline justify-between gap-3 text-sm">
        <span className="truncate lowercase">{title}</span>
        {date && (
          <time className="shrink-0 text-muted-foreground text-xs lowercase tabular-nums transition-colors group-hover:text-foreground">
            {date}
          </time>
        )}
      </div>
    </div>
  );
}

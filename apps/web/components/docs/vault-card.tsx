"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const TRACK = "transition-all duration-300 ease-out";

function TabularPreview({ active }: { active: boolean }) {
  const [n, setN] = useState(1111);

  useEffect(() => {
    if (!active) return setN(1111);
    const id = setInterval(() => setN((v) => (v === 1111 ? 8088 : 1111)), 700);
    return () => clearInterval(id);
  }, [active]);

  return (
    <div className="flex flex-col items-center gap-1 font-medium text-3xl">
      <span className="text-foreground">{n.toLocaleString("en-US")}</span>
      <span className="text-muted-foreground tabular-nums">
        {n.toLocaleString("en-US")}
      </span>
    </div>
  );
}

const previews: Record<
  string,
  (props: { active: boolean }) => React.ReactNode
> = {
  "building-a-button": ({ active }) => (
    <span
      className={cn(
        "rounded-lg bg-foreground px-4 py-2 font-medium text-background text-sm",
        TRACK,
        active && "scale-95 opacity-90",
      )}
    >
      Press me
    </span>
  ),
  "tabular-numbers": TabularPreview,
  "font-smoothing": ({ active }) => (
    <span
      className={cn("text-3xl tracking-tight", TRACK)}
      style={{ fontWeight: active ? 500 : 700 }}
    >
      Smooth
    </span>
  ),
  "text-wrapping": ({ active }) => (
    <p
      className="max-w-[9.5rem] text-center text-muted-foreground text-sm leading-snug"
      style={{ textWrap: active ? "balance" : "wrap" }}
    >
      Design is how it works, not only how it looks
    </p>
  ),
  "image-outlines": ({ active }) => (
    <span
      className={cn(
        "-outline-offset-1 size-16 rounded-xl bg-background outline outline-1",
        TRACK,
        active ? "outline-foreground/15" : "outline-transparent",
      )}
    />
  ),
  "shadows-not-borders": ({ active }) => (
    <span
      className={cn(
        "size-16 rounded-xl bg-background",
        TRACK,
        active
          ? "shadow-[0_0_0_1px_rgb(0_0_0/0.08),0_4px_12px_rgb(0_0_0/0.08)]"
          : "border",
      )}
    />
  ),
  "concentric-radius": ({ active }) => (
    <span
      className={cn(
        "flex size-20 items-center justify-center bg-muted p-2",
        TRACK,
      )}
      style={{ borderRadius: active ? 24 : 8 }}
    >
      <span
        className={cn("size-full bg-foreground/80", TRACK)}
        style={{ borderRadius: active ? 16 : 8 }}
      />
    </span>
  ),
  "optical-alignment": ({ active }) => (
    <span className="flex size-14 items-center justify-center rounded-full bg-foreground/10">
      <svg
        aria-hidden
        className={cn("size-6 text-foreground/70", TRACK)}
        style={{ transform: `translateX(${active ? 2 : 0}px)` }}
        viewBox="0 0 24 24"
      >
        <path d="M6 4v16l14-8z" fill="currentColor" />
      </svg>
    </span>
  ),
};

export function VaultCard({
  href,
  slug,
  title,
  description,
  soon,
}: {
  href: string;
  slug: string;
  title: string;
  description?: string;
  soon?: boolean;
}) {
  const [active, setActive] = useState(false);
  const Preview = previews[slug];

  const className = cn(
    "group flex h-full flex-col overflow-hidden rounded-2xl bg-background shadow-[0_0_0_1px_color-mix(in_oklab,var(--foreground)_8%,transparent)] transition-shadow",
    soon
      ? "cursor-not-allowed opacity-60"
      : "hover:shadow-[0_0_0_1px_color-mix(in_oklab,var(--foreground)_12%,transparent),0_4px_16px_color-mix(in_oklab,var(--foreground)_6%,transparent)]",
  );
  const body = (
    <>
      <div className="flex h-36 items-center justify-center bg-muted/40">
        {Preview && <Preview active={active} />}
      </div>
      <div className="flex flex-col gap-1 p-4">
        <span className="flex items-center justify-between gap-2 font-medium text-sm">
          {title}
          {soon && (
            <span className="rounded-full border border-dashed px-1.5 py-px font-normal text-[10px] text-muted-foreground">
              Soon
            </span>
          )}
        </span>
        {description && (
          <span className="line-clamp-2 text-muted-foreground text-xs leading-relaxed">
            {description}
          </span>
        )}
      </div>
    </>
  );

  if (soon) {
    return (
      <div aria-disabled="true" className={className}>
        {body}
      </div>
    );
  }

  return (
    <Link
      className={className}
      href={href}
      onBlur={() => setActive(false)}
      onFocus={() => setActive(true)}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      {body}
    </Link>
  );
}

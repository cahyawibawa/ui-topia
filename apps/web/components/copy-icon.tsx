"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";

// Dual-tone copy glyph: two rounded squares, the back one notched where the
// front overlaps. On `copied` the both squares give way to a full primary-coloured
// circle and a check turns upright inside it (the check is centred at 8,8). Colours and motion live in `.copy-icon`
// (styles/globals.css) so they follow the theme tokens.
export function CopyIcon({
  copied,
  className,
}: {
  copied: boolean;
  className?: string;
}) {
  const maskId = `copy-mask-${useId().replace(/:/g, "")}`;

  return (
    <svg
      aria-hidden="true"
      className={cn("copy-icon size-4", className)}
      data-copied={copied}
      fill="none"
      viewBox="0 0 16 16"
    >
      <mask
        height="28"
        id={maskId}
        maskUnits="userSpaceOnUse"
        width="28"
        x="-6"
        y="-6"
      >
        <rect fill="#fff" height="28" width="28" x="-6" y="-6" />
        <rect fill="#000" height="15" rx="4.5" width="15" x="3" y="3" />
      </mask>
      <g mask={`url(#${maskId})`}>
        <rect
          className="copy-back"
          fill="var(--copy-back)"
          height="11"
          rx="2.5"
          width="11"
        />
      </g>
      <rect
        className="copy-front"
        fill="var(--copy-front)"
        height="11"
        rx="2.5"
        width="11"
        x="5"
        y="5"
      />
      <circle
        className="copy-badge"
        cx="8"
        cy="8"
        fill="var(--primary)"
        r="8"
      />
      <path
        className="copy-check"
        d="M4.8 8.36L6.81 10.56L11.2 5.76"
        stroke="var(--primary-foreground)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

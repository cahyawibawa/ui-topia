import { motion } from "motion/react";
import type React from "react";
import { useId } from "react";

/*
 * The phone's own glyphs, from the reference: status bar, lock screen, call,
 * transport and bell. They are part of a drawing of a phone's UI rather than
 * site controls, the standing `browser-toolbar` gives its glyphs, and the
 * site's set has no phone, microphone, bell or skip.
 */

type Props = React.SVGProps<SVGSVGElement>;

export const PHONE =
  "M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1z";

export const PhoneGlyph = (p: Props) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
    {...p}
  >
    <path d={PHONE} />
  </svg>
);

export const PauseGlyph = (p: Props) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
    {...p}
  >
    <rect x="6" y="4" width="4" height="16" rx="1.2" />
    <rect x="14" y="4" width="4" height="16" rx="1.2" />
  </svg>
);

export const PlayGlyph = (p: Props) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
    {...p}
  >
    <path d="M7 4.5v15a1 1 0 0 0 1.5.9l12-7.5a1 1 0 0 0 0-1.8l-12-7.5A1 1 0 0 0 7 4.5Z" />
  </svg>
);

export const CrossGlyph = (p: Props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={3}
    strokeLinecap="round"
    aria-hidden="true"
    focusable="false"
    {...p}
  >
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export const PrevGlyph = (p: Props) => (
  <svg
    viewBox="0 0 30 20"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
    {...p}
  >
    <path d="M14 10 26 2v16zM2 10l12-8v16z" />
  </svg>
);

export const NextGlyph = (p: Props) => (
  <svg
    viewBox="0 0 30 20"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
    {...p}
  >
    <path d="M16 10 4 2v16zM28 10 16 2v16z" />
  </svg>
);

/**
 * The system's slash, drawn in from the top-left rather than switched on. A
 * wider stroke in the mask cuts the glyph under it, so the slash reads with a
 * gap on each side, as the platform's own slashed symbols do.
 */
function Slash({
  on,
  width,
  children,
}: {
  on: boolean;
  width: number;
  children: React.ReactNode;
}) {
  const id = useId().replace(/:/g, "");
  const draw = { pathLength: on ? 1 : 0, opacity: on ? 1 : 0 };
  const t = {
    pathLength: { type: "spring", duration: 0.45, bounce: 0.15 },
    opacity: { duration: 0.08 },
  } as const;
  return (
    <>
      <mask id={id}>
        <rect width="24" height="24" fill="white" />
        <motion.path
          d="M3 3l18 18"
          stroke="black"
          strokeWidth={width * 2.4}
          initial={false}
          animate={draw}
          transition={t}
        />
      </mask>
      <g mask={`url(#${id})`}>{children}</g>
      <motion.path
        d="M3 3l18 18"
        initial={false}
        animate={draw}
        transition={t}
      />
    </>
  );
}

export const MicGlyph = ({ slashed, ...p }: Props & { slashed: boolean }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.2}
    strokeLinecap="round"
    aria-hidden="true"
    focusable="false"
    {...p}
  >
    <Slash on={slashed} width={2.2}>
      <rect x="9" y="3" width="6" height="11" rx="3" />
      <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
    </Slash>
  </svg>
);

export const BellGlyph = ({ slashed, ...p }: Props & { slashed: boolean }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.4}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
    {...p}
  >
    <Slash on={slashed} width={2.4}>
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.7 21a2 2 0 0 1-3.4 0" />
    </Slash>
  </svg>
);

export const SignalGlyph = (p: Props) => (
  <svg
    viewBox="0 0 18 12"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
    {...p}
  >
    <rect x="0" y="8" width="3" height="4" rx="1" />
    <rect x="5" y="5.5" width="3" height="6.5" rx="1" />
    <rect x="10" y="3" width="3" height="9" rx="1" />
    <rect x="15" y="0" width="3" height="12" rx="1" />
  </svg>
);

export const WifiGlyph = (p: Props) => (
  <svg
    viewBox="0 0 16 12"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
    {...p}
  >
    <path d="M8 2.2c2.3 0 4.4.9 6 2.4l1.2-1.2A10.2 10.2 0 0 0 8 .5C5.2.5 2.7 1.6.8 3.4L2 4.6a8.5 8.5 0 0 1 6-2.4Zm0 3.4c1.4 0 2.6.5 3.6 1.4l1.2-1.2A6.8 6.8 0 0 0 8 3.9c-1.8 0-3.5.7-4.8 1.9L4.4 7c1-.9 2.2-1.4 3.6-1.4Zm0 3.4c-.5 0-1 .2-1.3.5L8 11l1.3-1.5C9 9.2 8.5 9 8 9Z" />
  </svg>
);

export const BatteryGlyph = (p: Props) => (
  <svg
    viewBox="0 0 27 13"
    fill="none"
    aria-hidden="true"
    focusable="false"
    {...p}
  >
    <rect
      x=".5"
      y=".5"
      width="23"
      height="12"
      rx="3.5"
      stroke="currentColor"
      strokeOpacity=".4"
    />
    <rect x="2" y="2" width="17" height="9" rx="2" fill="currentColor" />
    <path
      d="M25 4.5v4c.8-.3 1.4-1.1 1.4-2s-.6-1.7-1.4-2Z"
      fill="currentColor"
      fillOpacity=".45"
    />
  </svg>
);

export const TorchGlyph = (p: Props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
    {...p}
  >
    <path d="M9 2h6l-1 6h-4z" />
    <path d="M10 8v12a2 2 0 0 0 4 0V8" />
  </svg>
);

export const CameraGlyph = (p: Props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
    {...p}
  >
    <path d="M4 8h3l2-3h6l2 3h3v11H4z" />
    <circle cx="12" cy="13" r="3.5" />
  </svg>
);

/**
 * Adapted from the tear-calendar lab on Sanyam Punia's site
 * (https://github.com/SanyamPunia/www), used with his permission.
 */
import { memo } from "react";
import { type Day, moonPath } from "./days";
import { HOLE_R, PERF, PITCH, SH, W } from "./tear";

/*
 * One page of the pad as it is printed, at its full size in design units.
 * Every page on the stage is this drawing cropped: the one you are tearing,
 * the one behind it, the bits left under the header and the ones in the air.
 * So a bite of a page left behind by a ragged tear carries that page's print.
 *
 * The colours are ui/topia's, scoped here and not tokens: a clean near-white
 * paper, near-black ink, the electric blue and red the site prints its
 * emphasis in, a sticker-yellow highlight for the weekday, and a candy purple
 * for the moon.
 */
export const PAPER = "#fcfcfb";
export const INK = "#141414";
const SOFT = "#737373";
const SUNDAY = "#e8352b";
const SATURDAY = "#1428ff";
const MARKER = "#ffe24a";
const MOON = "#a24bff";
const HOLE = "rgba(0, 0, 0, 0.22)";

/** the paper's tooth, the grain tile `document-pocket` and `zipper-pouch` use */
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 160 160' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E\")";

const TONE = { plain: INK, saturday: SATURDAY, sunday: SUNDAY } as const;

export const Sheet = memo(function Sheet({
  day,
  label,
}: {
  day: Day;
  label: string;
}) {
  const ink = TONE[day.tone];
  const moon = moonPath(day.moon.age, 4.2);
  const left = day.daysInYear - day.ofYear;
  return (
    <div
      className="absolute top-0 left-0 overflow-hidden"
      style={{ width: W, height: SH, background: PAPER }}
    >
      {/* the paper's tooth and a light falling off toward the foot */}
      <div
        className="absolute inset-0 opacity-[0.16] mix-blend-multiply"
        style={{ backgroundImage: GRAIN, backgroundSize: "96px 96px" }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(255,255,255,0.5), rgba(255,255,255,0) 40%, rgba(0,0,0,0.04))",
        }}
      />

      {/* the perforation, a hole every `PITCH` across, as one repeating tile */}
      <div
        className="absolute left-0"
        style={{
          top: PERF - HOLE_R - 0.5,
          width: W,
          height: HOLE_R * 2 + 1,
          backgroundImage: `radial-gradient(circle, ${HOLE} ${HOLE_R - 0.15}px, transparent ${HOLE_R + 0.25}px)`,
          backgroundSize: `${PITCH}px ${HOLE_R * 2 + 1}px`,
        }}
      />

      {/* the month and how far the page is from today, close under the holes,
          so a ragged tear takes a bite of them */}
      <div
        className="absolute flex items-baseline justify-between font-medium"
        style={{
          left: 11,
          right: 11,
          top: PERF + 7,
          fontSize: 8.6,
          lineHeight: 1,
          letterSpacing: "0.14em",
          color: SOFT,
        }}
      >
        <span>{day.month}</span>
        {label === "Today" ? (
          <span
            className="rounded-full"
            style={{
              background: INK,
              color: "#fff",
              padding: "2.5px 6px 2px",
              letterSpacing: "0.12em",
            }}
          >
            {label}
          </span>
        ) : (
          <span>{label}</span>
        )}
      </div>
      <div
        className="absolute"
        style={{
          left: 11,
          right: 11,
          top: PERF + 21,
          height: 0.75,
          background: ink,
          opacity: 0.16,
        }}
      />

      {/* the day, which is what the page is */}
      <div
        className="absolute inset-x-0 text-center"
        style={{
          top: 50,
          fontSize: 104,
          lineHeight: 1,
          fontWeight: 620,
          letterSpacing: "-0.055em",
          color: ink,
          // optical centring: the tracking leaves a gap after the last digit
          paddingLeft: "0.05em",
          fontFeatureSettings: '"cv11", "ss01"',
        }}
      >
        {day.day}
      </div>
      <div
        className="absolute inset-x-0 text-center font-medium"
        style={{
          top: 160,
          fontSize: 12.5,
          lineHeight: 1,
          letterSpacing: "0.26em",
          paddingLeft: "0.26em",
          color: INK,
        }}
      >
        <span
          className="inline-block"
          style={{
            background: MARKER,
            borderRadius: 2,
            padding: "4px 8px 3px 10px",
            transform: "rotate(-1.4deg)",
          }}
        >
          {day.weekday}
        </span>
      </div>

      {/* the foot: the moon that night and what is left of the year */}
      <div
        className="absolute flex items-center justify-between"
        style={{
          left: 11,
          right: 11,
          bottom: 11,
          fontSize: 7.6,
          lineHeight: 1,
          letterSpacing: "0.06em",
          color: SOFT,
        }}
      >
        <span className="flex items-center" style={{ gap: 5 }}>
          <svg
            width={10}
            height={10}
            viewBox="-5 -5 10 10"
            aria-hidden="true"
            focusable="false"
          >
            <circle
              r={4.2}
              fill={moon.full ? PAPER : MOON}
              stroke={MOON}
              strokeWidth={0.7}
            />
            {moon.d ? <path d={moon.d} fill={PAPER} /> : null}
          </svg>
          {day.moon.name}
        </span>
        <span>
          {left === 0
            ? "Last page"
            : `${left} ${left === 1 ? "day" : "days"} left`}
        </span>
      </div>
    </div>
  );
});

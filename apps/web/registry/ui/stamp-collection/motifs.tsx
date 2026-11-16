/**
 * Adapted from the stamp-collection lab on Sanyam Punia's site
 * (https://github.com/SanyamPunia/www), used with his permission.
 */

/*
 * The three prints, drawn rather than photographed.
 *
 * Flat geometry in four colours, which is what this can execute well. A crow or
 * a carp traced by hand into SVG paths would read as a bad drawing at 160px,
 * where a disc, a scallop and a leaf read as a print.
 *
 * Each one fills `FIELD`, which is the picture window plus the bleed the
 * parallax slides into, so no edge of a print can cross the cream frame however
 * far it travels.
 */

import { FRAME, PARALLAX_BLEED, VIEW } from "./poses";

/**
 * The prints' palette.
 *
 * A postage stamp is a printed object and its colours are the object, so they
 * live in this file and not in the site's tokens.
 *
 * Checked against each other rather than against the page, since nothing here
 * sits on the page background. Paper on the lit part of the stage is 14.0:1,
 * ink on paper 13.2:1, paper on indigo 7.8:1, and vermilion on paper 3.73:1,
 * which is what a graphic needs.
 */
export const PALETTE = {
  paper: "#efe7d7",
  /*
   * The sun's field, a step deeper than the paper.
   *
   * It was the paper's own colour first, which meant the picture window had no
   * visible edge on that stamp, so the mist bands appeared to stop in mid air
   * where the clip cut them. 1.15:1 against the paper is enough to read as a
   * print on a mount and not enough to read as a second colour.
   */
  mount: "#e3d8c0",
  indigo: "#17408f",
  vermilion: "#d1441f",
  ink: "#23201c",
} as const;

/** the picture window plus its bleed, which is the box every print is drawn in */
export const FIELD = {
  x: FRAME - PARALLAX_BLEED,
  y: FRAME - PARALLAX_BLEED,
  width: VIEW.width - FRAME * 2 + PARALLAX_BLEED * 2,
  height: VIEW.height - FRAME * 2 + PARALLAX_BLEED * 2,
} as const;

export type MotifKind = "sun" | "wave" | "chrysanthemum";

/**
 * A rising sun behind three bands of mist.
 *
 * The bands are the only thing keeping this from being a circle on a rectangle.
 * They cross the disc rather than stopping at it, which is what makes them read
 * as in front of it.
 */
function Sun() {
  const cx = FIELD.width / 2;
  const cy = FIELD.height * 0.47;

  return (
    <>
      <rect width={FIELD.width} height={FIELD.height} fill={PALETTE.mount} />
      <circle cx={cx} cy={cy} r={FIELD.width * 0.28} fill={PALETTE.vermilion} />
      {/* the bands run off both edges of the window rather than stopping inside
          it, so the clip reads as the print continuing past its own frame */}
      {[
        { y: 0.29, x: -0.06, w: 0.74 },
        { y: 0.37, x: 0.2, w: 0.9 },
        { y: 0.46, x: -0.02, w: 0.82 },
        { y: 0.55, x: 0.26, w: 0.84 },
        { y: 0.64, x: 0.04, w: 0.72 },
      ].map((band) => (
        <rect
          key={band.y}
          x={FIELD.width * band.x}
          y={FIELD.height * band.y}
          width={FIELD.width * band.w}
          height={FIELD.height * 0.019}
          rx={FIELD.height * 0.0095}
          fill={PALETTE.indigo}
          opacity={0.72}
        />
      ))}
    </>
  );
}

/**
 * Seigaiha, the wave-crest pattern.
 *
 * One tile carries a full fan on its own row and two halves on the row below, so
 * the rows interleave the way the pattern does. Drawing the rows out in a loop
 * instead needs about 350 paths at this size.
 */
function Wave({ id }: { id: string }) {
  const unit = 46;
  const fan = (cx: number, cy: number) =>
    [unit / 2, unit / 2 - 8, unit / 2 - 16].map((r) => (
      <path
        key={r}
        d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
        fill="none"
        stroke={PALETTE.paper}
        strokeWidth={1.7}
        opacity={0.55}
      />
    ));

  return (
    <>
      <rect width={FIELD.width} height={FIELD.height} fill={PALETTE.indigo} />
      <defs>
        <pattern
          id={id}
          width={unit}
          height={unit}
          patternUnits="userSpaceOnUse"
        >
          {fan(unit / 2, unit / 2)}
          {fan(0, unit)}
          {fan(unit, unit)}
        </pattern>
      </defs>
      <rect width={FIELD.width} height={FIELD.height} fill={`url(#${id})`} />
    </>
  );
}

/**
 * A chrysanthemum: two rings of petals and a stem.
 *
 * This was an iris first, drawn as three leaves and three petals, and it read as
 * a bird. A radial flower is the one botanical shape that survives being reduced
 * to a loop of ellipses, because the arrangement carries it rather than the
 * outline of any one petal.
 */
function Chrysanthemum() {
  const { width: w, height: h } = FIELD;
  const cx = w / 2;
  const cy = h * 0.4;

  const ring = (count: number, length: number, fat: number, turn: number) =>
    Array.from({ length: count }, (_, i) => {
      const angle = (360 / count) * i + turn;
      return (
        // the angle rather than the index: unique inside a ring, and it is what
        // actually distinguishes one petal from the next
        <ellipse
          key={angle}
          cx={0}
          cy={-length / 2}
          rx={fat}
          ry={length / 2}
          transform={`rotate(${angle})`}
          fill={PALETTE.paper}
        />
      );
    });

  return (
    <>
      <rect width={w} height={h} fill={PALETTE.indigo} />

      {/* the stem, behind the flower so its top is covered by the petals */}
      <rect
        x={cx - w * 0.011}
        y={cy}
        width={w * 0.022}
        height={h - cy}
        fill={PALETTE.paper}
        opacity={0.5}
      />

      <g transform={`translate(${cx} ${cy})`}>
        <g opacity={0.62}>{ring(16, h * 0.34, w * 0.032, 11)}</g>
        {ring(16, h * 0.23, w * 0.038, 0)}
      </g>

      <circle cx={cx} cy={cy} r={w * 0.058} fill={PALETTE.vermilion} />
    </>
  );
}

export function Motif({ kind, id }: { kind: MotifKind; id: string }) {
  if (kind === "sun") return <Sun />;
  if (kind === "wave") return <Wave id={id} />;
  return <Chrysanthemum />;
}

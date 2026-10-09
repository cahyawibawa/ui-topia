export type Glyph = {
  ch: string;
  x: number;
  w: number;
  top: number;
  bottom: number;
};

export type WordMetrics = {
  width: number;
  glyphs: Glyph[];
};

let ctx: CanvasRenderingContext2D | null = null;

function getContext(): CanvasRenderingContext2D | null {
  if (ctx) return ctx;
  if (typeof document === "undefined") return null;
  const canvas = document.createElement("canvas");
  ctx = canvas.getContext("2d");
  return ctx;
}

export function measureWord(
  word: string,
  fontFamily: string,
  fontWeight: string,
  fontSizePx: number,
): WordMetrics | null {
  const c = getContext();
  if (!c) return null;

  c.font = `${fontWeight} ${fontSizePx}px ${fontFamily}`;

  const glyphs: Glyph[] = [];
  let x = 0;

  for (const ch of word) {
    const advance = c.measureText(ch).width;

    if (ch === " ") {
      glyphs.push({ ch, x, w: advance, top: 0, bottom: 0 });
      x += advance;
      continue;
    }

    const m = c.measureText(ch);
    const ascent = m.actualBoundingBoxAscent;
    const descent = m.actualBoundingBoxDescent;

    const top = Number.isFinite(ascent) ? -ascent : -fontSizePx * 0.72;
    const bottom = Number.isFinite(descent) ? descent : fontSizePx * 0.02;

    glyphs.push({ ch, x, w: advance, top, bottom });
    x += advance;
  }

  const width = x;

  if (!Number.isFinite(width) || width <= 0) return null;

  return { width, glyphs };
}

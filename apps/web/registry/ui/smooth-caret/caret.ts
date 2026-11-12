/**
 * Adapted from the smooth-caret lab on Sanyam Punia's site
 * (https://github.com/SanyamPunia/www), used with his permission.
 */
/**
 * Where a textarea's caret is, measured off a mirror of the field.
 *
 * A textarea has no `Range` into its own text, so nothing can ask the browser
 * where its caret is. The mirror is a hidden div laid out exactly like the
 * field: same width, padding, font and wrapping. It holds the text up to the
 * caret, then a span holding the rest, and the span's first line box is where
 * the caret is.
 *
 * The span holds the rest of the text rather than one marker character, so the
 * word the caret is inside wraps the way it does in the field. At the end of the
 * text it holds a zero-width space, which has a line box and cannot push a full
 * line onto the next one.
 */

export interface CaretBox {
  x: number;
  y: number;
  height: number;
}

/**
 * Every property that changes where a line wraps or how tall it is. Width is
 * not here: the mirror takes the field's `clientWidth`, which leaves out a
 * scrollbar the field may be showing.
 */
const COPIED = [
  "paddingTop",
  "paddingRight",
  "paddingBottom",
  "paddingLeft",
  "fontFamily",
  "fontSize",
  "fontWeight",
  "fontStyle",
  "fontVariant",
  "fontStretch",
  "fontKerning",
  "fontFeatureSettings",
  "fontVariationSettings",
  "letterSpacing",
  "wordSpacing",
  "lineHeight",
  "textTransform",
  "textIndent",
  "tabSize",
  "whiteSpace",
  "overflowWrap",
  "wordBreak",
] as const;

/** Lays the mirror out like the field. Call it again when the field resizes. */
export function syncMirror(field: HTMLTextAreaElement, mirror: HTMLElement) {
  const cs = getComputedStyle(field);
  for (const key of COPIED) mirror.style[key] = cs[key];
  mirror.style.boxSizing = "border-box";
  mirror.style.border = "0";
  mirror.style.width = `${field.clientWidth}px`;
}

/**
 * Which line a caret at a soft wrap belongs to. The end of one line and the
 * start of the next are one index in the text, so the index cannot say. `end`
 * is the end of the earlier line, `start` the start of the later one, and a
 * number is a pointer's y in the field, which picks the nearer line.
 */
export type Affinity = "start" | "end" | number;

/** The caret at `pos`, in the field's own coordinates, with its scroll applied. */
export function caretAt(
  field: HTMLTextAreaElement,
  mirror: HTMLElement,
  pos: number,
  affinity: Affinity = "start",
): CaretBox | null {
  const { value } = field;
  mirror.textContent = value.slice(0, Math.max(0, pos - 1));
  // the character before the caret gets a span of its own, so its right edge
  // is where an `end` caret sits
  const before = document.createElement("span");
  before.textContent = pos > 0 ? (value[pos - 1] ?? "") : "";
  const rest = document.createElement("span");
  rest.textContent = value.slice(pos) || "\u200b";
  mirror.append(before, rest);

  const box = mirror.getBoundingClientRect();
  const dx = box.left + field.scrollLeft - field.clientLeft;
  const dy = box.top + field.scrollTop - field.clientTop;
  const line = rest.getClientRects()[0];
  if (!line) return null;
  const down = { x: line.left - dx, y: line.top - dy, height: line.height };

  const lead = before.getClientRects();
  const prev = lead[lead.length - 1];
  const wrapped =
    prev && value[pos - 1] !== "\n" && Math.abs(prev.top - line.top) > 1;
  if (!wrapped) return down;

  // a space the line wrapped at hangs past the text box, and the native caret
  // stops at the box's edge rather than following it
  const cs = getComputedStyle(field);
  const edge = field.clientWidth - Number.parseFloat(cs.paddingRight);
  const up = {
    x: Math.min(prev.right - dx, edge),
    y: prev.top - dy,
    height: prev.height,
  };
  if (affinity === "end") return up;
  if (affinity === "start") return down;
  const near = (c: CaretBox) => Math.abs(c.y + c.height / 2 - affinity);
  return near(up) < near(down) ? up : down;
}

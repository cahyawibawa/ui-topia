/*
 * The platform's rolling numbers for a clock written straight to its node.
 * Each character sits in its own cell, and only the cells whose character
 * changed roll: the new digit comes in from one side as the old one leaves by
 * the other, with a blur through the move. A countdown rolls down and a count
 * up rolls up, which is what tells the eye which way the number runs.
 */

const IN = { duration: 380, easing: "cubic-bezier(0.2, 0.9, 0.3, 1.15)" };
const OUT = { duration: 240, easing: "cubic-bezier(0.4, 0, 1, 1)" };

function glyph(ch: string): HTMLSpanElement {
  const g = document.createElement("span");
  g.className = "inline-block";
  g.textContent = ch;
  return g;
}

function cell(ch: string): HTMLSpanElement {
  const c = document.createElement("span");
  c.className = "relative inline-block";
  c.setAttribute("aria-hidden", "true");
  c.append(glyph(ch));
  return c;
}

/** the whole value once, for a screen reader, since the cells read apart */
function said(text: string): HTMLSpanElement {
  const t = document.createElement("span");
  t.className = "sr-only";
  t.textContent = text;
  return t;
}

/**
 * Writes `text` to `el`, rolling the characters that changed. `down` is true
 * for a countdown. A change in length, or `animate` false, writes the cells
 * fresh with no motion, since a cell gained or lost has nothing to roll from.
 */
export function roll(
  el: HTMLElement,
  text: string,
  down: boolean,
  animate: boolean,
) {
  const prev = el.dataset.text;
  if (prev === text) return;
  el.dataset.text = text;

  if (!animate || prev === undefined || prev.length !== text.length) {
    el.replaceChildren(said(text), ...[...text].map(cell));
    return;
  }
  const [sr] = el.children;
  if (sr) sr.textContent = text;

  const from = down ? -60 : 60;
  [...text].forEach((ch, i) => {
    if (ch === prev[i]) return;
    const c = el.children[i + 1] as HTMLElement | undefined;
    if (!c) return;

    // a cell that changes again mid-roll drops the digit already on its way out
    while (c.children.length > 1) c.firstElementChild?.remove();
    const old = c.firstElementChild as HTMLElement | null;
    const next = glyph(ch);
    c.append(next);

    next.animate(
      [
        { transform: `translateY(${from}%)`, opacity: 0, filter: "blur(3px)" },
        { transform: "translateY(0)", opacity: 1, filter: "blur(0px)" },
      ],
      IN,
    );
    if (!old) return;
    Object.assign(old.style, { position: "absolute", left: "0", top: "0" });
    old
      .animate(
        [
          { transform: "translateY(0)", opacity: 1, filter: "blur(0px)" },
          {
            transform: `translateY(${-from}%)`,
            opacity: 0,
            filter: "blur(3px)",
          },
        ],
        { ...OUT, fill: "forwards" },
      )
      .finished.then(() => old.remove())
      .catch(() => old.remove());
  });
}

/**
 * Stack type, from design.how (https://github.com/arla6ka/design.how), adapted for ui/topia.
 *
 * MIT License
 *
 * Copyright (c) 2026 Arlan Marat
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
// FIXED. Change the VARIABLE values in params instead (DEFAULT_TEXT, DEFAULT_GROUND, DEFAULT_INK, KEY_MS, DEFAULT_LOOK, DRUM_STEP, SCRAMBLE, SCRAMBLE_KEYS, TRACKS, FONT_WEIGHT, FONT_VAR).
import {
  CAP,
  DEFAULT_GROUND,
  DEFAULT_INK,
  DEFAULT_LOOK,
  DEFAULT_TEXT,
  DRUM_BARREL,
  DRUM_FADE,
  DRUM_STEP,
  EDGE,
  FONT_WEIGHT,
  KEY_MS,
  LOOP_KEYS,
  type Look,
  MID_ROW,
  OUTLINE,
  PITCH,
  ROWS,
  SCENE_H,
  SCENE_W,
  SCRAMBLE,
  SCRAMBLE_KEYS,
  SIDE,
  STILL_KEY,
  SWAP_KEY,
  span,
  TRACK_SHIFT,
  TRACKS,
} from "./params";

type Letter = {
  char: string;
  x: number;
  cx: number;
  width: number;
  index: number;
};
type Layout = { letters: Letter[]; fit: number; ground: string; ink: string };
export type StackPhrase = { text: string; ground?: string; ink?: string };

export interface StackTypeOptions {
  family: string;
  phrases?: readonly StackPhrase[];
  look?: Look;
  weight?: number;
  speed?: number;
}

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const MID_Y = SCENE_H / 2;
const DRUM_R = PITCH / Math.sin(DRUM_STEP);

function hash(a: number, b: number, c: number) {
  let h = (a * 374761393 + b * 668265263 + c * 2147483647) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}

export class StackType {
  private ctx: CanvasRenderingContext2D | null;
  private raf = 0;
  private running = false;
  private t0 = 0;
  private elapsed = 0;
  private painted = -1;
  private size = 80;
  private layouts: Layout[] = [];
  private readonly phrases: readonly StackPhrase[];
  private readonly look: Look;
  private readonly weight: number;
  private readonly family: string;
  private readonly speed: number;

  readonly ok: boolean;

  constructor(
    private canvas: HTMLCanvasElement,
    opts: StackTypeOptions,
  ) {
    this.ctx = canvas.getContext("2d");
    this.ok = !!this.ctx;
    this.family = opts.family;
    const phrases = (opts.phrases ?? []).filter((p) => p.text.trim());
    this.phrases = phrases.length ? phrases : [{ text: DEFAULT_TEXT }];
    this.look = opts.look ?? DEFAULT_LOOK;
    this.weight = opts.weight ?? FONT_WEIGHT;
    this.speed = opts.speed && opts.speed > 0 ? opts.speed : 1;
    if (this.ok) {
      this.measure();
      this.resize();
    }
  }

  private font(size = this.size) {
    return `${this.weight} ${size}px ${this.family}`;
  }

  measure() {
    const ctx = this.ctx;
    if (!ctx) return;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.font = this.font(100);
    this.size =
      (100 * CAP) / (ctx.measureText("H").actualBoundingBoxAscent || 70);
    ctx.font = this.font();
    ctx.fontKerning = "normal";
    this.layouts = this.phrases.map((phrase) => {
      const text = phrase.text.trim();
      const line = ctx.measureText(text);
      const ink = line.actualBoundingBoxLeft + line.actualBoundingBoxRight;
      const left = SCENE_W / 2 - ink / 2 + line.actualBoundingBoxLeft;
      const letters: Letter[] = [];
      let n = 0;
      [...text].forEach((char, i, all) => {
        if (char === " ") return;
        const x = left + ctx.measureText(all.slice(0, i).join("")).width;
        const width = ctx.measureText(char).width;
        letters.push({ char, x, cx: x + width / 2, width, index: n++ });
      });
      const reach = this.look.drum
        ? DRUM_R * Math.sin(MID_ROW * DRUM_STEP) +
          (CAP / 2) * Math.cos(MID_ROW * DRUM_STEP)
        : MID_ROW * PITCH + CAP / 2;
      const fit = Math.min(
        (SCENE_W - 2 * SIDE) / ink,
        (SCENE_H / 2 - EDGE) / reach,
      );
      return {
        letters,
        fit,
        ground: phrase.ground ?? DEFAULT_GROUND,
        ink: phrase.ink ?? DEFAULT_INK,
      };
    });
    this.painted = -1;
    if (!this.running) this.renderStill();
  }

  resize() {
    const c = this.canvas;
    const box = c.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.max(1, Math.round(box.width * dpr));
    const h = Math.max(1, Math.round(box.height * dpr));
    if (w === c.width && h === c.height) return;
    c.width = w;
    c.height = h;
    this.painted = -1;
    if (!this.running) this.renderStill();
  }

  paint(at: number) {
    const ctx = this.ctx;
    if (!ctx || !this.layouts.length) return;
    const key = at % LOOP_KEYS;
    const cycle = Math.floor((at + LOOP_KEYS - SWAP_KEY) / LOOP_KEYS);
    const layout = this.layouts[cycle % this.layouts.length];
    if (!layout) return;
    const c = this.canvas;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.globalAlpha = 1;
    ctx.fillStyle = layout.ground;
    ctx.fillRect(0, 0, c.width, c.height);
    const k = Math.min(c.width / SCENE_W, c.height / SCENE_H);
    ctx.setTransform(
      k,
      0,
      0,
      k,
      (c.width - SCENE_W * k) / 2,
      (c.height - SCENE_H * k) / 2,
    );
    ctx.translate(SCENE_W / 2, MID_Y);
    ctx.scale(layout.fit, layout.fit);
    ctx.translate(-SCENE_W / 2, -MID_Y);
    ctx.font = this.font();
    ctx.fontKerning = "normal";
    ctx.textBaseline = "alphabetic";
    ctx.fillStyle = layout.ink;
    ctx.strokeStyle = layout.ink;
    ctx.lineWidth = OUTLINE / layout.fit;
    ctx.lineJoin = "round";
    const { drum, outline, scramble } = this.look;
    const beat = Math.floor(at / SCRAMBLE_KEYS);
    layout.letters.forEach((letter, column) => {
      const track =
        TRACKS[(letter.index + cycle * TRACK_SHIFT) % TRACKS.length];
      if (!track) return;
      const [top, foot] = span(track, key);
      for (let row = Math.max(0, top); row <= Math.min(ROWS - 1, foot); row++) {
        const d = row - MID_ROW;
        let char = letter.char;
        let centred = false;
        if (
          scramble &&
          d !== 0 &&
          hash(column, row, beat) < (SCRAMBLE * Math.abs(d)) / MID_ROW
        ) {
          char =
            LETTERS[Math.floor(hash(row, column, beat + 7) * LETTERS.length)] ??
            letter.char;
          centred = true;
        }
        ctx.save();
        if (drum) {
          const angle = d * DRUM_STEP;
          const tilt = Math.cos(angle);
          ctx.translate(SCENE_W / 2, MID_Y + DRUM_R * Math.sin(angle));
          ctx.scale(1 - DRUM_BARREL * (1 - tilt), tilt);
          ctx.translate(-SCENE_W / 2, 0);
          ctx.globalAlpha = 1 - DRUM_FADE * (1 - tilt);
        } else {
          ctx.translate(0, MID_Y + d * PITCH);
        }
        if (centred) {
          const squeeze = Math.min(
            1,
            letter.width / ctx.measureText(char).width,
          );
          ctx.translate(letter.cx, 0);
          ctx.scale(squeeze, 1);
          ctx.translate(-letter.cx, 0);
          ctx.textAlign = "center";
          if (outline && d !== 0) ctx.strokeText(char, letter.cx, CAP / 2);
          else ctx.fillText(char, letter.cx, CAP / 2);
          ctx.textAlign = "left";
        } else if (outline && d !== 0) ctx.strokeText(char, letter.x, CAP / 2);
        else ctx.fillText(char, letter.x, CAP / 2);
        ctx.restore();
      }
    });
    this.painted = at;
  }

  render(ms: number) {
    this.paint(Math.floor(ms / KEY_MS));
  }

  renderStill() {
    this.paint(STILL_KEY);
  }

  start() {
    if (this.running || !this.ok) return;
    this.running = true;
    this.t0 = performance.now() - this.elapsed / this.speed;
    const tick = (now: number) => {
      if (!this.running) return;
      this.elapsed = (now - this.t0) * this.speed;
      const at = Math.floor(this.elapsed / KEY_MS);
      if (at !== this.painted) this.paint(at);
      this.raf = requestAnimationFrame(tick);
    };
    this.raf = requestAnimationFrame(tick);
  }

  stop() {
    this.running = false;
    cancelAnimationFrame(this.raf);
    this.raf = 0;
  }

  destroy() {
    this.stop();
    this.layouts = [];
    this.ctx = null;
  }
}

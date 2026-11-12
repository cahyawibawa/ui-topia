/**
 * Warp type, from design.how (https://github.com/arla6ka/design.how), adapted for ui/topia.
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
// FIXED. Change the VARIABLE values in params instead (DEFAULT_PHRASES, GROUND, INK, FONT_WEIGHT, FONT_VAR).
import {
  buildLayouts,
  DEFAULT_PHRASES,
  FONT_SIZE,
  FONT_WEIGHT,
  FRAMES,
  GROUND,
  glyphsAt,
  INK,
  keyAt,
  type Layouts,
  LOOP_MS,
  type Measurer,
  type Phrases,
  SCENE_W,
  STILL_FRAME,
} from "./params";

export interface WarpTypeOptions {
  family: string;
  phrases?: Phrases;
  ground?: string;
  ink?: string;
  weight?: number;
}

export class WarpType {
  private ctx: CanvasRenderingContext2D | null;
  private raf = 0;
  private running = false;
  private t0 = 0;
  private elapsed = 0;
  private dpr = 1;
  private w = 0;
  private h = 0;
  private layouts: Layouts | null = null;
  private readonly phrases: Phrases;
  private readonly ground: string;
  private readonly ink: string;
  private readonly weight: number;
  private readonly family: string;

  readonly ok: boolean;

  constructor(
    private canvas: HTMLCanvasElement,
    opts: WarpTypeOptions,
  ) {
    this.ctx = canvas.getContext("2d");
    this.ok = !!this.ctx;
    this.family = opts.family;
    this.phrases = opts.phrases ?? DEFAULT_PHRASES;
    this.ground = opts.ground ?? GROUND;
    this.ink = opts.ink ?? INK;
    this.weight = opts.weight ?? FONT_WEIGHT;
    if (this.ok) {
      this.measure();
      this.resize();
    }
  }

  private get font(): string {
    return `${this.weight} ${FONT_SIZE}px ${this.family}`;
  }

  measure() {
    const ctx = this.ctx;
    if (!ctx) return;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.font = this.font;
    ctx.fontKerning = "normal";
    ctx.textBaseline = "alphabetic";
    ctx.textAlign = "left";
    const m: Measurer = {
      width: (text) => (text ? ctx.measureText(text).width : 0),
      ink: (ch) => {
        const t = ctx.measureText(ch);
        return [
          -t.actualBoundingBoxLeft,
          t.actualBoundingBoxRight,
          -t.actualBoundingBoxDescent,
          t.actualBoundingBoxAscent,
        ];
      },
    };
    this.layouts = buildLayouts(this.phrases, m);
    if (!this.running) this.renderStill();
  }

  resize() {
    const c = this.canvas;
    const box = c.getBoundingClientRect();
    const w = Math.max(1, Math.round(box.width));
    const h = Math.max(1, Math.round(box.height));
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    if (w === this.w && h === this.h && dpr === this.dpr) return;
    this.w = w;
    this.h = h;
    this.dpr = dpr;
    c.width = Math.round(w * dpr);
    c.height = Math.round(h * dpr);
    if (!this.running) this.renderStill();
  }

  key(): number {
    const total = this.running
      ? this.elapsed + (performance.now() - this.t0)
      : this.elapsed;
    return keyAt(total);
  }
  frame(): number {
    return Math.floor(this.key());
  }

  private paint(key: number) {
    const ctx = this.ctx;
    if (!ctx || !this.layouts) return;
    const k = this.canvas.width / SCENE_W;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillStyle = this.ground;
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.font = this.font;
    ctx.fontKerning = "none";
    ctx.textBaseline = "alphabetic";
    ctx.textAlign = "left";
    ctx.fillStyle = this.ink;
    for (const g of glyphsAt(key, this.layouts)) {
      const m = g.m;
      ctx.setTransform(
        k * m[0],
        k * m[1],
        k * m[2],
        k * m[3],
        k * m[4],
        k * m[5],
      );
      if (g.box) {
        ctx.fillStyle = this.ground;
        ctx.fillRect(
          g.box[0],
          g.box[1],
          g.box[2] - g.box[0],
          g.box[3] - g.box[1],
        );
        ctx.fillStyle = this.ink;
      }
      if (g.ch) ctx.fillText(g.ch, 0, 0);
    }
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }

  render(key: number) {
    this.paint(((key % FRAMES) + FRAMES) % FRAMES);
  }

  renderStill() {
    this.render(STILL_FRAME);
  }

  start() {
    if (this.running || !this.ok) return;
    this.running = true;
    this.t0 = performance.now();
    const tick = () => {
      if (!this.running) return;
      this.paint(this.key());
      this.raf = requestAnimationFrame(tick);
    };
    this.raf = requestAnimationFrame(tick);
  }

  stop() {
    if (this.running)
      this.elapsed = (this.elapsed + (performance.now() - this.t0)) % LOOP_MS;
    this.running = false;
    cancelAnimationFrame(this.raf);
  }

  destroy() {
    this.stop();
    this.ctx = null;
  }
}

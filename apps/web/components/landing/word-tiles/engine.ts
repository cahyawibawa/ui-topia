import { measureWord, type WordMetrics } from "./measure";
import { randomSwatchAvoiding, type Swatch } from "./palette";

const SVGNS = "http://www.w3.org/2000/svg";

const FLY_STAGGER = 90;
const FLY_MS = 620;
const RISE_PX = 10;
const SHUFFLE_MIN = 1800;
const SHUFFLE_MAX = 4200;
const COLOR_MS = 420;

const FONT_FAMILY = "Georgia,'Times New Roman',Times,serif";
const FONT_WEIGHT = "500";
const REF_FS = 64;
const PAD_Y = 5;
const PAD_X = 3;

const MIN_TILE_HEIGHT = 20;
const MAX_TILE_HEIGHT = 46;

type Tile = {
  outer: HTMLSpanElement;
  svg: SVGSVGElement;
  rects: SVGRectElement[];
  textEl: SVGTextElement;
  word: string;
  swatch: Swatch;
  nextShuffle: number;
  aspectRatio: number;
};

export class WordTiles {
  private host: HTMLElement;
  private root: HTMLDivElement;
  private bar: HTMLDivElement;
  private tiles: Tile[] = [];

  private raf = 0;
  private running = false;
  private disposed = false;
  private revealed = false;

  private reduceMotion: boolean;
  private cleanup: (() => void)[] = [];

  constructor(host: HTMLElement, words: string[]) {
    this.host = host;
    this.reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const root = document.createElement("div");
    root.setAttribute("aria-label", words.join(" "));
    root.style.cssText = [
      "display:flex",
      "align-items:stretch",
      "width:fit-content",
      "max-width:100%",
      "border-radius:0.75rem",
      "overflow:hidden",
    ].join(";");

    const bar = document.createElement("div");
    bar.style.cssText = "display:flex;align-items:center";

    const used: Swatch[] = [];
    words.forEach((word) => {
      const swatch = randomSwatchAvoiding(used);
      used.push(swatch);

      const transition = this.reduceMotion
        ? [
            `background-color ${COLOR_MS}ms ease`,
            `color ${COLOR_MS}ms ease`,
          ].join(",")
        : [
            `clip-path ${FLY_MS}ms cubic-bezier(.16,1,.3,1)`,
            `opacity ${FLY_MS}ms ease`,
            `transform ${FLY_MS}ms cubic-bezier(.16,1,.3,1)`,
          ].join(",");

      const initialState = this.reduceMotion
        ? "clip-path:inset(0 0% 0 0);opacity:1;transform:none"
        : `clip-path:inset(0 100% 0 0);opacity:0;transform:translateY(${RISE_PX}px)`;

      const outer = document.createElement("span");
      outer.style.cssText = [
        "display:flex",
        "align-items:center",
        `transition:${transition}`,
        initialState,
      ].join(";");

      const svg = document.createElementNS(SVGNS, "svg");
      svg.style.cssText = `display:block;height:${MAX_TILE_HEIGHT}px`;

      const gBg = document.createElementNS(SVGNS, "g");
      const textEl = document.createElementNS(SVGNS, "text");
      textEl.setAttribute("font-family", FONT_FAMILY);
      textEl.setAttribute("font-weight", FONT_WEIGHT);
      textEl.setAttribute("font-size", String(REF_FS));
      textEl.setAttribute("dominant-baseline", "alphabetic");
      textEl.style.fill = swatch.fg;
      textEl.style.transition = `fill ${COLOR_MS}ms ease`;
      textEl.textContent = word;

      svg.appendChild(gBg);
      svg.appendChild(textEl);
      outer.appendChild(svg);
      bar.appendChild(outer);

      const tile: Tile = {
        outer,
        svg,
        rects: [],
        textEl,
        word,
        swatch,
        nextShuffle: 0,
        aspectRatio: 1,
      };
      this.tiles.push(tile);
    });

    root.appendChild(bar);
    host.appendChild(root);
    this.root = root;
    this.bar = bar;

    this.layout();
    this.fitToWidth();
    this.bindEvents();
  }

  private layout() {
    for (const tile of this.tiles) {
      const m = measureWord(tile.word, FONT_FAMILY, FONT_WEIGHT, REF_FS);
      for (const r of tile.rects) r.remove();
      tile.rects = [];
      if (!m) {
        this.buildFallback(tile);
        continue;
      }
      this.buildRects(tile, m);
    }
  }

  private buildRects(tile: Tile, m: WordMetrics) {
    const gBg = tile.svg.firstChild as SVGGElement;

    const inkGlyphs = m.glyphs.filter((g) => g.ch !== " ");
    let minTop = inkGlyphs[0]?.top ?? 0;
    let maxBottom = inkGlyphs[0]?.bottom ?? 0;
    for (const g of inkGlyphs) {
      minTop = Math.min(minTop, g.top);
      maxBottom = Math.max(maxBottom, g.bottom);
    }
    const bandTop = minTop - PAD_Y;
    const bandBottom = maxBottom + PAD_Y;

    for (const g of m.glyphs) {
      if (g.ch === " ") continue;
      const rect = document.createElementNS(SVGNS, "rect");
      rect.setAttribute("x", String(g.x));
      rect.setAttribute("y", String(g.top - PAD_Y));
      rect.setAttribute("width", String(g.w));
      rect.setAttribute("height", String(g.bottom - g.top + PAD_Y * 2));
      rect.style.fill = tile.swatch.bg;
      rect.style.transition = `fill ${COLOR_MS}ms ease`;
      gBg.appendChild(rect);
      tile.rects.push(rect);
    }

    tile.textEl.setAttribute("x", "0");
    tile.textEl.setAttribute("y", "0");

    const vbX = -PAD_X;
    const vbW = m.width + PAD_X * 2;
    const vbY = bandTop;
    const vbH = bandBottom - bandTop;
    tile.svg.setAttribute("viewBox", `${vbX} ${vbY} ${vbW} ${vbH}`);
    tile.svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
    tile.svg.style.width = "auto";
    tile.aspectRatio = vbW / vbH;
  }

  private buildFallback(tile: Tile) {
    const gBg = tile.svg.firstChild as SVGGElement;
    const approxCharW = REF_FS * 0.58;
    const w = Math.max(tile.word.length, 1) * approxCharW + PAD_X * 2;
    const h = REF_FS * 1.2;

    const rect = document.createElementNS(SVGNS, "rect");
    rect.setAttribute("x", "0");
    rect.setAttribute("y", "0");
    rect.setAttribute("width", String(w));
    rect.setAttribute("height", String(h));
    rect.style.fill = tile.swatch.bg;
    gBg.appendChild(rect);
    tile.rects.push(rect);

    tile.textEl.setAttribute("x", String(PAD_X));
    tile.textEl.setAttribute("y", String(h * 0.75));

    tile.svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
    tile.svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
    tile.svg.style.width = "auto";
    tile.aspectRatio = w / h;
  }

  private fitToWidth() {
    const totalRatio = this.tiles.reduce((sum, t) => sum + t.aspectRatio, 0);
    if (totalRatio <= 0) return;

    const available = this.host.clientWidth;
    if (available <= 0) return;

    const heightForWidth = available / totalRatio;
    const height = Math.min(
      MAX_TILE_HEIGHT,
      Math.max(MIN_TILE_HEIGHT, heightForWidth),
    );

    for (const tile of this.tiles) {
      tile.svg.style.height = `${height}px`;
    }
  }

  private bindEvents() {
    this.tiles.forEach((tile) => {
      const onEnter = () => this.recolor(tile);
      tile.svg.addEventListener("pointerenter", onEnter);
      this.cleanup.push(() =>
        tile.svg.removeEventListener("pointerenter", onEnter),
      );
    });

    if (typeof ResizeObserver !== "undefined") {
      const ro = new ResizeObserver(() => this.fitToWidth());
      ro.observe(this.host);
      this.cleanup.push(() => ro.disconnect());
    }
  }

  private recolor(tile: Tile) {
    const used = this.tiles.filter((t) => t !== tile).map((t) => t.swatch);
    const sw = randomSwatchAvoiding(used);
    tile.swatch = sw;
    for (const r of tile.rects) r.style.fill = sw.bg;
    tile.textEl.style.fill = sw.fg;
  }

  private reveal() {
    if (this.revealed) return;
    this.revealed = true;

    if (this.reduceMotion) return;

    this.tiles.forEach((tile, i) => {
      const delay = i * FLY_STAGGER;
      const t = window.setTimeout(() => {
        tile.outer.style.clipPath = "inset(0 0% 0 0)";
        tile.outer.style.opacity = "1";
        tile.outer.style.transform = "translateY(0)";
      }, delay);
      this.cleanup.push(() => window.clearTimeout(t));
    });

    const assembledAt = this.tiles.length * FLY_STAGGER + FLY_MS;
    const now = performance.now();
    this.tiles.forEach((tile) => {
      tile.nextShuffle =
        now +
        assembledAt +
        SHUFFLE_MIN +
        Math.random() * (SHUFFLE_MAX - SHUFFLE_MIN);
    });
  }

  start() {
    if (this.running || this.disposed) return;
    this.running = true;
    this.reveal();
    if (!this.reduceMotion) {
      this.raf = requestAnimationFrame(this.loop);
    }
  }

  stop() {
    this.running = false;
    if (this.raf) cancelAnimationFrame(this.raf);
    this.raf = 0;
  }

  private loop = () => {
    if (!this.running) return;
    const now = performance.now();
    for (const tile of this.tiles) {
      if (tile.nextShuffle === 0) continue;
      if (now >= tile.nextShuffle) {
        this.recolor(tile);
        tile.nextShuffle =
          now + SHUFFLE_MIN + Math.random() * (SHUFFLE_MAX - SHUFFLE_MIN);
      }
    }
    this.raf = requestAnimationFrame(this.loop);
  };

  destroy() {
    this.disposed = true;
    this.stop();
    this.cleanup.forEach((fn) => fn());
    this.root.parentNode?.removeChild(this.root);
    void this.host;
    void this.bar;
  }
}

/**
 * Records the preview clip each Motion index card plays.
 *
 * Drives the real docs page in Chrome, performs a gesture on the component,
 * then crops the recording to the component's stage and encodes an 8:5 mp4 plus
 * a webp poster into `public/previews/<slug>.{mp4,webp}`. The card finds clips
 * by filename, so a slug with no clip just shows the placeholder.
 *
 *   bun run previews              every slug in GESTURES
 *   bun run previews smooth-caret one slug
 *
 * Start `bun run dev` first (it drives the server on PREVIEW_BASE, default
 * http://localhost:3000). Needs Google Chrome, `ffmpeg` and `cwebp` on the path.
 */
import { execFile } from "node:child_process";
import { mkdir, mkdtemp, readdir, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { promisify } from "node:util";
import { chromium } from "playwright-core";

const run = promisify(execFile);
const BASE = process.env.PREVIEW_BASE ?? "http://localhost:3000";
const OUT = "public/previews";
const VIEWPORT = { height: 900, width: 1280 };
const CLIP = { height: 250, width: 400 }; // 8:5, upscaled to 640x400 on encode
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

/** A gesture per slug, written against the target element's own box. */
const GESTURES = {
  "stack-type": {
    path: "/docs/motion/type/stack-type",
    target: '[data-preview-target="stack-type"]',
    clip: { height: 378, width: 605 },
    async perform() {
      // a self-playing loop of 1.92s: let two of them run
      await wait(4200);
    },
  },
  "warp-type": {
    path: "/docs/motion/type/warp-type",
    target: '[data-preview-target="warp-type"]',
    clip: { height: 378, width: 605 },
    async perform() {
      // six scenes in a 3s loop: let it run once round and a little more
      await wait(3600);
    },
  },
  "tear-calendar": {
    path: "/docs/motion/components/tear-calendar",
    target: '[data-preview-target="tear-calendar"]',
    clip: { height: 400, width: 640 },
    async perform(page) {
      // the page sits wherever the stage centres it: find it, then grab it low
      // on the left or the right
      const pg = await page.evaluate(() => {
        const d = [
          ...document.querySelectorAll(
            '[data-preview-target="tear-calendar"] [data-over] div',
          ),
        ].find((x) => x.style.width === "168px" && x.style.height === "222px");
        const r = d.getBoundingClientRect();
        return { h: r.height, w: r.width, x: r.x, y: r.y };
      });
      const left = { x: pg.x + 26, y: pg.y + pg.h - 36 };
      const right = { x: pg.x + pg.w - 26, y: pg.y + pg.h - 36 };
      const drag = async (from, steps, dx, dy, delay) => {
        await page.mouse.move(from.x, from.y);
        await page.mouse.down();
        for (let i = 1; i <= steps; i++) {
          await page.mouse.move(from.x + i * dx, from.y + i * dy);
          await wait(delay);
        }
      };
      await wait(900);
      // slow diagonal pull partway, then let go: the page drops back
      await drag(left, 14, 3, 5, 55);
      await wait(500);
      await page.mouse.up();
      await wait(1100);
      // a yank from the same corner: ragged, and the page falls free
      await drag(left, 8, 4, 22, 6);
      await page.mouse.up();
      await wait(2300);
      // and a slow, clean tear from the other side
      await drag(right, 26, -2, 6, 50);
      await page.mouse.up();
      await wait(2200);
    },
  },
  "dynamic-island": {
    path: "/docs/motion/components/dynamic-island",
    target: '[data-preview-target="dynamic-island"]',
    clip: { height: 400, width: 640 },
    async perform(page, box) {
      const fig = page.locator('[data-preview-target="dynamic-island"]');
      const chip = (name) =>
        fig.getByRole("button", { name: new RegExp(`^${name}`, "i") }).first();
      const island = () =>
        fig.locator('[aria-label*="press to expand"]').first();
      const away = () => page.mouse.click(box.x + box.width - 14, box.y + 14);
      await wait(1000);
      // music is already playing: open it, then close it
      await island().click();
      await wait(1500);
      await away();
      await wait(800);
      // a timer starts, so the music pinches off into a bubble; press it
      await chip("Timer").click();
      await wait(1400);
      // pressing the bubble brings that activity forward, already open
      await fig.getByRole("button", { name: /^Switch to/i }).click();
      await wait(1800);
      await away();
      await wait(800);
      // an incoming call opens the island by itself: accept it
      await chip("Incoming call").click();
      await wait(1500);
      await fig.getByRole("button", { name: /accept/i }).click();
      await wait(1300);
      // charging and silent flash, then the island goes back
      await chip("Plug in charger").click();
      await wait(3000);
      await chip("Silent mode").click();
      await wait(2800);
    },
  },
  "smooth-caret": {
    path: "/docs/motion/components/smooth-caret",
    target: '[data-preview-target="smooth-caret"]',
    clip: { height: 400, width: 640 },
    async perform(page) {
      const field = page.locator(
        '[data-preview-target="smooth-caret"] textarea',
      );
      const r = await field.boundingBox();
      if (!r) throw new Error("textarea not found");
      const at = (x, y) => page.mouse.click(r.x + x, r.y + y);
      await wait(900);
      // click around the note: the caret glides there instead of jumping
      await at(70, 34);
      await wait(900);
      await at(r.width - 60, 74);
      await wait(900);
      await at(150, 114);
      await wait(900);
      // walk it along with the arrow keys
      for (let i = 0; i < 6; i++) {
        await page.keyboard.press("ArrowRight");
        await wait(120);
      }
      await wait(500);
      // type: the letters appear as the caret passes them
      await page.keyboard.type(" and then some", { delay: 110 });
      await wait(900);
      // and delete: the caret erases them on its way back
      for (let i = 0; i < 14; i++) {
        await page.keyboard.press("Backspace");
        await wait(55);
      }
      await wait(1300);
    },
  },
};

async function record(slug) {
  const gesture = GESTURES[slug];
  if (!gesture) throw new Error(`no gesture for "${slug}"`);

  const tmp = await mkdtemp(join(tmpdir(), "preview-"));
  const browser = await chromium.launch({ channel: "chrome" });
  const context = await browser.newContext({
    recordVideo: { dir: tmp, size: VIEWPORT },
    viewport: VIEWPORT,
  });
  const page = await context.newPage();
  await page.goto(BASE + gesture.path, { waitUntil: "networkidle" });
  // The reset button is page chrome, not part of the demo.
  await page.addStyleTag({
    content:
      '[aria-label="Reset values"],[data-preview-hide]{display:none!important}',
  });

  const target = page.locator(gesture.target);
  await target.scrollIntoViewIfNeeded();
  await wait(600);
  const box = await target.boundingBox();
  if (!box) throw new Error(`"${gesture.target}" not found`);

  const started = Date.now();
  await gesture.perform(page, box);
  await context.close();
  await browser.close();

  const [webm] = (await readdir(tmp)).filter((f) => f.endsWith(".webm"));
  const src = join(tmp, webm);
  const cx = box.x + box.width / 2;
  const cy = box.y + box.height / 2;
  const clip = gesture.clip ?? CLIP;
  const x = Math.max(0, Math.round(cx - clip.width / 2));
  const y = Math.max(0, Math.round(cy - clip.height / 2));
  const crop = `crop=${clip.width}:${clip.height}:${x}:${y},scale=640:400:flags=lanczos`;

  await mkdir(OUT, { recursive: true });
  // Skip the page-load lead-in: keep only what the gesture produced.
  const trim = Math.max(
    0,
    (await duration(src)) - (Date.now() - started) / 1000,
  );
  await run("ffmpeg", [
    "-y",
    "-ss",
    trim.toFixed(2),
    "-i",
    src,
    "-vf",
    `${crop},fps=30`,
    "-an",
    "-c:v",
    "libx264",
    "-pix_fmt",
    "yuv420p",
    "-crf",
    "26",
    "-movflags",
    "+faststart",
    join(OUT, `${slug}.mp4`),
  ]);
  const still = join(tmp, "still.png");
  await run("ffmpeg", [
    "-y",
    "-ss",
    "0.2",
    "-i",
    join(OUT, `${slug}.mp4`),
    "-frames:v",
    "1",
    still,
  ]);
  await run("cwebp", ["-q", "82", still, "-o", join(OUT, `${slug}.webp`)]);
  await rm(tmp, { force: true, recursive: true });
  console.log(`recorded ${slug}`);
}

async function duration(file) {
  const { stderr } = await run("ffmpeg", ["-i", file]).catch((e) => e);
  const m = /Duration: (\d+):(\d+):([\d.]+)/.exec(stderr ?? "");
  return m ? Number(m[1]) * 3600 + Number(m[2]) * 60 + Number(m[3]) : 0;
}

const slugs = process.argv.slice(2);
for (const slug of slugs.length ? slugs : Object.keys(GESTURES))
  await record(slug);

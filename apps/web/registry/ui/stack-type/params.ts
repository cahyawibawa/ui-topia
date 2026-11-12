/**
 * Stack type, from design.how (https://github.com/arla6ka/design.how), MIT licensed,
 * Copyright (c) 2026 Arlan Marat. Adapted for ui/topia: see the licence in engine.ts.
 */
export const SCENE_W = 1200;
export const SCENE_H = 675;
export const CAP = 58;
export const PITCH = 67.625;
export const SIDE = 24;
export const EDGE = 16;
export const ROWS = 9;
export const MID_ROW = (ROWS - 1) / 2;

export const KEY_MS = 40;
export const LOOP_KEYS = 48;

export type Track = { top: readonly number[]; foot: readonly number[] };
export const TRACKS: readonly Track[] = [
  {
    top: [8, 10, 13, 17, 32, 36, 39, 41],
    foot: [4, 8, 11, 14, 35, 38, 40, 45],
  },
  { top: [8, 10, 13, 17, 32, 36, 39, 41], foot: [3, 6, 9, 12, 37, 40, 43, 46] },
  { top: [8, 10, 13, 17, 32, 36, 39, 41], foot: [1, 4, 8, 10, 39, 41, 45, 48] },
  { top: [6, 8, 11, 14, 35, 38, 40, 43], foot: [3, 6, 9, 12, 37, 40, 43, 46] },
  {
    top: [6, 9, 11, 13, 36, 38, 40, 43],
    foot: [8, 10, 10, 14, 35, 39, 39, 41],
  },
  { top: [4, 7, 9, 12, 37, 40, 42, 45], foot: [5, 8, 11, 14, 35, 38, 41, 44] },
  { top: [2, 5, 8, 10, 39, 41, 44, 47], foot: [7, 10, 13, 16, 33, 36, 39, 42] },
  { top: [4, 7, 9, 12, 37, 40, 42, 45], foot: [9, 12, 15, 18, 31, 34, 37, 40] },
  { top: [2, 5, 9, 11, 38, 40, 44, 47], foot: [4, 7, 10, 15, 34, 35, 39, 42] },
  { top: [8, 10, 13, 17, 32, 36, 39, 41], foot: [3, 6, 9, 12, 37, 40, 43, 46] },
  { top: [4, 7, 9, 12, 32, 35, 38, 41], foot: [5, 8, 11, 14, 35, 38, 41, 44] },
  { top: [4, 7, 9, 12, 37, 40, 42, 45], foot: [9, 12, 15, 18, 31, 34, 37, 40] },
  {
    top: [2, 5, 8, 10, 33, 36, 39, 41],
    foot: [11, 14, 17, 20, 41, 44, 47, 48],
  },
  { top: [8, 10, 13, 17, 32, 36, 39, 41], foot: [3, 6, 9, 12, 37, 40, 43, 46] },
  {
    top: [8, 10, 13, 17, 32, 36, 39, 41],
    foot: [5, 8, 11, 14, 35, 38, 40, 44],
  },
  { top: [2, 5, 8, 10, 39, 41, 44, 47], foot: [5, 8, 11, 14, 35, 38, 40, 44] },
  {
    top: [6, 8, 11, 15, 34, 38, 40, 43],
    foot: [7, 10, 12, 18, 31, 37, 39, 42],
  },
  {
    top: [9, 12, 16, 19, 30, 33, 37, 40],
    foot: [7, 10, 13, 16, 33, 36, 39, 42],
  },
  { top: [6, 8, 11, 14, 35, 38, 41, 43], foot: [5, 8, 11, 14, 35, 38, 41, 44] },
  { top: [2, 5, 8, 10, 35, 38, 41, 43], foot: [9, 12, 15, 18, 31, 34, 37, 40] },
];

export function span(track: Track, key: number): [number, number] {
  const k = ((key % LOOP_KEYS) + LOOP_KEYS) % LOOP_KEYS;
  const steps = (keys: readonly number[]) =>
    keys.slice(0, 4).filter((s) => s <= k).length -
    keys.slice(4).filter((s) => s <= k).length;
  return [steps(track.top), ROWS - 1 - steps(track.foot)];
}

export const TRACK_SHIFT = 7;

export const STILL_KEY = 9;
export const SWAP_KEY = 24;

export type Look = {
  drum?: boolean;
  outline?: boolean;
  scramble?: boolean;
};
export const DRUM_STEP = 0.28;
export const DRUM_BARREL = 0.35;
export const DRUM_FADE = 0.45;
export const OUTLINE = 1.6;
export const SCRAMBLE = 0.85;
export const SCRAMBLE_KEYS = 6;
export const DEFAULT_LOOK: Look = { drum: true, outline: true, scramble: true };

export const DEFAULT_TEXT = "DESIGN FOR AGENTS";
export const DEFAULT_GROUND = "#e7e0ff";
export const DEFAULT_INK = "#3a12ff";
export const FONT_WEIGHT = 500;
export const FONT_VAR = "--font-sans";

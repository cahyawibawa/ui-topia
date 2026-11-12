/**
 * Warp type, from design.how (https://github.com/arla6ka/design.how), MIT licensed,
 * Copyright (c) 2026 Arlan Marat. Adapted for ui/topia: see the licence in engine.ts.
 */
// @ts-nocheck
// The layout and glyph geometry below indexes arrays throughout, always within
// range by construction. It is kept as designed rather than rewritten around
// `noUncheckedIndexedAccess`, so a copy in a stricter project may want it off.
export const FRAME_MS = 40;
export const FRAMES = 75;
export const LOOP_MS = FRAMES * FRAME_MS;
export const STILL_FRAME = 12;

export const SCENE_W = 1080;
export const SCENE_H = 608;

export const GROUND = "#0b1a1f";
export const INK = "#d9f5ea";

export const FONT_VAR = "--font-sans";
export const FONT_WEIGHT = 500;
export const FONT_SIZE = 106;
export const CAP = 76;

export type Phrases = readonly (readonly string[])[];
export const DEFAULT_PHRASES: Phrases = [
  ["Design", "demands courage"],
  ["Design", "echoes intent"],
  ["Design", "carries", "weight"],
  ["Design", "turns heads"],
  ["Design", "bends habits"],
  ["Design", "sorts chaos"],
];

export const CUTS = [0, 13, 25, 38, 50, 63, 75] as const;
export const SCENE_NAMES = [
  "wave",
  "trail",
  "gather",
  "rotate",
  "fold",
  "sort",
] as const;

export function keyAt(ms: number): number {
  const m = ((ms % LOOP_MS) + LOOP_MS) % LOOP_MS;
  return m / FRAME_MS;
}
export function frameAt(ms: number): number {
  return Math.floor(keyAt(ms));
}
export function sceneAt(key: number): { scene: number; local: number } {
  const f = ((key % FRAMES) + FRAMES) % FRAMES;
  let s = 0;
  while (s + 1 < CUTS.length - 1 && f >= CUTS[s + 1]) s++;
  return { scene: s, local: f - CUTS[s] };
}

export interface Measurer {
  width(text: string): number;
  ink(ch: string): readonly [number, number, number, number];
}
export interface Line {
  text: string;
  pens: readonly number[];
  adv: readonly number[];
  ink: readonly (readonly [number, number, number, number] | null)[];
  width: number;
}
export function layoutLine(text: string, m: Measurer): Line {
  const pens: number[] = [];
  const adv: number[] = [];
  const ink: (readonly [number, number, number, number] | null)[] = [];
  for (let i = 0; i < text.length; i++) {
    const a = m.width(text[i]);
    const pen = m.width(text.slice(0, i + 1)) - a;
    pens.push(pen);
    adv.push(a);
    if (text[i] === " ") {
      ink.push(null);
      continue;
    }
    const b = m.ink(text[i]);
    ink.push([pen + b[0], pen + b[1], b[2], b[3]]);
  }
  return { text, pens, adv, ink, width: m.width(text) };
}
export interface Layouts {
  scenes: readonly (readonly Line[])[];
  sortStart: readonly Line[];
  swaps: readonly Swap[];
}
export function buildLayouts(phrases: Phrases, m: Measurer): Layouts {
  const swaps = deriveSwaps(phrases[5]);
  const start = phrases[5].map((text, li) => {
    const a = text.split("");
    for (const sw of swaps)
      if (sw.line === li) [a[sw.at], a[sw.at + 1]] = [a[sw.at + 1], a[sw.at]];
    return layoutLine(a.join(""), m);
  });
  return {
    scenes: phrases.map((lines) => lines.map((t) => layoutLine(t, m))),
    sortStart: start,
    swaps,
  };
}

export const REST_BASE = [305, 403] as const;

export function inkExtent(
  line: Line,
  from = 0,
  to = line.text.length,
): [number, number, number, number] {
  let x0 = Infinity;
  let x1 = -Infinity;
  let y0 = Infinity;
  let y1 = -Infinity;
  for (let i = from; i < to; i++) {
    const b = line.ink[i];
    if (!b) continue;
    x0 = Math.min(x0, b[0]);
    x1 = Math.max(x1, b[1]);
    y0 = Math.min(y0, b[2]);
    y1 = Math.max(y1, b[3]);
  }
  return [x0, x1, y0, y1];
}
export function centredOrigin(line: Line, cx: number): number {
  const [x0, x1] = inkExtent(line);
  return cx - (x0 + x1) / 2;
}

export type Mat = [number, number, number, number, number, number];
export const ID: Mat = [1, 0, 0, 1, 0, 0];
export function mul(m: Mat, n: Mat): Mat {
  return [
    m[0] * n[0] + m[2] * n[1],
    m[1] * n[0] + m[3] * n[1],
    m[0] * n[2] + m[2] * n[3],
    m[1] * n[2] + m[3] * n[3],
    m[0] * n[4] + m[2] * n[5] + m[4],
    m[1] * n[4] + m[3] * n[5] + m[5],
  ];
}
export const translate = (x: number, y: number): Mat => [1, 0, 0, 1, x, y];
export const scale = (sx: number, sy: number): Mat => [sx, 0, 0, sy, 0, 0];
export function rotate(deg: number): Mat {
  const r = (deg * Math.PI) / 180;
  const c = Math.cos(r);
  const s = Math.sin(r);
  return [c, s, -s, c, 0, 0];
}
export const skewX = (deg: number): Mat => [
  1,
  0,
  -Math.tan((deg * Math.PI) / 180),
  1,
  0,
  0,
];
export function about(px: number, py: number, m: Mat): Mat {
  return mul(translate(px, py), mul(m, translate(-px, -py)));
}
export function apply(m: Mat, x: number, y: number): [number, number] {
  return [m[0] * x + m[2] * y + m[4], m[1] * x + m[3] * y + m[5]];
}

type Nested = number | readonly Nested[] | { readonly [k: string]: Nested };
function lerpNested(a: Nested, b: Nested, t: number): Nested {
  if (typeof a === "number") return a + ((b as number) - a) * t;
  if (Array.isArray(a))
    return (a as readonly Nested[]).map((v, i) =>
      lerpNested(v, (b as readonly Nested[])[i], t),
    );
  const o: { [k: string]: Nested } = {};
  const bo = b as { readonly [k: string]: Nested };
  for (const k of Object.keys(a as object))
    o[k] = lerpNested((a as { readonly [k: string]: Nested })[k], bo[k], t);
  return o;
}
export function row<T extends Nested>(table: readonly T[], local: number): T {
  const n = table.length;
  if (local <= 0) return table[0];
  if (local >= n - 1) return table[n - 1];
  const i = Math.floor(local);
  const t = local - i;
  return t === 0 ? table[i] : (lerpNested(table[i], table[i + 1], t) as T);
}

export interface Glyph {
  scene: number;
  line: number;
  slot: number;
  ch: string;
  m: Mat;
  box?: readonly [number, number, number, number];
}

function place(
  line: Line,
  ox: number,
  base: number,
  scene: number,
  li: number,
  out: Glyph[],
  per: (i: number, ax: number, ay: number) => Mat | null,
) {
  for (let i = 0; i < line.text.length; i++) {
    const ch = line.text[i];
    if (ch === " ") continue;
    const b = line.ink[i];
    const ax = ox + (b ? (b[0] + b[1]) / 2 : line.pens[i]);
    const ay = base - (b ? (b[2] + b[3]) / 2 : 0);
    const m = per(i, ax, ay);
    if (!m) continue;
    out.push({
      scene,
      line: li,
      slot: i,
      ch,
      m: mul(m, translate(ox + line.pens[i], base)),
    });
  }
}

export const WAVE: readonly (readonly (readonly (readonly number[])[])[])[] = [
  [
    [
      [0.78516, -0.18881, 3.15436, -4.92402, 2.67913],
      [0.94135, -0.82289, 4.26758, -6.15123, 3.02612],
      [-9.94882, 69.27296, -216.20761, 260.79436, -106.85515],
      [7.18965, 53.17013, -232.04561, 295.16932, -129.03266],
      [-6.87706, -79.25167, 25.57097, 90.61329, -28.40972],
      [2.33954, -41.1853, 144.87606, -214.19691, 104.18176],
    ],
    [
      [
        0.87541, 3.46528, -28.75203, 100.83001, -171.01023, 138.59977,
        -43.00506,
      ],
      [0.98766, 0.34387, -3.26435, 11.32852, -18.25744, 13.89836, -4.04935],
      [
        -4.88133, 120.6682, -999.154, 3621.94214, -6419.53361, 5449.75785,
        -1771.06685,
      ],
      [
        -2.30533, 64.52353, -497.51214, 1669.37635, -2810.00157, 2318.30828,
        -742.79106,
      ],
      [
        4.34234, -134.15464, 1400.29902, -5623.15261, 10484.64481, -9181.58145,
        3053.43975,
      ],
      [
        -1.94033, -0.28529, 15.77749, -114.30196, 278.25978, -269.70753,
        90.16349,
      ],
    ],
  ],
  [
    [
      [0.70272, -0.21624, 3.59052, -5.28871, 2.98216],
      [0.92941, -1.16637, 5.92999, -8.51396, 4.22219],
      [-11.37758, 70.69153, -215.43219, 259.26557, -108.31223],
      [12.5499, 46.10959, -209.06641, 257.54061, -115.67819],
      [-9.86381, -106.66018, 35.90334, 96.24647, -13.87308],
      [3.21809, -49.48243, 185.09852, -285.18969, 141.85366],
    ],
    [
      [0.88147, 3.40697, -27.11129, 91.72415, -152.17654, 121.96414, -37.68491],
      [0.99143, 0.30041, -2.7403, 8.80837, -13.18683, 9.35259, -2.52913],
      [
        -3.91749, 110.87562, -1065.96422, 4193.41246, -7806.5678, 6843.83686,
        -2274.06714,
      ],
      [
        -1.44838, 69.62558, -643.78915, 2341.00837, -4094.02571, 3438.83467,
        -1110.53157,
      ],
      [
        3.99064, -125.33353, 1422.45422, -5926.0843, 11244.81516, -9939.89092,
        3323.96677,
      ],
      [
        -2.59061, 6.35783, -10.33648, -73.11989, 255.58954, -274.89804,
        97.58624,
      ],
    ],
  ],
  [
    [
      [0.59886, -0.1292, 3.71242, -5.59301, 3.54345],
      [0.96104, -1.90464, 9.06353, -12.93853, 6.45472],
      [-20.96589, 171.48743, -576.08687, 741.46783, -323.8561],
      [8.18744, 128.1013, -504.94822, 651.31888, -295.03907],
      [-12.14618, -142.23067, 74.65761, 43.23958, 38.7621],
      [3.2421, -57.17531, 224.22739, -357.77089, 181.90986],
    ],
    [
      [0.89184, 3.39203, -26.95166, 89.55308, -145.60189, 114.4706, -34.72887],
      [0.99866, 0.22239, -1.84641, 4.44265, -4.20276, 1.20085, 0.18625],
      [
        -4.69659, 95.37271, -713.05847, 2442.13959, -4236.19041, 3588.26041,
        -1173.24756,
      ],
      [
        -1.62122, 63.36279, -439.50586, 1258.57389, -1840.14817, 1370.04467,
        -409.98414,
      ],
      [
        3.53562, -107.74993, 1327.20132, -5616.42655, 10619.39167, -9321.55314,
        3099.40057,
      ],
      [
        -2.46933, -7.39244, 125.60832, -603.99256, 1220.43785, -1094.80052,
        361.95405,
      ],
    ],
  ],
  [
    [
      [0.49536, -0.15017, 4.22498, -6.95143, 5.0588],
      [0.44209, 5.16069, -18.18957, 24.65418, -10.27941],
      [-21.20142, 137.53373, -426.78103, 523.55165, -221.55644],
      [8.93558, 109.79004, -406.41394, 506.72239, -234.33066],
      [-18.21501, -162.51561, 60.03643, 35.24338, 87.00912],
      [1.03131, -58.30277, 235.25314, -384.45331, 198.65414],
    ],
    [
      [0.93058, 3.44871, -29.12909, 96.60791, -155.34144, 121.09607, -36.56497],
      [1.03939, -0.18235, 0.92045, -6.12918, 15.29229, -15.46304, 5.5395],
      [
        -4.75586, 115.67327, -929.60975, 3330.78562, -5890.5061, 5012.74127,
        -1637.14912,
      ],
      [
        0.71045, 60.18999, -475.67901, 1372.90795, -1963.57351, 1425.49523,
        -418.40022,
      ],
      [
        3.39277, -102.65248, 1524.39703, -6720.53325, 12702.84673, -11019.67253,
        3616.60335,
      ],
      [
        -2.43774, -14.05925, 158.44121, -699.17802, 1356.44764, -1171.29171,
        371.95176,
      ],
    ],
  ],
  [
    [
      [0.46709, -0.39064, 5.30633, -8.9456, 6.56314],
      [0.39136, 5.12348, -17.74922, 23.78365, -9.64986],
      [-22.42113, 151.77157, -467.76291, 568.52898, -238.48322],
      [8.20958, 112.44205, -406.63998, 509.54018, -239.8001],
      [-22.22938, -185.61966, 107.48565, -55.04734, 156.20152],
      [-2.19968, -52.67389, 224.32197, -375.7688, 197.69133],
    ],
    [
      [0.97836, 3.23038, -28.23864, 91.77835, -144.54626, 111.24379, -33.36237],
      [1.07012, -0.53314, 3.89238, -18.58909, 39.29296, -36.6481, 12.55592],
      [
        -5.18427, 142.82677, -1157.11854, 4092.30972, -7101.58749, 5928.37225,
        -1902.24331,
      ],
      [
        3.0057, 53.41824, -468.70095, 1301.29621, -1725.01625, 1148.57886,
        -309.08483,
      ],
      [
        2.96433, -90.31015, 1681.80048, -7683.34179, 14494.74314, -12436.61964,
        4035.4526,
      ],
      [
        -3.17539, -17.37447, 218.21349, -966.22165, 1847.07833, -1570.44963,
        493.21544,
      ],
    ],
  ],
  [
    [
      [0.45763, -0.89706, 7.58135, -12.95498, 9.16303],
      [0.36193, 4.93805, -16.95721, 22.50179, -8.8446],
      [-22.8358, 132.69479, -378.59866, 443.32202, -182.87163],
      [6.08178, 109.97522, -377.03216, 475.55634, -232.57702],
      [-26.58529, -199.31992, 127.0438, -109.93788, 207.93384],
      [-4.09135, -61.1724, 257.61756, -421.96281, 220.736],
    ],
    [
      [1.13115, 2.35014, -25.65145, 78.67739, -110.37718, 74.70768, -19.64716],
      [1.17083, -1.28971, 8.06357, -35.21683, 71.50451, -64.73175, 21.57941],
      [
        -1.85953, 69.44001, -646.03388, 2458.42005, -4475.22973, 3878.13901,
        -1284.62013,
      ],
      [
        11.90765, -44.32729, 90.44057, -649.01069, 1862.6694, -1994.23003,
        730.07556,
      ],
      [
        1.87876, -26.03069, 1768.46106, -9124.44734, 17610.40293, -15100.19859,
        4874.88177,
      ],
      [
        -3.30814, -42.64933, 407.36398, -1695.72809, 3180.87127, -2674.52567,
        832.26994,
      ],
    ],
  ],
  [
    [
      [0.4565, -1.1434, 8.70731, -14.95325, 10.41788],
      [0.34432, 4.98472, -17.17027, 22.78275, -8.91317],
      [-22.87413, 122.18746, -321.26659, 340.95867, -125.46094],
      [5.11977, 111.77335, -371.51484, 457.23999, -220.12344],
      [-28.54525, -197.34929, 104.05813, -84.66285, 204.45822],
      [-5.71756, -51.66863, 220.51886, -368.02796, 195.28965],
    ],
    [
      [1.28508, 0.95627, -18.80569, 54.78401, -66.66367, 37.32941, -7.57698],
      [1.25718, -2.28527, 13.35231, -52.75955, 101.84435, -89.65515, 29.37342],
      [
        -0.42995, 17.83906, -94.17852, 236.244, -421.23649, 464.63389,
        -203.41972,
      ],
      [
        16.78524, -119.09957, 652.6766, -2837.73644, 5937.46818, -5506.42989,
        1868.52064,
      ],
      [
        1.45298, 37.92838, 1669.34467, -9570.29014, 18731.71641, -16035.9843,
        5171.13929,
      ],
      [
        -2.68877, -72.95592, 558.41401, -2175.70486, 3998.28887, -3325.1549,
        1027.66058,
      ],
    ],
  ],
  [
    [
      [0.44782, -1.06965, 8.30533, -14.41882, 10.29506],
      [0.3265, 4.9765, -16.92258, 22.26617, -8.59452],
      [-28.93129, 228.21062, -759.24568, 972.65558, -422.24002],
      [-1.27162, 219.47899, -810.69838, 1086.1385, -514.15643],
      [-29.45213, -201.49705, 113.97615, -109.3551, 224.06947],
      [-7.21261, -40.5082, 181.20341, -315.18878, 171.81041],
    ],
    [
      [1.47257, -0.61101, -14.98346, 48.9689, -61.13814, 35.12884, -7.34785],
      [1.294, -2.7572, 14.21666, -54.43665, 104.67788, -91.57024, 29.75631],
      [
        0.52463, 6.59443, -64.02498, 192.19524, -256.83007, 181.62822,
        -58.93853,
      ],
      [
        20.59249, -202.36857, 1076.42601, -4171.91422, 8241.44319, -7432.71101,
        2486.39164,
      ],
      [
        1.84958, 121.08401, 1343.05457, -9198.70058, 18419.03627, -15816.15544,
        5134.92168,
      ],
      [
        -1.85224, -104.10648, 666.625, -2540.18181, 4719.90205, -3962.39006,
        1235.13704,
      ],
    ],
  ],
  [
    [
      [0.45846, -1.31848, 9.37743, -16.21461, 11.34062],
      [0.30909, 5.08252, -17.36475, 22.89968, -8.86393],
      [-21.50955, 120.84073, -337.54876, 378.5513, -147.4797],
      [4.62622, 127.28011, -445.54485, 575.97482, -281.35217],
      [-30.79225, -199.35175, 100.11225, -95.33027, 222.4149],
      [-7.06165, -48.36068, 208.49443, -350.49745, 187.31795],
    ],
    [
      [1.75712, -3.84479, -1.79923, 18.60955, -24.44956, 13.65813, -2.02241],
      [1.31766, -3.42855, 16.00349, -57.56523, 107.35025, -91.43941, 29.12465],
      [0.00067, 2.58365, 7.47314, -134.39066, 377.82573, -354.88106, 103.49686],
      [
        22.46157, -289.25768, 1396.75929, -4889.74515, 9170.84741, -8029.21687,
        2643.07694,
      ],
      [
        2.5416, 276.78856, 351.11062, -6505.4524, 14310.74362, -12907.22843,
        4479.11076,
      ],
      [
        -1.18485, -129.7788, 650.13611, -2381.7643, 4478.16203, -3774.77571,
        1185.79446,
      ],
    ],
  ],
  [
    [
      [0.4544, -1.36463, 9.61334, -16.60379, 11.57076],
      [0.32468, 4.79559, -16.19264, 21.15699, -8.00292],
      [-21.89491, 115.87449, -309.23945, 334.35614, -126.0106],
      [5.07506, 113.19149, -384.64425, 487.25188, -239.4082],
      [-30.75619, -205.13971, 122.07428, -131.18557, 242.21753],
      [-7.02025, -55.33123, 239.68655, -397.15542, 209.94463],
    ],
    [
      [1.88994, -5.55829, 5.53966, 1.66056, -2.96788, -1.77956, 3.48669],
      [
        1.28563, -1.26237, -12.91681, 65.50291, -124.70537, 110.54605,
        -36.93619,
      ],
      [
        0.77738, -42.80701, 506.07324, -1955.4296, 3319.27184, -2525.4856,
        699.79576,
      ],
      [
        24.31803, -390.46109, 2177.35042, -7500.01291, 13359.4726, -11251.9543,
        3609.22664,
      ],
      [
        3.02773, 336.88496, -52.95243, -5406.61642, 12856.6286, -12323.10718,
        4597.44595,
      ],
      [
        -0.61044, -142.39666, 625.47503, -2184.44795, 4104.94475, -3480.43751,
        1117.73554,
      ],
    ],
  ],
  [
    [
      [0.45565, -1.36642, 9.65076, -16.72509, 11.67428],
      [0.77819, -2.06381, 10.70131, -16.21289, 9.00718],
      [-26.3412, 218.65425, -759.77103, 990.99662, -432.68457],
      [-0.88169, 229.22321, -877.60481, 1199.45261, -571.44603],
      [-30.78931, -212.16964, 150.09389, -174.45379, 264.56106],
      [-5.63922, -73.3418, 303.83228, -482.6005, 248.11825],
    ],
    [
      [2.03527, -7.89367, 19.96109, -44.36641, 74.06896, -67.0609, 25.86073],
      [
        1.28297, -1.18322, -15.54083, 76.89893, -145.43366, 127.75962,
        -42.08759,
      ],
      [
        -0.75982, 49.05107, -539.73869, 2204.81755, -4191.52725, 3822.17556,
        -1343.04501,
      ],
      [
        24.03296, -358.49544, 1424.05041, -4048.8996, 6794.49179, -5604.65325,
        1797.95325,
      ],
      [
        4.14824, 366.42768, -164.46588, -5537.4869, 13895.90286, -14036.04339,
        5485.85176,
      ],
      [
        -0.36251, -145.62129, 531.76684, -1726.6682, 3259.38112, -2799.81806,
        933.27599,
      ],
    ],
  ],
  [
    [
      [0.45581, -1.38323, 9.74777, -16.93889, 11.82195],
      [0.30336, 4.95016, -16.60462, 21.57061, -8.12672],
      [-16.66014, 75.11688, -204.6718, 224.84919, -85.46431],
      [8.5032, 88.74929, -329.69408, 439.32476, -225.7332],
      [-31.28367, -206.8762, 131.74353, -152.95045, 256.57384],
      [-6.40847, -62.83846, 265.51098, -432.87034, 227.08414],
    ],
    [
      [2.07876, -8.30363, 20.56577, -43.41738, 71.85035, -67.03475, 26.98686],
      [
        1.29721, -1.76125, -10.82408, 60.78485, -119.29227, 107.60453,
        -36.05005,
      ],
      [
        1.07977, -42.66306, 387.26238, -1232.72826, 1622.09362, -758.04949,
        24.04364,
      ],
      [
        25.7687, -451.39928, 2289.05906, -7190.88697, 12091.07324, -9805.01791,
        3070.68661,
      ],
      [
        4.37268, 387.272, -281.78921, -5359.18311, 13963.70997, -14453.30118,
        5754.19306,
      ],
      [
        0.06695, -157.35735, 588.88942, -1909.94731, 3607.88255, -3139.61479,
        1066.30102,
      ],
    ],
  ],
  [
    [
      [0.45831, -1.43815, 9.94795, -17.19009, 11.9295],
      [0.30309, 4.96224, -16.68243, 21.69623, -8.18403],
      [-15.46861, 56.81233, -133.92904, 132.78631, -47.33052],
      [9.55525, 73.24207, -271.20154, 364.5256, -195.12729],
      [-31.48727, -204.02183, 118.23584, -132.7585, 247.15464],
      [-6.37841, -63.39389, 266.51804, -433.25691, 227.08141],
    ],
    [
      [2.12049, -9.12659, 26.62832, -64.57848, 108.95118, -98.91624, 37.72185],
      [1.2948, -1.68181, -11.82867, 64.36389, -124.94798, 111.70964, -37.11106],
      [
        0.35174, 0.46913, -124.62562, 869.71083, -2273.75185, 2604.72053,
        -1076.99606,
      ],
      [
        25.52618, -430.0473, 1919.76838, -5523.79143, 8861.92081, -6949.38166,
        2124.59665,
      ],
      [
        4.73725, 391.84966, -276.44246, -5539.95642, 14513.58742, -15128.20666,
        6050.31106,
      ],
      [
        0.2323, -159.84596, 583.96919, -1873.25129, 3550.84693, -3115.8802,
        1072.69007,
      ],
    ],
  ],
];
export const WAVE_WIDTH = [311, 772] as const;
export function poly(c: readonly number[], u: number): number {
  let v = 0;
  let p = 1;
  for (const k of c) {
    v += k * p;
    p *= u;
  }
  return v;
}
function waveGlyphs(local: number, L: Layouts, out: Glyph[]) {
  const lines = L.scenes[0];
  const cur = row(WAVE, local);
  for (let li = 0; li < Math.min(2, lines.length); li++) {
    const line = lines[li];
    const [x0, x1] = inkExtent(line);
    const ox = centredOrigin(line, 540.5);
    const base = REST_BASE[li];
    const c = cur[li];
    const wscale = (x1 - x0) / WAVE_WIDTH[li];
    place(line, ox, base, 0, li, out, (_i, ax) => {
      const u = (ax - ox - x0) / (x1 - x0);
      const sx = poly(c[0], u);
      const sy = poly(c[1], u);
      const rot = poly(c[2], u);
      const sk = poly(c[3], u);
      const ux = poly(c[4], u) * wscale;
      const uy = poly(c[5], u);
      const t = Math.tan((sk * Math.PI) / 180);
      const shape: Mat = [sx, 0, sy * t, sy, 0, 0];
      return mul(
        translate(ax + ux, base + uy),
        mul(rotate(rot), mul(shape, translate(-ax, -base))),
      );
    });
  }
}

export type TrailLayer = readonly [
  number,
  number,
  number,
  number,
  number,
  number,
];
export const TRAIL: readonly (readonly TrailLayer[])[] = [
  [
    [0.6919, 0.6764, 0.55, -1.62, 305.9, 178.3],
    [0.6651, 0.6651, 1.32, -1.97, 483.2, 239.6],
    [0.7357, 0.7357, 2.91, -2.18, 514.1, 272.9],
    [0.8238, 0.8238, 3.76, -2.51, 553.6, 315.0],
    [0.935, 0.935, 4.2, -2.89, 605.6, 369.3],
    [1.2389, 1.1381, -0.61, -3.53, 133.3, 480.3],
    [1.0839, 1.0657, 5.89, -3.67, -13.7, 442.8],
  ],
  [
    [0.6866, 0.6714, 0.28, -1.73, 301.6, 173.0],
    [0.6605, 0.6605, 1.41, -2.02, 477.5, 233.5],
    [0.7308, 0.7308, 2.7, -2.31, 509.7, 268.0],
    [0.8201, 0.8201, 3.66, -2.66, 550.6, 311.6],
    [0.9317, 0.9317, 4.53, -3.05, 604.9, 368.2],
    [1.2441, 1.1393, -0.62, -3.74, 134.2, 485.2],
    [1.0845, 1.0654, 6.19, -3.9, -14.1, 445.7],
  ],
  [
    [0.6866, 0.6714, 0.28, -1.73, 295.6, 166.6],
    [0.654, 0.654, 1.41, -2.14, 471.5, 227.1],
    [0.7236, 0.7236, 3.14, -2.43, 503.7, 261.5],
    [0.8153, 0.8153, 3.7, -2.8, 546.6, 307.2],
    [0.9282, 0.9282, 5.05, -3.28, 603.7, 367.1],
    [1.252, 1.1451, -0.51, -4.01, 135.3, 491.9],
    [1.084, 1.065, 6.87, -4.2, -15.0, 449.4],
  ],
  [
    [0.6866, 0.6714, 0.28, -1.73, 292.3, 163.1],
    [0.6525, 0.6525, 1.41, -2.23, 468.2, 223.6],
    [0.7219, 0.7219, 2.66, -2.52, 500.5, 258.0],
    [0.8118, 0.8118, 4.02, -2.91, 544.4, 304.7],
    [0.9246, 0.9246, 5.44, -3.38, 603.3, 366.2],
    [1.2553, 1.146, -0.48, -4.17, 136.3, 495.6],
    [1.0844, 1.0642, 6.96, -4.34, -15.3, 451.4],
  ],
  [
    [0.6866, 0.6714, 0.28, -1.73, 289.3, 159.9],
    [0.6488, 0.6488, 1.41, -2.28, 465.2, 220.4],
    [0.7178, 0.7178, 2.98, -2.58, 497.5, 254.8],
    [0.8084, 0.8084, 4.15, -3.01, 542.6, 302.6],
    [0.9244, 0.9244, 5.76, -3.62, 602.5, 365.9],
    [1.2583, 1.1473, -0.35, -4.3, 137.1, 498.9],
    [1.0842, 1.0648, 7.35, -4.48, -15.7, 453.3],
  ],
  [
    [0.6866, 0.6714, 0.28, -1.73, 285.8, 155.9],
    [0.6464, 0.6464, 1.41, -2.36, 461.7, 216.4],
    [0.7151, 0.7151, 2.65, -2.65, 493.9, 250.9],
    [0.8061, 0.8061, 3.99, -3.1, 540.2, 299.9],
    [0.9231, 0.9231, 5.79, -3.73, 601.8, 365.1],
    [1.262, 1.1473, -0.17, -4.47, 138.1, 503.1],
    [1.0831, 1.0637, 7.61, -4.65, -15.7, 455.5],
  ],
  [
    [0.6866, 0.6714, 0.28, -1.73, 283.8, 153.7],
    [0.6435, 0.6435, 1.41, -2.43, 459.7, 214.2],
    [0.712, 0.712, 2.97, -2.72, 491.9, 248.7],
    [0.8036, 0.8036, 4.15, -3.16, 538.8, 298.4],
    [0.9215, 0.9215, 5.97, -3.81, 601.6, 364.6],
    [1.2638, 1.149, 0.07, -4.58, 138.7, 505.5],
    [1.0842, 1.0636, 7.71, -4.76, -15.9, 456.9],
  ],
  [
    [0.6866, 0.6714, 0.28, -1.73, 281.1, 151.1],
    [0.6414, 0.6414, 1.41, -2.5, 457.0, 211.6],
    [0.7096, 0.7096, 3.45, -2.79, 489.3, 246.0],
    [0.8016, 0.8016, 4.03, -3.22, 537.4, 296.6],
    [0.9195, 0.9195, 6.05, -3.89, 601.3, 364.1],
    [1.267, 1.151, -0.34, -4.69, 139.6, 508.3],
    [1.0869, 1.064, 7.63, -4.87, -17.0, 458.5],
  ],
  [
    [0.6866, 0.6714, 0.28, -1.73, 280.1, 149.8],
    [0.6408, 0.6408, 1.41, -2.51, 456.0, 210.2],
    [0.709, 0.709, 2.89, -2.8, 488.2, 244.7],
    [0.8006, 0.8006, 4.05, -3.26, 536.5, 295.7],
    [0.9187, 0.9187, 6.1, -3.95, 601.1, 363.8],
    [1.2686, 1.1506, -0.22, -4.76, 139.9, 509.9],
    [1.0865, 1.0633, 7.75, -4.94, -17.0, 459.3],
  ],
  [
    [0.6866, 0.6714, 0.28, -1.73, 279.1, 148.7],
    [0.64, 0.64, 1.41, -2.52, 455.0, 209.1],
    [0.7081, 0.7081, 2.88, -2.82, 487.2, 243.6],
    [0.8005, 0.8005, 3.96, -3.27, 535.7, 294.9],
    [0.919, 0.919, 5.91, -3.94, 601.0, 363.5],
    [1.2689, 1.1498, -0.15, -4.81, 140.4, 511.0],
    [1.0854, 1.0639, 8.04, -4.96, -17.0, 459.9],
  ],
  [
    [0.6866, 0.6714, 0.28, -1.73, 278.1, 147.6],
    [0.6389, 0.6389, 1.41, -2.56, 454.0, 208.1],
    [0.7069, 0.7069, 3.0, -2.86, 486.2, 242.5],
    [0.7987, 0.7987, 4.35, -3.32, 535.1, 294.1],
    [0.9174, 0.9174, 6.17, -3.99, 600.8, 363.3],
    [1.2703, 1.1509, -0.1, -4.87, 140.6, 512.3],
    [1.0854, 1.0647, 7.97, -4.97, -17.0, 460.5],
  ],
  [
    [0.6866, 0.6714, 0.28, -1.73, 277.5, 147.1],
    [0.6377, 0.6377, 1.41, -2.59, 453.4, 207.6],
    [0.7055, 0.7055, 3.62, -2.88, 485.6, 242.1],
    [0.7994, 0.7994, 4.03, -3.3, 534.8, 293.8],
    [0.9181, 0.9181, 6.15, -4.02, 600.7, 363.3],
    [1.2718, 1.1528, -0.07, -4.87, 140.6, 512.8],
    [1.0852, 1.0625, 8.17, -5.07, -17.4, 460.9],
  ],
];
export const TRAIL_PAD = [1, 2, 1, 1] as const;
export const TRAIL_OPAQUE = false;
function trailGlyphs(local: number, L: Layouts, out: Glyph[]) {
  const rows = row(TRAIL, local);
  const [first, big] = L.scenes[1];
  const space = big.text.lastIndexOf(" ");
  const w0 = space + 1;
  const layers: [Line, number, number][] = [
    [first, 0, first.text.length],
    [big, w0, big.text.length],
    [big, w0, big.text.length],
    [big, w0, big.text.length],
    [big, w0, big.text.length],
    [big, 0, space < 0 ? big.text.length : space],
    [big, w0, big.text.length],
  ];
  for (let k = 0; k < layers.length; k++) {
    const [line, from, to] = layers[k];
    if (from >= to) continue;
    const [sx, sy, lean, turn, tx, ty] = rows[k];
    const p0 = line.pens[from];
    const x = k === 6 ? rows[5][4] + p0 * rows[5][0] + tx : tx;
    const m = mul(
      translate(x, ty),
      mul(rotate(turn), mul(skewX(lean), scale(sx, sy))),
    );
    const [x0, x1, y0, y1] = inkExtent(line, from, to);
    if (TRAIL_OPAQUE)
      out.push({
        scene: 1,
        line: k,
        slot: -1,
        ch: "",
        m,
        box: [
          x0 - p0 - TRAIL_PAD[0],
          -y1 - TRAIL_PAD[1],
          x1 - p0 + TRAIL_PAD[2],
          -y0 + TRAIL_PAD[3],
        ],
      });
    for (let i = from; i < to; i++) {
      const ch = line.text[i];
      if (ch === " ") continue;
      out.push({
        scene: 1,
        line: k,
        slot: i,
        ch,
        m: mul(m, translate(line.pens[i] - p0, 0)),
      });
    }
  }
}

export const GATHER: readonly (readonly (readonly [
  number,
  number,
  number,
])[])[] = [
  [
    [532.2, 164.2, -1.34],
    [547.3, 231.3, 1.78],
    [540.1, 337.5, -0.18],
  ],
  [
    [532.2, 172.4, -1.41],
    [547.3, 239.4, 1.91],
    [540.1, 353.5, -0.18],
  ],
  [
    [532.2, 180.2, -1.49],
    [547.3, 247.1, 1.85],
    [540.1, 366.2, -0.19],
  ],
  [
    [532.1, 191.3, -1.58],
    [547.3, 258.2, 1.9],
    [540.2, 378.5, -0.17],
  ],
  [
    [532.2, 198.6, -1.66],
    [547.3, 265.4, 1.91],
    [540.1, 384.2, -0.19],
  ],
  [
    [532.2, 209.4, -1.76],
    [547.3, 276.3, 1.88],
    [540.1, 390.2, -0.19],
  ],
  [
    [532.1, 217.0, -1.83],
    [547.3, 283.6, 1.96],
    [540.1, 393.2, -0.19],
  ],
  [
    [532.1, 224.7, -1.92],
    [547.3, 291.5, 1.98],
    [540.2, 395.5, -0.17],
  ],
  [
    [532.1, 237.0, -2.0],
    [547.3, 303.5, 1.94],
    [540.1, 397.8, -0.2],
  ],
  [
    [532.0, 244.2, -2.18],
    [547.6, 310.5, 1.62],
    [540.1, 399.2, -0.19],
  ],
  [
    [531.2, 248.4, -2.94],
    [549.0, 314.9, 0.42],
    [540.1, 400.5, -0.18],
  ],
  [
    [530.7, 249.2, -3.64],
    [549.5, 315.1, 0.36],
    [540.1, 400.5, -0.18],
  ],
  [
    [530.1, 250.5, -4.3],
    [550.0, 315.7, 0.26],
    [540.1, 401.2, -0.19],
  ],
];
export const GATHER_SCALE: readonly number[] = [1.012, 0.97, 1.006];
function gatherGlyphs(local: number, L: Layouts, out: Glyph[]) {
  const rows = row(GATHER, local);
  const lines = L.scenes[2];
  for (let li = 0; li < Math.min(3, lines.length); li++) {
    const line = lines[li];
    const [cx, cy, deg] = rows[Math.min(li, rows.length - 1)];
    const s = GATHER_SCALE[Math.min(li, GATHER_SCALE.length - 1)];
    const [, , y0, y1] = inkExtent(line);
    const ox = centredOrigin(line, cx);
    const base = cy + (y0 + y1) / 2;
    place(line, ox, base, 2, li, out, () =>
      about(cx, cy, mul(rotate(deg), scale(s, s))),
    );
  }
}

export const ROTATE: readonly (readonly (readonly [
  number,
  number,
  number,
])[])[] = [
  [
    [544, 222, 0.52],
    [538, 369, 0.09],
  ],
  [
    [548, 221, 0.77],
    [538, 372, -0.09],
  ],
  [
    [558, 219, 2.17],
    [539, 394, -0.06],
  ],
  [
    [576, 219, 4.25],
    [540, 400, -0.16],
  ],
  [
    [631, 219, 10.74],
    [541, 403, -0.31],
  ],
  [
    [654, 219, 13.32],
    [546, 405, -0.89],
  ],
  [
    [660, 220, 14.04],
    [552, 406, -1.59],
  ],
  [
    [665, 220, 14.56],
    [574, 407, -4.2],
  ],
  [
    [666, 220, 14.8],
    [628, 406, -10.83],
  ],
  [
    [667, 220, 14.89],
    [646, 406, -12.9],
  ],
  [
    [667, 220, 14.89],
    [657, 406, -14.11],
  ],
  [
    [667, 220, 14.89],
    [660, 406, -14.57],
  ],
];
function rotateGlyphs(local: number, L: Layouts, out: Glyph[]) {
  const rows = row(ROTATE, local);
  const lines = L.scenes[3];
  for (let li = 0; li < Math.min(2, lines.length); li++) {
    const line = lines[li];
    const [cx, cy, deg] = rows[li];
    const [, , y0, y1] = inkExtent(line);
    const ox = centredOrigin(line, cx);
    const base = cy + (y0 + y1) / 2;
    place(line, ox, base, 3, li, out, () => about(cx, cy, rotate(deg)));
  }
}

export const FOLD: readonly (readonly (readonly [number, number, number])[])[] =
  [
    [
      [0.42, 0.0, 0.0],
      [0.2, 0.0, 0.0],
      [0.56, 0.0, 0.0],
    ],
    [
      [0.08, -1.2, 9.2],
      [-0.85, 1.9, -8.1],
      [0.33, 0.1, 0.2],
    ],
    [
      [-0.42, -2.0, 5.7],
      [-0.7, 0.0, 3.8],
      [0.39, 0.0, 2.2],
    ],
    [
      [-1.25, -3.0, 2.8],
      [-1.3, 0.4, 7.5],
      [0.67, 0.0, 4.8],
    ],
    [
      [-1.25, -3.3, 0.7],
      [-1.7, -1.9, 10.0],
      [1.56, -0.6, 6.1],
    ],
    [
      [-3.0, -5.0, -3.7],
      [-2.4, 0.9, 13.6],
      [1.83, -0.7, 8.6],
    ],
    [
      [-3.5, -5.5, -5.8],
      [-3.1, 1.0, 16.1],
      [1.83, -0.8, 10.0],
    ],
    [
      [-3.92, -6.2, -8.0],
      [-3.65, 1.0, 18.7],
      [1.72, -0.9, 11.3],
    ],
    [
      [-4.67, -7.0, -10.5],
      [-4.3, 1.2, 22.7],
      [1.94, -1.0, 13.7],
    ],
    [
      [-5.42, -7.8, -12.8],
      [-4.35, 1.5, 25.1],
      [2.17, -1.1, 15.2],
    ],
    [
      [-6.17, -9.3, -17.2],
      [-5.1, 1.6, 28.8],
      [3.17, -1.3, 17.3],
    ],
    [
      [-6.33, -10.0, -19.5],
      [-5.15, 1.8, 31.2],
      [3.33, -1.6, 19.1],
    ],
    [
      [-6.92, -10.7, -21.5],
      [-5.95, 2.0, 33.8],
      [3.39, -1.6, 20.7],
    ],
  ];
export const FOLD_CENTRES = [
  [541, 275],
  [543.5, 365.5],
] as const;
export const FOLD_GAIN = { turn: 2.4, drift: 1.8 } as const;
function foldGlyphs(local: number, L: Layouts, out: Glyph[]) {
  const rows = row(FOLD, local);
  const lines = L.scenes[4];
  for (let li = 0; li < Math.min(2, lines.length); li++) {
    const line = lines[li];
    const [cx, cy] = FOLD_CENTRES[li];
    const [, , y0, y1] = inkExtent(line);
    const ox = centredOrigin(line, cx);
    const base = cy + (y0 + y1) / 2;
    const space = li === 0 ? -1 : line.text.indexOf(" ");
    const centre = (from: number, to: number): [number, number] => {
      const [x0, x1, wy0, wy1] = inkExtent(line, from, to);
      return [ox + (x0 + x1) / 2, base - (wy0 + wy1) / 2];
    };
    const words: [number, number][] =
      space < 0
        ? [centre(0, line.text.length)]
        : [centre(0, space), centre(space + 1, line.text.length)];
    place(line, ox, base, 4, li, out, (i) => {
      const w = li === 0 ? 0 : space < 0 || i < space ? 1 : 2;
      const [deg, dx, dy] = rows[Math.min(w, rows.length - 1)];
      const [wcx, wcy] =
        words[li === 0 ? 0 : Math.min(w - 1, words.length - 1)];
      return mul(
        translate(dx * FOLD_GAIN.drift, dy * FOLD_GAIN.drift),
        about(wcx, wcy, rotate(deg * FOLD_GAIN.turn)),
      );
    });
  }
}

export interface Swap {
  line: number;
  at: number;
  round: number;
  hop: 0 | 1;
}
export function deriveSwaps(lines: readonly string[]): Swap[] {
  const out: Swap[] = [];
  lines.forEach((text, li) => {
    let start = 0;
    let k = 0;
    text.split(" ").forEach((w) => {
      let n = 0;
      for (let i = 0; i + 1 < w.length && n < 3; i += 2) {
        if (w[i] === w[i + 1]) continue;
        if (w[i] !== w[i].toLowerCase() || w[i + 1] !== w[i + 1].toLowerCase())
          continue;
        out.push({
          line: li,
          at: start + i,
          round: k % 3,
          hop: li === 0 ? 0 : 1,
        });
        n++;
        k++;
      }
      start += w.length + 1;
    });
  });
  return out;
}
export const SORT = {
  roundEvery: 4,
  firstRound: 0,
  slide: [0, 0.02, 0.08, 0.21, 0.51, 0.86, 0.96, 1] as const,
  shrink: [1, 0.97, 0.9, 0.79, 0.5, 0.85, 0.95, 1] as const,
  drift: [0, 1, 3, 7, 16] as const,
  overshoot: [5, 5, 2, 0] as const,
} as const;
export const SORT_BASE = [305, 403] as const;
function at(arr: readonly number[], k: number): number {
  const n = arr.length;
  if (k <= 0) return arr[0];
  if (k >= n - 1) return arr[n - 1];
  const i = Math.floor(k);
  const t = k - i;
  return arr[i] + (arr[i + 1] - arr[i]) * t;
}
function sortGlyphs(local: number, L: Layouts, out: Glyph[]) {
  const lines = L.scenes[5];
  for (let li = 0; li < Math.min(2, lines.length); li++) {
    const sorted = lines[li];
    const start = L.sortStart[li];
    const ox = centredOrigin(sorted, 540.5);
    const sox = centredOrigin(start, 540.5);
    const base = SORT_BASE[li];
    const from: number[] = [];
    for (let i = 0; i < sorted.text.length; i++) from[i] = i;
    for (const sw of L.swaps)
      if (sw.line === li) {
        from[sw.at] = sw.at + 1;
        from[sw.at + 1] = sw.at;
      }
    for (let i = 0; i < sorted.text.length; i++) {
      const ch = sorted.text[i];
      if (ch === " ") continue;
      const b = sorted.ink[i]!;
      const dest = ox + sorted.pens[i];
      const origin = sox + start.pens[from[i]];
      const sw = L.swaps.find(
        (s) => s.line === li && (s.at === i || s.at + 1 === i),
      );
      const push = (x: number, s: number) => {
        const cx = x - sorted.pens[i] + (b[0] + b[1]) / 2;
        const cy = base - (b[2] + b[3]) / 2;
        out.push({
          scene: 5,
          line: li,
          slot: i,
          ch,
          m: mul(s === 1 ? ID : about(cx, cy, scale(s, s)), translate(x, base)),
        });
      };
      if (!sw) {
        push(dest, 1);
        continue;
      }
      const R = SORT.firstRound + sw.round * SORT.roundEvery;
      const k = local - R;
      const isHopper = (from[i] === sw.at) === (sw.hop === 0);
      const dir = Math.sign(dest - origin) || 1;
      if (!isHopper) {
        push(origin + (dest - origin) * at(SORT.slide, k + 4), 1);
        continue;
      }
      if (k <= -4) {
        push(origin, 1);
        continue;
      }
      if (k >= 3) {
        push(dest, 1);
        continue;
      }
      const s = at(SORT.shrink, k + 4);
      if (k < 0) {
        push(origin - dir * at(SORT.drift, k + 4), s);
        continue;
      }
      if (k < 1) {
        push(origin - dir * SORT.drift[4], s);
        push(dest + dir * SORT.overshoot[0], s);
        continue;
      }
      push(dest + dir * at(SORT.overshoot, k), s);
    }
  }
}

export function glyphsAt(key: number, L: Layouts): Glyph[] {
  const { scene, local } = sceneAt(key);
  const out: Glyph[] = [];
  if (scene === 0) waveGlyphs(local, L, out);
  else if (scene === 1) trailGlyphs(local, L, out);
  else if (scene === 2) gatherGlyphs(local, L, out);
  else if (scene === 3) rotateGlyphs(local, L, out);
  else if (scene === 4) foldGlyphs(local, L, out);
  else sortGlyphs(local, L, out);
  return out;
}

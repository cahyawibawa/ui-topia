/**
 * Adapted from the tear-calendar lab on Sanyam Punia's site
 * (https://github.com/SanyamPunia/www), used with his permission.
 */
/**
 * What a page of the pad prints, pure and DOM-free. A page is one day of the
 * year the pad was made for, and everything on it is worked out from the date:
 * the weekday, the ISO week, where the day falls in the year and the moon.
 */

export interface Day {
  /** the date at local midnight */
  date: Date;
  day: number;
  weekday: string;
  month: string;
  year: number;
  week: number;
  /** 1 for January 1st */
  ofYear: number;
  daysInYear: number;
  /** Saturday and Sunday print in their own ink, the way a daily pad does */
  tone: "plain" | "saturday" | "sunday";
  moon: { age: number; lit: number; waxing: boolean; name: string };
}

const WEEKDAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const DAY_MS = 86_400_000;

/** a known new moon, 6 January 2000 at 18:14 UTC, and the mean synodic month */
const NEW_MOON = Date.UTC(2000, 0, 6, 18, 14);
const SYNODIC = 29.530588853;

export function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

export function addDays(d: Date, n: number): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
}

function isoWeek(d: Date): number {
  const t = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const wd = t.getUTCDay() || 7;
  t.setUTCDate(t.getUTCDate() + 4 - wd);
  const first = Date.UTC(t.getUTCFullYear(), 0, 1);
  return Math.ceil(((t.getTime() - first) / DAY_MS + 1) / 7);
}

function moonOf(d: Date) {
  // noon, so the page reads the moon of the day rather than of its first minute
  const noon = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 12);
  const days = (noon.getTime() - NEW_MOON) / DAY_MS;
  const age = ((days % SYNODIC) + SYNODIC) % SYNODIC;
  const lit = (1 - Math.cos((2 * Math.PI * age) / SYNODIC)) / 2;
  const waxing = age < SYNODIC / 2;
  // each named phase is an eighth of the month, centred on its own point
  const k = Math.floor(((age / SYNODIC) * 8 + 0.5) % 8);
  const name =
    [
      "New moon",
      "Waxing crescent",
      "First quarter",
      "Waxing gibbous",
      "Full moon",
      "Waning gibbous",
      "Last quarter",
      "Waning crescent",
    ][k] ?? "New moon";
  return { age, lit, waxing, name };
}

export function dayOf(d: Date): Day {
  const date = startOfDay(d);
  const year = date.getFullYear();
  const jan1 = new Date(year, 0, 1);
  const ofYear = Math.round((date.getTime() - jan1.getTime()) / DAY_MS) + 1;
  const daysInYear = Math.round(
    (new Date(year + 1, 0, 1).getTime() - jan1.getTime()) / DAY_MS,
  );
  const wd = date.getDay();
  return {
    date,
    day: date.getDate(),
    weekday: WEEKDAYS[wd] ?? "",
    month: MONTHS[date.getMonth()] ?? "",
    year,
    week: isoWeek(date),
    ofYear,
    daysInYear,
    tone: wd === 0 ? "sunday" : wd === 6 ? "saturday" : "plain",
    moon: moonOf(date),
  };
}

/** how far a page is from today, in words, for the corner of the page */
export function fromToday(d: Date, today: Date): string {
  const n = Math.round(
    (startOfDay(d).getTime() - startOfDay(today).getTime()) / DAY_MS,
  );
  if (n === 0) return "Today";
  if (n === 1) return "Tomorrow";
  if (n === -1) return "Yesterday";
  return n > 0 ? `In ${n} days` : `${-n} days ago`;
}

/**
 * The lit part of a moon of radius `r` centred at the origin: the bright limb
 * is a half circle and the terminator is half an ellipse whose width is the
 * cosine of the phase, which is how the lit fraction looks from Earth.
 */
export function moonPath(
  age: number,
  r: number,
): { d: string; full: boolean; dark: boolean } {
  const phase = (2 * Math.PI * age) / SYNODIC;
  const lit = (1 - Math.cos(phase)) / 2;
  if (lit < 0.02) return { d: "", full: false, dark: true };
  if (lit > 0.98) return { d: "", full: true, dark: false };
  const waxing = age < SYNODIC / 2;
  const rx = Math.abs(Math.cos(phase)) * r;
  // waxing lights the right limb in the northern sky, waning the left
  const limb = waxing ? 1 : 0;
  // the terminator runs back up inside the lit limb for a crescent and out past
  // the middle for a gibbous moon. Sweep 1 from the bottom passes on the left.
  const term = lit > 0.5 ? (waxing ? 1 : 0) : waxing ? 0 : 1;
  const d = `M 0 ${-r} A ${r} ${r} 0 0 ${limb} 0 ${r} A ${rx.toFixed(3)} ${r} 0 0 ${term} 0 ${-r} Z`;
  return { d, full: false, dark: false };
}

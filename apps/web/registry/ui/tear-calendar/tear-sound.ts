/**
 * Adapted from the tear-calendar lab on Sanyam Punia's site
 * (https://github.com/SanyamPunia/www), used with his permission.
 */
/**
 * What tearing a page sounds like, synthesised rather than fetched, on the shape
 * `crack-sound.ts` sets: one context, one noise buffer, nothing requested.
 *
 * The tear is not a recording. Every hole the tear passes is heard once, so the
 * sound is made of the same holes the drawing is. A slow pull pops them one at
 * a time, short and bright. A yank lets each one run longer and lower, and they
 * overlap into a rip. The page coming free is a snap, a page falling back is a
 * soft pat, and a falling page brushes the air as it rocks.
 */

let ctx: AudioContext | null = null;
let noise: AudioBuffer | null = null;
let last = 0;

const GAIN = 0.16;

function ensure(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const Ctor =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!Ctor) return null;
    ctx = new Ctor();
  }
  if (!noise) {
    const length = Math.floor(ctx.sampleRate * 0.5);
    noise = ctx.createBuffer(1, length, ctx.sampleRate);
    const data = noise.getChannelData(0);
    for (let i = 0; i < length; i++) data[i] = Math.random() * 2 - 1;
  }
  return ctx;
}

/** Sound is opt-in: nothing plays, and no audio context is made, until this is on. */
let enabled = false;

export function setTearSound(on: boolean): void {
  enabled = on;
}

/** unlock the clock on a press or a key, `poke-sound.ts`'s two-step */
export function armTear(): void {
  if (!enabled) return;
  const audio = ensure();
  if (audio && audio.state === "suspended") void audio.resume();
}

function running(): AudioContext | null {
  if (!enabled) return null;
  const audio = ensure();
  return audio && audio.state === "running" ? audio : null;
}

function burst(
  audio: AudioContext,
  hz: number,
  q: number,
  gain: number,
  life: number,
  type: BiquadFilterType = "bandpass",
  attack = 0.001,
) {
  if (!noise) return;
  const at = audio.currentTime;
  const source = audio.createBufferSource();
  source.buffer = noise;
  // a random place in the buffer, so no two grains are the same
  const offset = Math.max(0, Math.random() * (noise.duration - life - 0.02));
  const filter = audio.createBiquadFilter();
  filter.type = type;
  filter.frequency.value = hz;
  filter.Q.value = q;
  const level = audio.createGain();
  level.gain.setValueAtTime(0, at);
  level.gain.linearRampToValueAtTime(gain, at + attack);
  level.gain.exponentialRampToValueAtTime(0.0001, at + life);
  source.connect(filter).connect(level).connect(audio.destination);
  source.start(at, offset);
  source.stop(at + life + 0.01);
}

/** one hole torn, `jag` from 0 for a clean pop to 1 for a rip */
export function pop(jag: number): void {
  const audio = running();
  if (!audio) return;
  const at = audio.currentTime;
  // a rip is many grains at once, so it is allowed closer together
  if (at - last < 0.004 + (1 - jag) * 0.006) return;
  last = at;
  const hz = 4200 - jag * 2600 + Math.random() * 600;
  const life = 0.009 + jag * 0.034;
  burst(audio, hz, 2.6 - jag * 1.9, GAIN * (0.55 + jag * 0.5), life);
}

/** the last of the paper letting go */
export function snap(): void {
  const audio = running();
  if (!audio) return;
  last = audio.currentTime;
  burst(audio, 3400, 1.2, GAIN * 1.1, 0.035);
  burst(audio, 900, 0.7, GAIN * 0.7, 0.07, "lowpass");
}

/** a part-torn page falling back against the pad */
export function pat(): void {
  const audio = running();
  if (!audio) return;
  burst(audio, 700, 0.8, GAIN * 0.55, 0.06, "lowpass");
}

/** a falling page turning over in the air, `level` from 0 to 1 */
export function swish(level: number): void {
  const audio = running();
  if (!audio) return;
  burst(audio, 1500, 0.6, GAIN * 0.32 * level, 0.16, "bandpass", 0.05);
}

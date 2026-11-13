"use client";

import {
  type PlayOptions,
  play,
  type SoundName,
  setEnabled,
  setTheme,
  unlock,
} from "cuelume";

// Cuelume synthesises every cue with Web Audio, so there are no audio files.
// "bubble" is its playful material; swap for "default" for something quieter.
const THEME = "bubble";
const MUTE_KEY = "uitopia-muted";

export type { SoundName };

// Sounds are opt-in: muted until the visitor turns them on. Cuelume never
// touches storage, so the preference lives here.
export function isMuted() {
  if (typeof window === "undefined") return true;
  try {
    return window.localStorage.getItem(MUTE_KEY) !== "false";
  } catch {
    return true;
  }
}

export function setMuted(muted: boolean) {
  try {
    window.localStorage.setItem(MUTE_KEY, String(muted));
  } catch {
    // Storage blocked - the choice just won't persist.
  }
  setEnabled(!muted);
  // Turning sound on is the gesture browsers need to start audio.
  if (!muted) void unlock();
}

if (typeof window !== "undefined") {
  setTheme(THEME);
  setEnabled(!isMuted());
}

export function playSound(name: SoundName, opts?: PlayOptions) {
  if (isMuted()) return;
  try {
    play(name, opts);
  } catch {
    // Audio not available - stay silent.
  }
}

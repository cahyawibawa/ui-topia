import { readdirSync } from "node:fs";
import { join } from "node:path";

/**
 * Slugs that have a preview clip, read off `public/previews` rather than
 * declared in frontmatter, so a missing recording can never leave a card
 * playing nothing. A doc with no clip just shows the placeholder.
 */
const DIR = join(process.cwd(), "public/previews");

export function previewSlugs(): Set<string> {
  try {
    return new Set(
      readdirSync(DIR)
        .filter((file) => file.endsWith(".mp4"))
        .map((file) => file.slice(0, -4)),
    );
  } catch {
    return new Set();
  }
}

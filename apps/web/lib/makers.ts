/**
 * The people whose work is in the collection, so a page can say whose it is by
 * pointing at a key (`maker: sanyam` in its frontmatter). Avatars come from
 * GitHub, and the link goes to their X profile.
 */
export type Maker = {
  name: string;
  /** X handle, without the @ */
  x: string;
  /** GitHub username, for the avatar */
  github: string;
};

export const MAKERS = {
  arlan: { github: "arla6ka", name: "Arlan Marat", x: "arlanmarat" },
  cahya: { github: "cahyawibawa", name: "cahya", x: "kyuotaka" },
  sanyam: { github: "SanyamPunia", name: "Sanyam Punia", x: "sanyampunia" },
} as const satisfies Record<string, Maker>;

export type MakerKey = keyof typeof MAKERS;

export function getMaker(key?: string): Maker | undefined {
  return key && key in MAKERS ? MAKERS[key as MakerKey] : undefined;
}

export const avatarOf = (maker: Maker) =>
  `https://github.com/${maker.github}.png?size=80`;

export const profileOf = (maker: Maker) => `https://x.com/${maker.x}`;

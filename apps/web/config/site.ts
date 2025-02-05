export const siteConfig = {
  name: "ui/topia",
  creator: "@kyuotaka",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "https://uitopia.vercel.app",
  ogImage: `${process.env.NEXT_PUBLIC_APP_URL}/opengraph-image.png`,
  description:
    "ui/topia is, a growing collection of experimental components built with shadcn/ui, Motion and Tailwind CSS.",
  keywords: [
    "Next.js",
    "React",
    "Tailwind CSS",
    "UI Library",
    "UI Kit",
    "UI Components",
    "UI Elements",
    "Open Source",
    "shadcn/ui",
  ],
  links: {
    portfolio: "https://cahyawibawa.com/",
    github: "https://git.new/ui/topia",
  },
};

export type SiteConfig = typeof siteConfig;

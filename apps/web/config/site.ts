export const siteConfig = {
  creator: "@kyuotaka",
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
    github: "https://git.new/ui/topia",
    portfolio: "https://cahyawibawa.com/",
  },
  name: "ui/topia",
  ogImage: `${process.env.NEXT_PUBLIC_APP_URL}/opengraph-image.png`,
  url: process.env.NEXT_PUBLIC_APP_URL ?? "https://uitopia.vercel.app",
};

export type SiteConfig = typeof siteConfig;

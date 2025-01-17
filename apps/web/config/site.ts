export const siteConfig = {
  name: "ui/topia",
  creator: "@kyuotaka",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "https://uitopia.vercel.app",
  ogImage: "https://uitopia.vercel.app/opengraph-image.png",
  description:
    "ui/topia is, a collection of fine UI components built with Motion and Tailwind CSS.",
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

export const siteConfig = {
  name: "ui/topia",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://uitopia.vercel.app",
  ogImage: "https://uitopia.vercel.app/opengraph-image.png",
  description:
    "An open source project that helps you build beautiful websites with simply copy and paste. Crafted with Tailwind CSS.",
  blockInfos:
    "Discover trending UI components ready for instant use. Browse, copy, paste, and elevate your project with customizable, accessible designs.",
  links: {
    portfolio: "https://cahyawibawa.dev/",
    github: "https://git.new/ui/topia",
  },
};

export type SiteConfig = typeof siteConfig;

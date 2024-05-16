export const siteConfig = {
  name: 'ui/topia',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://uitopia.vercel.app',
  ogImage: 'https://uitopia.xyz/opengraph-image.png',
  description:
    'An open source project that helps you build beautiful websites with simply copy and paste. Crafted with Tailwind CSS.',
  blockInfos: 'Ready-to-use, simply copy and paste into your next project. All snippets crafted with Tailwind CSS for easy integration.',
  links: {
    portfolio: 'https://cahyawibawa.dev/',
    github: 'https://git.new/ui/topia',
  },
};

export type SiteConfig = typeof siteConfig;

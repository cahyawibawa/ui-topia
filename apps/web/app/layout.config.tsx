import type { LinkItemType } from "fumadocs-ui/layouts/docs";
import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { siteConfig } from "@/config/site";
import { Icons } from "@/registry/components/icons";

export const linkItems: LinkItemType[] = [
  {
    icon: <Icons.album />,
    text: "Docs",
    url: "/docs",
  },
  {
    icon: <Icons.blocks />,
    text: "Blocks",
    url: "/blocks",
  },
];

export const baseOptions: BaseLayoutProps = {
  // githubUrl: siteConfig.links.github,
  // links: [...linkItems],
  nav: {
    title: (
      <div className="relative flex items-center space-x-2">
        <Icons.logo />
        <div className="font-semibold text-sm sm:inline-block">
          {siteConfig.name}
        </div>
        <span className="ml-0.5 select-none rounded-full bg-secondary px-1.5 py-px font-medium text-[10px] text-foreground">
          beta
        </span>
      </div>
    ),
    transparentMode: "top",
  },
};

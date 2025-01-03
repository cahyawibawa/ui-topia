import { siteConfig } from "@/config/site";
import Preview from "@/public/banner.png";
import { Icons } from "@ui/topia/icons";
import type { LinkItemType } from "fumadocs-ui/layouts/docs";
import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import Image from "next/image";

export const linkItems: LinkItemType[] = [
  {
    icon: <Icons.news />,
    text: "Blog",
    url: "/blog",
    active: "nested-url",
  },
  {
    type: "icon",
    url: siteConfig.links.github,
    text: "GitHub",
    icon: (
      <svg role="img" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
    external: true,
  },
];

export const baseOptions: BaseLayoutProps = {
  nav: {
    transparentMode: "top",
    title: (
      <div className="relative flex items-center space-x-2">
        <Icons.logo />
        <div className="font-semibold text-sm sm:inline-block">ui/topia</div>
        <span className="ml-0.5 select-none rounded-full bg-neutral-200 px-1.5 py-px font-medium text-[10px] text-primary dark:bg-slated dark:text-white">
          beta
        </span>
      </div>
    ),
  },
  links: [
    {
      type: "menu",
      text: "Docs",
      url: "/docs",
      items: [
        {
          menu: {
            banner: (
              <div className="-mx-3 -mt-3">
                <Image
                  src={Preview}
                  alt="Perview"
                  className="rounded-t-lg object-cover"
                  style={{
                    maskImage:
                      "linear-gradient(to bottom,white 60%,transparent)",
                  }}
                  priority
                />
              </div>
            ),
            className: "md:row-span-2",
          },
          icon: <Icons.book />,
          text: "Getting Started",
          description: "Learn how to get started with ui/topia.",
          url: "/docs",
        },
        // {
        //   icon: <Icons.component />,
        //   text: "Components",
        //   description: "Explore all the components on ui/topia.",
        //   url: "/docs/components/accordion",
        //   menu: {
        //     className: "lg:col-start-2",
        //   },
        // },
      ],
    },
    ...linkItems,
  ],
};

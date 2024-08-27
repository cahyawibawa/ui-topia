import { Icons } from "@/components/icons";
import { utils } from "@/lib/source";
import type { HomeLayoutProps } from "fumadocs-ui/home-layout";
import type { DocsLayoutProps } from "fumadocs-ui/layout";

export const baseOptions: HomeLayoutProps = {
  githubUrl: "https://github.com/cahyawibawa/ui-topia",
  nav: {
    transparentMode: "top",
    title: (
      <>
        <Icons.logo />
        <div className="font-semibold sm:inline-block">ui/topia</div>
        <span className="text-primary dark:bg-slated dark:text-white0 mb-3 ml-0.5 select-none rounded-full bg-neutral-200 px-2 py-0.5 text-xs">
          beta
        </span>
      </>
    ),
  },
  links: [
    {
      url: "/docs",
      icon: <Icons.bookOpen className="size-5" />,
      text: "Docs",
    },
  ],
};

export const docsOptions: DocsLayoutProps = {
  ...baseOptions,
  tree: utils.pageTree,
  nav: {
    ...baseOptions.nav,
    transparentMode: "none",
    children: undefined,
  },
};

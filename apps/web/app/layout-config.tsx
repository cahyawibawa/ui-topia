import { Icons } from "@ui/topia/icons";
import type { DocsLayoutProps } from "fumadocs-ui/layouts/docs";
import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { source } from "./source";

export const baseOptions: BaseLayoutProps = {
  githubUrl: "https://github.com/cahyawibawa/ui-topia",
  nav: {
    transparentMode: "top",
    title: (
      <>
        <Icons.logo />
        <div className="font-semibold sm:inline-block">ui/topia</div>
        <span className="mb-3 ml-0.5 select-none rounded-full bg-neutral-200 px-2 py-0.5 text-primary text-xs dark:bg-slated dark:text-white0">
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
  tree: source.pageTree,
  nav: {
    ...baseOptions.nav,
    transparentMode: "none",
    children: undefined,
  },
};

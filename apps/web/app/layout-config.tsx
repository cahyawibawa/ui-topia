import { Icons } from "@/components/icons";
import { utils } from "@/lib/radix";
import type { DocsLayoutProps } from "fumadocs-ui/layout";

export const layoutOptions: Omit<DocsLayoutProps, "children"> = {
  tree: utils.pageTree,
  nav: {
    title: (
      <>
        <Icons.logo className="size-5" />
        <span className="font-bold sm:inline-block">ui/topia</span>
      </>
    ),
  },
  links: [
    {
      url: "/docs",
      icon: <Icons.bookOpen className="size-5" />,
      text: "Docs",
    },
    {
      type: "secondary",
      url: "https://github.com/cahyawibawa/ui-topia",
      text: "GitHub",
      icon: <Icons.gitHub className="size-5" />,
      external: true,
    },
  ],
};
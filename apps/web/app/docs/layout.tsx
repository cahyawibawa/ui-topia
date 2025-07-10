import { GithubInfo } from "fumadocs-ui/components/github-info";
import { DocsLayout, type DocsLayoutProps } from "fumadocs-ui/layouts/notebook";
import type { ReactNode } from "react";
import { baseOptions } from "@/app/layout.config";
import { source } from "@/lib/source";

const docsOptions: DocsLayoutProps = {
  ...baseOptions,
  // links: [
  //   {
  //     children: <GithubInfo owner="cahyawibawa" repo="ui-topia" />,
  //     type: "custom",
  //   },
  // ],
  tree: source.pageTree,
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tabMode="navbar"
      nav={{ ...baseOptions.nav, mode: "top" }}
      sidebar={{
        hidden: false,
        collapsible: false,
        tabs: {
          transform(option, node) {
            const meta = source.getNodeMeta(node);
            if (!meta) return option;

            const color = `var(--${meta.path.split("/")[0]}-color, var(--color-fd-foreground))`;

            return {
              ...option,
              icon: (
                <div
                  className="size-full rounded-lg max-md:border max-md:bg-(--tab-color)/10 max-md:p-1.5 [&_svg]:size-full"
                  style={
                    {
                      "--tab-color": color,
                      color,
                    } as object
                  }
                >
                  {node.icon}
                </div>
              ),
            };
          },
        },
      }}
      {...docsOptions}
    >
      {children}
    </DocsLayout>
  );
}

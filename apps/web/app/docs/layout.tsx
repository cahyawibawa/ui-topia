import { DocsLayout, type DocsLayoutProps } from "fumadocs-ui/layouts/notebook";
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

export default function Layout({ children }: LayoutProps<"/docs">) {
  return (
    <DocsLayout
      themeSwitch={{ enabled: false }}
      tabMode="navbar"
      nav={{ ...baseOptions.nav, mode: "top" }}
      sidebar={{
        hidden: false,
        collapsible: false,
        tabs: {
          transform(option, node) {
            const meta = source.getNodeMeta(node);
            if (!meta || !node.icon) return option;

            const color = `var(--${meta.path.split("/")[0]}-color, var(--color-fd-foreground))`;

            return {
              ...option,
              icon: (
                <div
                  className="size-full rounded-lg text-(--tab-color) max-md:border max-md:bg-(--tab-color)/10 max-md:p-1.5 [&_svg]:size-full"
                  style={
                    {
                      "--tab-color": color,
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

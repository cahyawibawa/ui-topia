import { readFile } from "node:fs/promises";
import path from "node:path";
import { CodeCollapsibleWrapper } from "@/components/code-collapsible-wrapper";
import {
  ComponentSourceFiles,
  type SourceFile,
} from "@/components/component-source-files";
import { highlightCode } from "@/lib/highlight-code";
import { convertRegistryPaths, getComponentsByName } from "@/lib/registry";
import type { ComponentSourceProps } from "@/types/component";

type RegistryFile = { path: string; target?: string };

// Highlighting happens here, on the server, so switching to the Manual tab only
// swaps finished HTML: no fetch of /r/<name>.json and no Shiki in the browser.
// Every file of the item gets its own tab (the old version showed only the first
// and listed the rest in prose).
export async function ComponentSource({
  name,
  title,
  collapsible = true,
  className,
  // Props the old client version forwarded; the collapsible doesn't use them.
  expandButtonTitle: _expandButtonTitle,
  defaultExpanded: _defaultExpanded,
  maxHeight: _maxHeight,
  ...props
}: ComponentSourceProps & {
  title?: string;
  collapsible?: boolean;
}) {
  const item = getComponentsByName(name);
  const registryFiles = (item?.files ?? []) as RegistryFile[];

  if (registryFiles.length === 0) {
    return (
      <div className="p-4 text-destructive text-sm">
        Failed to load component code
      </div>
    );
  }

  const files: SourceFile[] = await Promise.all(
    registryFiles.map(async (file, index) => {
      const raw = convertRegistryPaths(
        await readFile(path.join(process.cwd(), file.path), "utf8"),
      );
      const language = path.extname(file.path).slice(1) || "tsx";
      const target = file.target ?? file.path;
      return {
        name: path.basename(target),
        // The MDX-provided title describes the main file only.
        title: index === 0 && title ? title : target,
        language,
        raw,
        html: await highlightCode(raw, language, { showLineNumbers: true }),
      };
    }),
  );

  const block = <ComponentSourceFiles files={files} />;

  if (collapsible === false) {
    return <div className={className}>{block}</div>;
  }

  return (
    <CodeCollapsibleWrapper className={className} {...props}>
      {block}
    </CodeCollapsibleWrapper>
  );
}

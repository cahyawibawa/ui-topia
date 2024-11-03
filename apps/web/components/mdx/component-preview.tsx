"use client";

import { CodeBlock, Pre } from "@/components/mdx/code-block";
import ComponentWrapper from "@/components/mdx/component-wrapper";
import { codeToHtml } from "@/lib/shiki";
import { cn } from "@/lib/utils";
import { registry } from "@ui/topia";
import { Button } from "@ui/topia/button";
import { Icons } from "@ui/topia/icons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@ui/topia/tabs";
import * as React from "react";

interface ComponentPreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  code: string;
  lang?: string;
  icon?: React.ReactNode;
  align?: "center" | "start" | "end";
}

export function ComponentPreview({
  name,
  children,
  className,
  icon,
  align = "center",
  code,
  lang = "tsx",
  ...props
}: ComponentPreviewProps) {
  const [key, setKey] = React.useState(0);
  const [highlightedCode, setHighlightedCode] = React.useState<string>("");

  React.useEffect(() => {
    const highlightCode = async () => {
      const html = await codeToHtml({ code, lang });
      setHighlightedCode(html);
    };

    highlightCode();
  }, [code, lang]);

  const Preview = React.useMemo(() => {
    const Component = registry[name]?.component;

    if (!Component) {
      console.error(`Component with name "${name}" not found in registry.`);
      return (
        <p className="text-muted-foreground text-sm">
          Component{" "}
          <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
            {name}
          </code>{" "}
          not found in registry.
        </p>
      );
    }

    return <Component />;
  }, [name]);

  return (
    <div
      className={cn(
        "relative my-4 flex flex-col space-y-2 lg:max-w-[120ch]",
        className
      )}
      {...props}
    >
      <Tabs defaultValue="preview" className="relative mr-auto w-full">
        <div className="flex items-center justify-between pb-3">
          <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
            <TabsTrigger
              value="preview"
              className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-3 pt-2 pb-3 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
            >
              Preview
            </TabsTrigger>
            <TabsTrigger
              value="code"
              className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-3 pt-2 pb-3 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
            >
              Code
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="preview" className="relative rounded-md" key={key}>
          <ComponentWrapper>
            <Button
              onClick={() => setKey((prev) => prev + 1)}
              className="absolute top-0 right-0 z-10 ml-4 flex items-center rounded-lg px-3 py-1"
              variant="ghost"
              size="sm"
            >
              <Icons.refresh size={16} />
            </Button>
            <React.Suspense
              fallback={
                <div className="flex items-center text-muted-foreground text-sm">
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  Loading...
                </div>
              }
            >
              {Preview}
            </React.Suspense>
          </ComponentWrapper>
        </TabsContent>
        <TabsContent value="code">
          <div className="flex flex-col space-y-4">
            <CodeBlock>
              <Pre
                className={cn(
                  "w-full rounded-md [&_pre]:my-0 [&_pre]:max-h-[350px] [&_pre]:overflow-auto"
                )}
                // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
                dangerouslySetInnerHTML={{ __html: highlightedCode }}
              />
            </CodeBlock>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

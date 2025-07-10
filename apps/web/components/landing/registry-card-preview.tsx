import { motion } from "motion/react";
import { useEffect, useState } from "react";
import type { RegistryItem } from "shadcn/registry";
import { CodeBlock } from "@/components/code-block";
import { ComponentLoader } from "@/components/content/component-loader";
import { CodeViewer } from "@/components/showcase-code-viewer";

interface RegistryCardPreviewProps {
  item: RegistryItem & { width?: number; height?: number };
}

export function RegistryCardPreview({ item }: RegistryCardPreviewProps) {
  const [code, setCode] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadComponentCode() {
      try {
        const response = await fetch(`/r/${item.name}.json`);
        const data = await response.json();
        const codeContent = data.files?.[0]?.content;

        if (!codeContent) {
          throw new Error("No code content found");
        }

        setCode(codeContent);
        setError(null);
      } catch (err) {
        console.error("Error loading component:", err);
        setCode(null);
        setError("Failed to load component code");
      }
    }

    loadComponentCode();
  }, [item.name]);

  return (
    <motion.div
      className="card-container group overflow-hidden"
      style={{
        width: item.width ? `${item.width}px` : undefined,
        height: item.height ? `${item.height}px` : undefined,
      }}
    >
      <div className="card-header mb-2 flex items-center justify-between">
        <span className="card-name">{item.title || item.name}</span>
        <div>
          <motion.div
            initial={false}
            animate={false}
            className="pointer-events-none opacity-0 transition-opacity group-hover:pointer-events-auto group-hover:opacity-100"
          >
            <CodeViewer component={item}>
              {error ? (
                <div className="p-4 text-destructive text-sm">{error}</div>
              ) : code ? (
                <CodeBlock code={code} language="tsx" />
              ) : (
                <div className="p-4 text-muted-foreground text-sm">
                  Loading code...
                </div>
              )}
            </CodeViewer>
          </motion.div>
        </div>
      </div>
      <div className="flex h-full w-full items-center justify-center">
        <div className="h-full max-h-full w-full max-w-full">
          <ComponentLoader
            name={item.name}
            showV0Button={false}
            classNameComponentContainer="size-full"
          />
        </div>
      </div>
    </motion.div>
  );
}

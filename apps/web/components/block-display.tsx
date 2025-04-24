import { BlockViewer } from "@/components/block-viewer";
import { getComponentsByName } from "@/lib/registry";
import * as React from "react";

const LoadingFallback = () => (
  <div className="flex min-h-[350px] w-full items-center justify-center rounded-xl border bg-background">
    <div className="flex items-center justify-center text-muted-foreground text-sm">
      Loading component...
    </div>
  </div>
);

export async function BlockDisplay({ name }: { name: string }) {
  const item = await getCachedComponentItem(name);

  if (!item) {
    return (
      <div className="flex min-h-[350px] w-full items-center justify-center rounded-xl border bg-background">
        <div className="flex items-center justify-center text-muted-foreground text-sm">
          No component found with name: {name}
        </div>
      </div>
    );
  }

  // Use the meta data from the registry for height
  const meta = { iframeHeight: item.meta?.iframeHeight || "350px" };

  return (
    <div className="relative">
      <React.Suspense fallback={<LoadingFallback />}>
        <BlockViewer item={item} name={name} meta={meta} />
      </React.Suspense>
    </div>
  );
}

const getCachedComponentItem = React.cache(async (name: string) => {
  return getComponentsByName(name);
});

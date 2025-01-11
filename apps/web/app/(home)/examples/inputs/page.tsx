import ComponentList from "@/components/component-list";
import { createMetadata } from "@/lib/metadata";
import { registry } from "@ui/topia/registry";
import type { Metadata } from "next";

export const metadata: Metadata = createMetadata({
  title: "InPUTS - ui/topia",
});

export default function InputsPage() {
  const inputComponents = Object.entries(registry)
    .filter(([key]) => key.startsWith("input-"))
    .map(([key]) => key);

  if (inputComponents.length === 0) {
    return <div>No input components found</div>;
  }

  return (
    <section className="mx-auto">
      <div className="grid gap-6 pb-6 md:grid-cols-2 lg:grid-cols-3">
        {inputComponents.map((componentName) => (
          <ComponentList
            key={componentName}
            componentName={componentName}
            className="flex items-center justify-center rounded-md border px-0 py-24 md:px-2"
          />
        ))}
      </div>
    </section>
  );
}

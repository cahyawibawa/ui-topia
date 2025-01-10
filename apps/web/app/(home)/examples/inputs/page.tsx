import ComponentList from "@/components/component-list";
import { createMetadata } from "@/lib/metadata";
import { getComponentsByCategory } from "@ui/topia/registry";
import type { Metadata } from "next";

export const metadata: Metadata = createMetadata({
  title: "Inputs - ui/topia",
});

export default function InputsPage() {
  const inputComponents = getComponentsByCategory("inputs");

  if (inputComponents.length === 0) {
    return <div>No input components found</div>;
  }

  return (
    <section className="mx-auto">
      <div className="grid gap-6 pb-6 md:grid-cols-2 lg:grid-cols-3">
        {inputComponents.map((component) => (
          <ComponentList
            key={component.name}
            componentName={component.name}
            className="flex items-center justify-center rounded-md border px-0 py-24 md:px-2"
          />
        ))}
      </div>
    </section>
  );
}

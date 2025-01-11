import ComponentList from "@/components/component-list";
import { createMetadata } from "@/lib/metadata";
import { registry } from "@ui/topia/registry";
import type { Metadata } from "next";

export const metadata: Metadata = createMetadata({
  title: "Buttons - ui/topia",
});

export default function ButtonsPage() {
  const buttonComponents = Object.entries(registry)
    .filter(([key]) => key.startsWith("button-"))
    .map(([key]) => key);

  if (buttonComponents.length === 0) {
    return <div>No button components found</div>;
  }

  return (
    <section className="mx-auto">
      <div className="grid gap-6 pb-6 md:grid-cols-2 lg:grid-cols-4">
        {buttonComponents.map((componentName) => (
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

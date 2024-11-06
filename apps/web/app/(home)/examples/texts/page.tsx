import { TextWrapper } from "@/components/text-variants-wrapper";
import { registry } from "@ui/topia";
import { Skeleton } from "@ui/topia/skeleton";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Text Variants",
  description: "Check out some text variants.",
};

const TextVariantsComponent = registry.textVariants?.component;

export default function TextVariantsPage() {
  if (!TextVariantsComponent) {
    return <div>Text variants component not found</div>;
  }

  return (
    <section className="mx-auto">
      <div className="grid gap-6 p-10 pb-6 md:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<Skeleton className="h-20 w-full" />}>
          <TextVariantsComponent wrapper={TextWrapper} text="Animated Text" />
        </Suspense>
      </div>
    </section>
  );
}

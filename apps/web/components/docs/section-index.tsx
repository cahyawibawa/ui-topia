import Link from "next/link";
import { SectionIcon } from "@/components/docs/section-icon";
import { getSections } from "@/lib/docs";

/** Craft-style index: each section as an icon heading over a card grid. */
export function SectionIndex({
  group,
  current,
}: {
  group: string;
  current: string;
}) {
  const sections = getSections(group)
    .map((section) => ({
      ...section,
      docs: section.docs.filter((doc) => doc.url !== current),
    }))
    .filter((section) => section.docs.length > 0);

  return (
    <div className="mt-12 flex flex-col gap-10">
      {sections.map((section) => (
        <section key={section.title}>
          <h2 className="mb-4 flex items-center gap-2 font-medium text-base">
            <SectionIcon name={section.icon} />
            {section.title}
          </h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {section.docs.map((doc) => (
              <li key={doc.url}>
                <Link
                  className="flex h-full flex-col gap-1 rounded-xl p-4 shadow-[0_0_0_1px_color-mix(in_oklab,var(--foreground)_8%,transparent)] transition-colors hover:bg-accent/50"
                  href={doc.url}
                >
                  <span className="flex items-center justify-between gap-2 font-medium text-sm">
                    {doc.title}
                    {doc.status === "soon" && (
                      <span className="rounded-full border border-dashed px-1.5 py-px font-normal text-[10px] text-muted-foreground">
                        Soon
                      </span>
                    )}
                  </span>
                  {doc.description && (
                    <span className="line-clamp-2 text-muted-foreground text-xs leading-relaxed">
                      {doc.description}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

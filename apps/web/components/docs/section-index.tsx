import { SectionIcon } from "@/components/docs/section-icon";
import { VaultCard } from "@/components/docs/vault-card";
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
                <VaultCard
                  description={doc.description}
                  href={doc.url}
                  slug={doc.slug.at(-1) ?? ""}
                  soon={doc.status === "soon"}
                  title={doc.title}
                />
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

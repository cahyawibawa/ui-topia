import { SectionIcon } from "@/components/docs/section-icon";
import { VideoCard } from "@/components/docs/video-card";
import { getSections } from "@/lib/docs";
import { previewSlugs } from "@/lib/previews";

const formatDate = (value?: string) =>
  value
    ? new Date(value).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        timeZone: "UTC",
        year: "numeric",
      })
    : undefined;

/** Showcase grid for the Motion group: by section, newest first, undated last. */
export function MotionIndex() {
  const clips = previewSlugs();
  const sections = getSections("motion")
    .map((section) => ({
      ...section,
      docs: section.docs
        .filter((doc) => doc.slug.length > 1)
        .sort(
          (a, b) =>
            (b.publishedAt ?? "").localeCompare(a.publishedAt ?? "") ||
            a.order - b.order ||
            a.title.localeCompare(b.title),
        ),
    }))
    .filter((section) => section.docs.length > 0);

  return (
    <div className="mt-10 flex flex-col gap-12">
      {sections.map((section) => (
        <section key={section.title}>
          <h2 className="mb-5 flex items-center gap-2 font-medium text-base">
            <SectionIcon name={section.icon} />
            {section.title}
          </h2>
          <div className="grid gap-x-6 gap-y-9 sm:grid-cols-2">
            {section.docs.map((doc) => {
              const slug = doc.slug.at(-1) ?? "";
              return (
                <VideoCard
                  date={formatDate(doc.publishedAt)}
                  href={doc.url}
                  key={doc.url}
                  maker={doc.maker}
                  slug={clips.has(slug) ? slug : undefined}
                  title={doc.title}
                />
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}

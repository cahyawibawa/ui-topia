import { allDocs } from "content-collections";

export type Doc = (typeof allDocs)[number];

export type DocGroup = {
  id: string;
  title: string;
  description: string;
  /** CSS color used for the group's tab accent. */
  color: string;
};

/** Top-level folders of `content/docs`, in tab order. */
const GROUPS: DocGroup[] = [
  {
    id: "ui",
    title: "Base",
    description: "A collection of Base UI components.",
    color: "var(--foreground)",
  },
  {
    id: "motion",
    title: "Motion",
    description: "A collection of Motion animations.",
    color: "var(--foreground)",
  },
  {
    id: "notes",
    title: "Notes",
    description: "Learning in public: notes on building components.",
    color: "var(--foreground)",
  },
];

function rank(doc: Doc) {
  const leaf = doc.slug.at(-1);
  if (doc.slug.length === 1) return 0; // group index
  return leaf === "installation" ? 1 : 2;
}

function compare(a: Doc, b: Doc) {
  return (
    rank(a) - rank(b) || a.order - b.order || a.title.localeCompare(b.title)
  );
}

function sectionOf(doc: Doc) {
  if (doc.slug.includes("components")) return "Components";
  return doc.group === "notes" ? "Notes" : "Getting Started";
}

export function getDoc(slug: string[]) {
  const url = ["/docs", ...slug].join("/");
  return allDocs.find((doc) => doc.status !== "draft" && doc.url === url);
}

export function getGroups() {
  return GROUPS.filter((group) => allDocs.some((d) => d.group === group.id));
}

export function getGroup(id: string) {
  return GROUPS.find((group) => group.id === id);
}

export type DocSection = { title: string; icon: string; docs: Doc[] };

export function getSections(groupId: string): DocSection[] {
  const sections = new Map<string, Doc[]>();

  for (const doc of allDocs.filter((d) => d.group === groupId).sort(compare)) {
    const title = sectionOf(doc);
    sections.set(title, [...(sections.get(title) ?? []), doc]);
  }

  return [...sections].map(([title, docs]) => ({
    title,
    icon: title.toLowerCase().replace(/\s+/g, "-"),
    docs,
  }));
}

/** Reading order within a group, used for prev/next. */
export function getNeighbours(doc: Doc) {
  const ordered = getSections(doc.group).flatMap((s) => s.docs);
  const index = ordered.findIndex((d) => d.url === doc.url);
  return {
    previous: index > 0 ? ordered[index - 1] : undefined,
    next: index < ordered.length - 1 ? ordered[index + 1] : undefined,
  };
}

export function getSearchIndex() {
  return allDocs
    .filter((doc) => doc.status !== "draft")
    .map((doc) => ({
      title: doc.title,
      description: doc.description ?? "",
      url: doc.url,
      group: getGroup(doc.group)?.title ?? doc.group,
    }));
}

export type SearchItem = ReturnType<typeof getSearchIndex>[number];

export { allDocs };

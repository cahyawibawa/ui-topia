import Link from "next/link";
import { MobileNav } from "@/components/docs/mobile-nav";
import { GroupTabs, type NavGroup, SidebarNav } from "@/components/docs/nav";
import { DocsSearch } from "@/components/docs/search";
import { ThemeToggle } from "@/components/theme-toggle";
import { siteConfig } from "@/config/site";
import { getGroups, getSearchIndex, getSections } from "@/lib/docs";
import { Icons } from "@/registry/components/icons";

export default function Layout({ children }: { children: React.ReactNode }) {
  const groups: NavGroup[] = getGroups().map((group) => ({
    id: group.id,
    title: group.title,
    href: `/docs/${group.id}`,
    sections: getSections(group.id).map((section) => ({
      title: section.title,
      icon: section.icon,
      items: section.docs.map((doc) => ({ title: doc.title, url: doc.url })),
    })),
  }));

  return (
    <div className="container-wrapper">
      <header className="sticky top-0 z-40 flex h-14 items-center gap-4 bg-background/80 px-4 backdrop-blur md:px-6">
        <MobileNav groups={groups} />
        <Link className="flex items-center gap-2" href="/">
          <Icons.logo />
          <span className="font-semibold text-sm">{siteConfig.name}</span>
          <span className="select-none rounded-full bg-secondary px-1.5 py-px font-medium text-[10px]">
            beta
          </span>
        </Link>
        <div className="ml-auto flex items-center gap-3">
          <DocsSearch items={getSearchIndex()} />
          <ThemeToggle className="hidden sm:inline-flex" />
        </div>
      </header>
      {/* From xl the content is the centre column and the sidebar/TOC sit in
          the equal 1fr gutters, so the article is centred in the viewport. */}
      <div className="grid px-4 md:grid-cols-[14rem_minmax(0,1fr)] md:px-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,42rem)_minmax(0,1fr)]">
        <aside className="sticky top-14 hidden h-[calc(100svh-3.5rem)] w-56 overflow-y-auto pb-10 md:col-start-1 md:row-start-1 md:block">
          <div className="mb-6">
            <GroupTabs groups={groups} />
          </div>
          <SidebarNav groups={groups} />
        </aside>
        {children}
      </div>
    </div>
  );
}

import Link from "next/link";
import {
  GithubButton,
  SoundToggle,
  ThemeCycleButton,
} from "@/components/docs/header-actions";
import { MobileNav } from "@/components/docs/mobile-nav";
import { GroupTabs, type NavGroup, SidebarNav } from "@/components/docs/nav";
import { DocsSearch } from "@/components/docs/search";
import { siteConfig } from "@/config/site";
import { getGroups, getSearchIndex, getSections, isNew } from "@/lib/docs";
import { Icons } from "@/registry/components/icons";

export default function Layout({ children }: { children: React.ReactNode }) {
  const groups: NavGroup[] = getGroups().map((group) => ({
    id: group.id,
    title: group.title,
    href: `/docs/${group.id}`,
    sections: getSections(group.id).map((section) => ({
      title: section.title,
      icon: section.icon,
      items: section.docs.map((doc) => ({
        title: doc.title,
        url: doc.url,
        soon: doc.status === "soon",
        isNew: isNew(doc),
      })),
    })),
  }));

  return (
    <div className="container-wrapper">
      <header className="sticky top-0 z-40 grid h-14 grid-cols-[1fr_auto_1fr] items-center gap-4 px-4 md:bg-background/80 md:px-6 md:backdrop-blur">
        {/* Mobile only: progressive blur, strongest at the top and fading out
            below the header instead of a hard edge. */}
        <div
          aria-hidden="true"
          className="-z-10 pointer-events-none absolute inset-x-0 top-0 h-[calc(100%+2rem)] md:hidden"
        >
          {[1, 2, 4, 8].map((blur, i) => (
            <div
              className="header-blur-layer"
              key={blur}
              style={
                {
                  "--blur": `${blur}px`,
                  "--start": `${i * 20}%`,
                  "--end": `${i * 20 + 30}%`,
                } as React.CSSProperties
              }
            />
          ))}
          <div className="header-tint" />
        </div>
        <div className="flex items-center gap-4">
          <MobileNav groups={groups} />
          <Link className="flex items-center gap-2" href="/">
            <Icons.logo />
            <span className="font-semibold text-sm">{siteConfig.name}</span>
            <span className="select-none rounded-full bg-secondary px-1.5 py-px font-medium text-[10px]">
              beta
            </span>
          </Link>
        </div>
        <div className="col-start-2">
          <DocsSearch items={getSearchIndex()} />
        </div>
        <div className="col-start-3 flex items-center justify-end gap-0.5">
          <GithubButton />
          <ThemeCycleButton />
          <SoundToggle />
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

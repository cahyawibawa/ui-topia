"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SectionIcon } from "@/components/docs/section-icon";
import { cn } from "@/lib/utils";

export type NavGroup = {
  id: string;
  title: string;
  href: string;
  sections: {
    title: string;
    icon: string;
    items: { title: string; url: string }[];
  }[];
};

function useActiveGroup(groups: NavGroup[]) {
  const pathname = usePathname();
  const id = pathname.split("/")[2];
  return { pathname, group: groups.find((g) => g.id === id) ?? groups[0] };
}

export function GroupTabs({ groups }: { groups: NavGroup[] }) {
  const { group } = useActiveGroup(groups);

  return (
    <nav aria-label="Sections" className="flex flex-wrap items-center gap-1">
      {groups.map((item) => (
        <Link
          aria-current={item.id === group?.id ? "page" : undefined}
          className="flex items-center gap-1.5 rounded-lg px-2 py-1 text-muted-foreground text-sm transition-colors hover:text-foreground aria-[current=page]:bg-accent aria-[current=page]:text-foreground"
          href={item.href}
          key={item.id}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
}

export function SidebarNav({
  groups,
  onNavigate,
  className,
}: {
  groups: NavGroup[];
  onNavigate?: () => void;
  className?: string;
}) {
  const { pathname, group } = useActiveGroup(groups);
  if (!group) return null;

  return (
    <nav aria-label="Documentation" className={cn("text-sm", className)}>
      {group.sections.map((section) => (
        <div className="mb-6" key={section.title}>
          <p className="mb-2 flex items-center gap-2 px-2 font-medium">
            <SectionIcon name={section.icon} />
            {section.title}
          </p>
          <ul className="flex flex-col gap-px">
            {section.items.map((item) => (
              <li key={item.url}>
                <Link
                  aria-current={pathname === item.url ? "page" : undefined}
                  className="block rounded-lg px-2 py-1.5 text-muted-foreground transition-colors hover:text-foreground aria-[current=page]:bg-accent aria-[current=page]:text-foreground"
                  href={item.url}
                  onClick={onNavigate}
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}

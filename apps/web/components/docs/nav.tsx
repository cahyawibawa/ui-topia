"use client";

import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SectionIcon } from "@/components/docs/section-icon";
import { playSound } from "@/lib/sounds";
import { cn } from "@/lib/utils";

export type NavGroup = {
  id: string;
  title: string;
  href: string;
  sections: {
    title: string;
    icon: string;
    items: { title: string; url: string; soon?: boolean; isNew?: boolean }[];
  }[];
};

const NEW_TAG_SEEN = "uitopia:new-tag-seen";

/** Set once the swipe has played, so a reload or a remounted menu doesn't replay it. */
let newTagPlayed = false;

function hasSeenNewTag() {
  if (newTagPlayed) return true;
  try {
    return sessionStorage.getItem(NEW_TAG_SEEN) === "1";
  } catch {
    return false;
  }
}

/** "new" with a marker stripe swiped behind it, like the yellow label on the calendar demo. */
function NewTag() {
  const reduce = useReducedMotion();
  const [seen, setSeen] = useState<boolean | null>(null);

  // Read after mount so the server and first client render agree; the swipe
  // waits for it so a tag already seen this session snaps in instead.
  useEffect(() => setSeen(hasSeenNewTag()), []);

  return (
    <span className="relative px-1.5 font-semibold text-[10px] text-foreground uppercase leading-4 tracking-wider">
      <motion.span
        animate={seen === null ? undefined : { scaleX: 1 }}
        aria-hidden="true"
        className="-skew-x-6 absolute inset-x-0 inset-y-0 origin-left rounded-[2px] bg-yellow-300 dark:bg-yellow-400/35"
        initial={{ scaleX: reduce ? 1 : 0 }}
        onAnimationComplete={() => {
          newTagPlayed = true;
          try {
            sessionStorage.setItem(NEW_TAG_SEEN, "1");
          } catch {}
        }}
        transition={
          seen
            ? { duration: 0 }
            : { duration: 0.45, delay: 0.4, ease: [0.4, 0, 0.2, 1] }
        }
      />
      <span className="relative">new</span>
    </span>
  );
}

function useActiveGroup(groups: NavGroup[]) {
  const pathname = usePathname();
  const id = pathname.split("/")[2];
  return { pathname, group: groups.find((g) => g.id === id) ?? groups[0] };
}

export function GroupTabs({
  groups,
  onNavigate,
}: {
  groups: NavGroup[];
  onNavigate?: () => void;
}) {
  const { group } = useActiveGroup(groups);

  return (
    <nav aria-label="Sections" className="flex flex-wrap items-center gap-1">
      {groups.map((item) => (
        <Link
          aria-current={item.id === group?.id ? "true" : undefined}
          className="flex items-center gap-1.5 rounded-lg px-2 py-1 text-muted-foreground text-sm transition-colors hover:text-foreground aria-[current=true]:bg-accent aria-[current=true]:text-foreground"
          href={item.href}
          key={item.id}
          onClick={() => {
            playSound("tap");
            onNavigate?.();
          }}
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
  revealFrom,
}: {
  groups: NavGroup[];
  onNavigate?: () => void;
  className?: string;
  /** Tags each section with data-reveal (staggered from this index) for the mobile menu. */
  revealFrom?: number;
}) {
  const { pathname, group } = useActiveGroup(groups);
  if (!group) return null;

  return (
    <nav aria-label="Documentation" className={cn("text-sm", className)}>
      {group.sections.map((section, i) => (
        <div
          className="mb-6"
          data-reveal={revealFrom === undefined ? undefined : ""}
          key={section.title}
          style={
            revealFrom === undefined
              ? undefined
              : ({ "--reveal-i": revealFrom + i } as React.CSSProperties)
          }
        >
          <p className="mb-2 flex items-center gap-2 px-2 font-medium">
            <SectionIcon name={section.icon} />
            {section.title}
          </p>
          <ul className="flex flex-col gap-px">
            {section.items.map((item) => {
              return (
                <li key={item.url}>
                  {item.soon ? (
                    <span
                      aria-disabled="true"
                      className="block cursor-not-allowed rounded-lg px-2 py-1.5 text-muted-foreground/50"
                    >
                      {item.title}
                    </span>
                  ) : (
                    <Link
                      aria-current={pathname === item.url ? "page" : undefined}
                      className="flex items-center justify-between rounded-lg px-2 py-1.5 text-muted-foreground transition-colors hover:text-foreground aria-[current=page]:bg-accent aria-[current=page]:text-foreground"
                      href={item.url}
                      onClick={() => {
                        playSound("tap");
                        onNavigate?.();
                      }}
                    >
                      {item.title}
                      {item.isNew && <NewTag />}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}

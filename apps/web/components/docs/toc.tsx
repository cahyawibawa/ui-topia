"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type TocItem = { title: string; url: string; depth: number };

export function Toc({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState<string>();

  useEffect(() => {
    const elements = items
      .map((item) => document.getElementById(item.url.slice(1)))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    // The last heading may never reach the observed band on short pages.
    const atBottom = () =>
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 2;
    const last = elements.at(-1);

    const observer = new IntersectionObserver(
      (entries) => {
        if (atBottom() && last) {
          setActive(last.id);
          return;
        }
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "0px 0px -70% 0px" },
    );
    for (const el of elements) observer.observe(el);

    const onScroll = () => {
      if (atBottom() && last) setActive(last.id);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav aria-label="On this page" className="text-sm">
      <p className="mb-3 font-medium">On this page</p>
      <ul className="flex flex-col border-l">
        {items.map((item) => (
          <li key={item.url}>
            <a
              className={cn(
                "-ml-px block border-transparent border-l py-1 text-muted-foreground transition-colors hover:text-foreground",
                item.depth > 2 ? "pl-6" : "pl-3",
                active === item.url.slice(1) &&
                  "border-foreground text-foreground",
              )}
              href={item.url}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

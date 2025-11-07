"use client";

import { ThemeToggle } from "fumadocs-ui/components/layout/theme-toggle";
import Link from "next/link";
import { Icons } from "@/registry/components/icons";

const footerColumns: Array<{
  title: string;
  links: Array<{ label: string; href: string }>;
}> = [
  {
    title: "Resources",
    links: [
      { label: "Blocks", href: "/blocks" },
      { label: "Craft", href: "https://cahyawibawa.com/lab" },
      { label: "Changelog", href: "/changelog" },
    ],
  },
  {
    title: "Social",
    links: [
      { label: "GitHub", href: "https://github.com/cahyawibawa/ui-topia" },
      { label: "X (Twitter)", href: "https://x.com/kyuotaka" },
      { label: "Email", href: "mailto:cahyawbwa@gmail.com" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="rounded-3xl border border-border/60 bg-muted/50 px-6 py-10 sm:px-8">
      <div className="grid gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
        <div className="flex flex-col gap-5 items-start">
          <Icons.logo className="h-6 w-auto text-foreground" />
          <p className="max-w-md text-muted-foreground text-sm leading-relaxed">
            ui/topia is an experimental space for UI components, motion, and
            interaction patterns. Work in progress.
          </p>
        </div>

        <nav
          aria-label="Footer navigation"
          className="grid gap-6 sm:grid-cols-2"
        >
          {footerColumns.map((column) => (
            <div key={column.title} className="flex flex-col gap-3">
              <p className="font-medium text-foreground text-sm">
                {column.title}
              </p>
              <ul className="flex flex-col gap-2 text-muted-foreground text-sm">
                {column.links.map((item) => (
                  <li key={item.label}>
                    <Link
                      className="transition-colors hover:text-foreground"
                      href={item.href}
                      target={
                        item.href.startsWith("http") ? "_blank" : undefined
                      }
                      rel={
                        item.href.startsWith("http") ? "noreferrer" : undefined
                      }
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <div className="mt-8 flex flex-col gap-4 border-border/60 border-t pt-6 text-muted-foreground text-xs sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} ui/topia. a tiny corner of the web.</p>
        <ThemeToggle
          className="w-fit border border-border/60 bg-background/80"
          mode="light-dark-system"
        />
      </div>
    </footer>
  );
}

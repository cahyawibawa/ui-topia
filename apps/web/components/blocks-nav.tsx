"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ScrollArea, ScrollBar } from "@/registry/ui/scroll-area";

interface Category {
  name: string;
  slug: string;
  hidden?: boolean;
}

interface BlocksNavProps {
  categories: Category[];
}

export function BlocksNav({ categories }: BlocksNavProps) {
  const pathname = usePathname();

  return (
    <div className="relative overflow-hidden">
      <ScrollArea className="max-w-none">
        <div className="flex items-center">
          <BlocksNavLink
            category={{ hidden: false, name: "Featured", slug: "" }}
            isActive={pathname === "/blocks"}
          />
          {categories.map((category) => (
            <BlocksNavLink
              category={category}
              isActive={pathname === `/blocks/${category.slug}`}
              key={category.slug}
            />
          ))}
        </div>
        <ScrollBar className="invisible" orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}

function BlocksNavLink({
  category,
  isActive,
}: {
  category: Category;
  isActive: boolean;
}) {
  if (category.hidden) {
    return null;
  }

  return (
    <Link
      className="flex h-7 shrink-0 items-center justify-center whitespace-nowrap rounded-full px-4 text-center font-medium text-muted-foreground text-sm transition-colors hover:text-foreground data-[active=true]:bg-accent data-[active=true]:text-foreground"
      data-active={isActive}
      href={`/blocks/${category.slug}`}
    >
      {category.name}
    </Link>
  );
}

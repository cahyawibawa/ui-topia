"use client";

import { ScrollArea, ScrollBar } from "@/uitopia/scroll-area";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
            category={{ name: "Featured", slug: "", hidden: false }}
            isActive={pathname === "/blocks"}
          />
          {categories.map((category) => (
            <BlocksNavLink
              key={category.slug}
              category={category}
              isActive={pathname === `/blocks/${category.slug}`}
            />
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="invisible" />
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
      href={`/blocks/${category.slug}`}
      className="flex h-7 shrink-0 items-center justify-center whitespace-nowrap rounded-full px-4 text-center font-medium text-muted-foreground text-sm transition-colors hover:text-foreground data-[active=true]:bg-muted data-[active=true]:text-foreground"
      data-active={isActive}
    >
      {category.name}
    </Link>
  );
}

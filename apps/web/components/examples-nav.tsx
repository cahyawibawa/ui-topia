"use client";

import { cn } from "@/lib/utils";
import { ScrollArea, ScrollBar } from "@ui/topia/scroll-area";
import Link from "next/link";
import { usePathname } from "next/navigation";

const examples = [
  {
    name: "Buttons",
    href: "/examples/buttons",
  },
  {
    name: "Text Variants",
    href: "/examples/texts",
  },
];

interface ExamplesNavProps extends React.HTMLAttributes<HTMLDivElement> {}

export function ExamplesNav({ className, ...props }: ExamplesNavProps) {
  const pathname = usePathname();

  return (
    <div className="flex pt-10">
      <ScrollArea className="max-w-[600px] lg:max-w-none">
        <div className={cn("mb-4 flex items-center", className)} {...props}>
          {examples.map((example, index) => (
            <Link
              href={example.href}
              key={example.href}
              className={cn(
                "flex h-7 items-center justify-center rounded-full px-4 text-center font-medium text-[13px] transition-colors",
                pathname?.startsWith(example.href) ||
                  (index === 0 && pathname === "/")
                  ? "bg-neutral-200 text-primary dark:bg-slated dark:text-white"
                  : "text-muted-foreground",
              )}
            >
              {example.name}
            </Link>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="invisible" />
      </ScrollArea>
    </div>
  );
}

// interface ExampleCodeLinkProps {
//   pathname: string | null;
// }

// export function ExampleCodeLink({ pathname }: ExampleCodeLinkProps) {
//   const example = examples.find((example) =>
//     pathname?.startsWith(example.href)
//   );

//   if (!example?.code) {
//     return null;
//   }

//   return (
//     <Link
//       href={example?.code}
//       target='_blank'
//       rel='nofollow'
//       className='absolute right-0 top-0 hidden items-center rounded-[0.5rem] text-sm font-medium md:flex'
//     >
//       View code
//       <ArrowRightIcon className='ml-1 h-4 w-4' />
//     </Link>
//   );
// }

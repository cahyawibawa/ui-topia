import {
  Blocks,
  BookOpen,
  NotebookPen,
  SquareAsterisk,
  SquareM,
} from "lucide-react";
import { cn } from "@/lib/utils";

const icons = {
  "getting-started": { icon: BookOpen, color: "text-orange-500" },
  components: { icon: Blocks, color: "text-blue-500" },
  notes: { icon: NotebookPen, color: "text-rose-500" },
  ui: { icon: SquareAsterisk, color: "text-foreground" },
  motion: { icon: SquareM, color: "text-violet-500" },
} as const;

export type SectionIconName = keyof typeof icons;

/** Small coloured icon shared by sidebar sections, tabs and the index grid. */
export function SectionIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const entry = icons[name as SectionIconName];
  if (!entry) return null;
  const Icon = entry.icon;
  return (
    <Icon aria-hidden className={cn("size-3.5", entry.color, className)} />
  );
}

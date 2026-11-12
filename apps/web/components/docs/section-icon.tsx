import {
  BookOpen,
  Component,
  Droplet,
  LayoutGrid,
  NotebookPen,
  PencilRuler,
  SquareAsterisk,
  SquareM,
  Type,
} from "lucide-react";
import { cn } from "@/lib/utils";

const icons = {
  "getting-started": { icon: BookOpen, color: "text-orange-500" },
  components: { icon: Component, color: "text-blue-500" },
  vault: { icon: NotebookPen, color: "text-rose-500" },
  ui: { icon: SquareAsterisk, color: "text-foreground" },
  craft: { icon: PencilRuler, color: "text-orange-500" },
  "kinetic-type": { icon: Type, color: "text-violet-500" },
  typography: { icon: Type, color: "text-blue-500" },
  color: { icon: Droplet, color: "text-rose-500" },
  layout: { icon: LayoutGrid, color: "text-amber-500" },
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

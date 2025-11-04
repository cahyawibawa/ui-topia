import { BoldIcon, ItalicIcon, UnderlineIcon } from "lucide-react";

import { Toggle } from "@/registry/ui/toggle";

export default function ToggleIconGroup() {
  return (
    <div className="flex items-center gap-1">
      <Toggle variant="outline" aria-label="Toggle bold">
        <BoldIcon />
      </Toggle>
      <Toggle variant="outline" aria-label="Toggle italic">
        <ItalicIcon />
      </Toggle>
      <Toggle variant="outline" aria-label="Toggle underline">
        <UnderlineIcon />
      </Toggle>
    </div>
  );
}

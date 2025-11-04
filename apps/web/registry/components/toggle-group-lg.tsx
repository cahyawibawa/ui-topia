import { BoldIcon, ItalicIcon, UnderlineIcon } from "lucide-react";

import { Toggle, ToggleGroup } from "@/registry/ui/toggle-group";

export default function ToggleGroupLg() {
  return (
    <ToggleGroup size="lg" defaultValue={["bold"]}>
      <Toggle value="bold" aria-label="Toggle bold">
        <BoldIcon />
      </Toggle>
      <Toggle value="italic" aria-label="Toggle italic">
        <ItalicIcon />
      </Toggle>
      <Toggle value="underline" aria-label="Toggle underline">
        <UnderlineIcon />
      </Toggle>
    </ToggleGroup>
  );
}

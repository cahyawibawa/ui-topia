import { BoldIcon, ItalicIcon, UnderlineIcon } from "lucide-react";

import {
  Toggle,
  ToggleGroup,
  ToggleGroupSeparator,
} from "@/registry/ui/toggle-group";

export default function ToggleGroupWithSeparator() {
  return (
    <ToggleGroup defaultValue={["bold"]}>
      <Toggle value="bold" aria-label="Toggle bold">
        <BoldIcon />
      </Toggle>
      <ToggleGroupSeparator />
      <Toggle value="italic" aria-label="Toggle italic">
        <ItalicIcon />
      </Toggle>
      <ToggleGroupSeparator />
      <Toggle value="underline" aria-label="Toggle underline">
        <UnderlineIcon />
      </Toggle>
    </ToggleGroup>
  );
}

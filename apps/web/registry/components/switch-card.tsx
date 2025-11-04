import * as React from "react";

import { Label } from "@/registry/ui/label";
import { Switch } from "@/registry/ui/switch";

export default function SwitchCardDemo() {
  const id = React.useId();

  return (
    <Label
      htmlFor={id}
      className="flex items-center gap-6 rounded-lg border p-3 hover:bg-accent/50 has-data-checked:border-primary/48 has-data-checked:bg-accent/50"
    >
      <div className="flex flex-col gap-1">
        <p className="text-sm leading-4">Enable notifications</p>
        <p className="text-muted-foreground text-xs">
          You can enable or disable notifications at any time.
        </p>
      </div>
      <Switch id={id} defaultChecked />
    </Label>
  );
}

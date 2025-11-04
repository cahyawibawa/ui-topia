import * as React from "react";

import { Label } from "@/registry/ui/label";
import { Switch } from "@/registry/ui/switch";

export default function SwitchWithDescriptionDemo() {
  const id = React.useId();

  return (
    <div className="flex items-start gap-2">
      <Switch id={id} defaultChecked />
      <div className="flex flex-col gap-1">
        <Label htmlFor={id}>Marketing emails</Label>
        <p className="text-muted-foreground text-xs">
          By enabling marketing emails, you agree to receive emails.
        </p>
      </div>
    </div>
  );
}

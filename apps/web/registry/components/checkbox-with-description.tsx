import * as React from "react";

import { Checkbox } from "@/registry/ui/checkbox";
import { Label } from "@/registry/ui/label";

export default function CheckboxWithDescriptionDemo() {
  const id = React.useId();

  return (
    <div className="flex items-start gap-2">
      <Checkbox id={id} defaultChecked />
      <div className="flex flex-col gap-1">
        <Label htmlFor={id}>Accept terms and conditions</Label>
        <p className="text-muted-foreground text-xs">
          By clicking this checkbox, you agree to the terms and conditions.
        </p>
      </div>
    </div>
  );
}

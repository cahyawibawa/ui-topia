import * as React from "react";

import { Label } from "@/registry/ui/label";
import {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
} from "@/registry/ui/number-field";

export default function NumberFieldWithLabel() {
  const id = React.useId();
  return (
    <div className="flex flex-col items-start gap-2">
      <Label htmlFor={id}>Quantity</Label>
      <NumberField id={id} defaultValue={0}>
        <NumberFieldGroup>
          <NumberFieldDecrement />
          <NumberFieldInput />
          <NumberFieldIncrement />
        </NumberFieldGroup>
      </NumberField>
    </div>
  );
}

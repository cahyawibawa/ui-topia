"use client";

import { Checkbox } from "@/registry/ui/checkbox";
import { CheckboxGroup } from "@/registry/ui/checkbox-group";
import { Field, FieldDescription, FieldLabel } from "@/registry/ui/field";
import { Fieldset, FieldsetLegend } from "@/registry/ui/fieldset";

export default function FieldCheckboxGroupDemo() {
  return (
    <Field
      name="frameworks"
      className="gap-4"
      render={(props) => <Fieldset {...props} />}
    >
      <FieldsetLegend className="font-medium text-sm">
        Frameworks
      </FieldsetLegend>
      <CheckboxGroup defaultValue={["react"]}>
        <FieldLabel>
          <Checkbox value="react" /> React
        </FieldLabel>
        <FieldLabel>
          <Checkbox value="vue" /> Vue
        </FieldLabel>
        <FieldLabel>
          <Checkbox value="svelte" /> Svelte
        </FieldLabel>
      </CheckboxGroup>
      <FieldDescription>Select one or more frameworks.</FieldDescription>
    </Field>
  );
}

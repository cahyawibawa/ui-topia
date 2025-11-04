import { Field, FieldDescription } from "@/registry/ui/field";
import {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
  NumberFieldScrubArea,
} from "@/registry/ui/number-field";

export default function FieldNumberFieldDemo() {
  return (
    <Field>
      <NumberField defaultValue={1} min={1} max={100}>
        <NumberFieldScrubArea label="Quantity" />
        <NumberFieldGroup>
          <NumberFieldDecrement />
          <NumberFieldInput />
          <NumberFieldIncrement />
        </NumberFieldGroup>
      </NumberField>
      <FieldDescription>Choose a value between 1 and 100.</FieldDescription>
    </Field>
  );
}

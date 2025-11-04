import {
  Field,
  FieldControl,
  FieldDescription,
  FieldLabel,
} from "@/registry/ui/field";
import { Fieldset, FieldsetLegend } from "@/registry/ui/fieldset";

export default function FieldsetDemo() {
  return (
    <Fieldset>
      <FieldsetLegend>Billing Details</FieldsetLegend>
      <Field>
        <FieldLabel>Company</FieldLabel>
        <FieldControl type="text" placeholder="Enter company name" />
        <FieldDescription>
          The name that will appear on invoices.
        </FieldDescription>
      </Field>

      <Field>
        <FieldLabel>Tax ID</FieldLabel>
        <FieldControl
          type="text"
          placeholder="Enter tax identification number"
        />
        <FieldDescription>
          Your business tax identification number.
        </FieldDescription>
      </Field>
    </Fieldset>
  );
}

import {
  Field,
  FieldControl,
  FieldError,
  FieldLabel,
} from "@/registry/ui/field";

export default function FieldRequiredDemo() {
  return (
    <Field>
      <FieldLabel>
        Password <span className="text-destructive-foreground">*</span>
      </FieldLabel>
      <FieldControl type="password" placeholder="Enter password" required />
      <FieldError>Please fill out this field.</FieldError>
    </Field>
  );
}

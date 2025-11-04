import {
  Field,
  FieldControl,
  FieldDescription,
  FieldLabel,
} from "@/registry/ui/field";

export default function FieldDisabledDemo() {
  return (
    <Field disabled>
      <FieldLabel>Email</FieldLabel>
      <FieldControl type="email" placeholder="Enter your email" disabled />
      <FieldDescription>This field is currently disabled.</FieldDescription>
    </Field>
  );
}

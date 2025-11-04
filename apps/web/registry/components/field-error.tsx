import {
  Field,
  FieldControl,
  FieldError,
  FieldLabel,
} from "@/registry/ui/field";

export default function FieldWithErrorDemo() {
  return (
    <Field>
      <FieldLabel>Email</FieldLabel>
      <FieldControl type="email" placeholder="Enter your email" />
      <FieldError>Please enter a valid email address.</FieldError>
    </Field>
  );
}

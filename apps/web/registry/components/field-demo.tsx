import {
  Field,
  FieldControl,
  FieldDescription,
  FieldLabel,
} from "@/registry/ui/field";

export default function FieldDemo() {
  return (
    <Field>
      <FieldLabel>Name</FieldLabel>
      <FieldControl type="text" placeholder="Enter your name" />
      <FieldDescription>Visible on your profile</FieldDescription>
    </Field>
  );
}

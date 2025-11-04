"use client";

import {
  Field,
  FieldControl,
  FieldDescription,
  FieldLabel,
} from "@/registry/ui/field";
import { Textarea } from "@/registry/ui/textarea";

export default function FieldTextareaDemo() {
  return (
    <Field>
      <FieldLabel>Bio</FieldLabel>
      <FieldControl
        render={(props) => (
          // @ts-ignore
          <Textarea placeholder="Tell us about yourself…" {...props} />
        )}
      />
      <FieldDescription>
        Write a short bio. Maximum 500 characters.
      </FieldDescription>
    </Field>
  );
}

"use client";

import * as React from "react";

import { Button } from "@/registry/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/registry/ui/field";
import { Form } from "@/registry/ui/form";
import {
  Select,
  SelectItem,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from "@/registry/ui/select";

const items = [
  { label: "Select a framework", value: null },
  { label: "Next.js", value: "next" },
  { label: "Vite", value: "vite" },
  { label: "Astro", value: "astro" },
];

export default function SelectForm() {
  const [loading, setLoading] = React.useState(false);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    alert(`Framework: ${formData.get("framework") || ""}`);
  };

  return (
    <Form onSubmit={onSubmit} className="max-w-64">
      <Field>
        <FieldLabel>Framework</FieldLabel>
        <Select name="framework" items={items} disabled={loading} required>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectPopup>
            {items.map(({ label, value }) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectPopup>
        </Select>
        <FieldDescription>Pick your favorite.</FieldDescription>
        <FieldError>Please select a value.</FieldError>
      </Field>

      <Button type="submit" disabled={loading}>
        Submit
      </Button>
    </Form>
  );
}

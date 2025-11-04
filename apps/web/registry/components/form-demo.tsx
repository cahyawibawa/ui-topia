"use client";

import * as React from "react";

import { Button } from "@/registry/ui/button";
import {
  Field,
  FieldControl,
  FieldError,
  FieldLabel,
} from "@/registry/ui/field";
import { Form } from "@/registry/ui/form";

export default function FormDemo() {
  const [loading, setLoading] = React.useState(false);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    alert(`Email: ${formData.get("email") || ""}`);
  };

  return (
    <Form onSubmit={onSubmit} className="max-w-64">
      <Field>
        <FieldLabel>Email</FieldLabel>
        <FieldControl
          name="email"
          type="email"
          placeholder="you@example.com"
          disabled={loading}
          required
        />
        <FieldError>Please enter a valid email.</FieldError>
      </Field>
      <Button type="submit" disabled={loading}>
        Submit
      </Button>
    </Form>
  );
}

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
import { Textarea } from "@/registry/ui/textarea";

export default function TextareaForm() {
  const [loading, setLoading] = React.useState(false);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    alert(`Message: ${formData.get("message") || ""}`);
  };

  return (
    <Form onSubmit={onSubmit} className="max-w-64">
      <Field>
        <FieldLabel>Message</FieldLabel>
        <FieldControl
          name="message"
          placeholder="Type your message here"
          disabled={loading}
          required
          render={(props) => (
            // @ts-ignore
            <Textarea {...props} />
          )}
        />
        <FieldError>This field is required.</FieldError>
      </Field>
      <Button type="submit" disabled={loading}>
        Submit
      </Button>
    </Form>
  );
}

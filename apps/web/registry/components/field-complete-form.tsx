"use client";

import * as React from "react";

import { Button } from "@/registry/ui/button";
import { Checkbox } from "@/registry/ui/checkbox";
import {
  Field,
  FieldControl,
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

export default function FieldCompleteFormDemo() {
  const [loading, setLoading] = React.useState(false);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    const data = {
      fullName: formData.get("fullName"),
      email: formData.get("email"),
      role: formData.get("role"),
      newsletter: formData.get("newsletter"),
    };
    alert(
      `Full name: ${data.fullName || ""}\nEmail: ${data.email || ""}\nRole: ${
        data.role || ""
      }\nNewsletter: ${data.newsletter}`,
    );
  };
  return (
    <Form onSubmit={onSubmit}>
      <Field>
        <FieldLabel>
          Full Name <span className="text-destructive">*</span>
        </FieldLabel>
        <FieldControl
          name="fullName"
          type="text"
          placeholder="John Doe"
          disabled={loading}
          required
        />
        <FieldError>Please enter a valid name.</FieldError>
      </Field>

      <Field>
        <FieldLabel>
          Email <span className="text-destructive">*</span>
        </FieldLabel>
        <FieldControl
          name="email"
          type="email"
          placeholder="john@example.com"
          disabled={loading}
          required
        />
        <FieldError>Please enter a valid email.</FieldError>
      </Field>

      <Field>
        <FieldLabel>Role</FieldLabel>
        <Select
          name="role"
          items={[
            { label: "Select your role", value: null },
            { label: "Developer", value: "developer" },
            { label: "Designer", value: "designer" },
            { label: "Product Manager", value: "manager" },
            { label: "Other", value: "other" },
          ]}
          disabled={loading}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectPopup>
            <SelectItem value="developer">Developer</SelectItem>
            <SelectItem value="designer">Designer</SelectItem>
            <SelectItem value="manager">Product Manager</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectPopup>
        </Select>
        <FieldDescription>This is an optional field</FieldDescription>
      </Field>

      <Field>
        <div className="flex items-center gap-2">
          <Checkbox name="newsletter" disabled={loading} />
          <FieldLabel className="cursor-pointer">
            Subscribe to newsletter
          </FieldLabel>
        </div>
      </Field>

      <Button type="submit" disabled={loading}>
        Submit
      </Button>
    </Form>
  );
}

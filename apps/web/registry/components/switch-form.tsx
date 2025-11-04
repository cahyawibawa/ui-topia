"use client";

import * as React from "react";

import { Button } from "@/registry/ui/button";
import { Field, FieldLabel } from "@/registry/ui/field";
import { Form } from "@/registry/ui/form";
import { Switch } from "@/registry/ui/switch";

export default function SwitchFormDemo() {
  const [loading, setLoading] = React.useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    console.log(formData.get("marketing"));

    const enabled = formData.get("marketing");
    alert(`Marketing emails: ${enabled}`);
  };

  return (
    <Form onSubmit={onSubmit} className="w-auto">
      <Field name="marketing">
        <FieldLabel>
          <Switch name="marketing" defaultChecked disabled={loading} />
          Enable marketing emails
        </FieldLabel>
      </Field>
      <Button type="submit" disabled={loading}>
        Submit
      </Button>
    </Form>
  );
}

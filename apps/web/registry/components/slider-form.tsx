"use client";

import * as React from "react";

import { Button } from "@/registry/ui/button";
import { Field, FieldDescription, FieldLabel } from "@/registry/ui/field";
import { Form } from "@/registry/ui/form";
import { Slider, SliderValue } from "@/registry/ui/slider";

export default function SliderForm() {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [value, setValue] = React.useState<number | readonly number[]>([
    25, 75,
  ]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    const volumes = formData.getAll("volume");
    alert(`Volume: ${volumes.join(", ")}`);
  };

  return (
    <Form onSubmit={onSubmit}>
      <Field name="volume" className="items-stretch gap-3">
        <Slider value={value} onValueChange={setValue} disabled={loading}>
          <div className="mb-2 flex items-center justify-between gap-1">
            <FieldLabel>Volume</FieldLabel>
            <SliderValue />
          </div>
        </Slider>
        <FieldDescription>Choose a value between 0 and 100</FieldDescription>
      </Field>
      <Button type="submit" disabled={loading}>
        Submit
      </Button>
    </Form>
  );
}

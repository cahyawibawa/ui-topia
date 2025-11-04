"use client";

import * as React from "react";

import { Button } from "@/registry/ui/button";
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxPopup,
  ComboboxValue,
} from "@/registry/ui/combobox";
import { Field, FieldError, FieldLabel } from "@/registry/ui/field";
import { Form } from "@/registry/ui/form";

const items = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Orange", value: "orange" },
  { label: "Grape", value: "grape" },
  { label: "Strawberry", value: "strawberry" },
  { label: "Mango", value: "mango" },
  { label: "Pineapple", value: "pineapple" },
  { label: "Kiwi", value: "kiwi" },
  { label: "Peach", value: "peach" },
  { label: "Pear", value: "pear" },
];

export default function ComboboxMultipleForm() {
  const [loading, setLoading] = React.useState(false);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const selectedItems = formData.getAll("items");
    const itemValues = selectedItems.map(
      (selectedItem) =>
        items.find((item) => item.label === selectedItem)?.value ||
        selectedItem,
    );
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    alert(`Favorite items: ${itemValues.join(", ") || ""}`);
  };

  return (
    <Form onSubmit={onSubmit} className="max-w-64">
      <Field>
        <FieldLabel>Favorite items</FieldLabel>
        <Combobox
          items={items}
          multiple
          name="items"
          disabled={loading}
          required
        >
          <ComboboxChips>
            <ComboboxValue>
              {(value: { value: string; label: string }[]) => (
                <>
                  {value?.map((item) => (
                    <ComboboxChip key={item.value} aria-label={item.label}>
                      {item.label}
                    </ComboboxChip>
                  ))}
                  <ComboboxInput
                    placeholder={value.length > 0 ? undefined : "Select items…"}
                  />
                </>
              )}
            </ComboboxValue>
          </ComboboxChips>
          <ComboboxPopup>
            <ComboboxEmpty>No items found.</ComboboxEmpty>
            <ComboboxList>
              {(item) => (
                <ComboboxItem key={item.value} value={item}>
                  {item.label}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxPopup>
        </Combobox>
        <FieldError>Please select at least one item.</FieldError>
      </Field>
      <Button type="submit" disabled={loading}>
        Submit
      </Button>
    </Form>
  );
}

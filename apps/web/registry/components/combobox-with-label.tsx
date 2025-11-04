"use client";

import { useId } from "react";

import {
  Combobox,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxPopup,
} from "@/registry/ui/combobox";
import { Label } from "@/registry/ui/label";

const items = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "orange", label: "Orange" },
  { value: "grape", label: "Grape" },
  { value: "strawberry", label: "Strawberry" },
  { value: "mango", label: "Mango" },
  { value: "pineapple", label: "Pineapple" },
  { value: "kiwi", label: "Kiwi" },
  { value: "peach", label: "Peach" },
  { value: "pear", label: "Pear" },
];

export default function ComboboxWithLabel() {
  const id = useId();
  return (
    <Combobox items={items}>
      <div className="flex flex-col items-start gap-2">
        <Label htmlFor={id}>Fruits</Label>
        <ComboboxInput
          id={id}
          placeholder="Select an item..."
          aria-label="Select an item"
        />
      </div>
      <ComboboxPopup>
        <ComboboxEmpty>No results found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item.value} value={item}>
              {item.label}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxPopup>
    </Combobox>
  );
}

import { Label } from "@/registry/ui/label";
import { Radio, RadioGroup } from "@/registry/ui/radio-group";

export default function RadioGroupDemo() {
  return (
    <RadioGroup defaultValue="next">
      <Label>
        <Radio value="next" /> Next.js
      </Label>
      <Label>
        <Radio value="vite" /> Vite
      </Label>
      <Label>
        <Radio value="astro" /> Astro
      </Label>
    </RadioGroup>
  );
}

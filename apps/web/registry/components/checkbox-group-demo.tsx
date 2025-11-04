import { Checkbox } from "@/registry/ui/checkbox";
import { CheckboxGroup } from "@/registry/ui/checkbox-group";
import { Label } from "@/registry/ui/label";

export default function CheckboxGroupDemo() {
  return (
    <CheckboxGroup aria-label="Select frameworks" defaultValue={["next"]}>
      <Label>
        <Checkbox value="next" />
        Next.js
      </Label>
      <Label>
        <Checkbox value="vite" />
        Vite
      </Label>
      <Label>
        <Checkbox value="astro" />
        Astro
      </Label>
    </CheckboxGroup>
  );
}

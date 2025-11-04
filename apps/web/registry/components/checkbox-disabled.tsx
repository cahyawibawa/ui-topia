import { Checkbox } from "@/registry/ui/checkbox";
import { Label } from "@/registry/ui/label";

export default function CheckboxDisabledDemo() {
  return (
    <Label>
      <Checkbox defaultChecked disabled />
      Accept terms and conditions
    </Label>
  );
}

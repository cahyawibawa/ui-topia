import { Label } from "@/registry/ui/label";
import { Switch } from "@/registry/ui/switch";

export default function SwitchWithLabel() {
  return (
    <Label>
      <Switch disabled />
      Marketing emails
    </Label>
  );
}

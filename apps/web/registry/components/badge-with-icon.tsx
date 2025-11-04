import { CheckIcon } from "lucide-react";

import { Badge } from "@/registry/ui/badge";

export default function BadgeWithIcon() {
  return (
    <Badge variant="outline">
      <CheckIcon />
      Verified
    </Badge>
  );
}

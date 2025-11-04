import { CopyIcon } from "lucide-react";

import { Button } from "@/registry/ui/button";
import { Group, GroupItem, GroupSeparator } from "@/registry/ui/group";
import { Input } from "@/registry/ui/input";

export default function GroupWithInput() {
  return (
    <Group>
      <GroupItem
        render={<Input type="text" defaultValue="https://base-ui.com" />}
      />
      <GroupSeparator />
      <GroupItem
        render={<Button variant="outline" size="icon" aria-label="Copy" />}
      >
        <CopyIcon />
      </GroupItem>
    </Group>
  );
}

import { EllipsisIcon, FilesIcon, FilmIcon } from "lucide-react";

import { Button } from "@/registry/ui/button";
import { Group, GroupItem, GroupSeparator } from "@/registry/ui/group";

export default function GroupDemo() {
  return (
    <Group>
      <GroupItem render={<Button variant="outline" />}>
        <FilesIcon />
        Files
      </GroupItem>
      <GroupSeparator />
      <GroupItem render={<Button variant="outline" />}>
        <FilmIcon />
        Media
      </GroupItem>
      <GroupSeparator />
      <GroupItem
        render={<Button variant="outline" size="icon" aria-label="Menu" />}
      >
        <EllipsisIcon />
      </GroupItem>
    </Group>
  );
}

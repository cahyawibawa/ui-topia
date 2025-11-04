import { Button } from "@/registry/ui/button";
import { Menu, MenuItem, MenuPopup, MenuTrigger } from "@/registry/ui/menu";

export default function MenuHoverDemo() {
  return (
    <Menu openOnHover>
      <MenuTrigger render={<Button variant="outline" />}>Hover me</MenuTrigger>
      <MenuPopup>
        <MenuItem>Item one</MenuItem>
        <MenuItem>Item two</MenuItem>
      </MenuPopup>
    </Menu>
  );
}

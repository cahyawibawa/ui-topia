import { Button } from "@/registry/ui/button";
import { Menu, MenuItem, MenuPopup, MenuTrigger } from "@/registry/ui/menu";

export default function MenuCloseOnClickDemo() {
  return (
    <Menu>
      <MenuTrigger render={<Button variant="outline" />}>Open menu</MenuTrigger>
      <MenuPopup>
        <MenuItem closeOnClick>Profile</MenuItem>
        <MenuItem closeOnClick>Settings</MenuItem>
        <MenuItem closeOnClick>Log out</MenuItem>
      </MenuPopup>
    </Menu>
  );
}

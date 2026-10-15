"use client";

import { Menu } from "lucide-react";
import { useState } from "react";
import { GroupTabs, type NavGroup, SidebarNav } from "@/components/docs/nav";
import { Button } from "@/registry/ui/button";
import {
  Sheet,
  SheetPopup,
  SheetTitle,
  SheetTrigger,
} from "@/registry/ui/sheet";

export function MobileNav({ groups }: { groups: NavGroup[] }) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet onOpenChange={setOpen} open={open}>
      <SheetTrigger
        render={
          <Button
            aria-label="Open navigation"
            className="md:hidden"
            size="icon"
            variant="ghost"
          />
        }
      >
        <Menu className="size-4" />
      </SheetTrigger>
      <SheetPopup side="left">
        <SheetTitle className="sr-only">Navigation</SheetTitle>
        <div className="p-4 pb-0">
          <GroupTabs groups={groups} onNavigate={() => setOpen(false)} />
        </div>
        <SidebarNav
          className="overflow-y-auto p-4"
          groups={groups}
          onNavigate={() => setOpen(false)}
        />
      </SheetPopup>
    </Sheet>
  );
}

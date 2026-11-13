"use client";

import { Dialog } from "@base-ui-components/react/dialog";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { GroupTabs, type NavGroup, SidebarNav } from "@/components/docs/nav";
import { playSound } from "@/lib/sounds";
import { Button } from "@/registry/ui/button";

const BLUR_LAYERS = Array.from({ length: 8 }, (_, i) => ({
  blur: (8 * 2 ** (i / 7)).toFixed(1),
  band: i * 12.5,
}));

// No sheet: the page blurs progressively towards the left and the links
// drift in over it. Styles live in styles/globals.css (.nav-*).
export function MobileNav({ groups }: { groups: NavGroup[] }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // biome-ignore lint/correctness/useExhaustiveDependencies: close on route change
  useEffect(() => setOpen(false), [pathname]);

  const reveal = (i: number) => ({ "--reveal-i": i }) as React.CSSProperties;

  return (
    <Dialog.Root
      onOpenChange={(next) => {
        playSound(next ? "open" : "close");
        setOpen(next);
      }}
      open={open}
    >
      <Dialog.Trigger
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
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className="nav-backdrop fixed inset-0 z-50 md:hidden">
          {BLUR_LAYERS.map(({ blur, band }) => (
            <div
              className="nav-blur-layer"
              key={band}
              style={
                {
                  "--blur": `${blur}px`,
                  "--band": `${band}%`,
                } as React.CSSProperties
              }
            />
          ))}
          <div className="nav-tint" />
        </Dialog.Backdrop>
        {/* Full width so the list scrolls from anywhere; taps on empty space
            (anything but a link or button) close the menu. */}
        <Dialog.Popup
          className="nav-reveal fixed inset-0 z-50 flex flex-col outline-none md:hidden"
          onClick={(e) => {
            if (!(e.target as Element).closest("a, button, [aria-disabled]")) {
              setOpen(false);
            }
          }}
        >
          <Dialog.Title className="sr-only">Navigation</Dialog.Title>
          <div className="flex h-14 shrink-0 items-center px-4">
            <Dialog.Close
              data-reveal
              render={
                <Button
                  aria-label="Close navigation"
                  size="icon"
                  style={reveal(0)}
                  variant="ghost"
                />
              }
            >
              <X className="size-4" />
            </Dialog.Close>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto px-8 pb-16">
            <div data-reveal style={reveal(1)}>
              <GroupTabs groups={groups} onNavigate={() => setOpen(false)} />
            </div>
            <SidebarNav
              className="mt-6"
              groups={groups}
              onNavigate={() => setOpen(false)}
              revealFrom={2}
            />
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

"use client";

import type React from "react";
import { Suspense } from "react";
import ComponentCli from "@/components/cli-commands";
import { V0Button } from "@/components/v0-button";
import { useMediaQuery } from "@/hooks/use-media-query";
import type { RegistryItem } from "@/lib/registry";
import { cn } from "@/lib/utils";
import { Icons } from "@/registry/components/icons";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/registry/ui/sheet";
import { Button } from "@/uitopia/button";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/uitopia/drawer";

interface CodeViewerProps {
  children: React.ReactNode;
  component: RegistryItem;
}

function Content({ children, component }: CodeViewerProps) {
  return (
    <div className="min-w-0 space-y-6 p-5">
      <div>
        <h2 className="mb-4 font-medium text-base">Installation</h2>
        <ComponentCli name={component.name} />
      </div>
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-medium text-base">Code</h2>
          <V0Button
            componentSource={`https://uitopia.vercel.app/r/${component.name}.json`}
          />
        </div>
        {children}
      </div>
    </div>
  );
}

export function CodeViewer({ component, children }: CodeViewerProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (!isDesktop) {
    return (
      <Drawer>
        <DrawerTrigger asChild>
          <Button
            className="h-6 rounded-[6px] border bg-transparent px-2 text-foreground text-xs shadow-none hover:bg-muted dark:text-foreground"
            size="sm"
            variant="outline"
          >
            View Code
          </Button>
        </DrawerTrigger>
        <DrawerContent className="flex max-h-[80vh] flex-col sm:max-h-[90vh]">
          <DrawerTitle className="sr-only">Code</DrawerTitle>
          <div className="px-4 py-4">
            <Content component={component}>{children}</Content>
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Sheet>
      <SheetTrigger
        className={cn(
          "h-6 rounded-[6px] px-2 text-xs",
          "text-foreground",
          "select-none",
          "cursor-pointer",
          "inline-flex items-center justify-center rounded-md border border-input bg-background font-medium text-sm shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        )}
      >
        View Code
      </SheetTrigger>
      <SheetContent
        className="mb-2 overflow-hidden sm:max-w-sm md:w-[600px] md:max-w-[600px]"
        side="right"
      >
        <SheetTitle className="sr-only">Code</SheetTitle>
        <div className="min-h-0 flex-1 overflow-y-auto">
          <Suspense
            fallback={
              <div className="flex items-center justify-center p-5 text-muted-foreground text-sm">
                <Icons.loader className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </div>
            }
          >
            <Content component={component}>{children}</Content>
          </Suspense>
        </div>
      </SheetContent>
    </Sheet>
  );
}

"use client";

import type React from "react";
import { Suspense } from "react";
import type { RegistryItem } from "shadcn/registry";
import ComponentCli from "@/components/cli-commands";
import { V0Button } from "@/components/v0-button";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { Icons } from "@/registry/components/icons";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/registry/ui/drawer";
import { Button } from "@/uitopia/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/uitopia/sheet";

interface CodeViewerProps {
  children: React.ReactNode;
  component: RegistryItem;
}

function Content({ children, component }: CodeViewerProps) {
  return (
    <div className="min-w-0 space-y-6">
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
            variant="outline"
            size="sm"
            className="h-6 rounded-[6px] border bg-transparent px-2 text-foreground text-xs shadow-none hover:bg-muted dark:text-foreground"
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
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            "h-6 rounded-[6px] px-2 text-xs",
            "text-foreground hover:bg-primary-foreground",
            "transform-gpu",
            "will-change-transform",
            "select-none",
            "dark:text-foreground",
            "cursor-pointer",
          )}
        >
          View Code
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="mb-2 sm:max-w-sm md:w-[600px] md:max-w-[600px]"
      >
        <SheetTitle className="sr-only">Code</SheetTitle>
        <Suspense
          fallback={
            <div className="flex items-center justify-center text-muted-foreground text-sm">
              <Icons.loader className="mr-2 h-4 w-4 animate-spin" />
              Loading...
            </div>
          }
        >
          <Content component={component}>{children}</Content>
        </Suspense>
      </SheetContent>
    </Sheet>
  );
}

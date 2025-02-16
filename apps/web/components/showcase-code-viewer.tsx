"use client";

import ComponentCli from "@/components/cli-commands";
import { OpenInV0Button } from "@/components/v0-button";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/registry/ui/drawer";
import { Button } from "@/uitopia/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/uitopia/sheet";
import type React from "react";

interface ContentProps {
  children: React.ReactNode;
  name: string;
}

function Content({ children, name }: ContentProps) {
  return (
    <div className="min-w-0 space-y-6">
      <div>
        <h2 className="mb-4 font-medium text-base">Installation</h2>
        <ComponentCli name={name} />
      </div>
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-medium text-base">Code</h2>
          <OpenInV0Button name={name} />
        </div>
        {children}
      </div>
    </div>
  );
}

interface CodeViewerProps {
  name: string;
  children: React.ReactNode;
}

export function CodeViewer({ name, children }: CodeViewerProps) {
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
            <Content name={name}>{children}</Content>
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
          className="h-6 cursor-pointer rounded-[6px] border bg-transparent px-2 text-foreground text-xs shadow-none hover:bg-muted dark:text-foreground"
        >
          View Code
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="mb-2 sm:max-w-sm md:w-[600px] md:max-w-[600px]"
      >
        <SheetTitle className="sr-only">Code</SheetTitle>
        <Content name={name}>{children}</Content>
      </SheetContent>
    </Sheet>
  );
}

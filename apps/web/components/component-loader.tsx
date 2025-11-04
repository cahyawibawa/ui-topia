import React, { useEffect, useState } from "react";
import { V0Button } from "@/components/v0-button";
import { cn } from "@/lib/utils";
import { Icons } from "@/registry/components/icons";
import type {
  ComponentDisplayProps,
  ComponentLoaderProps,
} from "@/types/component";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/uitopia/tooltip";

export function ComponentLoader({
  name,
  hasReTrigger = false,
  classNameComponentContainer,
  showV0Button = true,
}: ComponentLoaderProps & { showV0Button?: boolean }) {
  const [Component, setComponent] = useState<React.ComponentType | null>(null);
  const [reTriggerKey, setReTriggerKey] = useState(() => Date.now());

  useEffect(() => {
    async function loadComponent() {
      try {
        const importedComponent = await import(`@/registry/components/${name}`);
        setComponent(() => importedComponent.default);
      } catch (error) {
        console.error(`Failed to load component: ${name}`, error);
      }
    }
    loadComponent();
  }, [name]);

  const handleReTrigger = () => {
    setReTriggerKey(Date.now());
  };

  if (!Component) {
    return (
      <div className="flex h-full w-full items-center justify-center text-muted-foreground text-sm">
        <Icons.loader className="mr-2 h-4 w-4 animate-spin" />
        Loading...
      </div>
    );
  }

  return (
    <ComponentDisplay
      className={classNameComponentContainer}
      component={<Component />}
      hasReTrigger={hasReTrigger}
      name={name}
      reTrigger={handleReTrigger}
      reTriggerKey={reTriggerKey}
      showV0Button={showV0Button}
    />
  );
}

function ComponentDisplay({
  component,
  hasReTrigger,
  className,
  reTriggerKey,
  reTrigger,
  name,
  showV0Button = true,
}: ComponentDisplayProps & { showV0Button?: boolean }) {
  const renderComponent = () => {
    if (!React.isValidElement(component)) {
      return null;
    }

    return hasReTrigger
      ? React.cloneElement(component, { key: reTriggerKey })
      : component;
  };

  return (
    <>
      <div className="absolute top-1.5 right-1.5 z-10 flex items-center gap-3 p-3">
        {showV0Button && (
          <V0Button
            className="hidden md:flex"
            componentSource={`https://uitopia.vercel.app/r/${name}.json`}
            variant="icon"
          />
        )}
        {hasReTrigger && (
          <button
            aria-label="Refresh component"
            className="cursor-pointer bg-background text-foreground hover:bg-transparent hover:text-foreground"
            onClick={reTrigger}
            type="button"
          >
            <Icons.refresh className="h-4 w-4" />
          </button>
        )}
      </div>
      <div
        className={cn(
          "relative flex w-full items-center justify-center rounded-md",
          className,
        )}
      >
        {renderComponent()}
      </div>
    </>
  );
}

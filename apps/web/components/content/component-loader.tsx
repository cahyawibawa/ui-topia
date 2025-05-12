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
      <div className="flex items-center justify-center text-muted-foreground text-sm">
        <Icons.loader className="mr-2 h-4 w-4 animate-spin" />
        Loading...
      </div>
    );
  }

  return (
    <ComponentDisplay
      component={<Component />}
      hasReTrigger={hasReTrigger}
      className={classNameComponentContainer}
      reTriggerKey={reTriggerKey}
      reTrigger={handleReTrigger}
      name={name}
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
    <div
      className={cn(
        "relative flex min-h-[350px] w-full items-center justify-center rounded-md",
        className,
      )}
    >
      <div className="absolute top-3 right-4 flex items-center gap-3">
        {showV0Button && (
          <V0Button
            variant="icon"
            componentSource={`https://uitopia.vercel.app/r/${name}.json`}
            className="hidden md:flex"
          />
        )}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              {hasReTrigger && (
                <button
                  type="button"
                  className="cursor-pointer text-muted-foreground/80 hover:bg-transparent hover:text-foreground"
                  onClick={reTrigger}
                  aria-label="Refresh component"
                >
                  <Icons.refresh className="h-4 w-4 text-muted-foreground" />
                </button>
              )}
            </TooltipTrigger>
            <TooltipContent>Refresh component</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      {renderComponent()}
    </div>
  );
}

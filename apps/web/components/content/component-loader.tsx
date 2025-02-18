import { OpenInV0Button } from "@/components/v0-button";
import { cn } from "@/lib/utils";
import type {
  ComponentDisplayProps,
  ComponentLoaderProps,
} from "@/types/component";
import { Button } from "@/uitopia/button";
import { Icons } from "@/uitopia/icons";
import React, { useEffect, useState } from "react";

export function ComponentLoader({
  name,
  hasReTrigger = false,
  classNameComponentContainer,
}: ComponentLoaderProps) {
  const [Component, setComponent] = useState<React.ComponentType | null>(null);
  const [reTriggerKey, setReTriggerKey] = useState(() => Date.now());

  useEffect(() => {
    async function loadComponent() {
      try {
        const importedComponent = await import(`@/registry/showcases/${name}`);
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
}: ComponentDisplayProps) {
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
      <div className="absolute top-2 right-2 flex items-center gap-2">
        <OpenInV0Button
          componentSource={`https://uitopia.xyz/r/${name}.json`}
          className="hidden md:flex"
        />
        {hasReTrigger && (
          <Button
            variant="ghost"
            size="icon"
            className="cursor-pointer text-muted-foreground/80 hover:bg-transparent hover:text-foreground"
            onClick={reTrigger}
            aria-label="Refresh component"
          >
            <Icons.refreshComponent className="h-4 w-4" />
          </Button>
        )}
      </div>
      {renderComponent()}
    </div>
  );
}

"use client";

import { extractSourceCode } from "@/lib/extract-source";
import { cn } from "@/lib/utils";
import { registry } from "@ui/topia";
import { Icons } from "@ui/topia/icons";
import { Suspense, useEffect, useState } from "react";
import CopyButton from "./copy-btn";

interface DemoComponentProps {
  componentName: string;
  className?: string;
}

const DemoComponent: React.FC<DemoComponentProps> = ({
  componentName,
  className,
}) => {
  const component = registry[componentName];

  if (!component || !component.component) {
    return <div>Component not found</div>;
  }

  const Component = component.component;

  return (
    <div className={cn("group/item relative", className)}>
      <Suspense fallback={<LoadingSpinner />}>
        <Component />
      </Suspense>
      <CopyButtonWrapper componentName={componentName} />
    </div>
  );
};

const LoadingSpinner: React.FC = () => (
  <div className="flex h-12 w-full items-center justify-center">
    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
    <span className="text-muted-foreground text-sm">Loading</span>
  </div>
);
const CopyButtonWrapper: React.FC<{ componentName: string }> = ({
  componentName,
}) => {
  const [code, setCode] = useState<string | null>(null);

  useEffect(() => {
    extractSourceCode(componentName).then(({ code }) => setCode(code));
  }, [componentName]);

  if (!code) return null;

  return <CopyButton componentSource={code} />;
};

export default DemoComponent;

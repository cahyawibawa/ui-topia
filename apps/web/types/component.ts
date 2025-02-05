import type { ReactNode } from "react";

export interface ComponentLoaderProps {
  name: string;
  hasReTrigger?: boolean;
  classNameComponentContainer?: string;
}

export interface ComponentDisplayProps {
  component: ReactNode;
  hasReTrigger: boolean;
  className?: string;
  reTriggerKey: number;
  reTrigger: () => void;
  name: string;
}

export interface ComponentPreviewProps {
  name: string;
  hasReTrigger?: boolean;
  classNameComponentContainer?: string;
}

export interface ComponentSourceProps {
  name: string;
  expandButtonTitle?: string;
  defaultExpanded?: boolean;
  maxHeight?: string;
  className?: string;
}

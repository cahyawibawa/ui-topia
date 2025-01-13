"use client";

import { Button } from "@/components/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import * as React from "react";

export default function ButtonDemo() {
  const [isExpanded, setIsExpanded] = React.useState<boolean>(false);

  const toggleExpand = () => {
    setIsExpanded((prevState) => !prevState);
  };

  return (
    <Button
      variant="outline"
      onClick={toggleExpand}
      aria-expanded={isExpanded}
      aria-controls="expandable-content"
    >
      {isExpanded ? "Show less" : "Show more"}
      {isExpanded ? (
        <ChevronUp
          className="-me-1 ms-1"
          size={16}
          strokeWidth={2}
          aria-hidden="true"
        />
      ) : (
        <ChevronDown
          className="-me-1 ms-1"
          size={16}
          strokeWidth={2}
          aria-hidden="true"
        />
      )}
    </Button>
  );
}

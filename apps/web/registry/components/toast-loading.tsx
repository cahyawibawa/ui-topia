"use client";

import { Button } from "@/registry/ui/button";
import { toastManager } from "@/registry/ui/toast";

export default function ToastLoading() {
  return (
    <Button
      variant="outline"
      onClick={() => {
        toastManager.add({
          title: "Loading…",
          description: "Please wait while we process your request.",
          type: "loading",
        });
      }}
    >
      Loading Toast
    </Button>
  );
}

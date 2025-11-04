"use client";

import { Button } from "@/registry/ui/button";
import { toastManager } from "@/registry/ui/toast";

export default function ToastWithAction() {
  return (
    <Button
      variant="outline"
      onClick={() => {
        const id = toastManager.add({
          title: "Action performed",
          description: "You can undo this action.",
          type: "success",
          actionProps: {
            children: "Undo",
            onClick: () => {
              toastManager.close(id);
              toastManager.add({
                title: "Action undone",
                description: "The action has been reverted.",
                type: "info",
              });
            },
          },
          timeout: 1000000,
        });
      }}
    >
      Perform Action
    </Button>
  );
}

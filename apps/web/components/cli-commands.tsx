"use client";

import * as React from "react";
import { CodeBlockCommand } from "@/components/code-block-command";

export default function CliCommands({ name }: { name: string }) {
  const installTarget = name.startsWith("@") ? name : `@uitopia/${name}`;

  const commands = React.useMemo(() => {
    return {
      __bun__: `bunx --bun shadcn@latest add ${installTarget}`,
      __npm__: `npx shadcn@latest add ${installTarget}`,
      __pnpm__: `pnpm dlx shadcn@latest add ${installTarget}`,
      __yarn__: `yarn dlx shadcn@latest add ${installTarget}`,
    };
  }, [installTarget]);

  return <CodeBlockCommand {...commands} />;
}

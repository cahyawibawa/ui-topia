import { mergeProps } from "@base-ui-components/react/merge-props";
import { useRender } from "@base-ui-components/react/use-render";
import type * as React from "react";

import { cn } from "@/lib/utils";
import { Separator } from "@/registry/ui/separator";

function Group({
  className,
  children,
  ...props
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      data-slot="group"
      className={cn(
        "flex w-fit [--clip-end:-1rem] [--clip-start:-1rem] *:pointer-coarse:after:min-w-auto",
        className,
      )}
      role="group"
      {...props}
    >
      {children}
    </div>
  );
}

function GroupItem({
  className,
  render,
  ...props
}: useRender.ComponentProps<"div">) {
  const defaultProps = {
    className: cn(
      "border-x-0 not-first:rounded-s-none not-last:rounded-e-none before:[clip-path:inset(-1rem_var(--clip-end)_-1rem_var(--clip-start))] not-first:before:-start-0.5 not-first:before:rounded-s-none not-first:before:[--clip-start:2px] not-last:before:-end-0.5 not-last:before:rounded-e-none not-last:before:[--clip-end:2px] first:border-s last:border-e focus-visible:z-10 has-focus-visible:z-10 not-last:has-[+[data-slot=separator]]:before:[--clip-end:1.5px] [[data-slot=separator]+&]:before:[--clip-start:1.5px]",
      className,
    ),
  };
  return useRender({
    defaultTagName: "div",
    render,
    props: mergeProps(defaultProps, props),
  });
}

function GroupSeparator({ className, ...props }: { className?: string }) {
  return (
    <Separator
      orientation="vertical"
      className={cn(
        "[[data-slot=input-control]:focus-within+&,[data-slot=field-control]:focus-within+&,[data-slot=select-trigger]:focus-visible+*+&]:-translate-x-px relative z-20 has-[+[data-slot=input-control]:focus-within,+[data-slot=field-control]:focus-within,+[data-slot=select-trigger]:focus-visible+*]:translate-x-px has-[+[data-slot=input-control]:focus-within,+[data-slot=field-control]:focus-within,+[data-slot=select-trigger]:focus-visible+*]:bg-ring [[data-slot=input-control]:focus-within+&,[data-slot=field-control]:focus-within+&,[data-slot=select-trigger]:focus-visible+*+&]:bg-ring",
        className,
      )}
      {...props}
    />
  );
}

export { Group, GroupItem, GroupSeparator };

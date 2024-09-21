"use client";
import { buttonVariants } from "@ui/topia/button";
import { ScrollArea, ScrollBar, ScrollViewport } from "@ui/topia/scroll-area";

import { useCopyButton } from "@/hooks/use-copy-btn";
import { cn } from "@/lib/utils";
import { Icons } from "@ui/topia/icons";
import { useTheme } from "next-themes";
import {
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
  forwardRef,
  useCallback,
  useRef,
} from "react";
export type CodeBlockProps = HTMLAttributes<HTMLElement> & {
  /**
   * Icon of code block
   *
   * When passed as a string, it assumes the value is the HTML of icon
   */
  icon?: ReactNode;

  allowCopy?: boolean;
};

export const Pre = forwardRef<HTMLPreElement, HTMLAttributes<HTMLPreElement>>(
  ({ className, ...props }, ref) => {
    const { theme } = useTheme();
    return (
      <pre
        ref={ref}
        className={cn(
          "relative overflow-x-auto p-4 text-sm",
          theme === "dark" ? "bg-[#101010]" : "bg-[#EFF1F5]",
          className,
        )}
        {...props}
      >
        {props.children}
      </pre>
    );
  },
);

Pre.displayName = "Pre";

export const CodeBlock = forwardRef<HTMLElement, CodeBlockProps>(
  ({ title, allowCopy = true, icon, className, ...props }, ref) => {
    const areaRef = useRef<HTMLDivElement>(null);
    const onCopy = useCallback(() => {
      const pre = areaRef.current?.getElementsByTagName("pre").item(0);

      if (!pre) return;

      const clone = pre.cloneNode(true) as HTMLElement;
      // biome-ignore lint/complexity/noForEach: <explanation>
      clone.querySelectorAll(".nd-copy-ignore").forEach((node) => {
        node.remove();
      });

      void navigator.clipboard.writeText(clone.textContent ?? "");
    }, []);

    return (
      <figure
        ref={ref}
        className={cn(
          "not-prose group relative overflow-hidden rounded-lg border text-sm",
          className,
        )}
        {...props}
      >
        {title ? (
          <div className="flex flex-row items-center gap-2 border-b bg-secondary px-4 py-1.5">
            {icon ? (
              <div
                className="text-muted-foreground [&_svg]:size-3.5"
                {...(typeof icon === "string"
                  ? {
                    dangerouslySetInnerHTML: { __html: icon },
                  }
                  : {
                    children: icon,
                  })}
              />
            ) : null}
            <figcaption className="flex-1 truncate text-muted-foreground">
              {title}
            </figcaption>
            {allowCopy ? (
              <CopyButton className="-me-2" onCopy={onCopy} />
            ) : null}
          </div>
        ) : (
          allowCopy && (
            <CopyButton
              className="absolute top-2 right-2 z-[2] backdrop-blur-sm"
              onCopy={onCopy}
            />
          )
        )}
        <ScrollArea ref={areaRef} dir="ltr">
          <ScrollViewport>{props.children}</ScrollViewport>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </figure>
    );
  },
);

CodeBlock.displayName = "CodeBlock";

function CopyButton({
  className,
  onCopy,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  onCopy: () => void;
}): ReactElement {
  const [checked, onClick] = useCopyButton(onCopy);

  return (
    <button
      type="button"
      className={cn(
        buttonVariants({
          variant: "ghost",
          size: "sm",
          className: "transition-all group-hover:opacity-100",
        }),
        !checked && "opacity-0",
        className,
      )}
      aria-label="Copy Text"
      onClick={onClick}
      {...props}
    >
      <Icons.check
        className={cn("size-3.5 transition-transform", !checked && "scale-0")}
      />
      <Icons.copy
        className={cn(
          "absolute size-3.5 text-foreground transition-transform",
          checked && "scale-0",
        )}
      />
    </button>
  );
}

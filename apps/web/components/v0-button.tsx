import { cn } from "@/lib/utils";
import { buttonVariants } from "@/uitopia/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/uitopia/tooltip";
import Link from "next/link";

interface V0ButtonProps {
  componentSource: string;
  className?: string;
  variant?: "default" | "icon";
}

const V0Icon = () => (
  <svg
    viewBox="0 0 40 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-current"
  >
    <path
      d="M23.3919 0H32.9188C36.7819 0 39.9136 3.13165 39.9136 6.99475V16.0805H36.0006V6.99475C36.0006 6.90167 35.9969 6.80925 35.9898 6.71766L26.4628 16.079C26.4949 16.08 26.5272 16.0805 26.5595 16.0805H36.0006V19.7762H26.5595C22.6964 19.7762 19.4788 16.6139 19.4788 12.7508V3.68923H23.3919V12.7508C23.3919 12.9253 23.4054 13.0977 23.4316 13.2668L33.1682 3.6995C33.0861 3.6927 33.003 3.68923 32.9188 3.68923H23.3919V0Z"
      fill="currentColor"
    />
    <path
      d="M13.7688 19.0956L0 3.68759H5.53933L13.6231 12.7337V3.68759H17.7535V17.5746C17.7535 19.6705 15.1654 20.6584 13.7688 19.0956Z"
      fill="currentColor"
    />
  </svg>
);

export function V0Button({
  componentSource,
  className,
  variant = "default",
}: V0ButtonProps) {
  const href = `https://v0.dev/chat/api/open?url=${encodeURIComponent(componentSource)}`;

  if (variant === "icon") {
    return (
      <TooltipProvider>
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <Link
              href={href}
              target="_blank"
              rel="noreferrer"
              className="text-zinc-600 transition-colors hover:text-black dark:text-zinc-400 dark:hover:text-white"
              aria-label="Open in v0"
            >
              <V0Icon />
            </Link>
          </TooltipTrigger>
          <TooltipContent>Open in v0</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <Link
      className={cn(
        buttonVariants({ size: "sm" }),
        "h-7 gap-1 rounded-lg bg-black px-3 text-white text-xs shadow-none hover:bg-black hover:text-white dark:bg-white dark:text-black",
        className,
      )}
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Open in v0"
    >
      Open in <V0Icon />
    </Link>
  );
}

import { cn } from "@/lib/utils";

type PackageManager = "npm" | "yarn" | "pnpm" | "bun";

// Single-colour marks (currentColor) so they sit quietly in the tab row and
// pick up the active/inactive text colour.
export function PackageManagerIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const props = {
    "aria-hidden": true,
    className: cn("size-3.5", className),
    fill: "currentColor",
    viewBox: "0 0 24 24",
  } as const;

  switch (name as PackageManager) {
    case "npm":
      return (
        <svg {...props}>
          <path d="M1.763 0C.786 0 0 .786 0 1.763v20.474C0 23.214.786 24 1.763 24h20.474c.977 0 1.763-.786 1.763-1.763V1.763C24 .786 23.214 0 22.237 0zM5.13 5.323l13.837.019-.009 13.836h-3.464l.01-10.382h-3.456L12.04 19.17H5.113z" />
        </svg>
      );
    case "pnpm":
      return (
        <svg {...props}>
          <path d="M0 0v7.5h7.5V0zm8.25 0v7.5h7.498V0zm8.25 0v7.5H24V0zM8.25 8.25v7.5h7.498v-7.5zm8.25 0v7.5H24v-7.5zM0 16.5V24h7.5v-7.5zm8.25 0V24h7.498v-7.5zm8.25 0V24H24v-7.5z" />
        </svg>
      );
    case "yarn":
      return (
        <svg {...props}>
          <path
            clipRule="evenodd"
            d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12Zm.6-17.4c-.9 0-1.7.5-2.3 1.2-.8.2-1.5.6-2 1.3-.5.8-.7 1.7-.6 2.6-.5.5-.8 1.2-.6 2 .1.6.6 1 1.1 1.2-.1.7.1 1.4.7 1.8.5.4 1.2.4 1.8.3.5.9 1.4 1.4 2.5 1.4 1 0 1.8-.5 2.2-1.3 1.6-.3 3-1.4 3.7-3 .5-1.2.4-2.2-.2-2.7-.3-.3-.8-.4-1.3-.3-.1-1.1-.7-2-1.6-2.5-.3-.7-.9-1.2-1.7-1.3-.4 0-.7.2-1 .4-.2-.1-.4-.1-.7-.1Z"
            fillRule="evenodd"
          />
        </svg>
      );
    case "bun":
      return (
        <svg {...props}>
          <path
            clipRule="evenodd"
            d="M12 22.5c5.5 0 10-3.4 10-7.9 0-2.7-1.6-4.8-3.4-6.5C16.5 6.2 14.5 3 12 3S7.5 6.2 5.4 8.1C3.6 9.8 2 11.9 2 14.6c0 4.5 4.5 7.9 10 7.9ZM8.5 14.2a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4Zm7 0a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4Zm-5 2.1c.4.8 1 1.2 1.5 1.2s1.1-.4 1.5-1.2c.1-.2-.1-.4-.3-.3-.4.3-.8.4-1.2.4s-.8-.1-1.2-.4c-.2-.1-.4.1-.3.3Z"
            fillRule="evenodd"
          />
        </svg>
      );
    default:
      return null;
  }
}

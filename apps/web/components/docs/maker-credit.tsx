import { avatarOf, getMaker, profileOf } from "@/lib/makers";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipPopup, TooltipTrigger } from "@/registry/ui/tooltip";

/**
 * Whose work this is, linking to their X profile.
 *
 * `avatar` is just the face, with their name in a tooltip, for a card where a
 * label would cover the preview. `full` adds the handle, for under a page's
 * title where there is room.
 */
export function MakerCredit({
  maker,
  variant = "full",
  className,
}: {
  /** A key of `MAKERS` in lib/makers.ts. */
  maker?: string;
  variant?: "avatar" | "full";
  className?: string;
}) {
  const person = getMaker(maker);
  if (!person) return null;

  const avatar = (size: string) => (
    // biome-ignore lint/performance/noImgElement: a small avatar from GitHub's CDN, not worth a remote image pattern
    <img
      alt=""
      className={cn("rounded-full bg-muted", size)}
      height={20}
      loading="lazy"
      src={avatarOf(person)}
      width={20}
    />
  );

  if (variant === "avatar") {
    return (
      <Tooltip>
        <TooltipTrigger
          render={
            <a
              aria-label={`${person.name} on X`}
              className={cn(
                "rounded-full shadow-sm ring-1 ring-background transition-transform duration-200 hover:scale-125 focus-visible:outline-none focus-visible:ring-ring",
                className,
              )}
              href={profileOf(person)}
              rel="noreferrer"
              target="_blank"
            >
              {avatar("size-5")}
            </a>
          }
        />
        <TooltipPopup side="top">
          {person.name} · @{person.x}
        </TooltipPopup>
      </Tooltip>
    );
  }

  return (
    <a
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full bg-background/85 py-0.5 pr-2.5 pl-0.5 text-muted-foreground text-xs shadow-[0_0_0_1px_color-mix(in_oklab,var(--foreground)_8%,transparent)] backdrop-blur-sm transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className,
      )}
      href={profileOf(person)}
      rel="noreferrer"
      target="_blank"
      title={`${person.name} on X`}
    >
      {avatar("size-5")}
      <span>@{person.x}</span>
    </a>
  );
}

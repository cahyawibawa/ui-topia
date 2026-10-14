import { CopyButton } from "@/components/copy-button";
import { cn } from "@/lib/utils";
import { getIconForLanguageExtension } from "@/registry/components/icons";

export function Callout({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "my-6 rounded-xl border bg-muted/50 px-4 py-3 text-sm [&>p]:m-0",
        className,
      )}
      {...props}
    />
  );
}

export function Steps({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "steps relative my-6 ml-4 border-l pl-8 [counter-reset:step] [&>:not(:first-child)]:mt-6",
        className,
      )}
      {...props}
    />
  );
}

export function Step({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "before:-left-4 font-medium text-foreground [counter-increment:step] before:absolute before:flex before:size-8 before:items-center before:justify-center before:rounded-full before:bg-muted before:font-medium before:text-sm before:content-[counter(step)]",
        className,
      )}
      {...props}
    />
  );
}

type PreProps = React.ComponentProps<"pre"> & {
  "data-title"?: string;
  "data-language"?: string;
  "data-raw"?: string;
};

/** Block code: header with the fence's `title`, copy button, scroll area. */
export function DocsPre({
  "data-title": title,
  "data-language": language,
  "data-raw": raw,
  className,
  ref: _ref,
  ...props
}: PreProps) {
  return (
    <figure
      data-rehype-pretty-code-figure=""
      className="shiki not-prose group/code"
    >
      {title && (
        <figcaption
          data-rehype-pretty-code-title=""
          data-language={language}
          className="flex items-center gap-2 text-code-foreground [&_svg]:size-4 [&_svg]:opacity-70"
        >
          {language ? getIconForLanguageExtension(language) : null}
          {title}
        </figcaption>
      )}
      {raw ? <CopyButton value={raw} /> : null}
      <pre
        className={cn(
          "no-scrollbar overflow-x-auto px-4 py-3.5 text-[13px] leading-relaxed",
          className,
        )}
        {...props}
      />
    </figure>
  );
}

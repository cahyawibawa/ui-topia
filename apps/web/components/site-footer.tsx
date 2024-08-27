import { siteConfig } from "@/config/site";

export function SiteFooter() {
  const currentYear = new Date().getFullYear();
  return (
    <footer>
      <div className="flex flex-col items-start justify-between gap-2 py-6 md:h-24">
        <div className="flex w-full flex-col items-start justify-between sm:flex-row sm:items-start">
          <div className="mb-2 flex flex-col sm:mb-0">
            <span className="font-redaction text-muted-foreground text-sm">
              Built with Next.js
            </span>
            <p className="font-redaction text-muted-foreground mt-1 text-sm">
              Inspired from{" "}
              <a
                href="https://github.com/shadcn/ui"
                target="_blank"
                rel="noreferrer"
                className="font-medium no-underline hover:underline"
              >
                shadcn/ui
              </a>{" "}
              and{" "}
              <a
                href="https://github.com/ibelick/buttons"
                target="_blank"
                rel="noreferrer"
                className="font-medium no-underline hover:underline"
              >
                buttons-ibelick.
              </a>
            </p>
          </div>
          <span className="font-redaction text-muted-foreground mt-2 flex items-center space-x-1 text-sm sm:mt-0">
            <a
              href={siteConfig.links.portfolio}
              target="_blank"
              rel="noreferrer"
              className="font-medium no-underline hover:underline"
            >
              Cahya Wibawa
            </a>
            <span>• {currentYear}</span>
          </span>
        </div>
      </div>
    </footer>
  );
}

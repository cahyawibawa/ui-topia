import { baseOptions } from "@/app/layout-config";
import { siteConfig } from "@/config/site";
import { HomeLayout } from "fumadocs-ui/layouts/home";
import type { ReactNode } from "react";

export default function Layout({
  children,
}: {
  children: ReactNode;
}): React.ReactElement {
  return (
    <HomeLayout {...baseOptions}>
      {children}
      <div
        className="2xl:!px-0 hidden justify-center xl:flex"
        style={{ padding: "0 11.5vw" }}
      >
        <img
          src="/images/rapid-dev-lines-top.svg"
          alt=""
          className="h-auto object-contain dark:invert"
        />
      </div>
      <Footer />
    </HomeLayout>
  );
}

function Footer(): React.ReactElement {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="container mt-auto bg-fd-card text-fd-secondary-foreground">
      <div className="flex flex-col items-start justify-between gap-2 py-6 md:h-24">
        <div className="flex w-full flex-col items-start justify-between sm:flex-row sm:items-start">
          <div className="mb-2 flex flex-col sm:mb-0">
            <span className="font-redaction text-muted-foreground text-sm">
              Built with Next.js
            </span>
            <p className="mt-1 font-redaction text-muted-foreground text-sm">
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
          <span className="mt-2 flex items-center space-x-1 font-redaction text-muted-foreground text-sm sm:mt-0">
            <a
              href={siteConfig.links.portfolio}
              // biome-ignore lint/a11y/noBlankTarget: <explanation>
              target="_blank"
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

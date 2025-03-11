import { baseOptions } from "@/app/layout.config";
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
      <Footer />
    </HomeLayout>
  );
}

function Footer(): React.ReactElement {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="border-grid border-t py-6 md:py-0">
      <div className="container-wrapper">
        <div className="container">
          <div className="flex flex-col items-start justify-between gap-2 py-4">
            <div className="flex w-full flex-col items-start justify-between sm:flex-row sm:items-start">
              <div className="mb-2 flex flex-col sm:mb-0">
                <span className="font-redaction text-muted-foreground text-sm">
                  Built with Next.js
                </span>
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
        </div>
      </div>
    </footer>
  );
}

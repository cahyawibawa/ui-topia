import { Analytics } from "@vercel/analytics/react";
import { RootProvider } from "fumadocs-ui/provider";
import type { Viewport } from "next";
import { fontVariables } from "@/lib/fonts";
import { createMetadata } from "@/lib/metadata";
import "styles/globals.css";

export const metadata = createMetadata({});

export const viewport: Viewport = {
  colorScheme: "dark light",
  themeColor: [
    { color: "white", media: "(prefers-color-scheme: light)" },
    { color: "black", media: "(prefers-color-scheme: dark)" },
  ],
};

interface RootLayoutProps {
  children: React.ReactNode;
}
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html className={fontVariables} lang="en" suppressHydrationWarning>
      <body className="min-h-svh bg-background font-sans antialiased">
        <RootProvider
          search={{
            hotKey: [
              {
                display: "/",
                key: "/",
              },
            ],
          }}
        >
          <div className="relative flex min-h-svh flex-col bg-background">
            {children}
          </div>
          <Analytics />
        </RootProvider>
      </body>
    </html>
  );
}

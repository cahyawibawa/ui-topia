import { Analytics } from "@vercel/analytics/react";
import { RootProvider } from "fumadocs-ui/provider/next";
import type { Viewport } from "next";
import Script from "next/script";
import { fontVariables } from "@/lib/fonts";
import { createMetadata } from "@/lib/metadata";
import { ToastProvider } from "@/registry/ui/toast";
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
      <head>
        {process.env.NODE_ENV === "development" && (
          <Script
            src="//unpkg.com/react-grab/dist/index.global.js"
            crossOrigin="anonymous"
            strategy="beforeInteractive"
            data-enabled="true"
          />
        )}
      </head>
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
          <ToastProvider>
            <div className="relative flex min-h-svh flex-col bg-background">
              {children}
            </div>
            <Analytics />
          </ToastProvider>
        </RootProvider>
      </body>
    </html>
  );
}

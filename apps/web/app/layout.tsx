import { Analytics } from "@vercel/analytics/react";
import { RootProvider } from "fumadocs-ui/provider";
import type { Viewport } from "next";
import { geistMono, geistSans, Redaction } from "@/lib/fonts";
import { createMetadata } from "@/lib/metadata";
import "styles/globals.css";

export const metadata = createMetadata({});

export const viewport: Viewport = {
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

interface RootLayoutProps {
  children: React.ReactNode;
}
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${Redaction.variable}`}
    >
      <body className="min-h-svh bg-background font-sans antialiased">
        <RootProvider>
          <div className="relative flex min-h-svh flex-col bg-background">
            {children}
          </div>
          <Analytics />
        </RootProvider>
      </body>
    </html>
  );
}

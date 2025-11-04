import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import { cn } from "@/lib/utils";

export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const inter = localFont({
  src: [
    {
      path: "../assets/fonts/InterVariableFont.woff2",
      weight: "100 900",
      style: "normal",
    },
    {
      path: "../assets/fonts/InterVariableItalic.woff2",
      weight: "100 900",
      style: "italic",
    },
  ],
  variable: "--font-inter",
  display: "swap",
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const Redaction = localFont({
  src: "../assets/fonts/Redaction_35-Regular.woff2",
  variable: "--font-redaction",
});

export const fontVariables = cn(
  geistSans.variable,
  inter.variable,
  geistMono.variable,
  Redaction.variable,
);

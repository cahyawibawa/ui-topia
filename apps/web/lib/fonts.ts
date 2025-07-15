import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import { cn } from "@/lib/utils";

export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const Redaction = localFont({
  src: "../assets/fonts/Redaction_35-Regular.woff2",
  variable: "--font-redaction",
});

export const openRunde = localFont({
  src: [
    {
      path: "../assets/fonts/OpenRunde-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/OpenRunde-Medium.otf",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-open-runde",
});

export const fontVariables = cn(
  geistSans.variable,
  geistMono.variable,
  Redaction.variable,
  openRunde.variable,
);

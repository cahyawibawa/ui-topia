import { Plus_Jakarta_Sans as FontHeading } from "next/font/google";
import localFont from "next/font/local";

export const fontHeading = FontHeading({
  subsets: ["latin"],
  variable: "--font-heading",
});

export const fontRedaction = localFont({
  src: "../public/fonts/Redaction_35-Regular.woff2",
  variable: "--font-redaction",
});

import { ExamplesNav } from "@/components/examples-nav";
import { Hero } from "@/components/hero";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Elements",
  description: "Check out some element components.",
};

interface ExamplesLayoutProps {
  children: React.ReactNode;
}

export default function ExamplesLayout({ children }: ExamplesLayoutProps) {
  return (
    <div className="container relative">
      <Hero />
      <ExamplesNav />
      {children}
    </div>
  );
}

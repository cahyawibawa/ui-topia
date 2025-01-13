"use client";

import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

import { buttonVariants } from "@/uitopia/button";
import TextLoop from "@/uitopia/elements/texts/text-loop";
import { motion } from "motion/react";
import Link from "next/link";
import { Suspense, lazy, useEffect, useState } from "react";

const LazySpline = lazy(() => import("@splinetool/react-spline"));

export function Hero() {
  const [showSpline, setShowSpline] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // Assuming 1024px is the breakpoint for lg
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    // Don't show on mobile
    if (!isMobile) {
      const timer = setTimeout(() => {
        setShowSpline(true);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isMobile]);
  return (
    <section className="my-5" id="hero">
      <div className="relative grid w-full grid-cols-1 gap-x-8 overflow-hidden lg:grid-cols-2">
        <div className="lg:col-span-1">
          <HeroCTA />
        </div>
        {!isMobile && (
          <div className="relative items-end justify-end lg:col-span-1 lg:h-full">
            <Suspense>
              {showSpline && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  <LazySpline
                    scene="https://prod.spline.design/mZBrYNcnoESGlTUG/scene.splinecode"
                    className="absolute inset-0 flex size-full origin-top-right items-center justify-center"
                  />
                </motion.div>
              )}
            </Suspense>
          </div>
        )}
      </div>
    </section>
  );
}

function HeroCTA() {
  return (
    <PageHeader>
      <PageHeaderHeading>
        Craft a website that's
        <br />
        <TextLoop
          className="overflow-y-clip"
          transition={{
            type: "spring",
            stiffness: 900,
            damping: 80,
            mass: 10,
          }}
          interval={2.5}
          variants={{
            initial: {
              y: 20,
              rotateX: 90,
              opacity: 0,
              filter: "blur(4px)",
            },
            animate: {
              y: 0,
              rotateX: 0,
              opacity: 1,
              filter: "blur(0px)",
            },
            exit: {
              y: -20,
              rotateX: -90,
              opacity: 0,
              filter: "blur(4px)",
            },
          }}
        >
          <span>Shiny</span>
          <span>Intuitive</span>
          <span>Effortless</span>
        </TextLoop>
      </PageHeaderHeading>
      <PageHeaderDescription>
        A collection of experimental UI components, made with Motion and
        Tailwind CSS. Open source.
      </PageHeaderDescription>
      <PageActions>
        <Link
          href="/docs"
          className={cn(
            buttonVariants({ variant: "default", size: "sm" }),
            "rounded-xl text-xs",
          )}
        >
          Explore now
        </Link>
        <Link
          target="_blank"
          rel="noreferrer"
          href={siteConfig.links.github}
          className={cn(
            buttonVariants({ variant: "secondary", size: "sm" }),
            "rounded-xl text-xs",
          )}
        >
          GitHub
        </Link>
      </PageActions>
    </PageHeader>
  );
}

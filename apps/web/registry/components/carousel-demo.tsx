"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  type Transition,
} from "motion/react";
import Image from "next/image";
import React from "react";
import { cn } from "@/lib/utils";

const Context = React.createContext<{
  index: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  status: string;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
}>({ index: 0, setIndex: () => null, status: "", setStatus: () => null });

const transition: Transition = { type: "spring", bounce: 0, duration: 0.4 };

const locationData = [
  {
    title: "Orlando Beach",
    city: "Orlando",
    state: "FL",
    image:
      "https://cdn.cosmos.so/7b0aa647-a0b4-4f2b-99c6-eeff0639c8be?format=jpeg",
  },
  {
    title: "Mount Elbert",
    city: "Leadville",
    state: "CO",
    image:
      "https://cdn.cosmos.so/a81ea288-a19e-4194-a41d-a52328016206?format=jpeg",
  },
  {
    title: "Mount Rainier",
    city: "Paradise",
    state: "WA",
    image:
      "https://cdn.cosmos.so/5f8d5539-943c-4df5-bae8-8e714633ddd0?format=jpeg",
  },
  {
    title: "Galt Ranch",
    city: "White Sulphur Springs",
    state: "MT",
    image:
      "https://cdn.cosmos.so/f39c5da6-1a38-40ab-8ec4-3ac25a907cd6?format=jpeg",
  },
];

function NavigationIndicator() {
  const ctx = React.useContext(Context);

  return (
    <div className="absolute top-0 right-0 z-10 flex gap-1 p-[75px] px-16">
      <div
        className={cn(
          "h-[3px] w-3.5 rounded-full bg-white/30 transition-colors",
          {
            "bg-white": ctx.index === 0,
          },
        )}
      />
      <div
        className={cn(
          "h-[3px] w-3.5 rounded-full bg-white/30 transition-colors",
          {
            "bg-white": ctx.index === 1,
          },
        )}
      />
      <div
        className={cn(
          "h-[3px] w-3.5 rounded-full bg-white/30 transition-colors",
          {
            "bg-white": ctx.index === 2,
          },
        )}
      />
      <div
        className={cn(
          "h-[3px] w-3.5 rounded-full bg-white/30 transition-colors",
          {
            "bg-white": ctx.index === 3,
          },
        )}
      />
    </div>
  );
}

function PreviousButton() {
  const ctx = React.useContext(Context);

  function handlePreviousClick() {
    if (ctx.index <= 0) return;
    ctx.setIndex((prev) => prev - 1);
  }

  return (
    <button
      aria-label="Previous"
      type="button"
      onMouseDown={() => ctx.setStatus("pressing-previous")}
      onMouseUp={() => ctx.setStatus("idle")}
      onClick={handlePreviousClick}
      className="group absolute top-0 left-0 isolate flex h-full w-1/3 items-center pl-8"
    >
      <div className="absolute top-0 left-0 size-full opacity-0 backdrop-blur-md transition-opacity duration-500 ease-out [mask:linear-gradient(90deg,rgba(0,0,0,1)_0%,rgba(0,0,0,0)_100%)] group-hover:opacity-100" />
      <div className="absolute top-0 left-0 size-full bg-gradient-to-r from-black/10 opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100" />
      <ChevronLeft className="z-10 size-8 text-white/30 transition-colors duration-500 ease-out group-hover:text-white" />
    </button>
  );
}

function NextButton() {
  const ctx = React.useContext(Context);

  function handleNextClick() {
    if (ctx.index >= 3) return;
    ctx.setIndex((prev) => prev + 1);
  }

  return (
    <button
      aria-label="Next"
      type="button"
      onMouseDown={() => ctx.setStatus("pressing-next")}
      onMouseUp={() => ctx.setStatus("idle")}
      onClick={handleNextClick}
      className="group absolute top-0 right-0 isolate flex h-full w-1/3 items-center justify-end pr-8"
    >
      <div className="absolute top-0 left-0 size-full opacity-0 backdrop-blur-md transition-opacity duration-500 ease-out [mask:linear-gradient(270deg,rgba(0,0,0,1)_0%,rgba(0,0,0,0)_100%)] group-hover:opacity-100" />
      <div className="absolute top-0 left-0 size-full bg-gradient-to-l from-black/10 opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100" />
      <ChevronRight className="z-10 size-8 text-white/30 transition-colors duration-500 ease-out group-hover:text-white" />
    </button>
  );
}

function InnerContent() {
  const ctx = React.useContext(Context);
  const location = locationData[ctx.index];
  const isPressingNext = ctx.status === "pressing-next";
  const isPressingPrevious = ctx.status === "pressing-previous";

  return (
    <div className="relative isolate size-[300px] overflow-hidden rounded-[100px] border border-[#cacaca] bg-[#e3e3e3] font-medium tracking-tight shadow-[0_3px_3px_-1.5px_rgba(0,0,0,0.06)]">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={ctx.index}
          initial={{
            // opacity: 0,
            filter: "blur(8px)",
            transform: "perspective(1000px) rotateY(0deg)",
          }}
          animate={
            isPressingNext
              ? {
                  transform: "perspective(800px) rotateY(10deg)",
                  // opacity: 1,
                  filter: "blur(0px)",
                }
              : isPressingPrevious
                ? {
                    transform: "perspective(800px) rotateY(-10deg)",
                    // opacity: 1,
                    filter: "blur(0px)",
                  }
                : { filter: "blur(0px)" }
          }
          exit={{ filter: "blur(8px)" }}
          className="relative size-full"
        >
          <Image
            src={location?.image ?? ""}
            alt={location?.title ?? ""}
            className="size-full scale-150 object-cover"
            width={300}
            height={300}
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute top-0 left-0 z-0 h-1/2 w-full backdrop-blur-md [mask:linear-gradient(180deg,rgba(0,0,0,1)_0%,rgba(0,0,0,0)_100%)]" />
      <div className="absolute top-0 left-0 z-0 h-1/2 w-full bg-gradient-to-b from-black/40" />

      <motion.div
        initial={{
          transform: "perspective(1000px) rotateY(0deg)",
        }}
        animate={
          isPressingNext
            ? {
                transform: "perspective(800px) rotateY(20deg)",
              }
            : isPressingPrevious
              ? {
                  transform: "perspective(800px) rotateY(-20deg)",
                }
              : {}
        }
        className="absolute top-0 left-0 z-20 w-full p-14 px-16"
      >
        <p className="font-normal text-white text-xl leading-[1.4] tracking-wide">
          {location?.title}
          <br />
          {location?.city}
          <br />
          {location?.state}
        </p>
      </motion.div>

      <NavigationIndicator />

      <PreviousButton />

      <NextButton />
    </div>
  );
}

export default function CarouselDemo() {
  const [index, setIndex] = React.useState(2);
  const [status, setStatus] = React.useState("idle");

  React.useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setStatus("idle");
      }
    }
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [setStatus]);

  return (
    <Context.Provider value={{ index, setIndex, status, setStatus }}>
      <MotionConfig transition={transition}>
        <InnerContent />
      </MotionConfig>
    </Context.Provider>
  );
}

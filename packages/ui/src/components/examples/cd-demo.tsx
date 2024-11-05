"use client";

import { MotionConfig, type Transition, motion } from "framer-motion";
import MotionNumber from "motion-number";
import Image from "next/image";
import React from "react";


const Context = React.createContext<{
  status: string;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
}>({ status: "", setStatus: () => null });

const transition: Transition = { type: "spring", bounce: 0, duration: 0.4 };

function CD() {
  const ctx = React.useContext(Context);
  const isPressed = ctx.status === "pressed";
  const [active, setActive] = React.useState(false);

  return (
    <motion.div
      initial={{ rotate: 0, x: "-50%", y: -245, borderRadius: 250 }}
      animate={
        isPressed
          ? {
            y: -245,
            transition: { ...transition, duration: 1.2 },
          }
          : active
            ? {
              rotate: 0,
              width: "100%",
              height: "100%",
              y: 0,
              borderRadius: 0,
              border: 0,
              transition: { ...transition, duration: 1.2 },
            }
            : {
              rotate: 360,
              y: -245,
              transition: {
                ease: "linear",
                duration: 5,
                repeat: Number.POSITIVE_INFINITY,
              },
            }
      }
      whileHover={{
        scale: 1.03,
      }}
      onTapStart={() => {
        ctx.setStatus("pressed");
      }}
      onTap={() => {
        setActive((prev) => !prev);
        ctx.setStatus("idle");
      }}
      onTapCancel={() => {
        setActive(false);
        ctx.setStatus("idle");
      }}
      className="absolute left-1/2 z-10 flex size-[500px] origin-center select-none items-center justify-center overflow-hidden border-2 border-[#a89f9f] bg-gray-400 shadow-[0_0_200px_-20px_rgba(0,0,0,0.6)]"
    >
      <Image
        src="/images/currents-evangelion.jpg"
        alt="currents album"
        className="pointer-events-none select-none object-cover"
        width={500}
        height={500}
      />
      <motion.div
        animate={active ? { opacity: 0 } : {}}
        className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 flex items-center justify-center"
      >
        <div className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 size-[150px] rounded-full bg-gray-500/20 backdrop-blur-sm" />
        <div className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 size-[143px] rounded-full border-[5px] border-gray-200/10 border-dotted" />
        <div className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 size-[127px] rounded-full border-[1.5px] border-white bg-[#9799a5]" />
        <div className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 size-[85px] rounded-full bg-[#c9c2c7]" />
        <div className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 size-[70px] rounded-full bg-[#c9c2c7]" />
        <div className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 size-[67px] rounded-full bg-[#e3dee4]" />
        <div className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 size-[60px] rounded-full border-2 border-[#a6a4a5] bg-[#bebcba] shadow-[0_0_24px_-12px_rgba(0,0,0,0.25)_inset]" />
      </motion.div>
    </motion.div>
  );
}

export default function HomePage() {
  const [status, setStatus] = React.useState("idle");
  const [time, setTime] = React.useState(10);
  const isNotIdle = status !== "idle";

  React.useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setStatus("idle");
      }
    }
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [setStatus]);

  React.useEffect(() => {
    const interval = setInterval(() => setTime((prev) => prev + 1), 1000);
    return () => clearInterval(interval);
  }, [setTime]);

  return (
    <Context.Provider value={{ status, setStatus }}>
      <MotionConfig transition={transition}>

        <div className="relative size-[500px] overflow-hidden rounded-3xl border border-[#cacaca] bg-[#e3e3e3] font-medium tracking-tight shadow-[0_3px_3px_-1.5px_rgba(0,0,0,0.06)]">
          <CD />
          <motion.div
            animate={isNotIdle ? { scale: 0.95, filter: "blur(4px)" } : {}}
            className="absolute bottom-10 flex w-full flex-col items-center gap-5"
          >
            <div className="relative flex h-8 w-fit items-center justify-center gap-1">
              <motion.div
                initial={{ height: 16 }}
                animate={{
                  height: 4,
                  transition: {
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                    duration: 1,
                    type: "linear",
                  },
                }}
                className="h-8 w-1 rounded-full bg-[#999592]"
              />
              <motion.div
                initial={{ height: 4 }}
                animate={{
                  height: 32,
                  transition: {
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                    duration: 1.5,
                    type: "linear",
                  },
                }}
                className="h-8 w-1 rounded-full bg-[#999592]"
              />
              <motion.div
                initial={{ height: 12 }}
                animate={{
                  height: 4,
                  transition: {
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                    duration: 0.8,
                    type: "linear",
                  },
                }}
                className="h-3 w-1 rounded-full bg-[#999592]"
              />
              <motion.div
                initial={{ height: 4 }}
                animate={{
                  height: 24,
                  transition: {
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                    duration: 1.8,
                    type: "linear",
                  },
                }}
                className="h-6 w-1 rounded-full bg-[#999592]"
              />
              <motion.div
                initial={{ height: 8 }}
                animate={{
                  height: 4,
                  transition: {
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                    duration: 0.6,
                    type: "linear",
                  },
                }}
                className="h-2 w-1 rounded-full bg-[#999592]"
              />
            </div>

            <div className="flex flex-col items-center gap-2 text-2xl">
              <p className="text-[#a09c99]">Tame Impala</p>
              <p className="text-[#272622]">Reality in Motion</p>
              <div className="relative h-[3px] w-9 bg-[#cbc7c6]">
                <motion.div
                  initial={{ width: "45%" }}
                  animate={{ width: "50%", transition: { duration: 12 } }}
                  className="absolute top-0 left-0 h-full bg-[#7a787a]"
                />
              </div>
              <p className="text-[#272622]">
                <span className="text-[#272622]">
                  1:
                  <MotionNumber value={time} />
                </span>
                <span className="px-[0.7ch] text-[#a5a3a1]">/</span>
                <span className="text-[#a5a3a1]">4:12</span>
              </p>
            </div>
          </motion.div>
        </div>
      </MotionConfig>
    </Context.Provider>
  );
}

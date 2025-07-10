"use client";

import NumberFlow from "@number-flow/react";
import { MotionConfig, motion, type Transition } from "motion/react";
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
      initial={{ rotate: 0, x: "-50%", y: -108, borderRadius: 110 }}
      animate={
        isPressed
          ? {
              y: -108,
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
                y: -108,
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
      className="absolute left-1/2 z-10 flex size-[220px] origin-center select-none items-center justify-center overflow-hidden border border-[#a89f9f] bg-gray-400 shadow-[0_0_60px_-10px_rgba(0,0,0,0.6)]"
    >
      <Image
        src="/images/currents-evangelion.jpg"
        alt="currents album"
        className="pointer-events-none select-none object-cover"
        width={220}
        height={220}
      />
      <motion.div
        animate={active ? { opacity: 0 } : {}}
        className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 flex items-center justify-center"
      >
        <div className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 size-[66px] rounded-full bg-gray-500/20 backdrop-blur-sm" />
        <div className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 size-[62px] rounded-full border-[2.5px] border-gray-200/10 border-dotted" />
        <div className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 size-[55px] rounded-full border border-white bg-[#9799a5]" />
        <div className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 size-[37px] rounded-full bg-[#c9c2c7]" />
        <div className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 size-[30px] rounded-full bg-[#c9c2c7]" />
        <div className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 size-[28px] rounded-full bg-[#e3dee4]" />
        <div className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 size-[24px] rounded-full border border-[#a6a4a5] bg-[#bebcba] shadow-[0_0_8px_-4px_rgba(0,0,0,0.25)_inset]" />
      </motion.div>
    </motion.div>
  );
}

export default function CDPlayer() {
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
        <div className="relative size-[220px] overflow-hidden rounded-2xl border border-[#cacaca] bg-[#e3e3e3] font-medium tracking-tight shadow-[0_2px_6px_-1.5px_rgba(0,0,0,0.06)]">
          <CD />
          <motion.div
            animate={isNotIdle ? { scale: 0.95, filter: "blur(2px)" } : {}}
            className="absolute bottom-4 flex w-full flex-col items-center gap-2"
          >
            <div className="relative flex h-4 w-fit items-center justify-center gap-0.5">
              <motion.div
                initial={{ height: 8 }}
                animate={{
                  height: 2,
                  transition: {
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                    duration: 1,
                    type: "linear",
                  },
                }}
                className="h-4 w-0.5 rounded-full bg-[#999592]"
              />
              <motion.div
                initial={{ height: 2 }}
                animate={{
                  height: 14,
                  transition: {
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                    duration: 1.5,
                    type: "linear",
                  },
                }}
                className="h-4 w-0.5 rounded-full bg-[#999592]"
              />
              <motion.div
                initial={{ height: 5 }}
                animate={{
                  height: 2,
                  transition: {
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                    duration: 0.8,
                    type: "linear",
                  },
                }}
                className="h-2 w-0.5 rounded-full bg-[#999592]"
              />
              <motion.div
                initial={{ height: 2 }}
                animate={{
                  height: 10,
                  transition: {
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                    duration: 1.8,
                    type: "linear",
                  },
                }}
                className="h-3 w-0.5 rounded-full bg-[#999592]"
              />
              <motion.div
                initial={{ height: 3 }}
                animate={{
                  height: 2,
                  transition: {
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                    duration: 0.6,
                    type: "linear",
                  },
                }}
                className="h-1 w-0.5 rounded-full bg-[#999592]"
              />
            </div>

            <div className="flex flex-col items-center gap-1 text-xs">
              <p className="text-[#a09c99]">Tame Impala</p>
              <p className="font-medium text-[#272622]">Reality in Motion</p>
              <div className="relative h-[2px] w-6 bg-[#cbc7c6]">
                <motion.div
                  initial={{ width: "45%" }}
                  animate={{ width: "50%", transition: { duration: 12 } }}
                  className="absolute top-0 left-0 h-full bg-[#7a787a]"
                />
              </div>
              <p className="text-[#272622]">
                <span className="text-[#272622]">
                  1:
                  <NumberFlow value={time} />
                </span>
                <span className="px-[0.3ch] text-[#a5a3a1]">/</span>
                <span className="text-[#a5a3a1]">4:12</span>
              </p>
            </div>
          </motion.div>
        </div>
      </MotionConfig>
    </Context.Provider>
  );
}

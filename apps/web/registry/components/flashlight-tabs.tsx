"use client";

import { motion } from "motion/react";
import { useMemo, useState } from "react";

import { cn } from "@/lib/utils";

const buttons = [
  "Dashboard",
  "Analytics",
  "Documents",
  "Notifications",
  "Profile",
];

export const FlashlightTabs = () => {
  const [activeButton, setActiveButton] = useState(buttons[2]);

  const coveredPercentage = useMemo(() => {
    const indexOfActiveButton = buttons.indexOf(activeButton!);
    return (indexOfActiveButton / (buttons.length - 1)) * 100;
  }, [activeButton]);

  return (
    <div className="flex items-center justify-center overflow-hidden rounded-lg border border-[hsl(0_0%_15.8%)] bg-[hsl(0_0%_11.0%)] p-6">
      <div
        className={cn(
          "relative flex h-[48px] w-fit rounded-full border border-[hsl(0_0%_20.5%)] shadow-[0_5px_10px_rgba(0,0,0,0.12)]",
          "after:-bottom-px after:pointer-events-none after:absolute after:left-0 after:z-1 after:h-full after:w-full after:rounded-full after:will-change-[background-position-x] after:[background-image:linear-gradient(to_left,#343434_20%,#343434_44%,#a0a0a0_50%,#7e7e7e_55%,#343434_63%,#343434_100%)] after:[background-position-x:var(--after-background-position-x)] after:[background-size:200%] after:[transition:background-position-x_500ms_ease]",
        )}
        style={
          {
            "--after-background-position-x": `${100 - coveredPercentage - 2}%`,
          } as React.CSSProperties
        }
      >
        <div
          aria-hidden
          className="absolute top-[-1px] z-1 mx-auto h-px w-full opacity-60 [background:linear-gradient(90deg,rgba(0,0,0,0),hsl(0_0%_20.5%)_20%,hsl(0_0%_49.4%)_67.19%,rgba(0,0,0,0))]"
        />
        <div
          className={cn(
            "relative z-2 flex overflow-hidden rounded-full bg-[hsl(0_0%_11.0%)] p-[5px]",
          )}
        >
          {buttons.map((button, index) => {
            return (
              <button
                key={button}
                className={cn(
                  "relative flex cursor-pointer items-center justify-center px-3 text-[#a0a0a0] text-[15px] [transition:color_150ms,text-shadow_250ms] hover:text-[#ededed]",
                  activeButton === button
                    ? "text-[#ededed] [text-shadow:1px_1px_2px_rgba(255,255,255,0.57)]"
                    : "",
                )}
                onClick={() => setActiveButton(button)}
              >
                {button}

                {activeButton === button && (
                  <>
                    <motion.div
                      layoutId="bg-indicator"
                      className="absolute top-0 left-0 z-6 h-full w-full rounded-xl bg-[hsl(0_0%_100%/0.056)] px-3 [transition:backdrop-filter_500ms]"
                      animate={{
                        borderTopLeftRadius:
                          index === buttons.length - 1 ? "120px" : "500px",
                        borderBottomLeftRadius:
                          index === buttons.length - 1 ? "120px" : "500px",
                        borderTopRightRadius: index === 0 ? "120px" : "500px",
                        borderBottomRightRadius:
                          index === 0 ? "120px" : "500px",
                      }}
                      transition={{
                        duration: 0.3,
                      }}
                    />
                    <motion.div
                      layoutId="flashlight"
                      className="-bottom-[52px] absolute z-1 h-[50px] w-1/2 rounded-full bg-white blur-[7px]"
                      style={{
                        scale: 2,
                        transformOrigin: "50% 50% 0px",
                        opacity: 0.2,
                      }}
                    />
                  </>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

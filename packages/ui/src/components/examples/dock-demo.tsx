"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef } from "react";

const initialValues = [
  {
    name: "finder",
    url: "https://cdn.jim-nielsen.com/macos/256/finder-2021-09-10.png?rf=1024",
  },
  {
    name: "siri",
    url: "https://cdn.jim-nielsen.com/macos/256/siri-2021-09-10.png?rf=1024",
  },
  {
    name: "raycast",
    url: "https://cdn.jim-nielsen.com/macos/256/raycast-2023-02-14.png?rf=1024",
  },
  {
    name: "telegram",
    url: "https://cdn.jim-nielsen.com/macos/256/telegram-2021-07-12.png?rf=1024",
  },
  {
    name: "github-desktop",
    url: "https://cdn.jim-nielsen.com/macos/256/github-desktop-2021-05-20.png?rf=1024",
  },
  {
    name: "figma",
    url: "https://cdn.jim-nielsen.com/macos/256/figma-2021-05-05.png?rf=1024",
  },
];

export default function DockDemo() {
  const mouseX = useMotionValue(Infinity);

  return (
    <>
      <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg md:shadow-xl">
        <div className="absolute left-1/2 top-8 -translate-x-1/2">
          <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-5xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
            Dock
          </span>
        </div>
        <div
          onMouseMove={(e) => mouseX.set(e.pageX)}
          onMouseLeave={() => mouseX.set(Infinity)}
          className="absolute left-1/2 flex h-[65px] -translate-x-1/2 items-end gap-2 rounded-3xl border border-white/20 bg-black/20 px-2 pb-[8px] backdrop-blur"
        >
          {initialValues.map((value, index) => (
            <EachIcon key={index} mouseX={mouseX} value={value} />
          ))}
        </div>
      </div>
    </>
  );
}

function EachIcon({
  mouseX,
  value,
}: {
  mouseX: MotionValue;
  value: { name: string; url: string };
}) {
  const ref = useRef<HTMLDivElement>(null);
  const distance = useTransform(mouseX, (val) => {
    const obj = ref.current?.getBoundingClientRect() || { x: 0, width: 0 };

    return val - obj.x - obj.width / 2;
  });
  const widthSync = useTransform(distance, [-200, 0, 200], [48, 80, 48]);
  const width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 300,
    damping: 15,
  });

  return (
    <motion.div
      ref={ref}
      className="group flex aspect-square w-12 flex-col items-center rounded-xl"
      style={{ width }}
    >
      <div className="pointer-events-none absolute top-0 isolate flex -translate-y-16 justify-center rounded-lg border border-[#6e6867] bg-[#2C2625] px-3 py-1 text-sm font-light capitalize text-white opacity-0 group-hover:opacity-100">
        {value.name.replaceAll("-", " ")}
        <div className="absolute bottom-0 -z-10 aspect-square w-[10px] translate-y-[5.7px] rotate-45 border-b border-r border-[#6e6867] bg-[#2C2625]"></div>
      </div>
      <img src={value.url} className="h-full w-full object-cover" />
    </motion.div>
  );
}

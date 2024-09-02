"use client";

import {
  AnimatePresence,
  MotionConfig,
  motion,
  useAnimate,
} from "framer-motion";
import { Headphones, Music, Pause, Search, SkipForward } from "lucide-react";
import { useState } from "react";

import IphoneSimulator from "@/components/iphone-simulator";

export default function SpotifyDemo() {
  const [isOpen, setIsOpen] = useState(false);

  const [scope, animate] = useAnimate();

  const onClickHandler = () => setIsOpen(!isOpen);

  const onCloseHandler = async () => {
    animate(
      ".text-information",
      { opacity: 0, y: 30 },
      { duration: 0.7, type: "spring", bounce: 0 },
    );
    await new Promise((resolve) => setTimeout(resolve, 120));
    setIsOpen(false);
  };

  return (
    <div className="flex h-dvh w-full items-center justify-center bg-background">
      <IphoneSimulator mainClassName="bg-[#131113] pb-0">
        <MotionConfig transition={{ duration: 0.7, type: "spring", bounce: 0 }}>
          <motion.div
            animate={{
              opacity: isOpen ? 0.2 : 1,
              scale: isOpen ? 0.9 : 1,
              originY: "top",
            }}
          >
            <header className="flex justify-between px-4 text-xl">
              <h1>my tracks</h1>
              <button className="text-[#716F71]">
                <Search />
              </button>
            </header>

            <section className="scrollbar-none mt-4 flex gap-4 overflow-auto px-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="w-32" style={{ flex: "0 0 auto" }}>
                  <div className="flex aspect-square items-center justify-center rounded-md bg-[#343234] text-[#716F71]">
                    <Headphones className="rotate-12 text-3xl" />
                  </div>
                  <h2 className="mt-3 leading-3">rap</h2>
                  <small className="text-[#716F71]">19 songs</small>
                </div>
              ))}
            </section>

            <header className="mt-8 flex justify-between px-4 text-xl">
              <h1>recent listens</h1>
            </header>

            <section className="mt-4 flex flex-col gap-4 overflow-auto px-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="flex w-full gap-4">
                  <div className="flex aspect-square w-14 items-center justify-center rounded-lg bg-[#343234] text-[#716F71]">
                    <Music className="text-xl" />
                  </div>
                  <div>
                    <h2 className="mt-3 leading-3">Like That</h2>
                    <small className="text-[#716F71]">UTOPIA</small>
                  </div>
                </div>
              ))}
            </section>
          </motion.div>

          <div className="sticky bottom-0 left-0 w-full px-4 pb-8">
            <div className="pointer-events-none absolute bottom-0 left-0 h-48 w-full bg-gradient-to-b from-transparent to-55% to-[#131113]"></div>

            <motion.div
              className="relative isolate flex w-full cursor-pointer items-center gap-4 py-3 pr-4 pl-3"
              onClick={onClickHandler}
              whileTap={{ scale: 0.9 }}
            >
              <motion.div
                layoutId="background-layout"
                className="-z-10 absolute inset-0 bg-[#262426]"
                style={{ borderRadius: 12 }}
              ></motion.div>

              <motion.div
                layoutId="green-element"
                className="aspect-square w-10 bg-[#48AA5B]"
                style={{ borderRadius: 8 }}
              ></motion.div>
              <motion.div layout="position" className="grow">
                <h2 className="leading-3">Like That</h2>
                <small className="text-[#716F71]">UTOPIA</small>
              </motion.div>
              <motion.button layout="position" className="text-xl">
                <Pause />
              </motion.button>
            </motion.div>
          </div>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                ref={scope}
                className="absolute bottom-0 left-0 isolate h-[90%] w-full p-4"
                style={{ borderRadius: 12 }}
                onClick={onCloseHandler}
                whileTap={{ scale: 1.02 }}
              >
                <motion.div
                  layoutId="background-layout"
                  className="-z-10 absolute inset-0 bg-[#262426]"
                  style={{ borderRadius: 12 }}
                ></motion.div>

                <motion.div
                  layoutId="green-element"
                  className="aspect-square w-full bg-[#48AA5B]"
                  style={{ borderRadius: 8 }}
                ></motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.7,
                    type: "spring",
                    bounce: 0,
                    delay: 0.2,
                  }}
                  className="text-information"
                >
                  <h2 className="mt-4 text-4xl">Like That</h2>
                  <p className="text-[#716F71]">UTOPIA</p>

                  <div className="relative mt-4 flex items-center">
                    <div className="relative h-1 w-full overflow-hidden rounded-full bg-[#29272A]">
                      <div className="absolute h-full w-3/4 bg-[#48AA5B]"></div>
                    </div>
                    <div className="absolute left-[75%] h-4 w-4 rounded-full bg-[#48AA5B]"></div>
                  </div>

                  <div className="mt-2 flex justify-between text-[#716F71] text-xs">
                    <p>2:02</p>
                    <p>9:41</p>
                  </div>

                  <div className="mt-8 flex justify-center gap-4">
                    <button className="rotate-180 text-xl">
                      <SkipForward />
                    </button>
                    <button className="flex h-16 w-16 items-center justify-center rounded-full bg-[#3B393B] text-3xl">
                      <Pause />
                    </button>
                    <button className="text-xl">
                      <SkipForward />
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </MotionConfig>
      </IphoneSimulator>
    </div>
  );
}

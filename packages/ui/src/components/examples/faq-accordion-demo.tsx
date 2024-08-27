"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { cn } from "../../lib/utils";

const FAQS = [
  {
    id: 1,
    title: "What is UI/TOPIA?",
    content:
      "UI/TOPIA is a ui/topia is is a curated showcase of UI components that blend aesthetic appeal with accessibility and versatility, built with Framer Motion and TailwindCSS. ",
    isFav: true,
  },
  {
    id: 2,
    title: "Can I use this in my project?",
    content:
      "Yes, you can use it in your project. It`s open source and available on GitHub.",
  },
  {
    id: 3,
    title: "Can I add components to this site?",
    content:
      "Yes, you can! We welcome contributions from the community. Adding your components to ui/topia is a great way to showcase your work and help other developers.",
  },
  {
    id: 4,
    title: "Can I modify the components to fit my needs?",
    content:
      "Absolutely! In fact, we encourage it. The components are designed to be starting points that you can customize and adapt to your specific project requirements",
    isStar: true,
  },
  {
    id: 5,
    title: "Are the components responsive?",
    content:
      "Yes, all our components are designed with responsiveness in mind. However, you may need to adjust some aspects depending on your specific use case and design requirements.",
  },
];

const FancyCarousel = () => {
  const [active, setActive] = useState<number | undefined>();

  const handleSelect = (id: number) => {
    if (active === id) {
      setActive(undefined);
    } else {
      setActive(id);
    }
  };

  return (
    <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden px-4">
      <div className="absolute left-1/2 top-1 -translate-x-1/2">
        <h1 className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-5xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
          Accordion
        </h1>
      </div>

      <div className="w-full space-y-3">
        {FAQS.map((faq) => (
          <AccordionItem
            key={faq.id}
            {...faq}
            isActive={faq.id === active}
            onSelect={() => handleSelect(faq.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default FancyCarousel;

interface AccordionItemProps {
  isActive: boolean;
  title: string;
  content: string;
  onSelect: () => void;
  isFav?: boolean;
  isStar?: boolean;
}

const AccordionItem = ({
  isActive,
  title,
  content,
  onSelect,
  isFav = false,
  isStar = false,
}: AccordionItemProps) => {
  return (
    <div className="w-full space-y-2 text-sm md:text-[15px]">
      <button
        className={cn(
          "message group flex items-center gap-2",
          isActive && "active",
        )}
        onClick={onSelect}
      >
        <div
          className={cn(
            "relative rounded-3xl bg-gray-100 px-6 py-4 font-medium text-[#0D0D0D] transition-all duration-200 ease-in-out group-hover:bg-blue-50 group-hover:text-blue-400",
            isActive && "bg-blue-50 text-blue-400",
          )}
        >
          <p className="text-left">{title}</p>

          {isFav && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={cn(
                "absolute -top-3 right-0 h-7 w-7 rotate-12 fill-red-400 transition-all duration-200 ease-in-out group-hover:fill-red-500",
                isActive && "fill-red-500",
              )}
              viewBox="0 0 256 256"
            >
              <path d="M240,102c0,70-103.79,126.66-108.21,129a8,8,0,0,1-7.58,0C119.79,228.66,16,172,16,102A62.07,62.07,0,0,1,78,40c20.65,0,38.73,8.88,50,23.89C139.27,48.88,157.35,40,178,40A62.07,62.07,0,0,1,240,102Z" />
            </svg>
          )}

          {isStar && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={cn(
                "absolute -left-3 top-0 h-7 w-7 -rotate-12 fill-yellow-400 transition-all duration-200 ease-in-out group-hover:fill-yellow-500",
                isActive && "fill-yellow-500",
              )}
              viewBox="0 0 256 256"
            >
              <path d="M234.29,114.85l-45,38.83L203,211.75a16.4,16.4,0,0,1-24.5,17.82L128,198.49,77.47,229.57A16.4,16.4,0,0,1,53,211.75l13.76-58.07-45-38.83A16.46,16.46,0,0,1,31.08,86l59-4.76,22.76-55.08a16.36,16.36,0,0,1,30.27,0l22.75,55.08,59,4.76a16.46,16.46,0,0,1,9.37,28.86Z" />
            </svg>
          )}
        </div>

        <span
          className={cn(
            "relative flex aspect-square w-4 items-center justify-center rounded-full border-[1.1px] border-[#0D0D0D] transition-all duration-200 ease-in-out group-hover:border-blue-400 group-hover:bg-blue-400",
            isActive && "border-blue-400 bg-blue-400",
          )}
        >
          <span
            className={cn(
              "block h-px w-1.5 bg-[#0D0D0D] transition-all duration-200 ease-in-out group-hover:bg-white",
              isActive && "bg-white",
            )}
          ></span>

          <motion.span
            initial={{ rotate: !isActive ? "90deg" : "0deg" }}
            animate={{ rotate: !isActive ? "90deg" : "0deg" }}
            transition={{ ease: "easeInOut", duration: 0.1 }}
            className={cn(
              "absolute block h-px w-1.5 bg-[#0D0D0D] transition-all duration-200 ease-in-out group-hover:bg-white",
              isActive && "bg-white",
            )}
          ></motion.span>
        </span>
      </button>

      <motion.div
        initial={{ height: !isActive ? 0 : "auto" }}
        animate={{ height: !isActive ? 0 : "auto" }}
        className="relative ml-auto flex max-w-full items-center justify-end gap-2 overflow-hidden md:max-w-[75%]"
      >
        <div>
          <AnimatePresence>
            {isActive && (
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  transition: { delay: 0.4, duration: 0.3, ease: "easeInOut" },
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="rounded-t-3xl rounded-bl-3xl bg-blue-400 p-4 text-white"
              >
                <p className="leading-6">{content}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

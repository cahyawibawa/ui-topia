"use client";

import { RiMagicLine, RiTranslateAi } from "@remixicon/react";

import { cn } from "@/registry/lib/utils";

const StickerCard = ({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div>
      {/* biome-ignore lint/a11y/useValidAnchor: <explanation> */}
      <a
        className={cn(
          "relative z-10 mt-0 block size-full overflow-hidden",
          "rounded-lg rounded-tr-[26px]",
          "px-4 pt-5 pb-4",
          // Card
          "bg-white font-normal text-gray-900 leading-8 dark:bg-gray-900 dark:text-gray-50",
          "ring-1 ring-gray-200 ring-inset dark:ring-gray-800",

          // Animation
          "transition-all duration-200 ease-in-out",

          // Before Element (Corner Fold)
          'before:content-[""]',
          "before:absolute before:top-0 before:right-0",
          "before:z-[3]",
          "before:h-[30px] before:w-[30px]",
          "before:-translate-y-1/2 before:translate-x-1/2",
          "before:rotate-45",
          "before:bg-white dark:before:bg-gray-950",
          "before:ring-1 before:ring-gray-200 dark:before:ring-gray-800",
          "before:transition-all before:duration-200 before:ease-in-out",

          // After Element (Corner Shadow)
          'after:content-[""]',
          "after:absolute after:top-0 after:right-0",
          "after:z-[2]",
          "after:size-7",
          "after:-translate-y-2 after:translate-x-2",
          "after:rounded-bl-lg",
          "after:border after:bg-gray-50 dark:after:border-gray-800 dark:after:bg-gray-900",
          "after:shadow-sm",
          "after:transition-all after:duration-200 after:ease-in-out",

          // Hover States
          "hover:cursor-pointer",
          "hover:rounded-tr-[45px]",
          "hover:before:h-[50px] hover:before:w-[50px]",
          "hover:after:h-[42px] hover:after:w-[42px]",
          "after:hover:shadow-black/5 after:hover:shadow-lg",
        )}
      >
        <div>
          <div className="relative flex items-center gap-2">
            <div className="-left-4 absolute h-5 w-1 rounded-r-sm bg-blue-500" />
            <Icon className="h-5 w-5 shrink-0 text-blue-500" />
            <h3 className="font-medium text-gray-900 dark:text-gray-50">
              {title}
            </h3>
          </div>
          <p className="mt-2 text-gray-600 sm:text-sm dark:text-gray-400">
            {children}
          </p>
        </div>
      </a>
    </div>
  );
};

const cardData = [
  {
    icon: RiTranslateAi,
    title: "Lost in translations",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  //more data here
];

export default function PaperFoldDemo() {
  return (
    <div className="grid grid-cols-1">
      {cardData.map((card, index) => (
        <StickerCard key={index} icon={card.icon} title={card.title}>
          {card.description}
        </StickerCard>
      ))}
    </div>
  );
}

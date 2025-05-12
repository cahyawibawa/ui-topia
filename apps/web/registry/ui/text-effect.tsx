"use client";

import {
  AnimatePresence,
  motion,
  type TargetAndTransition,
  type Transition,
  type Variant,
  type Variants,
} from "motion/react";
import { type FC, type JSX, memo } from "react";
import { cn } from "@/registry/lib/utils";

export type TextEffectProps = {
  children: string;
  per?: "word" | "char" | "line";
  as?: keyof JSX.IntrinsicElements;
  variants?: {
    container?: Variants;
    item?: Variants;
  };
  className?: string;
  preset?: "blur" | "fade-in-blur" | "scale" | "fade" | "slide";
  delay?: number;
  speedReveal?: number;
  speedSegment?: number;
  trigger?: boolean;
  onAnimationComplete?: () => void;
  onAnimationStart?: () => void;
  segmentWrapperClassName?: string;
  containerTransition?: Transition;
  segmentTransition?: Transition;
  style?: React.CSSProperties;
};

const defaultStaggerTimes = {
  char: 0.03,
  word: 0.05,
  line: 0.1,
} as const;

const defaultContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
  exit: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const defaultItemVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const presetVariants = {
  blur: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, filter: "blur(12px)" },
      visible: { opacity: 1, filter: "blur(0px)" },
      exit: { opacity: 0, filter: "blur(12px)" },
    },
  },
  "fade-in-blur": {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, y: 20, filter: "blur(12px)" },
      visible: { opacity: 1, y: 0, filter: "blur(0px)" },
      exit: { opacity: 0, y: 20, filter: "blur(12px)" },
    },
  },
  scale: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, scale: 0 },
      visible: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0 },
    },
  },
  fade: {
    container: defaultContainerVariants,
    item: defaultItemVariants,
  },
  slide: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: 20 },
    },
  },
} as const;

interface AnimationComponentProps {
  segment: string;
  variants: Variants;
  per: "line" | "word" | "char";
  segmentWrapperClassName?: string;
}

const AnimationComponent: FC<AnimationComponentProps> = memo(
  ({ segment, variants, per, segmentWrapperClassName }) => {
    const renderContent = () => {
      if (per === "line") {
        return (
          <motion.span variants={variants} className="block">
            {segment}
          </motion.span>
        );
      }

      if (per === "word") {
        return (
          <motion.span
            aria-hidden="true"
            variants={variants}
            className="inline-block whitespace-pre"
          >
            {segment}
          </motion.span>
        );
      }

      return (
        <motion.span className="inline-block whitespace-pre">
          {segment.split("").map((char, index) => (
            <motion.span
              key={`char-${index}`}
              aria-hidden="true"
              variants={variants}
              className="inline-block whitespace-pre"
            >
              {char}
            </motion.span>
          ))}
        </motion.span>
      );
    };

    if (!segmentWrapperClassName) {
      return renderContent();
    }

    const defaultWrapperClassName = per === "line" ? "block" : "inline-block";

    return (
      <span className={cn(defaultWrapperClassName, segmentWrapperClassName)}>
        {renderContent()}
      </span>
    );
  },
);

AnimationComponent.displayName = "AnimationComponent";

function splitText(text: string, per: "line" | "word" | "char"): string[] {
  return per === "line" ? text.split("\n") : text.split(/(\s+)/);
}

function hasTransition(
  variant: Variant | undefined,
): variant is TargetAndTransition & { transition?: Transition } {
  return Boolean(
    variant && typeof variant === "object" && "transition" in variant,
  );
}

function createVariantsWithTransition(
  baseVariants: Variants,
  transition?: Transition & { exit?: Transition },
): Variants {
  if (!transition) return baseVariants;

  const { exit: exitTransition, ...mainTransition } = transition;

  const visibleTransition = hasTransition(baseVariants.visible)
    ? baseVariants.visible.transition
    : {};

  const exitBaseTransition = hasTransition(baseVariants.exit)
    ? baseVariants.exit.transition
    : {};

  return {
    ...baseVariants,
    visible: {
      ...baseVariants.visible,
      transition: {
        ...visibleTransition,
        ...mainTransition,
      },
    },
    exit: {
      ...baseVariants.exit,
      transition: {
        ...exitBaseTransition,
        ...mainTransition,
        ...(exitTransition || {}),
        staggerDirection: -1,
      },
    },
  };
}

export default function TextEffect({
  children,
  per = "word",
  as = "p",
  variants,
  className,
  preset = "fade",
  delay = 0,
  speedReveal = 1,
  speedSegment = 1,
  trigger = true,
  onAnimationComplete,
  onAnimationStart,
  segmentWrapperClassName,
  containerTransition,
  segmentTransition,
  style,
}: TextEffectProps) {
  const segments = splitText(children, per);
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  const baseVariants = preset
    ? presetVariants[preset]
    : { container: defaultContainerVariants, item: defaultItemVariants };

  const stagger = defaultStaggerTimes[per] / speedReveal;

  const baseDuration = 0.3 / speedSegment;

  const visibleTransition = variants?.container?.visible as
    | TargetAndTransition
    | undefined;

  const customStagger = hasTransition(visibleTransition)
    ? visibleTransition.transition?.staggerChildren
    : undefined;

  const customDelay = hasTransition(visibleTransition)
    ? visibleTransition.transition?.delayChildren
    : undefined;

  const computedVariants = {
    container: createVariantsWithTransition(
      variants?.container || baseVariants.container,
      {
        staggerChildren: customStagger ?? stagger,
        delayChildren: customDelay ?? delay,
        ...containerTransition,
        exit: {
          staggerChildren: customStagger ?? stagger,
          staggerDirection: -1,
        },
      },
    ),
    item: createVariantsWithTransition(variants?.item || baseVariants.item, {
      duration: baseDuration,
      ...segmentTransition,
    }),
  };

  return (
    <AnimatePresence mode="popLayout">
      {trigger && (
        <MotionTag
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={computedVariants.container}
          className={className}
          onAnimationComplete={onAnimationComplete}
          onAnimationStart={onAnimationStart}
          style={style}
        >
          {per !== "line" && <span className="sr-only">{children}</span>}
          {segments.map((segment, index) => (
            <AnimationComponent
              key={`${per}-${index}-${segment}`}
              segment={segment}
              variants={computedVariants.item}
              per={per}
              segmentWrapperClassName={segmentWrapperClassName}
            />
          ))}
        </MotionTag>
      )}
    </AnimatePresence>
  );
}

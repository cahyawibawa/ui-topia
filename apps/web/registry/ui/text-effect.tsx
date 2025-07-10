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
  line: 0.1,
  word: 0.05,
} as const;

const defaultContainerVariants: Variants = {
  exit: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const defaultItemVariants: Variants = {
  exit: { opacity: 0 },
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const presetVariants = {
  blur: {
    container: defaultContainerVariants,
    item: {
      exit: { filter: "blur(12px)", opacity: 0 },
      hidden: { filter: "blur(12px)", opacity: 0 },
      visible: { filter: "blur(0px)", opacity: 1 },
    },
  },
  fade: {
    container: defaultContainerVariants,
    item: defaultItemVariants,
  },
  "fade-in-blur": {
    container: defaultContainerVariants,
    item: {
      exit: { filter: "blur(12px)", opacity: 0, y: 20 },
      hidden: { filter: "blur(12px)", opacity: 0, y: 20 },
      visible: { filter: "blur(0px)", opacity: 1, y: 0 },
    },
  },
  scale: {
    container: defaultContainerVariants,
    item: {
      exit: { opacity: 0, scale: 0 },
      hidden: { opacity: 0, scale: 0 },
      visible: { opacity: 1, scale: 1 },
    },
  },
  slide: {
    container: defaultContainerVariants,
    item: {
      exit: { opacity: 0, y: 20 },
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
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
          <motion.span className="block" variants={variants}>
            {segment}
          </motion.span>
        );
      }

      if (per === "word") {
        return (
          <motion.span
            aria-hidden="true"
            className="inline-block whitespace-pre"
            variants={variants}
          >
            {segment}
          </motion.span>
        );
      }

      return (
        <motion.span className="inline-block whitespace-pre">
          {segment.split("").map((char, index) => (
            <motion.span
              aria-hidden="true"
              className="inline-block whitespace-pre"
              key={`char-${index}`}
              variants={variants}
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
    exit: {
      ...baseVariants.exit,
      transition: {
        ...exitBaseTransition,
        ...mainTransition,
        ...(exitTransition || {}),
        staggerDirection: -1,
      },
    },
    visible: {
      ...baseVariants.visible,
      transition: {
        ...visibleTransition,
        ...mainTransition,
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
        delayChildren: customDelay ?? delay,
        staggerChildren: customStagger ?? stagger,
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
          animate="visible"
          className={className}
          exit="exit"
          initial="hidden"
          onAnimationComplete={onAnimationComplete}
          onAnimationStart={onAnimationStart}
          style={style}
          variants={computedVariants.container}
        >
          {per !== "line" && <span className="sr-only">{children}</span>}
          {segments.map((segment, index) => (
            <AnimationComponent
              key={`${per}-${index}-${segment}`}
              per={per}
              segment={segment}
              segmentWrapperClassName={segmentWrapperClassName}
              variants={computedVariants.item}
            />
          ))}
        </MotionTag>
      )}
    </AnimatePresence>
  );
}

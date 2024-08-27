import { type Position, SparkleSvg } from "@/components/icons";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/**
 * ✨ Sparkle Card created by suyalcinkaya
 * 📦 https://github.com/suyalcinkaya/gauge
 */

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: ReactNode;
  sparklePositions?: Position[];
  useTopDivider?: boolean;
  useBottomDivider?: boolean;
  className?: string;
}

export const SparkleDivider = ({
  children,
  sparklePositions = ["top-left"],
  useTopDivider = false,
  useBottomDivider = true,
  className,
  ...props
}: SectionProps) => {
  return (
    <>
      {useTopDivider && <div className="h-4 border-b" />}
      <section
        className={cn(
          "p-2 drop-shadow-sm",
          sparklePositions.length > 0 && "relative",
          className,
        )}
        {...props}
      >
        {children}
        {sparklePositions.length > 0 &&
          sparklePositions.map((sparklePosition, index) => {
            return (
              <SparkleSvg
                key={`sparkle_${
                  // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                  index
                }`}
                position={sparklePosition}
                className="hover:animate-rotate"
              />
            );
          })}
      </section>
      {useBottomDivider && (
        <div className="mb-2 h-4 border-b-2 border-dotted dark:border-neutral-800" />
      )}
    </>
  );
};

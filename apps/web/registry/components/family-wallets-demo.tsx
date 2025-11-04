"use client";

import { AnimatePresence, MotionConfig, motion } from "motion/react";
import type { RefObject } from "react";
import {
  type FC,
  type JSX,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useOnClickOutside } from "usehooks-ts";
import { Icons } from "@/registry/components/icons";

// Types
interface WalletCardProps {
  bgColor: string;
  IconComponent: (props: React.HTMLAttributes<SVGElement>) => JSX.Element;
  walletName: string;
  ethValue: string;
  onClick?: () => void;
  uniqueId: string;
}

// Shared animation variants
const iconAnimation = {
  animate: { filter: "blur(0px)", opacity: 1, scale: 1 },
  exit: { filter: "blur(4px)", opacity: 0, scale: 0.5 },
  initial: { filter: "blur(4px)", opacity: 0, scale: 0.5 },
};

const buttonAnimation = {
  animate: { filter: "blur(0px)", opacity: 1, scale: 1 },
  exit: { filter: "blur(4px)", opacity: 0, scale: 0.25 },
  initial: { filter: "blur(4px)", opacity: 0, scale: 0.25 },
};

// Shared styled components
const BaseWalletCard = motion.div;
const IconWrapper = motion.div;
const TextWrapper = motion.span;

// Component implementations
export const WalletCardDefault: FC<WalletCardProps> = ({
  bgColor,
  IconComponent,
  walletName,
  ethValue,
  onClick,
  uniqueId,
}) => (
  <BaseWalletCard
    className="flex flex-col items-start justify-between p-3"
    layoutId={`wallet-${uniqueId}`}
    style={{
      backgroundColor: bgColor,
      borderRadius: 24,
      height: "120px",
      width: "160px",
    }}
  >
    <div className="flex w-full items-start justify-between">
      <IconWrapper
        className="flex items-center justify-center"
        layoutId={`icon-${uniqueId}`}
      >
        <IconComponent className="h-10 w-10 translate-x-0 translate-y-0 fill-white" />
      </IconWrapper>
      <motion.div
        {...iconAnimation}
        className="flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center rounded-full bg-white/20 transition-colors duration-150 ease-out hover:bg-white/30"
        onClick={onClick}
      >
        <Icons.moreIcon className="shrink-0 translate-x-0 translate-y-0 fill-white" />
      </motion.div>
    </div>
    <div className="flex flex-col items-start justify-center">
      <TextWrapper
        className="select-none font-semibold text-base text-white"
        layoutId={`walletName-${uniqueId}`}
      >
        {walletName}
      </TextWrapper>
      <TextWrapper
        className="select-none font-semibold text-sm text-white/50"
        layoutId={`ethValue-${uniqueId}`}
      >
        {ethValue}
      </TextWrapper>
    </div>
  </BaseWalletCard>
);

export const WalletCardExpanded: FC<WalletCardProps> = ({
  bgColor,
  IconComponent,
  walletName,
  ethValue,
  onClick,
  uniqueId,
}) => (
  <BaseWalletCard
    className="flex cursor-pointer flex-col items-start justify-between p-5"
    layoutId={`wallet-${uniqueId}`}
    style={{
      backgroundColor: bgColor,
      borderRadius: 24,
      height: "200px",
      width: "320px",
    }}
  >
    <motion.div className="flex w-full items-start justify-between">
      <IconWrapper
        className="flex items-center justify-center"
        layoutId={`icon-${uniqueId}`}
        onClick={onClick}
      >
        <IconComponent className="h-14 w-14 translate-x-0 translate-y-0 fill-white" />
      </IconWrapper>
      <motion.div
        {...iconAnimation}
        className="flex h-[24px] shrink-0 translate-x-0 translate-y-0 cursor-pointer select-none items-center justify-center gap-x-[6px] font-semibold text-white"
        whileTap={{ scale: 0.9 }}
      >
        Copy Address
        <motion.div className="flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center">
          <Icons.copyIcon className="h-5 w-5 shrink-0 translate-x-0 translate-y-0 stroke-white/50" />
        </motion.div>
      </motion.div>
    </motion.div>
    <div className="flex w-full items-end justify-between">
      <div className="flex flex-col items-start justify-center">
        <TextWrapper
          className="select-none font-semibold text-white text-xl"
          layoutId={`walletName-${uniqueId}`}
        >
          {walletName}
        </TextWrapper>
        <TextWrapper
          className="select-none font-semibold text-lg text-white/50"
          layoutId={`ethValue-${uniqueId}`}
        >
          {ethValue}
        </TextWrapper>
      </div>
      <motion.button
        {...buttonAnimation}
        className="flex h-[32px] select-none items-center justify-center rounded-full bg-white/20 p-2 px-3 font-semibold text-white transition-colors duration-150 ease-out hover:bg-white/15"
      >
        Customize
      </motion.button>
    </div>
  </BaseWalletCard>
);

export const WalletCardCollapsed: FC<WalletCardProps> = ({
  bgColor,
  IconComponent,
  walletName,
  ethValue,
  onClick,
  uniqueId,
}) => (
  <BaseWalletCard
    className="flex cursor-pointer flex-col items-start justify-between p-3"
    layoutId={`wallet-${uniqueId}`}
    onClick={onClick}
    style={{
      backgroundColor: bgColor,
      borderRadius: 20,
      height: "96px",
      width: "96px",
    }}
  >
    <div className="flex w-full items-center justify-start">
      <IconWrapper
        className="flex items-center justify-center"
        layoutId={`icon-${uniqueId}`}
      >
        <IconComponent className="h-8 w-8 translate-x-0 translate-y-0 fill-white" />
      </IconWrapper>
    </div>
    <div className="flex flex-col items-start justify-center">
      <TextWrapper
        className="select-none font-semibold text-sm text-white"
        layoutId={`walletName-${uniqueId}`}
      >
        {walletName}
      </TextWrapper>
      <TextWrapper
        className="select-none font-semibold text-white/50 text-xs"
        layoutId={`ethValue-${uniqueId}`}
      >
        {ethValue}
      </TextWrapper>
    </div>
  </BaseWalletCard>
);

// Wallet data
const walletData = [
  {
    bgColor: "#9E4EFD",
    ethValue: "1.03 ETH",
    IconComponent: Icons.sparklesIcon,
    id: "1",
    walletName: "Family",
  },
  {
    bgColor: "#191A1A",
    ethValue: "25.08 ETH",
    IconComponent: Icons.percentIcon,
    id: "2",
    walletName: "Savings",
  },
  {
    bgColor: "#06BDC8",
    ethValue: "0.04 ETH",
    IconComponent: Icons.cloudIcon,
    id: "3",
    walletName: "Rainy Day",
  },
  {
    bgColor: "#00B2FB",
    ethValue: "0 ETH",
    IconComponent: Icons.receiptIcon,
    id: "4",
    walletName: "Spending",
  },
];

const FamilyWallets = () => {
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  const handleToggle = useCallback((uniqueId: string) => {
    setExpandedCardId((prev) => (prev === uniqueId ? null : uniqueId));
  }, []);

  useOnClickOutside(ref as RefObject<HTMLElement>, () =>
    setExpandedCardId(null),
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setExpandedCardId(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const renderExpandedWallet = (id: string) => {
    const wallet = walletData.find((w) => w.id === id);
    if (!wallet) return null;

    return (
      <>
        <div className="flex gap-4" style={{ height: 200 }}>
          {/* @ts-ignore */}
          <WalletCardExpanded
            {...wallet}
            onClick={() => handleToggle(id)}
            uniqueId={id}
          />
        </div>
        <div className="flex gap-4" style={{ height: 96, width: 320 }}>
          {walletData
            .filter((w) => w.id !== id)
            .map((wallet) => (
              // @ts-ignore
              <WalletCardCollapsed
                key={wallet.id}
                {...wallet}
                onClick={() => handleToggle("")}
                uniqueId={wallet.id}
              />
            ))}
        </div>
      </>
    );
  };

  return (
    <MotionConfig transition={{ bounce: 0.1, duration: 0.4, type: "spring" }}>
      <div className="flex items-center justify-center">
        <div ref={ref}>
          <AnimatePresence initial={false} mode="popLayout">
            {expandedCardId ? (
              <motion.div
                className="flex flex-col items-center justify-center gap-4"
                key="expanded"
              >
                {renderExpandedWallet(expandedCardId)}
              </motion.div>
            ) : (
              <motion.div
                className="flex flex-col items-center justify-center gap-4"
                key="collapsed"
              >
                {[0, 1].map((row) => (
                  <div className="flex gap-4" key={row}>
                    {walletData.slice(row * 2, (row + 1) * 2).map((wallet) => (
                      // @ts-ignore
                      <WalletCardDefault
                        key={wallet.id}
                        {...wallet}
                        onClick={() => handleToggle(wallet.id)}
                        uniqueId={wallet.id}
                      />
                    ))}
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </MotionConfig>
  );
};

export default FamilyWallets;

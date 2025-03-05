"use client";

import { Icons } from "@/registry/components/icons";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import {
  type FC,
  type JSX,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import type { RefObject } from "react";
import { useOnClickOutside } from "usehooks-ts";

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
  initial: { opacity: 0, scale: 0.5, filter: "blur(4px)" },
  animate: { opacity: 1, scale: 1, filter: "blur(0px)" },
  exit: { opacity: 0, scale: 0.5, filter: "blur(4px)" },
};

const buttonAnimation = {
  initial: { opacity: 0, scale: 0.25, filter: "blur(4px)" },
  animate: { opacity: 1, scale: 1, filter: "blur(0px)" },
  exit: { opacity: 0, scale: 0.25, filter: "blur(4px)" },
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
    layoutId={`wallet-${uniqueId}`}
    className="flex flex-col items-start justify-between p-3"
    style={{
      height: "120px",
      width: "160px",
      borderRadius: 24,
      backgroundColor: bgColor,
    }}
  >
    <div className="flex w-full items-start justify-between">
      <IconWrapper
        layoutId={`icon-${uniqueId}`}
        className="flex items-center justify-center"
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
        layoutId={`walletName-${uniqueId}`}
        className="select-none font-semibold text-base text-white"
      >
        {walletName}
      </TextWrapper>
      <TextWrapper
        layoutId={`ethValue-${uniqueId}`}
        className="select-none font-semibold text-sm text-white/50"
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
    layoutId={`wallet-${uniqueId}`}
    className="flex cursor-pointer flex-col items-start justify-between p-5"
    style={{
      height: "200px",
      width: "320px",
      borderRadius: 24,
      backgroundColor: bgColor,
    }}
  >
    <motion.div className="flex w-full items-start justify-between">
      <IconWrapper
        layoutId={`icon-${uniqueId}`}
        className="flex items-center justify-center"
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
          layoutId={`walletName-${uniqueId}`}
          className="select-none font-semibold text-white text-xl"
        >
          {walletName}
        </TextWrapper>
        <TextWrapper
          layoutId={`ethValue-${uniqueId}`}
          className="select-none font-semibold text-lg text-white/50"
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
    layoutId={`wallet-${uniqueId}`}
    onClick={onClick}
    className="flex cursor-pointer flex-col items-start justify-between p-3"
    style={{
      height: "96px",
      width: "96px",
      borderRadius: 20,
      backgroundColor: bgColor,
    }}
  >
    <div className="flex w-full items-center justify-start">
      <IconWrapper
        layoutId={`icon-${uniqueId}`}
        className="flex items-center justify-center"
      >
        <IconComponent className="h-8 w-8 translate-x-0 translate-y-0 fill-white" />
      </IconWrapper>
    </div>
    <div className="flex flex-col items-start justify-center">
      <TextWrapper
        layoutId={`walletName-${uniqueId}`}
        className="select-none font-semibold text-sm text-white"
      >
        {walletName}
      </TextWrapper>
      <TextWrapper
        layoutId={`ethValue-${uniqueId}`}
        className="select-none font-semibold text-white/50 text-xs"
      >
        {ethValue}
      </TextWrapper>
    </div>
  </BaseWalletCard>
);

// Wallet data
const walletData = [
  {
    id: "1",
    bgColor: "#9E4EFD",
    IconComponent: Icons.sparklesIcon,
    walletName: "Family",
    ethValue: "1.03 ETH",
  },
  {
    id: "2",
    bgColor: "#191A1A",
    IconComponent: Icons.percentIcon,
    walletName: "Savings",
    ethValue: "25.08 ETH",
  },
  {
    id: "3",
    bgColor: "#06BDC8",
    IconComponent: Icons.cloudIcon,
    walletName: "Rainy Day",
    ethValue: "0.04 ETH",
  },
  {
    id: "4",
    bgColor: "#00B2FB",
    IconComponent: Icons.receiptIcon,
    walletName: "Spending",
    ethValue: "0 ETH",
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
        <div style={{ height: 200 }} className="flex gap-4">
          <WalletCardExpanded
            {...wallet}
            onClick={() => handleToggle(id)}
            uniqueId={id}
          />
        </div>
        <div className="flex gap-4" style={{ width: 320, height: 96 }}>
          {walletData
            .filter((w) => w.id !== id)
            .map((wallet) => (
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
    <MotionConfig transition={{ type: "spring", duration: 0.4, bounce: 0.1 }}>
      <div className="flex items-center justify-center">
        <div ref={ref}>
          <AnimatePresence mode="popLayout" initial={false}>
            {expandedCardId ? (
              <motion.div
                key="expanded"
                className="flex flex-col items-center justify-center gap-4"
              >
                {renderExpandedWallet(expandedCardId)}
              </motion.div>
            ) : (
              <motion.div
                key="collapsed"
                className="flex flex-col items-center justify-center gap-4"
              >
                {[0, 1].map((row) => (
                  <div key={row} className="flex gap-4">
                    {walletData.slice(row * 2, (row + 1) * 2).map((wallet) => (
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

"use client";

import { Icons } from "@/components/icons";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { type FC, useEffect, useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";

interface WalletCardProps {
  bgColor: string;
  IconComponent: (props: React.HTMLAttributes<SVGElement>) => JSX.Element;
  walletName: string;
  ethValue: string;
  onClick?: () => void;
  uniqueId: string;
}

export const WalletCardDefault: FC<WalletCardProps> = ({
  bgColor,
  IconComponent,
  walletName,
  ethValue,
  onClick,
  uniqueId,
}) => {
  return (
    <motion.div
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
        <motion.div
          layoutId={`icon-${uniqueId}`}
          className="flex items-center justify-center"
        >
          <IconComponent className="h-10 w-10 translate-x-0 translate-y-0 fill-white" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.5, filter: "blur(4px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 0.5, filter: "blur(4px)" }}
          className="flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center rounded-full bg-white/20 transition-colors duration-150 ease-out hover:bg-white/30"
          onClick={onClick}
        >
          <Icons.moreIcon className="shrink-0 translate-x-0 translate-y-0 fill-white" />
        </motion.div>
      </div>
      <div className="flex flex-col items-start justify-center">
        <motion.span
          layoutId={`walletName-${uniqueId}`}
          className="select-none font-semibold text-base text-white"
        >
          {walletName}
        </motion.span>
        <motion.span
          layoutId={`ethValue-${uniqueId}`}
          className="select-none font-semibold text-sm text-white/50"
        >
          {ethValue}
        </motion.span>
      </div>
    </motion.div>
  );
};

export const WalletCardExpanded: FC<WalletCardProps> = ({
  bgColor,
  IconComponent,
  walletName,
  ethValue,
  onClick,
  uniqueId,
}) => {
  return (
    <motion.div
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
        <motion.div
          layoutId={`icon-${uniqueId}`}
          className="flex items-center justify-center"
          onClick={onClick}
        >
          <IconComponent className="h-14 w-14 translate-x-0 translate-y-0 fill-white" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.5, filter: "blur(4px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 0.5, filter: "blur(4px)" }}
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
          <motion.span
            layoutId={`walletName-${uniqueId}`}
            className="select-none font-semibold text-white text-xl"
          >
            {walletName}
          </motion.span>
          <motion.span
            layoutId={`ethValue-${uniqueId}`}
            className="select-none font-semibold text-lg text-white/50"
          >
            {ethValue}
          </motion.span>
        </div>
        <motion.button
          initial={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}
          className="flex h-[32px] select-none items-center justify-center rounded-full bg-white/20 p-2 px-3 font-semibold text-white transition-colors duration-150 ease-out hover:bg-white/15"
        >
          Customize
        </motion.button>
      </div>
    </motion.div>
  );
};

export const WalletCardCollapsed: FC<WalletCardProps> = ({
  bgColor,
  IconComponent,
  walletName,
  ethValue,
  onClick,
  uniqueId,
}) => {
  return (
    <motion.div
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
        <motion.div
          layoutId={`icon-${uniqueId}`}
          className="flex items-center justify-center"
        >
          <IconComponent className="h-8 w-8 translate-x-0 translate-y-0 fill-white" />
        </motion.div>
      </div>
      <div className="flex flex-col items-start justify-center">
        <motion.span
          layoutId={`walletName-${uniqueId}`}
          className="select-none font-semibold text-sm text-white"
        >
          {walletName}
        </motion.span>
        <motion.span
          layoutId={`ethValue-${uniqueId}`}
          className="select-none font-semibold text-white/50 text-xs"
        >
          {ethValue}
        </motion.span>
      </div>
    </motion.div>
  );
};

const FamilyWallets = () => {
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);
  const handleToggle = (uniqueId: string) => {
    setExpandedCardId(expandedCardId === uniqueId ? null : uniqueId);
  };
  const ref = useRef(null);

  useOnClickOutside(ref, () => setExpandedCardId(null));

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setExpandedCardId(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

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
                {expandedCardId === "1" && (
                  <>
                    <div style={{ height: 200 }} className="flex gap-4">
                      <WalletCardExpanded
                        bgColor="#9E4EFD"
                        IconComponent={Icons.sparklesIcon}
                        walletName="Family"
                        ethValue="1.03 ETH"
                        onClick={() => handleToggle("1")}
                        uniqueId="1"
                      />
                    </div>
                    <div
                      className="flex gap-4"
                      style={{ width: 320, height: 96 }}
                    >
                      <WalletCardCollapsed
                        bgColor="#191A1A"
                        IconComponent={Icons.percentIcon}
                        walletName="Savings"
                        ethValue="25.08 ETH"
                        onClick={() => handleToggle("")}
                        uniqueId="2"
                      />
                      <WalletCardCollapsed
                        bgColor="#06BDC8"
                        IconComponent={Icons.cloudIcon}
                        walletName="Rainy Day"
                        ethValue="0.04 ETH"
                        onClick={() => handleToggle("")}
                        uniqueId="3"
                      />
                      <WalletCardCollapsed
                        bgColor="#00B2FB"
                        IconComponent={Icons.receiptIcon}
                        walletName="Spending"
                        ethValue="0 ETH"
                        onClick={() => handleToggle("")}
                        uniqueId="4"
                      />
                    </div>
                  </>
                )}
                {expandedCardId === "2" && (
                  <>
                    <div style={{ height: 200 }} className="flex gap-4">
                      <WalletCardExpanded
                        bgColor="#191A1A"
                        IconComponent={Icons.percentIcon}
                        walletName="Savings"
                        ethValue="25.08 ETH"
                        onClick={() => handleToggle("2")}
                        uniqueId="2"
                      />
                    </div>
                    <div
                      className="flex gap-4"
                      style={{ width: 320, height: 96 }}
                    >
                      <WalletCardCollapsed
                        bgColor="#9E4EFD"
                        IconComponent={Icons.sparklesIcon}
                        walletName="Family"
                        ethValue="1.03 ETH"
                        onClick={() => handleToggle("")}
                        uniqueId="1"
                      />
                      <WalletCardCollapsed
                        bgColor="#06BDC8"
                        IconComponent={Icons.cloudIcon}
                        walletName="Rainy Day"
                        ethValue="0.04 ETH"
                        onClick={() => handleToggle("")}
                        uniqueId="3"
                      />
                      <WalletCardCollapsed
                        bgColor="#00B2FB"
                        IconComponent={Icons.receiptIcon}
                        walletName="Spending"
                        ethValue="0 ETH"
                        onClick={() => handleToggle("")}
                        uniqueId="4"
                      />
                    </div>
                  </>
                )}
                {expandedCardId === "3" && (
                  <>
                    <div style={{ height: 200 }} className="flex gap-4">
                      <WalletCardExpanded
                        bgColor="#06BDC8"
                        IconComponent={Icons.cloudIcon}
                        walletName="Rainy Day"
                        ethValue="0.04 ETH"
                        onClick={() => handleToggle("3")}
                        uniqueId="3"
                      />
                    </div>
                    <div
                      className="flex gap-4"
                      style={{ width: 320, height: 96 }}
                    >
                      <WalletCardCollapsed
                        bgColor="#9E4EFD"
                        IconComponent={Icons.sparklesIcon}
                        walletName="Family"
                        ethValue="1.03 ETH"
                        onClick={() => handleToggle("")}
                        uniqueId="1"
                      />
                      <WalletCardCollapsed
                        bgColor="#191A1A"
                        IconComponent={Icons.percentIcon}
                        walletName="Savings"
                        ethValue="25.08 ETH"
                        onClick={() => handleToggle("")}
                        uniqueId="2"
                      />
                      <WalletCardCollapsed
                        bgColor="#00B2FB"
                        IconComponent={Icons.receiptIcon}
                        walletName="Spending"
                        ethValue="0 ETH"
                        onClick={() => handleToggle("")}
                        uniqueId="4"
                      />
                    </div>
                  </>
                )}
                {expandedCardId === "4" && (
                  <>
                    <div style={{ height: 200 }} className="flex gap-4">
                      <WalletCardExpanded
                        bgColor="#00B2FB"
                        IconComponent={Icons.receiptIcon}
                        walletName="Spending"
                        ethValue="0 ETH"
                        onClick={() => handleToggle("4")}
                        uniqueId="4"
                      />
                    </div>
                    <div
                      className="flex gap-4"
                      style={{ width: 320, height: 96 }}
                    >
                      <WalletCardCollapsed
                        bgColor="#9E4EFD"
                        IconComponent={Icons.sparklesIcon}
                        walletName="Family"
                        ethValue="1.03 ETH"
                        onClick={() => handleToggle("")}
                        uniqueId="1"
                      />
                      <WalletCardCollapsed
                        bgColor="#191A1A"
                        IconComponent={Icons.percentIcon}
                        walletName="Savings"
                        ethValue="25.08 ETH"
                        onClick={() => handleToggle("")}
                        uniqueId="2"
                      />
                      <WalletCardCollapsed
                        bgColor="#06BDC8"
                        IconComponent={Icons.cloudIcon}
                        walletName="Rainy Day"
                        ethValue="0.04 ETH"
                        onClick={() => handleToggle("")}
                        uniqueId="3"
                      />
                    </div>
                  </>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="collapsed"
                className="flex flex-col items-center justify-center gap-4"
              >
                <div className="flex gap-4">
                  <WalletCardDefault
                    bgColor="#9E4EFD"
                    IconComponent={Icons.sparklesIcon}
                    walletName="Family"
                    ethValue="1.03 ETH"
                    onClick={() => handleToggle("1")}
                    uniqueId="1"
                  />
                  <WalletCardDefault
                    bgColor="#191A1A"
                    IconComponent={Icons.percentIcon}
                    walletName="Savings"
                    ethValue="25.08 ETH"
                    onClick={() => handleToggle("2")}
                    uniqueId="2"
                  />
                </div>
                <div className="flex gap-4">
                  <WalletCardDefault
                    bgColor="#06BDC8"
                    IconComponent={Icons.cloudIcon}
                    walletName="Rainy Day"
                    ethValue="0.04 ETH"
                    onClick={() => handleToggle("3")}
                    uniqueId="3"
                  />
                  <WalletCardDefault
                    bgColor="#00B2FB"
                    IconComponent={Icons.receiptIcon}
                    walletName="Spending"
                    ethValue="0 ETH"
                    onClick={() => handleToggle("4")}
                    uniqueId="4"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </MotionConfig>
  );
};

export default FamilyWallets;

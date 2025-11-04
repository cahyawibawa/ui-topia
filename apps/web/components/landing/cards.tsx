"use client";

import { motion } from "motion/react";
import { useContext, useEffect, useRef, useState } from "react";
import { getComponentsByName } from "@/lib/registry";
import { CardsContext } from "./card-context";
import { RegistryCardPreview } from "./registry-card-preview";

export default function Cards() {
  const [screen, setScreen] = useState<Window | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const positionsRef = useRef<{ [key: number]: { x: string; y: string } }>({}); // Ref to store positions of each card
  const [zIndices, setZIndices] = useState<{
    [key: number]: number;
  }>({}); // State to store z-indices of each card
  const { focusedCard } = useContext(CardsContext);

  useEffect(() => {
    setScreen(window);
    setLoading(false);

    const initialZIndices: { [key: number]: number } = {};
    for (let i = 0; i < 19; i++) {
      const newZIndex = i + 100;
      initialZIndices[i] = newZIndex;
    }
    initialZIndices[-1] = 120; // This is our max zIndex, which will increment whenever user interacts w/ a card
    setZIndices(initialZIndices);
  }, []);

  const handleCardClick = (index: number) => {
    const newZIndices = { ...zIndices };
    const maxZIndex = (newZIndices[-1] ?? 120) + 1;
    newZIndices[-1] = maxZIndex;
    newZIndices[index] = maxZIndex;
    setZIndices(newZIndices);
  };

  // Generate random positions and store them in the ref
  const getRandomPosition = (index: number) => {
    if (!positionsRef.current?.[index] && screen !== undefined) {
      // Use default width/height for all registry cards
      const defaultWidth = 200;
      const defaultHeight = 200;
      const randomX =
        Math.random() * (100 - (defaultWidth / screen.innerWidth) * 100);
      const randomY =
        Math.random() *
        (100 - (defaultHeight / (screen.innerHeight - 200)) * 100);
      positionsRef.current[index] = { x: `${randomX}vw`, y: `${randomY}vh` };
    }
    return positionsRef.current?.[index];
  };

  const FEATURED_COMPONENT_NAMES = [
    "action-search-input-demo",
    "css-box-demo",
    "cd-demo",
    "clip-path-demo",
    "expandable-tabs-demo",
    "family-wallets-demo",
    "inline-dropdown-demo",
    "text-type-demo",
  ];

  // Map names to registry items, filter out nulls
  const featuredComponents =
    FEATURED_COMPONENT_NAMES.map(getComponentsByName).filter(Boolean);

  return !loading
    ? featuredComponents.map((item, index) => {
        if (!item || screen === undefined) return null;
        const pos = getRandomPosition(index);
        const x = pos?.x ?? "0vw";
        const y = pos?.y ?? "0vh";
        const zIndex =
          typeof zIndices[index] === "number" ? zIndices[index] : 100;
        const cardInFocus = focusedCard === null || focusedCard === item.name;

        return (
          <motion.div
            key={item.name}
            className="canvas-container"
            drag
            dragMomentum={false}
            style={{
              zIndex: zIndex,
              position: "absolute",
              left: x,
              top: y,
            }}
            onMouseDown={() => handleCardClick(index)}
            onTouchStart={() => handleCardClick(index)}
            whileHover={{ translateY: -4 }}
          >
            <div
              style={{
                filter: cardInFocus ? "unset" : "blur(12px)",
                opacity: cardInFocus ? 1 : 0,
              }}
            >
              <RegistryCardPreview item={item} />
            </div>
          </motion.div>
        );
      })
    : null;
}

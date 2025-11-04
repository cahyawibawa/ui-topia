"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { CardsContext, defaultFocusedCard } from "./card-context";
import Cards from "./cards";
import { Header } from "./header";
import "@/styles/home.css";

export function LandingHero() {
  const [focusedCard, setFocusedCard] = useState<string | null>(
    defaultFocusedCard.focusedCard,
  );

  return (
    <motion.div
      className="container-canvas isolate overflow-auto"
      onHoverStart={() => setFocusedCard(null)}
    >
      {/* @ts-ignore */}
      <CardsContext.Provider value={{ focusedCard, setFocusedCard }}>
        <Header />
        <Cards />
      </CardsContext.Provider>
    </motion.div>
  );
}

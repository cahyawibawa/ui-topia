"use client";

import { createContext } from "react";

type CardsContextType = {
  focusedCard: string | null;
  setFocusedCard: React.Dispatch<React.SetStateAction<string | null>>;
};

export const defaultFocusedCard = {
  focusedCard: null,
  setFocusedCard: () => {},
};

export const CardsContext = createContext<CardsContextType>(defaultFocusedCard);

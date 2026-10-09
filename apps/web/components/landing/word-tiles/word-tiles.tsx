"use client";

import { useEffect, useRef } from "react";
import { WordTiles as WordTilesEngine } from "./engine";

interface WordTilesProps {
  words: string[];
  className?: string;
}

export function WordTiles({ words, className }: WordTilesProps) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const tiles = new WordTilesEngine(host, words);
    tiles.start();

    return () => tiles.destroy();
  }, [words]);

  return <div className={className} ref={hostRef} />;
}

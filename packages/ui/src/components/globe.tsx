"use client";

import { useSpring } from "@react-spring/web";
import createGlobe, { type COBEOptions } from "cobe";
import type React from "react";
import { useCallback, useEffect, useRef } from "react";
import { cn } from "../lib/utils";

interface GlobeProps {
  className?: string;
  config?: COBEOptions;
  dark?: boolean;
  baseColor?: string;
  glowColor?: string;
  markerColor?: string;
  opacity?: number;
  brightness?: number;
  offsetX?: number;
  offsetY?: number;
  scale?: number;
}

const DEFAULT_GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 0,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 1.2,
  baseColor: [1, 1, 1],
  markerColor: [251 / 255, 100 / 255, 21 / 255],
  glowColor: [1, 1, 1],
  markers: [
    { location: [14.5995, 120.9842], size: 0.03 },
    { location: [19.076, 72.8777], size: 0.1 },
    { location: [23.8103, 90.4125], size: 0.05 },
    { location: [30.0444, 31.2357], size: 0.07 },
    { location: [39.9042, 116.4074], size: 0.08 },
    { location: [-23.5505, -46.6333], size: 0.1 },
    { location: [19.4326, -99.1332], size: 0.1 },
    { location: [40.7128, -74.006], size: 0.1 },
    { location: [34.6937, 135.5022], size: 0.05 },
    { location: [41.0082, 28.9784], size: 0.06 },
  ],
};

const parseColor = (color: string): [number, number, number] => {
  const parsed = color.split(",").map(Number);
  if (parsed.length !== 3) {
    console.warn(`Invalid color format: ${color}. Using fallback color.`);
    return [1, 1, 1]; // Fallback to white
  }
  return parsed as [number, number, number];
};

const Globe: React.FC<GlobeProps> = ({
  className,
  config = DEFAULT_GLOBE_CONFIG,
  dark = false,
  baseColor = "119,122,128",
  glowColor = "80,80,90",
  markerColor = "34,211,238",
  opacity = 0.85,
  brightness = 1,
  offsetX = 0,
  offsetY = 0,
  scale = 1,
}) => {
  let phi = 0;
  let width = 0;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const [{ r }, api] = useSpring(() => ({
    r: 0,
    config: {
      mass: 1,
      tension: 280,
      friction: 40,
      precision: 0.001,
    },
  }));

  const updatePointerInteraction = (value: number | null) => {
    pointerInteracting.current = value;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value ? "grabbing" : "grab";
    }
  };

  const updateMovement = (clientX: number) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current;
      pointerInteractionMovement.current = delta;
      api.start({ r: delta / 200 });
    }
  };

  const onRender = useCallback(
    (state: Record<string, any>) => {
      if (!pointerInteracting.current) phi += 0.005;
      state.phi = phi + r.get();
      state.width = width * 2;
      state.height = width * 2;
    },
    [pointerInteracting, phi, r],
  );

  const onResize = () => {
    if (canvasRef.current) {
      width = canvasRef.current.offsetWidth;
    }
  };

  useEffect(() => {
    window.addEventListener("resize", onResize);
    onResize();

    const updatedConfig: COBEOptions = {
      ...config,
      width: width * 2,
      height: width * 2,
      onRender,
      dark: dark ? 1 : 0,
      baseColor: parseColor(baseColor),
      glowColor: parseColor(glowColor),
      markerColor: parseColor(markerColor),
    };

    const globe = createGlobe(canvasRef.current!, updatedConfig);

    setTimeout(() => {
      if (canvasRef.current) {
        canvasRef.current.style.opacity = "1";
      }
    });

    return () => {
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, [config, dark, baseColor, glowColor, markerColor]);

  return (
    <div
      className={cn(
        "absolute inset-0 mx-auto aspect-[1/1] w-full max-w-[600px]",
        className,
      )}
      style={{
        opacity,
        filter: `brightness(${brightness})`,
        transform: `translate(${offsetX}px, ${offsetY}px) scale(${scale})`,
      }}
    >
      <canvas
        className={cn(
          "h-full w-full opacity-0 transition-opacity duration-500 [contain:layout_paint_size]",
        )}
        ref={canvasRef}
        onPointerDown={(e) =>
          updatePointerInteraction(
            e.clientX - pointerInteractionMovement.current,
          )
        }
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) =>
          e.touches[0] && updateMovement(e.touches[0].clientX)
        }
      />
    </div>
  );
};

export default Globe;

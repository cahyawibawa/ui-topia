"use client";

import { Monitor, Moon, Sun, Volume2, VolumeX } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site";
import { isMuted, playSound, setMuted } from "@/lib/sounds";
import { Icons } from "@/registry/components/icons";
import { Button } from "@/registry/ui/button";
import { Tooltip, TooltipPopup, TooltipTrigger } from "@/registry/ui/tooltip";

function Action({
  label,
  onClick,
  className,
  children,
}: {
  label: string;
  onClick: () => void;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            aria-label={label}
            className={className}
            onClick={onClick}
            size="icon"
            variant="ghost"
          />
        }
      >
        {children}
      </TooltipTrigger>
      <TooltipPopup>{label}</TooltipPopup>
    </Tooltip>
  );
}

const THEME_CYCLE = ["system", "light", "dark"] as const;

// One button that cycles system -> light -> dark, for mobile where the
// three-way pill doesn't fit.
export function ThemeCycleButton({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const current = THEME_CYCLE.find((t) => t === theme) ?? "system";
  const next = THEME_CYCLE[(THEME_CYCLE.indexOf(current) + 1) % 3] ?? "system";
  const Icon =
    !mounted || current === "system"
      ? Monitor
      : current === "light"
        ? Sun
        : Moon;

  return (
    <Action
      className={className}
      label={mounted ? `Theme: ${current}` : "Theme"}
      onClick={() => {
        playSound("toggle");
        setTheme(next);
      }}
    >
      <Icon className="size-4" />
    </Action>
  );
}

// Sounds are opt-in: muted until the visitor turns them on.
export function SoundToggle({ className }: { className?: string }) {
  const [muted, setMutedState] = useState(true);
  useEffect(() => setMutedState(isMuted()), []);

  const Icon = muted ? VolumeX : Volume2;

  return (
    <Action
      className={className}
      label={muted ? "Unmute sounds" : "Mute sounds"}
      onClick={() => {
        const next = !muted;
        setMuted(next);
        setMutedState(next);
        if (!next) playSound("tap");
      }}
    >
      <Icon className="size-4" />
    </Action>
  );
}

export function GithubButton({ className }: { className?: string }) {
  return (
    <Action
      className={className}
      label="GitHub"
      onClick={() => {
        playSound("tap");
        window.open(siteConfig.links.github, "_blank", "noopener,noreferrer");
      }}
    >
      <Icons.gitHub className="size-4" />
    </Action>
  );
}

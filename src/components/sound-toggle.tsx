"use client";

import { Volume2, VolumeX } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export function SoundToggle({ className }: { className?: string }) {
  const { soundEnabled, toggleSound } = useAppStore();

  return (
    <button
      onClick={toggleSound}
      className={cn(
        "flex items-center justify-center rounded-lg border border-void-border bg-void-surface/50 p-2 text-void-muted transition-colors hover:text-void-text",
        soundEnabled && "text-accent-purple border-accent-purple/30",
        className
      )}
      aria-label={soundEnabled ? "Mute navigation sounds" : "Enable navigation sounds"}
      title={soundEnabled ? "Sound on" : "Sound off"}
    >
      {soundEnabled ? (
        <Volume2 className="h-4 w-4" />
      ) : (
        <VolumeX className="h-4 w-4" />
      )}
    </button>
  );
}

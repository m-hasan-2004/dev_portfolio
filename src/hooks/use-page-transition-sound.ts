"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useAppStore } from "@/lib/store";
import { getAudioContext, playPageTransition } from "@/lib/audio";

export function usePageTransitionSound() {
  const pathname = usePathname();
  const soundEnabled = useAppStore((s) => s.soundEnabled);
  const isFirst = useRef(true);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    if (!soundEnabled) return;

    const ctx = getAudioContext();
    playPageTransition(ctx, ctx.currentTime);
  }, [pathname, soundEnabled]);
}

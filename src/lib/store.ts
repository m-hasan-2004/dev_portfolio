"use client";

import { create } from "zustand";

interface AppState {
  theme: "dark" | "light";
  commandOpen: boolean;
  soundEnabled: boolean;
  toggleTheme: () => void;
  setCommandOpen: (open: boolean) => void;
  toggleSound: () => void;
}

function getInitialSound(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return localStorage.getItem("sound-enabled") === "true";
  } catch {
    return false;
  }
}

export const useAppStore = create<AppState>((set) => ({
  theme: "dark",
  commandOpen: false,
  soundEnabled: getInitialSound(),
  toggleTheme: () =>
    set((state) => ({
      theme: state.theme === "dark" ? "light" : "dark",
    })),
  setCommandOpen: (open) => set({ commandOpen: open }),
  toggleSound: () =>
    set((state) => {
      const next = !state.soundEnabled;
      try {
        localStorage.setItem("sound-enabled", JSON.stringify(next));
      } catch {}
      return { soundEnabled: next };
    }),
}));

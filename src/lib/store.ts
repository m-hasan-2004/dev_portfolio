"use client";

import { create } from "zustand";

interface AppState {
  theme: "dark" | "light";
  commandOpen: boolean;
  toggleTheme: () => void;
  setCommandOpen: (open: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  theme: "dark",
  commandOpen: false,
  toggleTheme: () =>
    set((state) => ({
      theme: state.theme === "dark" ? "light" : "dark",
    })),
  setCommandOpen: (open) => set({ commandOpen: open }),
}));

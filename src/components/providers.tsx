"use client";

import { ThemeProvider } from "next-themes";
import { CommandPalette } from "@/components/sections/command-palette";
import { PageTransitionSound } from "@/components/page-transition-sound";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      {children}
      <CommandPalette />
      <PageTransitionSound />
    </ThemeProvider>
  );
}

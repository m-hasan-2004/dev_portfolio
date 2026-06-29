"use client";

import { ThemeProvider } from "next-themes";
import { CommandPalette } from "@/components/sections/command-palette";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      {children}
      <CommandPalette />
    </ThemeProvider>
  );
}

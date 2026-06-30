"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Terminal, Menu, X, Settings, Sun, Moon, Volume2, VolumeX } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/lib/store";
import { playUiClick } from "@/lib/audio";
import { useTheme } from "next-themes";
import { BuiltWith } from "@/components/built-with";

const baseLinks = [
  { href: "/", label: "Home" },
  { href: "/lab", label: "Lab" },
  { href: "/stack", label: "Stack" },
  { href: "/experience", label: "Experience" },
  { href: "/connect", label: "Connect" },
];

export function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const setCommandOpen = useAppStore((s) => s.setCommandOpen);
  const soundEnabled = useAppStore((s) => s.soundEnabled);
  const toggleSound = useAppStore((s) => s.toggleSound);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const navLinks = baseLinks;

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 glass"
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-accent-purple to-accent-blue">
            <Terminal className="h-4 w-4 text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight">Void</span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "relative rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                pathname === link.href
                  ? "text-void-text"
                  : "text-void-muted hover:text-void-text"
              )}
            >
              {pathname === link.href && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute inset-0 rounded-lg bg-void-card border border-void-border"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{link.label}</span>
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {mounted && (
            <button
              onClick={() => { playUiClick(); setTheme(theme === "dark" ? "light" : "dark"); }}
              className="hidden md:flex items-center justify-center rounded-lg border border-void-border bg-void-surface/50 p-2 text-void-muted transition-colors hover:text-void-text"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </button>
          )}

          {mounted && (
            <button
              onClick={toggleSound}
              className="hidden md:flex items-center justify-center rounded-lg border border-void-border bg-void-surface/50 p-2 text-void-muted transition-colors hover:text-void-text"
              aria-label={soundEnabled ? "Mute sounds" : "Enable sounds"}
            >
              {soundEnabled ? (
                <Volume2 className="h-4 w-4" />
              ) : (
                <VolumeX className="h-4 w-4" />
              )}
            </button>
          )}

          {mounted && <div className="hidden md:block"><BuiltWith /></div>}

          <button
            onClick={() => { playUiClick(); setCommandOpen(true); }}
            className="hidden md:flex items-center justify-center rounded-lg border border-void-border bg-void-surface/50 p-2 text-void-muted transition-colors hover:text-void-text"
            aria-label="Settings"
          >
            <Settings className="h-4 w-4" />
          </button>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden rounded-lg p-2 hover:bg-void-surface"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden border-t border-void-border"
        >
          <div className="flex flex-col gap-1 p-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                  pathname === link.href
                    ? "bg-void-card text-void-text"
                    : "text-void-muted hover:bg-void-surface hover:text-void-text"
                )}
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={() => { playUiClick(); setTheme(theme === "dark" ? "light" : "dark"); }}
              className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-void-muted hover:bg-void-surface hover:text-void-text transition-colors"
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
              {theme === "dark" ? "Light mode" : "Dark mode"}
            </button>
            <button
              onClick={toggleSound}
              className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-void-muted hover:bg-void-surface hover:text-void-text transition-colors"
            >
              {soundEnabled ? (
                <Volume2 className="h-4 w-4" />
              ) : (
                <VolumeX className="h-4 w-4" />
              )}
              {soundEnabled ? "Sound on" : "Sound off"}
            </button>
            <BuiltWith mobile />
            <button
              onClick={() => { playUiClick(); setCommandOpen(true); setMobileOpen(false); }}
              className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-void-muted hover:bg-void-surface hover:text-void-text transition-colors"
            >
              <Settings className="h-4 w-4" />
              Settings
            </button>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}

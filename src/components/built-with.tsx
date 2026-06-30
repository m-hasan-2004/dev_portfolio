"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, X } from "lucide-react";
import { useNpmVersions } from "@/hooks/use-npm-versions";
import { playUiClick } from "@/lib/audio";

export function BuiltWith({ mobile }: { mobile?: boolean }) {
  const [open, setOpen] = useState(false);
  const versions = useNpmVersions();

  const toggle = () => {
    playUiClick();
    setOpen((o) => !o);
  };

  if (mobile) {
    return (
      <div className="relative">
        <button
          onClick={toggle}
          className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-void-muted hover:bg-void-surface hover:text-void-text transition-colors"
        >
          <Code2 className="h-4 w-4" />
          Built with
        </button>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="flex flex-wrap gap-2 px-4 pb-3">
                {versions.map((pkg) => (
                  <span
                    key={pkg.name}
                    className="inline-flex items-center gap-1.5 rounded-md border border-void-border bg-void-surface/50 px-2 py-1 text-xs text-void-muted"
                  >
                    {pkg.label}
                    <span className="font-mono text-void-text/60">v{pkg.version}</span>
                  </span>
                ))}
                {!versions.length && (
                  <span className="text-xs text-void-muted">Loading...</span>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={toggle}
        className="flex items-center justify-center rounded-lg border border-void-border bg-void-surface/50 p-2 text-void-muted transition-colors hover:text-void-text"
        aria-label="Built with"
        title="Built with"
      >
        <Code2 className="h-4 w-4" />
      </button>
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={toggle}
            />
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 top-full z-50 mt-2 w-64 rounded-xl border border-void-border bg-void-surface p-3 shadow-xl"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-void-text uppercase tracking-wider">Built with</span>
                <button onClick={toggle} className="text-void-muted hover:text-void-text">
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {versions.map((pkg) => (
                  <span
                    key={pkg.name}
                    className="inline-flex items-center gap-1.5 rounded-md border border-void-border bg-void-bg/50 px-2 py-1 text-xs text-void-muted"
                  >
                    {pkg.label}
                    <span className="font-mono text-void-text/60">v{pkg.version}</span>
                  </span>
                ))}
                {!versions.length && (
                  <span className="text-xs text-void-muted">Loading...</span>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

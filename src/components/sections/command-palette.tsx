"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { useKeyboard } from "@/hooks/use-keyboard";
import { useRouter } from "next/navigation";
import {
  Home,
  FlaskConical,
  Layers,
  Briefcase,
  Mail,
  Github,
  Search,
} from "lucide-react";

const basePages = [
  { icon: Home, label: "Home", href: "/" },
  { icon: FlaskConical, label: "Lab", href: "/lab" },
  { icon: Layers, label: "Stack", href: "/stack" },
  { icon: Briefcase, label: "Experience", href: "/experience" },
  { icon: Mail, label: "Connect", href: "/connect" },
];

const links = [
  { icon: Github, label: "GitHub", href: "https://github.com/m-hasan-2004" },
];

export function CommandPalette() {
  const router = useRouter();
  const { commandOpen, setCommandOpen } = useAppStore();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  useKeyboard();

  useEffect(() => {
    if (commandOpen) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [commandOpen]);

  const allItems = [
    ...basePages.map((p) => ({ ...p, type: "page" as const })),
    ...links.map((l) => ({ ...l, type: "link" as const })),
  ];

  const filtered = allItems.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (item: (typeof allItems)[number]) => {
    if (item.type === "link") {
      window.open(item.href, "_blank");
    } else {
      router.push(item.href);
    }
    setCommandOpen(false);
  };

  return (
    <AnimatePresence>
      {commandOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-void-bg/60 backdrop-blur-sm"
            onClick={() => setCommandOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="relative z-10 w-full max-w-lg mx-4"
          >
            <div className="rounded-xl border border-void-border bg-void-surface shadow-2xl overflow-hidden">
              <div className="flex items-center gap-3 border-b border-void-border px-4 py-3">
                <Search className="h-4 w-4 text-void-muted shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Type a command or search..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Escape") setCommandOpen(false);
                  }}
                  className="flex-1 bg-transparent text-sm text-void-text placeholder:text-void-muted outline-none"
                />
                <kbd className="hidden sm:inline-flex items-center rounded border border-void-border bg-void-bg px-1.5 py-0.5 text-[10px] text-void-muted">
                  ESC
                </kbd>
              </div>
              <div className="max-h-80 overflow-y-auto p-2">
                {filtered.length === 0 ? (
                  <div className="py-8 text-center text-sm text-void-muted">
                    No results found.
                  </div>
                ) : (
                  filtered.map((item) => (
                    <button
                      key={item.label}
                      onClick={() => handleSelect(item)}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-void-text hover:bg-void-card transition-colors"
                    >
                      <item.icon className="h-4 w-4 text-void-muted" />
                      <span>{item.label}</span>
                    </button>
                  ))
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

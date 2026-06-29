"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Code2, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTypewriter } from "@/hooks/use-typewriter";
import { Badge } from "@/components/ui/badge";

const roles = ["Backend Developer", "API Architect", "System Builder"];

const highlights = [
  { icon: "⚡", title: "Fast APIs", desc: "Building high-performance backend systems" },
  { icon: "🔧", title: "Clean Code", desc: "Writing maintainable, scalable Python" },
  { icon: "🚀", title: "Ship Fast", desc: "From idea to production in record time" },
];

export function HeroSection() {
  const typedText = useTypewriter(roles, 80, 2000);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-20">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-accent-purple/10 blur-[128px] animate-glow-pulse" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-accent-blue/10 blur-[128px] animate-glow-pulse" style={{ animationDelay: "1.5s" }} />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Badge variant="glow" className="mb-6 inline-flex">
            <Code2 className="mr-1.5 h-3 w-3" />
            Available for projects
          </Badge>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6">
            <span className="block text-void-text">Void</span>
            <span className="block gradient-text mt-2">Developer & Builder</span>
          </h1>

          <div className="h-10 flex items-center justify-center mb-8">
            <span className="text-xl md:text-2xl text-void-muted font-mono">
              {typedText}
              <span className="inline-block w-0.5 h-6 ml-1 bg-accent-purple animate-pulse" />
            </span>
          </div>

          <p className="mx-auto max-w-2xl text-lg text-void-muted mb-10 text-balance">
            Crafting robust backend systems, designing clean APIs, and building tools
            that make a difference. Focused on Python, Django, and modern infrastructure.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/lab">
              <Button variant="glow" size="lg" className="group">
                Explore Lab
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/stack">
              <Button variant="outline" size="lg">
                View Stack
              </Button>
            </Link>
            <Link href="https://github.com/m-hasan-2004" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="lg">
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </Button>
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          {highlights.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + i * 0.1 }}
              className="glass rounded-xl p-6 text-left group hover:border-accent-purple/30 transition-all duration-300"
            >
              <div className="text-2xl mb-3">{item.icon}</div>
              <h3 className="font-semibold mb-1">{item.title}</h3>
              <p className="text-sm text-void-muted">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

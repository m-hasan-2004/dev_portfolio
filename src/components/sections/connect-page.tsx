"use client";

import { motion } from "framer-motion";
import { Github, Twitter, Instagram } from "lucide-react";

const socials = [
  {
    icon: Github,
    label: "GitHub",
    handle: "m-hasan-2004",
    href: "https://github.com/m-hasan-2004",
    color: "from-gray-400 to-gray-600",
  },
  {
    icon: Twitter,
    label: "X (Twitter)",
    handle: "@voidnull004",
    href: "https://x.com/voidnull004",
    color: "from-blue-400 to-blue-600",
  },
  {
    icon: Instagram,
    label: "Instagram",
    handle: "@void.null004",
    href: "https://www.instagram.com/void.null004/",
    color: "from-pink-400 to-purple-600",
  },
];

export function ConnectPage() {
  return (
    <section className="min-h-screen pt-24 pb-16 px-6">
      <div className="mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Connect</span>
          </h1>
          <p className="text-void-muted text-lg">
            Let&apos;s build something great together. Reach out or follow along.
          </p>
        </motion.div>

        <div className="space-y-4">
          {socials.map((social, i) => (
            <motion.a
              key={social.href}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group block"
            >
              <div className="glass rounded-xl p-6 flex items-center gap-5 transition-all duration-300 hover:border-accent-purple/40 hover:shadow-lg hover:shadow-accent-purple/5">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${social.color} shrink-0`}
                >
                  <social.icon className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold group-hover:text-accent-purple transition-colors">
                    {social.label}
                  </h3>
                  <p className="text-sm text-void-muted truncate">{social.handle}</p>
                </div>
                <div className="shrink-0">
                  <svg
                    className="h-5 w-5 text-void-muted group-hover:text-accent-purple transition-all group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

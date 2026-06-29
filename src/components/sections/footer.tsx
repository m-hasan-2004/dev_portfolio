import { Github, Twitter, Instagram, Terminal } from "lucide-react";
import Link from "next/link";

const links = [
  { icon: Github, href: "https://github.com/m-hasan-2004", label: "GitHub" },
  { icon: Twitter, href: "https://x.com/voidnull004", label: "X" },
  { icon: Instagram, href: "https://www.instagram.com/void.null004/", label: "Instagram" },
];

export function Footer() {
  return (
    <footer className="border-t border-void-border">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-8">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded bg-gradient-to-br from-accent-purple to-accent-blue">
            <Terminal className="h-3 w-3 text-white" />
          </div>
          <span className="text-sm font-medium">Void</span>
        </div>

        <div className="flex items-center gap-4">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-void-muted transition-colors hover:text-accent-purple"
              aria-label={link.label}
            >
              <link.icon className="h-4 w-4" />
            </a>
          ))}
        </div>

        <p className="text-xs text-void-muted">
          Built by Hasan
        </p>
      </div>
    </footer>
  );
}

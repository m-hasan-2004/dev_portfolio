"use client";

import { useEffect, useState } from "react";

const packages = [
  { name: "next", label: "Next.js" },
  { name: "react", label: "React" },
  { name: "framer-motion", label: "Framer Motion" },
  { name: "tailwindcss", label: "Tailwind CSS" },
  { name: "zustand", label: "Zustand" },
  { name: "typescript", label: "TypeScript" },
  { name: "lucide-react", label: "Lucide" },
];

interface PkgVersion {
  name: string;
  label: string;
  version: string;
}

export function useNpmVersions() {
  const [versions, setVersions] = useState<PkgVersion[]>([]);

  useEffect(() => {
    const cacheKey = "npm-versions-cache";
    const cacheTtl = 60 * 60 * 1000; // 1 hour

    try {
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        const { data, ts } = JSON.parse(cached);
        if (Date.now() - ts < cacheTtl) {
          setVersions(data);
          return;
        }
      }
    } catch {}

    Promise.all(
      packages.map(async (pkg) => {
        try {
          const res = await fetch(`https://registry.npmjs.org/${pkg.name}/latest`);
          const data = await res.json();
          return { name: pkg.name, label: pkg.label, version: data.version };
        } catch {
          return { name: pkg.name, label: pkg.label, version: "?" };
        }
      })
    ).then((results) => {
      setVersions(results);
      try {
        localStorage.setItem(cacheKey, JSON.stringify({ data: results, ts: Date.now() }));
      } catch {}
    });
  }, []);

  return versions;
}

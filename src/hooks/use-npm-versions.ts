"use client";

import { useState } from "react";

const stack = [
  { name: "next", label: "Next.js", version: "14.2" },
  { name: "typescript", label: "TypeScript", version: "5.5" },
  { name: "tailwindcss", label: "Tailwind CSS", version: "3.4" },
  { name: "class-variance-authority", label: "shadcn/ui", version: "0.7" },
  { name: "framer-motion", label: "Framer Motion", version: "11.0" },
  { name: "zustand", label: "Zustand", version: "4.5" },
  { name: "lucide-react", label: "Lucide React", version: "0.400" },
];

export function useNpmVersions() {
  const [versions] = useState(stack);
  return versions;
}

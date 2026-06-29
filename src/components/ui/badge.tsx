import * as React from "react";
import { cn } from "@/lib/utils";

const Badge = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { variant?: "default" | "outline" | "glow" }
>(({ className, variant = "default", ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-colors",
      variant === "default" && "bg-accent-purple/10 text-accent-purple border border-accent-purple/20",
      variant === "outline" && "border border-void-border text-void-muted",
      variant === "glow" && "bg-gradient-to-r from-accent-purple/20 to-accent-blue/20 text-white border border-accent-purple/30",
      className
    )}
    {...props}
  />
));
Badge.displayName = "Badge";

export { Badge };

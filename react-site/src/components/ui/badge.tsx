import * as React from "react";
import { cn } from "@/lib/utils";

const Badge = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement> & { variant?: "default" | "red" | "gold" | "muted" }>(
  ({ className, variant = "default", ...props }, ref) => <span ref={ref} className={cn("ui-badge", `ui-badge-${variant}`, className)} {...props} />
);
Badge.displayName = "Badge";

export { Badge };

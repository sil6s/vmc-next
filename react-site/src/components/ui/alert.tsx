import * as React from "react";
import { cn } from "@/lib/utils";

const Alert = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { tone?: "default" | "success" | "warning" | "danger" }>(
  ({ className, tone = "default", ...props }, ref) => <div ref={ref} role="note" className={cn("ui-alert", `ui-alert-${tone}`, className)} {...props} />
);
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => <h3 ref={ref} className={cn("ui-alert-title", className)} {...props} />
);
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => <p ref={ref} className={cn("ui-alert-description", className)} {...props} />
);
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertDescription, AlertTitle };

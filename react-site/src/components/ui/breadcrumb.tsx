import Link from "next/link";
import * as React from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const Breadcrumb = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => <nav ref={ref} aria-label="Breadcrumb" className={cn("ui-breadcrumb", className)} {...props} />
);
Breadcrumb.displayName = "Breadcrumb";

const BreadcrumbList = React.forwardRef<HTMLOListElement, React.OlHTMLAttributes<HTMLOListElement>>(
  ({ className, ...props }, ref) => <ol ref={ref} className={cn("ui-breadcrumb-list", className)} {...props} />
);
BreadcrumbList.displayName = "BreadcrumbList";

const BreadcrumbItem = React.forwardRef<HTMLLIElement, React.LiHTMLAttributes<HTMLLIElement>>(
  ({ className, ...props }, ref) => <li ref={ref} className={cn("ui-breadcrumb-item", className)} {...props} />
);
BreadcrumbItem.displayName = "BreadcrumbItem";

function BreadcrumbLink({ className, ...props }: React.ComponentProps<typeof Link>) {
  return <Link className={cn("ui-breadcrumb-link", className)} {...props} />;
}

const BreadcrumbPage = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => <span ref={ref} aria-current="page" className={cn("ui-breadcrumb-page", className)} {...props} />
);
BreadcrumbPage.displayName = "BreadcrumbPage";

function BreadcrumbSeparator() {
  return (
    <li aria-hidden="true" className="ui-breadcrumb-separator">
      <ChevronRight size={14} />
    </li>
  );
}

export { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator };

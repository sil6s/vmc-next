"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { eventForLink, trackEvent } from "@/lib/analytics";

const defaultWebsiteId = "0813c9dd-6780-4f8b-b077-d436f710d058";
const defaultScriptUrl = "https://cloud.umami.is/script.js";

export function UmamiTracker() {
  const pathname = usePathname();
  const isAdminSurface = pathname?.startsWith("/dashboard") || pathname?.startsWith("/login") || pathname?.startsWith("/not-authorized");
  const websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID || defaultWebsiteId;
  const scriptUrl = process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL || defaultScriptUrl;

  useEffect(() => {
    if (isAdminSurface) return;

    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const link = target.closest("a");
      if (!link) return;

      const eventName = link.dataset.analyticsEvent || eventForLink(link.href || link.getAttribute("href") || "", link.textContent || "");
      if (eventName) {
        trackEvent(eventName as Parameters<typeof trackEvent>[0], {
          href: link.href || link.getAttribute("href") || "",
          label: link.textContent?.trim() || ""
        });
      }
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [isAdminSurface]);

  if (isAdminSurface || !websiteId || !scriptUrl) return null;

  return <Script defer src={scriptUrl} data-website-id={websiteId} strategy="afterInteractive" />;
}

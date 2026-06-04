"use client";

import { useEffect } from "react";
import { localizedHref, type Locale } from "@/lib/i18n";

export function LocalizedStaticLinks({ locale }: { locale: Locale }) {
  useEffect(() => {
    if (locale === "en") {
      return;
    }

    const updateLinks = () => {
      document.querySelectorAll<HTMLAnchorElement>("main a[href]").forEach((link) => {
        const href = link.getAttribute("href");
        if (!href) {
          return;
        }

        const nextHref = localizedHref(href, locale);
        if (nextHref !== href) {
          link.setAttribute("href", nextHref);
        }
      });
    };

    updateLinks();

    const observer = new MutationObserver(updateLinks);
    const main = document.querySelector("main");
    if (main) {
      observer.observe(main, { childList: true, subtree: true });
    }

    return () => observer.disconnect();
  }, [locale]);

  return null;
}

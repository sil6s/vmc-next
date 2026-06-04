"use client";

import { useEffect } from "react";
import { getStaticPageTranslationDictionary } from "@/data/static-page-translations";
import type { Locale } from "@/lib/i18n";

function translateDynamic(text: string, dictionary: Record<string, string>, locale: Locale) {
  const trimmed = text.trim();
  if (dictionary[trimmed]) return text.replace(trimmed, dictionary[trimmed]);
  if (locale !== "es") return text;

  const translateServiceName = (value: string) => dictionary[value] || value;
  const next = text
    .replace(/^What (.+) helps with\.$/, (_match, service) => `En qué ayuda ${translateServiceName(service)}.`)
    .replace(/^How Veterinary Medical Centers approaches (.+)\.$/, (_match, service) => `Cómo aborda Veterinary Medical Centers ${translateServiceName(service)}.`)
    .replace(/^Frequently asked questions about (.+)\.$/, (_match, service) => `Preguntas frecuentes sobre ${translateServiceName(service)}.`)
    .replace(/^Call (Fort Thomas|Independence)$/, "Llamar a $1")
    .replace(/^(Fort Thomas|Independence) Veterinary Medical Center$/, "Veterinary Medical Center de $1")
    .replace(/^Reviewed (.+)$/, "Revisado $1");
  return next;
}

export function StaticPageTranslator({ locale }: { locale: Locale }) {
  useEffect(() => {
    if (locale === "en") return;
    const dictionary = getStaticPageTranslationDictionary(locale);
    const root = document.querySelector<HTMLElement>("main");
    if (!root) return;

    const translate = () => {
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      let node = walker.nextNode();
      while (node) {
        const parent = node.parentElement;
        const text = node.textContent || "";
        const trimmed = text.trim();
        if (parent && trimmed && !parent.closest("script, style, [data-no-translate]")) {
          const translated = translateDynamic(text, dictionary, locale);
          if (translated !== text) node.textContent = translated;
        }
        node = walker.nextNode();
      }

      root.querySelectorAll<HTMLElement>("[aria-label], [placeholder], [title]").forEach((element) => {
        for (const attribute of ["aria-label", "placeholder", "title"]) {
          const value = element.getAttribute(attribute);
          if (value) {
            const translated = translateDynamic(value, dictionary, locale);
            if (translated !== value) element.setAttribute(attribute, translated);
          }
        }
      });
    };

    translate();
    const observer = new MutationObserver(translate);
    observer.observe(root, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [locale]);

  return null;
}

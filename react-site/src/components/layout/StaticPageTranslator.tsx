import { getStaticPageTranslationDictionary } from "@/data/static-page-translations";
import type { Locale } from "@/lib/i18n";

function safeJson(value: unknown) {
  return JSON.stringify(value).replace(/[<>&\u2028\u2029]/g, (character) => {
    const replacements: Record<string, string> = {
      "<": "\\u003c",
      ">": "\\u003e",
      "&": "\\u0026",
      "\u2028": "\\u2028",
      "\u2029": "\\u2029"
    };
    return replacements[character];
  });
}

/** Applies the saved, one-time LibreTranslate dictionary after page parsing. */
export function StaticPageTranslator({ locale }: { locale: Locale }) {
  if (locale === "en") return null;

  const dictionary = safeJson(getStaticPageTranslationDictionary(locale));
  const script = `(() => {
    const dictionary = ${dictionary};
    const translate = () => {
      const root = document.querySelector("#main");
      if (!root) return;
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      let node = walker.nextNode();
      while (node) {
        const parent = node.parentElement;
        const original = node.textContent || "";
        const trimmed = original.trim();
        if (parent && trimmed && !parent.closest("script, style, [data-no-translate]")) {
          const replacement = dictionary[trimmed];
          if (replacement) node.textContent = original.replace(trimmed, replacement);
        }
        node = walker.nextNode();
      }
      root.querySelectorAll("[aria-label], [placeholder], [title]").forEach((element) => {
        ["aria-label", "placeholder", "title"].forEach((attribute) => {
          const original = element.getAttribute(attribute);
          const replacement = original && dictionary[original.trim()];
          if (replacement) element.setAttribute(attribute, replacement);
        });
      });
    };
    const start = () => {
      translate();
      window.setTimeout(translate, 100);
      window.setTimeout(translate, 500);
    };
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start, { once: true });
    else start();
  })();`;

  return <script data-static-page-translator={locale} dangerouslySetInnerHTML={{ __html: script }} />;
}

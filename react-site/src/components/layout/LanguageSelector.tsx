"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { ChevronDown, Languages } from "lucide-react";
import { isLocalizedStaticPath, localeNames, locales, stripLocale, type Locale } from "@/lib/i18n";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function LanguageSelector({ locale, label, compact = false }: { locale: Locale; label: string; compact?: boolean }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const basePath = stripLocale(pathname);
  const localizedBasePath = isLocalizedStaticPath(basePath) ? basePath : "/";
  const query = searchParams.toString();

  function localeHref(nextLocale: Locale) {
    const nextPath = nextLocale === "en" ? localizedBasePath : localizedBasePath === "/" ? `/${nextLocale}/` : `/${nextLocale}${localizedBasePath}`;
    return query ? `${nextPath}?${query}` : nextPath;
  }

  function changeLocale(nextLocale: Locale) {
    window.location.href = localeHref(nextLocale);
  }

  if (compact) {
    return (
      <details className="language-selector language-selector-compact footer-language-menu">
        <summary aria-label={label}>
          <Languages aria-hidden="true" size={16} />
          <span>{localeNames[locale]}</span>
          <ChevronDown aria-hidden="true" size={16} />
        </summary>
        <div className="footer-language-options" aria-label={label}>
          {locales.map((item) => (
            <a key={item} href={localeHref(item)} aria-current={item === locale ? "page" : undefined}>
              {localeNames[item]}
            </a>
          ))}
        </div>
      </details>
    );
  }

  return (
    <div className={`language-selector${compact ? " language-selector-compact" : ""}`}>
      <label>
        <Languages aria-hidden="true" size={16} />
        <span>{label}</span>
      </label>
      <Select value={locale} onValueChange={(value) => changeLocale(value as Locale)}>
        <SelectTrigger aria-label={label}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {locales.map((item) => (
            <SelectItem key={item} value={item}>
              {localeNames[item]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Languages } from "lucide-react";
import { isLocalizedStaticPath, localeNames, locales, stripLocale, type Locale } from "@/lib/i18n";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function LanguageSelector({ locale, label, compact = false }: { locale: Locale; label: string; compact?: boolean }) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  function changeLocale(nextLocale: Locale) {
    const basePath = stripLocale(pathname);
    const localizedBasePath = isLocalizedStaticPath(basePath) ? basePath : "/";
    const nextPath = nextLocale === "en" ? localizedBasePath : localizedBasePath === "/" ? `/${nextLocale}/` : `/${nextLocale}${localizedBasePath}`;
    const query = searchParams.toString();
    router.push(query ? `${nextPath}?${query}` : nextPath);
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

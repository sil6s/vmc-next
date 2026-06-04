import { Info } from "lucide-react";
import { getMessages, type Locale } from "@/lib/i18n";

export function TranslationBanner({ locale }: { locale: Locale }) {
  if (locale === "en") {
    return null;
  }

  const copy = getMessages(locale);

  return (
    <aside className="translation-banner" aria-label={copy.translationTitle}>
      <Info aria-hidden="true" size={17} />
      <div>
        <strong>{copy.translationTitle}</strong>
        <span>{copy.translationNotice}</span>
      </div>
    </aside>
  );
}

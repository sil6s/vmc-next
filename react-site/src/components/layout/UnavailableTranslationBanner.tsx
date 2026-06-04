import Link from "next/link";
import { Languages } from "lucide-react";
import { getMessages, type Locale } from "@/lib/i18n";

export function UnavailableTranslationBanner({ locale, englishPath }: { locale: Locale; englishPath: string }) {
  if (locale === "en") {
    return null;
  }

  const copy = getMessages(locale);

  return (
    <aside className="unavailable-translation-banner" aria-label={copy.unavailableTitle}>
      <Languages aria-hidden="true" size={19} />
      <div>
        <strong>{copy.unavailableTitle}</strong>
        <span>{copy.unavailableNotice}</span>
      </div>
      <Link href={englishPath}>{copy.continueEnglish}</Link>
    </aside>
  );
}

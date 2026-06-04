import { Languages } from "lucide-react";
import { getMessages, type Locale } from "@/lib/i18n";

export function CommunicationSupportNotice({
  locale,
  className = "",
  appointmentForm = false
}: {
  locale: Locale;
  className?: string;
  appointmentForm?: boolean;
}) {
  if (locale === "en") {
    return null;
  }

  const copy = getMessages(locale);

  return (
    <aside className={`communication-support-notice${className ? ` ${className}` : ""}`} role="note">
      <Languages aria-hidden="true" size={19} />
      <div>
        <strong>{copy.communicationTitle}</strong>
        <p>{appointmentForm ? copy.appointmentCommunicationNotice : copy.communicationNotice}</p>
      </div>
    </aside>
  );
}

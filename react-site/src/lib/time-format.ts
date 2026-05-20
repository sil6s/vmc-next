const easternTimeZone = "America/New_York";

export function parseClinicTime(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return null;

  const twelveHour = trimmed.match(/^(\d{1,2})(?::(\d{2}))?\s*([ap])\.?m\.?$/i);
  if (twelveHour) {
    const rawHour = Number(twelveHour[1]);
    const minute = Number(twelveHour[2] || "0");
    if (rawHour < 1 || rawHour > 12 || minute < 0 || minute > 59) return null;
    const period = twelveHour[3].toLowerCase();
    const hour = period === "p" ? (rawHour === 12 ? 12 : rawHour + 12) : rawHour === 12 ? 0 : rawHour;
    return { hour, minute };
  }

  const twentyFourHour = trimmed.match(/^(\d{1,2}):(\d{2})$/);
  if (twentyFourHour) {
    const hour = Number(twentyFourHour[1]);
    const minute = Number(twentyFourHour[2]);
    if (hour < 0 || hour > 23 || minute < 0 || minute > 59) return null;
    return { hour, minute };
  }

  return null;
}

export function formatClinicTime(value: string) {
  const parsed = parseClinicTime(value);
  if (!parsed) return value.trim();

  const date = new Date(2026, 0, 1, parsed.hour, parsed.minute, 0, 0);
  return date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
}

export function formatEasternDateTime(value: string | Date) {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: easternTimeZone
  });
}

export function formatLocalTime(value: string | Date) {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  return date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
}

export { easternTimeZone };

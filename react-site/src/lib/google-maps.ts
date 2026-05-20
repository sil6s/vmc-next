const googleMapsHosts = new Set(["google.com", "www.google.com", "maps.google.com", "maps.app.goo.gl", "goo.gl"]);

export function safeUrl(value: string) {
  try {
    return new URL(value.trim());
  } catch {
    return null;
  }
}

export function isGoogleMapsUrl(value: string) {
  const url = safeUrl(value);
  if (!url || !["http:", "https:"].includes(url.protocol)) return false;
  const host = url.hostname.toLowerCase();
  if (!googleMapsHosts.has(host)) return false;
  if (host === "maps.app.goo.gl") return true;
  if (host === "goo.gl" && url.pathname.startsWith("/maps")) return true;
  return /(^|\/)(maps|search|place|dir|embed|q|s)\b/i.test(url.pathname + url.search);
}

export function isGoogleMapsEmbedUrl(value: string) {
  const url = safeUrl(value);
  if (!url || !["http:", "https:"].includes(url.protocol)) return false;
  return ["www.google.com", "google.com", "maps.google.com"].includes(url.hostname.toLowerCase()) && url.pathname.startsWith("/maps/embed");
}

export function googleMapsStatus(value: string, type: "link" | "embed") {
  if (!value.trim()) return { ok: false, label: "Missing URL", message: "Add a Google Maps URL." };
  const ok = type === "embed" ? isGoogleMapsEmbedUrl(value) : isGoogleMapsUrl(value);
  if (ok) return { ok: true, label: "Looks valid", message: type === "embed" ? "Embed URL can render a map preview." : "Directions link opens in Google Maps." };
  return {
    ok: false,
    label: "Needs review",
    message: type === "embed" ? "Use a Google Maps embed URL that starts with https://www.google.com/maps/embed." : "Use a Google Maps directions, place, search, or share URL."
  };
}

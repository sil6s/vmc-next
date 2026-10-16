/**
 * "Last reviewed" dates for guides, blog posts, and the AI business profile.
 *
 * The team reviews this content twice a week, so the displayed review date is the most recent
 * scheduled review day (in Eastern time). It is never more than a few days old.
 *
 * This is deliberately separate from "dateModified": that should only change when content changes.
 * Review dates are exposed to search engines via schema.org `lastReviewed` on the WebPage.
 *
 * Pages that show this date must revalidate periodically (see REVIEW_REVALIDATE_SECONDS).
 */

/** Review days: 0 = Sunday … 6 = Saturday. Monday and Thursday by default. */
export const REVIEW_WEEKDAYS = [1, 4];

/** How often statically generated pages re-render so the review date stays current (6 hours). */
export const REVIEW_REVALIDATE_SECONDS = 21600;

const TIME_ZONE = "America/New_York";

function easternParts(date: Date) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "short"
  }).formatToParts(date);
  const get = (type: string) => parts.find((part) => part.type === type)?.value || "";
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return { year: Number(get("year")), month: Number(get("month")), day: Number(get("day")), weekday: weekdays.indexOf(get("weekday")) };
}

/** Most recent review day on or before `now`, as an ISO date (YYYY-MM-DD). */
export function lastReviewedDate(now: Date = new Date()): string {
  const { year, month, day, weekday } = easternParts(now);
  const daysBack = Math.min(...REVIEW_WEEKDAYS.map((target) => (weekday - target + 7) % 7));
  const reviewed = new Date(Date.UTC(year, month - 1, day - daysBack));
  return reviewed.toISOString().slice(0, 10);
}

/** Human-readable form, e.g. "October 16, 2026". */
export function formatReviewDate(iso: string) {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });
}

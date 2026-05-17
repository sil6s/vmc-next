import Link from "next/link";
import type { AnnouncementSettings } from "@/lib/settings/types";

export function AnnouncementBanner({ announcement }: { announcement: AnnouncementSettings }) {
  if (!announcement.announcementEnabled) {
    return null;
  }

  const hasLink = announcement.announcementLinkText && announcement.announcementLinkUrl;

  return (
    <div className={`announcement-banner announcement-${announcement.announcementType}`}>
      <strong>{announcement.announcementTitle}</strong>
      <span>{announcement.announcementMessage}</span>
      {hasLink &&
        (announcement.announcementLinkUrl.startsWith("http") ? (
          <a href={announcement.announcementLinkUrl} target="_blank" rel="noopener noreferrer">
            {announcement.announcementLinkText}
          </a>
        ) : (
          <Link href={announcement.announcementLinkUrl}>{announcement.announcementLinkText}</Link>
        ))}
    </div>
  );
}

import type { Metadata, Viewport } from "next";
import { Instrument_Sans, Playfair_Display } from "next/font/google";
import "easymde/dist/easymde.min.css";
import "./globals.css";
import { AnnouncementBanner } from "@/components/layout/AnnouncementBanner";
import { ChatSupportWidget } from "@/components/layout/ChatSupportWidget";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { UmamiTracker } from "@/components/layout/UmamiTracker";
import { getPublicSettings } from "@/lib/settings/public";
import { JsonLd, organizationSchema, websiteSchema } from "@/lib/schema";

const sans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap"
});

const serif = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap"
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getPublicSettings();

  return {
    metadataBase: new URL(settings.siteUrl),
    title: {
      default: settings.seo.defaultSeoTitle,
      template: "%s"
    },
    description: settings.seo.defaultMetaDescription,
    icons: {
      icon: [{ url: "/favicon.png", type: "image/png" }],
      shortcut: "/favicon.png",
      apple: "/favicon.png"
    }
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const settings = await getPublicSettings();
  const bookingHref = "/book-appointment/";

  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <body>
        <AnnouncementBanner announcement={settings.announcement} />
        <Header
          ctaHref={bookingHref}
          locations={settings.publicLocations}
          onlinePortalUrl={settings.externalLinks.onlinePortalUrl}
          pharmacyUrl={settings.externalLinks.pharmacyUrl}
          showBookingButton={settings.quickControls.websiteBookingButton}
        />
        <main id="main">{children}</main>
        <Footer
          locations={settings.publicLocations}
          onlinePortalUrl={settings.externalLinks.onlinePortalUrl}
          pharmacyUrl={settings.externalLinks.pharmacyUrl}
        />
        {/* TODO: Load the real Otto embed script once here with next/script when Otto provides the production script URL. */}
        {settings.liveChat.liveChatEnabled && (
          <ChatSupportWidget locations={settings.publicLocations} appointmentHref={bookingHref} />
        )}
        <JsonLd data={[organizationSchema(settings), websiteSchema(settings.siteUrl)]} />
        <UmamiTracker />
      </body>
    </html>
  );
}

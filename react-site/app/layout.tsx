import type { Metadata, Viewport } from "next";
import { Instrument_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import { AnnouncementBanner } from "@/components/layout/AnnouncementBanner";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { OttoLocationLauncher } from "@/components/layout/OttoLocationLauncher";
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
      icon: [
        { url: "/favicon.png", type: "image/png" },
        { url: "/icon.svg", type: "image/svg+xml" }
      ],
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

  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <body>
        <AnnouncementBanner announcement={settings.announcement} />
        <Header ctaHref={settings.externalLinks.bookAppointmentUrl || settings.seo.sitewideCtaUrl} locations={settings.publicLocations} showBookingButton={settings.quickControls.websiteBookingButton} />
        <main id="main">{children}</main>
        <Footer locations={settings.publicLocations} />
        {/* TODO: Load the real Otto embed script once here with next/script when Otto provides the production script URL. */}
        {settings.liveChat.liveChatEnabled && <OttoLocationLauncher locations={settings.publicLocations} />}
        <JsonLd data={[organizationSchema(settings), websiteSchema(settings.siteUrl)]} />
        <UmamiTracker />
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import { Instrument_Sans, Playfair_Display } from "next/font/google";
import { headers } from "next/headers";
import Script from "next/script";
import "easymde/dist/easymde.min.css";
import "./globals.css";
import { AnnouncementBanner } from "@/components/layout/AnnouncementBanner";
import { ChatSupportWidget } from "@/components/layout/ChatSupportWidget";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { LocalizedStaticPage } from "@/components/layout/LocalizedStaticPage";
import { LocalizedStaticLinks } from "@/components/layout/LocalizedStaticLinks";
import { TranslationBanner } from "@/components/layout/TranslationBanner";
import { UnavailableTranslationBanner } from "@/components/layout/UnavailableTranslationBanner";
import { StaticPageTranslator } from "@/components/layout/StaticPageTranslator";
import { UmamiTracker } from "@/components/layout/UmamiTracker";
import { isExactStructureLocalizedPath, isLocale, isLocalizedInteractivePath } from "@/lib/i18n";
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
    applicationName: "Veterinary Medical Centers",
    title: {
      default: settings.seo.defaultSeoTitle,
      template: "%s"
    },
    description: settings.seo.defaultMetaDescription,
    icons: {
      icon: [{ url: "/favicon.png", type: "image/png" }],
      shortcut: "/favicon.png",
      apple: "/favicon.png"
    },
    manifest: "/manifest.webmanifest",
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true }
    }
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#a91b1b"
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const settings = await getPublicSettings();
  const requestHeaders = await headers();
  const localeHeader = requestHeaders.get("x-vmc-locale");
  const pathname = requestHeaders.get("x-vmc-pathname") || "/";
  const pageTranslated = requestHeaders.get("x-vmc-page-translated") === "true";
  const locale = isLocale(localeHeader) ? localeHeader : "en";
  const bookingHref = "/book-appointment/";

  return (
    <html lang={locale === "zh" ? "zh-Hans" : locale} className={`${sans.variable} ${serif.variable}`}>
      <body>
        <AnnouncementBanner announcement={settings.announcement} />
        <Header
          locale={locale}
          ctaHref={bookingHref}
          locations={settings.publicLocations}
          onlinePortalUrl={settings.externalLinks.onlinePortalUrl}
          pharmacyUrl={settings.externalLinks.pharmacyUrl}
          showBookingButton={settings.quickControls.websiteBookingButton}
        />
        {pageTranslated ? (
          <TranslationBanner locale={locale} />
        ) : (
          <UnavailableTranslationBanner locale={locale} englishPath={pathname} />
        )}
        <main id="main">
          <LocalizedStaticLinks locale={locale} />
          {locale !== "en" && pageTranslated && isExactStructureLocalizedPath(pathname) && <StaticPageTranslator locale={locale} />}
          {locale !== "en" && pageTranslated && !isLocalizedInteractivePath(pathname) && !isExactStructureLocalizedPath(pathname) ? (
            <LocalizedStaticPage locale={locale} pathname={pathname} />
          ) : (
            children
          )}
        </main>
        <Footer
          locale={locale}
          locations={settings.publicLocations}
          onlinePortalUrl={settings.externalLinks.onlinePortalUrl}
          pharmacyUrl={settings.externalLinks.pharmacyUrl}
        />
        <Script
          id="otto-flow-widget"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d){w.televet=w.televet||{};w.otto=w.otto||{};var s=d.createElement('script');s.async=true;s.src='https://connect.televet.com/shim.js';d.head.appendChild(s);})(window,document);`
          }}
        />
        {settings.liveChat.liveChatEnabled && (
          <ChatSupportWidget locations={settings.publicLocations} appointmentHref={bookingHref} />
        )}
        <JsonLd data={[organizationSchema(settings), websiteSchema(settings.siteUrl)]} />
        <UmamiTracker />
      </body>
    </html>
  );
}

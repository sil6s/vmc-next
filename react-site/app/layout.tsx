import type { Metadata, Viewport } from "next";
import { Instrument_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { OttoLocationLauncher } from "@/components/layout/OttoLocationLauncher";
import { site } from "@/data/site";
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

export const metadata: Metadata = {
  metadataBase: new URL(site.siteUrl),
  title: {
    default: "Northern Kentucky Vet for Dogs & Cats | Fort Thomas & Independence",
    template: "%s | Veterinary Medical Center"
  },
  description:
    "Locally owned Northern Kentucky vet for dogs and cats in Fort Thomas and Independence KY. Relationship-based care, same-week appointments, and two convenient NKY locations.",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 }
  },
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
      { url: "/icon.svg", type: "image/svg+xml" }
    ],
    shortcut: "/favicon.png",
    apple: "/favicon.png"
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <body>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        {/* TODO: Load the real Otto embed script once here with next/script when Otto provides the production script URL. */}
        <OttoLocationLauncher />
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
      </body>
    </html>
  );
}

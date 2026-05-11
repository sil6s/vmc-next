import type { Metadata, Viewport } from "next";
import { Instrument_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
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
    default: "Veterinary Medical Center | Fort Thomas & Independence KY Vet",
    template: "%s"
  },
  description: "Trusted Northern Kentucky vet for dogs and cats. Fear-Free visits and thoughtful care in Fort Thomas and Independence.",
  icons: {
    icon: "/icon.svg"
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
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
      </body>
    </html>
  );
}

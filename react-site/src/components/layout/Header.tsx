"use client";

import Link from "next/link";
import { ArrowRight, CalendarDays, Menu, MessageCircle, Phone, Search, ShoppingBag, UserRound } from "lucide-react";
import type { ReactNode } from "react";
import { useState } from "react";
import { navigation } from "@/data/navigation";
import { locations as locationPages } from "@/data/locations";
import { site } from "@/data/site";
import type { PublicLocation } from "@/lib/settings/public";
import { getMessages, localizedHref, type Locale } from "@/lib/i18n";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { LanguageSelector } from "./LanguageSelector";
import { Logo } from "./Logo";
import { SiteSearch } from "./SiteSearch";

type HeaderLocation = Omit<Pick<PublicLocation, "id" | "name" | "address" | "phone" | "tel" | "hours">, "hours"> & {
  hours: readonly string[];
};

function AboutLocationsDropdown({ locale }: { locale: Locale }) {
  const copy = getMessages(locale);

  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger>{copy.about}</NavigationMenuTrigger>
      <NavigationMenuContent>
        <div className="nav-dropdown-about" aria-label="About and location pages">
          <div className="nav-dropdown-top-links">
            <NavigationMenuLink asChild>
              <Link href={localizedHref("/about/", locale)}>
                <strong>{copy.ourPractice}</strong>
                <span>{copy.locallyOwnedCare}</span>
              </Link>
            </NavigationMenuLink>
            <NavigationMenuLink asChild>
              <Link href={localizedHref("/locations/", locale)}>
                <strong>{copy.allLocations}</strong>
                <span>Fort Thomas &amp; Independence</span>
              </Link>
            </NavigationMenuLink>
            {locationPages.map((location) => (
              <NavigationMenuLink asChild key={location.slug}>
                <Link href={`/locations/${location.slug}/`}>
                  <strong>{location.shortName}</strong>
                  <span>{location.address.split(",")[0]}</span>
                </Link>
              </NavigationMenuLink>
            ))}
          </div>
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}

function isExternalHref(href: string) {
  return href.startsWith("http://") || href.startsWith("https://");
}

function UtilityAction({
  href,
  children,
  className = "utility-button"
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  const external = isExternalHref(href);

  if (external) {
    return (
      <a className={className} href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return (
    <Link className={className} href={href}>
      {children}
    </Link>
  );
}

export function Header({
  locale = "en",
  ctaHref = "/book-appointment/",
  locations,
  onlinePortalUrl = "/patient-portal-online-booking/",
  pharmacyUrl = "/online-vet-pharmacy-northern-kentucky-cincinnati/",
  showBookingButton = true
}: {
  locale?: Locale;
  ctaHref?: string;
  locations?: ReadonlyArray<HeaderLocation>;
  onlinePortalUrl?: string;
  pharmacyUrl?: string;
  showBookingButton?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const publicLocations = locations || site.locations;
  const copy = getMessages(locale);
  const navigationLabels: Record<string, string> = {
    About: copy.about,
    Services: copy.services,
    "New Patients": copy.newPatients,
    Resources: copy.resources,
    Contact: copy.contact
  };

  return (
    <header className="site-header">
      <Link className="skip-link" href="#main">
        {copy.skipToContent}
      </Link>
      <div className="nav-shell">
        <Logo href={localizedHref("/", locale)} />

        <NavigationMenu className="desktop-nav" aria-label="Primary navigation">
          <NavigationMenuList>
            {navigation.map((item) =>
              item.label === "About" ? (
                <AboutLocationsDropdown key={item.href} locale={locale} />
              ) : (
                <NavigationMenuItem key={item.href}>
                  <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                    <Link href={localizedHref(item.href, locale)}>{navigationLabels[item.label]}</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              )
            )}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="desktop-actions">
          <SiteSearch />
          <UtilityAction href={onlinePortalUrl}>
            <UserRound aria-hidden="true" size={15} />
            {copy.patientPortal}
          </UtilityAction>
          <UtilityAction href={pharmacyUrl}>
            <ShoppingBag aria-hidden="true" size={15} />
            {copy.onlinePharmacy}
          </UtilityAction>
          {showBookingButton && (
            <Link className="nav-cta" href={localizedHref(ctaHref, locale)}>
              {copy.bookAppointment}
            </Link>
          )}
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button className="menu-button" type="button" aria-expanded={open} aria-controls="mobile-menu">
              <Menu aria-hidden="true" size={26} />
              <span className="sr-only">{copy.openMenu}</span>
            </button>
          </SheetTrigger>
          <SheetContent className="mobile-menu-sheet" side="right" id="mobile-menu" closeLabel={copy.closeMenu}>
            <SheetHeader>
              <Logo href={localizedHref("/", locale)} />
              <SheetTitle>{copy.menuTitle}</SheetTitle>
              <SheetDescription>{copy.menuDescription}</SheetDescription>
            </SheetHeader>

            {/* Mobile search bar — opens the SiteSearch dialog via custom event */}
            <SheetClose asChild>
              <button
                type="button"
                className="mobile-search-bar"
                onClick={() => window.dispatchEvent(new CustomEvent("vmc:open-search"))}
                aria-label="Search the site"
              >
                <Search aria-hidden="true" size={16} />
                <span className="mobile-search-bar-placeholder">Search services, resources…</span>
              </button>
            </SheetClose>

            <nav className="mobile-menu-nav" aria-label="Mobile navigation">
              <div>
                <p>{copy.mainMenu}</p>
                {navigation.map((link) => (
                  <SheetClose asChild key={link.href}>
                    <Link href={localizedHref(link.href, locale)}>
                      <span>{navigationLabels[link.label]}</span>
                      <ArrowRight aria-hidden="true" size={17} />
                    </Link>
                  </SheetClose>
                ))}
              </div>
            </nav>

            <LanguageSelector locale={locale} label={copy.language} />

            <div className="mobile-actions">
              <SheetClose asChild>
                <button
                  type="button"
                  className="mobile-action-chat"
                  onClick={() => window.dispatchEvent(new CustomEvent("vmc:open-chat-support"))}
                >
                  <MessageCircle aria-hidden="true" size={18} />
                  Get help now
                </button>
              </SheetClose>
              {showBookingButton && (
                <SheetClose asChild>
                  <Link className="mobile-action-primary" href={localizedHref(ctaHref, locale)}>
                    <CalendarDays aria-hidden="true" size={18} />
                    {copy.bookAppointment}
                  </Link>
                </SheetClose>
              )}
              <a href={`tel:${publicLocations[0]?.tel || site.locations[0].tel}`}>
                <Phone aria-hidden="true" size={18} />
                {copy.callUsNow}
              </a>
              <a
                href={onlinePortalUrl}
                target={isExternalHref(onlinePortalUrl) ? "_blank" : undefined}
                rel={isExternalHref(onlinePortalUrl) ? "noopener noreferrer" : undefined}
              >
                <UserRound aria-hidden="true" size={18} />
                {copy.patientPortal}
              </a>
              <a className="mobile-pharmacy" href={pharmacyUrl} target={isExternalHref(pharmacyUrl) ? "_blank" : undefined} rel={isExternalHref(pharmacyUrl) ? "noopener noreferrer" : undefined}>
                <ShoppingBag aria-hidden="true" size={18} />
                {copy.onlinePharmacy}
              </a>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

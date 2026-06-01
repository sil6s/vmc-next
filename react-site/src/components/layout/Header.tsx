"use client";

import Link from "next/link";
import { ArrowRight, CalendarDays, Menu, Phone, ShoppingBag, UserRound } from "lucide-react";
import type { ReactNode } from "react";
import { useState } from "react";
import { navigation } from "@/data/navigation";
import { locations as locationPages } from "@/data/locations";
import { site } from "@/data/site";
import type { PublicLocation } from "@/lib/settings/public";
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
import { Logo } from "./Logo";

type HeaderLocation = Pick<PublicLocation, "id" | "name" | "address" | "phone" | "tel">;

function AboutLocationsDropdown() {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger>About</NavigationMenuTrigger>
      <NavigationMenuContent>
        <div className="nav-dropdown-menu nav-dropdown-about" aria-label="About and location pages">
          <NavigationMenuLink asChild>
            <Link href="/about/">
              <strong>Our Practice</strong>
              <span>Locally owned veterinary care</span>
            </Link>
          </NavigationMenuLink>
          <NavigationMenuLink asChild>
            <Link href="/locations/">
              <strong>All Locations</strong>
              <span>Fort Thomas and Independence</span>
            </Link>
          </NavigationMenuLink>
          <div className="nav-dropdown-divider" aria-hidden="true">
            <span>Find a clinic</span>
          </div>
          {locationPages.map((location) => (
            <NavigationMenuLink asChild key={location.slug}>
              <Link href={`/locations/${location.slug}/`}>
                <strong>{location.shortName}</strong>
                <span>{location.address.split(",")[0]}</span>
              </Link>
            </NavigationMenuLink>
          ))}
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
  ctaHref = "/book-appointment/",
  locations,
  onlinePortalUrl = "/patient-portal-online-booking/",
  pharmacyUrl = "/online-vet-pharmacy-northern-kentucky-cincinnati/",
  showBookingButton = true
}: {
  ctaHref?: string;
  locations?: ReadonlyArray<HeaderLocation>;
  onlinePortalUrl?: string;
  pharmacyUrl?: string;
  showBookingButton?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const publicLocations = locations || site.locations;

  return (
    <header className="site-header">
      <Link className="skip-link" href="#main">
        Skip to content
      </Link>
      <div className="nav-shell">
        <Logo />

        <NavigationMenu className="desktop-nav" aria-label="Primary navigation">
          <NavigationMenuList>
            {navigation.map((item) =>
              item.label === "About" ? (
                <AboutLocationsDropdown key={item.href} />
              ) : (
                <NavigationMenuItem key={item.href}>
                  <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                    <Link href={item.href}>{item.label}</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              )
            )}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="desktop-actions">
          <UtilityAction href={onlinePortalUrl}>
            <UserRound aria-hidden="true" size={15} />
            Patient Portal
          </UtilityAction>
          <UtilityAction href={pharmacyUrl}>
            <ShoppingBag aria-hidden="true" size={15} />
            Online Pharmacy
          </UtilityAction>
          {showBookingButton && (
            <Link className="nav-cta" href={ctaHref}>
              Book Appointment
            </Link>
          )}
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button className="menu-button" type="button" aria-expanded={open} aria-controls="mobile-menu">
              <Menu aria-hidden="true" size={26} />
              <span className="sr-only">Open menu</span>
            </button>
          </SheetTrigger>
          <SheetContent className="mobile-menu-sheet" side="right" id="mobile-menu">
            <SheetHeader>
              <Logo />
              <SheetTitle>Veterinary Medical Centers menu</SheetTitle>
              <SheetDescription>Navigate the main Veterinary Medical Centers website links.</SheetDescription>
            </SheetHeader>

            <nav className="mobile-menu-nav" aria-label="Mobile navigation">
              <div>
                <p>Main menu</p>
                {navigation.map((link) => (
                  <SheetClose asChild key={link.href}>
                    <Link href={link.href}>
                      <span>{link.label}</span>
                      <ArrowRight aria-hidden="true" size={17} />
                    </Link>
                  </SheetClose>
                ))}
              </div>
            </nav>

            <div className="mobile-actions">
              {showBookingButton && (
                <SheetClose asChild>
                  <Link className="mobile-action-primary" href={ctaHref}>
                    <CalendarDays aria-hidden="true" size={18} />
                    Book Appointment
                  </Link>
                </SheetClose>
              )}
              <a href={`tel:${publicLocations[0]?.tel || site.locations[0].tel}`}>
                <Phone aria-hidden="true" size={18} />
                Call Us Now
              </a>
              <a href={onlinePortalUrl} target={isExternalHref(onlinePortalUrl) ? "_blank" : undefined} rel={isExternalHref(onlinePortalUrl) ? "noopener noreferrer" : undefined}>
                <UserRound aria-hidden="true" size={18} />
                Patient Portal
              </a>
              <a className="mobile-pharmacy" href={pharmacyUrl} target={isExternalHref(pharmacyUrl) ? "_blank" : undefined} rel={isExternalHref(pharmacyUrl) ? "noopener noreferrer" : undefined}>
                <ShoppingBag aria-hidden="true" size={18} />
                Online Pharmacy
              </a>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

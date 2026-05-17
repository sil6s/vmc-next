"use client";

import Link from "next/link";
import { ArrowRight, CalendarDays, MapPin, Phone, ShoppingBag, UserRound } from "lucide-react";
import { useEffect, useState } from "react";
import { navigation, utilityNavigation } from "@/data/navigation";
import { locations as locationPages } from "@/data/locations";
import { site } from "@/data/site";
import type { PublicLocation } from "@/lib/settings/public";
import { Logo } from "./Logo";

type HeaderLocation = Pick<PublicLocation, "id" | "name" | "address" | "phone" | "tel">;

export function Header({ ctaHref = "/contact/", locations, showBookingButton = true }: { ctaHref?: string; locations?: ReadonlyArray<HeaderLocation>; showBookingButton?: boolean }) {
  const [open, setOpen] = useState(false);
  const publicLocations = locations || site.locations;

  useEffect(() => {
    document.body.classList.toggle("mobile-menu-open", open);
    return () => document.body.classList.remove("mobile-menu-open");
  }, [open]);

  return (
    <header className="site-header">
      <Link className="skip-link" href="#main">
        Skip to content
      </Link>
      <div className="nav-shell">
        <Logo />

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navigation.map((item) =>
            item.label === "About" ? (
              <div className="nav-dropdown" key={item.href}>
                <Link href={item.href}>{item.label}</Link>
                <div className="nav-dropdown-menu" aria-label="About and location pages">
                  <Link href="/about/">
                    <strong>About VMC</strong>
                    <span>Our story and care approach</span>
                  </Link>
                  <Link href="/locations/">
                    <strong>Locations</strong>
                    <span>Fort Thomas & Independence</span>
                  </Link>
                  {locationPages.map((location) => (
                    <Link href={`/locations/${location.slug}/`} key={location.slug}>
                      <strong>{location.shortName}</strong>
                      <span>{location.address.split(",")[0]}</span>
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link href={item.href} key={item.href}>
                {item.label}
              </Link>
            )
          )}
        </nav>

        <div className="desktop-actions">
          <Link className="utility-button" href={utilityNavigation[0].href}>Patient Portal</Link>
          <Link className="utility-button" href={utilityNavigation[1].href}>Online Pharmacy</Link>
          {showBookingButton && (
            <Link className="nav-cta" href={ctaHref}>
              Book Appointment
            </Link>
          )}
        </div>

        <button className="menu-button" type="button" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen((value) => !value)}>
          <span className="sr-only">Open menu</span>
          <span />
          <span />
          <span />
        </button>
      </div>

      <div id="mobile-menu" className={open ? "mobile-menu is-open" : "mobile-menu"}>
        <div className="mobile-menu-head">
          <Logo />
          <button className="mobile-close" type="button" aria-label="Close menu" onClick={() => setOpen(false)}>
            <span />
            <span />
          </button>
        </div>
        <nav aria-label="Mobile navigation">
          {navigation.map((item) => (
            <Link href={item.href} key={item.href} onClick={() => setOpen(false)}>
              <span>{item.label}</span>
              <ArrowRight aria-hidden="true" size={18} strokeWidth={2.2} />
            </Link>
          ))}
          <Link href="/locations/" onClick={() => setOpen(false)}>
            <span>Locations</span>
            <ArrowRight aria-hidden="true" size={18} strokeWidth={2.2} />
          </Link>
        </nav>
        <div className="mobile-actions">
          {showBookingButton && (
            <Link className="mobile-action-primary" href={ctaHref} onClick={() => setOpen(false)}>
              <CalendarDays aria-hidden="true" size={18} />
              Book Appointment
            </Link>
          )}
          <a href={`tel:${publicLocations[0]?.tel || site.locations[0].tel}`}>
            <Phone aria-hidden="true" size={18} />
            Call Us Now
          </a>
          <Link href={utilityNavigation[0].href} onClick={() => setOpen(false)}>
            <UserRound aria-hidden="true" size={18} />
            Patient Portal
          </Link>
          <Link className="mobile-pharmacy" href={utilityNavigation[1].href} onClick={() => setOpen(false)}>
            <ShoppingBag aria-hidden="true" size={18} />
            Online Pharmacy
          </Link>
        </div>
        <div className="mobile-locations">
          <p>Our Locations</p>
          {publicLocations.map((location) => (
            <Link className="mobile-location" href={`/locations/vet-in-${location.id}-ky/`} key={location.id} onClick={() => setOpen(false)}>
              <MapPin aria-hidden="true" size={24} />
              <div>
                <strong>{location.name}</strong>
                <span>
                  {location.address.split(",")[0]} · {location.phone}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}

"use client";

import Link from "next/link";
import { ArrowRight, CalendarDays, MapPin, Phone, ShoppingBag, UserRound } from "lucide-react";
import { useState } from "react";
import { navigation, utilityNavigation } from "@/data/navigation";
import { site } from "@/data/site";
import { Logo } from "./Logo";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <Link className="skip-link" href="#main">
        Skip to content
      </Link>
      <div className="nav-shell">
        <Logo />

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navigation.map((item) => (
            <Link href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="desktop-actions">
          <Link href={utilityNavigation[0].href}>Patient Portal</Link>
          <Link href={utilityNavigation[1].href}>Online Pharmacy</Link>
          <Link className="nav-cta" href="/contact/">
            Book Appointment
          </Link>
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
          {navigation.filter((item) => item.label !== "Locations").map((item) => (
            <Link href={item.href} key={item.href} onClick={() => setOpen(false)}>
              <span>{item.label}</span>
              <ArrowRight aria-hidden="true" size={18} strokeWidth={2.2} />
            </Link>
          ))}
        </nav>
        <div className="mobile-actions">
          <Link className="mobile-action-primary" href="/contact/" onClick={() => setOpen(false)}>
            <CalendarDays aria-hidden="true" size={18} />
            Book Appointment
          </Link>
          <a href={`tel:${site.locations[0].tel}`}>
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
          {site.locations.map((location) => (
            <div className="mobile-location" key={location.id}>
              <MapPin aria-hidden="true" size={24} />
              <div>
                <strong>{location.name}</strong>
                <span>
                  {location.address.split(",")[0]} · <a href={`tel:${location.tel}`}>{location.phone}</a>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}

'use client';

import { useState } from 'react';
import { site, tel } from '@/lib/content';

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <header id="nav">
        <a className="logo" href="/" aria-label={site.name}>
          <span className="logo-txt"><span className="logo-main">Veterinary Medical Center</span><span className="logo-sub">Fort Thomas &amp; Independence, KY</span></span>
        </a>
        <nav className="nav-center" aria-label="Primary navigation">
          {site.navigation.map((item) => <a className="nav-a" href={item.href} key={item.href}>{item.label}</a>)}
        </nav>
        <div className="nav-right">
          <a className="nav-portal" href={site.portalUrl}>Patient Portal</a>
          <a className="nav-portal nav-pharmacy" href={site.pharmacyUrl}>Online Pharmacy</a>
          <a className="nav-book" href="/contact/">Book Appointment</a>
        </div>
        <button className={`mob-toggle ${open ? 'open' : ''}`} aria-label="Open menu" aria-expanded={open} onClick={() => setOpen(!open)}><span/><span/><span/></button>
      </header>
      <div id="mob-menu" className={open ? 'open' : ''} role="dialog" aria-label="Mobile Navigation">
        {site.navigation.map((item) => <a className="mob-link" href={item.href} key={item.href} onClick={() => setOpen(false)}>{item.label}<span>›</span></a>)}
        <div className="mob-actions">
          <a className="mob-btn-red" href="/contact/">Book Appointment</a>
          <a className="mob-btn-outline" href={tel(site.contacts.fortThomas.tel)}>Call Us Now</a>
          <a className="mob-btn-outline" href={site.portalUrl}>Patient Portal</a>
        </div>
      </div>
    </>
  );
}

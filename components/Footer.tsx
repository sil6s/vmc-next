import { site, tel } from '@/lib/content';

export function Footer() {
  return <footer className="footer" id="contact">
    <div className="nl-bar"><strong>Stay in the loop.</strong><span>Monthly pet health tips and clinic updates for Northern Kentucky pet owners.</span><form><input className="nl-bar-input" type="email" placeholder="Your email address"/><button className="nl-bar-btn">Subscribe</button></form></div>
    <div className="footer-main">
      <div><a href="/" className="footer-brand-link"><span className="logo-main">Veterinary Medical Center</span></a><p>{site.tagline}</p><p className="fcopy">© {new Date().getFullYear()} VMC · Locally & independently owned</p></div>
      <div><div className="footer-col-label">Navigate</div><div className="flinks">{site.navigation.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}</div></div>
      <div><div className="footer-col-label">Locations</div>{Object.values(site.contacts).map((loc) => <p key={loc.label}><strong>{loc.label}</strong><br/>{loc.address}<br/><a href={tel(loc.tel)}>{loc.phone}</a></p>)}</div>
    </div>
    <div className="footer-bottom"><span className="footer-bottom-text">© {new Date().getFullYear()} {site.name}. All rights reserved. {site.legal}</span></div>
    <a href={tel(site.contacts.fortThomas.tel)} id="floater" aria-label="Call now">Call Now</a>
  </footer>;
}

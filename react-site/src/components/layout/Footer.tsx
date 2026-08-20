import Link from "next/link";
import Image from "next/image";
import { BookOpenText, LockKeyhole } from "lucide-react";
import { navigation, utilityNavigation } from "@/data/navigation";
import { site } from "@/data/site";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import type { PublicLocation } from "@/lib/settings/public";
import { getMessages, localizedHref, type Locale } from "@/lib/i18n";
import { urlFor } from "@/sanity/image";
import { getBlogPosts, type BlogPost } from "@/sanity/posts";
import { LanguageSelector } from "./LanguageSelector";

type FooterLocation = Pick<PublicLocation, "id" | "name" | "address" | "phone" | "tel">;

function isExternalHref(href: string) {
  return href.startsWith("http://") || href.startsWith("https://");
}

function FooterLink({ href, label, locale }: { href: string; label: string; locale: Locale }) {
  if (isExternalHref(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {label}
      </a>
    );
  }

  return <Link href={localizedHref(href, locale)}>{label}</Link>;
}

function footerResourceImage(post: BlogPost) {
  return post.image ? urlFor(post.image).width(420).height(260).fit("crop").auto("format").url() : post.featuredImage || "/images/veterinary-care-hero.jpg";
}

export async function Footer({
  locale = "en",
  locations = site.locations,
  onlinePortalUrl,
  pharmacyUrl
}: {
  locale?: Locale;
  locations?: ReadonlyArray<FooterLocation>;
  onlinePortalUrl?: string;
  pharmacyUrl?: string;
}) {
  const copy = getMessages(locale);
  const resourceArticles = await getBlogPosts(4);
  const utilityLinks = [
    { label: copy.patientPortal, href: onlinePortalUrl || utilityNavigation[0].href },
    { label: copy.onlinePharmacy, href: pharmacyUrl || utilityNavigation[1].href },
    { label: copy.newPatientForm, href: utilityNavigation[2].href }
  ];
  const navigationLabels: Record<string, string> = {
    About: copy.about,
    Services: copy.services,
    "New Patients": copy.newPatients,
    Resources: copy.resources,
    Contact: copy.contact
  };

  return (
    <footer className="site-footer">
      <div className="newsletter">
        <div>
          <strong>{copy.stayInLoop}</strong>
          <p>{copy.newsletterBody}</p>
        </div>
        <NewsletterForm
          emailLabel={copy.emailAddress}
          emailPlaceholder={copy.emailPlaceholder}
          subscribeLabel={copy.subscribe}
          successMessage={copy.newsletterThanks}
          invalidMessage={copy.invalidEmail}
        />
      </div>

      <div className="footer-grid">
        <div>
          <Link href={localizedHref("/", locale)} className="footer-logo-text">Veterinary Medical Centers</Link>
          <p>{site.tagline}</p>
          <p>{copy.localCare}</p>
          <LanguageSelector locale={locale} label={copy.language} compact />
        </div>
        <div>
          <h2>{copy.navigate}</h2>
          <ul>
            {navigation.map((item) => (
              <li key={item.href}>
                <Link href={localizedHref(item.href, locale)}>{navigationLabels[item.label]}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2>{copy.onlineTools}</h2>
          <ul>
            {utilityLinks.map((item) => (
              <li key={item.href}>
                <FooterLink href={item.href} label={item.label} locale={locale} />
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2>{copy.contact}</h2>
          {locations.map((location) => (
            <address key={location.id}>
              <strong>{location.name}</strong>
              <span>{location.address}</span>
              <a href={`tel:${location.tel}`}>{location.phone}</a>
            </address>
          ))}
        </div>
      </div>

      {resourceArticles.length > 0 && (
        <section className="footer-resources" aria-labelledby="footer-resources-heading">
          <div className="footer-resources-heading">
            <div>
              <p>Pet Care Resources</p>
              <h2 id="footer-resources-heading">Helpful articles from our team.</h2>
            </div>
            <Link href={localizedHref("/resources/", locale)}>View all resources</Link>
          </div>
          <div className="footer-resource-card-grid">
            {resourceArticles.map((article) => (
              <article className="footer-resource-card" key={article.slug}>
                <Link className="footer-resource-card-image" href={localizedHref(`/resources/${article.slug}/`, locale)}>
                  <Image
                    src={footerResourceImage(article)}
                    alt={article.featuredImageAlt}
                    fill
                    sizes="(max-width: 720px) 100vw, 280px"
                  />
                </Link>
                <div>
                  <span>{article.category}</span>
                  <h3>
                    <Link href={localizedHref(`/resources/${article.slug}/`, locale)}>{article.title}</Link>
                  </h3>
                  <p>{article.excerpt}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      <div className="footer-bottom">
        <span>Copyright {new Date().getFullYear()} {site.name}. {copy.allRightsReserved}</span>
        <span className="footer-legal-links">
          <span>{site.legal}</span>
          <Link href={localizedHref("/privacy-policy/", locale)}>{copy.privacy}</Link>
          <Link className="footer-admin-link" href="/login/?callbackUrl=%2Fstudio%2F" rel="nofollow">
            <BookOpenText aria-hidden="true" size={13} />
            {copy.contentPortal}
          </Link>
          <Link className="footer-admin-link" href="/login/" rel="nofollow">
            <LockKeyhole aria-hidden="true" size={13} />
            {copy.adminPortal}
          </Link>
        </span>
      </div>
    </footer>
  );
}

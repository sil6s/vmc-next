import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { headers } from "next/headers";
import { Baby, CalendarCheck, FileText, Heart, HeartHandshake, MapPin, MessageCircle, PawPrint, ShieldCheck, Sparkles } from "lucide-react";
import { FAQSection } from "@/components/sections/FAQSection";
import { FinalInvitation } from "@/components/sections/FinalInvitation";
import { Hero } from "@/components/sections/Hero";
import { HomeResourceCarousel } from "@/components/sections/HomeResourceCarousel";
import { HomeTestimonials } from "@/components/sections/HomeTestimonials";
import { MobileBookingBar } from "@/components/sections/MobileBookingBar";
import { TeamSection } from "@/components/sections/TeamSection";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { homeFaqs } from "@/data/faqs";
import { locations } from "@/data/locations";
import { pages } from "@/data/pages";
import { localizedSeo } from "@/data/localized-seo";
import { site } from "@/data/site";
import { veterinarians } from "@/data/veterinarians";
import { pageMetadata } from "@/lib/metadata";
import { isLocale, localizedLanguageAlternates } from "@/lib/i18n";
import { getPublicSettings } from "@/lib/settings/public";
import { breadcrumbSchema, faqSchema, JsonLd, locationVeterinaryCareSchema, webpageSchema } from "@/lib/schema";
import { getBlogPosts } from "@/sanity/posts";

export async function generateMetadata(): Promise<Metadata> {
  const localeHeader = (await headers()).get("x-vmc-locale");
  const locale = isLocale(localeHeader) ? localeHeader : "en";
  const seo = locale === "en" ? pages.home.seo : localizedSeo[locale]["/"];
  const path = locale === "en" ? "/" : `/${locale}/`;
  return pageMetadata({ ...seo, path, languages: localizedLanguageAlternates("/") });
}

const toolLinks = [
  { title: "General inquiry", text: "Send a non-urgent question to our care team.", href: "/online-help/fort-thomas/general/", icon: MessageCircle },
  { title: "Book an appointment", text: "Request a visit through Otto.", href: "/online-help/fort-thomas/direct-booking/", icon: CalendarCheck },
  { title: "Medical records", text: "Request records for your pet through Otto.", href: "/online-help/fort-thomas/records/", icon: FileText },
  { title: "Online pharmacy", text: "Shop approved products and refill options.", href: "/online-vet-pharmacy-northern-kentucky-cincinnati/", icon: PawPrint }
];

const firstVisitCards = [
  ["Choose your location", "Pick Fort Thomas or Independence, whichever is easiest for your family."],
  ["Schedule your pet’s visit", "Book online or call our team when you would rather talk through the next step."],
  ["Meet your veterinary team", "We’ll get to know your pet, answer your questions, and make a clear plan together."]
];

// Shown and marked up together so the FAQ schema always matches the visible questions.
const homePageFaqs = homeFaqs.slice(0, 8);

const popularServices = [
  ["Dog & cat vaccinations", "/services/dog-cat-vaccinations/"],
  ["Pet dental care", "/services/pet-dental-care/"],
  ["Sick pet visits", "/services/sick-pet-visits/"],
  ["Spay & neuter", "/services/spay-neuter-surgery/"],
  ["Diagnostics", "/services/veterinary-diagnostics/"],
  ["Skin & allergy care", "/services/skin-ear-allergy-care/"]
];

const quickAccessLinks = [
  { label: "Book an appointment", detail: "Schedule through our online portal", href: "/patient-portal-online-booking/", icon: CalendarCheck },
  { label: "New to our practice?", detail: "Plan a comfortable first visit", href: "/new-patients/", icon: HeartHandshake },
  { label: "Fort Thomas", detail: "Memorial Parkway location", href: "/locations/vet-in-fort-thomas-ky/", icon: MapPin },
  { label: "Independence", detail: "Madison Pike location", href: "/locations/vet-in-independence-ky/", icon: MapPin }
];

function officialLocationName(shortName: string) {
  return shortName === "Fort Thomas" ? "Veterinary Medical Center of Fort Thomas" : "Veterinary Medical Center of Independence";
}

export default async function HomePage() {
  const hero = pages.home.hero;
  const settings = await getPublicSettings();
  const localeHeader = (await headers()).get("x-vmc-locale");
  const locale = isLocale(localeHeader) ? localeHeader : "en";
  const seo = locale === "en" ? pages.home.seo : localizedSeo[locale]["/"];
  const pagePath = locale === "en" ? "/" : `/${locale}/`;
  const onlineBookingHref = "/book-appointment/";
  const primaryPhone = settings.publicLocations[0]?.tel || site.locations[0].tel;
  const resourceGuides = await getBlogPosts(24);
  const carouselPosts = resourceGuides.slice(0, 3).map((post) => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    category: post.category,
    imageUrl: post.featuredImage || "/images/veterinary-care-hero.jpg",
    imageAlt: post.featuredImageAlt || `${post.title} from Veterinary Medical Centers in Northern Kentucky`,
    readingTime: post.readingTime || "Pet care resource"
  }));

  return (
    <>
      <Hero
        eyebrow={hero.eyebrow}
        title={hero.title}
        emphasis={hero.emphasis}
        body={hero.body}
        image={hero.image}
        imageAlt={hero.imageAlt}
        primaryCta={{ label: "Book an Appointment", href: onlineBookingHref }}
        secondaryCta={{ label: "About Us", href: "/about/" }}
        showStats={false}
        inlineEmphasis
        compact
      />

      <MobileBookingBar bookingHref={onlineBookingHref} phone={primaryPhone} />

      <div className="home-love-banner">
        <p className="home-love-banner-inner">
          <Heart aria-hidden="true" size={13} />
          Locally owned, proudly caring for Northern Kentucky pets
        </p>
      </div>

      <nav className="home-quick-access" aria-label="Quick access">
        {quickAccessLinks.map(({ label, detail, href, icon: Icon }) => (
          <Link href={href} key={label} className="home-quick-access-link">
            <Icon aria-hidden="true" size={19} />
            <span><strong>{label}</strong><small>{detail}</small></span>
          </Link>
        ))}
      </nav>

      <Section
        id="meet-vmc"
        tone="white"
        className="home-vmc-introduction"
      >
        <div className="home-vmc-editorial">
          <div className="home-vmc-copy">
            <p className="eyebrow">Welcome to VMC</p>
            <h2>A little more personal. <em>A lot more like home.</em></h2>
            <p>For families looking for a <strong>Northern Kentucky vet</strong>, Veterinary Medical Centers is a locally owned practice with teams in Fort Thomas and Independence. We care for dogs and cats through the everyday moments, the new concerns, and the visits that need a little more time.</p>
            <p>Our team takes the time to hear what you have noticed, <strong>explain what we find, and make decisions with you.</strong> That relationship between your family, your pet, and the people caring for them guides every visit.</p>
            <Link className="text-link" href="/about/">Get to know your Northern Kentucky veterinarians →</Link>
          </div>
          <div className="home-vmc-image">
            <Image src="/images/home-vmc-cat.webp" alt="Cat resting comfortably at home" fill sizes="(max-width: 760px) 100vw, 48vw" />
          </div>
        </div>
      </Section>

      <Section tone="dark" eyebrow="Care at every age" title={<>From first pawprints to <em>gray whiskers.</em></>} intro="As your Northern Kentucky vet, we are here for the first vaccines, the everyday questions, and the changes that come with senior years. Explore thoughtful care for every chapter of your pet&rsquo;s life, with a team ready to help you decide what comes next." className="home-life-stages">
        <div className="home-life-stage-layout">
          <div className="home-life-stage-image">
            <Image src="/images/life-stage-dogs.jpg" alt="Adult dog and puppy sharing a gentle moment outdoors" fill sizes="(max-width: 760px) 100vw, 38vw" />
          </div>
          <div className="home-life-stage-grid">
            <Link href="/services/puppy-kitten-care/" className="home-life-stage-card">
              <Baby aria-hidden="true" size={25} />
              <h3>Puppies &amp; kittens</h3>
              <p>First exams, vaccines, prevention, and all the new-pet questions.</p>
              <span>Explore early-life care →</span>
            </Link>
            <Link href="/services/pet-wellness-exams/" className="home-life-stage-card">
              <PawPrint aria-hidden="true" size={25} />
              <h3>Grown-up companions</h3>
              <p>Routine wellness, vaccinations, and steady preventive care.</p>
              <span>Explore wellness care →</span>
            </Link>
            <Link href="/services/senior-pet-care/" className="home-life-stage-card">
              <Sparkles aria-hidden="true" size={25} />
              <h3>Senior sweethearts</h3>
              <p>Support for comfort, mobility, screening, and changing needs.</p>
              <span>Explore senior care →</span>
            </Link>
          </div>
        </div>
        <nav className="home-service-links" aria-label="Popular veterinary services">
          <span>Popular services:</span>
          {popularServices.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
          <Link href="/services/">All services →</Link>
        </nav>
      </Section>

      <Section tone="white" eyebrow="The VMC difference" title={<>Little things. <em>Lots of love.</em></>} className="home-little-things">
        <div className="home-little-things-layout">
          <p>Good veterinary care is not only about the exam room. It is about making space for your questions, helping nervous pets settle in, and making sure you leave knowing what comes next.</p>
          <div className="home-little-things-list">
            <article><span><Heart aria-hidden="true" size={18} fill="currentColor" /></span><div><h3>Time to listen</h3><p>We want to hear what you are noticing at home.</p></div></article>
            <article><span><PawPrint aria-hidden="true" size={18} /></span><div><h3>A gentler visit</h3><p>Patient handling can make a meaningful difference for pets.</p></div></article>
            <article><span><ShieldCheck aria-hidden="true" size={18} /></span><div><h3>Clear next steps</h3><p>You should understand the plan and the options in front of you.</p></div></article>
          </div>
        </div>
      </Section>

      <TeamSection />

      <Section tone="cream" eyebrow="Your First Visit" title="A visit that feels clear from the start">
        <div className="new-client-editorial">
          <div className="new-client-photo"><Image src="/images/vet-stock2.jpg" alt="Pet owner speaking with a veterinary professional during a dog visit" fill sizes="(max-width: 860px) 100vw, 45vw" /></div>
          <div>
            <p>
              Starting with a new veterinarian in Northern Kentucky should feel simple. At our locally owned veterinary clinic, we review your pet&rsquo;s history, talk through your concerns, complete a nose-to-tail exam, and help you understand the next steps, whether you visit Fort Thomas or Independence.
            </p>
            <ol className="new-client-steps">
              {firstVisitCards.map(([title, text], index) => <li key={title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{title}</h3><p>{text}</p></div></li>)}
            </ol>
            <div className="hero-actions"><a className="btn btn-primary" href={onlineBookingHref} data-analytics-event="new_patient_booking_click">Book Your First Visit</a><Button href="/new-patients/" variant="ghost">What to Expect</Button></div>
          </div>
        </div>
      </Section>

      <Section
        id="locations"
        tone="white"
        eyebrow="Northern Kentucky Locations"
        title={<>Two Northern Kentucky vet clinics, <em>close to home.</em></>}
        intro="Visit us in Fort Thomas or Independence, KY. Both clinics care for dogs and cats, and families come from across Campbell, Kenton, and Boone counties and Greater Cincinnati."
        className="home-locations-section"
      >
        <div className="home-location-grid">
          {locations.map((location, index) => (
            <article className="home-location-card" key={location.slug}>
              <div className="home-location-image">
                <Image src={location.image} alt={location.imageAlt} fill sizes="(max-width: 760px) 100vw, 50vw" />
              </div>
              <div className="home-location-copy">
                <h3>
                  <Link href={`/locations/${location.slug}/`}>{location.shortName}</Link>
                </h3>
                <p className="home-location-official">{officialLocationName(location.shortName)}</p>
                <div className="home-location-details">
                  <address>{location.address}</address>
                  <a href={`tel:${location.tel}`} aria-label={`Call ${officialLocationName(location.shortName)} at ${location.phone}`}>
                    {location.phone}
                  </a>
                  <p className="home-location-weekday-hours">Monday–Friday <span>·</span> 8 AM–6 PM</p>
                  <details className="home-location-full-hours">
                    <summary>Full hours</summary>
                    <ul>
                      {(settings.publicLocations[index]?.hours || site.locations[index].hours).map((hours) => <li key={hours}>{hours}</li>)}
                    </ul>
                  </details>
                </div>
              </div>
              <div className="inline-actions">
                <a className="btn btn-primary" href={onlineBookingHref} data-analytics-event="location_booking_click">Book Appointment</a>
                <a className="text-link" href={settings.publicLocations[index]?.mapUrl || site.locations[index].mapUrl} target="_blank" rel="noopener noreferrer">Get Directions</a>
              </div>
            </article>
          ))}
        </div>
        <p className="home-cincy-link"><Link className="text-link" href="/locations/vet-near-cincinnati-oh/">Looking for a vet in Cincinnati? Our Fort Thomas clinic is about 10 minutes from downtown →</Link></p>
      </Section>

      <Section tone="white" eyebrow="Local trust" title="Kind words from Northern Kentucky pet families">
        <p className="home-review-intro">VMC has grown through the trust of local pet families. Their experiences are the clearest reflection of the care we work to provide every day.</p>
        <HomeTestimonials />
      </Section>

      <Section tone="warm" className="home-relationship-section">
        <div className="home-relationship-feature">
          <div className="home-relationship-copy">
            <p className="eyebrow">More than a visit</p>
            <h2>A relationship built on <em>care.</em></h2>
            <p>As a locally owned Northern Kentucky vet, we believe the best care starts with knowing the pet in front of us and the people who love them. From the first puppy visit to the slower senior years, our team listens, explains, and stays a steady partner in your pet&rsquo;s health.</p>
            <div className="home-relationship-links">
              <Link className="btn btn-primary" href="/team/">Meet our veterinarians</Link>
              <Link className="text-link" href="/about/">Our story →</Link>
            </div>
          </div>
          <figure className="home-relationship-quote">
            <div className="home-relationship-avatars">
              {veterinarians.map((vet) => (
                <Link key={vet.slug} href={`/team/${vet.slug}/`} className={vet.image ? undefined : "is-placeholder"} aria-label={`${vet.name}, ${vet.credentials}`}>
                  {vet.image ? <Image src={vet.image} alt="" width={56} height={56} /> : <span aria-hidden="true">{vet.shortName.replace("Dr. ", "").charAt(0)}</span>}
                </Link>
              ))}
            </div>
            <blockquote>&ldquo;{veterinarians[0].quote}&rdquo;</blockquote>
            <figcaption><strong>{veterinarians[0].name}, {veterinarians[0].credentials}</strong> Practice owner</figcaption>
          </figure>
        </div>
        <dl className="home-relationship-stats">
          <div><dt>2</dt><dd>Northern Kentucky clinics</dd></div>
          <div><dt>3</dt><dd>Veterinarians who know you by name</dd></div>
          <div><dt>55+</dt><dd>Years of combined experience</dd></div>
          <div><dt>1</dt><dd>Locally owned practice, no corporate office</dd></div>
        </dl>
      </Section>

      <FinalInvitation
        actions={<>
          <Link className="btn btn-secondary" href="/online-help/fort-thomas/direct-booking/" data-analytics-event="online_booking_click">Request an Appointment</Link>
          <Link className="btn btn-ghost" href="/online-help/fort-thomas/general/">Contact Our Team</Link>
        </>}
      />

      <Section tone="cream" eyebrow="Pet Care Guides" title="Helpful pet care guides from your local vet team">
        <HomeResourceCarousel posts={carouselPosts} total={resourceGuides.length} />
      </Section>

      <Section tone="white" eyebrow="Online tools" title="Manage your pet’s care online" className="home-tools-section">
        <div className="quick-links-grid">
          {toolLinks.map(({ title, text, href, icon: Icon }) => (
            <Link href={href} className="quick-link-card" key={title}>
              <span>
                <strong>{title}</strong>
                <small>{text}</small>
              </span>
              <Icon aria-hidden="true" size={18} />
            </Link>
          ))}
        </div>
      </Section>

      <FAQSection faqs={homePageFaqs} title="Questions about our Northern Kentucky vet clinics" />
      <JsonLd
        data={[
          webpageSchema(pagePath, seo.title, seo.description),
          breadcrumbSchema([{ name: "Home", path: "/" }]),
          faqSchema(homePageFaqs),
          ...locations.map((location) => locationVeterinaryCareSchema(location, `/locations/${location.slug}/`))
        ]}
      />
    </>
  );
}

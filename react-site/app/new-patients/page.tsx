import type { Metadata } from "next";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { CalendarCheck, Check, HeartHandshake, MapPin, MessageCircle, Phone } from "lucide-react";
import { Hero } from "@/components/sections/Hero";
import { locations } from "@/data/locations";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, JsonLd, organizationSchema, webpageSchema } from "@/lib/schema";
import { getPublicSettings } from "@/lib/settings/public";
import { getStaticPageTranslationDictionary } from "@/data/static-page-translations";
import { isLocale } from "@/lib/i18n";

const seo = {
  title: "New Patients | Book Your First Vet Visit in Northern Kentucky",
  description:
    "New dog and cat patients can book their first VMC visit in Fort Thomas or Independence, KY. Learn what to bring and what to expect."
};

const crumbs = [
  { name: "Home", path: "/" },
  { name: "New Patients", path: "/new-patients/" }
];

const bookingSteps = [
  {
    kicker: "About you",
    title: "Start with your contact information.",
    text: "Enter your name and contact details so our team knows who we're welcoming and how to reach you."
  },
  {
    kicker: "About your pet",
    title: "Then introduce us to your pet.",
    text:
      "You'll enter your pet's name and a few basic details including whether they're a dog or cat, breed, sex, and other information that helps us prepare for the visit."
  },
  {
    kicker: "Your first appointment",
    title: "Select your New Client Visit.",
    text: "You'll see the new-client appointment for the clinic you chose, such as FT - New Client Visit for Fort Thomas."
  },
  {
    kicker: "Your schedule",
    title: "Pick the time that works best.",
    text: "A calendar of available appointments will appear. Choose the date and time that's most convenient for you and your pet."
  },
  {
    kicker: "Confirmation",
    title: "Review everything and you're all set.",
    text:
      "Review your information and confirm the appointment. You'll receive your booking details when you're finished."
  }
];

const reviews = [
  {
    location: "Fort Thomas",
    quote: "The whole team is warm and compassionate, and they make you feel like your pets actually matter.",
    name: "Silas"
  },
  {
    location: "Independence",
    quote: "The staff was extremely friendly and explained every step. I am looking forward to being a customer here for the foreseeable future.",
    name: "Michael"
  },
  {
    location: "Fort Thomas",
    quote: "Everyone was so nice and kind. My little kitty cat felt super comfortable. They definitely care about what they do and it shows.",
    name: "Jerriann"
  },
  {
    location: "Independence",
    quote: "They are friendly, patient, and caring of your dog and your budget. The best vet ever!",
    name: "Faith"
  },
  {
    location: "Fort Thomas",
    quote: "They treat every pet like their own. I feel so comfortable bringing my cats here.",
    name: "Sierra"
  },
  {
    location: "Independence",
    quote: "So friendly, informative and kind to my pet and me. Nice to have found a permanent location.",
    name: "Sandra"
  }
];

const firstVisitItems = [
  "Previous veterinary records, if available",
  "Vaccination history",
  "Current medications and supplements",
  "Diet and prevention information",
  "Questions or concerns you've noticed at home",
  "Photos or videos of symptoms that are difficult to describe"
];

export const metadata: Metadata = pageMetadata({ ...seo, path: "/new-patients/" });

function locationByShortName(shortName: string) {
  return locations.find((location) => location.shortName === shortName);
}

export default async function NewPatientsPage() {
  const localeHeader = (await headers()).get("x-vmc-locale");
  const locale = isLocale(localeHeader) ? localeHeader : "en";
  const dictionary: Record<string, string> = locale === "en" ? {} : getStaticPageTranslationDictionary(locale);
  const t = (value: string) => dictionary[value] || value;
  const settings = await getPublicSettings();
  const fortThomas = locationByShortName("Fort Thomas")!;
  const independence = locationByShortName("Independence")!;
  const ftPublic = settings.publicLocations.find((location) => location.id === "fort-thomas");
  const indPublic = settings.publicLocations.find((location) => location.id === "independence");

  return (
    <main className="vmc-new">
      <Hero
        eyebrow={t("New to Veterinary Medical Centers?")}
        title={t("Welcome.")}
        emphasis={t("We’d love to meet your pet.")}
        body={t("Whether you’ve just brought home a new pet, recently moved to Northern Kentucky, or are looking for a local veterinarian closer to home, we’re glad you found us. Our Fort Thomas and Independence veterinary teams welcome new dogs and cats for first visits, preventive care, everyday checkups, and unexpected worries.")}
        image="/images/vet-stock2.jpg"
        imageAlt="Veterinary Medical Centers team member caring for a pet"
        primaryCta={{ label: t("Book Your First Visit"), href: "#choose-clinic" }}
        secondaryCta={{ label: t("Prefer to Call?"), href: "#call-us" }}
        showStats={false}
        inlineEmphasis
        compact
      />

      <section className="vmc-about">
        <div className="vmc-wrap vmc-about-grid">
          <div>
            <p className="vmc-eyebrow">{t("A little about us")}</p>
            <h2>
              {t("Your neighborhood vet,")} <em>{t("for the long haul.")}</em>
            </h2>
          </div>
          <div className="vmc-about-copy">
            <p>
              {t("Veterinary Medical Centers is a locally and independently owned veterinary practice with clinics in Fort Thomas and Independence. As a Northern Kentucky veterinarian for dogs and cats, we care for pets through routine wellness visits, worried phone calls, first appointments, and the harder moments too.")}
            </p>
            <p>
              {t("We believe good veterinary care starts with listening. We want to know what you've noticed at home, what matters to your family, and what makes your pet feel safe. Then we'll explain what we find and help you decide what comes next.")}
            </p>
            <div className="vmc-values">
              <div className="vmc-value">
                <div className="vmc-value-icon"><HeartHandshake aria-hidden="true" size={20} /></div>
                <strong>{t("We listen first")}</strong>
                <span>{t("You know your pet better than anyone. What you notice matters.")}</span>
              </div>
              <div className="vmc-value">
                <div className="vmc-value-icon"><Check aria-hidden="true" size={20} /></div>
                <strong>{t("We explain the why")}</strong>
                <span>{t("You should understand what we're recommending and why.")}</span>
              </div>
              <div className="vmc-value">
                <div className="vmc-value-icon"><CalendarCheck aria-hidden="true" size={20} /></div>
                <strong>{t("We stay with you")}</strong>
                <span>{t("From first visits through senior years, we're here for the relationship.")}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="vmc-section vmc-location-section" id="choose-clinic">
        <div className="vmc-wrap">
          <div className="vmc-section-head">
            <p className="vmc-eyebrow">{t("First things first")}</p>
            <h2>
              {t("Choose the clinic that feels")} <span className="vmc-accent">{t("closest to home.")}</span>
            </h2>
            <p>
              {t("Both VMC locations welcome new patients. Choose the Fort Thomas or Independence veterinary clinic that is most convenient for your family, and we'll guide you through the new-patient booking process.")}
            </p>
          </div>

          <div className="vmc-locations">
            <article className="vmc-location">
              <div className="vmc-location-photo">
                <Image
                  src={fortThomas.image}
                  alt={fortThomas.imageAlt}
                  fill
                  sizes="(max-width: 900px) 100vw, 570px"
                />
              </div>
              <div className="vmc-location-body">
                <div className="vmc-location-icon" aria-hidden="true"><MapPin size={20} /></div>
                <span className="vmc-location-label">Fort Thomas</span>
                <h3>{t("Fort Thomas Veterinary Medical Center")}</h3>
                <p>
                  {fortThomas.address}<br />
                  {ftPublic?.phone || fortThomas.phone}
                </p>
                <p className="vmc-location-detail">
                  {t("Convenient for Fort Thomas, Highland Heights, Bellevue, Newport, Dayton, Cold Spring, and nearby Cincinnati neighborhoods.")}
                </p>
                <div className="vmc-location-actions">
                  <Link href="/online-help/fort-thomas/direct-booking/" className="vmc-btn vmc-btn-red">{t("Book with Fort Thomas ->")}</Link>
                  <a href={`tel:${ftPublic?.tel || fortThomas.tel}`} className="vmc-btn vmc-btn-outline">{t("Call")}</a>
                </div>
              </div>
            </article>

            <article className="vmc-location">
              <div className="vmc-location-photo">
                <Image
                  src={independence.image}
                  alt={independence.imageAlt}
                  fill
                  sizes="(max-width: 900px) 100vw, 570px"
                />
              </div>
              <div className="vmc-location-body">
                <div className="vmc-location-icon" aria-hidden="true"><MapPin size={20} /></div>
                <span className="vmc-location-label">Independence</span>
                <h3>{t("Independence Veterinary Medical Center")}</h3>
                <p>
                  {independence.address}<br />
                  {indPublic?.phone || independence.phone}
                </p>
                <p className="vmc-location-detail">
                  {t("Convenient for Independence, Taylor Mill, Covington, Latonia, Erlanger, Florence, and central Northern Kentucky.")}
                </p>
                <div className="vmc-location-actions">
                  <Link href="/online-help/independence/direct-booking/" className="vmc-btn vmc-btn-red">{t("Book with Independence ->")}</Link>
                  <a href={`tel:${indPublic?.tel || independence.tel}`} className="vmc-btn vmc-btn-outline">{t("Call")}</a>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="vmc-section vmc-booking">
        <div className="vmc-wrap vmc-booking-layout">
          <div className="vmc-booking-intro">
            <p className="vmc-eyebrow">{t("Booking your first visit")}</p>
            <h2>
              {t("A few details, then")} <span className="vmc-accent">{t("pick your time.")}</span>
            </h2>
            <p>
              {t("Our online booking partner, Otto, walks you through the process. You'll tell us a little about yourself and your pet, then choose an available New Client Visit at the clinic you selected.")}
            </p>
          </div>

          <div className="vmc-steps">
            {bookingSteps.map((step, index) => (
              <article className="vmc-step" key={step.title}>
                <div className="vmc-step-number">{String(index + 1).padStart(2, "0")}</div>
                <div className="vmc-step-content">
                  <span className="vmc-step-kicker">{t(step.kicker)}</span>
                  <h3>{t(step.title)}</h3>
                  <p>{t(step.text)}</p>
                  {index === 1 && (
                    <>
                      <div className="vmc-pet-preview">
                        <div className="vmc-pet-preview-title">{t("New Pet Information")}</div>
                        <div className="vmc-pet-options">
                          <div className="vmc-pet-option">{t("Canine")}</div>
                          <div className="vmc-pet-option">{t("Feline")}</div>
                        </div>
                      </div>
                      <p className="vmc-small-note">
                        {t("Don't know every answer? That's okay. Fill in what you know. You can always call us if something is unclear.")}
                      </p>
                    </>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="vmc-otto">
        <div className="vmc-wrap vmc-otto-grid">
          <div className="vmc-otto-intro">
            <p className="vmc-eyebrow">A little technology that helps</p>
            <h2>
              Booking powered by Otto. <em>Care from VMC.</em>
            </h2>
            <p>
              We use Otto to make some of the everyday logistics around veterinary care easier. It lets new clients
              choose available appointments directly instead of waiting for a callback.
            </p>
            <p>
              Once you&apos;re connected with VMC, Otto can also make it easier to communicate with our staff through text.
            </p>
            <p>Otto handles the technology. The people answering you are still the same local VMC team caring for your pet.</p>
          </div>

          <div className="vmc-otto-features">
            <div className="vmc-otto-feature">
              <div className="vmc-otto-icon" aria-hidden="true"><CalendarCheck size={19} /></div>
              <div>
                <strong>Book directly</strong>
                <span>See available appointment times and choose one that works for you.</span>
              </div>
            </div>
            <div className="vmc-otto-feature">
              <div className="vmc-otto-icon" aria-hidden="true"><MessageCircle size={19} /></div>
              <div>
                <strong>Text with our team</strong>
                <span>Otto gives clients a convenient way to have conversations with VMC staff.</span>
              </div>
            </div>
            <div className="vmc-otto-feature">
              <div className="vmc-otto-icon" aria-hidden="true"><Check size={19} /></div>
              <div>
                <strong>Stay connected</strong>
                <span>Keep routine appointment communication and everyday questions easier to manage.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="vmc-human" id="call-us">
        <div className="vmc-wrap">
          <div className="vmc-human-card">
            <p className="vmc-eyebrow">No app required</p>
            <h2>
              Prefer to do it <em>the old-fashioned way?</em>
            </h2>
            <p>
              That&apos;s completely fine. If online booking gives you trouble, you&apos;re unsure which clinic to choose,
              or you&apos;d simply rather talk to someone, give us a call. A real person at the clinic will help you get
              your first visit sorted out.
            </p>
            <div className="vmc-call-actions">
              <a href={`tel:${ftPublic?.tel || fortThomas.tel}`} className="vmc-btn vmc-btn-light">
                <Phone aria-hidden="true" size={16} /> Call Fort Thomas
              </a>
              <a href={`tel:${indPublic?.tel || independence.tel}`} className="vmc-btn vmc-btn-light">
                <Phone aria-hidden="true" size={16} /> Call Independence
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="vmc-section vmc-first">
        <div className="vmc-wrap vmc-first-grid">
          <div>
            <p className="vmc-eyebrow">Before you come in</p>
            <h2>A few things help us get to know your pet.</h2>
            <p>Don&apos;t worry if you don&apos;t have everything. Bring what you can and we&apos;ll help fill in the gaps.</p>
            <ul className="vmc-checklist">
              {firstVisitItems.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
          <div>
            <p className="vmc-eyebrow">Your first appointment</p>
            <h2>
              Mostly, we want to <span className="vmc-accent">get to know them.</span>
            </h2>
            <p>
              Your first visit gives us time to learn about your pet&apos;s history, what life looks like at home, and
              anything you&apos;ve been wondering about.
            </p>
            <p>
              Your veterinarian will examine your pet, review what you&apos;ve shared, answer your questions, and talk
              through any recommendations in plain language.
            </p>
            <p>You don&apos;t need to arrive knowing exactly what your pet needs. That&apos;s part of what we&apos;re here to help figure out.</p>
          </div>
        </div>
      </section>

      <section className="vmc-section vmc-stories">
        <div className="vmc-wrap">
          <div className="vmc-stories-head">
            <div>
              <p className="vmc-eyebrow">From our neighbors</p>
              <h2>
                The kind of care people <span className="vmc-accent">remember.</span>
              </h2>
            </div>
            <p className="vmc-stories-intro">
              We can tell you what matters to us, but families who have trusted us with their pets say it better. These
              are a few words from people who have walked through our doors in Fort Thomas and Independence.
            </p>
          </div>

          <div className="vmc-review-grid">
            {reviews.map((review) => (
              <article className="vmc-review" key={`${review.location}-${review.name}`}>
                <div>
                  <span className="vmc-review-location">{review.location}</span>
                  <div className="vmc-review-stars" aria-label="5 star Google review">★★★★★</div>
                  <blockquote>&ldquo;{review.quote}&rdquo;</blockquote>
                </div>
                <footer className="vmc-review-footer">
                  <span className="vmc-review-name">{review.name}</span>
                  <span className="vmc-review-source">Google review</span>
                </footer>
              </article>
            ))}
          </div>

          <div className="vmc-rooted">
            <div className="vmc-rooted-mark" aria-hidden="true">V</div>
            <div>
              <h3>Rooted here. Caring for the pets who live here.</h3>
              <p>
                VMC is locally and independently owned. Our clinics have grown through relationships with Northern
                Kentucky families, familiar faces coming back through the door, and the privilege of caring for pets
                through first visits, ordinary days, unexpected worries, and years spent together.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="vmc-final-booking">
        <div className="vmc-wrap">
          <div className="vmc-final-inner">
            <p className="vmc-eyebrow">Ready when you are</p>
            <h2>
              Choose your clinic. <span className="vmc-accent">We&apos;ll take it from there.</span>
            </h2>
            <p className="vmc-final-lead">
              Both VMC locations are welcoming new dogs and cats. Choose the clinic that&apos;s easiest for your family
              and Otto will walk you through your information, your pet&apos;s details, available New Client Visit times,
              and confirmation.
            </p>
            <div className="vmc-book-grid">
              <Link href="/online-help/fort-thomas/direct-booking/" className="vmc-book-choice">
                <span className="vmc-book-label">Book your first visit with</span>
                <h3>Fort Thomas</h3>
                <p>2000 Memorial Parkway<br />Fort Thomas, KY 41075</p>
                <div className="vmc-book-action">
                  <span>Book with Fort Thomas</span>
                  <span className="vmc-book-arrow" aria-hidden="true">-&gt;</span>
                </div>
              </Link>
              <Link href="/online-help/independence/direct-booking/" className="vmc-book-choice">
                <span className="vmc-book-label">Book your first visit with</span>
                <h3>Independence</h3>
                <p>4147 Madison Pike<br />Independence, KY 41051</p>
                <div className="vmc-book-action">
                  <span>Book with Independence</span>
                  <span className="vmc-book-arrow" aria-hidden="true">-&gt;</span>
                </div>
              </Link>
            </div>
            <div className="vmc-final-help">
              <strong>Would you rather talk to us first?</strong>
              <p>
                That&apos;s completely fine. If you&apos;re not sure which clinic to choose, have trouble booking online,
                or just prefer a conversation, call us and we&apos;ll help you get settled in.
              </p>
              <div className="vmc-final-help-actions">
                <a href={`tel:${ftPublic?.tel || fortThomas.tel}`} className="vmc-btn vmc-btn-outline">Call Fort Thomas</a>
                <a href={`tel:${indPublic?.tel || independence.tel}`} className="vmc-btn vmc-btn-outline">Call Independence</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <JsonLd
        data={[
          webpageSchema("/new-patients/", seo.title, seo.description),
          breadcrumbSchema(crumbs),
          organizationSchema(settings)
        ]}
      />
    </main>
  );
}

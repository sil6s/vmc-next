import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Car, Clock, Heart, HeartHandshake, MapPin, Navigation, ParkingCircle, Stethoscope, Trees, UsersRound } from "lucide-react";
import { Breadcrumbs } from "@/components/sections/Breadcrumbs";
import { FAQSection } from "@/components/sections/FAQSection";
import { FinalInvitation } from "@/components/sections/FinalInvitation";
import { Hero } from "@/components/sections/Hero";
import { TeamSection } from "@/components/sections/TeamSection";
import { Section } from "@/components/ui/Section";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, cityPageVeterinaryCareSchema, faqSchema, JsonLd, webpageSchema } from "@/lib/schema";

const path = "/locations/vet-near-cincinnati-oh/";
const fortThomas = site.locations[0];

const seo = {
  title: "Vet in Cincinnati? 10 Min Across the River | VMC Fort Thomas",
  description:
    "Looking for a vet in Cincinnati? Our Fort Thomas clinic is about 10 minutes from downtown, with free parking and a locally owned team for dogs and cats."
};

export const metadata: Metadata = pageMetadata({ ...seo, path, image: "/images/fort-thomas-clinic.jpg" });

const benefits = [
  {
    icon: Clock,
    title: "Around 10 minutes from downtown",
    text: "An easy trip across the Ohio River, practical for pet owners who live or work downtown and in nearby neighborhoods."
  },
  {
    icon: ParkingCircle,
    title: "Free parking, right outside",
    text: "No meters, no circling the block, and no carrying a nervous pet down a busy city street. Pull into our on-site lot and walk right in."
  },
  {
    icon: Trees,
    title: "A more relaxed setting",
    text: "Away from the busiest downtown streets, our Fort Thomas clinic is a lower-key place for your dog or cat, and for you."
  },
  {
    icon: UsersRound,
    title: "Real people, real relationships",
    text: "We're independently owned, so you can ask questions, understand your options, and get to know the veterinarians caring for your pet."
  },
  {
    icon: Stethoscope,
    title: "Experienced care, no big-city fuss",
    text: "Our vets bring backgrounds in general practice, emergency veterinary medicine, and feline-focused care."
  },
  {
    icon: Navigation,
    title: "Simple directions from Cincinnati",
    text: "Take I-471 South across the river to the Memorial Parkway exit in Fort Thomas. Our clinic is at 2000 Memorial Parkway."
  }
];

const littleThings = [
  { icon: Car, title: "Easy parking", text: "A free lot right outside the door, so drop-off and pickup are quick." },
  { icon: MapPin, title: "A convenient location", text: "Close to downtown, without the downtown traffic at the door." },
  { icon: HeartHandshake, title: "A team that listens", text: "We take the time to hear what you've noticed at home." },
  { icon: Heart, title: "A clinic that feels approachable", text: "A calmer, friendlier visit for nervous pets and busy people." }
];

const neighborhoods = [
  "Downtown Cincinnati",
  "Over-the-Rhine",
  "Pendleton",
  "Mt. Adams",
  "East Walnut Hills",
  "Columbia-Tusculum",
  "Linwood",
  "Mt. Lookout",
  "Hyde Park",
  "Oakley"
];

const corporateTradeoffs = [
  ["Higher or less flexible pricing", "Corporate ownership may introduce revenue targets, standardized fees, or pricing structures that individual doctors have less flexibility to adjust. That doesn't mean every corporate clinic costs more."],
  ["Pressure to generate revenue", "Financial performance targets can create tension between business goals and individualized medical judgment. These pressures can exist at independent clinics too."],
  ["Less local decision-making", "Decisions about staffing, equipment, services, and pricing may involve regional or corporate leadership, not just the local veterinary team."],
  ["Less continuity of care", "Some larger groups rotate veterinarians and staff across locations, making it harder to see the same doctor each time. It depends on the clinic."],
  ["Standardized treatment protocols", "Consistent protocols can improve quality, but overly rigid ones can limit flexibility for your pet's individual situation."],
  ["A less personal experience", "Centralized scheduling, call centers, and administrative processes can feel less personal than working directly with a small local team."],
  ["Changing culture after acquisition", "Acquisitions can bring changes to management, staffing, pricing, and long-standing traditions, even when the clinic's original name stays the same."]
];

const ownershipChecks = [
  "Scroll to the website footer or privacy policy. A parent company name often appears there.",
  "Look for phrases like \"a proud member of,\" \"part of the ___ family,\" or \"partner hospital.\"",
  "Ask the front desk directly: \"Who owns this practice, and are any of the veterinarians owners?\"",
  "Search the clinic's name with the word \"acquired\" or \"joins\" to find acquisition announcements.",
  "Know the big brands: Banfield, VCA, and BluePearl are all owned by Mars Veterinary Health."
];

// Addresses checked against multiple public listings (October 2026). Re-verify periodically.
const otherCincinnatiClinics = [
  { name: "Hyde Park Veterinary Clinic", area: "Hyde Park", address: "3667 Paxton Ave, Cincinnati, OH 45208", phone: "(513) 321-7387" },
  { name: "The Animal Hospital on Mt. Lookout Square", area: "Mt. Lookout", address: "3175 Linwood Ave, Cincinnati, OH 45208", phone: "(513) 871-8866" },
  { name: "Oakley Square Animal Hospital", area: "Oakley", address: "3000 Madison Rd, Cincinnati, OH 45209", phone: "(513) 731-7900" }
];

const cincinnatiEmergency = { name: "MedVet Cincinnati", area: "24/7 emergency", address: "3964 Red Bank Rd, Fairfax, OH 45227", phone: "(513) 561-0069" };

const cincinnatiFaqs = [
  {
    question: "Is there a vet in Cincinnati with free parking?",
    answer:
      "Yes. Veterinary Medical Center of Fort Thomas is about 10 minutes from downtown Cincinnati and has a free on-site parking lot, so there are no meters and no circling the block with your pet."
  },
  {
    question: "How far is your clinic from downtown Cincinnati?",
    answer:
      "Our Fort Thomas clinic at 2000 Memorial Parkway is around 10 minutes from downtown Cincinnati. Take I-471 South across the Ohio River to the Memorial Parkway exit."
  },
  {
    question: "Do you see dogs and cats from Cincinnati?",
    answer:
      "Yes. We welcome dogs and cats from Cincinnati and the greater Cincinnati area as new patients. Many Cincinnati pet owners choose us for the easy parking and a more personal, locally owned practice."
  },
  {
    question: "What veterinary services do you offer Cincinnati pet owners?",
    answer:
      "Cincinnati pet owners can visit us for wellness exams, vaccinations, puppy and kitten care, sick pet visits, dental care, spay and neuter surgery, soft tissue surgery, diagnostics, and senior pet care."
  },
  {
    question: "Is it worth crossing the river for a Cincinnati vet?",
    answer:
      "For many Cincinnati pet owners, yes. The closest vet on a map isn't always the easiest to visit. Parking, traffic, scheduling, and the feel of the clinic all matter, and our Fort Thomas clinic offers free parking and a relaxed, locally owned setting just across the river."
  },
  {
    question: "How can I tell if a vet in Cincinnati is corporate-owned?",
    answer:
      "Check the clinic's website footer or privacy policy for a parent company, look for phrases like \"part of the ___ family,\" search the clinic's name with \"acquired,\" or simply ask the front desk who owns the practice. Many acquired clinics keep their original local name, so it isn't always obvious."
  },
  {
    question: "Is Veterinary Medical Centers corporate-owned?",
    answer:
      "No. Veterinary Medical Centers is independently owned by Dr. Kristi Baker. There is no parent company or private equity owner, and care decisions are made locally."
  },
  {
    question: "How do I book a vet appointment from Cincinnati?",
    answer:
      "Book online any time or call our Fort Thomas clinic at (859) 442-4420. We're happy to help Cincinnati pet owners find a convenient appointment."
  }
];

export default function CincinnatiVetPage() {
  return (
    <>
      <Hero
        eyebrow="Vet near Cincinnati, OH"
        title="Looking for a vet in Cincinnati?"
        emphasis="There's a great option just across the river."
        body="Need a vet in Cincinnati without the downtown hassle? Our Fort Thomas clinic is about 10 minutes away, with free parking, a relaxed setting, and a locally owned team."
        image="/images/fort-thomas-clinic.jpg"
        imageAlt="Veterinary Medical Center of Fort Thomas, a vet near Cincinnati with free on-site parking"
        primaryCta={{ label: "Schedule a Visit", href: "/book-appointment/" }}
        secondaryCta={{ label: `Call ${fortThomas.phone}`, href: `tel:${fortThomas.tel}` }}
        showStats={false}
        inlineEmphasis
        compact
      />

      <div className="home-love-banner">
        <p className="home-love-banner-inner">
          <Heart aria-hidden="true" size={13} />
          ~10 minutes from downtown Cincinnati · Free on-site parking · Locally owned
        </p>
      </div>

      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Locations", href: "/locations/" }, { label: "Vet Near Cincinnati, OH", href: path }]} />

      <Section tone="white" className="home-vmc-introduction">
        <div className="home-vmc-editorial">
          <div className="home-vmc-copy">
            <p className="eyebrow">A Cincinnati vet alternative</p>
            <h2>Finding a vet in Cincinnati <em>shouldn&rsquo;t be a hassle.</em></h2>
            <p>Finding a <strong>veterinarian in Cincinnati</strong> shouldn&rsquo;t mean fighting for parking or squeezing a nervous pet through the downtown rush. What if your next vet visit felt a little more personal?</p>
            <p><strong>Just about 10 minutes from downtown Cincinnati, Veterinary Medical Center of Fort Thomas offers a refreshingly easy way to care for your pet.</strong> We&rsquo;re close enough to be convenient, but tucked away from the busiest parts of the city.</p>
            <p>With a free, dedicated parking lot, a more relaxed setting, and a locally owned veterinary team, visiting us can feel a lot less like another stressful errand.</p>
            <Link className="text-link" href="#clinic">See our Fort Thomas clinic →</Link>
          </div>
          <div className="home-vmc-image">
            <Image src="/images/vet-stock2.jpg" alt="Cincinnati pet owner visiting a veterinarian with a small dog" fill sizes="(max-width: 760px) 100vw, 48vw" />
          </div>
        </div>
      </Section>

      <Section tone="dark" eyebrow="Veterinary Medical Center of Fort Thomas" title={<>A little less hassle. <em>A lot more personal.</em></>} intro="Just minutes away, and a world away from the hassle. Here's why pet owners searching for a vet in Cincinnati make the short drive across the river." className="home-life-stages">
        <div className="services-pillar-grid">
          {benefits.map(({ icon: Icon, title, text }) => (
            <article className="home-life-stage-card" key={title}>
              <Icon aria-hidden="true" size={25} />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="white" eyebrow="The little things" title={<>Good veterinary care <em>shouldn&rsquo;t feel complicated.</em></>} className="home-little-things">
        <div className="home-little-things-layout">
          <div>
            <p>Some pets get nervous in the car. Others aren&rsquo;t fans of unfamiliar places. And fitting one more appointment into a busy day is stressful enough.</p>
            <p className="cincy-aside">It&rsquo;s a different kind of Cincinnati vet experience, and it&rsquo;s just across the river.</p>
          </div>
          <div className="home-little-things-list">
            {littleThings.map(({ icon: Icon, title, text }) => (
              <article key={title}><span><Icon aria-hidden="true" size={18} /></span><div><h3>{title}</h3><p>{text}</p></div></article>
            ))}
          </div>
        </div>
      </Section>

      <Section id="clinic" tone="cream" eyebrow="Your Cincinnati vet, across the river" title={<>Come see why crossing the river <em>is the easy part.</em></>} className="home-locations-section">
        <div className="cincy-clinic">
          <article className="home-location-card">
            <div className="home-location-image">
              <Image src="/images/fort-thomas-clinic.jpg" alt="Veterinary Medical Center of Fort Thomas clinic exterior and free parking lot" fill sizes="(max-width: 760px) 100vw, 50vw" />
            </div>
            <div className="home-location-copy">
              <h3><Link href="/locations/vet-in-fort-thomas-ky/">Veterinary Medical Center of Fort Thomas</Link></h3>
              <p className="home-location-official">About 10 minutes from downtown Cincinnati</p>
              <div className="home-location-details">
                <address>{fortThomas.address}</address>
                <a href={`tel:${fortThomas.tel}`}>{fortThomas.phone}</a>
                <p className="home-location-weekday-hours">Monday–Friday <span>·</span> 8 AM–6 PM</p>
                <p>Free on-site parking. From Cincinnati, take I-471 South to the Memorial Parkway exit.</p>
              </div>
            </div>
            <div className="inline-actions">
              <Link className="btn btn-primary" href="/book-appointment/">Schedule a Visit</Link>
              <a className="text-link" href={fortThomas.mapUrl} target="_blank" rel="noopener noreferrer">Get Directions</a>
            </div>
          </article>
          <div className="cincy-map">
            <iframe
              src={fortThomas.mapEmbedUrl}
              title="Map to Veterinary Medical Center of Fort Thomas from Cincinnati"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </Section>

      <TeamSection
        id="veterinarians"
        tone="white"
        eyebrow="Meet our veterinarians"
        title={<>The vets Cincinnati pet owners <em>cross the river for.</em></>}
        intro="A great Cincinnati vet experience starts with the people. Ours bring backgrounds in general practice, emergency medicine, and feline-focused care."
      />

      <Section tone="cream" eyebrow="Independent vs. corporate" title={<>Is your Cincinnati vet <em>actually locally owned?</em></>} className="cincy-corporate-section">
        <div className="cincy-corporate-intro">
          <p>Over the last decade, large corporate groups have bought thousands of veterinary clinics across the country. Industry estimates put corporate ownership at roughly <strong>25–30% of general practices</strong> and about <strong>75% of specialty and emergency hospitals</strong> in the U.S.</p>
          <p>Here&rsquo;s the part most pet owners don&rsquo;t realize: <strong>many acquired clinics keep their original local name.</strong> Some groups run hundreds of hospitals under the names those practices always had, so a clinic that looks like a neighborhood practice may be owned by a national company. If you&rsquo;re choosing a vet in Cincinnati, it&rsquo;s worth asking.</p>
        </div>

        <div className="cincy-tradeoffs" role="table" aria-label="Possible disadvantages of corporate-owned veterinary clinics">
          <div className="cincy-tradeoffs-head" role="row">
            <span role="columnheader">Possible disadvantage</span>
            <span role="columnheader">What it can mean for pet owners</span>
          </div>
          {corporateTradeoffs.map(([title, text], index) => (
            <div className="cincy-tradeoffs-row" role="row" key={title}>
              <strong role="cell"><em>{index + 1}</em>{title}</strong>
              <p role="cell">{text}</p>
            </div>
          ))}
        </div>
        <p className="cincy-fairness">Not every corporate clinic has these issues, and many employ excellent veterinarians. The point is to know who you&rsquo;re trusting with your pet, whichever vet in Cincinnati you choose.</p>

        <div className="cincy-check-grid">
          <div className="cincy-check">
            <h3>How to tell if a Cincinnati vet is corporate-owned</h3>
            <ol>
              {ownershipChecks.map((item) => <li key={item}>{item}</li>)}
            </ol>
            <p className="city-ownership-more"><Link href="/guides/independent-vs-corporate-vets/">Read our guide: independent vs. corporate vet clinics →</Link></p>
          </div>
          <aside className="cincy-vmc-owned">
            <p className="eyebrow">Veterinary Medical Centers</p>
            <h3>Independently owned. <em>No parent company.</em></h3>
            <p>Looking for a Cincinnati vet with no parent company? VMC is owned by Dr. Kristi Baker, a Northern Kentucky native who still practices medicine here. Decisions about your pet&rsquo;s care, our staffing, and our pricing are made locally, by people who know your pet.</p>
            <Link className="btn btn-secondary" href="/about/">Our story</Link>
          </aside>
        </div>
      </Section>

      <Section tone="warm" eyebrow="Is it worth crossing the river for a vet?" title={<>For many pet owners, <em>absolutely.</em></>} className="home-relationship-section">
        <div className="cincy-worth">
          <div>
            <p>The closest Cincinnati vet on a map isn&rsquo;t always the most convenient one to visit. Parking, surrounding traffic, appointment scheduling, and the atmosphere of the clinic all make a difference.</p>
            <p>For Cincinnati pet owners who appreciate easy parking, a more relaxed location, and independently owned veterinary care, Veterinary Medical Center of Fort Thomas is an appealing alternative to a vet in Cincinnati proper, just across the river.</p>
            <p className="cincy-tagline">A quick drive. Free parking. A team that genuinely cares.</p>
          </div>
          <aside>
            <h3>Cincinnati neighborhoods near us</h3>
            <ul>
              {neighborhoods.map((name) => <li key={name}>{name}</li>)}
            </ul>
          </aside>
        </div>
      </Section>

      <Section tone="white" eyebrow="Staying on the Ohio side?" title={<>Other veterinary clinics <em>in Cincinnati, Ohio.</em></>} intro="There are plenty of veterinary clinics throughout Cincinnati, and the right one depends on your neighborhood, your pet's needs, and the kind of experience you want. If you'd prefer to stay on the Ohio side of the river, here are a few local practices to explore." className="cincy-others-section">
        <div className="cincy-others">
          {otherCincinnatiClinics.map((clinic) => (
            <article key={clinic.name}>
              <small>{clinic.area}</small>
              <h3>{clinic.name}</h3>
              <address>{clinic.address}</address>
              <span>{clinic.phone}</span>
            </article>
          ))}
          <article className="is-emergency">
            <small>{cincinnatiEmergency.area}</small>
            <h3>{cincinnatiEmergency.name}</h3>
            <address>{cincinnatiEmergency.address}</address>
            <span>{cincinnatiEmergency.phone}</span>
          </article>
        </div>
        <p className="cincy-others-note">Listings are provided for convenience; please confirm hours and details with each clinic. Want free parking and a team that knows your pet? <Link href="/book-appointment/">Book with our Fort Thomas clinic</Link>, about 10 minutes from downtown. Comparing options? Read <Link href="/guides/cincinnati-vs-northern-kentucky-vets/">Cincinnati vs. Northern Kentucky vets</Link> and <Link href="/guides/best-vets-cincinnati-northern-kentucky/">our guide to local veterinarians</Link>.</p>
      </Section>

      <FAQSection faqs={cincinnatiFaqs} title="Questions from Cincinnati pet owners" />

      <FinalInvitation
        actions={<>
          <Link className="btn btn-secondary" href="/book-appointment/">Schedule a Visit</Link>
          <Link className="btn btn-ghost" href="/team/">Meet Our Veterinarians</Link>
          <a className="btn btn-ghost" href={`tel:${fortThomas.tel}`}>Call {fortThomas.phone}</a>
        </>}
      />

      <JsonLd
        data={[
          webpageSchema(path, seo.title, seo.description),
          breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Locations", path: "/locations/" }, { name: "Vet Near Cincinnati, OH", path }]),
          faqSchema(cincinnatiFaqs),
          cityPageVeterinaryCareSchema({
            locationName: "Fort Thomas",
            address: fortThomas.address,
            tel: fortThomas.tel,
            phone: fortThomas.phone,
            path,
            city: "Cincinnati",
            state: "OH"
          })
        ]}
      />
    </>
  );
}

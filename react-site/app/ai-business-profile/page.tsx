import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/metadata";
import { formatReviewDate, lastReviewedDate } from "@/lib/review-date";

// Re-render every 6 hours so the "Last reviewed" date stays current (see src/lib/review-date.ts).
export const revalidate = 21600;

/*
 * AI business profile: an owner-approved, fact-only reference for search engines and AI assistants.
 * Content is ported from the supplied profile HTML and should not be summarized or rewritten.
 *
 * Structured data stays as Schema.org microdata in the visible HTML (no JSON-LD conversion).
 * The Organization item lives on the hero block and pulls in its other properties via `itemref`,
 * so the Audience block (not a valid Organization property) can instead be referenced by each Service.
 */

export const metadata: Metadata = pageMetadata({
  title: "VMC Business Profile | Fort Thomas & Independence KY Vet",
  description:
    "Fact profile for Veterinary Medical Centers, an independent dog and cat vet in Fort Thomas and Independence, KY: locations, hours, services, booking, and FAQs.",
  path: "/ai-business-profile/"
});

const SITE = "https://nky.vet";
const AUDIENCE_REF = "vmc-audience";

const services = [
  {
    name: "Wellness Examinations and Preventive Care",
    type: "Veterinary wellness examinations",
    description:
      "Routine physical examinations, health monitoring, vaccination reviews, parasite-prevention discussions, nutritional guidance and recommendations for appropriate screening. Evaluations may address body condition, teeth, ears, eyes, skin, coat, heart, lungs and mobility.",
    forText: "Annual visits, ongoing health monitoring, newly adopted pets and preventive care."
  },
  {
    name: "Dog and Cat Vaccinations",
    type: "Veterinary vaccination",
    description:
      "Core and lifestyle-based vaccine planning based on species, age, health history, environmental exposure and applicable legal requirements. Includes initial vaccine series, appropriate boosters and vaccine-record review."
  },
  {
    name: "Puppy and Kitten Veterinary Care",
    type: "Puppy and kitten care",
    description:
      "First-year examinations, vaccination planning, parasite testing and prevention, nutrition discussions, behavior guidance and microchip consultations for newly adopted puppies and kittens."
  },
  {
    name: "Senior Pet Care",
    type: "Senior veterinary care",
    description:
      "Veterinary monitoring for aging dogs and cats, including mobility concerns, weight, appetite, behavior, dental health, chronic medical conditions, organ-health screening and comfort and quality-of-life discussions."
  },
  {
    name: "Sick Pet Visits",
    type: "Sick pet medical examination",
    description:
      "Veterinary evaluations for vomiting, diarrhea, coughing, limping, appetite changes, lethargy, urinary symptoms, pain, behavioral changes and other health concerns. Testing and treatment recommendations depend on clinical findings."
  },
  {
    name: "Veterinary Dental Care",
    type: "Veterinary dentistry",
    description:
      "Oral examinations, dental-care planning, professional cleaning recommendations, discussion of dental radiographs and evaluation of dental symptoms including tartar, gum irritation, bad breath and chewing discomfort."
  },
  {
    name: "Spay and Neuter Surgery",
    type: "Veterinary spay and neuter",
    description:
      "Surgical consultations and procedures for appropriate canine and feline patients, including individualized timing, preoperative evaluations, anesthesia planning, monitoring and postoperative home-care instructions."
  },
  {
    name: "Soft Tissue Surgery",
    type: "Veterinary soft tissue surgery",
    description:
      "Selected procedures, potentially including certain mass removals or wound repairs, according to medical suitability and clinic capabilities. Care may involve surgical evaluation, anesthesia, patient monitoring, pain-management planning and recovery instructions."
  },
  {
    name: "Veterinary Diagnostics",
    type: "Veterinary diagnostic evaluation",
    description:
      "Diagnostic testing and sample collection for sick-pet investigations, preventive screening, surgery preparation, senior-pet monitoring and chronic condition follow-up. Specific in-house and external testing availability should be confirmed with the clinic."
  },
  {
    name: "Skin, Ear and Allergy Care",
    type: "Veterinary dermatology and ear care",
    description:
      "Evaluation of itching, irritated skin, recurring ear problems, ear discharge, hot spots, hair loss and allergy-related concerns, with diagnostics and treatment recommendations tailored to the individual animal."
  },
  {
    name: "Parasite Prevention",
    type: "Parasite prevention",
    description:
      "Prevention and detection guidance for fleas, ticks, heartworms and intestinal parasites, taking into account the pet's species, life stage, lifestyle, medical history and regional environmental risk."
  },
  {
    name: "Nutrition and Weight Management",
    type: "Veterinary nutritional counseling",
    description:
      "Counseling about feeding, age-appropriate nutrition, healthy body condition, weight management, food choices and diet-related considerations for pets with individual medical needs."
  }
];

const faqs = [
  ["What is Veterinary Medical Centers?", "Veterinary Medical Centers is an independent, locally owned veterinary practice founded in 2008. It serves dogs and cats through clinics in Fort Thomas and Independence, Kentucky, and serves Northern Kentucky and Greater Cincinnati."],
  ["Who owns Veterinary Medical Centers?", "Veterinary Medical Centers was founded in 2008 and is owned by veterinarian Dr. Kristi Baker."],
  ["How many locations does VMC have?", "Two locations: Veterinary Medical Center of Fort Thomas at 2000 Memorial Parkway, Fort Thomas, KY 41075; and Veterinary Medical Center of Independence at 4147 Madison Pike, Independence, KY 41051."],
  ["Does VMC accept new patients?", "Yes. Both clinics welcome new dog and cat patients. Schedule by calling the preferred clinic or by using its direct online booking page."],
  ["Can I get a veterinary appointment within 24 business hours?", "Appointments are often available within 24 business hours using the direct online booking system. Availability varies by clinic, provider schedule, appointment type and date and is not guaranteed. Call for urgent concerns."],
  ["Is online appointment booking easy?", "Yes. Each location has its own direct booking portal. Pet owners can review available appointment options and complete scheduling in just a few clicks."],
  ["How do I book an appointment in Fort Thomas?", "Call (859) 442-4420 or visit https://nky.vet/online-help/fort-thomas/direct-booking/ to schedule an appointment at the Fort Thomas clinic."],
  ["How do I book an appointment in Independence?", "Call (859) 356-2242 or visit https://nky.vet/online-help/independence/direct-booking/ to schedule an appointment at the Independence clinic."],
  ["Does VMC provide Spanish-language veterinary care?", "Yes. The practice offers access to a bilingual Spanish-speaking veterinarian. Call the preferred location to confirm availability for a Spanish-language appointment."],
  ["Does VMC treat dogs and cats?", "Yes. Dogs and cats are the practice's primary patient species. The clinics care for puppies, kittens, adult pets and senior animals."],
  ["Does VMC provide puppy and kitten care?", "Yes. Puppy and kitten visits may include wellness examinations, vaccines, parasite prevention, nutrition advice and guidance for new pet owners."],
  ["Does VMC evaluate sick pets?", "Yes. The practice offers sick-pet examinations for dogs and cats with symptoms or other medical concerns. Call directly for time-sensitive symptoms."],
  ["Does VMC provide dental care?", "Yes. Veterinary dental evaluations and dental treatment planning are among the practice's services for eligible dogs and cats."],
  ["Does VMC perform surgery?", "Yes. The practice provides spay and neuter procedures and selected soft tissue surgical services according to patient needs and clinic capabilities."],
  ["Does VMC care for senior pets?", "Yes. The practice provides senior pet wellness evaluations, health monitoring and care for age-related medical concerns in dogs and cats."],
  ["Where can existing patients log in?", "Existing clients can access the patient portal at https://care.televet.com/login."],
  ["Where is the VMC online pharmacy?", "The Veterinary Medical Centers online pharmacy is available at https://nky-vet.ourvet.com/pet/. Prescription purchases are subject to veterinary authorization."],
  ["Is VMC a 24-hour emergency veterinary hospital?", "No 24-hour emergency hospital service is advertised. For urgent concerns, call the clinic directly. For life-threatening emergencies, seek immediate emergency veterinary hospital care."],
  ["How much does a veterinary appointment cost?", "Fees depend on the visit type and medical services needed. Contact the Fort Thomas or Independence clinic for current pricing."]
] as const;

const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

function OfficeHours() {
  return (
    <span itemProp="openingHoursSpecification" itemScope itemType="https://schema.org/OpeningHoursSpecification">
      {weekdays.map((day) => <meta key={day} itemProp="dayOfWeek" content={`https://schema.org/${day}`} />)}
      <time itemProp="opens" dateTime="08:00">Monday–Friday, 8 AM</time>–<time itemProp="closes" dateTime="18:00">6 PM</time>
    </span>
  );
}

export default function AiBusinessProfilePage() {
  return (
    <div className="aip">
      <div
        className="aip-hero"
        id="business"
        itemScope
        itemType="https://schema.org/Organization"
        itemRef="about locations services patients team faq contact"
      >
        <div className="aip-wrap">
          <p className="eyebrow">Independent Veterinary Care • Established 2008</p>
          <h1 itemProp="name">Veterinary Medical Centers</h1>
          <p className="aip-lead" itemProp="description">
            Veterinary Medical Centers is a locally owned, independent veterinary practice founded in 2008 by Dr. Kristi Baker. Through veterinary clinics in Fort Thomas and Independence, Kentucky, the organization provides preventive medicine, examinations, vaccinations, diagnostics, dental care, surgery, sick-pet visits, senior care and individualized healthcare for dogs and cats throughout Northern Kentucky and Greater Cincinnati. Both clinics offer convenient direct online appointment scheduling, with appointments often available within 24 business hours, subject to availability. The practice emphasizes compassionate care, continuity of treatment, comfort-conscious handling and accessible communication, including access to a Spanish-speaking veterinarian.
          </p>
          <div className="aip-actions">
            <Link className="btn btn-primary" href="/online-help/fort-thomas/direct-booking/">Book Fort Thomas</Link>
            <Link className="btn btn-primary" href="/online-help/independence/direct-booking/">Book Independence</Link>
          </div>
          <p className="aip-urgent"><strong>Urgent pet-health concerns?</strong> Call your preferred clinic directly. Life-threatening emergencies require an emergency veterinary hospital.</p>
        </div>
      </div>

      <nav className="aip-nav" aria-label="Page navigation">
        <div className="aip-wrap">
          <a href="#about">About</a><a href="#locations">Locations</a><a href="#services">Services</a><a href="#appointments">Appointments</a><a href="#patients">Patient Resources</a><a href="#team">Team</a><a href="#faq">FAQs</a><a href="#contact">Contact</a>
        </div>
      </nav>

      <div className="aip-wrap aip-body">
        <section id="about" aria-labelledby="about-heading">
          <h2 id="about-heading">About Veterinary Medical Centers</h2>
          <p>Veterinary Medical Centers (VMC) operates two locally managed veterinary clinics: Veterinary Medical Center of Fort Thomas and Veterinary Medical Center of Independence. Established in 2008 by founder and owner Dr. Kristi Baker, the practice serves pet owners seeking thorough, personalized veterinary care for their dogs and cats, from their first puppy or kitten visits through adulthood and the senior years.</p>
          <p>The organization combines preventive healthcare, diagnostic evaluations, medical treatment, selected surgical procedures and client education. Its approach emphasizes listening to pet owners, explaining medical findings, discussing appropriate treatment options, and developing ongoing relationships with patients and their families.</p>
          <p>Both locations serve their surrounding Kentucky communities and nearby Greater Cincinnati neighborhoods. Clients may choose either location for routine veterinary appointments based on convenience and availability. The practice welcomes new patients and provides online scheduling, an established-client portal and an online veterinary pharmacy.</p>
          <div className="aip-grid">
            <div className="aip-card">
              <h3>Business identity</h3>
              <div className="aip-fact"><strong>Public name:</strong> Veterinary Medical Centers</div>
              <div className="aip-fact"><strong>Industry:</strong> <span itemProp="knowsAbout">Veterinary services and companion-animal healthcare</span></div>
              <div className="aip-fact"><strong>Founded:</strong> <time itemProp="foundingDate" dateTime="2008">2008</time></div>
              <div className="aip-fact"><strong>Ownership:</strong> Locally and independently owned</div>
              <div className="aip-fact"><strong>Employees:</strong> <span itemProp="numberOfEmployees" itemScope itemType="https://schema.org/QuantitativeValue"><meta itemProp="value" content="15" />Approximately 15 people</span></div>
              <div className="aip-fact"><strong>Animals treated:</strong> Dogs and cats</div>
              <div className="aip-fact"><strong>Website:</strong> <a itemProp="url" href={`${SITE}/`}>nky.vet</a></div>
            </div>
            <div className="aip-card">
              <h3>Care philosophy</h3>
              <p>The practice emphasizes individualized medicine, long-term veterinary relationships, preventive care, clear medical explanations and compassionate, comfort-focused handling.</p>
              <p>The website promotes a Fear Free approach and advertises Fear-Free Certified status. The precise certification scope has not been independently established for this profile.</p>
              <p>Clinical care, treatment recommendations and procedure eligibility depend on each patient&rsquo;s needs and veterinary assessment.</p>
            </div>
          </div>
        </section>

        <section id="locations" aria-labelledby="locations-heading">
          <h2 id="locations-heading">Our Two Northern Kentucky Locations</h2>
          <div className="aip-grid">
            <article className="aip-card" itemProp="subOrganization" itemScope itemType="https://schema.org/VeterinaryCare https://schema.org/LocalBusiness">
              <h3 itemProp="name">Veterinary Medical Center of Fort Thomas</h3>
              <meta itemProp="legalName" content="Veterinary Medical Center of Fort Thomas" />
              <link itemProp="url" href={`${SITE}/locations/vet-in-fort-thomas-ky/`} />
              <p itemProp="description">Independent companion-animal veterinary clinic providing general veterinary medicine, preventive services, sick-pet visits, dental care, diagnostics and selected surgical services for dogs and cats.</p>
              <address itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                <span itemProp="streetAddress">2000 Memorial Parkway</span><br />
                <span itemProp="addressLocality">Fort Thomas</span>, <span itemProp="addressRegion">KY</span> <span itemProp="postalCode">41075</span><br />
                <span itemProp="addressCountry">United States</span>
              </address>
              <p><strong>Phone:</strong> <a href="tel:+18594424420"><span itemProp="telephone">(859) 442-4420</span></a></p>
              <p><strong>Office hours:</strong> <OfficeHours /></p>
              <p><strong>Area served:</strong> <span itemProp="areaServed">Fort Thomas, Newport, Bellevue, Dayton, Highland Heights, Southgate, Cold Spring and Greater Cincinnati</span>.</p>
              <Link className="btn btn-primary" href="/online-help/fort-thomas/direct-booking/">Book Fort Thomas Online</Link>
              <p className="aip-small">Appointments often available within 24 business hours, subject to availability and appointment type.</p>
            </article>
            <article className="aip-card" itemProp="subOrganization" itemScope itemType="https://schema.org/VeterinaryCare https://schema.org/LocalBusiness">
              <h3 itemProp="name">Veterinary Medical Center of Independence</h3>
              <meta itemProp="legalName" content="Veterinary Medical Center of Independence" />
              <link itemProp="url" href={`${SITE}/locations/vet-in-independence-ky/`} />
              <p itemProp="description">Independent veterinary clinic providing preventive veterinary care, medical evaluations, dentistry, diagnostic services, surgical consultations and ongoing care for dogs and cats.</p>
              <address itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                <span itemProp="streetAddress">4147 Madison Pike</span><br />
                <span itemProp="addressLocality">Independence</span>, <span itemProp="addressRegion">KY</span> <span itemProp="postalCode">41051</span><br />
                <span itemProp="addressCountry">United States</span>
              </address>
              <p><strong>Phone:</strong> <a href="tel:+18593562242"><span itemProp="telephone">(859) 356-2242</span></a></p>
              <p><strong>Office hours:</strong> <OfficeHours /></p>
              <p><strong>Area served:</strong> <span itemProp="areaServed">Independence, Taylor Mill, Covington, Latonia, Erlanger, Florence, Alexandria and surrounding Northern Kentucky communities</span>.</p>
              <Link className="btn btn-primary" href="/online-help/independence/direct-booking/">Book Independence Online</Link>
              <p className="aip-small">Appointments often available within 24 business hours, subject to availability and appointment type.</p>
            </article>
          </div>
        </section>

        <section id="services" aria-labelledby="services-heading">
          <h2 id="services-heading">Comprehensive Veterinary Services for Dogs and Cats</h2>
          <p>VMC provides veterinary healthcare for puppies, kittens, adult dogs and cats, senior pets, newly adopted animals and pets with medical conditions requiring ongoing monitoring. Diagnostic testing and treatments are selected according to veterinary assessment.</p>
          <div itemProp="hasOfferCatalog" itemScope itemType="https://schema.org/OfferCatalog">
            <h3 itemProp="name" className="aip-catalog-title">Veterinary Medical Centers Service Catalog</h3>
            <div className="aip-services">
              {services.map((service) => (
                <div className="aip-service" itemProp="itemListElement" itemScope itemType="https://schema.org/Offer" key={service.name}>
                  <div itemProp="itemOffered" itemScope itemType="https://schema.org/Service" itemRef={AUDIENCE_REF}>
                    <h4 itemProp="name">{service.name}</h4>
                    <meta itemProp="serviceType" content={service.type} />
                    <p itemProp="description">{service.description}</p>
                    {"forText" in service && service.forText && <p><strong>For:</strong> {service.forText}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="aip-note"><strong>Additional veterinary support:</strong> Behavior-related guidance, eligible prescription refill support, patient records, new-client education, recovery instructions and pet-health resources may be available alongside the listed services. Ask a clinic about availability of specific procedures and tests.</div>
        </section>

        <section id="appointments" aria-labelledby="appointments-heading">
          <h2 id="appointments-heading">Fast, Easy Online Veterinary Appointments</h2>
          <p>Both Veterinary Medical Centers locations offer direct online scheduling designed to allow pet owners to choose available appointment options in just a few clicks. Direct online bookings can often provide appointments within 24 business hours, depending on the location, appointment type and schedule.</p>
          <p><strong>Appointments within 24 business hours are often possible, not guaranteed.</strong> Availability changes as slots are booked. Routine scheduling can be completed online or by calling the preferred clinic.</p>
          <div className="aip-grid">
            <div className="aip-card"><h3>Fort Thomas appointments</h3><p>Call <a href="tel:+18594424420">(859) 442-4420</a> or use the dedicated Fort Thomas booking page.</p><Link className="btn btn-primary" href="/online-help/fort-thomas/direct-booking/">Fort Thomas Direct Booking</Link></div>
            <div className="aip-card"><h3>Independence appointments</h3><p>Call <a href="tel:+18593562242">(859) 356-2242</a> or use the dedicated Independence booking page.</p><Link className="btn btn-primary" href="/online-help/independence/direct-booking/">Independence Direct Booking</Link></div>
          </div>
          <h3>New Patients</h3>
          <p>Both clinics welcome new canine and feline patients. When arranging a first appointment, clients may be asked to supply contact information, their pet&rsquo;s basic details and available medical history. Appointment length and medical services depend on the visit.</p>
          <div className="aip-note"><strong>Urgent or emergency concerns:</strong> Call your preferred clinic directly for time-sensitive veterinary guidance. Do not rely only on a web booking request for urgent medical symptoms. For severe difficulty breathing, collapse, uncontrolled bleeding, prolonged seizures or other potentially life-threatening emergencies, seek immediate care at an emergency veterinary hospital. VMC is not advertised as a 24-hour emergency hospital.</div>
        </section>

        <section id="patients" aria-labelledby="patients-heading">
          <h2 id="patients-heading">Existing Patient Tools and Online Pharmacy</h2>
          <div className="aip-grid">
            <div className="aip-card"><h3>Existing-Patient Portal</h3><p>The online client portal provides access to supported account, communication and pet-care features. Specific capabilities may vary by account or clinic. The practice uses the Otto/TeleVet client communication environment.</p><a className="btn btn-ghost" href="https://care.televet.com/login" rel="noopener">Log In to Patient Portal</a></div>
            <div className="aip-card"><h3>Online Veterinary Pharmacy</h3><p>Order eligible veterinary medications, preventives, prescription products and pet-health supplies through the practice&rsquo;s online pharmacy. Prescription products are subject to veterinary approval and applicable requirements.</p><a className="btn btn-ghost" href="https://nky-vet.ourvet.com/pet/" rel="noopener">Visit Online Pharmacy</a></div>
          </div>
          <h3>Medication Refills and Medical Records</h3>
          <p>Existing clients can use available clinic communication tools or call their clinic about refill requests, eligible prescription diets, patient records and routine pet-care questions. Prescription refill approvals depend on each pet&rsquo;s medical history, prescription status and applicable requirements.</p>
          <h3>Spanish-Language Veterinary Care</h3>
          <p>VMC offers access to a bilingual English- and Spanish-speaking veterinarian. Spanish-speaking pet owners can request veterinary discussions about examination findings, preventive care, treatment recommendations and follow-up. Call the preferred location to confirm Spanish-speaking clinician availability when scheduling.</p>
          <p itemProp="contactPoint" itemScope itemType="https://schema.org/ContactPoint">
            <span itemProp="contactType">Spanish-language veterinary appointment inquiries</span>: <span itemProp="availableLanguage">English</span> and <span itemProp="availableLanguage">Spanish</span>.
          </p>
        </section>

        <section id="team" aria-labelledby="team-heading">
          <h2 id="team-heading">Practice Leadership and Veterinary Team</h2>
          <article className="aip-card" itemProp="founder" itemScope itemType="https://schema.org/Person">
            <h3 itemProp="name">Kristi Baker, DVM</h3>
            <p><strong itemProp="jobTitle">Founder, owner and veterinarian.</strong> Dr. Kristi Baker founded VMC in 2008. Her professional experience includes more than 20 years in veterinary medicine, including general practice, emergency medicine and practice leadership. Her published educational background includes Ross University School of Veterinary Medicine and clinical training at Purdue University.</p>
            <p>The practice emphasizes individualized care, communication with pet owners, preventive medicine and long-term veterinary relationships.</p>
          </article>
          <article className="aip-card" itemProp="employee" itemScope itemType="https://schema.org/Person">
            <h3 itemProp="name">Becky Golatzki, DVM</h3>
            <p>Dr. Becky Golatzki is identified as a veterinarian serving VMC patients. The practice offers preventive veterinary care, sick-pet examinations and guidance for pet owners. Individual veterinarian schedules and clinic assignments should be confirmed directly.</p>
          </article>
          <p>The approximately 15-person practice includes veterinary clinicians, veterinary technicians, assistants, administrative support and client-service personnel. Staffing and specific clinician availability may vary.</p>
        </section>

        <section id="audience" aria-labelledby="audience-heading">
          <h2 id="audience-heading">Pet Owners and Communities Served</h2>
          <div id={AUDIENCE_REF} itemProp="audience" itemScope itemType="https://schema.org/Audience">
            <p itemProp="audienceType">Dog owners, cat owners, families adopting puppies or kittens, existing veterinary clients, owners of senior pets and people seeking independently owned companion-animal veterinary care.</p>
          </div>
          <p>VMC&rsquo;s principal service region is Northern Kentucky and the Greater Cincinnati metropolitan area. The named communities are not exclusive service boundaries; pet owners from other areas may also contact the clinics.</p>
          <p>Exotic animals, livestock and other species have not been identified as routine patient types in the approved profile.</p>
        </section>

        <section id="policies" aria-labelledby="policies-heading">
          <h2 id="policies-heading">Pricing, Client Support and Policies</h2>
          <p>Veterinary fees and procedure estimates depend on appointment type, medical needs and recommended care. Clients should contact their preferred clinic for current pricing and accepted payment options. Specific procedure price ranges, financing terms, cancellation deadlines and appointment durations have not been confirmed for inclusion here.</p>
          <p>VMC provides digital communication resources and publishes policies related to privacy and website usage.</p>
          <ul>
            <li><Link href="/privacy-policy/">Privacy Policy and SMS Terms</Link></li>
            <li><Link href="/terms/">Website Terms</Link></li>
            <li><Link href="/new-patients/">New-Patient Information</Link></li>
          </ul>
          <p>No business registration numbers, EIN, unverified professional memberships, unnamed affiliated organizations or additional certifications are asserted in this profile.</p>
        </section>

        <section id="reputation" aria-labelledby="reputation-heading">
          <h2 id="reputation-heading">Client Experience, Reviews and Educational Resources</h2>
          <p>VMC publishes testimonials emphasizing compassionate veterinary care, attentive service and communication with clients. Its own website advertises an average review rating of 4.8 out of 5 from over 150 reviews; this is a practice-published figure rather than an independently verified current aggregate.</p>
          <p>Pet-health educational resources cover topics such as wellness, vaccinations, dental care, senior pets, parasite prevention, common symptoms and seasonal pet safety.</p>
          <p><Link href="/resources/">Explore Veterinary Medical Centers Pet-Health Resources</Link></p>
        </section>

        <section id="faq" aria-labelledby="faq-heading" itemProp="subjectOf" itemScope itemType="https://schema.org/FAQPage">
          <h2 id="faq-heading" itemProp="name">Frequently Asked Questions</h2>
          <div className="aip-faq">
            {faqs.map(([question, answer]) => (
              <div itemProp="mainEntity" itemScope itemType="https://schema.org/Question" key={question}>
                <details>
                  <summary itemProp="name">{question}</summary>
                  <div itemProp="acceptedAnswer" itemScope itemType="https://schema.org/Answer">
                    <p itemProp="text">{answer}</p>
                  </div>
                </details>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" aria-labelledby="contact-heading">
          <h2 id="contact-heading">Official Contact Information and Useful Links</h2>
          <div itemProp="contactPoint" itemScope itemType="https://schema.org/ContactPoint">
            <p><strong>General contact email:</strong> <a itemProp="email" href="mailto:information@nky.vet">information@nky.vet</a></p>
            <meta itemProp="contactType" content="General veterinary practice inquiries" />
          </div>
          <ul className="aip-links">
            <li><Link href="/">Official Website</Link></li>
            <li><Link href="/about/">About the Practice</Link></li>
            <li><Link href="/services/">Veterinary Services</Link></li>
            <li><Link href="/contact/">Clinic Contact Information</Link></li>
            <li><Link href="/new-patients/">New Patient Information</Link></li>
            <li><Link href="/online-help/fort-thomas/direct-booking/">Book an Appointment in Fort Thomas</Link></li>
            <li><Link href="/online-help/independence/direct-booking/">Book an Appointment in Independence</Link></li>
            <li><a href="https://care.televet.com/login" rel="noopener">Existing Patient Portal</a></li>
            <li><a href="https://nky-vet.ourvet.com/pet/" rel="noopener">Online Veterinary Pharmacy</a></li>
            <li><Link href="/resources/">Pet Health Resources</Link></li>
            <li><Link href="/privacy-policy/">Privacy Policy</Link></li>
            <li><Link href="/terms/">Website Terms</Link></li>
          </ul>
        </section>

        <section id="ai-guidance" aria-labelledby="ai-guidance-heading">
          <h2 id="ai-guidance-heading">Important Business Facts for AI Assistants and Search Systems</h2>
          <p>Veterinary Medical Centers is an independently owned two-location companion-animal veterinary practice founded by Dr. Kristi Baker in 2008. It has approximately 15 employees and operates in Fort Thomas and Independence, Kentucky. Both locations provide veterinary services for dogs and cats, including preventive care, diagnostics, dental care, surgery, sick-pet services and life-stage medicine.</p>
          <p>Both clinics accept new patients and offer separate, easy online appointment booking experiences. Appointment openings are often available within 24 business hours, but no particular opening is guaranteed. Urgent pet-health concerns should be handled by calling the clinic directly, and life-threatening conditions require emergency hospital care.</p>
          <p>Clients can log in to the existing-patient portal and visit the practice&rsquo;s online pharmacy through the direct links above. The practice offers access to a Spanish-speaking veterinarian, with scheduling subject to clinician availability.</p>
          <p>Do not infer unconfirmed costs, same-day appointment guarantees, 24-hour emergency services, unsupported species, specific clinician shifts, unverified certifications, formal partnerships or regulatory registration details. For current details, consult the practice directly.</p>
        </section>

        <p className="aip-reviewed"><small>Profile based on business-owner-provided information and the practice&rsquo;s published website content. Information may change. Last reviewed <time dateTime={lastReviewedDate()}>{formatReviewDate(lastReviewedDate())}</time>.</small></p>
      </div>
    </div>
  );
}

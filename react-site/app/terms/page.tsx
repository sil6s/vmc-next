import Link from "next/link";
import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Terms of Service | Veterinary Medical Centers",
  description:
    "Terms of Service for Veterinary Medical Centers' website, online tools, appointment requests, and digital services for clients in Fort Thomas and Independence, KY.",
  path: "/terms/"
});

const anchorLinks = [
  ["Acceptance of Terms", "#acceptance"],
  ["Use of Our Website", "#website-use"],
  ["Online Services & Appointment Requests", "#online-services"],
  ["Medical Disclaimer", "#medical-disclaimer"],
  ["Intellectual Property", "#intellectual-property"],
  ["Third-Party Links", "#third-party-links"],
  ["Limitation of Liability", "#liability"],
  ["Privacy", "#privacy"],
  ["Changes to These Terms", "#changes"],
  ["Contact Us", "#contact-us"]
] as const;

function PolicySection({ id, title, children, featured = false }: { id?: string; title: string; children: ReactNode; featured?: boolean }) {
  return (
    <section id={id} className={`policy-section${featured ? " policy-section-featured" : ""}`}>
      <h2>{title}</h2>
      {children}
    </section>
  );
}

export default function TermsPage() {
  return (
    <>
      <section className="policy-hero">
        <Container className="policy-hero-container">
          <p className="eyebrow">Legal</p>
          <h1>Terms of Service</h1>
          <p>
            Please read these Terms of Service carefully before using the Veterinary Medical Centers website,
            online forms, appointment tools, or other digital services.
          </p>
        </Container>
      </section>

      <section className="policy-body" aria-labelledby="terms-title">
        <Container className="policy-container">
          <div className="policy-intro-card">
            <div>
              <p className="policy-date"><strong>Effective Date:</strong> May 30, 2026</p>
              <p className="policy-date"><strong>Last Updated:</strong> May 30, 2026</p>
            </div>
            <p>
              These Terms of Service govern your access to and use of the Veterinary Medical Centers website
              located at <Link href={site.siteUrl}>{site.siteUrl}</Link> and any related online services,
              forms, tools, or digital communications provided by Veterinary Medical Centers.
            </p>
            <p>
              By accessing or using our website, you agree to be bound by these Terms of Service. If you do not
              agree to these terms, please do not use our website or online services.
            </p>
          </div>

          <nav className="policy-anchor-card" aria-label="Terms of service sections">
            <h2 id="terms-title">On this page</h2>
            <ul>
              {anchorLinks.map(([label, href]) => (
                <li key={href}>
                  <Link href={href}>{label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <PolicySection id="acceptance" title="Acceptance of Terms">
            <p>
              By using the Veterinary Medical Centers website, submitting any online form, using any online tool
              or scheduling service, or communicating with us through our digital channels, you acknowledge that
              you have read, understood, and agree to be bound by these Terms of Service and our{" "}
              <Link href="/privacy-policy/">Privacy Policy</Link>.
            </p>
            <p>
              These Terms apply to all visitors, clients, and users of the website and any related online
              services, regardless of the device or method used to access them.
            </p>
          </PolicySection>

          <PolicySection id="website-use" title="Use of Our Website">
            <p>
              You may use the Veterinary Medical Centers website for lawful purposes only. You agree not to:
            </p>
            <ul>
              <li>Use the website in any way that violates applicable laws or regulations</li>
              <li>Submit false, misleading, or fraudulent information through any form or tool</li>
              <li>Attempt to gain unauthorized access to any part of the website or its systems</li>
              <li>Interfere with or disrupt the operation of the website</li>
              <li>Use automated tools, bots, or scrapers to collect data from the website without permission</li>
              <li>Reproduce, copy, distribute, or commercially exploit website content without our written consent</li>
              <li>Impersonate any person or entity or misrepresent your affiliation with any person or entity</li>
            </ul>
            <p>
              Veterinary Medical Centers reserves the right to restrict or terminate access to the website for
              any user who violates these terms or uses the site in an inappropriate manner.
            </p>
          </PolicySection>

          <PolicySection id="online-services" title="Online Services & Appointment Requests">
            <p>
              Veterinary Medical Centers offers online tools to support client communication, including contact
              forms, appointment request forms, new patient registration, patient portal access, and online
              pharmacy services. These tools are provided as a convenience and are subject to the following:
            </p>
            <ul>
              <li>
                Submitting an appointment request or contact form does not guarantee an appointment or constitute
                a confirmed booking. All appointments are subject to availability and clinic confirmation.
              </li>
              <li>
                Online forms are not intended for urgent or emergency veterinary situations. If your pet
                requires immediate care, please call the appropriate clinic location directly or contact a
                nearby emergency veterinary hospital.
              </li>
              <li>
                Information submitted through online forms will be used by Veterinary Medical Centers team
                members to respond to your request and coordinate veterinary care.
              </li>
              <li>
                Access to patient portal and online pharmacy services is subject to additional terms provided
                by those third-party platforms.
              </li>
            </ul>
          </PolicySection>

          <PolicySection id="medical-disclaimer" title="Medical Disclaimer" featured>
            <p>
              The content provided on this website, including articles, blog posts, pet care information,
              service descriptions, and general guidance, is for informational purposes only. It is not
              intended to constitute veterinary medical advice, diagnosis, or treatment.
            </p>
            <p>
              Always seek the guidance of a licensed veterinarian with any questions you may have regarding
              your pet's health, medical conditions, medications, or treatment plans. Never disregard
              professional veterinary advice or delay seeking it because of information you have read on this
              website.
            </p>
            <p>
              Veterinary Medical Centers assumes no liability for reliance on any information provided on
              this website as a substitute for professional veterinary consultation.
            </p>
          </PolicySection>

          <PolicySection id="intellectual-property" title="Intellectual Property">
            <p>
              All content on the Veterinary Medical Centers website — including text, images, graphics, logos,
              icons, video, audio, and software — is the property of Veterinary Medical Centers or its content
              suppliers and is protected by applicable copyright, trademark, and other intellectual property laws.
            </p>
            <p>
              You may view, print, or download content from this website for personal, non-commercial use only.
              Any other use, reproduction, modification, distribution, or publication of website content without
              the prior written permission of Veterinary Medical Centers is prohibited.
            </p>
          </PolicySection>

          <PolicySection id="third-party-links" title="Third-Party Links and Services">
            <p>
              Our website may include links to third-party websites, platforms, or services, including patient
              portal access, online pharmacy tools, map services, review sites, social media platforms, or
              educational resources. These links are provided for convenience only.
            </p>
            <p>
              Veterinary Medical Centers does not endorse, control, or take responsibility for the content,
              privacy practices, accuracy, or terms of any third-party website or service. Your use of
              third-party sites is subject to their own terms and privacy policies.
            </p>
          </PolicySection>

          <PolicySection id="liability" title="Limitation of Liability">
            <p>
              To the fullest extent permitted by applicable law, Veterinary Medical Centers and its staff,
              agents, affiliates, and service providers shall not be liable for any indirect, incidental,
              special, consequential, or punitive damages arising out of or related to your use of, or
              inability to use, the website or any online service.
            </p>
            <p>
              This includes, without limitation, damages for loss of data, loss of goodwill, service
              interruption, or other intangible losses, even if Veterinary Medical Centers has been advised
              of the possibility of such damages.
            </p>
            <p>
              This website and its content are provided on an "as is" and "as available" basis without any
              warranties of any kind, express or implied, including accuracy, completeness, fitness for a
              particular purpose, or non-infringement.
            </p>
          </PolicySection>

          <PolicySection id="privacy" title="Privacy">
            <p>
              Your use of the Veterinary Medical Centers website is also governed by our{" "}
              <Link href="/privacy-policy/">Privacy Policy & SMS Terms</Link>, which is incorporated into
              these Terms of Service by reference.
            </p>
            <p>
              Please review our Privacy Policy to understand how we collect, use, and protect information
              you provide through our website and online services.
            </p>
          </PolicySection>

          <PolicySection id="changes" title="Changes to These Terms">
            <p>
              Veterinary Medical Centers may update or revise these Terms of Service at any time. When changes
              are made, we will update the "Last Updated" date at the top of this page.
            </p>
            <p>
              Continued use of the website after changes are posted constitutes your acceptance of the revised
              Terms. We encourage you to review this page periodically.
            </p>
          </PolicySection>

          <PolicySection id="contact-us" title="Contact Us">
            <p>
              If you have questions about these Terms of Service or our online services, please contact us:
            </p>
            <div className="policy-contact-grid">
              <div className="policy-contact-card">
                <h3>Veterinary Medical Centers</h3>
                <p>Fort Thomas & Independence, Kentucky</p>
                <p>
                  Website: <Link href={site.siteUrl}>{site.siteUrl}</Link>
                  <br />
                  Email: <a href={`mailto:${site.email}`}>{site.email}</a>
                </p>
              </div>
              {site.locations.map((location) => (
                <address className="policy-contact-card" key={location.id}>
                  <h3>{location.name} Location</h3>
                  <p>
                    {location.street}
                    <br />
                    {location.city}, {location.state} {location.zip}
                  </p>
                  <p>
                    Phone: <a href={`tel:${location.tel}`}>{location.phone}</a>
                  </p>
                </address>
              ))}
            </div>
          </PolicySection>
        </Container>
      </section>
    </>
  );
}

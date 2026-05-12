import Link from "next/link";
import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Privacy Policy & SMS Terms | Veterinary Medical Center",
  description:
    "Read Veterinary Medical Center’s privacy policy, contact form policy, Google Analytics notice, and SMS terms for Fort Thomas and Independence, KY clients.",
  path: "/privacy-policy/"
});

const anchorLinks = [
  ["Website Privacy", "#website-privacy"],
  ["Contact Forms", "#contact-forms"],
  ["Google Analytics & Cookies", "#analytics-cookies"],
  ["SMS Privacy Policy", "#sms-privacy"],
  ["SMS Terms of Use", "#sms-terms"],
  ["Contact Us", "#contact-us"]
] as const;

const collectedInformation = [
  "Your name",
  "Email address",
  "Phone number",
  "Address or general location",
  "Pet’s name, species, breed, age, medical history, or care needs",
  "Appointment request details",
  "Messages submitted through contact forms",
  "New patient form information",
  "Communication preferences",
  "SMS/text message opt-in status",
  "Any other information you choose to provide when contacting us"
];

const usageItems = [
  "Respond to questions submitted through our website",
  "Schedule, confirm, or follow up on appointments",
  "Communicate about your pet’s care",
  "Provide veterinary services",
  "Send appointment reminders",
  "Send service-related updates",
  "Process new patient requests",
  "Provide client support",
  "Improve our website and online experience",
  "Maintain business and client records",
  "Support online booking, refill requests, patient portal access, and related tools",
  "Protect the security and functionality of our website",
  "Comply with applicable legal, professional, or operational requirements"
];

function PolicySection({ id, title, children, featured = false }: { id?: string; title: string; children: ReactNode; featured?: boolean }) {
  return (
    <section id={id} className={`policy-section${featured ? " policy-section-featured" : ""}`}>
      <h2>{title}</h2>
      {children}
    </section>
  );
}

function TermsBlock({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="policy-terms-block">
      <h3>{title}</h3>
      {children}
    </div>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="policy-hero">
        <Container className="policy-hero-container">
          <p className="eyebrow">Legal & Privacy</p>
          <h1>Privacy Policy & SMS Terms</h1>
          <p>
            How Veterinary Medical Center collects, uses, and protects information from our website, contact forms,
            analytics tools, phone and email communications, and Otto SMS/text messaging.
          </p>
        </Container>
      </section>

      <section className="policy-body" aria-labelledby="policy-title">
        <Container className="policy-container">
          <div className="policy-intro-card">
            <div>
              <p className="policy-date"><strong>Effective Date:</strong> May 12, 2026</p>
              <p className="policy-date"><strong>Last Updated:</strong> May 12, 2026</p>
            </div>
            <p>
              Veterinary Medical Center respects your privacy. This Privacy Policy explains how we collect, use, and
              protect information submitted through our website, contact forms, appointment requests, phone calls, emails,
              SMS/text messages, analytics tools, and other client communication systems.
            </p>
            <p>
              This policy applies to Veterinary Medical Center locations in Fort Thomas, Kentucky and Independence,
              Kentucky, as well as our website and related online services.
            </p>
          </div>

          <nav className="policy-anchor-card" aria-label="Privacy policy sections">
            <h2 id="policy-title">On this page</h2>
            <ul>
              {anchorLinks.map(([label, href]) => (
                <li key={href}>
                  <Link href={href}>{label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <PolicySection id="website-privacy" title="Website Privacy">
            <h3>Information We Collect</h3>
            <p>Veterinary Medical Center may collect information that you voluntarily provide to us, including:</p>
            <ul>
              {collectedInformation.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p>
              We may also collect limited technical information when you visit our website, including browser type, device
              type, pages visited, referring website, general website activity, and approximate location information based
              on your device or browser settings.
            </p>

            <h3>How We Use Your Information</h3>
            <p>Veterinary Medical Center may use the information we collect to:</p>
            <ul>
              {usageItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p>Veterinary Medical Center does not sell personal information submitted through our website or contact forms.</p>
          </PolicySection>

          <PolicySection id="contact-forms" title="Contact Forms and Appointment Requests">
            <p>
              When you submit a contact form, appointment request, new patient form, or other online form through our
              website, the information you provide is used to respond to your inquiry and help coordinate veterinary care.
            </p>
            <p>
              By submitting a form, you authorize Veterinary Medical Center to contact you using the information you
              provide. This may include phone calls, emails, or text messages related to your inquiry, appointment
              request, pet’s care, or client service needs.
            </p>
            <p>
              Please do not use the website contact form for urgent emergencies. If your pet is experiencing a medical
              emergency, call the appropriate Veterinary Medical Center location directly or contact a nearby emergency
              veterinary hospital.
            </p>
            <p>
              Information submitted through website forms may be reviewed by Veterinary Medical Center team members and
              may be stored in our website, email system, scheduling system, client communication tools, or veterinary
              practice management systems as needed to respond to your request.
            </p>
          </PolicySection>

          <PolicySection id="analytics-cookies" title="Google Analytics, Cookies, and Website Tracking">
            <p>
              Veterinary Medical Center uses Google Analytics and similar website tools to understand how visitors use our
              website, improve website performance, and evaluate the effectiveness of our online content.
            </p>
            <p>
              Google Analytics may collect information such as pages visited, time spent on the website, device type,
              browser type, approximate location, referral source, and interactions with website features. This information
              helps us improve the website and better understand what information clients are looking for.
            </p>
            <p>
              Our website may also use cookies or similar technologies. Cookies are small files stored on your device that
              help websites function, remember preferences, measure traffic, and improve user experience.
            </p>
            <p>
              You can control or disable cookies through your browser settings. Disabling cookies may affect how some
              website features function.
            </p>
          </PolicySection>

          <PolicySection title="Email and Phone Communications">
            <p>
              If you provide your email address or phone number, Veterinary Medical Center may use that information to
              respond to inquiries, provide appointment-related information, communicate about your pet’s care, send client
              service messages, or share clinic updates when appropriate.
            </p>
            <p>
              Transactional or service-related communications, such as appointment confirmations, medical follow-ups,
              account notices, or care-related messages, may still be sent when necessary.
            </p>
          </PolicySection>

          <PolicySection title="Third-Party Services">
            <p>
              Veterinary Medical Center may use trusted third-party service providers to help operate our website, manage
              communications, support scheduling, provide online forms, send SMS/text messages, host our website, analyze
              website performance, or provide client-facing tools.
            </p>
            <p>
              These providers may include website hosting services, online form tools, email services, SMS and client
              communication platforms such as Otto, analytics tools such as Google Analytics, online booking tools, patient
              portal tools, online pharmacy platforms, website security tools, and spam-prevention tools.
            </p>
            <p>These providers may access information only as needed to perform services on our behalf.</p>
            <p>
              We are not responsible for the privacy practices of third-party websites or platforms linked from our
              website. We encourage visitors to review the privacy policies of those third-party services.
            </p>
          </PolicySection>

          <PolicySection title="How We Protect Information">
            <p>
              Veterinary Medical Center takes reasonable administrative, technical, and physical measures to help protect
              personal information from unauthorized access, loss, misuse, disclosure, or alteration.
            </p>
            <p>
              However, no website, form, email system, SMS system, or online transmission method is completely secure.
              Please avoid submitting highly sensitive information through general website contact forms unless
              specifically requested through a secure channel.
            </p>
          </PolicySection>

          <PolicySection title="Data Retention">
            <p>
              Veterinary Medical Center retains information only as long as reasonably necessary for the purposes described
              in this policy, including client communication, appointment management, veterinary care, business operations,
              legal compliance, recordkeeping, dispute resolution, and security.
            </p>
            <p>
              Veterinary medical records may be retained according to applicable veterinary, professional, legal, and
              regulatory requirements.
            </p>
          </PolicySection>

          <PolicySection id="sms-privacy" title="SMS Privacy Policy" featured>
            <p>
              Veterinary Medical Center uses SMS/text messaging, including through Otto, to help with appointment
              reminders, scheduled services, follow-up communications, and general customer care.
            </p>
            <p>
              No mobile opt-in data, SMS consent records, or phone numbers collected for SMS purposes will be shared with
              third parties or affiliates for marketing or promotional purposes.
            </p>
            <p>
              All categories of data sharing described in this Privacy Policy exclude text messaging originator opt-in data
              and consent. This information will not be shared with any third parties for marketing or promotional
              purposes.
            </p>
          </PolicySection>

          <PolicySection id="sms-terms" title="SMS Terms of Use" featured>
            <p>
              By opting into SMS messages from Veterinary Medical Center, you agree to receive text messages related to
              upcoming appointments, scheduled services, follow-up care, and general customer care.
            </p>
            <TermsBlock title="Types of Messages">
              <p>
                You may receive messages about upcoming appointments, appointment confirmations, appointment reminders,
                scheduled services, follow-up care, general customer care, and other veterinary service-related
                communications.
              </p>
            </TermsBlock>
            <TermsBlock title="Message Frequency">
              <p>
                Message frequency varies depending on your appointments, services, communication needs, and interactions
                with Veterinary Medical Center.
              </p>
            </TermsBlock>
            <TermsBlock title="Opting Out">
              <p>
                You can cancel the SMS service at any time. Text STOP to the number you received messages from. After you
                send STOP, Veterinary Medical Center will send a confirmation message that you have been unsubscribed.
                After this, you will no longer receive SMS messages from that number unless you opt back in.
              </p>
            </TermsBlock>
            <TermsBlock title="Opting Back In">
              <p>To resubscribe and opt back in to receive texts from the same number, text START.</p>
            </TermsBlock>
            <TermsBlock title="Help">
              <p>If you are experiencing issues with the messaging program, reply with HELP for assistance.</p>
            </TermsBlock>
            <TermsBlock title="Carrier Disclaimer">
              <p>Mobile carriers are not liable for delayed or undelivered messages.</p>
            </TermsBlock>
            <TermsBlock title="Message and Data Rates">
              <p>
                Message and data rates may apply for messages sent to you from Veterinary Medical Center and messages sent
                from you to Veterinary Medical Center. Contact your wireless provider with questions about your text or
                data plan.
              </p>
            </TermsBlock>
            <TermsBlock title="SMS Privacy">
              <p>
                Your SMS opt-in data and consent will not be shared with third parties or affiliates for marketing or
                promotional purposes.
              </p>
            </TermsBlock>
          </PolicySection>

          <PolicySection title="Children’s Privacy">
            <p>
              Our website and online services are intended for adults seeking veterinary care for animals. We do not
              knowingly collect personal information from children under 13 through our website.
            </p>
            <p>
              If you believe a child has submitted personal information to us without appropriate consent, please contact
              us so we can review and delete the information if appropriate.
            </p>
          </PolicySection>

          <PolicySection title="Links to Other Websites">
            <p>
              Our website may link to third-party websites, including patient portals, online pharmacy platforms, map
              services, social media platforms, review sites, or educational resources.
            </p>
            <p>
              We are not responsible for the content, privacy practices, or security of third-party websites. Visiting
              those websites is subject to their own privacy policies and terms.
            </p>
          </PolicySection>

          <PolicySection title="Updates to This Policy">
            <p>
              Veterinary Medical Center may update this Privacy Policy & SMS Terms page from time to time to reflect
              changes in our services, technology, legal requirements, or business practices.
            </p>
            <p>When we update this page, we will revise the “Last Updated” date at the top of the page.</p>
          </PolicySection>

          <PolicySection id="contact-us" title="Contact Us">
            <p>
              If you have questions about this Privacy Policy, SMS communications, contact form submissions, or your
              privacy choices, please contact us:
            </p>
            <div className="policy-contact-grid">
              <div className="policy-contact-card">
                <h3>Veterinary Medical Center</h3>
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

import { ContactForm } from "@/components/forms/ContactForm";
import { Hero } from "@/components/sections/Hero";
import { Container } from "@/components/ui/Container";
import { pages } from "@/data/pages";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, JsonLd, webpageSchema } from "@/lib/schema";

export const metadata = pageMetadata({ ...pages.form.seo, path: "/new-patient-registration-form/" });

export default function NewPatientRegistrationFormPage() {
  return (
    <>
      <Hero
        eyebrow="New Patient Form"
        title="New patient registration form."
        body="Use this secure website form to start the registration process. If your pet needs urgent help, call either clinic instead."
        image="/images/veterinary-care-hero.jpg"
        imageAlt="New patient registration for Veterinary Medical Center"
        primaryCta={{ label: "Call Fort Thomas", href: "tel:+18594424420" }}
        secondaryCta={{ label: "Call Independence", href: "tel:+18593562242" }}
      />
      <div className="basic-page">
        <Container>
          <div className="form-panel">
            <h1>Start your new patient registration</h1>
            <p>
              This temporary static form uses the same route handler as the contact form. It is ready for Vercel and can
              be connected to Resend, Brevo, SendGrid, or a practice management workflow through environment variables.
            </p>
            <ContactForm />
          </div>
        </Container>
      </div>
      <JsonLd data={[webpageSchema("/new-patient-registration-form/", pages.form.seo.title, pages.form.seo.description), breadcrumbSchema([{ name: "Home", path: "/" }, { name: "New Patient Registration", path: "/new-patient-registration-form/" }])]} />
    </>
  );
}

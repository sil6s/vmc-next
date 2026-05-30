import { NewPatientRegistrationForm } from "@/components/forms/NewPatientRegistrationForm";
import { pages } from "@/data/pages";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({ ...pages.form.seo, path: "/new-patient-registration-form/" });

export default function NewPatientRegistrationFormPage() {
  return <NewPatientRegistrationForm />;
}

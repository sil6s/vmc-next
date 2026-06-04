"use client";

import { useRef, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ShadButton } from "@/components/ui/Button";
import { TurnstileField } from "@/components/forms/TurnstileField";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { trackEvent } from "@/lib/analytics";
import { localeNames, type Locale } from "@/lib/i18n";

type FormState = "idle" | "submitting" | "success" | "error";

const locationOptions = ["Fort Thomas", "Independence", "Not sure"];

const contactFormCopy: Record<Locale, {
  title: string;
  review: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  petName: string;
  preferredLocation: string;
  selectClinic: string;
  notSure: string;
  howCanWeHelp: string;
  messagePlaceholder: string;
  emergencyNote: string;
  sending: string;
  sendMessage: string;
  sentTitle: string;
  notSentTitle: string;
  updateTitle: string;
  success: string;
  failure: string;
  errors: {
    firstName: string;
    lastName: string;
    location: string;
    email: string;
    phone: string;
    message: string;
  };
}> = {
  en: {
    title: "Contact form", review: "Please review the form", firstName: "First name", lastName: "Last name", email: "Email", phone: "Phone",
    petName: "Pet's name", preferredLocation: "Preferred location", selectClinic: "Select a clinic", notSure: "Not sure",
    howCanWeHelp: "How can we help?", messagePlaceholder: "Tell us about your pet and how we can help...",
    emergencyNote: "This form is not monitored for emergencies. For urgent care, please call us directly.",
    sending: "Sending...", sendMessage: "Send Message", sentTitle: "Message sent", notSentTitle: "Message not sent", updateTitle: "Update",
    success: "Thank you. Your message has been sent. Our team will follow up as soon as possible during business hours.",
    failure: "Your message could not be sent right now. Please call either clinic if your pet needs timely help.",
    errors: { firstName: "Please enter your first name.", lastName: "Please enter your last name.", location: "Please choose a preferred location.", email: "Please enter a valid email address.", phone: "Please enter your phone number.", message: "Please add a message with at least 10 characters." }
  },
  es: {
    title: "Formulario de contacto", review: "Revise el formulario", firstName: "Nombre", lastName: "Apellido", email: "Correo electrónico", phone: "Teléfono",
    petName: "Nombre de la mascota", preferredLocation: "Ubicación preferida", selectClinic: "Seleccione una clínica", notSure: "No estoy seguro",
    howCanWeHelp: "¿Cómo podemos ayudar?", messagePlaceholder: "Cuéntenos sobre su mascota y cómo podemos ayudar...",
    emergencyNote: "Este formulario no se supervisa para emergencias. Para atención urgente, llámenos directamente.",
    sending: "Enviando...", sendMessage: "Enviar mensaje", sentTitle: "Mensaje enviado", notSentTitle: "Mensaje no enviado", updateTitle: "Actualización",
    success: "Gracias. Su mensaje ha sido enviado. Nuestro equipo responderá lo antes posible durante el horario de atención.",
    failure: "No se pudo enviar su mensaje. Llame a cualquiera de las clínicas si su mascota necesita ayuda oportuna.",
    errors: { firstName: "Ingrese su nombre.", lastName: "Ingrese su apellido.", location: "Elija una ubicación preferida.", email: "Ingrese un correo electrónico válido.", phone: "Ingrese su número de teléfono.", message: "Agregue un mensaje de al menos 10 caracteres." }
  },
  fr: {
    title: "Formulaire de contact", review: "Vérifiez le formulaire", firstName: "Prénom", lastName: "Nom", email: "E-mail", phone: "Téléphone",
    petName: "Nom de l’animal", preferredLocation: "Établissement préféré", selectClinic: "Sélectionnez une clinique", notSure: "Je ne sais pas",
    howCanWeHelp: "Comment pouvons-nous vous aider ?", messagePlaceholder: "Parlez-nous de votre animal et de la manière dont nous pouvons vous aider...",
    emergencyNote: "Ce formulaire n’est pas surveillé pour les urgences. Pour des soins urgents, appelez-nous directement.",
    sending: "Envoi...", sendMessage: "Envoyer le message", sentTitle: "Message envoyé", notSentTitle: "Message non envoyé", updateTitle: "Mise à jour",
    success: "Merci. Votre message a été envoyé. Notre équipe vous répondra dès que possible pendant les heures d’ouverture.",
    failure: "Votre message n’a pas pu être envoyé. Appelez l’une des cliniques si votre animal a besoin d’une aide rapide.",
    errors: { firstName: "Saisissez votre prénom.", lastName: "Saisissez votre nom.", location: "Choisissez un établissement préféré.", email: "Saisissez une adresse e-mail valide.", phone: "Saisissez votre numéro de téléphone.", message: "Ajoutez un message d’au moins 10 caractères." }
  },
  hi: {
    title: "संपर्क फ़ॉर्म", review: "कृपया फ़ॉर्म की समीक्षा करें", firstName: "पहला नाम", lastName: "अंतिम नाम", email: "ईमेल", phone: "फ़ोन",
    petName: "पालतू पशु का नाम", preferredLocation: "पसंदीदा स्थान", selectClinic: "क्लिनिक चुनें", notSure: "निश्चित नहीं",
    howCanWeHelp: "हम कैसे सहायता कर सकते हैं?", messagePlaceholder: "अपने पालतू पशु और आवश्यक सहायता के बारे में बताएँ...",
    emergencyNote: "इस फ़ॉर्म की आपात स्थितियों के लिए निगरानी नहीं की जाती। तत्काल देखभाल के लिए हमें सीधे कॉल करें।",
    sending: "भेजा जा रहा है...", sendMessage: "संदेश भेजें", sentTitle: "संदेश भेजा गया", notSentTitle: "संदेश नहीं भेजा गया", updateTitle: "अपडेट",
    success: "धन्यवाद। आपका संदेश भेज दिया गया है। हमारी टीम कार्य समय के दौरान जल्द से जल्द संपर्क करेगी।",
    failure: "आपका संदेश अभी नहीं भेजा जा सका। यदि आपके पालतू पशु को समय पर सहायता चाहिए तो किसी भी क्लिनिक को कॉल करें।",
    errors: { firstName: "अपना पहला नाम दर्ज करें।", lastName: "अपना अंतिम नाम दर्ज करें।", location: "पसंदीदा स्थान चुनें।", email: "मान्य ईमेल पता दर्ज करें।", phone: "अपना फ़ोन नंबर दर्ज करें।", message: "कम से कम 10 अक्षरों का संदेश जोड़ें।" }
  },
  zh: {
    title: "联系表格", review: "请检查表格", firstName: "名字", lastName: "姓氏", email: "电子邮件", phone: "电话",
    petName: "宠物姓名", preferredLocation: "首选地点", selectClinic: "选择诊所", notSure: "不确定",
    howCanWeHelp: "我们可以如何帮助您？", messagePlaceholder: "请告诉我们您的宠物情况以及我们可以如何帮助...",
    emergencyNote: "此表格不用于监控紧急情况。如需紧急护理，请直接致电我们。",
    sending: "正在发送...", sendMessage: "发送消息", sentTitle: "消息已发送", notSentTitle: "消息未发送", updateTitle: "更新",
    success: "谢谢。您的消息已发送。我们的团队将在营业时间内尽快与您联系。",
    failure: "您的消息目前无法发送。如果宠物需要及时帮助，请致电任一诊所。",
    errors: { firstName: "请输入名字。", lastName: "请输入姓氏。", location: "请选择首选地点。", email: "请输入有效的电子邮件地址。", phone: "请输入电话号码。", message: "请输入至少 10 个字符的消息。" }
  }
};

const initialForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  petName: "",
  location: "",
  message: "",
  company: ""
};

function ContactSelect({
  id,
  value,
  options,
  placeholder,
  onChange
}: {
  id: string;
  value: string;
  options: string[];
  placeholder: string;
  onChange: (value: string) => void;
}) {
  return (
    <Select value={value || "__empty"} onValueChange={(next) => onChange(next === "__empty" ? "" : next)}>
      <SelectTrigger id={id}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="__empty">{placeholder}</SelectItem>
        {options.map((option) => (
          <SelectItem key={option} value={option}>{option}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export function ContactForm({ locale = "en" }: { locale?: Locale }) {
  const copy = contactFormCopy[locale];
  const [state, setState] = useState<FormState>("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [form, setForm] = useState(initialForm);
  const trackedStart = useRef(false);

  function updateField(field: keyof typeof initialForm, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors([]);
    setStatusMessage("");

    if (!trackedStart.current && state === "idle") {
      trackedStart.current = true;
      trackEvent("contact_form_started");
    }
  }

  function validate() {
    const nextErrors: string[] = [];

    if (!form.firstName.trim()) nextErrors.push(copy.errors.firstName);
    if (!form.lastName.trim()) nextErrors.push(copy.errors.lastName);
    if (!form.location) nextErrors.push(copy.errors.location);
    if (!form.email.includes("@")) nextErrors.push(copy.errors.email);
    if (!form.phone.trim()) nextErrors.push(copy.errors.phone);
    if (form.message.trim().length < 10) nextErrors.push(copy.errors.message);

    setErrors(nextErrors);
    return nextErrors.length === 0;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validate()) return;

    setState("submitting");
    setStatusMessage("");

    const recaptchaToken = turnstileToken;

    const fullName = `${form.firstName.trim()} ${form.lastName.trim()}`.trim();
    const combinedMessage = [
      `Preferred location: ${form.location}`,
      `Pet name: ${form.petName || "Not provided"}`,
      `Preferred language: ${localeNames[locale]}`,
      `Automated translation may be used: ${locale === "en" ? "No" : "Yes"}`,
      "",
      form.message
    ].join("\n");

    const response = await fetch("/api/contact/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: fullName,
        email: form.email,
        phone: form.phone,
        location: form.location,
        message: combinedMessage,
        company: form.company,
        recaptchaToken
      })
    });

    if (response.ok) {
      trackEvent("contact_form_submitted");
      setState("success");
      setStatusMessage(copy.success);
      setForm(initialForm);
      trackedStart.current = false;
      return;
    }

    const error = (await response.json().catch(() => null)) as { error?: string } | null;
    setState("error");
    setStatusMessage(error?.error || copy.failure);
  }

  return (
    <form className="contact-form contact-message-form" onSubmit={handleSubmit}>
      <h3 className="contact-form-title">{copy.title}</h3>

      {errors.length > 0 && (
        <Alert tone="danger" role="alert">
          <AlertTitle>{copy.review}</AlertTitle>
          {errors.map((error) => <AlertDescription key={error}>{error}</AlertDescription>)}
        </Alert>
      )}

      <div className="contact-form-grid">
        <div className="contact-form-field">
          <Label htmlFor="contact-first-name">{copy.firstName}</Label>
          <Input id="contact-first-name" value={form.firstName} onChange={(event) => updateField("firstName", event.target.value)} autoComplete="given-name" placeholder="Jane" />
        </div>
        <div className="contact-form-field">
          <Label htmlFor="contact-last-name">{copy.lastName}</Label>
          <Input id="contact-last-name" value={form.lastName} onChange={(event) => updateField("lastName", event.target.value)} autoComplete="family-name" placeholder="Smith" />
        </div>
      </div>

      <div className="contact-form-grid">
        <div className="contact-form-field">
          <Label htmlFor="contact-email">{copy.email}</Label>
          <Input id="contact-email" value={form.email} onChange={(event) => updateField("email", event.target.value)} type="email" autoComplete="email" placeholder="jane@email.com" />
        </div>
        <div className="contact-form-field">
          <Label htmlFor="contact-phone">{copy.phone}</Label>
          <Input id="contact-phone" value={form.phone} onChange={(event) => updateField("phone", event.target.value)} type="tel" autoComplete="tel" placeholder="(859) 555-0100" />
        </div>
      </div>

      <div className="contact-form-field">
        <Label htmlFor="contact-pet-name">{copy.petName}</Label>
        <Input id="contact-pet-name" value={form.petName} onChange={(event) => updateField("petName", event.target.value)} placeholder="Biscuit" />
      </div>

      <div className="contact-form-field">
        <Label htmlFor="contact-location">{copy.preferredLocation}</Label>
        <ContactSelect
          id="contact-location"
          value={form.location}
          options={locationOptions.map((option) => option === "Not sure" ? copy.notSure : option)}
          placeholder={copy.selectClinic}
          onChange={(value) => updateField("location", value)}
        />
      </div>

      <div className="contact-form-field">
        <Label htmlFor="contact-message">{copy.howCanWeHelp}</Label>
        <Textarea id="contact-message" value={form.message} onChange={(event) => updateField("message", event.target.value)} rows={7} placeholder={copy.messagePlaceholder} />
      </div>

      <label className="hp-field" aria-hidden="true">
        Leave this field blank
        <Input value={form.company} onChange={(event) => updateField("company", event.target.value)} tabIndex={-1} autoComplete="off" />
      </label>

      <TurnstileField onToken={setTurnstileToken} />

      <p className="contact-form-note">{copy.emergencyNote}</p>

      <div className="form-actions">
        <ShadButton type="submit" disabled={state === "submitting"}>
          {state === "submitting" ? copy.sending : copy.sendMessage}
        </ShadButton>
      </div>

      {statusMessage && (
        <Alert tone={state === "success" ? "success" : state === "error" ? "danger" : "default"} role={state === "error" ? "alert" : "status"}>
          <AlertTitle>{state === "success" ? copy.sentTitle : state === "error" ? copy.notSentTitle : copy.updateTitle}</AlertTitle>
          <AlertDescription>{statusMessage}</AlertDescription>
        </Alert>
      )}
    </form>
  );
}

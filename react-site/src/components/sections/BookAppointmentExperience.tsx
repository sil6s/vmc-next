"use client";

import * as React from "react";
import { useCallback, useEffect, useMemo, useRef, useState, useTransition } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarCheck,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock,
  ExternalLink,
  FileText,
  Hash,
  Home,
  Mail,
  MapPin,
  MessageCircle,
  PawPrint,
  PenLine,
  Phone,
  Plus,
  ShieldCheck,
  Sun,
  Sunrise,
  Upload,
  UserRound,
  X
} from "lucide-react";
import type { Value as E164Number } from "react-phone-number-input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ShadButton } from "@/components/ui/Button";
import { TurnstileField } from "@/components/forms/TurnstileField";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { site } from "@/data/site";
import { onlineHelpPath } from "@/lib/online-help";
import {
  genderOptions,
  indoorOutdoorOptions,
  locationOptions,
  maxRecordFileSize,
  newPatientDefaults,
  speciesOptions,
  visitReasons,
  type NewPatientRequest
} from "@/lib/new-patient/schema";
import type { PublicLocation } from "@/lib/settings/public";
import { localeNames, localizedHref, type Locale } from "@/lib/i18n";
import { CommunicationSupportNotice } from "@/components/layout/CommunicationSupportNotice";
import { AppointmentFormTranslator } from "@/components/sections/AppointmentFormTranslator";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type BookData = NewPatientRequest;

// ---------------------------------------------------------------------------
// Geoapify address autocomplete
// ---------------------------------------------------------------------------

const GEOAPIFY_KEY = "f7a83deb90f74a7cbaa08aa0787ff5eb";

type GeoFeature = {
  properties: {
    formatted: string;
    address_line1: string;
    city: string;
    state_code: string;
    postcode: string;
  };
};

function GeoAutocomplete({
  value,
  onChange,
  onSelect
}: {
  value: string;
  onChange: (v: string) => void;
  onSelect: (street: string, city: string, state: string, zip: string) => void;
}) {
  const [suggestions, setSuggestions] = useState<GeoFeature[]>([]);
  const [open, setOpen] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  const fetch_ = (text: string) => {
    if (text.length < 3) { setSuggestions([]); setOpen(false); return; }
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      try {
        const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(text)}&filter=countrycode:us&bias=proximity:-84.45,39.10&limit=6&apiKey=${GEOAPIFY_KEY}`;
        const res = await window.fetch(url);
        const data = await res.json();
        setSuggestions((data.features || []).slice(0, 6) as GeoFeature[]);
        setOpen(true);
      } catch { /* silently fall back to manual entry */ }
    }, 280);
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="book-geo-wrap" ref={wrapRef}>
      <Input
        value={value}
        autoComplete="off"
        placeholder="Start typing your street address…"
        onChange={(e) => { onChange(e.target.value); fetch_(e.target.value); }}
        onFocus={() => { if (suggestions.length) setOpen(true); }}
      />
      {open && suggestions.length > 0 && (
        <ul className="book-geo-dropdown" role="listbox" aria-label="Address suggestions">
          {suggestions.map((s, i) => (
            <li
              key={i}
              className="book-geo-item"
              role="option"
              aria-selected={false}
              onMouseDown={(e) => {
                e.preventDefault();
                const p = s.properties;
                onSelect(p.address_line1 || "", p.city || "", p.state_code || "", p.postcode || "");
                onChange(p.address_line1 || "");
                setOpen(false);
                setSuggestions([]);
              }}
            >
              <MapPin aria-hidden="true" size={13} />
              <span>{s.properties.formatted}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
type FlowMode = "choose" | "new" | "existing";

const appointmentCopy: Record<Locale, {
  eyebrow: string;
  title: string;
  intro: string;
  sameDayTitle: string;
  sameDayBody: string;
  call: string;
  question: string;
  selectOption: string;
  pathLabel: string;
  newPatient: string;
  newPatientBody: string;
  newPatientDetail: string;
  existingPatient: string;
  existingPatientBody: string;
  existingPatientDetail: string;
  continue: string;
  continueHelp: string;
  existingEyebrow: string;
  existingTitle: string;
  existingIntro: string;
  patientPortal: string;
  portalBody: string;
  callLocationBody: string;
  liveChat: string;
  liveChatBody: string;
  availableNow: string;
  unavailable: string;
  contactForm: string;
  contactFormBody: string;
  onlinePharmacy: string;
  pharmacyBody: string;
  backToOptions: string;
}> = {
  en: {
    eyebrow: "Book appointment", title: "Choose the right appointment path.", intro: "New here? Start with registration. Already a client? Skip the new-patient steps.",
    sameDayTitle: "Need same-day help?", sameDayBody: "Call the clinic directly for urgent pet health concerns or time-sensitive appointment needs.", call: "Call",
    question: "Are you new to Veterinary Medical Centers?", selectOption: "Select one option to continue.", pathLabel: "Choose appointment path",
    newPatient: "New patient", newPatientBody: "Register your pet and request your first visit with our team.", newPatientDetail: "Best for first visits, new pets, and families who have not been seen at Veterinary Medical Centers before.",
    existingPatient: "Existing patient", existingPatientBody: "Use the portal, call a clinic, or send a non-urgent message.", existingPatientDetail: "Best for current clients scheduling follow-ups, refills, records, or routine care.",
    continue: "Continue", continueHelp: "We’ll guide you to the correct next step based on your selection.", existingEyebrow: "Existing clients",
    existingTitle: "Choose the best way to reach us.", existingIntro: "Your pet is already established with our team. Pick the option that matches what you need today.",
    patientPortal: "Book appointment online", portalBody: "Direct online booking plus account access, records, and routine client tools.", callLocationBody: "Best for same-day needs, urgent questions, or scheduling help.",
    liveChat: "Live chat", liveChatBody: "Best for quick general questions during business hours.", availableNow: "Available now", unavailable: "Currently unavailable",
    contactForm: "Contact form", contactFormBody: "Best for non-urgent questions, follow-ups, billing, records, or refill questions.", onlinePharmacy: "Online pharmacy",
    pharmacyBody: "Best for eligible refills, preventives, and trusted pet medications.", backToOptions: "Back to options"
  },
  es: {
    eyebrow: "Reservar cita", title: "Elija la opción de cita adecuada.", intro: "¿Es nuevo? Comience con el registro. ¿Ya es cliente? Omita los pasos para nuevos pacientes.",
    sameDayTitle: "¿Necesita ayuda el mismo día?", sameDayBody: "Llame directamente a la clínica para inquietudes urgentes o necesidades de cita sensibles al tiempo.", call: "Llamar",
    question: "¿Es nuevo en Veterinary Medical Centers?", selectOption: "Seleccione una opción para continuar.", pathLabel: "Elegir opción de cita",
    newPatient: "Nuevo paciente", newPatientBody: "Registre a su mascota y solicite su primera visita.", newPatientDetail: "Ideal para primeras visitas, nuevas mascotas y familias que aún no han sido atendidas aquí.",
    existingPatient: "Paciente existente", existingPatientBody: "Use el portal, llame a una clínica o envíe un mensaje no urgente.", existingPatientDetail: "Ideal para seguimientos, resurtidos, registros o atención de rutina.",
    continue: "Continuar", continueHelp: "Le guiaremos al siguiente paso correcto según su selección.", existingEyebrow: "Clientes existentes",
    existingTitle: "Elija la mejor manera de comunicarse con nosotros.", existingIntro: "Su mascota ya está establecida con nuestro equipo. Elija la opción que coincida con lo que necesita hoy.",
    patientPortal: "Portal del paciente", portalBody: "Ideal para reservas en línea, acceso a la cuenta, registros y herramientas de rutina.", callLocationBody: "Ideal para necesidades del mismo día, preguntas urgentes o ayuda con la programación.",
    liveChat: "Chat en vivo", liveChatBody: "Ideal para preguntas generales rápidas durante el horario de atención.", availableNow: "Disponible ahora", unavailable: "No disponible actualmente",
    contactForm: "Formulario de contacto", contactFormBody: "Ideal para preguntas no urgentes, seguimientos, facturación, registros o resurtidos.", onlinePharmacy: "Farmacia en línea",
    pharmacyBody: "Ideal para resurtidos elegibles, preventivos y medicamentos confiables.", backToOptions: "Volver a las opciones"
  },
  fr: {
    eyebrow: "Prendre rendez-vous", title: "Choisissez le bon parcours de rendez-vous.", intro: "Vous êtes nouveau ? Commencez par l’inscription. Déjà client ? Ignorez les étapes pour nouveaux patients.",
    sameDayTitle: "Besoin d’aide le jour même ?", sameDayBody: "Appelez directement la clinique pour les problèmes urgents ou les besoins de rendez-vous sensibles au temps.", call: "Appeler",
    question: "Êtes-vous nouveau chez Veterinary Medical Centers ?", selectOption: "Sélectionnez une option pour continuer.", pathLabel: "Choisir le parcours de rendez-vous",
    newPatient: "Nouveau patient", newPatientBody: "Inscrivez votre animal et demandez sa première visite.", newPatientDetail: "Idéal pour les premières visites, les nouveaux animaux et les familles qui n’ont pas encore été reçues.",
    existingPatient: "Patient existant", existingPatientBody: "Utilisez le portail, appelez une clinique ou envoyez un message non urgent.", existingPatientDetail: "Idéal pour les suivis, renouvellements, dossiers ou soins courants.",
    continue: "Continuer", continueHelp: "Nous vous guiderons vers la bonne prochaine étape selon votre sélection.", existingEyebrow: "Clients existants",
    existingTitle: "Choisissez la meilleure façon de nous joindre.", existingIntro: "Votre animal est déjà suivi par notre équipe. Choisissez l’option correspondant à votre besoin.",
    patientPortal: "Portail patient", portalBody: "Idéal pour la réservation en ligne, l’accès au compte, les dossiers et les outils courants.", callLocationBody: "Idéal pour les besoins du jour même, les questions urgentes ou l’aide à la planification.",
    liveChat: "Chat en direct", liveChatBody: "Idéal pour les questions générales rapides pendant les heures d’ouverture.", availableNow: "Disponible maintenant", unavailable: "Actuellement indisponible",
    contactForm: "Formulaire de contact", contactFormBody: "Idéal pour les questions non urgentes, suivis, facturation, dossiers ou renouvellements.", onlinePharmacy: "Pharmacie en ligne",
    pharmacyBody: "Idéal pour les renouvellements admissibles, les préventifs et les médicaments de confiance.", backToOptions: "Retour aux options"
  },
  hi: {
    eyebrow: "अपॉइंटमेंट बुक करें", title: "सही अपॉइंटमेंट विकल्प चुनें।", intro: "क्या आप नए हैं? पंजीकरण से शुरू करें। पहले से ग्राहक हैं? नए मरीज़ वाले चरण छोड़ें।",
    sameDayTitle: "क्या उसी दिन सहायता चाहिए?", sameDayBody: "तत्काल स्वास्थ्य चिंता या समय-संवेदनशील अपॉइंटमेंट के लिए क्लिनिक को सीधे कॉल करें।", call: "कॉल करें",
    question: "क्या आप Veterinary Medical Centers में नए हैं?", selectOption: "जारी रखने के लिए एक विकल्प चुनें।", pathLabel: "अपॉइंटमेंट विकल्प चुनें",
    newPatient: "नया मरीज़", newPatientBody: "अपने पालतू पशु का पंजीकरण करें और पहली मुलाकात का अनुरोध करें।", newPatientDetail: "पहली मुलाकात, नए पालतू पशु और पहली बार आने वाले परिवारों के लिए।",
    existingPatient: "मौजूदा मरीज़", existingPatientBody: "पोर्टल का उपयोग करें, क्लिनिक को कॉल करें या गैर-तत्काल संदेश भेजें।", existingPatientDetail: "फॉलो-अप, रिफिल, रिकॉर्ड या नियमित देखभाल के लिए।",
    continue: "जारी रखें", continueHelp: "आपके चयन के आधार पर हम आपको सही अगले कदम तक ले जाएँगे।", existingEyebrow: "मौजूदा ग्राहक",
    existingTitle: "हमसे संपर्क करने का सबसे अच्छा तरीका चुनें।", existingIntro: "आपका पालतू पशु हमारी टीम के साथ पहले से पंजीकृत है। आज की आवश्यकता के अनुसार विकल्प चुनें।",
    patientPortal: "मरीज़ पोर्टल", portalBody: "ऑनलाइन बुकिंग, खाता, रिकॉर्ड और नियमित टूल के लिए।", callLocationBody: "उसी दिन की ज़रूरत, तत्काल प्रश्न या शेड्यूलिंग सहायता के लिए।",
    liveChat: "लाइव चैट", liveChatBody: "कार्य समय के दौरान सामान्य प्रश्नों के लिए।", availableNow: "अभी उपलब्ध", unavailable: "अभी उपलब्ध नहीं",
    contactForm: "संपर्क फ़ॉर्म", contactFormBody: "गैर-तत्काल प्रश्न, फॉलो-अप, बिलिंग, रिकॉर्ड या रिफिल के लिए।", onlinePharmacy: "ऑनलाइन फ़ार्मेसी",
    pharmacyBody: "योग्य रिफिल, निवारक उत्पाद और भरोसेमंद दवाओं के लिए।", backToOptions: "विकल्पों पर वापस जाएँ"
  },
  zh: {
    eyebrow: "预约", title: "选择合适的预约方式。", intro: "第一次来？请先注册。已经是客户？可以跳过新患者步骤。",
    sameDayTitle: "需要当天帮助吗？", sameDayBody: "如有紧急宠物健康问题或时间紧迫的预约需求，请直接致电诊所。", call: "致电",
    question: "您是 Veterinary Medical Centers 的新客户吗？", selectOption: "请选择一个选项继续。", pathLabel: "选择预约方式",
    newPatient: "新患者", newPatientBody: "为宠物注册并申请第一次就诊。", newPatientDetail: "适合首次就诊、新宠物以及以前未在本诊所就诊的家庭。",
    existingPatient: "现有患者", existingPatientBody: "使用患者门户、致电诊所或发送非紧急消息。", existingPatientDetail: "适合复诊、续药、病历或常规护理。",
    continue: "继续", continueHelp: "我们会根据您的选择引导您完成正确的下一步。", existingEyebrow: "现有客户",
    existingTitle: "选择最适合的联系方式。", existingIntro: "您的宠物已在我们的团队建档。请选择符合您今天需求的选项。",
    patientPortal: "患者门户", portalBody: "适合在线预约、账户访问、病历和常规客户工具。", callLocationBody: "适合当天需求、紧急问题或预约帮助。",
    liveChat: "在线聊天", liveChatBody: "适合营业时间内的快速一般问题。", availableNow: "现在可用", unavailable: "目前不可用",
    contactForm: "联系表格", contactFormBody: "适合非紧急问题、复诊、账单、病历或续药问题。", onlinePharmacy: "网上药房",
    pharmacyBody: "适合符合条件的续药、预防用品和可信赖的宠物药物。", backToOptions: "返回选项"
  }
};

type PetEntry = {
  id: string;
  petName: string;
  ageOrDateOfBirth: string;
  species: "Dog" | "Cat" | "Other";
  gender: "Male" | "Neutered Male" | "Female" | "Spayed Female";
  breed: string;
  colorMarkings: string;
  indoorOutdoor: "Indoor" | "Outdoor" | "Both";
  microchipNumber: string;
  vaccinationHistory: string;
};

// Steps for the new-patient flow
const STEP_LABELS = ["Visit preferences", "Owner information", "Pet information", "Authorization", "Review & submit"];
const STEP_COUNT = STEP_LABELS.length;

// Timing chips — label maps to schema value
const TIMING_CHIPS = [
  { label: "As soon as possible", sub: "Earliest opening", value: "As soon as available" },
  { label: "This week", sub: "Within 7 days", value: "This week" },
  { label: "1–2 weeks", sub: "Next available slot", value: "Next week" },
  { label: "Pick a date", sub: "I have a date in mind", value: "Specific date preferred" }
] as const;

// Time-of-day cards
const TIME_CARDS = [
  { label: "Morning", sub: "8 am – 12 pm", value: "Morning", Icon: Sunrise },
  { label: "Afternoon", sub: "12 pm – 5 pm", value: "Afternoon", Icon: Sun },
  { label: "No preference", sub: "Any time works", value: "No preference", Icon: Clock }
] as const;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatZip(value: string) {
  return value.replace(/[^\d-]/g, "").slice(0, 10);
}

function newPet(): PetEntry {
  return {
    id: Math.random().toString(36).slice(2),
    petName: "",
    ageOrDateOfBirth: "",
    species: "Dog",
    gender: "Male",
    breed: "",
    colorMarkings: "",
    indoorOutdoor: "Indoor",
    microchipNumber: "",
    vaccinationHistory: ""
  };
}

function easternBusinessHours() {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    weekday: "short",
    hour: "numeric",
    hourCycle: "h23"
  });
  const parts = formatter.formatToParts(new Date());
  const weekday = parts.find((p) => p.type === "weekday")?.value || "";
  const hour = Number(parts.find((p) => p.type === "hour")?.value || "0");
  return ["Mon", "Tue", "Wed", "Thu", "Fri"].includes(weekday) && hour >= 8 && hour < 18;
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function SelectControl({
  value,
  options,
  placeholder,
  onChange
}: {
  value: string;
  options: readonly string[];
  placeholder?: string;
  onChange: (value: string) => void;
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder || "Choose an option"} />
      </SelectTrigger>
      <SelectContent>
        {options.map((opt) => (
          <SelectItem key={opt} value={opt}>{opt}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

function FieldWrap({
  label,
  icon,
  required,
  error,
  helper,
  children,
  className = ""
}: {
  label: string;
  icon?: React.ReactNode;
  required?: boolean;
  error?: string;
  helper?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`book-field-wrap ${className}`}>
      <span className="book-field-label">
        {icon && <span className="book-field-icon" aria-hidden="true">{icon}</span>}
        {label}
        {required && <em className="book-required" aria-label="required">*</em>}
      </span>
      {children}
      {helper && !error && <span className="book-helper">{helper}</span>}
      {error && <span className="book-error" role="alert">{error}</span>}
    </label>
  );
}

// ---------------------------------------------------------------------------
// Signature pad (draw + type), using JPEG output
// ---------------------------------------------------------------------------

function SignaturePad({
  value,
  onChange,
  error
}: {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [sigMode, setSigMode] = useState<"draw" | "type">("draw");
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(value.startsWith("data:image"));
  const [typed, setTyped] = useState(value.startsWith("typed:") ? value.replace(/^typed:/, "") : "");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const ratio = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * ratio;
    canvas.height = rect.height * ratio;
    ctx.scale(ratio, ratio);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = 2.4;
    ctx.strokeStyle = "#211b1a";
  }, [sigMode]);

  const getPoint = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const ctx = event.currentTarget.getContext("2d");
    if (!ctx) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    const pt = getPoint(event);
    ctx.beginPath();
    ctx.moveTo(pt.x, pt.y);
    setIsDrawing(true);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const ctx = event.currentTarget.getContext("2d");
    if (!ctx) return;
    const pt = getPoint(event);
    ctx.lineTo(pt.x, pt.y);
    ctx.stroke();
    setHasDrawn(true);
  };

  const handlePointerUp = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (canvas) {
      setHasDrawn(true);
      // JPEG output (not PNG) so it embeds cleanly in the PDF
      onChange(canvas.toDataURL("image/jpeg", 0.92));
    }
  };

  const clear = () => {
    if (hasDrawn && !window.confirm("Clear this signature?")) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (canvas && ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
    setTyped("");
    onChange("");
  };

  return (
    <div className="book-sig-card">
      <div className="book-sig-tabs" role="tablist" aria-label="Signature method">
        <button
          className={sigMode === "draw" ? "is-active" : undefined}
          type="button"
          onClick={() => setSigMode("draw")}
        >
          Draw signature
        </button>
        <button
          className={sigMode === "type" ? "is-active" : undefined}
          type="button"
          onClick={() => setSigMode("type")}
        >
          Type signature
        </button>
      </div>

      {sigMode === "draw" ? (
        <div className="book-sig-draw">
          <canvas
            aria-label="Draw your signature"
            className="book-sig-canvas"
            ref={canvasRef}
            style={{ touchAction: "none" }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
          />
          {!hasDrawn && <span className="book-sig-placeholder">Sign here</span>}
        </div>
      ) : (
        <div className="book-sig-type">
          <FieldWrap label="Type your full legal name" required error={error}>
            <Input
              value={typed}
              onChange={(event) => {
                setTyped(event.target.value);
                onChange(event.target.value.trim() ? `typed:${event.target.value}` : "");
              }}
            />
          </FieldWrap>
          <div className="book-sig-preview">{typed || "Signature preview"}</div>
        </div>
      )}

      <div className="book-sig-footer">
        <p>Use your mouse, finger, trackpad, or keyboard to sign.</p>
        <ShadButton variant="ghost" type="button" onClick={clear}>Clear</ShadButton>
      </div>
      {error && sigMode === "draw" && <span className="book-error" role="alert" style={{ padding: "0 14px 10px" }}>{error}</span>}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Pet card
// ---------------------------------------------------------------------------

function PetCard({
  pet,
  index,
  errors,
  onChange,
  onRemove
}: {
  pet: PetEntry;
  index: number;
  errors: Record<string, string>;
  onChange: (id: string, key: keyof PetEntry, value: string) => void;
  onRemove?: () => void;
}) {
  const p = (key: string) => `pet_${pet.id}_${key}`;
  return (
    <div className="book-pet-card">
      <div className="book-pet-card-head">
        <PawPrint aria-hidden="true" size={18} />
        <strong>Pet {index + 1}{pet.petName ? `: ${pet.petName}` : ""}</strong>
        {onRemove && (
          <ShadButton variant="ghost" size="icon" type="button" onClick={onRemove} aria-label="Remove this pet">
            <X size={16} />
          </ShadButton>
        )}
      </div>

      <div className="book-2col">
        <FieldWrap label="Pet name" required error={errors[p("petName")]}>
          <Input
            value={pet.petName}
            onChange={(e) => onChange(pet.id, "petName", e.target.value)}
          />
        </FieldWrap>
        <FieldWrap label="Age or date of birth" required error={errors[p("ageOrDateOfBirth")]}>
          <Input
            value={pet.ageOrDateOfBirth}
            onChange={(e) => onChange(pet.id, "ageOrDateOfBirth", e.target.value)}
          />
        </FieldWrap>
      </div>

      <FieldWrap label="Species" required error={errors[p("species")]}>
        <div className="book-species-row">
          {(speciesOptions as readonly string[]).map((s) => (
            <button
              key={s}
              type="button"
              className={`book-species-btn${pet.species === s ? " is-active" : ""}`}
              onClick={() => onChange(pet.id, "species", s)}
            >
              <PawPrint aria-hidden="true" size={14} /> {s}
            </button>
          ))}
        </div>
      </FieldWrap>

      <div className="book-2col">
        <FieldWrap label="Gender" required error={errors[p("gender")]}>
          <SelectControl
            value={pet.gender}
            options={genderOptions}
            onChange={(v) => onChange(pet.id, "gender", v)}
          />
        </FieldWrap>
        <FieldWrap label="Breed" required error={errors[p("breed")]}>
          <Input
            value={pet.breed}
            onChange={(e) => onChange(pet.id, "breed", e.target.value)}
          />
        </FieldWrap>
        <FieldWrap label="Color / markings" required error={errors[p("colorMarkings")]}>
          <Input
            value={pet.colorMarkings}
            onChange={(e) => onChange(pet.id, "colorMarkings", e.target.value)}
          />
        </FieldWrap>
        <FieldWrap label="Indoor or outdoor?" required error={errors[p("indoorOutdoor")]}>
          <SelectControl
            value={pet.indoorOutdoor}
            options={indoorOutdoorOptions}
            onChange={(v) => onChange(pet.id, "indoorOutdoor", v)}
          />
        </FieldWrap>
        <FieldWrap label="Microchip number" helper="Optional">
          <Input
            value={pet.microchipNumber}
            onChange={(e) => onChange(pet.id, "microchipNumber", e.target.value)}
          />
        </FieldWrap>
      </div>

      <FieldWrap label="Vaccination history" helper="Optional — you can reply to your confirmation email with records later" error={errors[p("vaccinationHistory")]}>
        <Textarea
          value={pet.vaccinationHistory}
          onChange={(e) => onChange(pet.id, "vaccinationHistory", e.target.value)}
          placeholder="List vaccines and approximate dates, or upload records below."
          rows={3}
        />
      </FieldWrap>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Review section
// ---------------------------------------------------------------------------

function ReviewSection({
  title,
  icon,
  onEdit,
  children
}: {
  title: string;
  icon: React.ReactNode;
  onEdit: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="book-review-section">
      <h3>{icon} {title}</h3>
      <button type="button" onClick={onEdit}>Edit</button>
      <div className="book-review-dl">{children}</div>
    </div>
  );
}

function ReviewRow({ label, value }: { label: string; value: string | undefined | null }) {
  return (
    <div>
      <dt>{label}</dt>
      <dd>{value || "Not provided"}</dd>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Authorization step (with scroll-gate)
// ---------------------------------------------------------------------------

function AuthStep({
  data,
  legalName,
  errors,
  onUpdate,
  onLegalName
}: {
  data: BookData;
  legalName: string;
  errors: Record<string, string>;
  onUpdate: (key: keyof BookData, value: string | boolean) => void;
  onLegalName: (v: string) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [hasScrolled, setHasScrolled] = useState(false);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 16) setHasScrolled(true);
  };

  return (
    <>
      <div className="book-section-card">
        <div className="book-section-head">
          <ShieldCheck aria-hidden="true" size={20} />
          <div>
            <h2>Financial &amp; Treatment Authorization</h2>
            <p>Please read the full authorization before signing.</p>
          </div>
        </div>

        <div className="book-auth-scroll-wrap">
          <div
            className="book-auth-text"
            ref={scrollRef}
            onScroll={handleScroll}
            tabIndex={0}
            aria-label="Authorization text — scroll to read"
          >
            <h3>Financial &amp; Treatment Authorization</h3>
            <p>I, the undersigned owner or authorized agent of the above admitted patient, hereby authorize the doctors of Veterinary Medical Centers of Independence / Ft Thomas to administer such treatment as is necessary and to perform procedures therapeutically and/or diagnostically.</p>
            <p>I further understand that no guarantee of successful treatment is made. I also assume financial responsibility for all charges incurred, and agree to pay all such charges at the time of release.</p>
            <p>I understand that unpaid balances over 30 days are subject to a monthly 1.5% finance charge.</p>
            <p><strong>Payment is expected at the time services are rendered.</strong></p>
            <p>By signing below, I acknowledge that I have read, understand, and agree to the terms stated above, and that I am the legal owner or authorized agent for the pet(s) listed in this request.</p>
          </div>
          {!hasScrolled && (
            <div className="book-auth-scroll-hint" aria-hidden="true">
              <ChevronRight size={14} style={{ transform: "rotate(90deg)" }} /> Scroll to read full authorization
            </div>
          )}
        </div>

        <label className={`book-consent-row${!hasScrolled ? " book-consent-disabled" : ""}`}>
          <Checkbox
            checked={data.authorizationConsent as boolean}
            disabled={!hasScrolled}
            onCheckedChange={(checked) => onUpdate("authorizationConsent", checked === true)}
          />
          <span>
            I have read and agree to the Financial &amp; Treatment Authorization.
            <em className="book-required" aria-label="required">*</em>
            {!hasScrolled && <small className="book-scroll-gate-note">Scroll through the authorization above to enable this checkbox.</small>}
          </span>
        </label>
        {errors.authorizationConsent && (
          <span className="book-error" role="alert">{errors.authorizationConsent}</span>
        )}
      </div>

      <div className="book-section-card">
        <div className="book-section-head">
          <PenLine aria-hidden="true" size={20} />
          <div>
            <h2>Digital signature</h2>
            <p>Enter your full legal name and draw or type your signature below.</p>
          </div>
        </div>

        <FieldWrap label="Full legal name" icon={<UserRound size={13} />} required error={errors.legalName}>
          <Input
            value={legalName}
            onChange={(e) => onLegalName(e.target.value)}
            placeholder="As it appears on your ID"
            autoComplete="name"
          />
        </FieldWrap>

        <SignaturePad
          value={data.digitalSignature}
          onChange={(v) => onUpdate("digitalSignature", v)}
          error={errors.digitalSignature}
        />

        <FieldWrap label="Date signed" icon={<CalendarDays size={13} />} required error={errors.dateSigned}>
          <Input
            type="date"
            value={data.dateSigned}
            readOnly
            onChange={(e) => onUpdate("dateSigned", e.target.value)}
          />
        </FieldWrap>
      </div>
    </>
  );
}

// ---------------------------------------------------------------------------
// Existing-patient panel
// ---------------------------------------------------------------------------

function ExistingPanel({
  portalUrl,
  pharmacyUrl,
  liveChatEnabled,
  publicLocations,
  onBack,
  locale
}: {
  portalUrl: string;
  pharmacyUrl: string;
  liveChatEnabled: boolean;
  publicLocations: PublicLocation[];
  onBack: () => void;
  locale: Locale;
}) {
  const copy = appointmentCopy[locale];
  const isChatAvailable = liveChatEnabled && easternBusinessHours();
  const openChat = () => window.dispatchEvent(new Event("vmc:open-chat-support"));
  const fortThomas = publicLocations.find((loc) => loc.id === "fort-thomas") || publicLocations[0];
  const independence = publicLocations.find((loc) => loc.id === "independence") || publicLocations[1];

  return (
    <div className="book-existing-screen">
      <div className="book-existing-copy">
        <p className="eyebrow">{copy.existingEyebrow}</p>
        <h1>{copy.existingTitle}</h1>
        <p>{copy.existingIntro}</p>
      </div>
      <div className="book-existing-grid">
        <a className="book-existing-card is-featured" href={localizedHref(onlineHelpPath("fort-thomas", "direct-booking"), locale)}>
          <FileText aria-hidden="true" />
          <span>
            <strong>{copy.patientPortal}</strong>
            <small>{copy.portalBody}</small>
          </span>
          <ExternalLink aria-hidden="true" size={15} />
        </a>
        {fortThomas && (
          <a className="book-existing-card" href={`tel:${fortThomas.tel}`}>
            <Phone aria-hidden="true" />
            <span>
              <strong>{copy.call} Fort Thomas</strong>
              <small>{copy.callLocationBody}</small>
              <em>{fortThomas.phone}</em>
            </span>
          </a>
        )}
        {independence && (
          <a className="book-existing-card" href={`tel:${independence.tel}`}>
            <Phone aria-hidden="true" />
            <span>
              <strong>{copy.call} Independence</strong>
              <small>{copy.callLocationBody}</small>
              <em>{independence.phone}</em>
            </span>
          </a>
        )}
        {isChatAvailable && (
          <button className="book-existing-card" type="button" onClick={openChat}>
            <MessageCircle aria-hidden="true" />
            <span>
              <strong>{copy.liveChat}</strong>
              <small>{copy.liveChatBody}</small>
              <em>{copy.availableNow}</em>
            </span>
          </button>
        )}
        {liveChatEnabled && !isChatAvailable && (
          <span className="book-existing-card book-disabled-option">
            <MessageCircle aria-hidden="true" />
            <span>
              <strong>{copy.liveChat}</strong>
              <small>{copy.liveChatBody}</small>
              <em>{copy.unavailable}</em>
            </span>
          </span>
        )}
        <a className="book-existing-card" href={localizedHref(onlineHelpPath("fort-thomas", "general"), locale)}>
          <FileText aria-hidden="true" />
          <span>
            <strong>Message through Otto</strong>
            <small>{copy.contactFormBody}</small>
          </span>
        </a>
        <a className="book-existing-card" href={pharmacyUrl} target={pharmacyUrl.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
          <FileText aria-hidden="true" />
          <span>
            <strong>{copy.onlinePharmacy}</strong>
            <small>{copy.pharmacyBody}</small>
          </span>
          <ExternalLink aria-hidden="true" size={15} />
        </a>
      </div>
      <ShadButton className="book-existing-back" variant="secondary" type="button" onClick={onBack}>
        <ArrowLeft aria-hidden="true" size={16} /> {copy.backToOptions}
      </ShadButton>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export function BookAppointmentExperience({
  portalUrl,
  pharmacyUrl,
  liveChatEnabled,
  locations,
  initialMode = "choose",
  locale = "en"
}: {
  portalUrl: string;
  pharmacyUrl: string;
  liveChatEnabled: boolean;
  locations: PublicLocation[];
  initialMode?: FlowMode;
  locale?: Locale;
}) {
  const copy = appointmentCopy[locale];
  // When initialMode is "new" or "existing", skip the choice screen
  const [mode, setMode] = useState<FlowMode>(initialMode);
  const [choiceSelection, setChoiceSelection] = useState<"new" | "existing" | null>(null);
  // step 0 = Visit preferences, step 1 = Owner info, step 2 = Pets, step 3 = Auth, step 4 = Review
  const [step, setStep] = useState(0);
  const [data, setData] = useState<BookData>({
    ...newPatientDefaults,
    dateSigned: new Date().toISOString().slice(0, 10)
  });
  const [pets, setPets] = useState<PetEntry[]>([newPet()]);
  const [legalName, setLegalName] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitMessage, setSubmitMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [isPending, startTransition] = useTransition();
  const bodyRef = useRef<HTMLDivElement>(null);

  const publicLocations = useMemo(
    () =>
      locations.length
        ? locations
        : site.locations.map((loc) => ({
            id: loc.id,
            name: loc.name,
            address: loc.address,
            street: loc.street,
            city: loc.city,
            state: loc.state,
            zip: loc.zip,
            phone: loc.phone,
            tel: loc.tel,
            hours: [...loc.hours],
            mapUrl: loc.mapUrl,
            mapEmbedUrl: loc.mapEmbedUrl,
            email: site.email,
            emergencyMessage: ""
          })),
    [locations]
  );

  const progress = Math.round(((step + 1) / STEP_COUNT) * 100);

  // -------- field update helpers --------

  const update = useCallback((key: keyof BookData, value: string | boolean) => {
    setData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
    setSubmitMessage("");
  }, []);

  const updateZip = (raw: string) => update("zipCode", formatZip(raw));

  const updatePet = (id: string, key: keyof PetEntry, value: string) => {
    setPets((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [key]: value } : p))
    );
    setErrors((prev) => ({ ...prev, [`pet_${id}_${key}`]: "" }));
  };

  const addPet = () => setPets((prev) => [...prev, newPet()]);
  const removePet = (id: string) => setPets((prev) => prev.filter((p) => p.id !== id));

  // -------- file handling --------

  const chooseFiles = (fileList: FileList | null) => {
    const incoming = Array.from(fileList || []);
    const valid = incoming.filter((f) => f.size <= maxRecordFileSize);
    setFiles(valid);
    setErrors((prev) => ({
      ...prev,
      records:
        valid.length !== incoming.length
          ? "One or more files was too large. Maximum size is 8 MB per file."
          : ""
    }));
  };

  // -------- validation --------

  const validate = (target = step): boolean => {
    const next: Record<string, string> = {};
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (target === 0) {
      if (!data.preferredLocation) next.preferredLocation = "Choose a location.";
      if (!data.reasonForVisit) next.reasonForVisit = "Choose a reason.";
      if (!data.preferredTiming) next.preferredTiming = "Choose a timing preference.";
      if (!data.preferredTimeOfDay) next.preferredTimeOfDay = "Choose a preferred time of day.";
      if (data.preferredTiming === "Specific date preferred" && !data.preferredDate)
        next.preferredDate = "Choose a preferred date.";
      if (!data.referralSource.trim() || data.referralSource.trim().length < 2)
        next.referralSource = "Please tell us how you heard about us.";
    }

    if (target === 1) {
      if (!data.ownerFirstName.trim()) next.ownerFirstName = "First name is required.";
      else if (data.ownerFirstName.trim().length < 2) next.ownerFirstName = "First name must be at least 2 characters.";

      if (!data.ownerLastName.trim()) next.ownerLastName = "Last name is required.";
      else if (data.ownerLastName.trim().length < 2) next.ownerLastName = "Last name must be at least 2 characters.";

      const phoneDigits = data.phone.replace(/\D/g, "");
      if (!data.phone.trim()) next.phone = "Phone number is required.";
      else if (phoneDigits.length < 10) next.phone = "Enter a valid 10-digit phone number.";

      if (!data.email.trim()) next.email = "Email address is required.";
      else if (!emailRe.test(data.email.trim())) next.email = "Enter a valid email address (e.g. you@example.com).";

      if (!confirmEmail.trim()) next.confirmEmail = "Please confirm your email address.";
      else if (confirmEmail.trim().toLowerCase() !== data.email.trim().toLowerCase())
        next.confirmEmail = "Email addresses do not match.";

      if (!data.streetAddress.trim()) next.streetAddress = "Street address is required.";
      if (!data.city.trim()) next.city = "City is required.";
      if (!data.state.trim()) next.state = "State is required.";
      else if (!/^[A-Za-z]{2}$/.test(data.state.trim())) next.state = "Enter a valid 2-letter state code.";
      if (!data.zipCode.trim()) next.zipCode = "ZIP code is required.";
      else if (!/^\d{5}(-\d{4})?$/.test(data.zipCode.trim())) next.zipCode = "Enter a valid 5-digit ZIP code.";
    }

    if (target === 2) {
      for (const pet of pets) {
        if (!pet.petName.trim()) next[`pet_${pet.id}_petName`] = "Pet name is required.";
        if (!pet.ageOrDateOfBirth.trim()) next[`pet_${pet.id}_ageOrDateOfBirth`] = "Age or date of birth is required.";
        if (!pet.breed.trim()) next[`pet_${pet.id}_breed`] = "Breed is required.";
        if (!pet.colorMarkings.trim()) next[`pet_${pet.id}_colorMarkings`] = "Color/markings are required.";
        // vaccinationHistory is optional — no validation
      }
    }

    if (target === 3) {
      if (!data.authorizationConsent) next.authorizationConsent = "Please scroll through and agree to the authorization before continuing.";
      if (!legalName.trim()) next.legalName = "Enter your full legal name as it appears on your ID.";
      else if (legalName.trim().split(" ").filter(Boolean).length < 2) next.legalName = "Please enter your first and last name.";
      if (!data.digitalSignature) next.digitalSignature = "Please draw or type your signature.";
      if (!data.dateSigned) next.dateSigned = "Date signed is required.";
    }

    if (target === 4) {
      if (!data.finalConfirmation) next.finalConfirmation = "Please confirm the information is accurate before submitting.";
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  // -------- navigation --------

  const scrollTop = () => {
    const behavior: ScrollBehavior =
      typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth";

    bodyRef.current?.scrollTo({ top: 0, behavior });

    if (typeof window !== "undefined" && window.matchMedia("(max-width: 700px)").matches) {
      window.requestAnimationFrame(() => {
        const flow = document.getElementById("appointment-flow");
        if (!flow) return;
        const top = flow.getBoundingClientRect().top + window.scrollY - 58;
        window.scrollTo({ top: Math.max(top, 0), behavior });
      });
    }
  };

  const goNext = () => {
    if (validate()) {
      setStep((s) => Math.min(s + 1, STEP_COUNT - 1));
      scrollTop();
    }
  };

  const goBack = () => {
    setStep((s) => Math.max(s - 1, 0));
    scrollTop();
  };

  const goToStep = (target: number) => {
    setStep(target);
    scrollTop();
  };

  // -------- submit --------

  const buildPayload = (): BookData => {
    const firstPet = pets[0];
    const additionalPets = pets.slice(1);

    let schedulingNotes = data.schedulingNotes.trim();
    if (locale !== "en") {
      const languageNote = `Preferred language: ${localeNames[locale]}. Automated translation may be used to review this request.`;
      schedulingNotes = schedulingNotes ? `${languageNote}\n\n${schedulingNotes}` : languageNote;
    }
    if (additionalPets.length > 0) {
      const petLines = additionalPets
        .map(
          (p) =>
            `• ${p.petName} (${p.species}, ${p.breed}, ${p.gender}${p.ageOrDateOfBirth ? `, ${p.ageOrDateOfBirth}` : ""})` +
            (p.vaccinationHistory ? ` – Vaccines: ${p.vaccinationHistory}` : "")
        )
        .join("\n");
      schedulingNotes = schedulingNotes
        ? `${schedulingNotes}\n\nAdditional pets:\n${petLines}`
        : `Additional pets:\n${petLines}`;
    }

    return {
      ...data,
      petName: firstPet.petName,
      ageOrDateOfBirth: firstPet.ageOrDateOfBirth,
      species: firstPet.species,
      gender: firstPet.gender,
      breed: firstPet.breed,
      colorMarkings: firstPet.colorMarkings,
      indoorOutdoor: firstPet.indoorOutdoor,
      microchipNumber: firstPet.microchipNumber,
      vaccinationHistory: firstPet.vaccinationHistory,
      schedulingNotes,
      digitalSignature: data.digitalSignature,
      authorizationConsent: true,
      finalConfirmation: true
    };
  };

  const submit = async () => {
    if (!validate(4)) return;

    startTransition(async () => {
      const payload = buildPayload();
      const formData = new FormData();
      formData.append("payload", JSON.stringify(payload));
      formData.append("company", "");
      formData.append("recaptchaToken", turnstileToken);
      files.forEach((f) => formData.append("records", f));
      const response = await fetch("/api/new-patient-request/", { method: "POST", body: formData });
      const result = (await response.json().catch(() => null)) as { error?: string } | null;
      if (!response.ok) {
        setSubmitMessage(result?.error || "Your request could not be submitted. Please call either clinic.");
        return;
      }
      setSubmitted(true);
    });
  };

  // -------- render: submitted --------

  if (submitted) {
    return (
      <section className="book-flow">
        <div className="book-success-screen">
          <CheckCircle2 aria-hidden="true" size={48} />
          <h1>Request received</h1>
          <p>
            Thank you. Your new patient request has been sent to Veterinary Medical Centers. Our team will
            review it and follow up to help schedule your first visit.
          </p>
          <div className="book-success-actions">
            {publicLocations.map((loc) => (
              <a className="btn btn-ghost" href={`tel:${loc.tel}`} key={loc.id}>
                Call {loc.name}
              </a>
            ))}
            <ShadButton
              type="button"
              onClick={() => {
                setMode("choose");
                setStep(0);
                setSubmitted(false);
              }}
            >
              Return to appointment options
            </ShadButton>
          </div>
        </div>
      </section>
    );
  }

  // -------- render: choice screen --------

  if (mode === "choose") {
    return (
      <section className="book-flow book-choice-flow" id="appointment-flow">
        <div className="book-choice-screen">
          <div className="book-choice-copy">
            <p className="eyebrow">{copy.eyebrow}</p>
            <h1>{copy.title}</h1>
            <p>{copy.intro}</p>
            <CommunicationSupportNotice locale={locale} />
            <Alert className="book-choice-alert" tone="warning">
              <Phone aria-hidden="true" size={18} />
              <div>
                <AlertTitle>{copy.sameDayTitle}</AlertTitle>
                <AlertDescription>{copy.sameDayBody}</AlertDescription>
                <div className="book-choice-phone-row">
                  {publicLocations.map((loc) => (
                    <a href={`tel:${loc.tel}`} key={loc.id}>
                      <Phone aria-hidden="true" size={15} />
                      {copy.call} {loc.name}
                    </a>
                  ))}
                </div>
              </div>
            </Alert>
          </div>

          <Card className="book-choice-panel">
            <CardHeader>
              <CardTitle>{copy.question}</CardTitle>
              <CardDescription>{copy.selectOption}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="book-choice-cards" role="radiogroup" aria-label={copy.pathLabel}>
                <button
                  type="button"
                  role="radio"
                  aria-checked={choiceSelection === "new"}
                  className={`book-choice-card${choiceSelection === "new" ? " is-active" : ""}`}
                  onClick={() => setChoiceSelection("new")}
                >
                  <PawPrint aria-hidden="true" size={24} />
                  <strong>{copy.newPatient}</strong>
                  <span>{copy.newPatientBody}</span>
                  <small>{copy.newPatientDetail}</small>
                  {choiceSelection === "new" && <Check aria-hidden="true" size={17} />}
                </button>
                <button
                  type="button"
                  role="radio"
                  aria-checked={choiceSelection === "existing"}
                  className={`book-choice-card${choiceSelection === "existing" ? " is-active" : ""}`}
                  onClick={() => setChoiceSelection("existing")}
                >
                  <UserRound aria-hidden="true" size={24} />
                  <strong>{copy.existingPatient}</strong>
                  <span>{copy.existingPatientBody}</span>
                  <small>{copy.existingPatientDetail}</small>
                  {choiceSelection === "existing" && <Check aria-hidden="true" size={17} />}
                </button>
              </div>
              <div className="book-choice-continue">
                <ShadButton
                  type="button"
                  disabled={!choiceSelection}
                  onClick={() => choiceSelection && setMode(choiceSelection)}
                >
                  {copy.continue} <ArrowRight aria-hidden="true" size={16} />
                </ShadButton>
                <p>{copy.continueHelp}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  // -------- render: existing --------

  if (mode === "existing") {
    return (
      <section className="book-flow" id="appointment-flow">
        <ExistingPanel
          portalUrl={portalUrl}
          pharmacyUrl={pharmacyUrl}
          liveChatEnabled={liveChatEnabled}
          publicLocations={publicLocations}
          onBack={() => setMode("choose")}
          locale={locale}
        />
      </section>
    );
  }

  // -------- render: new patient form --------

  const hasErrors = Object.values(errors).some(Boolean);

  return (
    <section className="book-flow" id="appointment-flow">
      <AppointmentFormTranslator locale={locale} />
      {locale !== "en" && (
        <CommunicationSupportNotice locale={locale} className="book-language-form-note" appointmentForm />
      )}
      <div className="book-form-shell">
        {/* Sticky header */}
        <div className="book-form-header">
          <div className="book-form-header-inner">
            <div className="book-form-header-top">
              <span className="book-form-eyebrow">New patient · Step {step + 1} of {STEP_COUNT}</span>
            </div>
            <h2 className="book-form-title">{STEP_LABELS[step]}</h2>
            <div className="book-form-progress">
              <Progress value={progress} aria-label={`Step ${step + 1} of ${STEP_COUNT}`} />
            </div>
            <nav className="book-form-steps" aria-label="Progress">
              {STEP_LABELS.map((label, i) => (
                <span
                  key={label}
                  className={`book-step-pill${i === step ? " is-active" : i < step ? " is-done" : ""}`}
                >
                  {i < step && <Check aria-hidden="true" size={11} />}
                  {label}
                </span>
              ))}
            </nav>
          </div>
        </div>

        {/* Scrollable body */}
        <div className="book-form-body" ref={bodyRef}>
          <div className="book-form-body-inner">
            {hasErrors && (
              <Alert tone="danger" role="alert">
                <AlertTitle>Please review the highlighted fields</AlertTitle>
                <AlertDescription>Required information is missing or needs a correction before continuing.</AlertDescription>
              </Alert>
            )}

            {/* ── Step 0: Visit preferences ── */}
            {step === 0 && (
              <>
                {/* Location */}
                <div className="book-section-card">
                  <div className="book-section-head">
                    <MapPin aria-hidden="true" size={20} />
                    <div>
                      <h2>Preferred location</h2>
                      <p>Select the clinic that works best for your family.</p>
                    </div>
                  </div>
                  <div className="book-location-cards">
                    {(locationOptions as readonly string[]).map((loc) => (
                      <button
                        key={loc}
                        type="button"
                        className={`book-location-card${data.preferredLocation === loc ? " is-active" : ""}`}
                        onClick={() => update("preferredLocation", loc)}
                      >
                        <strong>{loc}</strong>
                        <span>
                          {loc === "Fort Thomas" && "Fort Thomas, KY · (859) 442-4420"}
                          {loc === "Independence" && "Independence, KY · (859) 356-2242"}
                          {loc === "No preference" && "Earliest or most convenient"}
                        </span>
                        {data.preferredLocation === loc && <Check aria-hidden="true" size={15} className="book-location-check" />}
                      </button>
                    ))}
                  </div>
                  {errors.preferredLocation && <span className="book-error" role="alert">{errors.preferredLocation}</span>}
                </div>

                {/* Reason */}
                <div className="book-section-card">
                  <div className="book-section-head">
                    <PawPrint aria-hidden="true" size={20} />
                    <div>
                      <h2>Reason for visit</h2>
                    </div>
                  </div>
                  <FieldWrap label="What brings you in?" icon={<ChevronRight size={13} />} required error={errors.reasonForVisit}>
                    <SelectControl value={data.reasonForVisit} options={visitReasons} onChange={(v) => update("reasonForVisit", v)} />
                  </FieldWrap>
                </div>

                {/* Timing */}
                <div className="book-section-card">
                  <div className="book-section-head">
                    <CalendarCheck aria-hidden="true" size={20} />
                    <div>
                      <h2>When works for you?</h2>
                    </div>
                  </div>

                  <FieldWrap label="Preferred timing" required error={errors.preferredTiming}>
                    <div className="book-timing-chips">
                      {TIMING_CHIPS.map(({ label, sub, value }) => (
                        <button
                          key={value}
                          type="button"
                          className={`book-timing-chip${data.preferredTiming === value ? " is-active" : ""}`}
                          onClick={() => update("preferredTiming", value)}
                        >
                          <strong>{label}</strong>
                          <span>{sub}</span>
                        </button>
                      ))}
                    </div>
                  </FieldWrap>

                  {data.preferredTiming === "Specific date preferred" && (
                    <FieldWrap label="Preferred date" icon={<CalendarDays size={13} />} required error={errors.preferredDate}>
                      <Input type="date" value={data.preferredDate} onChange={(e) => update("preferredDate", e.target.value)} />
                    </FieldWrap>
                  )}

                  <FieldWrap label="Preferred time of day" required error={errors.preferredTimeOfDay}>
                    <div className="book-time-cards">
                      {TIME_CARDS.map(({ label, sub, value, Icon }) => (
                        <button
                          key={value}
                          type="button"
                          className={`book-time-card${data.preferredTimeOfDay === value ? " is-active" : ""}`}
                          onClick={() => update("preferredTimeOfDay", value)}
                        >
                          <Icon aria-hidden="true" size={22} />
                          <strong>{label}</strong>
                          <span>{sub}</span>
                        </button>
                      ))}
                    </div>
                  </FieldWrap>

                  <FieldWrap label="Scheduling notes" icon={<PenLine size={13} />}>
                    <Textarea
                      value={data.schedulingNotes}
                      onChange={(e) => update("schedulingNotes", e.target.value)}
                      placeholder="Anything helpful our team should know when scheduling your visit."
                      rows={3}
                    />
                  </FieldWrap>

                  <FieldWrap label="How did you hear about us?" required error={errors.referralSource}>
                    <Input
                      value={data.referralSource}
                      onChange={(e) => update("referralSource", e.target.value)}
                      placeholder="Google, friend referral, social media, etc."
                    />
                  </FieldWrap>
                </div>

                <div className="book-emergency-note">
                  <Phone aria-hidden="true" size={16} />
                  If your pet is experiencing an emergency, please call the clinic directly or visit the nearest emergency veterinary hospital.
                </div>
              </>
            )}

            {/* ── Step 1: Owner information ── */}
            {step === 1 && (
              <>
                {/* Contact */}
                <div className="book-section-card">
                  <div className="book-section-head">
                    <UserRound aria-hidden="true" size={20} />
                    <div>
                      <h2>Contact information</h2>
                      <p>Our team will use this to follow up about your request.</p>
                    </div>
                  </div>
                  <div className="book-2col">
                    <FieldWrap label="First name" icon={<UserRound size={13} />} required error={errors.ownerFirstName}>
                      <Input value={data.ownerFirstName} onChange={(e) => update("ownerFirstName", e.target.value)} autoComplete="given-name" />
                    </FieldWrap>
                    <FieldWrap label="Last name" icon={<UserRound size={13} />} required error={errors.ownerLastName}>
                      <Input value={data.ownerLastName} onChange={(e) => update("ownerLastName", e.target.value)} autoComplete="family-name" />
                    </FieldWrap>
                    <FieldWrap label="Phone number" icon={<Phone size={13} />} required error={errors.phone}>
                      <PhoneInput
                        value={data.phone as E164Number}
                        onChange={(val) => update("phone", val || "")}
                        defaultCountry="US"
                      />
                    </FieldWrap>
                    <FieldWrap label="Email address" icon={<Mail size={13} />} required error={errors.email}>
                      <Input type="email" value={data.email} onChange={(e) => { update("email", e.target.value); setErrors((p) => ({ ...p, confirmEmail: "" })); }} autoComplete="email" />
                    </FieldWrap>
                    <FieldWrap label="Confirm email address" icon={<Mail size={13} />} required error={errors.confirmEmail}>
                      <Input type="email" value={confirmEmail} onChange={(e) => { setConfirmEmail(e.target.value); setErrors((p) => ({ ...p, confirmEmail: "" })); }} autoComplete="email" placeholder="Re-enter your email" />
                    </FieldWrap>
                  </div>
                </div>

                {/* Address */}
                <div className="book-section-card">
                  <div className="book-section-head">
                    <Home aria-hidden="true" size={20} />
                    <div>
                      <h2>Home address</h2>
                    </div>
                  </div>
                  <div className="book-2col">
                    <FieldWrap label="Street address" icon={<MapPin size={13} />} required error={errors.streetAddress} className="book-span-all">
                      <GeoAutocomplete
                        value={data.streetAddress}
                        onChange={(v) => update("streetAddress", v)}
                        onSelect={(street, city, state, zip) => {
                          update("streetAddress", street);
                          update("city", city);
                          update("state", state.toUpperCase().slice(0, 2));
                          update("zipCode", zip.slice(0, 10));
                        }}
                      />
                    </FieldWrap>
                    <FieldWrap label="Address line 2" className="book-span-all">
                      <Input value={data.addressLine2} onChange={(e) => update("addressLine2", e.target.value)} placeholder="Apt, Suite, etc." autoComplete="address-line2" />
                    </FieldWrap>
                    <FieldWrap label="City" icon={<MapPin size={13} />} required error={errors.city}>
                      <Input value={data.city} onChange={(e) => update("city", e.target.value)} autoComplete="address-level2" />
                    </FieldWrap>
                    <FieldWrap label="State" required error={errors.state}>
                      <Input value={data.state} onChange={(e) => update("state", e.target.value.toUpperCase())} maxLength={2} autoComplete="address-level1" />
                    </FieldWrap>
                    <FieldWrap label="ZIP code" icon={<Hash size={13} />} required error={errors.zipCode}>
                      <Input inputMode="numeric" value={data.zipCode} onChange={(e) => updateZip(e.target.value)} autoComplete="postal-code" />
                    </FieldWrap>
                  </div>
                </div>
              </>
            )}

            {/* ── Step 2: Pet information ── */}
            {step === 2 && (
              <>
                {pets.map((pet, index) => (
                  <PetCard
                    key={pet.id}
                    pet={pet}
                    index={index}
                    errors={errors}
                    onChange={updatePet}
                    onRemove={index > 0 ? () => removePet(pet.id) : undefined}
                  />
                ))}

                <button type="button" className="book-add-pet" onClick={addPet}>
                  <Plus aria-hidden="true" size={16} /> Add another pet
                </button>

                <div className="book-section-card">
                  <div className="book-section-head">
                    <Upload aria-hidden="true" size={22} />
                    <div>
                      <h2>Health records</h2>
                      <p>No worries if you do not have records now — you can reply to your confirmation email later.</p>
                    </div>
                  </div>
                  <div className="book-upload-box">
                    <Upload aria-hidden="true" size={28} />
                    <strong>Upload previous health records</strong>
                    <p>PDF, JPG, PNG, DOC, or DOCX · Maximum 8 MB per file</p>
                    <Input
                      aria-label="Upload previous health records"
                      type="file"
                      multiple
                      accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                      onChange={(e) => chooseFiles(e.target.files)}
                    />
                    {files.length > 0 && (
                      <small>{files.length} file{files.length === 1 ? "" : "s"} selected</small>
                    )}
                    {errors.records && (
                      <span className="book-error" role="alert">{errors.records}</span>
                    )}
                  </div>
                </div>

              </>
            )}

            {/* ── Step 3: Authorization & Signature ── */}
            {step === 3 && (
              <AuthStep
                data={data}
                legalName={legalName}
                errors={errors}
                onUpdate={update}
                onLegalName={(v) => { setLegalName(v); setErrors((prev) => ({ ...prev, legalName: "" })); }}
              />
            )}

            {/* ── Step 4: Review & Submit ── */}
            {step === 4 && (
              <>
                <ReviewSection
                  title="Visit preferences"
                  icon={<CalendarCheck aria-hidden="true" size={16} />}
                  onEdit={() => goToStep(0)}
                >
                  <ReviewRow label="Location" value={data.preferredLocation} />
                  <ReviewRow label="Reason" value={data.reasonForVisit} />
                  <ReviewRow label="Timing" value={data.preferredTiming + (data.preferredDate ? ` · ${data.preferredDate}` : "")} />
                  <ReviewRow label="Time of day" value={data.preferredTimeOfDay} />
                  <ReviewRow label="Notes" value={data.schedulingNotes || "None"} />
                  <ReviewRow label="Referral" value={data.referralSource} />
                </ReviewSection>

                <ReviewSection
                  title="Owner information"
                  icon={<UserRound aria-hidden="true" size={16} />}
                  onEdit={() => goToStep(1)}
                >
                  <ReviewRow label="Name" value={`${data.ownerFirstName} ${data.ownerLastName}`} />
                  <ReviewRow label="Phone" value={data.phone} />
                  <ReviewRow label="Email" value={data.email} />
                  <ReviewRow label="Address" value={`${data.streetAddress}${data.addressLine2 ? `, ${data.addressLine2}` : ""}, ${data.city}, ${data.state} ${data.zipCode}`} />
                </ReviewSection>

                <ReviewSection
                  title={`Pet information (${pets.length} pet${pets.length === 1 ? "" : "s"})`}
                  icon={<PawPrint aria-hidden="true" size={16} />}
                  onEdit={() => goToStep(2)}
                >
                  {pets.map((pet, i) => (
                    <div key={pet.id} style={{ gridColumn: "1 / -1", borderTop: i > 0 ? "1px solid rgba(169,27,27,.08)" : "none", paddingTop: i > 0 ? 10 : 0, marginTop: i > 0 ? 6 : 0 }}>
                      <div style={{ fontWeight: 900, color: "var(--ink)", fontSize: 13, marginBottom: 6 }}>Pet {i + 1}: {pet.petName || "—"}</div>
                      <div className="book-review-dl">
                        <div><dt>Age/DOB</dt><dd>{pet.ageOrDateOfBirth || "—"}</dd></div>
                        <div><dt>Species</dt><dd>{pet.species}</dd></div>
                        <div><dt>Gender</dt><dd>{pet.gender}</dd></div>
                        <div><dt>Breed</dt><dd>{pet.breed || "—"}</dd></div>
                        <div><dt>Indoor/Outdoor</dt><dd>{pet.indoorOutdoor}</dd></div>
                        <div><dt>Microchip</dt><dd>{pet.microchipNumber || "Not provided"}</dd></div>
                        <div><dt>Vaccines</dt><dd>{pet.vaccinationHistory || "—"}</dd></div>
                      </div>
                    </div>
                  ))}
                  <ReviewRow label="Records" value={files.length ? `${files.length} file${files.length === 1 ? "" : "s"} uploaded` : "No files uploaded"} />
                  <ReviewRow label="How you heard about us" value={data.referralSource} />
                </ReviewSection>

                <ReviewSection
                  title="Authorization"
                  icon={<ShieldCheck aria-hidden="true" size={16} />}
                  onEdit={() => goToStep(3)}
                >
                  <ReviewRow label="Agreement" value={data.authorizationConsent ? "Financial & Treatment Authorization accepted" : "Not accepted"} />
                  <ReviewRow label="Legal name" value={legalName || "Not provided"} />
                  <ReviewRow label="Signature" value={data.digitalSignature ? `Signed on ${data.dateSigned}` : "Not signed"} />
                </ReviewSection>

                <div className="book-section-card">
                  <div className="book-section-head">
                    <FileText aria-hidden="true" size={22} />
                    <div>
                      <h2>Ready to submit</h2>
                      <p>By submitting, you are sending this request to Veterinary Medical Centers. A team member will follow up to confirm next steps.</p>
                    </div>
                  </div>
                  <label className="book-consent-row">
                    <Checkbox
                      checked={data.finalConfirmation as boolean}
                      onCheckedChange={(checked) => update("finalConfirmation", checked === true)}
                    />
                    <span>
                      I confirm this information is accurate to the best of my knowledge.
                      <em className="book-required" aria-label="required">*</em>
                    </span>
                  </label>
                  {errors.finalConfirmation && (
                    <span className="book-error" role="alert">{errors.finalConfirmation}</span>
                  )}
                  <TurnstileField onToken={setTurnstileToken} />
                  {submitMessage && (
                    <Alert tone="danger" role="alert">
                      <AlertTitle>Request not submitted</AlertTitle>
                      <AlertDescription>{submitMessage}</AlertDescription>
                    </Alert>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Sticky footer */}
        <div className="book-form-footer">
          <div className="book-form-footer-inner">
            <div style={{ display: "flex", gap: 8 }}>
              {initialMode === "choose" && step === 0 && (
                <ShadButton variant="ghost" type="button" onClick={() => setMode("choose")}>
                  <ArrowLeft aria-hidden="true" size={16} /> Back
                </ShadButton>
              )}
              {step > 0 && (
                <ShadButton variant="ghost" type="button" onClick={goBack}>
                  <ArrowLeft aria-hidden="true" size={16} /> Back
                </ShadButton>
              )}
            </div>
            <div>
              {step < STEP_COUNT - 1 ? (
                <ShadButton type="button" onClick={goNext}>
                  Continue <ArrowRight aria-hidden="true" size={16} />
                </ShadButton>
              ) : (
                <ShadButton type="button" disabled={isPending} onClick={submit} className="book-submit-cta">
                  {isPending ? "Submitting…" : "Submit new patient request →"}
                </ShadButton>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

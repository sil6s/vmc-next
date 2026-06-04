"use client";

import { useEffect } from "react";
import type { Locale } from "@/lib/i18n";

type Dictionary = Record<string, string>;

const es: Dictionary = {
  "New patient": "Nuevo paciente",
  "New patient · Step": "Nuevo paciente · Paso",
  "of": "de",
  "Pet": "Mascota",
  "Visit preferences": "Preferencias de visita",
  "Owner information": "Información del propietario",
  "Pet information": "Información de la mascota",
  "Authorization": "Autorización",
  "Review & submit": "Revisar y enviar",
  "Progress": "Progreso",
  "required": "obligatorio",
  "Please review the highlighted fields": "Revise los campos resaltados",
  "Required information is missing or needs a correction before continuing.": "Falta información obligatoria o debe corregirse antes de continuar.",
  "Preferred location": "Ubicación preferida",
  "Select the clinic that works best for your family.": "Seleccione la clínica que mejor funcione para su familia.",
  "No preference": "Sin preferencia",
  "Earliest or most convenient": "La opción más temprana o conveniente",
  "Reason for visit": "Motivo de la visita",
  "What brings you in?": "¿Cuál es el motivo de su visita?",
  "Wellness exam": "Examen de bienestar",
  "Vaccines": "Vacunas",
  "Sick visit": "Visita por enfermedad",
  "Dental care": "Atención dental",
  "Surgery consultation": "Consulta de cirugía",
  "New pet visit": "Visita para nueva mascota",
  "Other": "Otro",
  "When works for you?": "¿Cuándo le funciona?",
  "Preferred timing": "Horario preferido",
  "As soon as possible": "Lo antes posible",
  "Earliest opening": "Primera disponibilidad",
  "This week": "Esta semana",
  "Within 7 days": "Dentro de 7 días",
  "1–2 weeks": "1–2 semanas",
  "Next available slot": "Próxima disponibilidad",
  "Pick a date": "Elegir una fecha",
  "I have a date in mind": "Tengo una fecha en mente",
  "Preferred date": "Fecha preferida",
  "Preferred time of day": "Momento preferido del día",
  "Morning": "Mañana",
  "Afternoon": "Tarde",
  "Any time works": "Cualquier hora funciona",
  "Scheduling notes": "Notas de programación",
  "Anything helpful our team should know when scheduling your visit.": "Cualquier información útil que nuestro equipo deba conocer al programar su visita.",
  "How did you hear about us?": "¿Cómo se enteró de nosotros?",
  "Google, friend referral, social media, etc.": "Google, recomendación de un amigo, redes sociales, etc.",
  "If your pet is experiencing an emergency, please call the clinic directly or visit the nearest emergency veterinary hospital.": "Si su mascota tiene una emergencia, llame directamente a la clínica o visite el hospital veterinario de emergencia más cercano.",
  "Contact information": "Información de contacto",
  "Our team will use this to follow up about your request.": "Nuestro equipo usará esta información para dar seguimiento a su solicitud.",
  "First name": "Nombre",
  "Last name": "Apellido",
  "Phone number": "Número de teléfono",
  "Select country": "Seleccionar país",
  "Email address": "Correo electrónico",
  "Confirm email address": "Confirmar correo electrónico",
  "Re-enter your email": "Vuelva a ingresar su correo electrónico",
  "Home address": "Dirección del hogar",
  "Street address": "Dirección",
  "Start typing your street address…": "Comience a escribir su dirección…",
  "Address suggestions": "Sugerencias de dirección",
  "Address line 2": "Línea de dirección 2",
  "Apt, Suite, etc.": "Apartamento, suite, etc.",
  "City": "Ciudad",
  "State": "Estado",
  "ZIP code": "Código postal",
  "Pet name": "Nombre de la mascota",
  "Age or date of birth": "Edad o fecha de nacimiento",
  "Species": "Especie",
  "Dog": "Perro",
  "Cat": "Gato",
  "Gender": "Sexo",
  "Male": "Macho",
  "Neutered Male": "Macho castrado",
  "Female": "Hembra",
  "Spayed Female": "Hembra esterilizada",
  "Breed": "Raza",
  "Color / markings": "Color / marcas",
  "Indoor or outdoor?": "¿Interior o exterior?",
  "Indoor": "Interior",
  "Outdoor": "Exterior",
  "Both": "Ambos",
  "Microchip number": "Número de microchip",
  "Optional": "Opcional",
  "Vaccination history": "Historial de vacunación",
  "Optional — you can reply to your confirmation email with records later": "Opcional — puede responder al correo de confirmación con los registros más tarde",
  "List vaccines and approximate dates, or upload records below.": "Enumere las vacunas y fechas aproximadas, o cargue los registros a continuación.",
  "Add another pet": "Agregar otra mascota",
  "Remove this pet": "Eliminar esta mascota",
  "Health records": "Registros médicos",
  "No worries if you do not have records now — you can reply to your confirmation email later.": "No se preocupe si no tiene registros ahora; puede responder al correo de confirmación más tarde.",
  "Upload previous health records": "Cargar registros médicos anteriores",
  "PDF, JPG, PNG, DOC, or DOCX · Maximum 8 MB per file": "PDF, JPG, PNG, DOC o DOCX · Máximo 8 MB por archivo",
  "Financial & Treatment Authorization": "Autorización financiera y de tratamiento",
  "Please read the full authorization before signing.": "Lea la autorización completa antes de firmar.",
  "Scroll to read full authorization": "Desplácese para leer la autorización completa",
  "I have read and agree to the Financial & Treatment Authorization.": "He leído y acepto la Autorización financiera y de tratamiento.",
  "Scroll through the authorization above to enable this checkbox.": "Desplácese por la autorización anterior para habilitar esta casilla.",
  "Digital signature": "Firma digital",
  "Enter your full legal name and draw or type your signature below.": "Ingrese su nombre legal completo y dibuje o escriba su firma a continuación.",
  "Full legal name": "Nombre legal completo",
  "As it appears on your ID": "Como aparece en su identificación",
  "Signature method": "Método de firma",
  "Draw signature": "Dibujar firma",
  "Type signature": "Escribir firma",
  "Draw your signature": "Dibuje su firma",
  "Sign here": "Firme aquí",
  "Type your full legal name": "Escriba su nombre legal completo",
  "Signature preview": "Vista previa de la firma",
  "Use your mouse, finger, trackpad, or keyboard to sign.": "Use el mouse, dedo, panel táctil o teclado para firmar.",
  "Clear": "Borrar",
  "Date signed": "Fecha de firma",
  "Edit": "Editar",
  "Location": "Ubicación",
  "Reason": "Motivo",
  "Timing": "Horario",
  "Time of day": "Momento del día",
  "Notes": "Notas",
  "Referral": "Referencia",
  "Name": "Nombre",
  "Phone": "Teléfono",
  "Email": "Correo electrónico",
  "Address": "Dirección",
  "Age/DOB": "Edad/fecha de nacimiento",
  "Indoor/Outdoor": "Interior/exterior",
  "Microchip": "Microchip",
  "Records": "Registros",
  "How you heard about us": "Cómo se enteró de nosotros",
  "Agreement": "Acuerdo",
  "Financial & Treatment Authorization accepted": "Autorización financiera y de tratamiento aceptada",
  "Legal name": "Nombre legal",
  "Signature": "Firma",
  "Not provided": "No proporcionado",
  "None": "Ninguna",
  "No files uploaded": "No se cargaron archivos",
  "Not accepted": "No aceptado",
  "Not signed": "No firmado",
  "Ready to submit": "Listo para enviar",
  "By submitting, you are sending this request to Veterinary Medical Centers. A team member will follow up to confirm next steps.": "Al enviar, está enviando esta solicitud a Veterinary Medical Centers. Un miembro del equipo se comunicará para confirmar los siguientes pasos.",
  "I confirm this information is accurate to the best of my knowledge.": "Confirmo que esta información es correcta según mi leal saber y entender.",
  "Request not submitted": "Solicitud no enviada",
  "Back": "Atrás",
  "Continue": "Continuar",
  "Submitting…": "Enviando…",
  "Submit new patient request →": "Enviar solicitud de nuevo paciente →",
  "Request received": "Solicitud recibida",
  "Thank you. Your new patient request has been sent to Veterinary Medical Centers. Our team will review it and follow up to help schedule your first visit.": "Gracias. Su solicitud de nuevo paciente ha sido enviada a Veterinary Medical Centers. Nuestro equipo la revisará y se comunicará para ayudar a programar su primera visita.",
  "Return to appointment options": "Volver a las opciones de cita",
  "Choose a location.": "Elija una ubicación.",
  "Choose a reason.": "Elija un motivo.",
  "Choose a timing preference.": "Elija una preferencia de horario.",
  "Choose a preferred time of day.": "Elija un momento preferido del día.",
  "Choose a preferred date.": "Elija una fecha preferida.",
  "Please tell us how you heard about us.": "Díganos cómo se enteró de nosotros.",
  "First name is required.": "El nombre es obligatorio.",
  "First name must be at least 2 characters.": "El nombre debe tener al menos 2 caracteres.",
  "Last name is required.": "El apellido es obligatorio.",
  "Last name must be at least 2 characters.": "El apellido debe tener al menos 2 caracteres.",
  "Phone number is required.": "El número de teléfono es obligatorio.",
  "Enter a valid 10-digit phone number.": "Ingrese un número de teléfono válido de 10 dígitos.",
  "Email address is required.": "El correo electrónico es obligatorio.",
  "Enter a valid email address (e.g. you@example.com).": "Ingrese un correo electrónico válido (p. ej., usted@ejemplo.com).",
  "Please confirm your email address.": "Confirme su correo electrónico.",
  "Email addresses do not match.": "Los correos electrónicos no coinciden.",
  "Street address is required.": "La dirección es obligatoria.",
  "City is required.": "La ciudad es obligatoria.",
  "State is required.": "El estado es obligatorio.",
  "Enter a valid 2-letter state code.": "Ingrese un código estatal válido de 2 letras.",
  "ZIP code is required.": "El código postal es obligatorio.",
  "Enter a valid 5-digit ZIP code.": "Ingrese un código postal válido de 5 dígitos.",
  "Pet name is required.": "El nombre de la mascota es obligatorio.",
  "Age or date of birth is required.": "La edad o fecha de nacimiento es obligatoria.",
  "Breed is required.": "La raza es obligatoria.",
  "Color/markings are required.": "El color o las marcas son obligatorios.",
  "Please scroll through and agree to the authorization before continuing.": "Desplácese por la autorización y acéptela antes de continuar.",
  "Enter your full legal name as it appears on your ID.": "Ingrese su nombre legal completo como aparece en su identificación.",
  "Please enter your first and last name.": "Ingrese su nombre y apellido.",
  "Please draw or type your signature.": "Dibuje o escriba su firma.",
  "Date signed is required.": "La fecha de firma es obligatoria.",
  "Please confirm the information is accurate before submitting.": "Confirme que la información es correcta antes de enviarla.",
  "One or more files was too large. Maximum size is 8 MB per file.": "Uno o más archivos eran demasiado grandes. El tamaño máximo es de 8 MB por archivo.",
  "Your request could not be submitted. Please call either clinic.": "No se pudo enviar su solicitud. Llame a cualquiera de las clínicas."
};

const commonOther: Record<Exclude<Locale, "en" | "es">, Dictionary> = {
  fr: {
    "New patient": "Nouveau patient", "New patient · Step": "Nouveau patient · Étape", "of": "sur", "Pet": "Animal", "Visit preferences": "Préférences de visite", "Owner information": "Informations du propriétaire", "Pet information": "Informations sur l’animal",
    "Authorization": "Autorisation", "Review & submit": "Vérifier et envoyer", "Preferred location": "Établissement préféré", "Reason for visit": "Motif de la visite",
    "What brings you in?": "Quel est le motif de votre visite ?", "When works for you?": "Quand êtes-vous disponible ?", "Preferred timing": "Période préférée",
    "Preferred time of day": "Moment préféré de la journée", "Contact information": "Coordonnées", "First name": "Prénom", "Last name": "Nom",
    "Phone number": "Numéro de téléphone", "Email address": "Adresse e-mail", "Confirm email address": "Confirmer l’adresse e-mail", "Home address": "Adresse du domicile",
    "Street address": "Adresse", "City": "Ville", "State": "État", "ZIP code": "Code postal", "Pet name": "Nom de l’animal", "Age or date of birth": "Âge ou date de naissance",
    "Species": "Espèce", "Dog": "Chien", "Cat": "Chat", "Gender": "Sexe", "Breed": "Race", "Color / markings": "Couleur / marques",
    "Indoor or outdoor?": "Intérieur ou extérieur ?", "Microchip number": "Numéro de puce", "Vaccination history": "Historique des vaccinations",
    "Add another pet": "Ajouter un autre animal", "Health records": "Dossiers médicaux", "Upload previous health records": "Téléverser les dossiers médicaux précédents",
    "Digital signature": "Signature numérique", "Full legal name": "Nom légal complet", "Date signed": "Date de signature", "Back": "Retour", "Continue": "Continuer",
    "Ready to submit": "Prêt à envoyer", "Submit new patient request →": "Envoyer la demande de nouveau patient →", "Edit": "Modifier"
  },
  hi: {
    "New patient": "नया मरीज़", "New patient · Step": "नया मरीज़ · चरण", "of": "/", "Pet": "पालतू पशु", "Visit preferences": "मुलाकात की प्राथमिकताएँ", "Owner information": "मालिक की जानकारी", "Pet information": "पालतू पशु की जानकारी",
    "Authorization": "अनुमति", "Review & submit": "समीक्षा और भेजें", "Preferred location": "पसंदीदा स्थान", "Reason for visit": "मुलाकात का कारण",
    "What brings you in?": "आप किस कारण से आ रहे हैं?", "When works for you?": "आपके लिए कौन सा समय ठीक है?", "Preferred timing": "पसंदीदा समय",
    "Preferred time of day": "दिन का पसंदीदा समय", "Contact information": "संपर्क जानकारी", "First name": "पहला नाम", "Last name": "अंतिम नाम",
    "Phone number": "फ़ोन नंबर", "Email address": "ईमेल पता", "Confirm email address": "ईमेल पता पुष्टि करें", "Home address": "घर का पता",
    "Street address": "सड़क का पता", "City": "शहर", "State": "राज्य", "ZIP code": "ज़िप कोड", "Pet name": "पालतू पशु का नाम", "Age or date of birth": "आयु या जन्म तिथि",
    "Species": "प्रजाति", "Dog": "कुत्ता", "Cat": "बिल्ली", "Gender": "लिंग", "Breed": "नस्ल", "Color / markings": "रंग / निशान",
    "Indoor or outdoor?": "घर के अंदर या बाहर?", "Microchip number": "माइक्रोचिप नंबर", "Vaccination history": "टीकाकरण इतिहास",
    "Add another pet": "एक और पालतू पशु जोड़ें", "Health records": "स्वास्थ्य रिकॉर्ड", "Upload previous health records": "पिछले स्वास्थ्य रिकॉर्ड अपलोड करें",
    "Digital signature": "डिजिटल हस्ताक्षर", "Full legal name": "पूरा कानूनी नाम", "Date signed": "हस्ताक्षर की तारीख", "Back": "वापस", "Continue": "जारी रखें",
    "Ready to submit": "भेजने के लिए तैयार", "Submit new patient request →": "नए मरीज़ का अनुरोध भेजें →", "Edit": "संपादित करें"
  },
  zh: {
    "New patient": "新患者", "New patient · Step": "新患者 · 第", "of": "步，共", "Pet": "宠物", "Visit preferences": "就诊偏好", "Owner information": "主人信息", "Pet information": "宠物信息",
    "Authorization": "授权", "Review & submit": "检查并提交", "Preferred location": "首选地点", "Reason for visit": "就诊原因",
    "What brings you in?": "本次就诊的原因是什么？", "When works for you?": "什么时间方便？", "Preferred timing": "首选时间",
    "Preferred time of day": "首选时段", "Contact information": "联系信息", "First name": "名字", "Last name": "姓氏",
    "Phone number": "电话号码", "Email address": "电子邮件地址", "Confirm email address": "确认电子邮件地址", "Home address": "家庭住址",
    "Street address": "街道地址", "City": "城市", "State": "州", "ZIP code": "邮政编码", "Pet name": "宠物姓名", "Age or date of birth": "年龄或出生日期",
    "Species": "种类", "Dog": "狗", "Cat": "猫", "Gender": "性别", "Breed": "品种", "Color / markings": "颜色 / 特征",
    "Indoor or outdoor?": "室内还是室外？", "Microchip number": "芯片编号", "Vaccination history": "疫苗接种记录",
    "Add another pet": "添加另一只宠物", "Health records": "健康记录", "Upload previous health records": "上传以前的健康记录",
    "Digital signature": "数字签名", "Full legal name": "完整法定姓名", "Date signed": "签署日期", "Back": "返回", "Continue": "继续",
    "Ready to submit": "准备提交", "Submit new patient request →": "提交新患者申请 →", "Edit": "编辑"
  }
};

function translateDynamic(text: string, dictionary: Dictionary, locale: Locale) {
  const trimmed = text.trim();
  if (dictionary[trimmed]) return text.replace(trimmed, dictionary[trimmed]);
  if (locale === "es") {
    return text
      .replace(/New patient · Step (\d+) of (\d+)/, (_match, a, b) => `Nuevo paciente · Paso ${a} de ${b}`)
      .replace(/Step (\d+) of (\d+)/, (_match, a, b) => `Paso ${a} de ${b}`)
      .replace(/Pet (\d+)/, (_match, n) => `Mascota ${n}`)
      .replace(/(\d+) files? selected/, (_match, n) => `${n} archivo${n === "1" ? "" : "s"} seleccionado${n === "1" ? "" : "s"}`)
      .replace(/(\d+) files? uploaded/, (_match, n) => `${n} archivo${n === "1" ? "" : "s"} cargado${n === "1" ? "" : "s"}`);
  }
  if (locale === "fr") {
    return text
      .replace(/New patient · Step (\d+) of (\d+)/, (_match, a, b) => `Nouveau patient · Étape ${a} sur ${b}`)
      .replace(/Step (\d+) of (\d+)/, (_match, a, b) => `Étape ${a} sur ${b}`)
      .replace(/Pet (\d+)/, (_match, n) => `Animal ${n}`)
      .replace(/(\d+) files? selected/, (_match, n) => `${n} fichier${n === "1" ? "" : "s"} sélectionné${n === "1" ? "" : "s"}`)
      .replace(/(\d+) files? uploaded/, (_match, n) => `${n} fichier${n === "1" ? "" : "s"} téléversé${n === "1" ? "" : "s"}`);
  }
  if (locale === "hi") {
    return text
      .replace(/New patient · Step (\d+) of (\d+)/, (_match, a, b) => `नया मरीज़ · चरण ${a} / ${b}`)
      .replace(/Step (\d+) of (\d+)/, (_match, a, b) => `चरण ${a} / ${b}`)
      .replace(/Pet (\d+)/, (_match, n) => `पालतू पशु ${n}`)
      .replace(/(\d+) files? selected/, (_match, n) => `${n} फ़ाइल चुनी गई`)
      .replace(/(\d+) files? uploaded/, (_match, n) => `${n} फ़ाइल अपलोड की गई`);
  }
  if (locale === "zh") {
    return text
      .replace(/New patient · Step (\d+) of (\d+)/, (_match, a, b) => `新患者 · 第 ${a} 步，共 ${b} 步`)
      .replace(/Step (\d+) of (\d+)/, (_match, a, b) => `第 ${a} 步，共 ${b} 步`)
      .replace(/Pet (\d+)/, (_match, n) => `宠物 ${n}`)
      .replace(/(\d+) files? selected/, (_match, n) => `已选择 ${n} 个文件`)
      .replace(/(\d+) files? uploaded/, (_match, n) => `已上传 ${n} 个文件`);
  }
  return text;
}

export function AppointmentFormTranslator({ locale }: { locale: Locale }) {
  useEffect(() => {
    if (locale === "en") return;
    const dictionary = locale === "es" ? es : commonOther[locale];
    const root = document.querySelector<HTMLElement>("#appointment-flow");
    if (!root) return;

    const translate = () => {
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      let node = walker.nextNode();
      while (node) {
        const parent = node.parentElement;
        if (parent && !parent.closest(".book-auth-text")) {
          const translated = translateDynamic(node.textContent || "", dictionary, locale);
          if (translated !== node.textContent) node.textContent = translated;
        }
        node = walker.nextNode();
      }

      root.querySelectorAll<HTMLElement>("[placeholder], [aria-label]").forEach((element) => {
        for (const attribute of ["placeholder", "aria-label"]) {
          const value = element.getAttribute(attribute);
          if (value) {
            const translated = translateDynamic(value, dictionary, locale);
            if (translated !== value) element.setAttribute(attribute, translated);
          }
        }
      });
    };

    translate();
    const observer = new MutationObserver(translate);
    observer.observe(root, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [locale]);

  return null;
}

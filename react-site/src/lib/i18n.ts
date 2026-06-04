export const locales = ["en", "es", "fr", "hi", "zh"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
  en: "English",
  es: "Español",
  fr: "Français",
  hi: "हिन्दी",
  zh: "简体中文"
};

export const localizedStaticPaths = [
  "/",
  "/about/",
  "/book-appointment/",
  "/contact/",
  "/locations/",
  "/new-patients/",
  "/services/",
  "/vet-near-me/"
] as const;

export const localizedInteractivePaths = ["/book-appointment/"] as const;
export const exactStructureLocalizedPaths = ["/", "/about/", "/services/"] as const;

const excludedLocalePrefixes = ["/api/", "/dashboard/", "/login/", "/not-authorized/", "/studio/"] as const;

export function isLocale(value: string | null | undefined): value is Locale {
  return locales.includes(value as Locale);
}

export function localeFromPathname(pathname: string): Locale {
  const segment = pathname.split("/").filter(Boolean)[0];
  return isLocale(segment) ? segment : defaultLocale;
}

export function stripLocale(pathname: string) {
  const locale = localeFromPathname(pathname);
  if (locale === defaultLocale) {
    return pathname;
  }

  const stripped = pathname.replace(new RegExp(`^/${locale}(?=/|$)`), "");
  return stripped || "/";
}

export function isLocalizedStaticPath(pathname: string) {
  const normalized = pathname.endsWith("/") ? pathname : `${pathname}/`;
  return localizedStaticPaths.includes(normalized as (typeof localizedStaticPaths)[number]) || normalized.startsWith("/services/");
}

export function isExactStructureLocalizedPath(pathname: string) {
  const normalized = pathname.endsWith("/") ? pathname : `${pathname}/`;
  return exactStructureLocalizedPaths.includes(normalized as (typeof exactStructureLocalizedPaths)[number]) || normalized.startsWith("/services/");
}

export function isLocalizedInteractivePath(pathname: string) {
  const normalized = pathname.endsWith("/") ? pathname : `${pathname}/`;
  return localizedInteractivePaths.includes(normalized as (typeof localizedInteractivePaths)[number]);
}

export function isPublicLocalePath(pathname: string) {
  const normalized = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return !excludedLocalePrefixes.some((prefix) => normalized === prefix.slice(0, -1) || normalized.startsWith(prefix));
}

export function localizedHref(href: string, locale: Locale) {
  if (
    locale === defaultLocale ||
    href.startsWith("#") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:") ||
    href.startsWith("http://") ||
    href.startsWith("https://")
  ) {
    return href;
  }

  const url = new URL(href, "https://nky.vet");
  const firstSegment = url.pathname.split("/").filter(Boolean)[0];
  if (isLocale(firstSegment)) {
    return href;
  }

  if (!isPublicLocalePath(url.pathname)) {
    return href;
  }

  const pathname = url.pathname === "/" ? `/${locale}/` : `/${locale}${url.pathname}`;
  return `${pathname}${url.search}${url.hash}`;
}

export function localizedLanguageAlternates(pathname: string) {
  return Object.fromEntries(locales.map((locale) => [locale === "zh" ? "zh-Hans" : locale, localizedHref(pathname, locale)]));
}

export const messages = {
  en: {
    language: "Language",
    translationTitle: "Automatic translation",
    translationNotice:
      "This page has been automatically translated for your convenience. Some wording may be inaccurate. Please contact our team if you need help.",
    unavailableTitle: "This page is not available in your selected language",
    unavailableNotice:
      "We are sorry, but this page is currently available only in English. This includes articles, detailed service and location pages, forms, appointment tools, and legal information.",
    continueEnglish: "Continue in English",
    skipToContent: "Skip to content",
    about: "About",
    services: "Services",
    newPatients: "New Patients",
    resources: "Resources",
    contact: "Contact",
    patientPortal: "Patient Portal",
    onlinePharmacy: "Online Pharmacy",
    newPatientForm: "New Patient Form",
    bookAppointment: "Book Appointment",
    callUsNow: "Call Us Now",
    mainMenu: "Main menu",
    navigate: "Navigate",
    onlineTools: "Online Tools",
    stayInLoop: "Stay in the loop.",
    newsletterBody: "Monthly pet health tips and clinic updates for Northern Kentucky pet owners.",
    localCare: "Locally and independently owned veterinary care for dogs and cats.",
    allRightsReserved: "All rights reserved.",
    privacy: "Privacy Policy & SMS Terms",
    contentPortal: "Content Portal",
    adminPortal: "Admin Portal",
    ourPractice: "Our Practice",
    locallyOwnedCare: "Locally owned veterinary care",
    allLocations: "All Locations",
    findClinic: "Find a clinic",
    menuTitle: "Veterinary Medical Centers menu",
    menuDescription: "Navigate the main Veterinary Medical Centers website links.",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    emailAddress: "Email address",
    emailPlaceholder: "Your email address",
    subscribe: "Subscribe",
    newsletterThanks: "Thank you. Newsletter integration can be connected later.",
    invalidEmail: "Enter a valid email address.",
    communicationTitle: "Language and communication support",
    communicationNotice:
      "Veterinary Medical Centers is a small local clinic. We may not always have an interpreter available. To help communicate with you, our team may use automated translation tools, which can make mistakes. Please tell us if anything is unclear.",
    appointmentCommunicationNotice:
      "Veterinary Medical Centers is a small local clinic. We may not always have an interpreter available. To help communicate with you, our team may use automated translation tools, which can make mistakes. Please tell us if anything is unclear. The form interface is translated for your convenience, but the legal authorization remains in English. Please ask our team if anything is unclear before reviewing and accepting it."
  },
  es: {
    language: "Idioma",
    translationTitle: "Traducción automática",
    translationNotice:
      "Esta página se ha traducido automáticamente para su comodidad. Algunas frases pueden ser inexactas. Comuníquese con nuestro equipo si necesita ayuda.",
    unavailableTitle: "Esta página no está disponible en el idioma seleccionado",
    unavailableNotice:
      "Lo sentimos, pero esta página actualmente solo está disponible en inglés. Esto incluye artículos, páginas detalladas de servicios y ubicaciones, formularios, herramientas de citas e información legal.",
    continueEnglish: "Continuar en inglés",
    skipToContent: "Saltar al contenido",
    about: "Acerca de",
    services: "Servicios",
    newPatients: "Nuevos pacientes",
    resources: "Recursos",
    contact: "Contacto",
    patientPortal: "Portal del paciente",
    onlinePharmacy: "Farmacia en línea",
    newPatientForm: "Formulario para nuevos pacientes",
    bookAppointment: "Reservar cita",
    callUsNow: "Llámenos ahora",
    mainMenu: "Menú principal",
    navigate: "Navegar",
    onlineTools: "Herramientas en línea",
    stayInLoop: "Manténgase informado.",
    newsletterBody: "Consejos mensuales sobre la salud de las mascotas y novedades de la clínica para dueños del norte de Kentucky.",
    localCare: "Atención veterinaria local e independiente para perros y gatos.",
    allRightsReserved: "Todos los derechos reservados.",
    privacy: "Política de privacidad y términos de SMS",
    contentPortal: "Portal de contenido",
    adminPortal: "Portal de administración",
    ourPractice: "Nuestra clínica",
    locallyOwnedCare: "Atención veterinaria de propiedad local",
    allLocations: "Todas las ubicaciones",
    findClinic: "Encuentre una clínica",
    menuTitle: "Menú de Veterinary Medical Centers",
    menuDescription: "Navegue por los enlaces principales del sitio web de Veterinary Medical Centers.",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    emailAddress: "Dirección de correo electrónico",
    emailPlaceholder: "Su correo electrónico",
    subscribe: "Suscribirse",
    newsletterThanks: "Gracias. La integración del boletín se puede conectar más adelante.",
    invalidEmail: "Ingrese una dirección de correo electrónico válida.",
    communicationTitle: "Apoyo de idioma y comunicación",
    communicationNotice:
      "Veterinary Medical Centers es una clínica local pequeña. Es posible que no siempre tengamos un intérprete disponible. Para ayudar a comunicarnos con usted, nuestro equipo puede usar herramientas de traducción automática, que pueden cometer errores. Díganos si algo no está claro.",
    appointmentCommunicationNotice:
      "Veterinary Medical Centers es una clínica local pequeña. Es posible que no siempre tengamos un intérprete disponible. Para ayudar a comunicarnos con usted, nuestro equipo puede usar herramientas de traducción automática, que pueden cometer errores. Díganos si algo no está claro. La interfaz del formulario está traducida para su comodidad, pero la autorización legal permanece en inglés. Consulte a nuestro equipo si algo no está claro antes de revisarla y aceptarla."
  },
  fr: {
    language: "Langue",
    translationTitle: "Traduction automatique",
    translationNotice:
      "Cette page a été traduite automatiquement pour votre commodité. Certaines formulations peuvent être inexactes. Contactez notre équipe si vous avez besoin d’aide.",
    unavailableTitle: "Cette page n’est pas disponible dans la langue sélectionnée",
    unavailableNotice:
      "Nous sommes désolés, mais cette page est actuellement disponible uniquement en anglais. Cela comprend les articles, les pages détaillées des services et établissements, les formulaires, les outils de rendez-vous et les informations juridiques.",
    continueEnglish: "Continuer en anglais",
    skipToContent: "Aller au contenu",
    about: "À propos",
    services: "Services",
    newPatients: "Nouveaux patients",
    resources: "Ressources",
    contact: "Contact",
    patientPortal: "Portail patient",
    onlinePharmacy: "Pharmacie en ligne",
    newPatientForm: "Formulaire nouveau patient",
    bookAppointment: "Prendre rendez-vous",
    callUsNow: "Appelez-nous",
    mainMenu: "Menu principal",
    navigate: "Navigation",
    onlineTools: "Outils en ligne",
    stayInLoop: "Restez informé.",
    newsletterBody: "Conseils mensuels sur la santé des animaux et actualités de la clinique pour les propriétaires du nord du Kentucky.",
    localCare: "Soins vétérinaires locaux et indépendants pour chiens et chats.",
    allRightsReserved: "Tous droits réservés.",
    privacy: "Politique de confidentialité et conditions SMS",
    contentPortal: "Portail de contenu",
    adminPortal: "Portail d’administration",
    ourPractice: "Notre clinique",
    locallyOwnedCare: "Soins vétérinaires détenus localement",
    allLocations: "Tous les établissements",
    findClinic: "Trouver une clinique",
    menuTitle: "Menu de Veterinary Medical Centers",
    menuDescription: "Parcourez les principaux liens du site Veterinary Medical Centers.",
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
    emailAddress: "Adresse e-mail",
    emailPlaceholder: "Votre adresse e-mail",
    subscribe: "S’abonner",
    newsletterThanks: "Merci. L’intégration de la newsletter pourra être connectée ultérieurement.",
    invalidEmail: "Saisissez une adresse e-mail valide.",
    communicationTitle: "Aide linguistique et communication",
    communicationNotice:
      "Veterinary Medical Centers est une petite clinique locale. Nous ne pouvons pas toujours garantir la présence d’un interprète. Pour faciliter la communication, notre équipe peut utiliser des outils de traduction automatique, qui peuvent comporter des erreurs. Dites-nous si quelque chose n’est pas clair.",
    appointmentCommunicationNotice:
      "Veterinary Medical Centers est une petite clinique locale. Nous ne pouvons pas toujours garantir la présence d’un interprète. Pour faciliter la communication, notre équipe peut utiliser des outils de traduction automatique, qui peuvent comporter des erreurs. Dites-nous si quelque chose n’est pas clair. L’interface du formulaire est traduite pour votre commodité, mais l’autorisation juridique reste en anglais. Demandez à notre équipe si quelque chose n’est pas clair avant de l’examiner et de l’accepter."
  },
  hi: {
    language: "भाषा",
    translationTitle: "स्वचालित अनुवाद",
    translationNotice:
      "आपकी सुविधा के लिए इस पृष्ठ का स्वचालित अनुवाद किया गया है। कुछ शब्द गलत हो सकते हैं। सहायता के लिए कृपया हमारी टीम से संपर्क करें।",
    unavailableTitle: "यह पृष्ठ आपकी चुनी हुई भाषा में उपलब्ध नहीं है",
    unavailableNotice:
      "हमें खेद है, लेकिन यह पृष्ठ अभी केवल अंग्रेज़ी में उपलब्ध है। इसमें लेख, विस्तृत सेवा और स्थान पृष्ठ, फ़ॉर्म, अपॉइंटमेंट टूल और कानूनी जानकारी शामिल हैं।",
    continueEnglish: "अंग्रेज़ी में जारी रखें",
    skipToContent: "सामग्री पर जाएँ",
    about: "हमारे बारे में",
    services: "सेवाएँ",
    newPatients: "नए मरीज़",
    resources: "संसाधन",
    contact: "संपर्क",
    patientPortal: "मरीज़ पोर्टल",
    onlinePharmacy: "ऑनलाइन फ़ार्मेसी",
    newPatientForm: "नए मरीज़ का फ़ॉर्म",
    bookAppointment: "अपॉइंटमेंट बुक करें",
    callUsNow: "अभी कॉल करें",
    mainMenu: "मुख्य मेनू",
    navigate: "नेविगेट करें",
    onlineTools: "ऑनलाइन टूल",
    stayInLoop: "जानकारी पाते रहें।",
    newsletterBody: "उत्तरी केंटकी के पालतू पशु मालिकों के लिए मासिक स्वास्थ्य सुझाव और क्लिनिक अपडेट।",
    localCare: "कुत्तों और बिल्लियों के लिए स्थानीय और स्वतंत्र पशु चिकित्सा देखभाल।",
    allRightsReserved: "सर्वाधिकार सुरक्षित।",
    privacy: "गोपनीयता नीति और SMS शर्तें",
    contentPortal: "कंटेंट पोर्टल",
    adminPortal: "एडमिन पोर्टल",
    ourPractice: "हमारा क्लिनिक",
    locallyOwnedCare: "स्थानीय स्वामित्व वाली पशु चिकित्सा देखभाल",
    allLocations: "सभी स्थान",
    findClinic: "क्लिनिक खोजें",
    menuTitle: "Veterinary Medical Centers मेनू",
    menuDescription: "Veterinary Medical Centers वेबसाइट के मुख्य लिंक देखें।",
    openMenu: "मेनू खोलें",
    closeMenu: "मेनू बंद करें",
    emailAddress: "ईमेल पता",
    emailPlaceholder: "आपका ईमेल पता",
    subscribe: "सदस्यता लें",
    newsletterThanks: "धन्यवाद। न्यूज़लेटर एकीकरण बाद में जोड़ा जा सकता है।",
    invalidEmail: "मान्य ईमेल पता दर्ज करें।",
    communicationTitle: "भाषा और संवाद सहायता",
    communicationNotice:
      "Veterinary Medical Centers एक छोटा स्थानीय क्लिनिक है। हमारे पास हमेशा दुभाषिया उपलब्ध नहीं हो सकता। आपसे संवाद करने में सहायता के लिए हमारी टीम स्वचालित अनुवाद टूल का उपयोग कर सकती है, जिनमें गलतियाँ हो सकती हैं। यदि कुछ स्पष्ट न हो तो कृपया हमें बताएँ।",
    appointmentCommunicationNotice:
      "Veterinary Medical Centers एक छोटा स्थानीय क्लिनिक है। हमारे पास हमेशा दुभाषिया उपलब्ध नहीं हो सकता। आपसे संवाद करने में सहायता के लिए हमारी टीम स्वचालित अनुवाद टूल का उपयोग कर सकती है, जिनमें गलतियाँ हो सकती हैं। यदि कुछ स्पष्ट न हो तो कृपया हमें बताएँ। आपकी सुविधा के लिए फ़ॉर्म का इंटरफ़ेस अनुवादित है, लेकिन कानूनी अनुमति अंग्रेज़ी में ही रहेगी। इसकी समीक्षा और स्वीकृति से पहले कुछ अस्पष्ट हो तो हमारी टीम से पूछें।"
  },
  zh: {
    language: "语言",
    translationTitle: "自动翻译",
    translationNotice: "本页面已为方便您阅读而自动翻译。部分措辞可能不准确。如需帮助，请联系我们的团队。",
    unavailableTitle: "此页面尚未提供您所选择的语言版本",
    unavailableNotice: "很抱歉，此页面目前仅提供英文版本，包括文章、详细服务和地点页面、表格、预约工具以及法律信息。",
    continueEnglish: "继续查看英文版",
    skipToContent: "跳到主要内容",
    about: "关于我们",
    services: "服务",
    newPatients: "新患者",
    resources: "资源",
    contact: "联系我们",
    patientPortal: "患者门户",
    onlinePharmacy: "网上药房",
    newPatientForm: "新患者表格",
    bookAppointment: "预约",
    callUsNow: "立即致电",
    mainMenu: "主菜单",
    navigate: "导航",
    onlineTools: "在线工具",
    stayInLoop: "获取最新信息。",
    newsletterBody: "为北肯塔基州宠物主人提供每月宠物健康提示和诊所动态。",
    localCare: "为猫狗提供本地独立经营的兽医护理。",
    allRightsReserved: "版权所有。",
    privacy: "隐私政策和短信条款",
    contentPortal: "内容门户",
    adminPortal: "管理门户",
    ourPractice: "我们的诊所",
    locallyOwnedCare: "本地经营的兽医护理",
    allLocations: "所有地点",
    findClinic: "查找诊所",
    menuTitle: "Veterinary Medical Centers 菜单",
    menuDescription: "浏览 Veterinary Medical Centers 网站的主要链接。",
    openMenu: "打开菜单",
    closeMenu: "关闭菜单",
    emailAddress: "电子邮件地址",
    emailPlaceholder: "您的电子邮件地址",
    subscribe: "订阅",
    newsletterThanks: "谢谢。新闻简报集成可稍后连接。",
    invalidEmail: "请输入有效的电子邮件地址。",
    communicationTitle: "语言与沟通支持",
    communicationNotice:
      "Veterinary Medical Centers 是一家小型本地诊所，我们可能无法始终提供口译员。为了帮助与您沟通，我们的团队可能会使用自动翻译工具，而这些工具可能会出错。如有任何内容不清楚，请告诉我们。",
    appointmentCommunicationNotice:
      "Veterinary Medical Centers 是一家小型本地诊所，我们可能无法始终提供口译员。为了帮助与您沟通，我们的团队可能会使用自动翻译工具，而这些工具可能会出错。如有任何内容不清楚，请告诉我们。表格界面已为方便您使用而翻译，但法律授权内容仍为英文。在查看并接受该授权之前，如有任何不清楚之处，请咨询我们的团队。"
  }
} as const;

export function getMessages(locale: Locale) {
  return messages[locale];
}

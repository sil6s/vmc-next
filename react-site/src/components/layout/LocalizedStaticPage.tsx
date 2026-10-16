import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarCheck, FileText, MapPin, PawPrint, Phone, Stethoscope } from "lucide-react";
import { localizedStaticPages } from "@/data/localized-static-pages";
import { getLocation, type LocationPage } from "@/data/locations";
import { localizedHref, type Locale } from "@/lib/i18n";
import { site } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { ContactForm } from "@/components/forms/ContactForm";
import { CommunicationSupportNotice } from "@/components/layout/CommunicationSupportNotice";

const pageVisuals: Record<string, { hero: string; heroAlt: string; sections: readonly string[] }> = {
  "/": {
    hero: "/images/cat-closeup-hero.png",
    heroAlt: "Cat receiving a gentle veterinary exam at Veterinary Medical Centers",
    sections: ["/images/veterinary-care-hero.jpg", "/images/vet-stock2.jpg", "/images/fort-thomas-clinic.jpg"]
  },
  "/about/": {
    hero: "/images/kristi-baker-portrait.webp",
    heroAlt: "Veterinary Medical Centers veterinary team",
    sections: ["/images/kristi-baker-portrait.webp", "/images/fort-thomas-clinic.jpg", "/images/independence-clinic.jpg"]
  },
  "/services/": {
    hero: "/images/veterinary-care-hero.jpg",
    heroAlt: "Veterinary care for a pet at Veterinary Medical Centers",
    sections: ["/images/vet-stock-1 (1).jpg", "/images/vet-stock2.jpg", "/images/cat-hero.png"]
  },
  "/new-patients/": {
    hero: "/images/vet-stock-1 (1).jpg",
    heroAlt: "A pet owner preparing for a veterinary visit",
    sections: ["/images/vet-stock2.jpg", "/images/fort-thomas-clinic.jpg", "/images/independence-clinic.jpg"]
  },
  "/locations/": {
    hero: "/images/northern-kentucky-vet-hero.jpg",
    heroAlt: "Northern Kentucky veterinary care",
    sections: ["/images/fort-thomas-town.webp", "/images/indepedence-town.webp", "/images/fort-thomas-clinic.jpg"]
  },
  "/contact/": {
    hero: "/images/vet-stock2.jpg",
    heroAlt: "Veterinary Medical Centers team member helping a pet owner",
    sections: ["/images/fort-thomas-clinic.jpg", "/images/independence-clinic.jpg", "/images/veterinary-care-hero.jpg"]
  },
  "/vet-near-me/": {
    hero: "/images/northern-kentucky-vet-hero.jpg",
    heroAlt: "Veterinary Medical Centers in Northern Kentucky",
    sections: ["/images/fort-thomas-clinic.jpg", "/images/independence-clinic.jpg", "/images/veterinary-care-hero.jpg"]
  }
};

const supportingCopy: Record<Exclude<Locale, "en">, {
  galleryEyebrow: string;
  galleryTitle: string;
  galleryBody: string;
  toolsEyebrow: string;
  toolsTitle: string;
  toolsBody: string;
  locationsEyebrow: string;
  locationsTitle: string;
  tools: readonly { title: string; body: string; href: string; icon: typeof CalendarCheck }[];
}> = {
  es: {
    galleryEyebrow: "Atención en VMC",
    galleryTitle: "Cuidado atento para mascotas y familias",
    galleryBody: "Nuestras clínicas están diseñadas para apoyar visitas cómodas, conversaciones claras y atención continua para perros y gatos.",
    toolsEyebrow: "Herramientas en línea",
    toolsTitle: "Administre la atención de su mascota",
    toolsBody: "Use estos accesos rápidos para solicitar una visita, encontrar servicios o prepararse para su primera cita.",
    locationsEyebrow: "Ubicaciones",
    locationsTitle: "Elija la clínica más conveniente",
    tools: [
      { title: "Solicitar una cita", body: "Solicite una visita con nuestro equipo local.", href: "/book-appointment/", icon: CalendarCheck },
      { title: "Explorar servicios", body: "Conozca la atención disponible para perros y gatos.", href: "/services/", icon: Stethoscope },
      { title: "Nuevos pacientes", body: "Prepárese para la primera visita de su mascota.", href: "/new-patients/", icon: FileText },
      { title: "Contactar al equipo", body: "Envíe una pregunta no urgente a nuestra clínica.", href: "/contact/", icon: PawPrint }
    ]
  },
  fr: {
    galleryEyebrow: "Soins chez VMC",
    galleryTitle: "Des soins attentifs pour les animaux et leurs familles",
    galleryBody: "Nos cliniques sont conçues pour favoriser des visites confortables, des échanges clairs et un suivi continu pour les chiens et les chats.",
    toolsEyebrow: "Outils en ligne",
    toolsTitle: "Gérez les soins de votre animal",
    toolsBody: "Utilisez ces accès rapides pour demander une visite, découvrir les services ou préparer votre premier rendez-vous.",
    locationsEyebrow: "Établissements",
    locationsTitle: "Choisissez la clinique la plus pratique",
    tools: [
      { title: "Demander un rendez-vous", body: "Demandez une visite avec notre équipe locale.", href: "/book-appointment/", icon: CalendarCheck },
      { title: "Découvrir les services", body: "Découvrez les soins proposés aux chiens et aux chats.", href: "/services/", icon: Stethoscope },
      { title: "Nouveaux patients", body: "Préparez la première visite de votre animal.", href: "/new-patients/", icon: FileText },
      { title: "Contacter l’équipe", body: "Envoyez une question non urgente à notre clinique.", href: "/contact/", icon: PawPrint }
    ]
  },
  hi: {
    galleryEyebrow: "VMC में देखभाल",
    galleryTitle: "पालतू पशुओं और परिवारों के लिए ध्यानपूर्ण देखभाल",
    galleryBody: "हमारे क्लिनिक कुत्तों और बिल्लियों के लिए आरामदायक मुलाकात, स्पष्ट बातचीत और निरंतर देखभाल में सहायता के लिए बनाए गए हैं।",
    toolsEyebrow: "ऑनलाइन टूल",
    toolsTitle: "अपने पालतू पशु की देखभाल प्रबंधित करें",
    toolsBody: "मुलाकात का अनुरोध करने, सेवाएँ देखने या पहली अपॉइंटमेंट की तैयारी के लिए इन त्वरित लिंक का उपयोग करें।",
    locationsEyebrow: "स्थान",
    locationsTitle: "सबसे सुविधाजनक क्लिनिक चुनें",
    tools: [
      { title: "अपॉइंटमेंट का अनुरोध करें", body: "हमारी स्थानीय टीम के साथ मुलाकात का अनुरोध करें।", href: "/book-appointment/", icon: CalendarCheck },
      { title: "सेवाएँ देखें", body: "कुत्तों और बिल्लियों के लिए उपलब्ध देखभाल जानें।", href: "/services/", icon: Stethoscope },
      { title: "नए मरीज़", body: "अपने पालतू पशु की पहली मुलाकात की तैयारी करें।", href: "/new-patients/", icon: FileText },
      { title: "टीम से संपर्क करें", body: "हमारे क्लिनिक को गैर-तत्काल प्रश्न भेजें।", href: "/contact/", icon: PawPrint }
    ]
  },
  zh: {
    galleryEyebrow: "VMC 诊疗",
    galleryTitle: "为宠物和家庭提供细致照护",
    galleryBody: "我们的诊所旨在为猫狗提供更舒适的就诊体验、清晰沟通和持续照护。",
    toolsEyebrow: "在线工具",
    toolsTitle: "在线管理宠物护理",
    toolsBody: "使用这些快捷入口申请就诊、了解服务或为第一次预约做好准备。",
    locationsEyebrow: "诊所地点",
    locationsTitle: "选择最方便的诊所",
    tools: [
      { title: "申请预约", body: "向我们的本地团队申请就诊。", href: "/book-appointment/", icon: CalendarCheck },
      { title: "了解服务", body: "查看为猫狗提供的护理服务。", href: "/services/", icon: Stethoscope },
      { title: "新患者", body: "为宠物的第一次就诊做好准备。", href: "/new-patients/", icon: FileText },
      { title: "联系团队", body: "向诊所发送非紧急问题。", href: "/contact/", icon: PawPrint }
    ]
  }
};

function clinicCopy(locale: Exclude<Locale, "en">, location: LocationPage) {
  const clinic = location.shortName;
  const copy = {
    es: {
      eyebrow: "Clínica veterinaria local",
      title: `Veterinario en ${clinic}, Kentucky, para perros y gatos`,
      body: `Veterinary Medical Centers ofrece atención veterinaria local y atenta para perros y gatos cerca de ${clinic}. Nuestro equipo le ayuda con visitas de bienestar, vacunas, enfermedades y atención continua.`,
      careTitle: "Atención clara para cada etapa de la vida",
      careBody: `Desde la primera visita hasta los años de mascota mayor, nuestro equipo de ${clinic} se toma el tiempo para escuchar, explicar sus opciones y ayudarle a decidir el siguiente paso.`,
      servicesTitle: "Servicios veterinarios para su mascota",
      servicesBody: "Ofrecemos exámenes de bienestar, vacunas, atención dental, diagnóstico, visitas por enfermedad y orientación preventiva para perros y gatos.",
      book: "Solicitar una cita",
      call: "Llamar a la clínica"
    },
    fr: {
      eyebrow: "Clinique vétérinaire locale",
      title: `Vétérinaire à ${clinic}, Kentucky, pour chiens et chats`,
      body: `Veterinary Medical Centers propose des soins vétérinaires locaux et attentionnés pour les chiens et les chats près de ${clinic}. Notre équipe vous accompagne pour le bien-être, les vaccins, les maladies et le suivi continu.`,
      careTitle: "Des soins clairs à chaque étape de la vie",
      careBody: `De la première visite aux années de vieillesse, notre équipe de ${clinic} prend le temps d’écouter, d’expliquer vos options et de vous aider à choisir la prochaine étape.`,
      servicesTitle: "Services vétérinaires pour votre animal",
      servicesBody: "Nous proposons des examens de santé, des vaccins, des soins dentaires, des diagnostics, des consultations pour maladie et des conseils préventifs pour les chiens et les chats.",
      book: "Demander un rendez-vous",
      call: "Appeler la clinique"
    },
    hi: {
      eyebrow: "स्थानीय पशु चिकित्सा क्लिनिक",
      title: `${clinic}, Kentucky में कुत्तों और बिल्लियों के लिए पशु चिकित्सक`,
      body: `Veterinary Medical Centers ${clinic} के पास कुत्तों और बिल्लियों के लिए स्थानीय, ध्यानपूर्ण पशु चिकित्सा प्रदान करता है। हमारी टीम वेलनेस, टीकाकरण, बीमारी और निरंतर देखभाल में मदद करती है।`,
      careTitle: "जीवन के हर चरण के लिए स्पष्ट देखभाल",
      careBody: `पहली यात्रा से लेकर वरिष्ठ वर्षों तक, हमारी ${clinic} टीम सुनने, विकल्प समझाने और अगला कदम तय करने में मदद करने के लिए समय लेती है।`,
      servicesTitle: "आपके पालतू पशु के लिए सेवाएँ",
      servicesBody: "हम कुत्तों और बिल्लियों के लिए वेलनेस जांच, टीकाकरण, दंत चिकित्सा, निदान, बीमारी की यात्राएँ और निवारक मार्गदर्शन प्रदान करते हैं।",
      book: "अपॉइंटमेंट का अनुरोध करें",
      call: "क्लिनिक को कॉल करें"
    },
    zh: {
      eyebrow: "本地兽医诊所",
      title: `${clinic}, Kentucky 的犬猫兽医服务`,
      body: `Veterinary Medical Centers 为 ${clinic} 附近的犬猫提供贴心的本地兽医服务。我们的团队可协助健康检查、疫苗接种、疾病就诊和持续照护。`,
      careTitle: "伴随宠物每个生命阶段的清晰照护",
      careBody: `从初次就诊到老年阶段，我们的 ${clinic} 团队都会认真倾听、解释选择，并帮助您决定下一步。`,
      servicesTitle: "为您的宠物提供的兽医服务",
      servicesBody: "我们为犬猫提供健康检查、疫苗接种、牙科护理、诊断、疾病就诊和预防指导。",
      book: "预约就诊",
      call: "致电诊所"
    }
  } as const;

  return copy[locale];
}

function LocalizedClinicPage({ locale, location }: { locale: Exclude<Locale, "en">; location: LocationPage }) {
  const copy = clinicCopy(locale, location);
  const bookingHref = localizedHref("/book-appointment/", locale);
  const serviceLabels: Record<Exclude<Locale, "en">, readonly string[]> = {
    es: ["Bienestar", "Vacunas", "Atención dental"],
    fr: ["Bien-être", "Vaccins", "Soins dentaires"],
    hi: ["वेलनेस", "टीकाकरण", "दंत देखभाल"],
    zh: ["健康检查", "疫苗接种", "牙科护理"]
  };

  return (
    <>
      <section className="localized-page-hero">
        <div className="localized-page-hero-copy">
          <p className="eyebrow">{copy.eyebrow}</p>
          <h1>{copy.title}</h1>
          <p>{copy.body}</p>
          <div className="hero-actions">
            <Button href={bookingHref}>{copy.book}</Button>
            <Button href={`tel:${location.tel}`} variant="ghost">{copy.call}</Button>
          </div>
        </div>
        <div className="localized-page-hero-image">
          <Image src={location.image} alt="" fill priority sizes="(max-width: 900px) 100vw, 48vw" />
        </div>
      </section>

      <Section tone="white" eyebrow={location.address} title={copy.careTitle} intro={copy.careBody}>
        <div className="quick-links-grid">
          <a className="quick-link-card" href={`tel:${location.tel}`}>
            <span><strong>{location.phone}</strong><small>{copy.call}</small></span>
            <Phone aria-hidden="true" size={18} />
          </a>
          <Link className="quick-link-card" href={bookingHref}>
            <span><strong>{copy.book}</strong><small>{location.address}</small></span>
            <CalendarCheck aria-hidden="true" size={18} />
          </Link>
        </div>
      </Section>

      <Section tone="cream" eyebrow="Veterinary Medical Centers" title={copy.servicesTitle} intro={copy.servicesBody}>
        <div className="card-grid">
          {serviceLabels[locale].map((label) => (
            <article className="card" key={label}><h3>{label}</h3><p>{copy.servicesBody}</p></article>
          ))}
        </div>
      </Section>
    </>
  );
}

export function LocalizedStaticPage({ locale, pathname }: { locale: Exclude<Locale, "en">; pathname: string }) {
  const content = localizedStaticPages[locale][pathname];
  const locationSlug = pathname.match(/^\/locations\/([^/]+)\/?$/)?.[1];
  const location = locationSlug ? getLocation(locationSlug) : undefined;
  const visuals = pageVisuals[pathname] || pageVisuals["/"];
  const supporting = supportingCopy[locale];
  const secondaryHref = pathname === "/vet-near-me/" ? "/locations/" : pathname === "/about/" ? "/services/" : "/contact/";
  if (!content && location) {
    return <LocalizedClinicPage locale={locale} location={location} />;
  }

  if (!content) {
    return null;
  }

  return (
    <>
      <section className="localized-page-hero">
        <div className="localized-page-hero-copy">
          <p className="eyebrow">{content.eyebrow}</p>
          <h1>{content.title}</h1>
          <p>{content.body}</p>
          <div className="hero-actions">
            <Button href={localizedHref("/book-appointment/", locale)}>{content.primaryLabel}</Button>
            <Button href={localizedHref(secondaryHref, locale)} variant="ghost">
              {content.secondaryLabel}
            </Button>
          </div>
        </div>
        <div className="localized-page-hero-image">
          <Image src={visuals.hero} alt={visuals.heroAlt} fill priority sizes="(max-width: 900px) 100vw, 48vw" />
        </div>
      </section>

      {content.sections.map((section, index) => (
        <Section
          key={`${section.title}-${index}`}
          tone={index % 2 === 0 ? "white" : "cream"}
          eyebrow={section.eyebrow}
          title={section.title}
          intro={section.items ? section.body : undefined}
        >
          {section.items && (
            <div className="card-grid">
              {section.items.map((item) => (
                <article className="card" key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
          )}
          {!section.items && (
            <div className={`localized-feature-image${index % 2 === 1 ? " is-reversed" : ""}`}>
              <Image src={visuals.sections[index % visuals.sections.length]} alt="" width={960} height={620} sizes="(max-width: 900px) 100vw, 52vw" />
              <div>
                <p>{section.body}</p>
                <Button href={localizedHref(index === 0 ? "/services/" : "/book-appointment/", locale)} variant="ghost">
                  {index === 0 ? supporting.tools[1].title : content.primaryLabel}
                </Button>
              </div>
            </div>
          )}
        </Section>
      ))}

      <Section tone="cream" eyebrow={supporting.galleryEyebrow} title={supporting.galleryTitle} intro={supporting.galleryBody}>
        <div className="localized-photo-grid">
          {visuals.sections.map((image, index) => (
            <div key={image}>
              <Image src={image} alt="" fill sizes="(max-width: 720px) 100vw, 33vw" />
              <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="white" eyebrow={supporting.toolsEyebrow} title={supporting.toolsTitle} intro={supporting.toolsBody}>
        <div className="quick-links-grid">
          {supporting.tools.map(({ title, body, href, icon: Icon }) => (
            <Link href={localizedHref(href, locale)} className="quick-link-card" key={title}>
              <span>
                <strong>{title}</strong>
                <small>{body}</small>
              </span>
              <Icon aria-hidden="true" size={18} />
            </Link>
          ))}
        </div>
      </Section>

      {pathname === "/contact/" && (
        <Section tone="white">
          <CommunicationSupportNotice locale={locale} />
          <div className="localized-contact-form" id="message-form">
            <ContactForm locale={locale} />
          </div>
        </Section>
      )}

      <Section tone="cream" eyebrow={supporting.locationsEyebrow} title={supporting.locationsTitle}>
        <div className="localized-location-grid">
          {site.locations.map((location, index) => (
            <article className="card" key={location.id}>
              <div className="localized-location-image">
                <Image
                  src={index === 0 ? "/images/fort-thomas-clinic.jpg" : "/images/independence-clinic.jpg"}
                  alt=""
                  fill
                  sizes="(max-width: 720px) 100vw, 50vw"
                />
              </div>
              <MapPin aria-hidden="true" size={21} />
              <h3>{location.name}</h3>
              <p>{location.address}</p>
              <a href={`tel:${location.tel}`}>
                <Phone aria-hidden="true" size={15} />
                {location.phone}
              </a>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="red">
        <div className="cta-panel">
          <h2>{content.title}</h2>
          <div className="hero-actions">
            <Button href={localizedHref("/book-appointment/", locale)} variant="secondary">{content.primaryLabel}</Button>
            <Link className="btn btn-ghost" href={localizedHref("/contact/", locale)}>
              {content.secondaryLabel}
              <ArrowRight aria-hidden="true" size={16} />
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}

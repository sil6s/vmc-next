import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CircleAlert, Phone } from "lucide-react";
import { OttoInlineWidget } from "@/components/sections/OttoInlineWidget";
import { Container } from "@/components/ui/Container";
import { locations } from "@/data/locations";
import {
  onlineHelpLocations,
  onlineHelpPath,
  onlineHelpRequests,
  type OnlineHelpLocationSlug,
  type OnlineHelpRequestSlug
} from "@/lib/online-help";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, JsonLd, webpageSchema } from "@/lib/schema";
import { headers } from "next/headers";
import { isLocale, type Locale } from "@/lib/i18n";

type Params = { params: Promise<{ location: string; request: string }> };

const ottoSupportCopy: Record<Locale, { noticeTitle: string; notice: string; helpTitle: string; help: (clinic: string) => string; call: (clinic: string) => string }> = {
  en: {
    noticeTitle: "",
    notice: "",
    helpTitle: "Need a hand?",
    help: (clinic) => `Otto, our secure software partner, manages the form above. We cannot control its availability or language. If it does not load, you run into a problem, or you would rather speak with someone, call our ${clinic} team and we will help right away.`,
    call: (clinic) => `Call ${clinic}`
  },
  es: {
    noticeTitle: "Aviso sobre la herramienta de reservas",
    notice: "El formulario de reservas de arriba es proporcionado y administrado por Otto, nuestro socio de software seguro. Es posible que parte de la herramienta aparezca en inglés.",
    helpTitle: "¿Necesita ayuda?",
    help: (clinic) => `Otto, nuestro socio de software seguro, administra el formulario de arriba. No podemos controlar su disponibilidad ni su idioma. Si no se carga, tiene algún problema o prefiere hablar con alguien, llame al equipo de ${clinic} y le ayudaremos de inmediato.`,
    call: (clinic) => `Llame a ${clinic}`
  },
  fr: {
    noticeTitle: "À propos de l’outil de réservation",
    notice: "Le formulaire de réservation ci-dessus est fourni et géré par Otto, notre partenaire logiciel sécurisé. Certaines parties de l’outil peuvent apparaître en anglais.",
    helpTitle: "Besoin d’aide ?",
    help: (clinic) => `Otto, notre partenaire logiciel sécurisé, gère le formulaire ci-dessus. Nous ne pouvons pas contrôler sa disponibilité ni sa langue. S’il ne se charge pas, si vous rencontrez un problème ou si vous préférez parler à quelqu’un, appelez l’équipe de ${clinic} et nous vous aiderons immédiatement.`,
    call: (clinic) => `Appeler ${clinic}`
  },
  hi: {
    noticeTitle: "बुकिंग टूल के बारे में सूचना",
    notice: "ऊपर दिया गया बुकिंग फॉर्म हमारे सुरक्षित सॉफ्टवेयर पार्टनर Otto द्वारा उपलब्ध कराया और प्रबंधित किया जाता है। टूल के कुछ हिस्से अंग्रेज़ी में दिखाई दे सकते हैं।",
    helpTitle: "मदद चाहिए?",
    help: (clinic) => `ऊपर दिया गया फॉर्म हमारे सुरक्षित सॉफ्टवेयर पार्टनर Otto द्वारा प्रबंधित किया जाता है। हम इसकी उपलब्धता या भाषा को नियंत्रित नहीं कर सकते। यदि यह लोड नहीं होता, कोई समस्या आती है, या आप किसी से बात करना चाहते हैं, तो ${clinic} टीम को कॉल करें। हम तुरंत मदद करेंगे।`,
    call: (clinic) => `${clinic} को कॉल करें`
  },
  zh: {
    noticeTitle: "关于预约工具的说明",
    notice: "上方的预约表单由我们的安全软件合作伙伴 Otto 提供和管理。工具中的部分内容可能仍以英文显示。",
    helpTitle: "需要帮助吗？",
    help: (clinic) => `上方表单由我们的安全软件合作伙伴 Otto 管理。我们无法控制其可用性或语言。如果它没有加载、您遇到问题，或您希望直接与工作人员交流，请致电 ${clinic} 团队，我们会立即帮助您。`,
    call: (clinic) => `致电 ${clinic}`
  }
};

function getHelpRoute(locationParam: string, requestParam: string) {
  const helpLocation = onlineHelpLocations[locationParam as OnlineHelpLocationSlug];
  const helpRequest = onlineHelpRequests[requestParam as OnlineHelpRequestSlug];
  return helpLocation && helpRequest ? { helpLocation, helpRequest } : null;
}

function transactionSentence(request: OnlineHelpRequestSlug, clinicName: string) {
  switch (request) {
    case "direct-booking":
      return `You're booking with our ${clinicName} team. Choose an available time below.`;
    case "refill":
      return `You're requesting a medication or food refill from our ${clinicName} team. Share the details below.`;
    case "records":
      return `You're requesting medical records from our ${clinicName} team. Tell us what you need below.`;
    case "virtual-consult":
      return `You're requesting a virtual consultation with our ${clinicName} team. Start the request below.`;
    case "general":
      return `You're messaging our ${clinicName} team. Send your question below and we'll help route it.`;
  }
}

export function generateStaticParams() {
  return Object.values(onlineHelpLocations).flatMap((location) =>
    Object.values(onlineHelpRequests).map((request) => ({
      location: location.slug,
      request: request.slug
    }))
  );
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { location: locationParam, request: requestParam } = await params;
  const route = getHelpRoute(locationParam, requestParam);
  if (!route) return { robots: { index: false, follow: false } };

  return pageMetadata({
    title: `${route.helpLocation.title} | ${route.helpRequest.label}`,
    description: route.helpLocation.description,
    path: onlineHelpPath(route.helpLocation.slug, route.helpRequest.slug),
    noIndex: true
  });
}

export default async function OnlineHelpPage({ params }: Params) {
  const { location: locationParam, request: requestParam } = await params;
  const route = getHelpRoute(locationParam, requestParam);
  if (!route) notFound();

  const { helpLocation, helpRequest } = route;
  const clinic = locations.find((item) => item.slug === helpLocation.locationSlug);
  if (!clinic) notFound();
  const localeHeader = (await headers()).get("x-vmc-locale");
  const locale = isLocale(localeHeader) ? localeHeader : "en";
  const copy = ottoSupportCopy[locale];
  const lead = transactionSentence(helpRequest.slug, clinic.shortName);

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Online Help", path: onlineHelpPath(helpLocation.slug, helpRequest.slug) }
  ];

  return (
    <>
      <section className="online-help-body">
        <Container>
          <div className="online-help-transaction">
            <header className="online-help-header">
              <p className="eyebrow">ONLINE HELP · {clinic.shortName.toUpperCase()}</p>
              <h1>{helpRequest.label}</h1>
              <p>{lead}</p>
            </header>

            <div className="online-help-widget-card">
              <OttoInlineWidget
                key={`${helpLocation.clinicId}-${helpRequest.slug}`}
                clinicId={helpLocation.clinicId}
                clinicName={clinic.shortName}
                requestType={helpRequest.requestType}
              />
            </div>

            {locale !== "en" && (
              <aside className="online-help-translation-notice" aria-label={copy.noticeTitle}>
                <CircleAlert aria-hidden="true" size={22} />
                <div>
                  <strong>{copy.noticeTitle}</strong>
                  <p>{copy.notice}</p>
                </div>
              </aside>
            )}

            <div className="online-help-fallback">
              <div>
                <h2>{copy.helpTitle}</h2>
                <p>{copy.help(clinic.shortName)}</p>
              </div>
              <a href={`tel:${clinic.tel}`} className="online-help-call-button">
                <Phone aria-hidden="true" size={18} />
                {copy.call(clinic.shortName)} · {clinic.phone}
              </a>
            </div>
          </div>
        </Container>
      </section>

      <JsonLd
        data={[
          webpageSchema(onlineHelpPath(helpLocation.slug, helpRequest.slug), helpLocation.seoTitle, helpLocation.description),
          breadcrumbSchema(crumbs)
        ]}
      />
    </>
  );
}

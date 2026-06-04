import type { Locale } from "@/lib/i18n";
import { getStaticPageTranslationDictionary } from "@/data/static-page-translations";

type SeoCopy = { title: string; description: string };
type TranslatedLocale = Exclude<Locale, "en">;

export const localizedSeo: Record<TranslatedLocale, Record<"/" | "/about/" | "/services/", SeoCopy>> = {
  es: {
    "/": {
      title: "Veterinario en el norte de Kentucky para perros y gatos | Fort Thomas e Independence",
      description: "Atención veterinaria local para perros y gatos en el norte de Kentucky, con ubicaciones convenientes en Fort Thomas e Independence."
    },
    "/about/": {
      title: "Veterinario independiente en el norte de Kentucky | VMC",
      description: "Conozca Veterinary Medical Centers, una clínica veterinaria independiente que atiende a perros y gatos en Fort Thomas e Independence."
    },
    "/services/": {
      title: "Servicios veterinarios en el norte de Kentucky | Atención para perros y gatos",
      description: "Explore servicios veterinarios para perros y gatos, incluidos exámenes, vacunas, atención dental, cirugía, diagnóstico y visitas por enfermedad."
    }
  },
  fr: {
    "/": {
      title: "Vétérinaire dans le nord du Kentucky pour chiens et chats | Fort Thomas et Independence",
      description: "Soins vétérinaires locaux pour chiens et chats dans le nord du Kentucky, avec des établissements à Fort Thomas et Independence."
    },
    "/about/": {
      title: "Vétérinaire indépendant dans le nord du Kentucky | VMC",
      description: "Découvrez Veterinary Medical Centers, une clinique vétérinaire indépendante pour chiens et chats à Fort Thomas et Independence."
    },
    "/services/": {
      title: "Services vétérinaires dans le nord du Kentucky | Soins pour chiens et chats",
      description: "Découvrez les examens, vaccins, soins dentaires, chirurgies, diagnostics et consultations pour animaux malades."
    }
  },
  hi: {
    "/": {
      title: "उत्तरी केंटकी में कुत्तों और बिल्लियों के पशु चिकित्सक | Fort Thomas और Independence",
      description: "Fort Thomas और Independence में सुविधाजनक स्थानों के साथ कुत्तों और बिल्लियों के लिए स्थानीय पशु चिकित्सा देखभाल।"
    },
    "/about/": {
      title: "उत्तरी केंटकी में स्वतंत्र पशु चिकित्सक | VMC",
      description: "Veterinary Medical Centers के बारे में जानें, जो Fort Thomas और Independence में कुत्तों और बिल्लियों की देखभाल करता है।"
    },
    "/services/": {
      title: "उत्तरी केंटकी में पशु चिकित्सा सेवाएँ | कुत्ते और बिल्ली की देखभाल",
      description: "जांच, टीके, दंत देखभाल, सर्जरी, निदान और बीमारी की मुलाकात सहित पशु चिकित्सा सेवाएँ देखें।"
    }
  },
  zh: {
    "/": {
      title: "北肯塔基州猫狗兽医 | Fort Thomas 和 Independence",
      description: "在 Fort Thomas 和 Independence 提供方便的本地猫狗兽医护理。"
    },
    "/about/": {
      title: "北肯塔基州独立经营兽医诊所 | VMC",
      description: "了解 Veterinary Medical Centers，这是一家在 Fort Thomas 和 Independence 为猫狗提供护理的独立兽医诊所。"
    },
    "/services/": {
      title: "北肯塔基州兽医服务 | 猫狗护理",
      description: "了解健康检查、疫苗、牙科护理、手术、诊断和生病宠物就诊等兽医服务。"
    }
  }
};

export function localizedServiceSeo(locale: TranslatedLocale, title: string, description: string): SeoCopy {
  const suffix: Record<TranslatedLocale, string> = {
    es: "en el norte de Kentucky | Veterinary Medical Centers",
    fr: "dans le nord du Kentucky | Veterinary Medical Centers",
    hi: "उत्तरी केंटकी में | Veterinary Medical Centers",
    zh: "北肯塔基州 | Veterinary Medical Centers"
  };
  const descriptionPrefix: Record<TranslatedLocale, string> = {
    es: "Información sobre este servicio veterinario para perros y gatos en Fort Thomas e Independence. ",
    fr: "Informations sur ce service vétérinaire pour chiens et chats à Fort Thomas et Independence. ",
    hi: "Fort Thomas और Independence में कुत्तों और बिल्लियों के लिए इस पशु चिकित्सा सेवा की जानकारी। ",
    zh: "了解在 Fort Thomas 和 Independence 为猫狗提供的此项兽医服务。"
  };

  const translatedTitle = getStaticPageTranslationDictionary(locale)[title] || title;
  return {
    title: `${translatedTitle} ${suffix[locale]}`,
    description: `${descriptionPrefix[locale]}${description}`
  };
}

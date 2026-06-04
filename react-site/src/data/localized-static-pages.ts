import type { Locale } from "@/lib/i18n";

type LocalizedSection = {
  eyebrow: string;
  title: string;
  body: string;
  items?: readonly { title: string; body: string }[];
};

export type LocalizedStaticPageContent = {
  eyebrow: string;
  title: string;
  body: string;
  primaryLabel: string;
  secondaryLabel: string;
  sections: readonly LocalizedSection[];
};

type TranslatedLocale = Exclude<Locale, "en">;

export const localizedStaticPages: Record<TranslatedLocale, Record<string, LocalizedStaticPageContent>> = {
  es: {
    "/": {
      eyebrow: "Veterinary Medical Centers",
      title: "Atención veterinaria para perros y gatos en el norte de Kentucky",
      body: "Somos una clínica veterinaria local con centros convenientes en Fort Thomas e Independence. Nuestro equipo ofrece atención basada en relaciones, comunicación clara y citas fáciles de solicitar.",
      primaryLabel: "Solicitar una cita",
      secondaryLabel: "Contactar al equipo",
      sections: [
        { eyebrow: "Atención local", title: "Una clínica que conoce a su mascota", body: "Cuidamos a perros y gatos durante todas las etapas de su vida, desde la primera visita hasta el cuidado de mascotas mayores.", items: [
          { title: "Relaciones duraderas", body: "Conocemos el historial, las necesidades y la personalidad de su mascota." },
          { title: "Comunicación clara", body: "Explicamos lo que vemos, las opciones disponibles y los siguientes pasos." },
          { title: "Visitas tranquilas", body: "Usamos un manejo paciente y cuidadoso para ayudar a que las visitas sean más cómodas." }
        ] },
        { eyebrow: "Servicios", title: "Atención completa cerca de casa", body: "Ofrecemos exámenes de bienestar, vacunas, atención dental, diagnóstico, cirugía, visitas por enfermedad y orientación preventiva." },
        { eyebrow: "Ubicaciones", title: "Fort Thomas e Independence", body: "Elija la ubicación del norte de Kentucky que sea más conveniente para usted y su mascota." }
      ]
    },
    "/about/": {
      eyebrow: "Acerca de Veterinary Medical Centers",
      title: "Atención veterinaria independiente y personal",
      body: "Veterinary Medical Centers fue creada para familias que desean una relación continua con un equipo veterinario local.",
      primaryLabel: "Solicitar una cita",
      secondaryLabel: "Ver servicios",
      sections: [
        { eyebrow: "Nuestra filosofía", title: "Cuidado que se siente personal", body: "La propiedad independiente nos permite centrarnos en relaciones estables, recomendaciones prácticas y decisiones claras." },
        { eyebrow: "Nuestro equipo", title: "Un equipo que escucha", body: "Nuestros veterinarios, técnicos, asistentes y personal de atención al cliente trabajan juntos para que cada visita sea organizada y comprensible." },
        { eyebrow: "Nuestra comunidad", title: "Dos ubicaciones, un mismo estándar", body: "Atendemos a familias de Fort Thomas, Independence y comunidades cercanas del norte de Kentucky." }
      ]
    },
    "/services/": {
      eyebrow: "Servicios veterinarios",
      title: "Atención para perros y gatos en cada etapa de la vida",
      body: "Nuestro equipo ayuda a mantener a las mascotas sanas y a responder cuando algo cambia.",
      primaryLabel: "Reservar una cita",
      secondaryLabel: "Contactar al equipo",
      sections: [
        { eyebrow: "Atención preventiva", title: "Bienestar, vacunas y prevención", body: "Los exámenes regulares ayudan a detectar cambios temprano y a mantener al día las vacunas y la prevención de parásitos." },
        { eyebrow: "Salud y comodidad", title: "Odontología, diagnóstico y visitas por enfermedad", body: "Evaluamos síntomas, salud dental y cambios de comportamiento para recomendar el siguiente paso adecuado." },
        { eyebrow: "Procedimientos", title: "Cirugía y apoyo durante la recuperación", body: "Explicamos la preparación, el procedimiento y el cuidado posterior con claridad." }
      ]
    },
    "/new-patients/": {
      eyebrow: "Nuevos pacientes",
      title: "Bienvenidos nuevos perros, gatos y sus familias",
      body: "Queremos que su primera visita sea sencilla, informativa y cómoda para su mascota.",
      primaryLabel: "Iniciar solicitud de nuevo paciente",
      secondaryLabel: "Contactar al equipo",
      sections: [
        { eyebrow: "Primera visita", title: "Qué puede esperar", body: "Revisaremos el historial de su mascota, hablaremos sobre sus preguntas y realizaremos un examen físico completo." },
        { eyebrow: "Preparación", title: "Qué debe traer", body: "Traiga registros de vacunas, medicamentos actuales, notas de visitas anteriores y cualquier pregunta que desee comentar." },
        { eyebrow: "Siguientes pasos", title: "Un plan claro para su mascota", body: "Al final de la visita, recibirá recomendaciones prácticas y orientación para el seguimiento." }
      ]
    },
    "/locations/": {
      eyebrow: "Nuestras ubicaciones",
      title: "Atención veterinaria en Fort Thomas e Independence",
      body: "Dos clínicas convenientes del norte de Kentucky ofrecen el mismo cuidado atento para perros y gatos.",
      primaryLabel: "Solicitar una cita",
      secondaryLabel: "Contactar al equipo",
      sections: [
        { eyebrow: "Fort Thomas", title: "Veterinary Medical Centers of Fort Thomas", body: "2000 Memorial Parkway, Fort Thomas, KY 41075. Llame al (859) 442-4420." },
        { eyebrow: "Independence", title: "Veterinary Medical Centers of Independence", body: "4147 Madison Pike, Independence, KY 41051. Llame al (859) 356-2242." },
        { eyebrow: "Atención cercana", title: "Servimos al norte de Kentucky", body: "Atendemos a familias de Fort Thomas, Independence, Newport, Bellevue, Dayton, Covington, Erlanger y comunidades cercanas." }
      ]
    },
    "/contact/": {
      eyebrow: "Contacto",
      title: "Comuníquese con Veterinary Medical Centers",
      body: "Llame a la clínica más cercana, solicite una cita o envíe un mensaje para recibir ayuda con el siguiente paso.",
      primaryLabel: "Solicitar una cita",
      secondaryLabel: "Enviar un mensaje",
      sections: [
        { eyebrow: "Fort Thomas", title: "Llame al (859) 442-4420", body: "2000 Memorial Parkway, Fort Thomas, KY 41075." },
        { eyebrow: "Independence", title: "Llame al (859) 356-2242", body: "4147 Madison Pike, Independence, KY 41051." },
        { eyebrow: "Necesidades urgentes", title: "Llame directamente si su mascota necesita ayuda pronto", body: "Si no está seguro de si su mascota necesita atención urgente, llame y nuestro equipo le ayudará a decidir el siguiente paso más seguro." }
      ]
    },
    "/vet-near-me/": {
      eyebrow: "Veterinario cerca de mí",
      title: "¿Busca un veterinario cerca de usted en el norte de Kentucky?",
      body: "Veterinary Medical Centers ofrece atención local para perros y gatos en Fort Thomas e Independence.",
      primaryLabel: "Solicitar una cita",
      secondaryLabel: "Ver ubicaciones",
      sections: [
        { eyebrow: "Cerca de casa", title: "Una clínica fácil de encontrar y en la que puede confiar", body: "Nuestras dos ubicaciones atienden a familias de todo el norte de Kentucky y áreas cercanas de Cincinnati." },
        { eyebrow: "Atención completa", title: "Servicios para las necesidades de su mascota", body: "Ofrecemos bienestar, vacunas, odontología, cirugía, diagnóstico, visitas por enfermedad y cuidado para mascotas mayores." }
      ]
    }
  },
  fr: {
    "/": {
      eyebrow: "Veterinary Medical Centers",
      title: "Soins vétérinaires pour chiens et chats dans le nord du Kentucky",
      body: "Nous sommes une clinique vétérinaire locale avec des établissements pratiques à Fort Thomas et Independence. Notre équipe privilégie les relations durables, une communication claire et des rendez-vous faciles à demander.",
      primaryLabel: "Demander un rendez-vous",
      secondaryLabel: "Contacter l’équipe",
      sections: [
        { eyebrow: "Soins locaux", title: "Une clinique qui connaît votre animal", body: "Nous accompagnons les chiens et les chats à chaque étape de leur vie, de la première visite aux soins des animaux âgés.", items: [
          { title: "Relations durables", body: "Nous apprenons à connaître l’histoire, les besoins et la personnalité de votre animal." },
          { title: "Communication claire", body: "Nous expliquons nos observations, les options disponibles et les prochaines étapes." },
          { title: "Visites plus calmes", body: "Nous utilisons une approche patiente et douce pour rendre les visites plus confortables." }
        ] },
        { eyebrow: "Services", title: "Des soins complets près de chez vous", body: "Nous proposons des examens de santé, vaccins, soins dentaires, diagnostics, chirurgie, consultations pour maladie et conseils préventifs." },
        { eyebrow: "Établissements", title: "Fort Thomas et Independence", body: "Choisissez l’établissement du nord du Kentucky le plus pratique pour vous et votre animal." }
      ]
    },
    "/about/": {
      eyebrow: "À propos de Veterinary Medical Centers",
      title: "Des soins vétérinaires indépendants et personnalisés",
      body: "Veterinary Medical Centers a été créé pour les familles qui souhaitent une relation continue avec une équipe vétérinaire locale.",
      primaryLabel: "Demander un rendez-vous",
      secondaryLabel: "Voir les services",
      sections: [
        { eyebrow: "Notre philosophie", title: "Des soins qui restent personnels", body: "Notre indépendance nous permet de privilégier des relations stables, des recommandations pratiques et des décisions claires." },
        { eyebrow: "Notre équipe", title: "Une équipe à votre écoute", body: "Nos vétérinaires, techniciens, assistants et conseillers travaillent ensemble pour rendre chaque visite organisée et compréhensible." },
        { eyebrow: "Notre communauté", title: "Deux établissements, un même niveau de soins", body: "Nous accompagnons les familles de Fort Thomas, Independence et des communautés voisines du nord du Kentucky." }
      ]
    },
    "/services/": {
      eyebrow: "Services vétérinaires",
      title: "Des soins pour chiens et chats à chaque étape de leur vie",
      body: "Notre équipe aide les animaux à rester en bonne santé et intervient lorsque quelque chose change.",
      primaryLabel: "Prendre rendez-vous",
      secondaryLabel: "Contacter l’équipe",
      sections: [
        { eyebrow: "Prévention", title: "Bien-être, vaccins et prévention", body: "Les examens réguliers permettent de détecter les changements tôt et de maintenir les vaccins et la prévention antiparasitaire à jour." },
        { eyebrow: "Santé et confort", title: "Dentisterie, diagnostic et consultations pour maladie", body: "Nous évaluons les symptômes, la santé dentaire et les changements de comportement afin de recommander la bonne prochaine étape." },
        { eyebrow: "Interventions", title: "Chirurgie et accompagnement pendant la récupération", body: "Nous expliquons clairement la préparation, l’intervention et les soins après l’opération." }
      ]
    },
    "/new-patients/": {
      eyebrow: "Nouveaux patients",
      title: "Bienvenue aux nouveaux chiens, chats et à leurs familles",
      body: "Nous voulons que votre première visite soit simple, informative et confortable pour votre animal.",
      primaryLabel: "Commencer une demande",
      secondaryLabel: "Contacter l’équipe",
      sections: [
        { eyebrow: "Première visite", title: "À quoi vous attendre", body: "Nous examinerons l’historique de votre animal, discuterons de vos questions et effectuerons un examen physique complet." },
        { eyebrow: "Préparation", title: "Ce qu’il faut apporter", body: "Apportez les dossiers de vaccination, les médicaments actuels, les notes de visites précédentes et vos questions." },
        { eyebrow: "Prochaines étapes", title: "Un plan clair pour votre animal", body: "À la fin de la visite, vous recevrez des recommandations pratiques et des conseils de suivi." }
      ]
    },
    "/locations/": {
      eyebrow: "Nos établissements",
      title: "Soins vétérinaires à Fort Thomas et Independence",
      body: "Deux cliniques pratiques du nord du Kentucky offrent les mêmes soins attentifs aux chiens et aux chats.",
      primaryLabel: "Demander un rendez-vous",
      secondaryLabel: "Contacter l’équipe",
      sections: [
        { eyebrow: "Fort Thomas", title: "Veterinary Medical Centers of Fort Thomas", body: "2000 Memorial Parkway, Fort Thomas, KY 41075. Appelez le (859) 442-4420." },
        { eyebrow: "Independence", title: "Veterinary Medical Centers of Independence", body: "4147 Madison Pike, Independence, KY 41051. Appelez le (859) 356-2242." },
        { eyebrow: "Soins de proximité", title: "Au service du nord du Kentucky", body: "Nous accompagnons les familles de Fort Thomas, Independence, Newport, Bellevue, Dayton, Covington, Erlanger et des communautés voisines." }
      ]
    },
    "/contact/": {
      eyebrow: "Contact",
      title: "Contactez Veterinary Medical Centers",
      body: "Appelez la clinique la plus proche, demandez un rendez-vous ou envoyez un message pour obtenir de l’aide sur la prochaine étape.",
      primaryLabel: "Demander un rendez-vous",
      secondaryLabel: "Envoyer un message",
      sections: [
        { eyebrow: "Fort Thomas", title: "Appelez le (859) 442-4420", body: "2000 Memorial Parkway, Fort Thomas, KY 41075." },
        { eyebrow: "Independence", title: "Appelez le (859) 356-2242", body: "4147 Madison Pike, Independence, KY 41051." },
        { eyebrow: "Besoins urgents", title: "Appelez directement si votre animal a besoin d’aide rapidement", body: "Si vous ne savez pas si votre animal a besoin de soins urgents, appelez-nous et notre équipe vous aidera à choisir l’étape la plus sûre." }
      ]
    },
    "/vet-near-me/": {
      eyebrow: "Vétérinaire près de chez moi",
      title: "Vous cherchez un vétérinaire près de chez vous dans le nord du Kentucky ?",
      body: "Veterinary Medical Centers propose des soins locaux pour chiens et chats à Fort Thomas et Independence.",
      primaryLabel: "Demander un rendez-vous",
      secondaryLabel: "Voir les établissements",
      sections: [
        { eyebrow: "Près de chez vous", title: "Une clinique facile d’accès et digne de confiance", body: "Nos deux établissements accompagnent les familles du nord du Kentucky et des zones voisines de Cincinnati." },
        { eyebrow: "Soins complets", title: "Des services adaptés aux besoins de votre animal", body: "Nous proposons bien-être, vaccins, dentisterie, chirurgie, diagnostic, consultations pour maladie et soins pour animaux âgés." }
      ]
    }
  },
  hi: {
    "/": {
      eyebrow: "Veterinary Medical Centers",
      title: "उत्तरी केंटकी में कुत्तों और बिल्लियों के लिए पशु चिकित्सा देखभाल",
      body: "हम Fort Thomas और Independence में सुविधाजनक स्थानों वाली स्थानीय पशु चिकित्सा क्लिनिक हैं। हमारी टीम लंबे संबंधों, स्पष्ट संवाद और आसान अपॉइंटमेंट अनुरोध पर ध्यान देती है।",
      primaryLabel: "अपॉइंटमेंट का अनुरोध करें",
      secondaryLabel: "टीम से संपर्क करें",
      sections: [
        { eyebrow: "स्थानीय देखभाल", title: "एक क्लिनिक जो आपके पालतू पशु को जानता है", body: "हम पहली मुलाकात से लेकर वरिष्ठ पालतू पशु देखभाल तक, जीवन के हर चरण में कुत्तों और बिल्लियों की देखभाल करते हैं।", items: [
          { title: "लंबे संबंध", body: "हम आपके पालतू पशु के इतिहास, ज़रूरतों और स्वभाव को समझते हैं।" },
          { title: "स्पष्ट संवाद", body: "हम अपनी जांच, उपलब्ध विकल्प और अगले कदम समझाते हैं।" },
          { title: "शांत मुलाकातें", body: "हम मुलाकात को अधिक आरामदायक बनाने के लिए धैर्यपूर्ण और कोमल तरीके अपनाते हैं।" }
        ] },
        { eyebrow: "सेवाएँ", title: "घर के पास संपूर्ण देखभाल", body: "हम वेलनेस जांच, टीकाकरण, दंत देखभाल, निदान, सर्जरी, बीमारी की मुलाकात और निवारक मार्गदर्शन प्रदान करते हैं।" },
        { eyebrow: "स्थान", title: "Fort Thomas और Independence", body: "उत्तरी केंटकी का वह स्थान चुनें जो आपके और आपके पालतू पशु के लिए सबसे सुविधाजनक हो।" }
      ]
    },
    "/about/": {
      eyebrow: "Veterinary Medical Centers के बारे में",
      title: "स्वतंत्र और व्यक्तिगत पशु चिकित्सा देखभाल",
      body: "Veterinary Medical Centers उन परिवारों के लिए बनाया गया है जो स्थानीय पशु चिकित्सा टीम के साथ निरंतर संबंध चाहते हैं।",
      primaryLabel: "अपॉइंटमेंट का अनुरोध करें",
      secondaryLabel: "सेवाएँ देखें",
      sections: [
        { eyebrow: "हमारी सोच", title: "व्यक्तिगत महसूस होने वाली देखभाल", body: "स्वतंत्र स्वामित्व हमें स्थिर संबंधों, व्यावहारिक सुझावों और स्पष्ट निर्णयों पर ध्यान देने देता है।" },
        { eyebrow: "हमारी टीम", title: "एक टीम जो सुनती है", body: "हमारे पशु चिकित्सक, तकनीशियन, सहायक और ग्राहक सेवा कर्मचारी हर मुलाकात को व्यवस्थित और समझने में आसान बनाते हैं।" },
        { eyebrow: "हमारा समुदाय", title: "दो स्थान, देखभाल का एक मानक", body: "हम Fort Thomas, Independence और आसपास के उत्तरी केंटकी समुदायों के परिवारों की सेवा करते हैं।" }
      ]
    },
    "/services/": {
      eyebrow: "पशु चिकित्सा सेवाएँ",
      title: "जीवन के हर चरण में कुत्तों और बिल्लियों की देखभाल",
      body: "हमारी टीम पालतू पशुओं को स्वस्थ रखने और किसी बदलाव पर सही सहायता देने में मदद करती है।",
      primaryLabel: "अपॉइंटमेंट बुक करें",
      secondaryLabel: "टीम से संपर्क करें",
      sections: [
        { eyebrow: "निवारक देखभाल", title: "वेलनेस, टीके और रोकथाम", body: "नियमित जांच बदलावों को जल्दी पहचानने और टीकों तथा परजीवी रोकथाम को अद्यतन रखने में मदद करती है।" },
        { eyebrow: "स्वास्थ्य और आराम", title: "दंत चिकित्सा, निदान और बीमारी की मुलाकातें", body: "हम लक्षणों, दंत स्वास्थ्य और व्यवहार में बदलाव का मूल्यांकन करके सही अगले कदम की सलाह देते हैं।" },
        { eyebrow: "प्रक्रियाएँ", title: "सर्जरी और स्वस्थ होने के दौरान सहायता", body: "हम तैयारी, प्रक्रिया और बाद की देखभाल को स्पष्ट रूप से समझाते हैं।" }
      ]
    },
    "/new-patients/": {
      eyebrow: "नए मरीज़",
      title: "नए कुत्तों, बिल्लियों और उनके परिवारों का स्वागत है",
      body: "हम चाहते हैं कि आपकी पहली मुलाकात सरल, जानकारीपूर्ण और आपके पालतू पशु के लिए आरामदायक हो।",
      primaryLabel: "नए मरीज़ का अनुरोध शुरू करें",
      secondaryLabel: "टीम से संपर्क करें",
      sections: [
        { eyebrow: "पहली मुलाकात", title: "क्या अपेक्षा करें", body: "हम आपके पालतू पशु के इतिहास की समीक्षा करेंगे, आपके प्रश्नों पर बात करेंगे और पूरी शारीरिक जांच करेंगे।" },
        { eyebrow: "तैयारी", title: "क्या साथ लाएँ", body: "टीकाकरण रिकॉर्ड, वर्तमान दवाएँ, पिछली मुलाकात के नोट और अपने प्रश्न साथ लाएँ।" },
        { eyebrow: "अगले कदम", title: "आपके पालतू पशु के लिए स्पष्ट योजना", body: "मुलाकात के अंत में आपको व्यावहारिक सुझाव और फॉलो-अप मार्गदर्शन मिलेगा।" }
      ]
    },
    "/locations/": {
      eyebrow: "हमारे स्थान",
      title: "Fort Thomas और Independence में पशु चिकित्सा देखभाल",
      body: "उत्तरी केंटकी की दो सुविधाजनक क्लिनिक कुत्तों और बिल्लियों के लिए समान ध्यानपूर्ण देखभाल प्रदान करती हैं।",
      primaryLabel: "अपॉइंटमेंट का अनुरोध करें",
      secondaryLabel: "टीम से संपर्क करें",
      sections: [
        { eyebrow: "Fort Thomas", title: "Veterinary Medical Centers of Fort Thomas", body: "2000 Memorial Parkway, Fort Thomas, KY 41075। कॉल करें: (859) 442-4420।" },
        { eyebrow: "Independence", title: "Veterinary Medical Centers of Independence", body: "4147 Madison Pike, Independence, KY 41051। कॉल करें: (859) 356-2242।" },
        { eyebrow: "पास की देखभाल", title: "उत्तरी केंटकी की सेवा में", body: "हम Fort Thomas, Independence, Newport, Bellevue, Dayton, Covington, Erlanger और आसपास के समुदायों के परिवारों की सेवा करते हैं।" }
      ]
    },
    "/contact/": {
      eyebrow: "संपर्क",
      title: "Veterinary Medical Centers से संपर्क करें",
      body: "निकटतम क्लिनिक को कॉल करें, अपॉइंटमेंट का अनुरोध करें या अगले कदम में सहायता के लिए संदेश भेजें।",
      primaryLabel: "अपॉइंटमेंट का अनुरोध करें",
      secondaryLabel: "संदेश भेजें",
      sections: [
        { eyebrow: "Fort Thomas", title: "(859) 442-4420 पर कॉल करें", body: "2000 Memorial Parkway, Fort Thomas, KY 41075।" },
        { eyebrow: "Independence", title: "(859) 356-2242 पर कॉल करें", body: "4147 Madison Pike, Independence, KY 41051।" },
        { eyebrow: "तत्काल ज़रूरतें", title: "यदि आपके पालतू पशु को जल्दी सहायता चाहिए तो सीधे कॉल करें", body: "यदि आप निश्चित नहीं हैं कि तत्काल देखभाल की आवश्यकता है या नहीं, तो कॉल करें और हमारी टीम सबसे सुरक्षित अगले कदम में मदद करेगी।" }
      ]
    },
    "/vet-near-me/": {
      eyebrow: "मेरे पास पशु चिकित्सक",
      title: "उत्तरी केंटकी में अपने पास पशु चिकित्सक खोज रहे हैं?",
      body: "Veterinary Medical Centers Fort Thomas और Independence में कुत्तों और बिल्लियों के लिए स्थानीय देखभाल प्रदान करता है।",
      primaryLabel: "अपॉइंटमेंट का अनुरोध करें",
      secondaryLabel: "स्थान देखें",
      sections: [
        { eyebrow: "घर के पास", title: "आसानी से पहुँचने योग्य और भरोसेमंद क्लिनिक", body: "हमारे दोनों स्थान उत्तरी केंटकी और आसपास के Cincinnati क्षेत्रों के परिवारों की सेवा करते हैं।" },
        { eyebrow: "संपूर्ण देखभाल", title: "आपके पालतू पशु की ज़रूरतों के लिए सेवाएँ", body: "हम वेलनेस, टीके, दंत चिकित्सा, सर्जरी, निदान, बीमारी की मुलाकात और वरिष्ठ पालतू पशु देखभाल प्रदान करते हैं।" }
      ]
    }
  },
  zh: {
    "/": {
      eyebrow: "Veterinary Medical Centers",
      title: "为北肯塔基州的猫狗提供兽医护理",
      body: "我们是一家本地兽医诊所，在 Fort Thomas 和 Independence 设有便利地点。我们的团队重视长期关系、清晰沟通和便捷的预约申请。",
      primaryLabel: "申请预约",
      secondaryLabel: "联系团队",
      sections: [
        { eyebrow: "本地护理", title: "了解您宠物的诊所", body: "从第一次就诊到老年宠物护理，我们陪伴猫狗生命中的每个阶段。", items: [
          { title: "长期关系", body: "我们会了解您宠物的病史、需求和性格。" },
          { title: "清晰沟通", body: "我们会解释检查结果、可选方案和下一步安排。" },
          { title: "更轻松的就诊", body: "我们采用耐心温和的方式，帮助宠物获得更舒适的就诊体验。" }
        ] },
        { eyebrow: "服务", title: "家附近的全面护理", body: "我们提供健康检查、疫苗接种、牙科护理、诊断、手术、疾病就诊和预防指导。" },
        { eyebrow: "地点", title: "Fort Thomas 和 Independence", body: "请选择对您和宠物最方便的北肯塔基州诊所地点。" }
      ]
    },
    "/about/": {
      eyebrow: "关于 Veterinary Medical Centers",
      title: "独立经营且个性化的兽医护理",
      body: "Veterinary Medical Centers 为希望与本地兽医团队建立长期关系的家庭而创立。",
      primaryLabel: "申请预约",
      secondaryLabel: "查看服务",
      sections: [
        { eyebrow: "我们的理念", title: "更具人情味的护理", body: "独立经营使我们能够专注于稳定关系、实用建议和清晰决策。" },
        { eyebrow: "我们的团队", title: "认真倾听的团队", body: "我们的兽医、技术人员、助理和客户服务团队共同努力，让每次就诊都井然有序且易于理解。" },
        { eyebrow: "我们的社区", title: "两个地点，同一护理标准", body: "我们为 Fort Thomas、Independence 以及北肯塔基州周边社区的家庭提供服务。" }
      ]
    },
    "/services/": {
      eyebrow: "兽医服务",
      title: "为猫狗生命各阶段提供护理",
      body: "我们的团队帮助宠物保持健康，并在出现变化时提供合适的帮助。",
      primaryLabel: "预约",
      secondaryLabel: "联系团队",
      sections: [
        { eyebrow: "预防护理", title: "健康检查、疫苗和预防", body: "定期检查有助于及早发现变化，并确保疫苗接种和寄生虫预防保持最新。" },
        { eyebrow: "健康与舒适", title: "牙科、诊断和疾病就诊", body: "我们评估症状、牙齿健康和行为变化，以建议合适的下一步。" },
        { eyebrow: "医疗程序", title: "手术和恢复支持", body: "我们会清楚说明准备工作、医疗程序和术后护理。" }
      ]
    },
    "/new-patients/": {
      eyebrow: "新患者",
      title: "欢迎新的猫狗患者及其家庭",
      body: "我们希望您的第一次就诊简单、信息充分，并让宠物感到舒适。",
      primaryLabel: "开始新患者申请",
      secondaryLabel: "联系团队",
      sections: [
        { eyebrow: "第一次就诊", title: "就诊流程", body: "我们会查看宠物病史、讨论您的问题，并进行全面的身体检查。" },
        { eyebrow: "准备工作", title: "需要携带的资料", body: "请携带疫苗记录、当前用药、以前的就诊记录以及您想讨论的问题。" },
        { eyebrow: "下一步", title: "为宠物制定清晰计划", body: "就诊结束时，您将获得实用建议和后续护理指导。" }
      ]
    },
    "/locations/": {
      eyebrow: "我们的地点",
      title: "Fort Thomas 和 Independence 的兽医护理",
      body: "北肯塔基州两家便利诊所为猫狗提供同样细致的护理。",
      primaryLabel: "申请预约",
      secondaryLabel: "联系团队",
      sections: [
        { eyebrow: "Fort Thomas", title: "Veterinary Medical Centers of Fort Thomas", body: "2000 Memorial Parkway, Fort Thomas, KY 41075。电话：(859) 442-4420。" },
        { eyebrow: "Independence", title: "Veterinary Medical Centers of Independence", body: "4147 Madison Pike, Independence, KY 41051。电话：(859) 356-2242。" },
        { eyebrow: "附近护理", title: "服务北肯塔基州", body: "我们为 Fort Thomas、Independence、Newport、Bellevue、Dayton、Covington、Erlanger 及周边社区的家庭提供服务。" }
      ]
    },
    "/contact/": {
      eyebrow: "联系我们",
      title: "联系 Veterinary Medical Centers",
      body: "请致电最近的诊所、申请预约或发送消息，以获得下一步帮助。",
      primaryLabel: "申请预约",
      secondaryLabel: "发送消息",
      sections: [
        { eyebrow: "Fort Thomas", title: "致电 (859) 442-4420", body: "2000 Memorial Parkway, Fort Thomas, KY 41075。" },
        { eyebrow: "Independence", title: "致电 (859) 356-2242", body: "4147 Madison Pike, Independence, KY 41051。" },
        { eyebrow: "紧急需求", title: "如果宠物需要尽快获得帮助，请直接致电", body: "如果您不确定宠物是否需要紧急护理，请致电我们，团队会帮助您判断最安全的下一步。" }
      ]
    },
    "/vet-near-me/": {
      eyebrow: "附近的兽医",
      title: "正在寻找北肯塔基州附近的兽医吗？",
      body: "Veterinary Medical Centers 在 Fort Thomas 和 Independence 为猫狗提供本地护理。",
      primaryLabel: "申请预约",
      secondaryLabel: "查看地点",
      sections: [
        { eyebrow: "家附近", title: "交通便利且值得信赖的诊所", body: "我们的两个地点为北肯塔基州和 Cincinnati 周边地区的家庭提供服务。" },
        { eyebrow: "全面护理", title: "满足宠物需求的服务", body: "我们提供健康检查、疫苗、牙科、手术、诊断、疾病就诊和老年宠物护理。" }
      ]
    }
  }
};

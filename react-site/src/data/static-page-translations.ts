import type { Locale } from "@/lib/i18n";

type TranslationDictionary = Record<string, string>;
type TranslatedLocale = Exclude<Locale, "en">;

const common: Record<TranslatedLocale, TranslationDictionary> = {
  es: {
    "Home": "Inicio",
    "About": "Acerca de",
    "Services": "Servicios",
    "New Patients": "Nuevos pacientes",
    "Book Appointment": "Reservar cita",
    "Book an Appointment": "Reservar una cita",
    "Request an Appointment": "Solicitar una cita",
    "Call Our Team": "Llamar a nuestro equipo",
    "Call Fort Thomas": "Llamar a Fort Thomas",
    "Call Independence": "Llamar a Independence",
    "Get Directions": "Cómo llegar",
    "Learn more": "Más información",
    "View resource": "Ver recurso",
    "Next Steps": "Siguientes pasos",
    "Related Services": "Servicios relacionados",
    "Related services": "Servicios relacionados",
    "Related Resources": "Recursos relacionados",
    "Quick Summary": "Resumen rápido",
    "Best for": "Ideal para",
    "Available at": "Disponible en",
    "Typical next step": "Siguiente paso habitual",
    "What this helps with": "En qué ayuda",
    "Common reasons to schedule": "Motivos comunes para programar una cita",
    "What It Helps With": "En qué ayuda",
    "Guide": "Guía",
    "Signs to Watch For": "Señales a observar",
    "Our Approach": "Nuestro enfoque",
    "What to Expect": "Qué esperar",
    "Preparation": "Preparación",
    "Questions to Ask": "Preguntas para hacer",
    "Helpful Reference": "Referencia útil",
    "Local Care": "Atención local",
    "Trusted Education Sources": "Fuentes educativas confiables",
    "Book this service": "Reservar este servicio",
    "Locations": "Ubicaciones",
    "Appointment type": "Tipo de cita",
    "Read resource": "Leer recurso",
    "New patients welcome": "Nuevos pacientes bienvenidos",
    "Locally owned": "De propiedad local",
    "Dogs & cats": "Perros y gatos"
    ,
    "New here?": "¿Es nuevo?",
    "New to Northern Kentucky Veterinary Medical Centers? Start with a wellness visit, request an appointment, or message our team with questions.":
      "¿Es nuevo en Veterinary Medical Centers del norte de Kentucky? Comience con una visita de bienestar, solicite una cita o envíe sus preguntas a nuestro equipo.",
    "Message Our Team": "Enviar mensaje al equipo",
    "Explore Services": "Explorar servicios",
    "Same-week appointments": "Citas en la misma semana",
    "Fear-Free Certified": "Certificación Fear Free",
    "Dogs and cats": "Perros y gatos",
    "Wellness": "Bienestar",
    "Dental care": "Atención dental",
    "Surgery": "Cirugía",
    "Behavior support": "Apoyo de comportamiento",
    "Find Care": "Encontrar atención",
    "Local Vet Center": "Centro veterinario local",
    "Vet Services": "Servicios veterinarios",
    "New Clients": "Nuevos clientes",
    "First Visit": "Primera visita",
    "Northern Kentucky Locations": "Ubicaciones en el norte de Kentucky",
    "Local Service Area": "Área de servicio local",
    "Online Tools": "Herramientas en línea",
    "New puppy or kitten visit": "Visita para nuevo cachorro o gatito",
    "First exams, vaccines, and early-life guidance": "Primeros exámenes, vacunas y orientación inicial",
    "Routine wellness exam": "Examen de bienestar de rutina",
    "Checkups, vaccines, and prevention": "Revisiones, vacunas y prevención",
    "Dental care or bad breath": "Atención dental o mal aliento",
    "Breath, tartar, gums, and chewing": "Aliento, sarro, encías y masticación",
    "Skin, ear, or allergy concern": "Problema de piel, oído o alergia",
    "Itching, licking, odor, and irritation": "Picazón, lamido, olor e irritación",
    "Surgery or procedure questions": "Preguntas sobre cirugía o procedimientos",
    "Procedure planning and recovery support": "Planificación del procedimiento y apoyo en la recuperación",
    "Sick visit or urgent concern": "Visita por enfermedad o inquietud urgente",
    "New symptoms or behavior changes": "Nuevos síntomas o cambios de comportamiento",
    "Best for new pets and first-time visits": "Ideal para mascotas nuevas y primeras visitas",
    "Common reasons to book": "Motivos comunes para reservar",
    "Related care": "Atención relacionada",
    "Start here": "Comenzar aquí",
    "Explore vet services": "Explorar servicios veterinarios",
    "Independent ownership": "Propiedad independiente",
    "Continuity of care": "Continuidad de la atención",
    "Comfort-focused handling": "Manejo enfocado en la comodidad",
    "Full-service medicine": "Medicina integral",
    "Clear communication": "Comunicación clara",
    "Local NKY roots": "Raíces locales en el norte de Kentucky",
    "Why VMC": "Por qué VMC",
    "Our Story": "Nuestra historia",
    "Our Team": "Nuestro equipo",
    "Care": "Atención",
    "Independent Care": "Atención independiente",
    "Resources": "Recursos",
    "Choose Your Care Path": "Elija su tipo de atención",
    "Service Finder": "Buscador de servicios",
    "Browse Services": "Explorar servicios",
    "Choose by Situation": "Elegir según la situación",
    "Need Help Choosing?": "¿Necesita ayuda para elegir?",
    "Care Categories": "Categorías de atención",
    "Visit Flow": "Proceso de la visita",
    "Helpful Resources": "Recursos útiles",
    "Preventive Care": "Atención preventiva",
    "Medical Care": "Atención médica",
    "Dental & Surgery": "Odontología y cirugía",
    "Life Stage Care": "Atención por etapa de vida",
    "Call This Location": "Llamar a esta ubicación",
    "Book This Location": "Reservar en esta ubicación",
    "Request Appointment": "Solicitar cita",
    "Reviewed": "Revisado",
    "Service trust signals": "Señales de confianza del servicio",
    "Fort Thomas, KY · Independence, KY": "Fort Thomas, Kentucky · Independence, Kentucky",
    "Call for current hours": "Llame para conocer el horario actual",
    "Reference": "Referencia",
    "Helpful note": "Nota útil",
    "Client Reviews": "Reseñas de clientes",
    "What our community says.": "Lo que dice nuestra comunidad.",
    "4.8 average rating": "Calificación promedio de 4.8",
    "Google reviews from Fort Thomas and Independence pet families": "Reseñas de Google de familias de Fort Thomas e Independence",
    "Dr. Baker and her associates are amazing. They treat your pets like family and take the time to answer every question without rushing.":
      "La Dra. Baker y sus asociados son increíbles. Tratan a sus mascotas como familia y se toman el tiempo para responder cada pregunta sin apresurarse.",
    "From the moment we walked in, everything felt calm and thoughtful. The team took time to help my cat feel comfortable.":
      "Desde el momento en que entramos, todo se sentía tranquilo y considerado. El equipo se tomó el tiempo para ayudar a que mi gato se sintiera cómodo.",
    "The staff is gentle, kind, and professional. They explained pricing upfront and followed up the next day to check on my pet.":
      "El personal es amable, gentil y profesional. Explicaron los precios de antemano y llamaron al día siguiente para saber cómo estaba mi mascota.",
    "Our first visit could not have gone better. Everyone was kind, patient, and made sure our pet felt comfortable.":
      "Nuestra primera visita no pudo haber salido mejor. Todos fueron amables, pacientes y se aseguraron de que nuestra mascota se sintiera cómoda.",
    "Better care starts with listening carefully, explaining clearly, and knowing the pet and family in front of us.":
      "Una mejor atención comienza con escuchar con atención, explicar con claridad y conocer a la mascota y la familia frente a nosotros.",
    "Care team, RVTs, and client support": "Equipo de atención, técnicos veterinarios y apoyo al cliente",
    "Office leadership, registered veterinary technicians, assistants, and client service team members help make each visit organized, calmer, and easier to understand.":
      "El liderazgo de la clínica, los técnicos veterinarios registrados, los asistentes y el equipo de atención al cliente ayudan a que cada visita sea organizada, más tranquila y fácil de entender.",
    "Personal care looks like:": "La atención personalizada se ve así:",
    "Familiar faces": "Rostros familiares",
    "Comfort-focused visits": "Visitas enfocadas en la comodidad",
    "VMC is led locally, so decisions are made close to the pets, clients, and communities the team serves.":
      "VMC es dirigida localmente, por lo que las decisiones se toman cerca de las mascotas, los clientes y las comunidades a las que sirve el equipo.",
    "Familiar faces help your pet's history, preferences, and long-term health needs stay connected from visit to visit.":
      "Los rostros familiares ayudan a que el historial, las preferencias y las necesidades de salud a largo plazo de su mascota se mantengan conectados de visita en visita.",
    "The team uses a Fear Free mindset where possible, with thoughtful pacing and handling that respects each pet.":
      "El equipo utiliza una mentalidad Fear Free cuando es posible, con un ritmo y manejo cuidadosos que respetan a cada mascota.",
    "Dogs and cats can receive wellness care, sick visits, dental care, surgery, senior support, and ongoing guidance.":
      "Los perros y gatos pueden recibir atención de bienestar, visitas por enfermedad, atención dental, cirugía, apoyo para mascotas mayores y orientación continua.",
    "Recommendations are explained in practical language so families understand what matters now and what comes next.":
      "Las recomendaciones se explican en lenguaje práctico para que las familias entiendan qué importa ahora y qué viene después.",
    "With clinics in Fort Thomas and Independence, VMC supports pet owners across Northern Kentucky and Greater Cincinnati.":
      "Con clínicas en Fort Thomas e Independence, VMC apoya a los dueños de mascotas en todo el norte de Kentucky y el área metropolitana de Cincinnati.",
    "VMC resources": "Recursos de VMC",
    "Trusted pet care resources": "Recursos confiables de cuidado de mascotas"
    ,
    "From routine wellness exams and vaccines to dental care, diagnostics, surgery, and sick visits, Veterinary Medical Centers of Northern Kentucky provides relationship-based care for pets across Fort Thomas, Independence, and nearby NKY communities.":
      "Desde exámenes de bienestar y vacunas hasta atención dental, diagnóstico, cirugía y visitas por enfermedad, Veterinary Medical Centers of Northern Kentucky ofrece atención basada en relaciones para mascotas de Fort Thomas, Independence y comunidades cercanas.",
    "Locally owned veterinary care": "Atención veterinaria de propiedad local",
    "Two convenient NKY locations": "Dos ubicaciones convenientes en el norte de Kentucky",
    "Dogs, cats, puppies, and kittens": "Perros, gatos, cachorros y gatitos",
    "Preventive, medical, dental, and surgical services": "Servicios preventivos, médicos, dentales y quirúrgicos",
    "Preventive care": "Atención preventiva",
    "Wellness, vaccines, parasite prevention, and nutrition.": "Bienestar, vacunas, prevención de parásitos y nutrición.",
    "Sick or urgent concerns": "Problemas de enfermedad o urgentes",
    "New symptoms, diagnostics, skin, ear, and allergy care.": "Nuevos síntomas, diagnóstico y atención de piel, oídos y alergias.",
    "Oral exams, dental cleanings, and treatment planning.": "Exámenes orales, limpiezas dentales y planificación del tratamiento.",
    "Surgery and diagnostics": "Cirugía y diagnóstico",
    "Soft tissue surgery, spay and neuter, and lab work.": "Cirugía de tejidos blandos, esterilización y análisis de laboratorio.",
    "Start with a broad care type, then use the service browser below to compare specific appointments and next steps.":
      "Comience con un tipo general de atención y luego use el explorador de servicios para comparar citas específicas y los siguientes pasos.",
    "Choose a care category to quickly find the right service for your dog or cat. Each service includes clear next steps, what to expect, and when to schedule an appointment.":
      "Elija una categoría de atención para encontrar rápidamente el servicio adecuado para su perro o gato. Cada servicio incluye los siguientes pasos, qué esperar y cuándo programar una cita.",
    "All Services": "Todos los servicios",
    "Showing 12 services": "Mostrando 12 servicios",
    "My pet seems healthy but is due for care": "Mi mascota parece sana, pero necesita atención",
    "My pet is sick or acting different": "Mi mascota está enferma o actúa de manera diferente",
    "My pet has bad breath or trouble chewing": "Mi mascota tiene mal aliento o dificultad para masticar",
    "I have a new puppy or kitten": "Tengo un nuevo cachorro o gatito",
    "My pet may need surgery": "Mi mascota puede necesitar cirugía",
    "My pet is getting older": "Mi mascota está envejeciendo",
    "Recommended services:": "Servicios recomendados:",
    "You do not have to diagnose the problem before reaching out. Tell us what you are noticing and our team can help guide you toward the right appointment type.":
      "No tiene que diagnosticar el problema antes de comunicarse. Díganos qué está observando y nuestro equipo puede ayudarle a elegir el tipo de cita adecuado.",
    "If your pet is experiencing a medical emergency, contact an emergency veterinary hospital right away.":
      "Si su mascota tiene una emergencia médica, comuníquese de inmediato con un hospital veterinario de emergencia.",
    "The service browser is for choosing a specific appointment. These categories show how our team thinks about your pet's care plan over time.":
      "El explorador de servicios sirve para elegir una cita específica. Estas categorías muestran cómo nuestro equipo organiza el plan de atención de su mascota con el tiempo.",
    "Routine care helps protect your pet's health and gives your family a clear plan before small concerns become bigger problems.":
      "La atención de rutina ayuda a proteger la salud de su mascota y brinda a su familia un plan claro antes de que los problemas pequeños se vuelvan mayores.",
    "When something feels off, our team can evaluate symptoms, recommend testing, and explain practical treatment options.":
      "Cuando algo no parece estar bien, nuestro equipo puede evaluar los síntomas, recomendar pruebas y explicar opciones prácticas de tratamiento.",
    "For changing needs, dental concerns, or procedures, we focus on preparation, communication, comfort, and follow-through.":
      "Para necesidades cambiantes, problemas dentales o procedimientos, nos enfocamos en la preparación, la comunicación, la comodidad y el seguimiento.",
    "Dental, Surgical & Life Stage Care": "Atención dental, quirúrgica y por etapa de vida",
    "With two Northern Kentucky locations, Veterinary Medical Centers make it easier to choose care close to home.":
      "Con dos ubicaciones en el norte de Kentucky, Veterinary Medical Centers facilita elegir atención cerca de casa.",
    "Schedule the right appointment": "Programe la cita adecuada",
    "Share your concerns": "Comparta sus inquietudes",
    "Meet with our veterinary team": "Reúnase con nuestro equipo veterinario",
    "Review recommendations": "Revise las recomendaciones",
    "Leave with a clear plan": "Salga con un plan claro",
    "Common questions about veterinary services in Northern Kentucky.": "Preguntas comunes sobre servicios veterinarios en el norte de Kentucky.",
    "Schedule veterinary care for your dog or cat.": "Programe atención veterinaria para su perro o gato.",
    "Whether your pet is due for a checkup, needs dental care, or is showing new symptoms, Veterinary Medical Centers of Northern Kentucky is here to help.":
      "Ya sea que su mascota necesite una revisión, atención dental o presente nuevos síntomas, Veterinary Medical Centers of Northern Kentucky está aquí para ayudar."
  },
  fr: {
    "Home": "Accueil", "About": "À propos", "Services": "Services", "New Patients": "Nouveaux patients",
    "Book Appointment": "Prendre rendez-vous", "Book an Appointment": "Prendre rendez-vous", "Request an Appointment": "Demander un rendez-vous",
    "Call Our Team": "Appeler notre équipe", "Get Directions": "Itinéraire", "Learn more": "En savoir plus", "View resource": "Voir la ressource",
    "Next Steps": "Prochaines étapes", "Related Services": "Services associés", "Related services": "Services associés", "Related Resources": "Ressources associées",
    "Quick Summary": "Résumé rapide", "Best for": "Idéal pour", "Available at": "Disponible à", "Typical next step": "Prochaine étape habituelle",
    "What this helps with": "Ce que cela aide à traiter", "Common reasons to schedule": "Motifs courants de rendez-vous",
    "What It Helps With": "Ce que cela aide à traiter", "Guide": "Guide", "Signs to Watch For": "Signes à surveiller", "Our Approach": "Notre approche",
    "What to Expect": "À quoi s’attendre", "Preparation": "Préparation", "Questions to Ask": "Questions à poser", "Helpful Reference": "Référence utile",
    "Local Care": "Soins locaux", "Trusted Education Sources": "Sources éducatives fiables", "Book this service": "Réserver ce service",
    "Locations": "Établissements", "Appointment type": "Type de rendez-vous", "Read resource": "Lire la ressource", "New patients welcome": "Nouveaux patients bienvenus",
    "Locally owned": "Détenu localement", "Dogs & cats": "Chiens et chats",
    "Client Reviews": "Avis clients",
    "What our community says.": "Ce que dit notre communauté.",
    "4.8 average rating": "Note moyenne de 4,8",
    "Google reviews from Fort Thomas and Independence pet families": "Avis Google de familles d'animaux de Fort Thomas et Independence",
    "Dr. Baker and her associates are amazing. They treat your pets like family and take the time to answer every question without rushing.":
      "Dr. Baker et ses associés sont formidables. Ils traitent vos animaux comme des membres de la famille et prennent le temps de répondre à toutes les questions sans précipitation.",
    "From the moment we walked in, everything felt calm and thoughtful. The team took time to help my cat feel comfortable.":
      "Dès notre entrée, tout semblait calme et attentionné. L'équipe a pris le temps d'aider mon chat à se sentir à l'aise.",
    "The staff is gentle, kind, and professional. They explained pricing upfront and followed up the next day to check on my pet.":
      "Le personnel est doux, aimable et professionnel. Ils ont expliqué les tarifs dès le début et ont fait un suivi le lendemain pour prendre des nouvelles de mon animal.",
    "Our first visit could not have gone better. Everyone was kind, patient, and made sure our pet felt comfortable.":
      "Notre première visite ne pouvait pas mieux se passer. Tout le monde était aimable, patient et s'assurait que notre animal se sente à l'aise.",
    "Better care starts with listening carefully, explaining clearly, and knowing the pet and family in front of us.":
      "Des soins de meilleure qualité commencent par une écoute attentive, des explications claires et la connaissance de l'animal et de la famille devant nous.",
    "Care team, RVTs, and client support": "Équipe de soins, techniciens vétérinaires et service client",
    "Office leadership, registered veterinary technicians, assistants, and client service team members help make each visit organized, calmer, and easier to understand.":
      "La direction, les techniciens vétérinaires agréés, les assistants et l'équipe de service client contribuent à rendre chaque visite organisée, plus calme et plus facile à comprendre.",
    "Personal care looks like:": "Des soins personnalisés, cela ressemble à :",
    "Familiar faces": "Des visages familiers",
    "Comfort-focused visits": "Des visites axées sur le confort",
    "VMC resources": "Ressources VMC",
    "Trusted pet care resources": "Ressources fiables de soins pour animaux"
  },
  hi: {
    "Home": "होम", "About": "हमारे बारे में", "Services": "सेवाएँ", "New Patients": "नए मरीज़",
    "Book Appointment": "अपॉइंटमेंट बुक करें", "Book an Appointment": "अपॉइंटमेंट बुक करें", "Request an Appointment": "अपॉइंटमेंट का अनुरोध करें",
    "Call Our Team": "हमारी टीम को कॉल करें", "Get Directions": "दिशा-निर्देश", "Learn more": "और जानें", "View resource": "संसाधन देखें",
    "Next Steps": "अगले कदम", "Related Services": "संबंधित सेवाएँ", "Related services": "संबंधित सेवाएँ", "Related Resources": "संबंधित संसाधन",
    "Quick Summary": "त्वरित सारांश", "Best for": "इनके लिए उपयुक्त", "Available at": "यहाँ उपलब्ध", "Typical next step": "सामान्य अगला कदम",
    "What this helps with": "यह किसमें मदद करता है", "Common reasons to schedule": "अपॉइंटमेंट के सामान्य कारण",
    "What It Helps With": "यह किसमें मदद करता है", "Guide": "मार्गदर्शिका", "Signs to Watch For": "ध्यान देने योग्य संकेत", "Our Approach": "हमारा दृष्टिकोण",
    "What to Expect": "क्या अपेक्षा करें", "Preparation": "तैयारी", "Questions to Ask": "पूछने योग्य प्रश्न", "Helpful Reference": "उपयोगी संदर्भ",
    "Local Care": "स्थानीय देखभाल", "Trusted Education Sources": "विश्वसनीय शैक्षिक स्रोत", "Book this service": "यह सेवा बुक करें",
    "Locations": "स्थान", "Appointment type": "अपॉइंटमेंट का प्रकार", "Read resource": "संसाधन पढ़ें", "New patients welcome": "नए मरीज़ों का स्वागत है",
    "Locally owned": "स्थानीय स्वामित्व", "Dogs & cats": "कुत्ते और बिल्लियाँ",
    "Client Reviews": "ग्राहक समीक्षाएँ",
    "What our community says.": "हमारा समुदाय क्या कहता है।",
    "4.8 average rating": "4.8 औसत रेटिंग",
    "Google reviews from Fort Thomas and Independence pet families": "Fort Thomas और Independence के पालतू पशु परिवारों की Google समीक्षाएँ",
    "Dr. Baker and her associates are amazing. They treat your pets like family and take the time to answer every question without rushing.":
      "डॉ. बेकर और उनके सहयोगी बेहतरीन हैं। वे आपके पालतू पशुओं के साथ परिवार जैसा व्यवहार करते हैं और बिना जल्दबाजी के हर सवाल का जवाब देते हैं।",
    "From the moment we walked in, everything felt calm and thoughtful. The team took time to help my cat feel comfortable.":
      "जैसे ही हम अंदर गए, सब कुछ शांत और सोच-समझकर लग रहा था। टीम ने मेरी बिल्ली को आरामदायक महसूस कराने के लिए समय लिया।",
    "The staff is gentle, kind, and professional. They explained pricing upfront and followed up the next day to check on my pet.":
      "कर्मचारी कोमल, दयालु और पेशेवर हैं। उन्होंने पहले से कीमतें बताईं और अगले दिन मेरे पालतू पशु का हाल जानने के लिए फॉलो-अप किया।",
    "Our first visit could not have gone better. Everyone was kind, patient, and made sure our pet felt comfortable.":
      "हमारी पहली मुलाकात इससे बेहतर नहीं हो सकती थी। सभी दयालु, धैर्यवान थे और उन्होंने सुनिश्चित किया कि हमारा पालतू पशु आरामदायक महसूस करे।",
    "Better care starts with listening carefully, explaining clearly, and knowing the pet and family in front of us.":
      "बेहतर देखभाल ध्यान से सुनने, स्पष्ट रूप से समझाने और सामने मौजूद पालतू पशु और परिवार को जानने से शुरू होती है।",
    "Care team, RVTs, and client support": "देखभाल टीम, पंजीकृत पशु चिकित्सा तकनीशियन और ग्राहक सहायता",
    "Office leadership, registered veterinary technicians, assistants, and client service team members help make each visit organized, calmer, and easier to understand.":
      "क्लिनिक नेतृत्व, पंजीकृत पशु चिकित्सा तकनीशियन, सहायक और ग्राहक सेवा टीम के सदस्य हर मुलाकात को व्यवस्थित, शांत और समझने में आसान बनाते हैं।",
    "Personal care looks like:": "व्यक्तिगत देखभाल इस प्रकार दिखती है:",
    "Familiar faces": "परिचित चेहरे",
    "Comfort-focused visits": "आरामदायक मुलाकातें",
    "VMC resources": "VMC संसाधन",
    "Trusted pet care resources": "विश्वसनीय पालतू पशु देखभाल संसाधन"
  },
  zh: {
    "Home": "首页", "About": "关于我们", "Services": "服务", "New Patients": "新患者",
    "Book Appointment": "预约", "Book an Appointment": "预约", "Request an Appointment": "申请预约",
    "Call Our Team": "致电我们的团队", "Get Directions": "获取路线", "Learn more": "了解更多", "View resource": "查看资源",
    "Next Steps": "下一步", "Related Services": "相关服务", "Related services": "相关服务", "Related Resources": "相关资源",
    "Quick Summary": "快速摘要", "Best for": "适合", "Available at": "提供地点", "Typical next step": "常见下一步",
    "What this helps with": "可帮助解决的问题", "Common reasons to schedule": "常见预约原因",
    "What It Helps With": "可帮助解决的问题", "Guide": "指南", "Signs to Watch For": "需要留意的迹象", "Our Approach": "我们的方式",
    "What to Expect": "就诊流程", "Preparation": "准备事项", "Questions to Ask": "可咨询的问题", "Helpful Reference": "实用参考",
    "Local Care": "本地护理", "Trusted Education Sources": "可信教育来源", "Book this service": "预约此服务",
    "Locations": "诊所地点", "Appointment type": "预约类型", "Read resource": "阅读资源", "New patients welcome": "欢迎新患者",
    "Locally owned": "本地经营", "Dogs & cats": "猫狗",
    "Client Reviews": "客户评价",
    "What our community says.": "我们社区怎么说。",
    "4.8 average rating": "平均评分 4.8",
    "Google reviews from Fort Thomas and Independence pet families": "来自 Fort Thomas 和 Independence 宠物家庭的 Google 评价",
    "Dr. Baker and her associates are amazing. They treat your pets like family and take the time to answer every question without rushing.":
      "Baker 医生和她的同事们非常出色。他们把您的宠物当作家人对待，耐心回答每一个问题，从不催促。",
    "From the moment we walked in, everything felt calm and thoughtful. The team took time to help my cat feel comfortable.":
      "从我们走进门的那一刻起，一切都感觉平静而体贴。团队花时间帮助我的猫感到舒适。",
    "The staff is gentle, kind, and professional. They explained pricing upfront and followed up the next day to check on my pet.":
      "工作人员温和、友善且专业。他们提前说明了费用，并在第二天跟进了解我宠物的情况。",
    "Our first visit could not have gone better. Everyone was kind, patient, and made sure our pet felt comfortable.":
      "我们的第一次就诊非常顺利。每个人都很友善、耐心，并确保我们的宠物感到舒适。",
    "Better care starts with listening carefully, explaining clearly, and knowing the pet and family in front of us.":
      "更好的护理始于认真倾听、清晰解释，以及了解眼前的宠物和家庭。",
    "Care team, RVTs, and client support": "护理团队、注册兽医技术员和客户支持",
    "Office leadership, registered veterinary technicians, assistants, and client service team members help make each visit organized, calmer, and easier to understand.":
      "诊所管理层、注册兽医技术员、助理和客户服务团队共同确保每次就诊有序、平静且易于理解。",
    "Personal care looks like:": "个性化护理是这样的：",
    "Familiar faces": "熟悉的面孔",
    "Comfort-focused visits": "注重舒适的就诊体验",
    "VMC resources": "VMC 资源",
    "Trusted pet care resources": "可信赖的宠物护理资源"
  }
};

const routeTranslations: Record<TranslatedLocale, TranslationDictionary> = {
  es: {
    "Northern Kentucky vet for dogs and cats,": "Veterinario del norte de Kentucky para perros y gatos,",
    "built around real relationships": "basado en relaciones reales",
    "Veterinary Medical Centers is a locally owned Northern Kentucky veterinary practice for dogs and cats, with convenient Fort Thomas and Independence locations, relationship-based care, and easy appointment scheduling.":
      "Veterinary Medical Centers es una clínica veterinaria del norte de Kentucky de propiedad local para perros y gatos, con ubicaciones convenientes en Fort Thomas e Independence, atención basada en relaciones y programación sencilla de citas.",
    "Find the right care for your pet": "Encuentre la atención adecuada para su mascota",
    "A locally owned vet center that treats you like neighbors": "Un centro veterinario local que le trata como vecino",
    "Vet services for dogs and cats in Northern Kentucky": "Servicios veterinarios para perros y gatos en el norte de Kentucky",
    "New to our vet center? Here’s what to expect": "¿Es nuevo en nuestro centro veterinario? Esto es lo que puede esperar",
    "What to expect at your first visit": "Qué esperar en su primera visita",
    "Choose your Northern Kentucky veterinary location": "Elija su ubicación veterinaria en el norte de Kentucky",
    "Local veterinary care across Northern Kentucky": "Atención veterinaria local en todo el norte de Kentucky",
    "Manage your pet’s care online": "Administre la atención de su mascota en línea",
    "Independently Owned Veterinary Care in Northern Kentucky": "Atención veterinaria independiente en el norte de Kentucky",
    "Why families choose Veterinary Medical Centers": "Por qué las familias eligen Veterinary Medical Centers",
    "Built for families who want care that feels personal.": "Creado para familias que desean una atención personal.",
    "Meet Dr. Baker and the care team": "Conozca a la Dra. Baker y al equipo de atención",
    "Two locations, one standard of care": "Dos ubicaciones, un mismo estándar de atención",
    "Full-service veterinary care for dogs and cats": "Atención veterinaria integral para perros y gatos",
    "What makes independent veterinary care different?": "¿Qué hace diferente a la atención veterinaria independiente?",
    "Helpful resources for pet owners": "Recursos útiles para dueños de mascotas",
    "Veterinary Services in Northern Kentucky": "Servicios veterinarios en el norte de Kentucky",
    "Veterinary Care for Dogs & Cats in Northern Kentucky": "Atención veterinaria para perros y gatos en el norte de Kentucky",
    "Choose Your Care Path": "Elija su tipo de atención",
    "Start with the care your pet needs.": "Comience con la atención que necesita su mascota.",
    "Find the right care path for your pet.": "Encuentre el tipo de atención adecuado para su mascota.",
    "Explore veterinary services by care type.": "Explore los servicios veterinarios por tipo de atención.",
    "What does your pet need help with?": "¿Con qué necesita ayuda su mascota?",
    "Not sure which service your pet needs?": "¿No está seguro de qué servicio necesita su mascota?",
    "Care organized around your pet's needs.": "Atención organizada según las necesidades de su mascota.",
    "Veterinary services near you in Northern Kentucky.": "Servicios veterinarios cerca de usted en el norte de Kentucky.",
    "What to expect at your pet's visit.": "Qué esperar durante la visita de su mascota.",
    "Helpful pet care resources.": "Recursos útiles para el cuidado de mascotas.",
    "Is this the right service for your pet?": "¿Es este el servicio adecuado para su mascota?",
    "When your pet may need this service.": "Cuándo puede necesitar su mascota este servicio.",
    "What happens during the visit.": "Qué sucede durante la visita.",
    "What to bring to your appointment.": "Qué llevar a su cita.",
    "Helpful questions for your veterinarian.": "Preguntas útiles para su veterinario.",
    "A simple way to understand next steps.": "Una forma sencilla de entender los siguientes pasos.",
    "Serving dogs and cats in Fort Thomas and Independence, KY.": "Atendemos a perros y gatos en Fort Thomas e Independence, Kentucky.",
    "Other services that may be helpful.": "Otros servicios que pueden ser útiles.",
    "More pet care guidance from our team.": "Más orientación sobre el cuidado de mascotas de nuestro equipo.",
    "Helpful veterinary education references.": "Referencias educativas veterinarias útiles.",
    "Ready to schedule? Our team can help.": "¿Listo para programar una cita? Nuestro equipo puede ayudar."
  },
  fr: {
    "Northern Kentucky vet for dogs and cats,": "Vétérinaire du nord du Kentucky pour chiens et chats,",
    "built around real relationships": "fondé sur de vraies relations",
    "Find the right care for your pet": "Trouvez les soins adaptés à votre animal",
    "A locally owned vet center that treats you like neighbors": "Un centre vétérinaire local qui vous traite comme des voisins",
    "Vet services for dogs and cats in Northern Kentucky": "Services vétérinaires pour chiens et chats dans le nord du Kentucky",
    "Independently Owned Veterinary Care in Northern Kentucky": "Soins vétérinaires indépendants dans le nord du Kentucky",
    "Why families choose Veterinary Medical Centers": "Pourquoi les familles choisissent Veterinary Medical Centers",
    "Veterinary Services in Northern Kentucky": "Services vétérinaires dans le nord du Kentucky",
    "Veterinary Care for Dogs & Cats in Northern Kentucky": "Soins vétérinaires pour chiens et chats dans le nord du Kentucky",
    "Is this the right service for your pet?": "Est-ce le bon service pour votre animal ?",
    "What happens during the visit.": "Ce qui se passe pendant la visite.",
    "Ready to schedule? Our team can help.": "Prêt à prendre rendez-vous ? Notre équipe peut vous aider."
  },
  hi: {
    "Northern Kentucky vet for dogs and cats,": "उत्तरी केंटकी में कुत्तों और बिल्लियों के लिए पशु चिकित्सक,",
    "built around real relationships": "वास्तविक संबंधों पर आधारित",
    "Find the right care for your pet": "अपने पालतू पशु के लिए सही देखभाल खोजें",
    "A locally owned vet center that treats you like neighbors": "स्थानीय स्वामित्व वाला पशु चिकित्सा केंद्र जो पड़ोसियों जैसा व्यवहार करता है",
    "Vet services for dogs and cats in Northern Kentucky": "उत्तरी केंटकी में कुत्तों और बिल्लियों के लिए पशु चिकित्सा सेवाएँ",
    "Independently Owned Veterinary Care in Northern Kentucky": "उत्तरी केंटकी में स्वतंत्र स्वामित्व वाली पशु चिकित्सा देखभाल",
    "Why families choose Veterinary Medical Centers": "परिवार Veterinary Medical Centers को क्यों चुनते हैं",
    "Veterinary Services in Northern Kentucky": "उत्तरी केंटकी में पशु चिकित्सा सेवाएँ",
    "Veterinary Care for Dogs & Cats in Northern Kentucky": "उत्तरी केंटकी में कुत्तों और बिल्लियों की पशु चिकित्सा देखभाल",
    "Is this the right service for your pet?": "क्या यह आपके पालतू पशु के लिए सही सेवा है?",
    "What happens during the visit.": "मुलाकात के दौरान क्या होता है।",
    "Ready to schedule? Our team can help.": "अपॉइंटमेंट के लिए तैयार हैं? हमारी टीम मदद कर सकती है।"
  },
  zh: {
    "Northern Kentucky vet for dogs and cats,": "北肯塔基州猫狗兽医护理，",
    "built around real relationships": "建立在真实关系之上",
    "Find the right care for your pet": "为您的宠物找到合适的护理",
    "A locally owned vet center that treats you like neighbors": "把您当作邻居的本地兽医中心",
    "Vet services for dogs and cats in Northern Kentucky": "北肯塔基州猫狗兽医服务",
    "Independently Owned Veterinary Care in Northern Kentucky": "北肯塔基州独立经营的兽医护理",
    "Why families choose Veterinary Medical Centers": "家庭选择 Veterinary Medical Centers 的原因",
    "Veterinary Services in Northern Kentucky": "北肯塔基州兽医服务",
    "Veterinary Care for Dogs & Cats in Northern Kentucky": "北肯塔基州猫狗兽医护理",
    "Is this the right service for your pet?": "这是适合您宠物的服务吗？",
    "What happens during the visit.": "就诊期间会发生什么。",
    "Ready to schedule? Our team can help.": "准备预约了吗？我们的团队可以提供帮助。"
  }
};

const serviceTitles: Record<TranslatedLocale, TranslationDictionary> = {
  es: {
    "Pet Wellness Exams": "Exámenes de bienestar para mascotas",
    "Dog & Cat Vaccinations": "Vacunas para perros y gatos",
    "Puppy & Kitten Care": "Atención para cachorros y gatitos",
    "Parasite Prevention": "Prevención de parásitos",
    "Sick Pet Visits": "Visitas para mascotas enfermas",
    "Veterinary Diagnostics": "Diagnóstico veterinario",
    "Skin, Ear & Allergy Care": "Atención de piel, oídos y alergias",
    "Pet Dental Care": "Atención dental para mascotas",
    "Spay & Neuter Surgery": "Cirugía de esterilización y castración",
    "Soft Tissue Surgery": "Cirugía de tejidos blandos",
    "Senior Pet Care": "Atención para mascotas mayores",
    "Nutrition & Weight Guidance": "Orientación sobre nutrición y peso"
  },
  fr: {
    "Pet Wellness Exams": "Examens de santé pour animaux", "Dog & Cat Vaccinations": "Vaccinations pour chiens et chats",
    "Puppy & Kitten Care": "Soins pour chiots et chatons", "Parasite Prevention": "Prévention des parasites",
    "Sick Pet Visits": "Consultations pour animaux malades", "Veterinary Diagnostics": "Diagnostics vétérinaires",
    "Skin, Ear & Allergy Care": "Soins de la peau, des oreilles et des allergies", "Pet Dental Care": "Soins dentaires pour animaux",
    "Spay & Neuter Surgery": "Stérilisation", "Soft Tissue Surgery": "Chirurgie des tissus mous",
    "Senior Pet Care": "Soins pour animaux âgés", "Nutrition & Weight Guidance": "Conseils nutritionnels et gestion du poids"
  },
  hi: {
    "Pet Wellness Exams": "पालतू पशु स्वास्थ्य जांच", "Dog & Cat Vaccinations": "कुत्ते और बिल्ली के टीकाकरण",
    "Puppy & Kitten Care": "पिल्ले और बिल्ली के बच्चे की देखभाल", "Parasite Prevention": "परजीवी रोकथाम",
    "Sick Pet Visits": "बीमार पालतू पशु की मुलाकात", "Veterinary Diagnostics": "पशु चिकित्सा निदान",
    "Skin, Ear & Allergy Care": "त्वचा, कान और एलर्जी देखभाल", "Pet Dental Care": "पालतू पशु दंत देखभाल",
    "Spay & Neuter Surgery": "नसबंदी सर्जरी", "Soft Tissue Surgery": "कोमल ऊतक सर्जरी",
    "Senior Pet Care": "वरिष्ठ पालतू पशु देखभाल", "Nutrition & Weight Guidance": "पोषण और वजन मार्गदर्शन"
  },
  zh: {
    "Pet Wellness Exams": "宠物健康检查", "Dog & Cat Vaccinations": "猫狗疫苗接种",
    "Puppy & Kitten Care": "幼犬和幼猫护理", "Parasite Prevention": "寄生虫预防",
    "Sick Pet Visits": "生病宠物就诊", "Veterinary Diagnostics": "兽医诊断",
    "Skin, Ear & Allergy Care": "皮肤、耳部和过敏护理", "Pet Dental Care": "宠物牙科护理",
    "Spay & Neuter Surgery": "绝育手术", "Soft Tissue Surgery": "软组织手术",
    "Senior Pet Care": "老年宠物护理", "Nutrition & Weight Guidance": "营养和体重指导"
  }
};

export function getStaticPageTranslationDictionary(locale: TranslatedLocale) {
  return { ...common[locale], ...routeTranslations[locale], ...serviceTitles[locale] };
}

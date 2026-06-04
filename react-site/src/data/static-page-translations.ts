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
      "Ya sea que su mascota necesite una revisión, atención dental o presente nuevos síntomas, Veterinary Medical Centers of Northern Kentucky está aquí para ayudar.",
    "Whether your pet is due for a checkup, showing new symptoms, or starting care with our team for the first time, we'll help you find the right next step.":
      "Ya sea que su mascota necesite una revisión, presente nuevos síntomas o comience atención con nuestro equipo por primera vez, le ayudaremos a encontrar el paso correcto.",
    "Veterinary Medical Centers is rooted in Northern Kentucky. Our care is personal, calm, practical, and relationship-based, whether your pet needs everyday wellness or help with more complex health needs.":
      "Veterinary Medical Centers está arraigado en el norte de Kentucky. Nuestra atención es personal, tranquila, práctica y basada en relaciones, ya sea que su mascota necesite bienestar cotidiano o ayuda con necesidades de salud más complejas.",
    "From first visits and vaccines to dental cleanings, surgery, diagnostics, and ongoing wellness, our vet team helps pets stay healthy through every stage of life.":
      "Desde las primeras visitas y vacunas hasta limpiezas dentales, cirugía, diagnóstico y bienestar continuo, nuestro equipo veterinario ayuda a las mascotas a mantenerse saludables en cada etapa de la vida.",
    "Starting with a new veterinarian should feel simple. We'll review your pet's history, talk through your concerns, complete a nose-to-tail exam, and help you understand the best next steps for your pet's health.":
      "Comenzar con un nuevo veterinario debe sentirse sencillo. Revisaremos el historial de su mascota, hablaremos sobre sus inquietudes, realizaremos un examen completo y le ayudaremos a entender los mejores próximos pasos para la salud de su mascota.",
    "With two convenient Veterinary Medical Centers locations in Northern Kentucky, our team is here to support dogs, cats, and the people who love them.":
      "Con dos convenientes ubicaciones de Veterinary Medical Centers en el norte de Kentucky, nuestro equipo está aquí para apoyar a perros, gatos y las personas que los aman.",
    "We proudly care for pets from Fort Thomas, Independence, Newport, Bellevue, Dayton, Highland Heights, Alexandria, Cold Spring, and nearby Cincinnati-area communities.":
      "Con orgullo atendemos mascotas de Fort Thomas, Independence, Newport, Bellevue, Dayton, Highland Heights, Alexandria, Cold Spring y comunidades cercanas al área de Cincinnati.",
    "Local relationships": "Relaciones locales",
    "Veterinary Medical Centers is rooted in Northern Kentucky, with a vet team that gets to know your pet's history, your goals, and what helps visits feel easier over time.":
      "Veterinary Medical Centers está arraigado en el norte de Kentucky, con un equipo veterinario que conoce el historial de su mascota, sus objetivos y lo que hace que las visitas sean más fáciles con el tiempo.",
    "We explain what we see, what matters now, what can wait, and what each recommendation means before moving forward.":
      "Explicamos lo que vemos, qué importa ahora, qué puede esperar y qué significa cada recomendación antes de seguir adelante.",
    "Practical care plans": "Planes de atención prácticos",
    "Care should fit your pet and your family. Our team talks through options, costs, timing, and next steps in plain language.":
      "La atención debe adaptarse a su mascota y su familia. Nuestro equipo habla sobre opciones, costos, tiempos y próximos pasos en lenguaje sencillo.",
    "Dog and cat care": "Atención para perros y gatos",
    "From routine wellness to dental care, surgery planning, sick visits, and senior support, we care for dogs and cats at both NKY locations.":
      "Desde el bienestar de rutina hasta atención dental, planificación quirúrgica, visitas por enfermedad y apoyo para mascotas mayores, atendemos perros y gatos en ambas ubicaciones.",
    "Calm, comfortable visits": "Visitas tranquilas y cómodas",
    "We work to make each visit feel as low-stress as possible with gentle handling, patient pacing, and a team that understands pets may need time to settle in.":
      "Trabajamos para que cada visita sea lo menos estresante posible con un manejo suave, un ritmo paciente y un equipo que entiende que las mascotas pueden necesitar tiempo para adaptarse.",
    "Continuity over time": "Continuidad a lo largo del tiempo",
    "By caring for your pet across life stages, we can notice changes earlier, track ongoing needs, and recommend next steps with more context.":
      "Al cuidar a su mascota a lo largo de las etapas de su vida, podemos notar cambios antes, hacer seguimiento de necesidades continuas y recomendar próximos pasos con más contexto.",
    "Choose your location": "Elija su ubicación",
    "Pick the Fort Thomas vet location or Independence vet location based on what is easiest for your day.":
      "Elija la ubicación de Fort Thomas o Independence según lo que sea más conveniente para su día.",
    "Schedule your visit": "Programe su visita",
    "Request an appointment online or call your local Veterinary Medical Centers team for help choosing the right appointment type.":
      "Solicite una cita en línea o llame a su equipo local de Veterinary Medical Centers para ayudarle a elegir el tipo de cita adecuado.",
    "Send or bring records": "Envíe o traiga registros",
    "Vaccine history, medications, prior exam notes, and adoption paperwork help us understand your pet faster.":
      "El historial de vacunas, medicamentos, notas de exámenes anteriores y documentos de adopción nos ayudan a entender a su mascota más rápidamente.",
    "Meet your vet team": "Conozca a su equipo veterinario",
    "We take time to learn your pet's history, answer questions, and complete a thoughtful exam.":
      "Tomamos tiempo para conocer el historial de su mascota, responder preguntas y realizar un examen cuidadoso.",
    "Leave with a clear care plan": "Salga con un plan de atención claro",
    "You leave with practical recommendations, follow-up timing, and next steps for your dog or cat.":
      "Se va con recomendaciones prácticas, tiempos de seguimiento y próximos pasos para su perro o gato.",
    "Before your appointment": "Antes de su cita",
    "Bring vaccine records, medication details, and any questions you want to discuss.":
      "Traiga registros de vacunas, detalles de medicamentos y cualquier pregunta que desee discutir.",
    "During the exam": "Durante el examen",
    "We'll review your pet's lifestyle, health history, symptoms, and complete a thorough physical exam.":
      "Revisaremos el estilo de vida de su mascota, el historial de salud, los síntomas y realizaremos un examen físico completo.",
    "After the visit": "Después de la visita",
    "You'll leave with clear recommendations, prevention guidance, and follow-up instructions if needed.":
      "Se irá con recomendaciones claras, orientación preventiva e instrucciones de seguimiento si es necesario.",
    "Schedule an Appointment": "Programar una cita",
    "Request a visit with your local vet team.": "Solicite una visita con su equipo veterinario local.",
    "Request a Refill": "Solicitar una recarga",
    "Use the pharmacy path for eligible medication support.": "Use la vía de farmacia para obtener asistencia con medicamentos elegibles.",
    "Access Pet Records": "Acceder a registros de mascotas",
    "Use the patient portal for records and online booking.": "Use el portal del paciente para registros y reservas en línea.",
    "Online Pharmacy": "Farmacia en línea",
    "Shop trusted products and refill options online.": "Compre productos de confianza y opciones de recarga en línea.",
    "New Client Forms": "Formularios para nuevos clientes",
    "Start your first visit paperwork before you arrive.": "Comience el papeleo de su primera visita antes de llegar.",
    "Start as a New Client": "Comenzar como nuevo cliente",
    "What to bring to your first visit": "Qué llevar a su primera visita",
    "Plan Your First Visit": "Planifique su primera visita",
    "Northern Kentucky location": "Ubicación en el norte de Kentucky",
    "Veterinary Medical Centers of Fort Thomas": "Veterinary Medical Centers de Fort Thomas",
    "Veterinary Medical Centers of Independence": "Veterinary Medical Centers de Independence",
    "Veterinary Medical Centers of Fort Thomas provides local veterinary care for dogs and cats in Fort Thomas and nearby Northern Kentucky communities, including wellness visits, preventive care, dental care, diagnostics, surgery support, and everyday guidance.":
      "Veterinary Medical Centers de Fort Thomas proporciona atención veterinaria local para perros y gatos en Fort Thomas y comunidades cercanas del norte de Kentucky, incluidas visitas de bienestar, atención preventiva, atención dental, diagnóstico, apoyo quirúrgico y orientación diaria.",
    "Veterinary Medical Centers of Independence provides trusted veterinary care for dogs and cats in Independence, KY and nearby Northern Kentucky communities, including wellness visits, preventive care, dental care, diagnostics, surgery, and ongoing health guidance.":
      "Veterinary Medical Centers de Independence proporciona atención veterinaria de confianza para perros y gatos en Independence, KY y comunidades cercanas del norte de Kentucky, incluidas visitas de bienestar, atención preventiva, atención dental, diagnóstico, cirugía y orientación de salud continua.",
    "Serving Fort Thomas, Newport, Bellevue, Dayton, Highland Heights, and nearby Cincinnati-area pet owners.":
      "Atendiendo a dueños de mascotas de Fort Thomas, Newport, Bellevue, Dayton, Highland Heights y el área cercana de Cincinnati.",
    "Serving Independence, Alexandria, Taylor Mill, Covington, Erlanger, and nearby Northern Kentucky pet owners.":
      "Atendiendo a dueños de mascotas de Independence, Alexandria, Taylor Mill, Covington, Erlanger y comunidades cercanas del norte de Kentucky.",
    "Ready to schedule a visit with your Northern Kentucky vet team?": "¿Listo para programar una visita con su equipo veterinario del norte de Kentucky?",
    "Choose your location, request an appointment, or call our team. We'll help you find the right next step for your dog or cat.":
      "Elija su ubicación, solicite una cita o llame a nuestro equipo. Le ayudaremos a encontrar el paso correcto para su perro o gato.",
    "Common questions about vet care in Northern Kentucky": "Preguntas frecuentes sobre atención veterinaria en el norte de Kentucky",
    "Pawstimonials": "Testimascotas",
    "Pawstimonials from pets and their people": "Testimascotas de mascotas y sus dueños",
    "Helpful pet care guides from your local vet team": "Guías útiles de cuidado de mascotas de su equipo veterinario local",
    "Pet Care Guides": "Guías de cuidado de mascotas"
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
    "Whether your pet is due for a checkup, showing new symptoms, or starting care with our team for the first time, we'll help you find the right next step.":
      "Que votre animal ait besoin d'un bilan, présente de nouveaux symptômes ou commence des soins avec notre équipe pour la première fois, nous vous aiderons à trouver la prochaine étape.",
    "A locally owned vet center that treats you like neighbors": "Un centre vétérinaire local qui vous traite comme des voisins",
    "Veterinary Medical Centers is rooted in Northern Kentucky. Our care is personal, calm, practical, and relationship-based, whether your pet needs everyday wellness or help with more complex health needs.":
      "Veterinary Medical Centers est ancré dans le nord du Kentucky. Nos soins sont personnels, calmes, pratiques et basés sur la relation, que votre animal ait besoin de soins quotidiens ou d'aide pour des besoins de santé plus complexes.",
    "Vet services for dogs and cats in Northern Kentucky": "Services vétérinaires pour chiens et chats dans le nord du Kentucky",
    "From first visits and vaccines to dental cleanings, surgery, diagnostics, and ongoing wellness, our vet team helps pets stay healthy through every stage of life.":
      "Des premières visites et vaccins jusqu'aux détartrages, chirurgies, diagnostics et suivi de santé, notre équipe vétérinaire aide les animaux à rester en bonne santé à chaque étape de leur vie.",
    "New to our vet center? Here's what to expect": "Nouveau dans notre centre vétérinaire ? Voici ce à quoi vous attendre",
    "What to expect at your first visit": "À quoi s'attendre lors de votre première visite",
    "Starting with a new veterinarian should feel simple. We'll review your pet's history, talk through your concerns, complete a nose-to-tail exam, and help you understand the best next steps for your pet's health.":
      "Commencer avec un nouveau vétérinaire doit être simple. Nous passerons en revue l'historique de votre animal, discuterons de vos préoccupations, effectuerons un examen complet et vous aiderons à comprendre les meilleures prochaines étapes.",
    "Choose your Northern Kentucky veterinary location": "Choisissez votre clinique vétérinaire dans le nord du Kentucky",
    "With two convenient Veterinary Medical Centers locations in Northern Kentucky, our team is here to support dogs, cats, and the people who love them.":
      "Avec deux établissements Veterinary Medical Centers dans le nord du Kentucky, notre équipe est là pour soutenir les chiens, les chats et les personnes qui les aiment.",
    "Local veterinary care across Northern Kentucky": "Soins vétérinaires locaux dans tout le nord du Kentucky",
    "We proudly care for pets from Fort Thomas, Independence, Newport, Bellevue, Dayton, Highland Heights, Alexandria, Cold Spring, and nearby Cincinnati-area communities.":
      "Nous prenons fièrement soin des animaux de Fort Thomas, Independence, Newport, Bellevue, Dayton, Highland Heights, Alexandria, Cold Spring et des communautés proches de Cincinnati.",
    "Manage your pet's care online": "Gérez les soins de votre animal en ligne",
    "Local relationships": "Relations locales",
    "Veterinary Medical Centers is rooted in Northern Kentucky, with a vet team that gets to know your pet's history, your goals, and what helps visits feel easier over time.":
      "Veterinary Medical Centers est ancré dans le nord du Kentucky, avec une équipe vétérinaire qui apprend à connaître l'historique de votre animal, vos objectifs et ce qui facilite les visites au fil du temps.",
    "We explain what we see, what matters now, what can wait, and what each recommendation means before moving forward.":
      "Nous expliquons ce que nous observons, ce qui est important maintenant, ce qui peut attendre et ce que signifie chaque recommandation avant d'aller de l'avant.",
    "Practical care plans": "Plans de soins pratiques",
    "Care should fit your pet and your family. Our team talks through options, costs, timing, and next steps in plain language.":
      "Les soins doivent correspondre à votre animal et à votre famille. Notre équipe discute des options, des coûts, du calendrier et des prochaines étapes en langage clair.",
    "Dog and cat care": "Soins pour chiens et chats",
    "From routine wellness to dental care, surgery planning, sick visits, and senior support, we care for dogs and cats at both NKY locations.":
      "Des soins de routine aux soins dentaires, à la planification chirurgicale, aux visites pour maladies et au soutien des seniors, nous prenons soin des chiens et des chats dans nos deux établissements.",
    "Calm, comfortable visits": "Visites calmes et confortables",
    "We work to make each visit feel as low-stress as possible with gentle handling, patient pacing, and a team that understands pets may need time to settle in.":
      "Nous travaillons pour rendre chaque visite aussi peu stressante que possible avec une manipulation douce, un rythme patient et une équipe qui comprend que les animaux peuvent avoir besoin de temps pour s'installer.",
    "Continuity over time": "Continuité dans le temps",
    "By caring for your pet across life stages, we can notice changes earlier, track ongoing needs, and recommend next steps with more context.":
      "En prenant soin de votre animal à chaque étape de sa vie, nous pouvons remarquer les changements plus tôt, suivre les besoins continus et recommander les prochaines étapes avec plus de contexte.",
    "Choose your location": "Choisissez votre établissement",
    "Pick the Fort Thomas vet location or Independence vet location based on what is easiest for your day.":
      "Choisissez l'établissement de Fort Thomas ou d'Independence selon ce qui est le plus pratique pour vous.",
    "Schedule your visit": "Planifiez votre visite",
    "Request an appointment online or call your local Veterinary Medical Centers team for help choosing the right appointment type.":
      "Demandez un rendez-vous en ligne ou appelez votre équipe locale de Veterinary Medical Centers pour vous aider à choisir le bon type de rendez-vous.",
    "Send or bring records": "Envoyez ou apportez les dossiers",
    "Vaccine history, medications, prior exam notes, and adoption paperwork help us understand your pet faster.":
      "L'historique vaccinal, les médicaments, les notes d'examens antérieurs et les documents d'adoption nous aident à mieux comprendre votre animal.",
    "Meet your vet team": "Rencontrez votre équipe vétérinaire",
    "We take time to learn your pet's history, answer questions, and complete a thoughtful exam.":
      "Nous prenons le temps d'apprendre l'historique de votre animal, de répondre aux questions et de réaliser un examen attentif.",
    "Leave with a clear care plan": "Repartez avec un plan de soins clair",
    "You leave with practical recommendations, follow-up timing, and next steps for your dog or cat.":
      "Vous repartez avec des recommandations pratiques, un calendrier de suivi et les prochaines étapes pour votre chien ou chat.",
    "Before your appointment": "Avant votre rendez-vous",
    "Bring vaccine records, medication details, and any questions you want to discuss.":
      "Apportez les registres de vaccination, les détails des médicaments et toutes les questions que vous souhaitez aborder.",
    "During the exam": "Pendant l'examen",
    "We'll review your pet's lifestyle, health history, symptoms, and complete a thorough physical exam.":
      "Nous passerons en revue le mode de vie de votre animal, ses antécédents de santé, ses symptômes et effectuerons un examen physique complet.",
    "After the visit": "Après la visite",
    "You'll leave with clear recommendations, prevention guidance, and follow-up instructions if needed.":
      "Vous repartirez avec des recommandations claires, des conseils de prévention et des instructions de suivi si nécessaire.",
    "Schedule an Appointment": "Prendre rendez-vous",
    "Request a visit with your local vet team.": "Demandez une visite avec votre équipe vétérinaire locale.",
    "Request a Refill": "Demander un renouvellement",
    "Use the pharmacy path for eligible medication support.": "Utilisez le parcours pharmacie pour obtenir une aide aux médicaments éligibles.",
    "Access Pet Records": "Accéder aux dossiers de l'animal",
    "Use the patient portal for records and online booking.": "Utilisez le portail patient pour les dossiers et la réservation en ligne.",
    "Shop trusted products and refill options online.": "Commandez des produits de confiance et des options de renouvellement en ligne.",
    "New Client Forms": "Formulaires nouveaux clients",
    "Start your first visit paperwork before you arrive.": "Commencez les formalités de votre première visite avant d'arriver.",
    "Start as a New Client": "Commencer en tant que nouveau client",
    "What to bring to your first visit": "Que apporter à votre première visite",
    "Plan Your First Visit": "Planifiez votre première visite",
    "Common questions about vet care in Northern Kentucky": "Questions courantes sur les soins vétérinaires dans le nord du Kentucky",
    "Pawstimonials": "Pattes-moignages",
    "Pawstimonials from pets and their people": "Pattes-moignages d'animaux et de leurs propriétaires",
    "Helpful pet care guides from your local vet team": "Guides utiles de soins pour animaux de votre équipe vétérinaire locale",
    "Pet Care Guides": "Guides de soins pour animaux",
    "Ready to schedule a visit with your Northern Kentucky vet team?": "Prêt à planifier une visite avec votre équipe vétérinaire du nord du Kentucky ?",
    "Choose your location, request an appointment, or call our team. We'll help you find the right next step for your dog or cat.":
      "Choisissez votre établissement, demandez un rendez-vous ou appelez notre équipe. Nous vous aiderons à trouver la prochaine étape pour votre chien ou chat.",
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
    "Whether your pet is due for a checkup, showing new symptoms, or starting care with our team for the first time, we'll help you find the right next step.":
      "चाहे आपके पालतू पशु की जांच हो, नए लक्षण हों, या पहली बार हमारी टीम के साथ देखभाल शुरू करनी हो, हम आपको सही अगला कदम खोजने में मदद करेंगे।",
    "A locally owned vet center that treats you like neighbors": "स्थानीय स्वामित्व वाला पशु चिकित्सा केंद्र जो पड़ोसियों जैसा व्यवहार करता है",
    "Veterinary Medical Centers is rooted in Northern Kentucky. Our care is personal, calm, practical, and relationship-based, whether your pet needs everyday wellness or help with more complex health needs.":
      "Veterinary Medical Centers उत्तरी केंटकी में स्थापित है। हमारी देखभाल व्यक्तिगत, शांत, व्यावहारिक और संबंध-आधारित है, चाहे आपके पालतू पशु को दैनिक स्वास्थ्य या अधिक जटिल स्वास्थ्य जरूरतों में मदद की आवश्यकता हो।",
    "Vet services for dogs and cats in Northern Kentucky": "उत्तरी केंटकी में कुत्तों और बिल्लियों के लिए पशु चिकित्सा सेवाएँ",
    "From first visits and vaccines to dental cleanings, surgery, diagnostics, and ongoing wellness, our vet team helps pets stay healthy through every stage of life.":
      "पहली मुलाकात और टीकों से लेकर दंत सफाई, सर्जरी, निदान और निरंतर स्वास्थ्य तक, हमारी पशु चिकित्सा टीम जीवन के हर चरण में पालतू पशुओं को स्वस्थ रहने में मदद करती है।",
    "New to our vet center? Here's what to expect": "हमारे पशु चिकित्सा केंद्र में नए हैं? यहाँ जानें क्या अपेक्षा करें",
    "What to expect at your first visit": "अपनी पहली मुलाकात में क्या अपेक्षा करें",
    "Starting with a new veterinarian should feel simple. We'll review your pet's history, talk through your concerns, complete a nose-to-tail exam, and help you understand the best next steps for your pet's health.":
      "नए पशु चिकित्सक के साथ शुरुआत करना सरल होनी चाहिए। हम आपके पालतू पशु का इतिहास देखेंगे, आपकी चिंताओं पर चर्चा करेंगे, पूरी जांच करेंगे और आपको सर्वोत्तम अगले कदमों को समझने में मदद करेंगे।",
    "Choose your Northern Kentucky veterinary location": "अपना उत्तरी केंटकी पशु चिकित्सा स्थान चुनें",
    "With two convenient Veterinary Medical Centers locations in Northern Kentucky, our team is here to support dogs, cats, and the people who love them.":
      "उत्तरी केंटकी में दो सुविधाजनक Veterinary Medical Centers स्थानों के साथ, हमारी टीम कुत्तों, बिल्लियों और उन्हें प्यार करने वालों का समर्थन करने के लिए यहाँ है।",
    "Local veterinary care across Northern Kentucky": "उत्तरी केंटकी में स्थानीय पशु चिकित्सा देखभाल",
    "We proudly care for pets from Fort Thomas, Independence, Newport, Bellevue, Dayton, Highland Heights, Alexandria, Cold Spring, and nearby Cincinnati-area communities.":
      "हम गर्व के साथ Fort Thomas, Independence, Newport, Bellevue, Dayton, Highland Heights, Alexandria, Cold Spring और Cincinnati क्षेत्र के पालतू पशुओं की देखभाल करते हैं।",
    "Manage your pet's care online": "अपने पालतू पशु की देखभाल ऑनलाइन प्रबंधित करें",
    "Local relationships": "स्थानीय संबंध",
    "Veterinary Medical Centers is rooted in Northern Kentucky, with a vet team that gets to know your pet's history, your goals, and what helps visits feel easier over time.":
      "Veterinary Medical Centers उत्तरी केंटकी में स्थापित है, जिसमें एक पशु चिकित्सा टीम है जो आपके पालतू पशु का इतिहास, आपके लक्ष्य और समय के साथ मुलाकातों को आसान बनाने वाली बातें जानती है।",
    "We explain what we see, what matters now, what can wait, and what each recommendation means before moving forward.":
      "हम बताते हैं कि हम क्या देखते हैं, अभी क्या महत्वपूर्ण है, क्या प्रतीक्षा कर सकता है और आगे बढ़ने से पहले प्रत्येक अनुशंसा का क्या अर्थ है।",
    "Practical care plans": "व्यावहारिक देखभाल योजनाएँ",
    "Care should fit your pet and your family. Our team talks through options, costs, timing, and next steps in plain language.":
      "देखभाल आपके पालतू पशु और आपके परिवार के अनुकूल होनी चाहिए। हमारी टीम सरल भाषा में विकल्पों, लागतों, समय और अगले कदमों पर चर्चा करती है।",
    "Dog and cat care": "कुत्ते और बिल्ली की देखभाल",
    "From routine wellness to dental care, surgery planning, sick visits, and senior support, we care for dogs and cats at both NKY locations.":
      "नियमित स्वास्थ्य से लेकर दंत देखभाल, सर्जरी योजना, बीमारी की मुलाकात और वरिष्ठ सहायता तक, हम दोनों स्थानों पर कुत्तों और बिल्लियों की देखभाल करते हैं।",
    "Calm, comfortable visits": "शांत, आरामदायक मुलाकातें",
    "We work to make each visit feel as low-stress as possible with gentle handling, patient pacing, and a team that understands pets may need time to settle in.":
      "हम प्रत्येक मुलाकात को जितना संभव हो कम तनावपूर्ण बनाने के लिए काम करते हैं, कोमल तरीके से संभाले, धैर्यपूर्ण गति और एक टीम के साथ जो समझती है कि पालतू पशुओं को बसने में समय लग सकता है।",
    "Continuity over time": "समय के साथ निरंतरता",
    "By caring for your pet across life stages, we can notice changes earlier, track ongoing needs, and recommend next steps with more context.":
      "आपके पालतू पशु की जीवन के विभिन्न चरणों में देखभाल करके, हम पहले बदलावों को नोटिस कर सकते हैं, चल रही जरूरतों को ट्रैक कर सकते हैं और अधिक संदर्भ के साथ अगले कदमों की सिफारिश कर सकते हैं।",
    "Choose your location": "अपना स्थान चुनें",
    "Pick the Fort Thomas vet location or Independence vet location based on what is easiest for your day.":
      "Fort Thomas या Independence पशु चिकित्सा स्थान चुनें, जो आपके दिन के लिए सबसे आसान हो।",
    "Schedule your visit": "अपनी मुलाकात निर्धारित करें",
    "Request an appointment online or call your local Veterinary Medical Centers team for help choosing the right appointment type.":
      "ऑनलाइन अपॉइंटमेंट का अनुरोध करें या सही अपॉइंटमेंट प्रकार चुनने में मदद के लिए अपनी स्थानीय टीम को कॉल करें।",
    "Send or bring records": "रिकॉर्ड भेजें या लाएँ",
    "Vaccine history, medications, prior exam notes, and adoption paperwork help us understand your pet faster.":
      "टीकाकरण इतिहास, दवाएँ, पिछली जांच के नोट्स और गोद लेने के कागजात हमें आपके पालतू पशु को जल्दी समझने में मदद करते हैं।",
    "Meet your vet team": "अपनी पशु चिकित्सा टीम से मिलें",
    "We take time to learn your pet's history, answer questions, and complete a thoughtful exam.":
      "हम आपके पालतू पशु का इतिहास जानने, सवालों के जवाब देने और सावधानीपूर्वक जांच करने के लिए समय लेते हैं।",
    "Leave with a clear care plan": "स्पष्ट देखभाल योजना के साथ जाएँ",
    "You leave with practical recommendations, follow-up timing, and next steps for your dog or cat.":
      "आप व्यावहारिक सिफारिशों, अनुवर्ती समय और अपने कुत्ते या बिल्ली के लिए अगले कदमों के साथ जाते हैं।",
    "Before your appointment": "अपनी अपॉइंटमेंट से पहले",
    "Bring vaccine records, medication details, and any questions you want to discuss.":
      "टीकाकरण रिकॉर्ड, दवा विवरण और कोई भी सवाल जो आप चर्चा करना चाहते हैं, लाएँ।",
    "During the exam": "जांच के दौरान",
    "We'll review your pet's lifestyle, health history, symptoms, and complete a thorough physical exam.":
      "हम आपके पालतू पशु की जीवनशैली, स्वास्थ्य इतिहास, लक्षणों की समीक्षा करेंगे और पूरी शारीरिक जांच करेंगे।",
    "After the visit": "मुलाकात के बाद",
    "You'll leave with clear recommendations, prevention guidance, and follow-up instructions if needed.":
      "आप स्पष्ट सिफारिशों, रोकथाम मार्गदर्शन और यदि आवश्यक हो तो अनुवर्ती निर्देशों के साथ जाएंगे।",
    "Schedule an Appointment": "अपॉइंटमेंट निर्धारित करें",
    "Request a visit with your local vet team.": "अपनी स्थानीय पशु चिकित्सा टीम से मुलाकात का अनुरोध करें।",
    "Request a Refill": "रिफिल का अनुरोध करें",
    "Use the pharmacy path for eligible medication support.": "पात्र दवा सहायता के लिए फार्मेसी पथ का उपयोग करें।",
    "Access Pet Records": "पालतू पशु के रिकॉर्ड तक पहुँचें",
    "Use the patient portal for records and online booking.": "रिकॉर्ड और ऑनलाइन बुकिंग के लिए पेशेंट पोर्टल का उपयोग करें।",
    "Shop trusted products and refill options online.": "विश्वसनीय उत्पाद और रिफिल विकल्प ऑनलाइन खरीदें।",
    "New Client Forms": "नए क्लाइंट फॉर्म",
    "Start your first visit paperwork before you arrive.": "आने से पहले अपनी पहली मुलाकात की कागजी कार्रवाई शुरू करें।",
    "Start as a New Client": "नए क्लाइंट के रूप में शुरू करें",
    "What to bring to your first visit": "अपनी पहली मुलाकात में क्या लाएँ",
    "Plan Your First Visit": "अपनी पहली मुलाकात की योजना बनाएँ",
    "Common questions about vet care in Northern Kentucky": "उत्तरी केंटकी में पशु चिकित्सा देखभाल के बारे में सामान्य प्रश्न",
    "Pawstimonials": "पंजे-मोनियल",
    "Pawstimonials from pets and their people": "पालतू पशुओं और उनके मालिकों से प्रशंसापत्र",
    "Helpful pet care guides from your local vet team": "आपकी स्थानीय पशु चिकित्सा टीम के उपयोगी देखभाल मार्गदर्शिकाएँ",
    "Pet Care Guides": "पालतू पशु देखभाल मार्गदर्शिकाएँ",
    "Ready to schedule a visit with your Northern Kentucky vet team?": "क्या आप अपनी उत्तरी केंटकी पशु चिकित्सा टीम के साथ मुलाकात निर्धारित करने के लिए तैयार हैं?",
    "Choose your location, request an appointment, or call our team. We'll help you find the right next step for your dog or cat.":
      "अपना स्थान चुनें, अपॉइंटमेंट का अनुरोध करें, या हमारी टीम को कॉल करें। हम आपके कुत्ते या बिल्ली के लिए सही अगला कदम खोजने में मदद करेंगे।",
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
    "Whether your pet is due for a checkup, showing new symptoms, or starting care with our team for the first time, we'll help you find the right next step.":
      "无论您的宠物是需要例行检查、出现新症状，还是第一次与我们团队开始护理，我们都会帮助您找到正确的下一步。",
    "A locally owned vet center that treats you like neighbors": "把您当作邻居的本地兽医中心",
    "Veterinary Medical Centers is rooted in Northern Kentucky. Our care is personal, calm, practical, and relationship-based, whether your pet needs everyday wellness or help with more complex health needs.":
      "Veterinary Medical Centers 扎根于北肯塔基州。我们的护理是个性化、平静、实用且以关系为基础的，无论您的宠物需要日常健康护理还是更复杂的健康需求帮助。",
    "Vet services for dogs and cats in Northern Kentucky": "北肯塔基州猫狗兽医服务",
    "From first visits and vaccines to dental cleanings, surgery, diagnostics, and ongoing wellness, our vet team helps pets stay healthy through every stage of life.":
      "从首次就诊和疫苗接种到洁牙、手术、诊断和持续健康护理，我们的兽医团队帮助宠物在生命的每个阶段保持健康。",
    "New to our vet center? Here's what to expect": "初次来我们的兽医中心？以下是您可以期待的内容",
    "What to expect at your first visit": "您第一次就诊时的期望",
    "Starting with a new veterinarian should feel simple. We'll review your pet's history, talk through your concerns, complete a nose-to-tail exam, and help you understand the best next steps for your pet's health.":
      "开始与新兽医合作应该感觉简单。我们将审查您宠物的病史，讨论您的顾虑，进行全面检查，并帮助您了解宠物健康的最佳下一步。",
    "Choose your Northern Kentucky veterinary location": "选择您的北肯塔基州兽医诊所",
    "With two convenient Veterinary Medical Centers locations in Northern Kentucky, our team is here to support dogs, cats, and the people who love them.":
      "在北肯塔基州设有两个方便的 Veterinary Medical Centers 诊所，我们的团队随时为猫、狗及其主人提供支持。",
    "Local veterinary care across Northern Kentucky": "遍布北肯塔基州的本地兽医护理",
    "We proudly care for pets from Fort Thomas, Independence, Newport, Bellevue, Dayton, Highland Heights, Alexandria, Cold Spring, and nearby Cincinnati-area communities.":
      "我们自豪地为 Fort Thomas、Independence、Newport、Bellevue、Dayton、Highland Heights、Alexandria、Cold Spring 及辛辛那提周边社区的宠物提供护理。",
    "Manage your pet's care online": "在线管理您宠物的护理",
    "Local relationships": "本地关系",
    "Veterinary Medical Centers is rooted in Northern Kentucky, with a vet team that gets to know your pet's history, your goals, and what helps visits feel easier over time.":
      "Veterinary Medical Centers 扎根于北肯塔基州，拥有一支了解您宠物病史、您的目标以及如何让就诊体验随时间变得更轻松的兽医团队。",
    "We explain what we see, what matters now, what can wait, and what each recommendation means before moving forward.":
      "我们会解释我们观察到的情况、目前重要的事项、可以等待的事项，以及每项建议在继续之前的含义。",
    "Practical care plans": "实用护理计划",
    "Care should fit your pet and your family. Our team talks through options, costs, timing, and next steps in plain language.":
      "护理应适合您的宠物和家庭。我们的团队用简单的语言讨论选项、费用、时间安排和下一步。",
    "Dog and cat care": "猫狗护理",
    "From routine wellness to dental care, surgery planning, sick visits, and senior support, we care for dogs and cats at both NKY locations.":
      "从常规健康护理到牙科护理、手术计划、病情就诊和老年支持，我们在两个诊所为猫和狗提供护理。",
    "Calm, comfortable visits": "平静舒适的就诊体验",
    "We work to make each visit feel as low-stress as possible with gentle handling, patient pacing, and a team that understands pets may need time to settle in.":
      "我们努力让每次就诊尽可能减少压力，采用温和的处理方式、耐心的节奏，以及了解宠物可能需要时间适应的团队。",
    "Continuity over time": "持续的护理连贯性",
    "By caring for your pet across life stages, we can notice changes earlier, track ongoing needs, and recommend next steps with more context.":
      "通过在生命的各个阶段照顾您的宠物，我们可以更早地注意到变化，跟踪持续的需求，并在更多背景下推荐下一步。",
    "Choose your location": "选择您的诊所",
    "Pick the Fort Thomas vet location or Independence vet location based on what is easiest for your day.":
      "根据您当天最方便的情况，选择 Fort Thomas 或 Independence 兽医诊所。",
    "Schedule your visit": "安排您的就诊",
    "Request an appointment online or call your local Veterinary Medical Centers team for help choosing the right appointment type.":
      "在线申请预约或致电您当地的 Veterinary Medical Centers 团队，获取选择正确预约类型的帮助。",
    "Send or bring records": "发送或携带记录",
    "Vaccine history, medications, prior exam notes, and adoption paperwork help us understand your pet faster.":
      "疫苗历史、药物、之前的检查记录和领养文件有助于我们更快了解您的宠物。",
    "Meet your vet team": "认识您的兽医团队",
    "We take time to learn your pet's history, answer questions, and complete a thoughtful exam.":
      "我们花时间了解您宠物的病史，回答问题，并完成细致的检查。",
    "Leave with a clear care plan": "带着清晰的护理计划离开",
    "You leave with practical recommendations, follow-up timing, and next steps for your dog or cat.":
      "您将带着实用的建议、随访时间安排以及您的猫或狗的下一步计划离开。",
    "Before your appointment": "预约前",
    "Bring vaccine records, medication details, and any questions you want to discuss.":
      "携带疫苗记录、药物详情以及您想讨论的任何问题。",
    "During the exam": "检查期间",
    "We'll review your pet's lifestyle, health history, symptoms, and complete a thorough physical exam.":
      "我们将审查您宠物的生活方式、健康史、症状，并进行彻底的体格检查。",
    "After the visit": "就诊后",
    "You'll leave with clear recommendations, prevention guidance, and follow-up instructions if needed.":
      "您将带着明确的建议、预防指导和必要时的随访说明离开。",
    "Schedule an Appointment": "预约",
    "Request a visit with your local vet team.": "向您的当地兽医团队申请就诊。",
    "Request a Refill": "申请续药",
    "Use the pharmacy path for eligible medication support.": "使用药房渠道获取符合条件的药物支持。",
    "Access Pet Records": "访问宠物记录",
    "Use the patient portal for records and online booking.": "使用患者门户查看记录和在线预约。",
    "Shop trusted products and refill options online.": "在线购买可信赖的产品和续药选项。",
    "New Client Forms": "新客户表格",
    "Start your first visit paperwork before you arrive.": "在到达前开始填写您第一次就诊的文件。",
    "Start as a New Client": "作为新客户开始",
    "What to bring to your first visit": "第一次就诊带什么",
    "Plan Your First Visit": "计划您的第一次就诊",
    "Common questions about vet care in Northern Kentucky": "关于北肯塔基州兽医护理的常见问题",
    "Pawstimonials": "爪迹见证",
    "Pawstimonials from pets and their people": "来自宠物及其主人的评价",
    "Helpful pet care guides from your local vet team": "来自您本地兽医团队的实用宠物护理指南",
    "Pet Care Guides": "宠物护理指南",
    "Ready to schedule a visit with your Northern Kentucky vet team?": "准备好与您的北肯塔基州兽医团队预约了吗？",
    "Choose your location, request an appointment, or call our team. We'll help you find the right next step for your dog or cat.":
      "选择您的诊所，申请预约，或致电我们的团队。我们将帮助您为您的猫或狗找到正确的下一步。",
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

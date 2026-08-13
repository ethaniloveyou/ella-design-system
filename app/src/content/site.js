// Copy that lived inline in the old JSX screens (hero, about, testimonials,
// resource grid). Moved into data so the new visual layer can lay it out
// freely without the wording drifting.

export const ELLA_LINKS = {
  whatsapp: 'https://wa.me/15555550123', // TODO: real WhatsApp number
  calendar: 'https://calendar.app.google/your-booking', // TODO: real Google Calendar booking link
  pauseLife: 'https://thepauselife.com/',
};

export function getSite(lang) {
  const isEs = lang === 'es';

  return {
    hero: {
      titleLead: isEs ? 'Por mujeres,' : 'By women,',
      titleEm: isEs ? 'para mujeres.' : 'for women.',
      leadStrong: isEs
        ? 'Todo lo que necesitas saber sobre la menopausia.'
        : 'Everything you need to know about menopause.',
      lead: isEs
        ? ' Información sobre nutrición, suplementos, ejercicio, salud mental, y las preguntas que debes hacerle a tu médico. Hecho para ser accesible y asequible.'
        : ' Information about nutrition, supplements, exercise, mental health, and the questions to ask your doctor. Built to be accessible and affordable.',
      cta: isEs ? 'Empieza a leer' : 'Start reading',
      credName: 'Jessica Zavala, PA-C',
      credRole: isEs ? 'Certificado en bienestar de la mujer' : "Women's wellness certificate",
      scroll: isEs ? 'Explora' : 'Explore',
    },

    why: {
      eyebrow: isEs ? 'POR QUÉ IMPORTA' : 'WHY THIS MATTERS',
      paras: isEs
        ? [
            'Cerca de la mitad de todas las mujeres pasan por la menopausia, y aun así, la mayoría de los planes de estudio médicos le dedican menos de una hora. El resultado: millones de mujeres atraviesan una década de cambios hormonales casi sin orientación real.',
            'Saber qué está pasando, qué vale la pena hacer al respecto, y qué preguntas hacerle a tu médico, esa es la diferencia entre sentirte perdida y sentirte al mando. Ella es para lo segundo.',
          ]
        : [
            'About half of all women will go through menopause, and yet most medical curricula spend less than an hour on it. The result: millions of women navigate a decade of hormonal change with almost no real guidance.',
            'Know what’s happening, what to do about it, and what questions to ask your doctor.',
          ],
      quote: isEs
        ? '«No estás sola en esto, y mereces información en tu propio idioma.»'
        : '“You’re not alone in this, and you deserve real information, in your own language.”',
      quoteAuthor: 'Jessica Zavala',
    },

    nutrition: {
      eyebrow: isEs ? 'NUTRICIÓN' : 'NUTRITION',
      title: isEs ? 'Por qué la proteína es importante' : 'Why protein is important',
      // The old NutritionHub shipped "palabras palabras palabras" here. Using
      // the real pillar copy rather than carrying placeholder text forward.
      lead: isEs
        ? 'Alimentos para incluir, necesidades de proteína durante la menopausia, sustituciones más sanas. Sin planes de comidas, solo información real.'
        : 'Foods to include, protein needs during menopause, healthier swaps. No meal plans, just real information.',
      quickEyebrow: isEs ? 'REFERENCIA RÁPIDA' : 'QUICK REFERENCE',
      quickTitleLead: isEs ? 'Diez alimentos para ' : 'Ten foods to ',
      quickTitleEm: isEs ? 'llenar tu plato.' : 'fill your plate.',
      quickLead: isEs
        ? 'Cantidades de proteína por porción típica. Apunta a 25–30 g por comida y deja que las elecciones se vuelvan automáticas.'
        : 'Protein per typical serving. Aim for 25–30 g per meal and let the choices become automatic.',
    },

    exercise: {
      eyebrow: isEs ? 'EJERCICIO' : 'EXERCISE',
      titleLead: isEs ? 'Menos cardio, ' : 'Less cardio, ',
      titleEm: isEs ? 'más músculo.' : 'more muscle.',
      lead: isEs
        ? 'Entrenamiento de fuerza, caminar, yoga. Las pesas ligeras cuentan. Menos cardio, más músculo.'
        : 'Strength training, walking, yoga. Light weights count. Less cardio, more muscle.',
      points: isEs
        ? [
            { title: 'Entrenamiento de fuerza', body: 'Perdemos cerca del 1% de masa muscular al año después de los 45. Levantar peso, aunque sea ligero, es lo que revierte esa curva.' },
            { title: 'Caminar', body: 'Lo más subestimado y lo más sostenible. Protege el corazón, los huesos y el ánimo sin agotar el sistema nervioso.' },
            { title: 'Yoga', body: 'Movilidad, equilibrio y regulación del estrés. Útil justo cuando el sueño y la ansiedad se vuelven inestables.' },
          ]
        : [
            { title: 'Strength training', body: 'We lose roughly 1% of muscle a year after 45. Lifting, even light weights, is what bends that curve back.' },
            { title: 'Walking', body: 'The most underrated and the most sustainable. Protects heart, bones, and mood without draining your nervous system.' },
            { title: 'Yoga', body: 'Mobility, balance, and stress regulation, right when sleep and anxiety get unpredictable.' },
          ],
    },

    mental: {
      eyebrow: isEs ? 'SALUD MENTAL' : 'MENTAL HEALTH',
      titleLead: isEs ? 'No estás sola, ' : 'You are not alone, ',
      titleEm: isEs ? 'y los datos lo confirman.' : 'and the data backs that up.',
      lead: isEs
        ? 'Grupos de apoyo, reuniones, recursos. Las tasas de depresión y ansiedad suben marcadamente después de los 45, y eso no es debilidad, es fisiología.'
        : 'Support groups, meetups, resource links. Rates of depression and anxiety rise sharply after 45, and that isn’t weakness, it’s physiology.',
      links: [
        { label: isEs ? 'Línea 988 de crisis y suicidio' : '988 Suicide & Crisis Lifeline', sub: isEs ? 'Disponible 24/7 · en español' : 'Available 24/7 · Spanish available', href: 'https://988lifeline.org/' },
        { label: 'NAMI', sub: isEs ? 'Alianza Nacional sobre Enfermedades Mentales · grupos de apoyo' : 'National Alliance on Mental Illness · support groups', href: 'https://www.nami.org/' },
        { label: isEs ? 'Office on Women’s Health' : 'Office on Women’s Health', sub: isEs ? 'Salud mental en la menopausia · recurso oficial' : 'Menopause and mental health · official resource', href: 'https://www.womenshealth.gov/menopause' },
      ],
    },

    supplements: {
      eyebrow: isEs ? 'SUPLEMENTOS' : 'SUPPLEMENTS',
      title: isEs ? 'Más importantes que un multivitamínico, ahora.' : 'More important than a multivitamin, at this stage.',
      disclaimer: isEs
        ? 'Habla con tu médica antes de empezar cualquier suplemento, especialmente si tomas medicamentos. Ella comparte información, no consejo médico personalizado.'
        : 'Talk to your doctor before starting any supplement, especially if you take medication. Ella shares information, not personalized medical advice.',
      affiliate: isEs
        ? 'Ella puede ganar una pequeña comisión por algunos enlaces.'
        : 'Ella may earn a small affiliate fee on some links.',
    },

    resources: {
      eyebrow: isEs ? 'TODO LO QUE NECESITAS' : 'EVERYTHING YOU NEED',
      titleLead: isEs ? 'La ' : 'The ',
      titleEm: isEs ? 'información' : 'information',
      titleTail: isEs ? ' que buscas.' : ' you need.',
      columns: [
        {
          title: isEs ? 'Nutrición y ejercicio' : 'Nutrition & exercise',
          section: 'nutricion',
          links: [
            { label: isEs ? 'Proteína después de los 45' : 'Protein after 45', route: 'articles' },
            { label: isEs ? 'Alimentos a evitar' : 'Foods to avoid', route: 'articles' },
            { label: isEs ? 'Entrenamiento de fuerza para principiantes' : 'Strength training for beginners', route: 'articles' },
            { label: isEs ? 'Yoga para la salud mental' : 'Yoga for mental health', route: 'articles' },
          ],
        },
        {
          title: isEs ? 'Peri/Menopausia' : 'Peri/Menopause',
          section: 'hero',
          links: [
            { label: isEs ? 'Opciones de terapia hormonal' : 'Hormonal therapy options', route: 'hormones' },
            { label: isEs ? 'Lista para tu ginecóloga' : 'Your OB-GYN visit checklist', route: 'doctor' },
            { label: isEs ? 'Cómo encontrar un especialista' : 'How to find a menopause specialist', route: 'hormones' },
            { label: isEs ? 'Suplementos principales' : 'The supplements to know', route: 'supplements-page' },
          ],
        },
        {
          title: isEs ? 'Salud reproductiva' : 'Reproductive health',
          section: 'salud-mental',
          links: [
            { label: isEs ? 'VPH, lo que debes saber' : 'HPV, what to know', route: 'cancer' },
            { label: isEs ? 'Calendario de detección' : 'Your screening schedule', route: 'cancer' },
            { label: isEs ? 'Síntomas que no debes ignorar' : 'Symptoms not to brush off', route: 'cancer' },
            { label: isEs ? '¿Dónde estoy? El chequeo' : 'Where am I? The check-in', route: 'quiz' },
          ],
        },
      ],
    },

    about: {
      eyebrow: isEs ? 'CONOCE A LA FUNDADORA' : 'MEET THE FOUNDER',
      title: isEs ? 'Hola, soy Jessica.' : 'Hi, I’m Jessica.',
      paras: isEs
        ? [
            'Tengo 53 años, soy madre de tres, y empecé la perimenopausia más tarde que la mayoría de las mujeres. Por eso no la tomé en serio hasta que me llegó de lleno, y cuando llegó, nada se parecía a lo que me habían contado.',
            'No tuve el aumento de peso drástico. Mis síntomas no se parecían a la lista típica de sofocos y baja libido que todo el mundo menciona. Ahí entendí algo importante: la menopausia no empieza igual en cada mujer. Puede llegar tan pronto como a los 40, o hasta mediados de los 50.',
            'Esa experiencia me inspiró a guiar a otras mujeres que se sienten tan perdidas como yo me sentí. Ahora me siento bien, y quiero compartir mi investigación y experiencia con todas las mujeres que no saben cómo reunir esta información por su cuenta, especialmente las que hablan español, que muchas veces tienen aún menos recursos accesibles.',
          ]
        : [
            'I’m 53, a mother of three, and I started perimenopause later than most women do. That’s part of why I didn’t take it seriously until it hit, and when it did, none of it looked like what I’d been told to expect.',
            'I didn’t have the dramatic weight gain. My symptoms didn’t match the usual list everyone mentions, hot flashes, low libido. That’s when it hit me: menopause doesn’t start the same way for every woman. It can begin as early as 40, or as late as your mid-50s.',
            'That experience is what pushed me to guide other women who feel as lost as I once did. I feel good now, and I want to share my research and experience with every woman who doesn’t know how to gather all this information herself, especially Spanish speakers, who often have even fewer accessible resources.',
          ],
      stats: [
        { n: '53', label: isEs ? 'años' : 'years old' },
        { n: '3', label: isEs ? 'hijos' : 'children' },
        { n: '2', label: isEs ? 'idiomas' : 'languages' },
      ],
      consultEyebrow: isEs ? 'TRABAJA CONMIGO' : 'WORK WITH ME',
      consultTitleLead: isEs ? 'Reserva una ' : 'Book a 30-minute ',
      consultTitleEm: isEs ? 'consulta de bienestar' : 'wellness consultation.',
      consultTitleTail: isEs ? ' de 30 minutos.' : '',
      consultLead: isEs
        ? 'Una llamada con Jessica para hablar de tus síntomas, tus preguntas, y qué dirección tomar.'
        : 'A call with Jessica to talk through your symptoms, your questions, and where to go next.',
      consultList: isEs
        ? ['Por dónde empezar', 'Qué preguntarle a tu médico', 'Orientación personalizada para tu etapa']
        : ['Where to start', 'What to ask your own doctor', 'Personalized guidance for your stage'],
      consultCalendar: isEs ? 'Agendar en Google Calendar' : 'Schedule on Google Calendar',
      consultWhatsapp: isEs ? 'Escríbeme por WhatsApp' : 'Message me on WhatsApp',
    },

    testimonialsEyebrow: isEs ? 'EN PALABRAS DE NUESTRAS LECTORAS' : 'IN THEIR OWN WORDS',
    testimonials: isEs
      ? [
          { quote: 'Por primera vez siento que tengo información real, sin alarmismo, sin que me vendan algo.', author: 'Marta R., 52' },
          { quote: 'Llevé la lista a mi ginecóloga y por fin tuvimos una conversación de verdad.', author: 'Elena G., 48' },
          { quote: 'Que esté en español marca toda la diferencia. Mi mamá lo lee conmigo.', author: 'Carolina M., 50' },
          { quote: 'No me sentí juzgada. Me sentí escuchada, lo opuesto a la mayoría de las citas médicas.', author: 'Patricia D., 55' },
          { quote: 'El chequeo me ayudó a entender dónde estoy. No sabía que era perimenopausia.', author: 'Lorena S., 46' },
        ]
      : [
          { quote: 'For the first time I feel like I have real information, no alarmism, nothing being sold to me.', author: 'Marta R., 52' },
          { quote: 'I brought the list to my OB-GYN and we actually had a real conversation.', author: 'Elena G., 48' },
          { quote: 'Having it in Spanish makes all the difference. My mom reads it with me.', author: 'Carolina M., 50' },
          { quote: 'I didn’t feel judged. I felt heard, the opposite of how most doctor visits feel.', author: 'Patricia D., 55' },
          { quote: 'The check-in helped me understand where I am. I didn’t know it was perimenopause.', author: 'Lorena S., 46' },
        ],

    footer: {
      tagline: isEs
        ? 'Mujeres apoyando a mujeres en cada etapa hormonal de la vida.'
        : 'Women supporting women through every hormonal stage of life.',
      disclaimer: isEs
        ? 'Ella comparte información general, no consejo médico. Habla siempre con tu propio médico.'
        : 'Ella shares general information, not medical advice. Always talk to your own doctor.',
    },
  };
}

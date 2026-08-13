// The awareness check-in, ported from the previous AwarenessQuiz screen with
// the recommendation logic intact. Presentation moved out; the questions,
// the ordering rules, and the postmenopausal-bleeding safety note are
// unchanged — that flag is clinical, not cosmetic.

export function getQuestions(lang) {
  const isEs = lang === 'es';
  return [
    {
      id: 'stage',
      kind: 'single',
      text: isEs ? '¿En qué parte de tu camino estás?' : 'Where are you in your journey?',
      help: isEs ? 'No hace falta certeza. Elige lo que más se acerque.' : 'No need to be certain. Pick whatever feels closest.',
      opts: [
        { key: 'regular', label: isEs ? 'Mis períodos siguen siendo regulares' : 'My periods are still regular' },
        { key: 'changing', label: isEs ? 'Mis períodos están cambiando o son irregulares' : 'My periods are changing or irregular' },
        { key: 'post', label: isEs ? 'Han pasado 12+ meses desde mi último período' : "It's been 12+ months since my last period" },
        { key: 'surgical', label: isEs ? 'Tuve menopausia quirúrgica o médica' : "I've had surgical or medical menopause" },
        { key: 'unsure', label: isEs ? 'No estoy segura de dónde estoy' : "I'm not sure where I am" },
      ],
    },
    {
      id: 'symptoms',
      kind: 'multi',
      text: isEs ? '¿Cuáles de estos has notado últimamente?' : 'Which of these have you noticed lately?',
      help: isEs ? 'Elige todas las que apliquen. Está bien dejarlo en blanco.' : 'Choose all that apply. It is okay to leave it blank.',
      opts: [
        { key: 'hot', label: isEs ? 'Sofocos o sudores nocturnos' : 'Hot flashes or night sweats' },
        { key: 'sleep', label: isEs ? 'Cambios en el sueño o insomnio' : 'Sleep changes or insomnia' },
        { key: 'mood', label: isEs ? 'Cambios de humor, ansiedad o tristeza' : 'Mood shifts, anxiety, or low mood' },
        { key: 'fog', label: isEs ? 'Niebla mental o lapsos de memoria' : 'Brain fog or memory lapses' },
        { key: 'periods', label: isEs ? 'Períodos irregulares o abundantes' : 'Irregular or heavy periods' },
        { key: 'intimacy', label: isEs ? 'Sequedad vaginal o cambios en la libido' : 'Vaginal dryness or changes in libido' },
        { key: 'body', label: isEs ? 'Dolores articulares o cambios de peso' : 'Joint aches or weight changes' },
        { key: 'none', label: isEs ? 'Ninguno de estos por ahora' : 'None of these right now', exclusive: true },
      ],
    },
    {
      id: 'impact',
      kind: 'single',
      text: isEs ? '¿Cuánto está afectando tu día a día?' : 'How much is this affecting your daily life?',
      opts: [
        { key: 'curious', label: isEs ? 'Apenas, tengo curiosidad' : "Barely, I'm mostly curious" },
        { key: 'some', label: isEs ? 'Algunos días son más difíciles' : 'Some days are harder than others' },
        { key: 'lot', label: isEs ? 'Mucho, es difícil de ignorar' : "A lot, it's hard to ignore" },
        { key: 'unsure', label: isEs ? 'Honestamente, no estoy segura' : "I'm honestly not sure" },
      ],
    },
    {
      id: 'goals',
      kind: 'multi',
      text: isEs ? '¿Qué te sería más útil ahora mismo?' : 'What would feel most helpful right now?',
      help: isEs ? 'Elige todas las que apliquen.' : 'Choose all that apply.',
      opts: [
        { key: 'understand', label: isEs ? 'Entender qué le pasa a mi cuerpo' : "Understanding what's happening to my body" },
        { key: 'nutrition', label: isEs ? 'Nutrición y ejercicio para esta etapa' : 'Nutrition and exercise that fit this stage' },
        { key: 'supplements', label: isEs ? 'Saber qué suplementos valen la pena' : 'Knowing which supplements are worth it' },
        { key: 'hormones', label: isEs ? 'Conocer las opciones de terapia hormonal' : 'Learning about hormone therapy options' },
        { key: 'doctor', label: isEs ? 'Saber qué preguntarle a mi médico' : 'Knowing what to ask my doctor' },
        { key: 'support', label: isEs ? 'Sentirme menos sola en esto' : 'Feeling less alone in it' },
      ],
    },
    {
      id: 'care',
      kind: 'single',
      text: isEs ? '¿Has hablado con un médico sobre esto?' : 'Have you talked to a doctor about this?',
      opts: [
        { key: 'helpful', label: isEs ? 'Sí, y fue útil' : 'Yes, and it was helpful' },
        { key: 'dismissed', label: isEs ? 'Sí, pero me sentí ignorada' : 'Yes, but I felt dismissed' },
        { key: 'notyet', label: isEs ? 'Todavía no' : 'Not yet' },
        { key: 'how', label: isEs ? 'No, no sé cómo sacar el tema' : "No, I'm not sure how to bring it up" },
      ],
    },
  ];
}

// `target` is either a section id on the home page or a deep route.
function buildCards(lang) {
  const isEs = lang === 'es';
  return {
    foundations: {
      target: 'articles', section: 'salud-mental',
      title: isEs ? 'Empieza aquí: ¿qué es la perimenopausia?' : 'Start here: what is perimenopause?',
      desc: isEs ? 'Un panorama claro de las etapas, en unos 6 minutos.' : 'A clear overview of the stages, in about 6 minutes.',
      cta: isEs ? 'Leer' : 'Read',
    },
    postLife: {
      target: 'articles', section: 'salud-mental',
      title: isEs ? 'La vida después de la menopausia' : 'Life after menopause',
      desc: isEs ? 'Qué cambia a largo plazo y cómo cuidarte ahora.' : 'What changes long term, and how to care for yourself now.',
      cta: isEs ? 'Leer' : 'Read',
    },
    hot: {
      target: 'hormones', section: 'hero',
      title: isEs ? 'Sofocos y sudores nocturnos' : 'Hot flashes & night sweats',
      desc: isEs ? 'Qué los causa y las opciones que realmente tienes.' : 'What causes them and the options you actually have.',
      cta: isEs ? 'Explorar opciones' : 'Explore options',
    },
    sleep: {
      target: 'articles', section: 'salud-mental',
      title: isEs ? 'Sueño, hormonas y cortisol' : 'Sleep, hormones & cortisol',
      desc: isEs ? 'Por qué cambia el sueño y qué realmente ayuda.' : 'Why sleep shifts now, and what actually helps.',
      cta: isEs ? 'Leer' : 'Read',
    },
    mood: {
      target: 'articles', section: 'salud-mental',
      title: isEs ? 'Cambios de humor en los 40 y 50' : 'Mood shifts in your 40s and 50s',
      desc: isEs ? 'No es solo estrés. La conexión hormonal, explicada.' : "It's not just stress. The hormonal connection, explained.",
      cta: isEs ? 'Leer' : 'Read',
    },
    fog: {
      target: 'articles', section: 'salud-mental',
      title: isEs ? 'Niebla mental, explicada' : 'Brain fog, explained',
      desc: isEs ? 'Qué pasa con la concentración y qué ayuda.' : 'What happens to focus, and what helps.',
      cta: isEs ? 'Leer' : 'Read',
    },
    periods: {
      target: 'doctor', section: 'recursos',
      title: isEs ? 'Cuándo hablar con tu ginecóloga' : 'When to talk to your OB-GYN',
      desc: isEs ? 'Una lista para llevar a tu próxima visita.' : 'A checklist to bring to your next visit.',
      cta: isEs ? 'Ver lista' : 'See checklist',
    },
    intimacy: {
      target: 'hormones', section: 'hero',
      title: isEs ? 'Intimidad y sequedad, sin tabúes' : 'Intimacy & dryness, without the taboo',
      desc: isEs ? 'Lo que cambia y qué opciones ayudan de verdad.' : 'What changes, and which options genuinely help.',
      cta: isEs ? 'Explorar opciones' : 'Explore options',
    },
    body: {
      target: 'nutricion', section: 'nutricion',
      title: isEs ? 'Articulaciones, músculo y peso' : 'Joints, muscle & weight',
      desc: isEs ? 'Por qué cambia el cuerpo y qué hábitos importan más ahora.' : 'Why the body shifts, and which habits matter most now.',
      cta: isEs ? 'Explorar' : 'Explore',
    },
    nutrition: {
      target: 'nutricion', section: 'nutricion',
      title: isEs ? 'Comer para el cambio hormonal' : 'Eating for hormonal change',
      desc: isEs ? 'Cambios simples que importan más en esta etapa.' : 'Simple swaps that matter more at this stage.',
      cta: isEs ? 'Explorar' : 'Explore',
    },
    supplements: {
      target: 'suplementos', section: 'suplementos',
      title: isEs ? 'Los suplementos que conviene conocer' : 'The supplements worth knowing',
      desc: isEs ? 'Qué vale la pena tomar, con la evidencia detrás.' : 'What is worth taking, with the evidence behind it.',
      cta: isEs ? 'Ver lista' : 'See the list',
    },
    hormones: {
      target: 'hormones', section: 'hero',
      title: isEs ? 'Terapia hormonal, en lenguaje claro' : 'Hormone therapy, in plain language',
      desc: isEs ? 'Las opciones explicadas. Sin recomendar, solo claridad.' : 'The options explained. No endorsements, just clarity.',
      cta: isEs ? 'Explorar opciones' : 'Explore options',
    },
    doctor: {
      target: 'doctor', section: 'recursos',
      title: isEs ? 'Preguntas para tu próxima cita' : 'Questions for your next appointment',
      desc: isEs ? 'Una lista imprimible para llegar preparada.' : 'A printable list so you walk in prepared.',
      cta: isEs ? 'Ver lista' : 'See checklist',
    },
    specialist: {
      target: 'hormones', section: 'hero',
      title: isEs ? 'Cómo encontrar un especialista en menopausia' : 'How to find a menopause specialist',
      desc: isEs ? 'Qué buscar cuando no te sientes escuchada.' : "What to look for when you don't feel heard.",
      cta: isEs ? 'Aprender' : 'Learn how',
    },
    support: {
      target: 'sobre', section: 'sobre',
      title: isEs ? 'No estás sola en esto' : "You're not alone in this",
      desc: isEs ? 'Conoce a Jessica y por qué existe Ella.' : 'Meet Jessica and why Ella exists.',
      cta: isEs ? 'Conocer' : 'Meet Jessica',
    },
  };
}

export function getRecommendations(answers, lang) {
  const cards = buildCards(lang);
  const stage = answers.stage;
  const symptoms = (answers.symptoms || []).filter((k) => k !== 'none');
  const goals = answers.goals || [];
  const impact = answers.impact;
  const care = answers.care;

  const recs = [];
  const seen = new Set();
  const add = (card) => {
    if (card && !seen.has(card.title)) {
      seen.add(card.title);
      recs.push(card);
    }
  };

  // 1. If she felt dismissed or hasn't raised it yet, lead with advocacy tools.
  if ((care === 'dismissed' || care === 'how') && (symptoms.length || impact === 'lot' || impact === 'some')) {
    add(cards.doctor);
    if (care === 'dismissed') add(cards.specialist);
  }

  // 2. Symptom-specific reading, in the order she selected.
  symptoms.forEach((s) => add(cards[s]));

  // 3. Honour what she said she's looking for.
  const goalMap = {
    understand: cards.foundations,
    nutrition: cards.nutrition,
    supplements: cards.supplements,
    hormones: cards.hormones,
    doctor: cards.doctor,
    support: cards.support,
  };
  goals.forEach((g) => add(goalMap[g]));

  // 4. Stage-aware foundations.
  if (stage === 'unsure' || stage === 'regular' || stage === 'changing') add(cards.foundations);
  if (stage === 'post' || stage === 'surgical') add(cards.postLife);

  // 5. Make sure she leaves with at least three doors open.
  [cards.foundations, cards.nutrition, cards.supplements].forEach(add);

  return recs.slice(0, 4);
}

/** Postmenopausal bleeding always warrants a doctor visit. Keep this. */
export function safetyNote(answers, lang) {
  const isEs = lang === 'es';
  const stage = answers.stage;
  const symptoms = answers.symptoms || [];
  if ((stage === 'post' || stage === 'surgical') && symptoms.includes('periods')) {
    return isEs
      ? 'Un dato importante: cualquier sangrado después de la menopausia merece una llamada a tu médico, aunque casi siempre sea benigno. Vale la pena revisarlo.'
      : 'One important note: any bleeding after menopause is worth a call to your doctor, even though it is usually nothing serious. It is worth getting checked.';
  }
  return null;
}

export function resultIntro(answers, lang) {
  const isEs = lang === 'es';
  const symptoms = (answers.symptoms || []).filter((k) => k !== 'none');
  const impact = answers.impact;
  const care = answers.care;

  if (care === 'dismissed') {
    return isEs
      ? 'Que te ignoren es más común de lo que debería, y no es tu culpa. Empecemos por herramientas para que la próxima conversación sea distinta.'
      : "Being dismissed is more common than it should be, and it is not your fault. Let's start with tools to make the next conversation go differently.";
  }
  if (impact === 'lot') {
    return isEs
      ? 'Lo que describes suena pesado de cargar. Aquí hay algunas lecturas para sentirte con más control, sin juicio y sin prisa.'
      : "What you're describing sounds like a lot to carry. Here are a few reads to help you feel more in control, no judgment and no rush.";
  }
  if (symptoms.length === 0) {
    return isEs
      ? 'No marcaste síntomas, y este es un gran momento para conocer el terreno antes de que las cosas cambien. Aquí está por dónde empezar.'
      : "You didn't flag any symptoms, and this is a great moment to learn the lay of the land before things shift. Here's where to start.";
  }
  return isEs
    ? 'Aquí está un punto de partida basado en lo que compartiste. Sin puntaje, sin diagnóstico, solo el siguiente paso correcto.'
    : "Here's a starting place based on what you shared. No score, no diagnosis, just the right next step.";
}

export function recapChips(answers, lang) {
  const isEs = lang === 'es';
  const chips = [];
  const stageLabels = {
    regular: isEs ? 'Períodos regulares' : 'Regular periods',
    changing: isEs ? 'Períodos cambiando' : 'Periods changing',
    post: isEs ? 'Posmenopausia' : 'Postmenopause',
    surgical: isEs ? 'Menopausia médica' : 'Medical menopause',
    unsure: isEs ? 'Etapa por definir' : 'Stage to be determined',
  };
  if (answers.stage) chips.push(stageLabels[answers.stage]);

  const symCount = (answers.symptoms || []).filter((k) => k !== 'none').length;
  if (symCount) chips.push(isEs ? `${symCount} síntoma${symCount > 1 ? 's' : ''}` : `${symCount} symptom${symCount > 1 ? 's' : ''}`);

  const impactLabels = {
    curious: isEs ? 'Con curiosidad' : 'Curious',
    some: isEs ? 'Algunos días difíciles' : 'Some hard days',
    lot: isEs ? 'Difícil de ignorar' : 'Hard to ignore',
    unsure: isEs ? 'Sin certeza' : 'Not sure yet',
  };
  if (answers.impact) chips.push(impactLabels[answers.impact]);

  return chips;
}

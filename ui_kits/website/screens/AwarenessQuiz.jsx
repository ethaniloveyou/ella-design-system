// Awareness Quiz, a gentle 5-question check-in. No score, no diagnosis.
// Answers (stage, symptoms, impact, goals, doctor history) feed a
// recommendation engine that points each woman to the right reading.

export function AwarenessQuiz({ lang, setRoute }) {
  const t = useT(lang);
  const isEs = lang === 'es';
  const [step, setStep] = React.useState(0);
  const [answers, setAnswers] = React.useState({});

  // ---- Question set. Bilingual labels live here so the engine can match
  // on stable answer KEYS regardless of language. ----
  const questions = [
    {
      id: 'stage', kind: 'single',
      text: isEs ? '¿En qué parte de tu camino estás?' : 'Where are you in your journey?',
      help: isEs ? 'No hace falta certeza. Elige lo que más se acerque.' : 'No need to be certain. Pick whatever feels closest.',
      opts: [
        { key: 'regular',  label: isEs ? 'Mis períodos siguen siendo regulares' : 'My periods are still regular' },
        { key: 'changing', label: isEs ? 'Mis períodos están cambiando o son irregulares' : 'My periods are changing or irregular' },
        { key: 'post',     label: isEs ? 'Han pasado 12+ meses desde mi último período' : "It's been 12+ months since my last period" },
        { key: 'surgical', label: isEs ? 'Tuve menopausia quirúrgica o médica' : "I've had surgical or medical menopause" },
        { key: 'unsure',   label: isEs ? 'No estoy segura de dónde estoy' : "I'm not sure where I am" },
      ],
    },
    {
      id: 'symptoms', kind: 'multi',
      text: isEs ? '¿Cuáles de estos has notado últimamente?' : "Which of these have you noticed lately?",
      help: isEs ? 'Elige todas las que apliquen. Está bien dejarlo en blanco.' : 'Choose all that apply. It is okay to leave it blank.',
      opts: [
        { key: 'hot',      label: isEs ? 'Sofocos o sudores nocturnos' : 'Hot flashes or night sweats' },
        { key: 'sleep',    label: isEs ? 'Cambios en el sueño o insomnio' : 'Sleep changes or insomnia' },
        { key: 'mood',     label: isEs ? 'Cambios de humor, ansiedad o tristeza' : 'Mood shifts, anxiety, or low mood' },
        { key: 'fog',      label: isEs ? 'Niebla mental o lapsos de memoria' : 'Brain fog or memory lapses' },
        { key: 'periods',  label: isEs ? 'Períodos irregulares o abundantes' : 'Irregular or heavy periods' },
        { key: 'intimacy', label: isEs ? 'Sequedad vaginal o cambios en la libido' : 'Vaginal dryness or changes in libido' },
        { key: 'body',     label: isEs ? 'Dolores articulares o cambios de peso' : 'Joint aches or weight changes' },
        { key: 'none',     label: isEs ? 'Ninguno de estos por ahora' : 'None of these right now', exclusive: true },
      ],
    },
    {
      id: 'impact', kind: 'single',
      text: isEs ? '¿Cuánto está afectando tu día a día?' : 'How much is this affecting your daily life?',
      opts: [
        { key: 'curious', label: isEs ? 'Apenas, tengo curiosidad' : "Barely, I'm mostly curious" },
        { key: 'some',    label: isEs ? 'Algunos días son más difíciles' : 'Some days are harder than others' },
        { key: 'lot',     label: isEs ? 'Mucho, es difícil de ignorar' : "A lot, it's hard to ignore" },
        { key: 'unsure',  label: isEs ? 'Honestamente, no estoy segura' : "I'm honestly not sure" },
      ],
    },
    {
      id: 'goals', kind: 'multi',
      text: isEs ? '¿Qué te sería más útil ahora mismo?' : 'What would feel most helpful right now?',
      help: isEs ? 'Elige todas las que apliquen.' : 'Choose all that apply.',
      opts: [
        { key: 'understand',  label: isEs ? 'Entender qué le pasa a mi cuerpo' : "Understanding what's happening to my body" },
        { key: 'nutrition',   label: isEs ? 'Nutrición y ejercicio para esta etapa' : 'Nutrition and exercise that fit this stage' },
        { key: 'supplements', label: isEs ? 'Saber qué suplementos valen la pena' : 'Knowing which supplements are worth it' },
        { key: 'hormones',    label: isEs ? 'Conocer las opciones de terapia hormonal' : 'Learning about hormone therapy options' },
        { key: 'doctor',      label: isEs ? 'Saber qué preguntarle a mi médico' : 'Knowing what to ask my doctor' },
        { key: 'support',     label: isEs ? 'Sentirme menos sola en esto' : 'Feeling less alone in it' },
      ],
    },
    {
      id: 'care', kind: 'single',
      text: isEs ? '¿Has hablado con un médico sobre esto?' : 'Have you talked to a doctor about this?',
      opts: [
        { key: 'helpful',   label: isEs ? 'Sí, y fue útil' : 'Yes, and it was helpful' },
        { key: 'dismissed', label: isEs ? 'Sí, pero me sentí ignorada' : 'Yes, but I felt dismissed' },
        { key: 'notyet',    label: isEs ? 'Todavía no' : 'Not yet' },
        { key: 'how',       label: isEs ? 'No, no sé cómo sacar el tema' : "No, I'm not sure how to bring it up" },
      ],
    },
  ];

  const done = step >= questions.length;
  const q = questions[step];
  const selected = answers[q?.id] || (q?.kind === 'multi' ? [] : null);

  function select(opt) {
    if (q.kind === 'multi') {
      let next;
      if (opt.exclusive) {
        next = selected.includes(opt.key) ? [] : [opt.key];
      } else {
        const base = selected.filter(k => {
          const o = q.opts.find(x => x.key === k);
          return !(o && o.exclusive); // picking a real option clears "none"
        });
        next = base.includes(opt.key) ? base.filter(o => o !== opt.key) : [...base, opt.key];
      }
      setAnswers({ ...answers, [q.id]: next });
    } else {
      setAnswers({ ...answers, [q.id]: opt.key });
    }
  }

  const canAdvance = q && (q.kind === 'multi' ? true : !!selected);

  // ---------- Recommendation engine ----------
  function buildCards() {
    return {
      foundations: {
        icon: <IconSparkle width="26" height="26" />, tone: 'plum', route: 'article',
        title: isEs ? 'Empieza aquí: ¿qué es la perimenopausia?' : 'Start here: what is perimenopause?',
        desc: isEs ? 'Un panorama claro de las etapas, en unos 6 minutos.' : 'A clear overview of the stages, in about 6 minutes.',
        cta: isEs ? 'Leer' : 'Read',
      },
      postLife: {
        icon: <IconMoon width="26" height="26" />, tone: 'plum', route: 'article',
        title: isEs ? 'La vida después de la menopausia' : 'Life after menopause',
        desc: isEs ? 'Qué cambia a largo plazo y cómo cuidarte ahora.' : 'What changes long term, and how to care for yourself now.',
        cta: isEs ? 'Leer' : 'Read',
      },
      hot: {
        icon: <IconHeart width="26" height="26" />, tone: 'rose', route: 'hormones',
        title: isEs ? 'Sofocos y sudores nocturnos' : 'Hot flashes & night sweats',
        desc: isEs ? 'Qué los causa y las opciones que realmente tienes.' : 'What causes them and the options you actually have.',
        cta: isEs ? 'Explorar opciones' : 'Explore options',
      },
      sleep: {
        icon: <IconMoon width="26" height="26" />, tone: 'plum', route: 'article',
        title: isEs ? 'Sueño, hormonas y cortisol' : 'Sleep, hormones & cortisol',
        desc: isEs ? 'Por qué cambia el sueño y qué realmente ayuda.' : 'Why sleep shifts now, and what actually helps.',
        cta: isEs ? 'Leer' : 'Read',
      },
      mood: {
        icon: <IconBrain width="26" height="26" />, tone: 'plum', route: 'article',
        title: isEs ? 'Cambios de humor en los 40 y 50' : 'Mood shifts in your 40s and 50s',
        desc: isEs ? 'No es solo estrés. La conexión hormonal, explicada.' : "It's not just stress. The hormonal connection, explained.",
        cta: isEs ? 'Leer' : 'Read',
      },
      fog: {
        icon: <IconBrain width="26" height="26" />, tone: 'plum', route: 'article',
        title: isEs ? 'Niebla mental, explicada' : 'Brain fog, explained',
        desc: isEs ? 'Qué pasa con la concentración y qué ayuda.' : 'What happens to focus, and what helps.',
        cta: isEs ? 'Leer' : 'Read',
      },
      periods: {
        icon: <IconDownload width="26" height="26" />, tone: 'rose', route: 'doctor',
        title: isEs ? 'Cuándo hablar con tu ginecóloga' : 'When to talk to your OB-GYN',
        desc: isEs ? 'Una lista para llevar a tu próxima visita.' : 'A checklist to bring to your next visit.',
        cta: isEs ? 'Ver lista' : 'See checklist',
      },
      intimacy: {
        icon: <IconHeart width="26" height="26" />, tone: 'rose', route: 'hormones',
        title: isEs ? 'Intimidad y sequedad, sin tabúes' : 'Intimacy & dryness, without the taboo',
        desc: isEs ? 'Lo que cambia y qué opciones ayudan de verdad.' : 'What changes, and which options genuinely help.',
        cta: isEs ? 'Explorar opciones' : 'Explore options',
      },
      body: {
        icon: <IconLeaf width="26" height="26" />, tone: 'sage', route: 'nutrition',
        title: isEs ? 'Articulaciones, músculo y peso' : 'Joints, muscle & weight',
        desc: isEs ? 'Por qué cambia el cuerpo y qué hábitos importan más ahora.' : 'Why the body shifts, and which habits matter most now.',
        cta: isEs ? 'Explorar' : 'Explore',
      },
      nutrition: {
        icon: <IconLeaf width="26" height="26" />, tone: 'sage', route: 'nutrition',
        title: isEs ? 'Comer para el cambio hormonal' : 'Eating for hormonal change',
        desc: isEs ? 'Cambios simples que importan más en esta etapa.' : 'Simple swaps that matter more at this stage.',
        cta: isEs ? 'Explorar' : 'Explore',
      },
      supplements: {
        icon: <IconDroplet width="26" height="26" />, tone: 'rose', route: 'supplements',
        title: isEs ? 'Los suplementos que conviene conocer' : 'The supplements worth knowing',
        desc: isEs ? 'Qué vale la pena tomar, con la evidencia detrás.' : 'What is worth taking, with the evidence behind it.',
        cta: isEs ? 'Ver lista' : 'See the list',
      },
      hormones: {
        icon: <IconHeart width="26" height="26" />, tone: 'rose', route: 'hormones',
        title: isEs ? 'Terapia hormonal, en lenguaje claro' : 'Hormone therapy, in plain language',
        desc: isEs ? 'Las opciones explicadas. Sin recomendar, solo claridad.' : 'The options explained. No endorsements, just clarity.',
        cta: isEs ? 'Explorar opciones' : 'Explore options',
      },
      doctor: {
        icon: <IconDownload width="26" height="26" />, tone: 'rose', route: 'doctor',
        title: isEs ? 'Preguntas para tu próxima cita' : 'Questions for your next appointment',
        desc: isEs ? 'Una lista imprimible para llegar preparada.' : 'A printable list so you walk in prepared.',
        cta: isEs ? 'Ver lista' : 'See checklist',
      },
      specialist: {
        icon: <IconArrow width="26" height="26" />, tone: 'plum', route: 'hormones',
        title: isEs ? 'Cómo encontrar un especialista en menopausia' : 'How to find a menopause specialist',
        desc: isEs ? 'Qué buscar cuando no te sientes escuchada.' : "What to look for when you don't feel heard.",
        cta: isEs ? 'Aprender' : 'Learn how',
      },
      support: {
        icon: <IconUsers width="26" height="26" />, tone: 'sage', route: 'about',
        title: isEs ? 'No estás sola en esto' : "You're not alone in this",
        desc: isEs ? 'Conoce a Jessica y por qué existe Ella.' : 'Meet Jessica and why Ella exists.',
        cta: isEs ? 'Conocer' : 'Meet Jessica',
      },
    };
  }

  function getRecommendations() {
    const cards = buildCards();
    const stage = answers.stage;
    const symptoms = (answers.symptoms || []).filter(k => k !== 'none');
    const goals = answers.goals || [];
    const impact = answers.impact;
    const care = answers.care;

    const recs = [];
    const seen = new Set();
    const add = (card) => { if (card && !seen.has(card.title)) { seen.add(card.title); recs.push(card); } };

    // 1. If she felt dismissed or hasn't raised it yet, lead with advocacy tools.
    if ((care === 'dismissed' || care === 'how') && (symptoms.length || impact === 'lot' || impact === 'some')) {
      add(cards.doctor);
      if (care === 'dismissed') add(cards.specialist);
    }

    // 2. Symptom-specific reading, in the order she selected.
    symptoms.forEach(s => add(cards[s]));

    // 3. Honor what she said she's looking for.
    const goalMap = {
      understand: cards.foundations, nutrition: cards.nutrition, supplements: cards.supplements,
      hormones: cards.hormones, doctor: cards.doctor, support: cards.support,
    };
    goals.forEach(g => add(goalMap[g]));

    // 4. Stage-aware foundations.
    if (stage === 'unsure' || stage === 'regular' || stage === 'changing') add(cards.foundations);
    if (stage === 'post' || stage === 'surgical') add(cards.postLife);

    // 5. Make sure she leaves with at least three doors open.
    [cards.foundations, cards.nutrition, cards.supplements].forEach(add);

    return recs.slice(0, 4);
  }

  // Responsible flag: postmenopausal bleeding is always worth a doctor visit.
  function safetyNote() {
    const stage = answers.stage;
    const symptoms = answers.symptoms || [];
    if ((stage === 'post' || stage === 'surgical') && symptoms.includes('periods')) {
      return isEs
        ? 'Un dato importante: cualquier sangrado después de la menopausia merece una llamada a tu médico, aunque casi siempre sea benigno. Vale la pena revisarlo.'
        : 'One important note: any bleeding after menopause is worth a call to your doctor, even though it is usually nothing serious. It is worth getting checked.';
    }
    return null;
  }

  function resultIntro() {
    const symptoms = (answers.symptoms || []).filter(k => k !== 'none');
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

  // Small human-readable recap of the answers.
  function recapChips() {
    const chips = [];
    const stageLabels = {
      regular: isEs ? 'Períodos regulares' : 'Regular periods',
      changing: isEs ? 'Períodos cambiando' : 'Periods changing',
      post: isEs ? 'Posmenopausia' : 'Postmenopause',
      surgical: isEs ? 'Menopausia médica' : 'Medical menopause',
      unsure: isEs ? 'Etapa por definir' : 'Stage to be determined',
    };
    if (answers.stage) chips.push(stageLabels[answers.stage]);
    const symCount = (answers.symptoms || []).filter(k => k !== 'none').length;
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

  // ============ RESULTS ============
  if (done) {
    const recs = getRecommendations();
    const note = safetyNote();
    const chips = recapChips();
    return (
      <div data-screen-label="03 Quiz Results">
        <section className="ella-section">
          <div className="ella-container">
            <div className="ella-quiz">
              <div className="ella-eyebrow">{isEs ? 'GRACIAS POR COMPARTIR' : 'THANK YOU FOR SHARING'}</div>
              <h2 className="ella-quiz-q" style={{ marginTop: 14 }}>
                {isEs ? 'Aquí está un punto de partida, solo para ti.' : "Here's a starting place, just for you."}
              </h2>

              {chips.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 18, marginBottom: 4 }}>
                  {chips.map((c, i) => (
                    <span key={i} style={{
                      fontSize: 13, fontWeight: 700, letterSpacing: '0.02em',
                      color: 'var(--ella-clay-700)', background: 'var(--ella-cream-100)',
                      border: '1px solid var(--border-default)', borderRadius: 999, padding: '6px 14px',
                    }}>{c}</span>
                  ))}
                </div>
              )}

              <p style={{ fontSize: 18, lineHeight: 1.65, color: 'var(--ella-clay-700)', maxWidth: '60ch', marginTop: 16 }}>
                {resultIntro()}
              </p>

              {note && (
                <div style={{
                  display: 'flex', gap: 12, alignItems: 'flex-start',
                  background: 'var(--ella-blush-50)', border: '1px solid var(--ella-blush-100)',
                  borderRadius: 14, padding: '16px 18px', margin: '20px 0 4px', maxWidth: '62ch',
                }}>
                  <span style={{ color: 'var(--ella-rose-deep)', flexShrink: 0, marginTop: 2 }}><IconHeart width="20" height="20" /></span>
                  <p style={{ fontSize: 15.5, lineHeight: 1.55, color: 'var(--ella-clay-700)', margin: 0 }}>{note}</p>
                </div>
              )}

              <div className="ella-pillars" style={{ marginTop: 32 }}>
                {recs.map((r, i) => (
                  <a key={i} className="ella-pillar-card" data-tone={r.tone} href="#" onClick={(e) => { e.preventDefault(); setRoute(r.route); }}>
                    <div className="ella-pillar-icon">{r.icon}</div>
                    <h3>{r.title}</h3>
                    <p>{r.desc}</p>
                    <span className="ella-pillar-cta">{r.cta} <IconArrow width="16" height="16" /></span>
                  </a>
                ))}
              </div>

              <div style={{ marginTop: 32, display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
                <button type="button" className="ella-btn ella-btn-text" onClick={() => { setStep(0); setAnswers({}); }}>
                  {isEs ? 'Repetir el chequeo' : 'Retake the check-in'}
                </button>
                <button type="button" className="ella-btn ella-btn-text" onClick={() => setRoute('articles')}>
                  {isEs ? 'Ver todos los artículos' : 'Browse all articles'} <IconArrow width="16" height="16" />
                </button>
              </div>

              <p style={{ fontSize: 13.5, lineHeight: 1.5, color: 'var(--ella-taupe-500)', marginTop: 28, maxWidth: '60ch' }}>
                {isEs
                  ? 'Esto es información general, no consejo médico ni un diagnóstico. Para tu situación específica, habla con tu médico.'
                  : 'This is general information, not medical advice or a diagnosis. For your specific situation, talk with your own doctor.'}
              </p>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // ============ QUESTION ============
  const pct = Math.round((step / questions.length) * 100);
  return (
    <div data-screen-label="03 Quiz">
      <section className="ella-section">
        <div className="ella-container">
          <div className="ella-quiz">
            <div className="ella-quiz-progress">
              <span>{t('quiz_progress', { n: step + 1, total: questions.length })}</span>
              <span>{pct}%</span>
            </div>
            <div className="ella-quiz-bar">
              <div className="ella-quiz-bar-fill" style={{ width: `${pct}%` }} />
            </div>

            <h2 className="ella-quiz-q">{q.text}</h2>
            {q.help && (
              <p style={{ fontSize: 16, lineHeight: 1.5, color: 'var(--ella-taupe-500)', margin: '-4px 0 22px' }}>{q.help}</p>
            )}

            <div className="ella-quiz-opts">
              {q.opts.map((opt) => {
                const isSel = q.kind === 'multi' ? (selected || []).includes(opt.key) : selected === opt.key;
                return (
                  <button
                    key={opt.key}
                    type="button"
                    className={'ella-quiz-opt' + (isSel ? ' is-selected' : '')}
                    onClick={() => select(opt)}
                  >
                    <span className="ella-quiz-check" />
                    <span>{opt.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="ella-quiz-nav">
              <button
                type="button"
                className="ella-btn ella-btn-text"
                onClick={() => (step === 0 ? setRoute('home') : setStep(step - 1))}
              >{'\u2190 '}{t('quiz_back')}</button>
              <button
                type="button"
                className="ella-btn ella-btn-primary"
                disabled={!canAdvance}
                style={!canAdvance ? { opacity: 0.45, cursor: 'not-allowed' } : null}
                onClick={() => canAdvance && setStep(step + 1)}
              >
                {step === questions.length - 1 ? t('quiz_finish') : t('quiz_next')}
                <IconArrow width="18" height="18" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

window.AwarenessQuiz = AwarenessQuiz;

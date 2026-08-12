// Homepage, final Pause-Life-inspired editorial layout.
// Order: hero → "why this matters" intro → pillars → quiz banner →
//        consultation → testimonials → info link grid.

export function Homepage({ lang, setRoute, primaryColor, heroVariant }) {
  const t = useT(lang);
  const isEs = lang === 'es';

  return (
    <div data-screen-label="01 Homepage">
      {/* ============== HERO ============== */}
      <section className="ella-hero" data-screen-label="hero">
        <div className="ella-container">
          <div className="ella-hero-grid">
            <div>
              <h1>
                {isEs ? <>Por mujeres, <em>para mujeres.</em></> : <>By women, <em>for women.</em></>}
              </h1>
              <p style={{ fontWeight: 500 }}>
                {isEs
                  ? <><b>Todo lo que necesitas saber sobre la menopausia.</b> Información sobre nutrición, suplementos, ejercicio, salud mental, y las preguntas que debes hacerle a tu médico. Hecho para ser accesible y asequible.</>
                  : <><b>Everything you need to know about menopause.</b> Information about nutrition, supplements, exercise, mental health, and the questions to ask your doctor. Built to be accessible and affordable.</>}
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 8 }}>
                <button type="button" className="ella-btn ella-btn-primary ella-btn-lg" onClick={() => setRoute('articles')}>
                  {isEs ? 'Empieza a leer' : 'Start reading'}
                  <IconArrow width="20" height="20" />
                </button>
              </div>
              <div className="ella-hero-cred" aria-label="About the author">
                <div className="ella-hero-cred-avatar" />
                <div>
                  <strong>Jessica Zavala, PA-C</strong> · {isEs ? 'Certificado en bienestar de la mujer' : "Women's wellness certificate"}
                </div>
              </div>
            </div>
            <div style={{ position: 'relative' }}>
              <IllustrationSprig width={120} className="ella-hero-ornament tl" />
              <Photo aspect="4/5" tint="rose" src="assets/photos/portrait-terrace.jpg" objectPosition="68% center" alt={isEs ? 'Mujer sonriendo en una terraza a la luz natural' : 'Woman smiling on a terrace in natural light'} radius="24px">
                <IllustrationBranch width={160} className="ella-hero-ornament br" />
              </Photo>
            </div>
          </div>
          <div style={{ height: 24 }} />
        </div>
      </section>

      {/* ============== WHY THIS MATTERS, menopause intro ============== */}
      <section className="ella-section ella-bg-cream" data-screen-label="why">
        <div className="ella-container">
          <div style={{ maxWidth: 780, margin: '0 auto', textAlign: 'center' }}>
            <div className="ella-eyebrow" style={{ fontSize: 24, fontWeight: 800 }}>{isEs ? 'POR QUÉ IMPORTA' : 'WHY THIS MATTERS'}</div>
            <p style={{ fontSize: 19, lineHeight: 1.65, color: 'var(--ella-clay-700)', marginTop: 18, fontWeight: 500 }}>
              {isEs
                ? 'Cerca de la mitad de todas las mujeres pasan por la menopausia, y aun así, la mayoría de los planes de estudio médicos le dedican menos de una hora. El resultado: millones de mujeres atraviesan una década de cambios hormonales casi sin orientación real.'
                : 'About half of all women will go through menopause, and yet most medical curricula spend less than an hour on it. The result: millions of women navigate a decade of hormonal change with almost no real guidance.'}
            </p>
            <p style={{ fontSize: 19, lineHeight: 1.65, color: 'var(--ella-clay-700)', marginTop: 16, fontWeight: 500 }}>
              {isEs
                ? 'Saber qué está pasando, qué vale la pena hacer al respecto, y qué preguntas hacerle a tu médico, esa es la diferencia entre sentirte perdida y sentirte al mando. Ella es para lo segundo.'
                : 'Know what’s happening, what to do about it, and what questions to ask your doctor.'}
            </p>
          </div>

        </div>
      </section>

      {/* ============== PULL QUOTE ============== */}
      <section className="ella-section-tight" data-screen-label="quote">
        <div className="ella-container" style={{ textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 'clamp(22px, 2.6vw, 30px)', lineHeight: 1.4, color: 'var(--ella-clay-900)', maxWidth: 680, margin: '0 auto' }}>
            {isEs
              ? '\u00abNo est\u00e1s sola en esto, y mereces informaci\u00f3n en tu propio idioma.\u00bb'
              : '\u201cYou\u2019re not alone in this, and you deserve real information, in your own language.\u201d'}
          </p>
          <p style={{ marginTop: 14, fontSize: 14, letterSpacing: '0.04em', color: 'var(--ella-taupe-500)', textTransform: 'uppercase' }}>
            — Jessica Zavala
          </p>
        </div>
      </section>

      {/* ============== PILLARS, "What we cover" ============== */}
      <section className="ella-section" data-screen-label="pillars">
        <div className="ella-container">
          <div className="ella-section-head" style={{ maxWidth: 720, margin: '0 auto 32px', textAlign: 'center' }}>
            <h2 className="ella-h2-italic">{isEs ? <>Todo en un solo <em>lugar.</em></> : <>Everything in <em>one place.</em></>}</h2>
            <div className="ella-eyebrow" style={{ fontSize: 18, fontStyle: 'normal', fontWeight: 800, textAlign: 'center' }}>{t('pillars_eyebrow')}</div>
          </div>
          <div className="ella-pillars">
            <a className="ella-pillar-card" data-tone="sage" href="#" onClick={(e) => { e.preventDefault(); setRoute('nutrition'); }}>
              <div className="ella-pillar-icon"><IconLeaf width="28" height="28" /></div>
              <h3>{t('pillar_nutrition')}</h3>
              <p>{isEs ? 'Alimentos para incluir, necesidades de proteína durante la menopausia, sustituciones más sanas.' : 'Foods to include, protein needs during menopause, healthier swaps.'}</p>
              <span className="ella-pillar-cta">{isEs ? 'Explorar' : 'Explore'} <IconArrow width="16" height="16" /></span>
            </a>
            <a className="ella-pillar-card" href="#" onClick={(e) => { e.preventDefault(); setRoute('supplements'); }}>
              <div className="ella-pillar-icon"><IconDroplet width="28" height="28" /></div>
              <h3>{t('pillar_supplements')}</h3>
              <p>{t('pillar_supplements_desc')}</p>
              <span className="ella-pillar-cta">{isEs ? 'Ver lista' : 'See the list'} <IconArrow width="16" height="16" /></span>
            </a>
            <a className="ella-pillar-card" data-tone="sage" href="#" onClick={(e) => { e.preventDefault(); setRoute('articles'); }}>
              <div className="ella-pillar-icon"><IconDumbbell width="28" height="28" /></div>
              <h3>{t('pillar_exercise')}</h3>
              <p>{isEs ? 'Entrenamiento de fuerza, caminar, yoga. Las pesas ligeras cuentan.' : 'Strength training, walking, yoga. Light weights count.'}</p>
              <span className="ella-pillar-cta">{isEs ? 'Empezar' : 'Get started'} <IconArrow width="16" height="16" /></span>
            </a>
            <a className="ella-pillar-card" data-tone="plum" href="#" onClick={(e) => { e.preventDefault(); setRoute('articles'); }}>
              <div className="ella-pillar-icon"><IconBrain width="28" height="28" /></div>
              <h3>{t('pillar_mental')}</h3>
              <p>{isEs ? 'Grupos de apoyo y recursos.' : 'Support groups and resource links.'}</p>
              <span className="ella-pillar-cta">{isEs ? 'Encuentra apoyo' : 'Find support'} <IconArrow width="16" height="16" /></span>
            </a>
            <a className="ella-pillar-card" href="#" onClick={(e) => { e.preventDefault(); setRoute('articles'); }}>
              <div className="ella-pillar-icon"><IconSparkle width="28" height="28" /></div>
              <h3>{t('pillar_skin')}</h3>
              <p>{t('pillar_skin_desc')}</p>
              <span className="ella-pillar-cta">{isEs ? 'Aprender' : 'Learn'} <IconArrow width="16" height="16" /></span>
            </a>
          </div>
        </div>
      </section>

      {/* ============== CHECK-IN BANNER ============== */}
      <section className="ella-section-tight" data-screen-label="checkin">
        <div className="ella-container">
          <div className="ella-checkin">
            <div className="ella-checkin-num" aria-hidden="true">
              <span>1</span>
              <span>2</span>
            </div>
            <div className="ella-checkin-body">
              <div className="ella-eyebrow">{isEs ? 'CHEQUEO PERSONAL' : 'PERSONAL CHECK-IN'}</div>
              <h2 className="ella-h2-italic" style={{ marginTop: 10 }}>
                {isEs ? <>¿No sabes <em>por dónde empezar?</em></> : <>Not sure <em>where to start?</em></>}
              </h2>
              <p style={{ fontSize: 18, lineHeight: 1.6, color: 'var(--ella-clay-700)', marginTop: 14, maxWidth: '52ch' }}>
                {isEs
                  ? 'Responde unas preguntas rápidas y te mostraremos qué leer primero, según lo que estás viviendo.'
                  : 'Answer a few quick questions and we\u2019ll point you to the right reading, based on what you\u2019re actually experiencing.'}
              </p>
              <button type="button" className="ella-btn ella-btn-primary ella-btn-lg" style={{ marginTop: 22 }} onClick={() => setRoute('quiz')}>
                {isEs ? 'Hacer el chequeo' : 'Take the check-in'}
                <IconArrow width="20" height="20" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============== CONSULTATION / WORK WITH JESSICA ============== */}
      <section className="ella-section" data-screen-label="consultation" id="book">
        <div className="ella-container">
          <div className="ella-consult">
            <div className="ella-consult-art">
              <Photo aspect="4/5" tint="sage" alt={isEs ? 'Retrato cálido de Jessica' : 'Warm portrait of Jessica'} radius="22px" />
              <div className="ella-consult-badge">
                <span className="ella-consult-badge-min">30</span>
                <span className="ella-consult-badge-lbl">{isEs ? 'min' : 'min'}</span>
              </div>
            </div>
            <div className="ella-consult-body">
              <div className="ella-eyebrow" style={{ fontSize: 18 }}>{isEs ? 'TRABAJA CONMIGO' : 'WORK WITH ME'}</div>
              <h2 className="ella-h2-italic" style={{ marginTop: 10 }}>
                {isEs ? <>Reserva una <em>consulta de bienestar</em> de 30 minutos.</> : <>Book a 30-minute <em>wellness consultation.</em></>}
              </h2>
              <p style={{ fontSize: 18, lineHeight: 1.6, color: 'var(--ella-clay-700)', marginTop: 14, maxWidth: '54ch' }}>
                {isEs
                  ? 'Una llamada con Jessica para hablar de tus síntomas, tus preguntas, y qué dirección tomar.'
                  : 'A call with Jessica to talk through your symptoms, your questions, and where to go next.'}
              </p>
              <ul className="ella-consult-list">
                <li>{isEs ? 'Por dónde empezar' : 'Where to start'}</li>
                <li>{isEs ? 'Qué preguntarle a tu médico' : 'What to ask your own doctor'}</li>
                <li>{isEs ? 'Orientación personalizada para tu etapa' : 'Personalized guidance for your stage'}</li>
              </ul>
              <div className="ella-consult-actions">
                <a className="ella-btn ella-btn-primary ella-btn-lg" href={ELLA_LINKS.calendar} target="_blank" rel="noopener noreferrer" style={{ position: 'relative' }}>
                  <IconCalendar width="20" height="20" />
                  {isEs ? 'Agendar en Google Calendar' : 'Schedule on Google Calendar'}
                </a>
                <a className="ella-btn ella-btn-whatsapp ella-btn-lg" href={ELLA_LINKS.whatsapp} target="_blank" rel="noopener noreferrer" style={{ color: '#FFFFFF', backgroundColor: '#2B1D14' }}>
                  <IconWhatsApp width="20" height="20" />
                  {isEs ? 'Escríbeme por WhatsApp' : 'Message me on WhatsApp'}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============== TESTIMONIALS ============== */}
      <Testimonials lang={lang} />

      {/* ============== FAQ ============== */}
      <section className="ella-section ella-bg-cream" data-screen-label="faq">
        <div className="ella-container">
          <div className="ella-section-head" style={{ maxWidth: 720, margin: '0 auto 32px', textAlign: 'center' }}>
            <div className="ella-eyebrow">{isEs ? 'PREGUNTAS FRECUENTES' : 'FREQUENTLY ASKED'}</div>
            <h2 className="ella-h2-italic">{isEs ? <>Lo que más <em>me preguntan.</em></> : <>What people <em>ask me most.</em></>}</h2>
          </div>
          <div style={{ maxWidth: 720, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              {
                q: isEs ? '\u00bfQui\u00e9n es Jessica?' : 'Who is Jessica?',
                a: isEs
                  ? 'Soy una mujer de 53 a\u00f1os, madre de tres, que pas\u00f3 por su propia perimenopausia m\u00e1s tarde de lo esperado y con s\u00edntomas que no se parec\u00edan a lo que me hab\u00edan contado. Cre\u00e9 Ella para compartir lo que aprend\u00ed con otras mujeres, especialmente hispanohablantes.'
                  : "I'm a 53-year-old mother of three who went through my own perimenopause later than expected, with symptoms that didn't match what I'd been told to expect. I created Ella to share what I learned with other women, especially Spanish speakers.",
              },
              {
                q: isEs ? '\u00bfElla reemplaza a mi m\u00e9dico?' : 'Does Ella replace my doctor?',
                a: isEs
                  ? 'No. Ella comparte informaci\u00f3n general, no consejo m\u00e9dico personalizado ni diagn\u00f3stico. Siempre habla con tu propio m\u00e9dico sobre tu situaci\u00f3n espec\u00edfica.'
                  : "No. Ella shares general information, not personalized medical advice or a diagnosis. Always talk to your own doctor about your specific situation.",
              },
              {
                q: isEs ? '\u00bfPor qu\u00e9 en espa\u00f1ol?' : 'Why in Spanish?',
                a: isEs
                  ? 'Las personas hispanohablantes suelen tener menos acceso a informaci\u00f3n confiable sobre la menopausia. Nac\u00ed en EE. UU. en una familia inmigrante y hablo ambos idiomas, as\u00ed que quise que Ella fuera accesible en los dos.'
                  : 'Spanish speakers often have less access to reliable menopause information. I was born in the U.S. to an immigrant family and speak both languages, so I wanted Ella to be accessible in both.',
              },
              {
                q: isEs ? '\u00bfCu\u00e1ndo empieza la menopausia?' : 'When does menopause start?',
                a: isEs
                  ? 'No hay una edad fija. Puede comenzar tan pronto como a los 40 o hasta mediados de los 50. Cada cuerpo es distinto, y eso es exactamente por lo que Ella existe.'
                  : "There's no fixed age. It can start as early as 40 or as late as your mid-50s. Every body is different, and that's exactly why Ella exists.",
              },
            ].map((item, i) => (
              <details key={i} style={{ background: 'var(--ella-cream-50)', border: '1px solid var(--border-default)', borderRadius: 14, padding: '18px 22px' }}>
                <summary style={{ cursor: 'pointer', fontFamily: 'var(--font-display)', fontSize: 19, color: 'var(--ella-clay-900)', listStyle: 'none' }}>{item.q}</summary>
                <p style={{ marginTop: 10, fontSize: 16, lineHeight: 1.6, color: 'var(--ella-clay-700)' }}>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

window.Homepage = Homepage;

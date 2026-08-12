// Reproductive Cancers & HPV, awareness, screening, and where to learn more.
// Sensitive content. Frame as: clear info, actionable next steps, no scaring.

export function ReproductiveHealth({ lang, setRoute }) {
  const isEs = lang === 'es';

  const screenings = [
    {
      name: isEs ? 'Citolog\u00eda / Papanicolaou' : 'Pap smear',
      every: isEs ? 'Cada 3 a\u00f1os \u00b7 21\u201365' : 'Every 3 years \u00b7 ages 21\u201365',
      desc: isEs
        ? 'Detecta cambios celulares en el cuello uterino. La perimenopausia no te exime, sigue siendo importante.'
        : 'Catches cervical cell changes early. Perimenopause doesn\u2019t exempt you, keep going.',
    },
    {
      name: isEs ? 'Prueba de VPH' : 'HPV test',
      every: isEs ? 'Cada 5 a\u00f1os \u00b7 30\u201365' : 'Every 5 years \u00b7 ages 30\u201365',
      desc: isEs
        ? 'Detecta los tipos de VPH que causan c\u00e1ncer. Se puede hacer junto con el Papanicolaou (co-prueba).'
        : 'Detects the cancer-causing strains of HPV. Often done with the Pap smear (co-testing).',
    },
    {
      name: isEs ? 'Mamograf\u00eda' : 'Mammogram',
      every: isEs ? 'Cada 1\u20132 a\u00f1os \u00b7 40+' : 'Every 1\u20132 years \u00b7 ages 40+',
      desc: isEs
        ? 'Detecci\u00f3n temprana del c\u00e1ncer de mama. Habla con tu m\u00e9dico sobre tu riesgo personal.'
        : 'Early detection for breast cancer. Talk to your doctor about your personal risk.',
    },
    {
      name: isEs ? 'Examen p\u00e9lvico' : 'Pelvic exam',
      every: isEs ? 'Anual o seg\u00fan recomendaci\u00f3n' : 'Yearly or as recommended',
      desc: isEs
        ? 'Detecta cambios en ovarios y \u00fatero. Reporta cualquier sangrado posmenop\u00e1usico de inmediato.'
        : 'Catches ovarian and uterine changes. Report any post-menopausal bleeding right away.',
    },
  ];

  const cancers = [
    {
      name: isEs ? 'C\u00e1ncer cervical' : 'Cervical cancer',
      cause: isEs ? 'Casi siempre causado por VPH' : 'Almost always caused by HPV',
      detail: isEs
        ? 'Altamente prevenible con detecci\u00f3n regular. Si te has saltado pruebas, es momento de retomarlas.'
        : 'Highly preventable with regular screening. If you\u2019ve missed Paps, now is the time to get back on schedule.',
    },
    {
      name: isEs ? 'C\u00e1ncer de ovario' : 'Ovarian cancer',
      cause: isEs ? 'A menudo silencioso' : 'Often silent in early stages',
      detail: isEs
        ? 'Vigila s\u00edntomas persistentes: hinchaz\u00f3n, dolor p\u00e9lvico, sensaci\u00f3n de llenura r\u00e1pida. Si duran m\u00e1s de 2\u20133 semanas, ve al m\u00e9dico.'
        : 'Watch for persistent symptoms: bloating, pelvic pain, feeling full quickly. Lasting more than 2\u20133 weeks? See your doctor.',
    },
    {
      name: isEs ? 'C\u00e1ncer uterino / endometrial' : 'Uterine / endometrial cancer',
      cause: isEs ? 'M\u00e1s com\u00fan despu\u00e9s de los 50' : 'Most common after age 50',
      detail: isEs
        ? 'Cualquier sangrado despu\u00e9s de la menopausia debe evaluarse. No esperes, esto es importante.'
        : 'Any bleeding after menopause needs to be checked. Don\u2019t wait, this one matters.',
    },
    {
      name: isEs ? 'C\u00e1ncer de mama' : 'Breast cancer',
      cause: isEs ? 'El riesgo aumenta con la edad' : 'Risk rises with age',
      detail: isEs
        ? 'Conoce tus senos. Reporta cualquier bulto, cambio en la piel o secreci\u00f3n del pez\u00f3n.'
        : 'Know your breasts. Report any lump, skin change, or nipple discharge.',
    },
    {
      name: isEs ? 'C\u00e1ncer vaginal y vulvar' : 'Vaginal & vulvar cancer',
      cause: isEs ? 'Frecuentemente relacionado con VPH' : 'Frequently HPV-linked',
      detail: isEs
        ? 'Raro pero real. Picaz\u00f3n persistente, bultos o cambios en la piel deben revisarse.'
        : 'Rare but real. Persistent itching, lumps, or skin changes should be looked at.',
    },
  ];

  const links = [
    { label: isEs ? 'CDC, VPH y c\u00e1ncer' : 'CDC, HPV and cancer', sub: isEs ? 'Hechos en lenguaje claro \u00b7 espa\u00f1ol disponible' : 'Plain-language facts \u00b7 available in Spanish', href: 'https://www.cdc.gov/hpv/' },
    { label: 'American Cancer Society', sub: isEs ? 'Gu\u00edas de detecci\u00f3n y vista general por tipo de c\u00e1ncer' : 'Screening guidelines and overviews by cancer type', href: 'https://www.cancer.org/' },
    { label: isEs ? 'Instituto Nacional del C\u00e1ncer' : 'National Cancer Institute', sub: isEs ? 'Investigaci\u00f3n y recursos del gobierno de EE.UU.' : 'US government research and resources', href: 'https://www.cancer.gov/' },
    { label: isEs ? 'Encuentra detecci\u00f3n gratuita o de bajo costo' : 'Find free or low-cost screening', sub: isEs ? 'Programa NBCCEDP de los CDC' : 'CDC\u2019s NBCCEDP program', href: 'https://www.cdc.gov/cancer/nbccedp/' },
  ];

  return (
    <div data-screen-label="09 Cancer & HPV">
      <section className="ella-section-tight">
        <div className="ella-container">
          <div className="ella-article">
            <a className="ella-article-back" href="#" onClick={(e) => { e.preventDefault(); setRoute('home'); }}>
              <IconChevron width="16" height="16" style={{ transform: 'rotate(180deg)' }} />
              {isEs ? 'Inicio' : 'Home'}
            </a>
            <div className="ella-eyebrow" style={{ color: 'var(--ella-plum-500)' }}>
              {isEs ? 'C\u00c1NCERES REPRODUCTIVOS Y VPH' : 'REPRODUCTIVE CANCERS & HPV'}
            </div>
            <h1>{isEs ? 'Lo que vale la pena vigilar.' : 'What\u2019s worth keeping an eye on.'}</h1>
            <p className="ella-article-lede">
              {isEs
                ? 'Esta secci\u00f3n no est\u00e1 aqu\u00ed para asustarte. Est\u00e1 aqu\u00ed para que sepas qu\u00e9 pruebas necesitas, cu\u00e1ndo, y qu\u00e9 s\u00edntomas no debes ignorar despu\u00e9s de los 45.'
                : 'This section isn\u2019t here to scare you. It\u2019s here so you know which screenings you need, when, and which symptoms not to brush off after 45.'}
            </p>

            {/* HPV explainer */}
            <div style={{ background: 'var(--ella-plum-100)', borderRadius: 20, padding: '28px 32px', margin: '16px 0 32px' }}>
              <div className="ella-eyebrow" style={{ color: 'var(--ella-plum-700)' }}>{isEs ? 'PRIMERO: VPH' : 'FIRST: HPV'}</div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 32, lineHeight: 1.15, margin: '6px 0 12px', color: 'var(--ella-clay-900)' }}>
                {isEs ? 'El VPH es com\u00fan. La mayor\u00eda de los c\u00e1nceres relacionados con VPH son prevenibles.' : 'HPV is common. Most HPV-related cancers are preventable.'}
              </h2>
              <p style={{ fontSize: 17, lineHeight: 1.65, color: 'var(--ella-clay-700)', margin: 0 }}>
                {isEs
                  ? 'Aproximadamente 8 de cada 10 mujeres tendr\u00e1n VPH en alg\u00fan momento. La mayor\u00eda de las infecciones se eliminan solas. Algunos tipos pueden causar c\u00e1ncer cervical, vaginal, vulvar, anal y orofar\u00edngeo. La detecci\u00f3n regular y la vacuna son tus dos herramientas m\u00e1s poderosas, y la vacuna ahora est\u00e1 aprobada hasta los 45 a\u00f1os.'
                  : 'About 8 in 10 women will have HPV at some point. Most infections clear on their own. A few strains can cause cervical, vaginal, vulvar, anal, and throat cancers. Regular screening and the vaccine are your two most powerful tools, and the vaccine is now approved through age 45.'}
              </p>
            </div>

            {/* Screening schedule */}
            <div className="ella-article-body">
              <h2>{isEs ? 'Tu calendario de detecci\u00f3n' : 'Your screening schedule'}</h2>
              <p>
                {isEs
                  ? 'Una vista r\u00e1pida de lo que normalmente se recomienda. Tu m\u00e9dico puede ajustar seg\u00fan tu historia personal.'
                  : 'A quick overview of what\u2019s typically recommended. Your doctor may adjust based on your personal history.'}
              </p>
            </div>

            <div style={{ display: 'grid', gap: 14, gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', marginTop: 8 }}>
              {screenings.map((s) => (
                <div key={s.name} style={{ background: 'var(--ella-cream-50)', border: '1px solid var(--border-default)', borderRadius: 16, padding: 22 }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 10px', borderRadius: 999, background: 'var(--ella-plum-100)', color: 'var(--ella-plum-700)', fontSize: 11, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                    <IconCheck width="14" height="14" />{s.every}
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, lineHeight: 1.2, margin: '10px 0 8px', color: 'var(--ella-clay-900)' }}>{s.name}</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.55, color: 'var(--ella-clay-700)', margin: 0 }}>{s.desc}</p>
                </div>
              ))}
            </div>

            {/* Symptoms / cancer awareness */}
            <div className="ella-article-body" style={{ marginTop: 48 }}>
              <h2>{isEs ? 'Qu\u00e9 vigilar' : 'What to watch for'}</h2>
              <p>
                {isEs
                  ? 'No para alarmarte, para informarte. Si notas s\u00edntomas persistentes en cualquiera de estas \u00e1reas, no esperes a tu pr\u00f3xima cita anual. Pide una m\u00e1s pronto.'
                  : 'Not to alarm you, to inform you. If you notice persistent symptoms in any of these areas, don\u2019t wait for your next annual. Get in sooner.'}
              </p>
            </div>

            <div style={{ display: 'grid', gap: 12, marginTop: 8 }}>
              {cancers.map((c) => (
                <div key={c.name} style={{ background: 'var(--ella-white)', border: '1px solid var(--border-default)', borderRadius: 14, padding: '20px 24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
                    <h4 style={{ fontFamily: 'var(--font-display)', fontSize: 22, lineHeight: 1.2, margin: 0, color: 'var(--ella-clay-900)' }}>{c.name}</h4>
                    <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--ella-rose-deep)' }}>{c.cause}</span>
                  </div>
                  <p style={{ fontSize: 15, lineHeight: 1.55, color: 'var(--ella-clay-700)', margin: '8px 0 0' }}>{c.detail}</p>
                </div>
              ))}
            </div>

            {/* Resources */}
            <div className="ella-article-body" style={{ marginTop: 48 }}>
              <h2>{isEs ? 'Recursos confiables' : 'Trusted resources'}</h2>
            </div>

            <div style={{ display: 'grid', gap: 12, marginTop: 8 }}>
              {links.map((r) => (
                <a key={r.label} href={r.href} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16,
                    background: 'var(--ella-white)', border: '1px solid var(--border-default)',
                    borderRadius: 14, padding: '18px 22px', textDecoration: 'none', color: 'inherit',
                    transition: 'box-shadow 200ms, border-color 200ms' }}
                  onMouseEnter={(e) => { e.currentTarget.style.boxShadow = 'var(--shadow-lifted)'; e.currentTarget.style.borderColor = 'var(--ella-sand-300)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.boxShadow = ''; e.currentTarget.style.borderColor = 'var(--border-default)'; }}
                >
                  <div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: 'var(--ella-clay-900)' }}>{r.label}</div>
                    <div style={{ fontSize: 14, color: 'var(--ella-clay-700)', marginTop: 4 }}>{r.sub}</div>
                  </div>
                  <IconArrow width="20" height="20" style={{ color: 'var(--ella-rose-deep)', flex: '0 0 20px', transform: 'rotate(-45deg)' }} />
                </a>
              ))}
            </div>

            <div style={{ marginTop: 40, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <button type="button" className="ella-btn ella-btn-primary" onClick={() => setRoute('doctor')}>
                <IconDownload width="18" height="18" />
                {isEs ? 'Preguntas para tu m\u00e9dico' : 'Get the doctor checklist'}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

window.ReproductiveHealth = ReproductiveHealth;

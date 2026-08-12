// Hormonal Therapy, explains options + external links.
// Tone: options-only, never endorsing.

export function HormonalTherapy({ lang, setRoute }) {
  const isEs = lang === 'es';

  const options = [
    {
      name: isEs ? 'Estr\u00f3geno sist\u00e9mico' : 'Systemic estrogen',
      kind: isEs ? 'TRH \u00b7 P\u00edldora, parche, gel o spray' : 'HRT \u00b7 Pill, patch, gel, or spray',
      desc: isEs
        ? 'La forma m\u00e1s estudiada de aliviar los sofocos, sudores nocturnos y cambios de humor. Si todav\u00eda tienes \u00fatero, generalmente se combina con progestina.'
        : 'The most-studied option for hot flashes, night sweats, and mood shifts. If you still have a uterus, it\u2019s usually paired with a progestin.',
    },
    {
      name: isEs ? 'Estr\u00f3geno vaginal de dosis baja' : 'Low-dose vaginal estrogen',
      kind: isEs ? 'TRH local \u00b7 Crema, anillo o tableta' : 'Local HRT \u00b7 Cream, ring, or tablet',
      desc: isEs
        ? 'Tratamiento dirigido para sequedad, dolor con relaciones sexuales y s\u00edntomas urinarios. Muy poco entra al torrente sangu\u00edneo.'
        : 'Targeted treatment for vaginal dryness, painful sex, and urinary symptoms. Very little reaches the bloodstream.',
    },
    {
      name: isEs ? 'Progestina sola' : 'Progestin only',
      kind: isEs ? 'No es estr\u00f3geno' : 'Non-estrogen',
      desc: isEs
        ? 'Una opci\u00f3n cuando el estr\u00f3geno no es seguro o no es deseado. Puede ayudar con el sue\u00f1o y algunos s\u00edntomas.'
        : 'An option when estrogen isn\u2019t safe or wanted. Can help with sleep and some symptoms.',
    },
    {
      name: isEs ? 'Medicamentos no hormonales' : 'Non-hormonal medications',
      kind: isEs ? 'ISRS / IRSN, gabapentina, fezolinetant' : 'SSRIs / SNRIs, gabapentin, fezolinetant',
      desc: isEs
        ? 'Para mujeres que no pueden o prefieren no usar hormonas. Fezolinetant es un medicamento nuevo aprobado por la FDA espec\u00edficamente para sofocos.'
        : 'For women who can\u2019t, or prefer not to, use hormones. Fezolinetant is a newer FDA-approved option specifically for hot flashes.',
    },
    {
      name: isEs ? 'TRH bioid\u00e9ntica' : 'Bioidentical HRT',
      kind: isEs ? 'Compuesta vs. aprobada por FDA' : 'Compounded vs. FDA-approved',
      desc: isEs
        ? 'Importante: las versiones aprobadas por la FDA son bioid\u00e9nticas. Las versiones compuestas (mezcladas en farmacias) no est\u00e1n reguladas y los estudios son limitados.'
        : 'Important: FDA-approved hormone therapies are already bioidentical. Compounded versions (custom-mixed at pharmacies) are unregulated and have limited safety data.',
    },
    {
      name: isEs ? 'Sin tratamiento' : 'No treatment',
      kind: isEs ? 'Una opci\u00f3n leg\u00edtima' : 'A legitimate option',
      desc: isEs
        ? 'Algunas mujeres atraviesan la transici\u00f3n con s\u00edntomas leves y eligen no tratar. Tambi\u00e9n es una opci\u00f3n v\u00e1lida.'
        : 'Some women move through this transition with mild symptoms and choose not to treat. That\u2019s also a valid path.',
    },
  ];

  const resources = [
    { label: 'The Pause Life, Dr. Mary Claire Haver', sub: isEs ? 'Educaci\u00f3n y comunidad sobre la menopausia de una OB-GYN reconocida' : 'Menopause education & community from a leading OB-GYN', href: (window.ELLA_LINKS && window.ELLA_LINKS.pauseLife) || 'https://thepauselife.com/' },
    { label: 'The Menopause Society (formerly NAMS)', sub: isEs ? 'Encuentra un especialista certificado en menopausia (MSCP)' : 'Find a certified menopause specialist (MSCP)', href: 'https://menopause.org/' },
    { label: 'ACOG, Menopause Resources', sub: isEs ? 'Gu\u00edas oficiales del Colegio Americano de Obstetras y Ginec\u00f3logos' : 'Official guidelines from the American College of OB-GYNs', href: 'https://www.acog.org/womens-health/faqs/the-menopause-years' },
    { label: 'Office on Women\u2019s Health', sub: isEs ? 'Recurso oficial del gobierno de EE.UU. \u00b7 disponible en espa\u00f1ol' : 'Official US government resource \u00b7 available in Spanish', href: 'https://www.womenshealth.gov/menopause' },
    { label: 'Mayo Clinic, Hormone Therapy', sub: isEs ? 'Resumen cl\u00ednico de beneficios, riesgos y elegibilidad' : 'Clinical overview of benefits, risks, and eligibility', href: 'https://www.mayoclinic.org/diseases-conditions/menopause/in-depth/hormone-therapy/art-20046372' },
    { label: 'Let\u2019s Talk Menopause', sub: isEs ? 'Sin fines de lucro \u00b7 educaci\u00f3n y defensa' : 'Nonprofit \u00b7 education and advocacy', href: 'https://www.letstalkmenopause.org/' },
  ];

  // Sites written natively in Spanish (not machine-translated).
  const spanishResources = [
    { label: 'MedlinePlus en espa\u00f1ol, Menopausia', sub: 'Biblioteca Nacional de Medicina de EE.UU. \u00b7 escrito en espa\u00f1ol', href: 'https://medlineplus.gov/spanish/menopause.html' },
    { label: 'AEEM, Asociaci\u00f3n Espa\u00f1ola para el Estudio de la Menopausia', sub: 'Sociedad m\u00e9dica espa\u00f1ola \u00b7 informaci\u00f3n para pacientes', href: 'https://aeem.es/' },
    { label: 'CuidatePlus, Menopausia', sub: 'Gu\u00eda de salud en espa\u00f1ol revisada por profesionales', href: 'https://cuidateplus.marca.com/enfermedades/ginecologicas/menopausia.html' },
  ];

  return (
    <div data-screen-label="08 Hormonal Therapy">
      <section className="ella-section-tight">
        <div className="ella-container">
          <div className="ella-article">
            <a className="ella-article-back" href="#" onClick={(e) => { e.preventDefault(); setRoute('home'); }}>
              <IconChevron width="16" height="16" style={{ transform: 'rotate(180deg)' }} />
              {isEs ? 'Inicio' : 'Home'}
            </a>
            <div className="ella-eyebrow" style={{ color: 'var(--ella-plum-500)' }}>
              {isEs ? 'TERAPIA HORMONAL' : 'HORMONAL THERAPY'}
            </div>
            <h1>{isEs ? 'Tus opciones, en lenguaje claro.' : 'Your options, in plain English.'}</h1>
            <p className="ella-article-lede">
              {isEs
                ? 'Ella no recomienda una terapia hormonal espec\u00edfica. Lo que hace es ayudarte a entender lo que existe, para que la conversaci\u00f3n con tu m\u00e9dico empiece de un lugar informado, no de cero.'
                : 'Ella doesn\u2019t recommend a specific therapy. What it does is help you understand what exists, so the conversation with your doctor starts from an informed place, not from scratch.'}
            </p>

            <div className="ella-article-body">
              <h2>{isEs ? 'Las opciones principales' : 'The main options'}</h2>
            </div>

            <div style={{ display: 'grid', gap: 16, marginTop: 12 }}>
              {options.map((o) => (
                <div key={o.name} style={{ background: 'var(--ella-cream-50)', border: '1px solid var(--border-default)', borderRadius: 16, padding: '24px 28px' }}>
                  <div className="ella-eyebrow" style={{ color: 'var(--ella-plum-500)', fontSize: 11 }}>{o.kind}</div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 26, lineHeight: 1.2, margin: '6px 0 10px', color: 'var(--ella-clay-900)' }}>{o.name}</h3>
                  <p style={{ fontSize: 16, lineHeight: 1.6, color: 'var(--ella-clay-700)', margin: 0 }}>{o.desc}</p>
                </div>
              ))}
            </div>

            <div className="ella-article-body" style={{ marginTop: 40 }}>
              <h2>{isEs ? 'D\u00f3nde aprender m\u00e1s' : 'Where to learn more'}</h2>
              <p>
                {isEs
                  ? 'Estos son recursos confiables que recomiendo a mis pacientes. Todos son organizaciones m\u00e9dicas o sin fines de lucro, nada patrocinado.'
                  : 'These are the resources I trust and send patients to. All are medical or nonprofit organizations, nothing sponsored.'}
              </p>
            </div>

            <div style={{ display: 'grid', gap: 12, marginTop: 8 }}>
              {resources.map((r) => (
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

            <div className="ella-article-body" style={{ marginTop: 40 }}>
              <h2>{isEs ? 'En espa\u00f1ol' : 'In Spanish'}</h2>
              <p>
                {isEs
                  ? 'Recursos escritos originalmente en espa\u00f1ol, no traducciones autom\u00e1ticas.'
                  : 'Resources written natively in Spanish, not machine translations.'}
              </p>
            </div>

            <div style={{ display: 'grid', gap: 12, marginTop: 8 }}>
              {spanishResources.map((r) => (
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

            <div style={{ marginTop: 40, padding: '20px 24px', background: 'var(--ella-cream-100)', borderRadius: 16, fontSize: 14, color: 'var(--ella-clay-700)', fontStyle: 'italic', lineHeight: 1.5 }}>
              {isEs
                ? 'Esta p\u00e1gina es informaci\u00f3n, no consejo m\u00e9dico. Habla con tu m\u00e9dico antes de empezar, cambiar o detener cualquier tratamiento hormonal.'
                : 'This page is information, not medical advice. Talk to your doctor before starting, changing, or stopping any hormone therapy.'}
            </div>

            <div style={{ marginTop: 32, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <button type="button" className="ella-btn ella-btn-primary" onClick={() => setRoute('doctor')}>
                <IconDownload width="18" height="18" />
                {isEs ? 'Lista de preguntas para tu m\u00e9dico' : 'Get the doctor checklist'}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

window.HormonalTherapy = HormonalTherapy;

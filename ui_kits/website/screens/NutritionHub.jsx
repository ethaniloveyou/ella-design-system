// NutritionHub, nutrition-focused landing. Pre-filters articles to Nutrition
// + Exercise, includes a high-protein foods quick reference card, links out
// to supplements.

export function NutritionHub({ lang, setRoute, setArticleId }) {
  const isEs = lang === 'es';
  const all = getArticles(lang);
  const nutrition = all.filter(a =>
    a.category === 'Nutrition' || a.category === 'Nutrición'
    || a.category === 'Exercise' || a.category === 'Ejercicio'
  );

  function open(id) { setArticleId(id); setRoute('article'); window.scrollTo({ top: 0 }); }

  const foods = isEs ? [
    { name: 'Yogur griego (puro)', amt: '17 g / taza', tag: 'PROTEÍNA' },
    { name: 'Huevos',              amt: '6 g / unidad', tag: 'PROTEÍNA' },
    { name: 'Pechuga de pollo',    amt: '31 g / 100 g', tag: 'PROTEÍNA' },
    { name: 'Lentejas cocidas',    amt: '18 g / taza',  tag: 'PROTEÍNA + FIBRA' },
    { name: 'Requesón',            amt: '25 g / taza',  tag: 'PROTEÍNA' },
    { name: 'Tofu firme',          amt: '20 g / 100 g', tag: 'PROTEÍNA' },
    { name: 'Salmón',              amt: '22 g / 100 g', tag: 'PROTEÍNA + OMEGA-3' },
    { name: 'Edamame',             amt: '17 g / taza',  tag: 'PROTEÍNA + FIBRA' },
    { name: 'Quinoa cocida',       amt: '8 g / taza',   tag: 'PROTEÍNA + FIBRA' },
    { name: 'Almendras',           amt: '6 g / 28 g',   tag: 'PROTEÍNA + GRASA' },
  ] : [
    { name: 'Greek yogurt (plain)', amt: '17 g / cup',  tag: 'PROTEIN' },
    { name: 'Eggs',                 amt: '6 g / each',  tag: 'PROTEIN' },
    { name: 'Chicken breast',       amt: '31 g / 100 g', tag: 'PROTEIN' },
    { name: 'Cooked lentils',       amt: '18 g / cup',  tag: 'PROTEIN + FIBER' },
    { name: 'Cottage cheese',       amt: '25 g / cup',  tag: 'PROTEIN' },
    { name: 'Firm tofu',            amt: '20 g / 100 g', tag: 'PROTEIN' },
    { name: 'Salmon',               amt: '22 g / 100 g', tag: 'PROTEIN + OMEGA-3' },
    { name: 'Edamame',              amt: '17 g / cup',  tag: 'PROTEIN + FIBER' },
    { name: 'Cooked quinoa',        amt: '8 g / cup',   tag: 'PROTEIN + FIBER' },
    { name: 'Almonds',              amt: '6 g / 28 g',  tag: 'PROTEIN + FAT' },
  ];

  return (
    <div data-screen-label="04 Nutrition Hub">
      {/* Hero */}
      <section className="ella-section-tight">
        <div className="ella-container">
          <div className="ella-section-head" style={{ maxWidth: 820, margin: 0 }}>
            <div className="ella-eyebrow" style={{ color: 'var(--ella-sage-700)' }}>{isEs ? 'NUTRICIÓN' : 'NUTRITION'}</div>
            <h1 className="ella-h2-italic" style={{ fontSize: 'clamp(40px, 5vw, 64px)' }}>
              {isEs ? 'Por qué la proteína es importante' : 'Why protein is important'}
            </h1>
            <p style={{ fontSize: 19, lineHeight: 1.6, color: 'var(--ella-clay-700)', marginTop: 18, maxWidth: '60ch' }}>
              {isEs ? 'palabras palabras palabras' : 'words words words'}
            </p>
          </div>
        </div>
      </section>

      {/* Article cards */}
      <section className="ella-section-tight">
        <div className="ella-container">
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 24 }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 32, color: 'var(--ella-clay-900)', margin: 0 }}>
              {isEs ? 'Proteína y los alimentos a evitar' : 'Protein and The Foods To Avoid'}
            </h2>
          </div>
        </div>
      </section>

      {/* High-protein quick reference */}
      <section className="ella-section-tight ella-bg-cream">
        <div className="ella-container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 32, alignItems: 'start' }}>
            <div style={{ maxWidth: 720 }}>
              <div className="ella-eyebrow" style={{ color: 'var(--ella-sage-700)' }}>{isEs ? 'REFERENCIA RÁPIDA' : 'QUICK REFERENCE'}</div>
              <h2 className="ella-h2-italic" style={{ marginTop: 12 }}>
                {isEs ? <>Diez alimentos para <em>llenar tu plato.</em></> : <>Ten foods to <em>fill your plate.</em></>}
              </h2>
              <p style={{ fontSize: 18, lineHeight: 1.6, color: 'var(--ella-clay-700)', marginTop: 16, maxWidth: '56ch' }}>
                {isEs
                  ? 'Cantidades de proteína por porción típica. Apunta a 25–30 g por comida y deja que las elecciones se vuelvan automáticas.'
                  : 'Protein per typical serving. Aim for 25–30 g per meal and let the choices become automatic.'}
              </p>
            </div>

            <div className="ella-food-grid">
              {foods.map((f) => (
                <div key={f.name} className="ella-food-card">
                  <div className="ella-food-tag">{f.tag}</div>
                  <div className="ella-food-name">{f.name}</div>
                  <div className="ella-food-amt">{f.amt}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: 36, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button type="button" className="ella-btn ella-btn-primary" onClick={() => setRoute('supplements')}>
              {isEs ? 'Ver suplementos recomendados' : 'See recommended supplements'}
              <IconArrow width="18" height="18" />
            </button>
            <button type="button" className="ella-btn ella-btn-text" onClick={() => setRoute('doctor')}>
              {isEs ? 'Lista para tu médico →' : 'Grab the doctor checklist →'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

window.NutritionHub = NutritionHub;

// "Information You Need", a 3-column link grid of quick jumps.
// Inspired by thepauselife.com's same-named section.

export function InfoLinks({ lang, setRoute }) {
  const isEs = lang === 'es';

  const columns = [
    {
      title: isEs ? 'Nutrición y ejercicio' : 'Nutrition & exercise',
      tone: 'sage',
      links: [
        { label: isEs ? 'Proteína después de los 45'        : 'Protein after 45',                onClick: () => setRoute('article') },
        { label: isEs ? 'Alimentos a evitar'        : 'Foods to avoid', onClick: () => setRoute('article') },
        { label: isEs ? 'Entrenamiento de fuerza para principiantes': 'Strength training for beginners', onClick: () => setRoute('article') },
        { label: isEs ? 'Yoga para la salud mental'                  : 'Yoga for mental health',          onClick: () => setRoute('article') },
        { label: isEs ? 'Calculadora de proteína'                : 'Protein calculator',              onClick: () => setRoute('article') },
      ],
    },
    {
      title: isEs ? 'Peri/Menopausia' : 'Peri/Menopause',
      tone: 'rose',
      links: [
        { label: isEs ? 'Opciones de terapia hormonal'         : 'Hormonal therapy options',              onClick: () => setRoute('hormones') },
        { label: isEs ? 'Lista para tu ginecóloga'        : 'Your OB-GYN visit checklist',           onClick: () => setRoute('doctor') },
        { label: isEs ? 'Cómo encontrar un especialista'  : 'How to find a menopause specialist',    onClick: () => setRoute('hormones') },
        { label: isEs ? 'Suplementos principales'              : 'The supplements to know',               onClick: () => setRoute('supplements') },
      ],
    },
    {
      title: isEs ? 'Salud reproductiva' : 'Reproductive health',
      tone: 'plum',
      links: [
        { label: isEs ? 'VPH, lo que debes saber'        : 'HPV, what to know',               onClick: () => setRoute('cancer') },
        { label: isEs ? 'Calendario de detección'         : 'Your screening schedule',               onClick: () => setRoute('cancer') },
        { label: isEs ? 'Síntomas que no debes ignorar'   : 'Symptoms not to brush off',             onClick: () => setRoute('cancer') },
        { label: isEs ? 'Salud mental y los 45+'               : 'Mental health and 45+',                 onClick: () => setRoute('article') },
        { label: isEs ? 'Cuidado de la piel y hormonas'        : 'Skin care and hormones',                onClick: () => setRoute('article') },
      ],
    },
  ];

  return (
    <section className="ella-section">
      <div className="ella-container">
        <div className="ella-section-head" style={{ textAlign: 'center', margin: '0 auto 32px', maxWidth: 720 }}>
          <div className="ella-eyebrow">{isEs ? 'TODO LO QUE NECESITAS' : 'EVERYTHING YOU NEED'}</div>
          <h2 className="ella-h2-italic">{isEs ? <>La <em>información</em> que buscas.</> : <>The <em>information</em> you need.</>}</h2>
        </div>
        <div className="ella-infolinks">
          {columns.map((c) => (
            <div key={c.title} className="ella-infolinks-col" data-tone={c.tone}>
              <h3 className="ella-h3-italic"><em>{c.title}</em></h3>
              <ul>
                {c.links.map((l, i) => (
                  <li key={i}>
                    <a href="#" onClick={(e) => { e.preventDefault(); l.onClick(); }}>
                      {l.label}
                      <IconArrow width="14" height="14" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

window.InfoLinks = InfoLinks;

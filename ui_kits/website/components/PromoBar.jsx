// Rotating promo bar, cream-colored strip at the very top of the site.
// Cycles short calls-to-action every 4s. Inspired by thepauselife.com.

export function PromoBar({ lang }) {
  const isEs = lang === 'es';
  const promos = isEs ? [
    { label: 'Nuevo: Lista de preguntas para tu m\u00e9dico  \u2192', href: '#doctor' },
    { label: 'Recibe la nota semanal de Jessica  \u2192',          href: '#newsletter' },
    { label: 'Toma el chequeo de 5 preguntas  \u2192',             href: '#quiz' },
    { label: 'Disponible en espa\u00f1ol  \u00b7  Available in English', href: '#' },
  ] : [
    { label: 'New: Free doctor-visit checklist (PDF)  \u2192',     href: '#doctor' },
    { label: "Get Jessica's weekly note in your inbox  \u2192",     href: '#newsletter' },
    { label: 'Take the 5-question check-in  \u2192',               href: '#quiz' },
    { label: 'Disponible en espa\u00f1ol  \u00b7  Available in English', href: '#' },
  ];

  const [i, setI] = React.useState(0);
  React.useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % promos.length), 4200);
    return () => clearInterval(id);
  }, [promos.length]);

  return (
    <div className="ella-promo">
      <div className="ella-promo-track" aria-live="polite">
        {promos.map((p, idx) => (
          <a key={idx} href={p.href} className={'ella-promo-msg' + (idx === i ? ' is-active' : '')}>
            {p.label}
          </a>
        ))}
      </div>
    </div>
  );
}

window.PromoBar = PromoBar;

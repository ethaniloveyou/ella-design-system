// Footer, generous 4-column layout. Resources / Learn / Company / Connect.
// Inspired by The Pause Life's footer organization.

export function Footer({ lang, setRoute }) {
  const t = useT(lang);
  const isEs = lang === 'es';

  const cols = [
    {
      title: isEs ? 'Recursos' : 'Resources',
      links: [
        { label: isEs ? 'Reserva una consulta'         : 'Book a consultation', href: (window.ELLA_LINKS && window.ELLA_LINKS.calendar) || '#' },
      ],
    },
    {
      title: isEs ? 'Sobre' : 'Company',
      links: [
        { label: isEs ? 'Sobre Jessica'    : 'About Jessica',    onClick: () => setRoute('about') },
        { label: isEs ? 'Contacto'         : 'Contact',          onClick: () => setRoute('about') },
        { label: isEs ? 'Privacidad'       : 'Privacy',          onClick: () => {} },
      ],
    },
    {
      title: isEs ? 'Conecta' : 'Connect',
      links: [
        { label: 'Instagram',  onClick: () => {} },
      ],
    },
  ];

  return (
    <footer className="ella-footer">
      <div className="ella-footer-inner">

        {/* Newsletter block, full width above footer cols */}
        <div className="ella-footer-newsletter-block">
          <div className="ella-eyebrow" style={{ color: 'var(--ella-rose-deep)' }}>{isEs ? 'BOLET\u00cdN' : 'NEWSLETTER'}</div>
          <h2 className="ella-h2-italic" style={{ marginTop: 8, fontSize: 'clamp(32px, 4vw, 48px)', height: 66, color: '#2F261D' }}>
            {isEs ? <>Recibe la nota <em style={{ fontStyle: 'normal', color: '#2F261D' }}>semanal.</em></> : <>Get the <em style={{ fontStyle: 'normal', color: '#2F261D' }}>weekly note.</em></>}
          </h2>
          <form className="ella-newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <button type="submit" className="ella-btn ella-btn-primary">{t('newsletter_cta')}</button>
            <input type="email" placeholder={t('newsletter_placeholder')} aria-label="Email" />
          </form>
        </div>

        <div className="ella-footer-divider" />

        {/* Brand row */}
        <div className="ella-footer-brand-row">
          <div>
            <LogoEllaSvg width={140} />
            <p className="ella-footer-tagline">{t('footer_tagline')}</p>
            <p style={{ marginTop: 10, fontSize: 14, color: 'var(--ella-taupe-500)' }}>
              {isEs
                ? '\u00bfTienes una pregunta, una idea o quieres colaborar? Escr\u00edbeme a '
                : 'Question, idea, or collaboration? Reach me at '}
              <a href="mailto:jessica@ellahealth.com">jessica@ellahealth.com</a>.
            </p>
          </div>
        </div>

        {/* 4-column links */}
        <div className="ella-footer-cols">
          {cols.map((c) => (
            <div key={c.title} className="ella-footer-col">
              <h5>{c.title}</h5>
              <ul>
                {c.links.map((l, i) => (
                  <li key={i}>
                    {l.href
                      ? <a href={l.href} target="_blank" rel="noopener noreferrer">{l.label}</a>
                      : <a href="#" onClick={(e) => { e.preventDefault(); l.onClick(); }}>{l.label}</a>}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="ella-footer-divider" />
        <div className="ella-footer-bottom">
          <div className="ella-footer-copy">
            © {new Date().getFullYear()} Ella · {isEs ? 'Por Jessica Zavala' : 'By Jessica Zavala'}
          </div>
          <div style={{ fontSize: 13, color: 'var(--ella-taupe-500)', maxWidth: 480 }}>
            {isEs
              ? 'El contenido tiene fines informativos y no sustituye la consulta m\u00e9dica.'
              : 'This content is for informational purposes and does not replace medical advice.'}
          </div>
        </div>
      </div>
    </footer>
  );
}

window.Footer = Footer;

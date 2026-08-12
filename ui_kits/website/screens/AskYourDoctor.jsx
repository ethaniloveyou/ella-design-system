// "What to ask your doctor", printable, downloadable. The artifact view
// of the homepage's checklist CTA. Designed to look like a real document.

export function AskYourDoctor({ lang, setRoute }) {
  const t = useT(lang);
  const isEs = lang === 'es';

  return (
    <div data-screen-label="05 Doctor Checklist">
      <section className="ella-section-tight">
        <div className="ella-container">
          <div className="ella-article" style={{ maxWidth: 860 }}>
            <div style={{ display: 'flex', gap: 12, marginBottom: 28, flexWrap: 'wrap' }}>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

window.AskYourDoctor = AskYourDoctor;

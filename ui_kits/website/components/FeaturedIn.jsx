// Featured-in press strip, placeholder media badges in the editorial
// style of thepauselife.com.

export function FeaturedIn({ lang }) {
  const isEs = lang === 'es';
  // PLACEHOLDER outlets. Replace with real press once Ella gets coverage.
  const outlets = [
    'Good Housekeeping',
    "Women's Health",
    'Bustle',
    'Well+Good',
    'Forbes Health',
    'The Cut',
  ];
  return (
    <section className="ella-featured-in">
      <div className="ella-container">
        <div className="ella-featured-label">{isEs ? 'COMO SE HA VISTO EN' : 'AS SEEN IN'}</div>
        <div className="ella-featured-grid">
          {outlets.map((o) => (
            <div key={o} className="ella-featured-logo">{o}</div>
          ))}
        </div>
      </div>
    </section>
  );
}

window.FeaturedIn = FeaturedIn;

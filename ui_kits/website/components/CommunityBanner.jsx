// Community CTA banner, large invitation block, photo background.
// Echoes The Pause Life's "Find Your Community" banner.

export function CommunityBanner({ lang, setRoute }) {
  const isEs = lang === 'es';
  return (
    <section className="ella-section-tight" data-screen-label="community">
      <div className="ella-container">
        <div className="ella-community">
          <div className="ella-community-photo">
            <Photo aspect="4/3" tint="rose" caption={isEs ? 'FOTO REAL · mujeres en círculo, cálido' : 'REAL PHOTO · women in circle, warm light'} radius="24px" />
          </div>
          <div className="ella-community-body">
            <div className="ella-eyebrow">{isEs ? 'GRATIS · PRÓXIMAMENTE' : 'FREE · LAUNCHING SOON'}</div>
            <h2 className="ella-h2-italic">{isEs ? <>Encuentra tu comunidad <em>aquí.</em></> : <>Find your community <em>here.</em></>}</h2>
            <p>{isEs
              ? 'Una comunidad gratuita donde puedes hacer preguntas, compartir lo que está funcionando, y simplemente ser escuchada. Sin vergüenza, sin presión.'
              : 'A free community where you can ask questions, share what’s working, and just be heard. No shame, no pressure.'}</p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <button type="button" className="ella-btn ella-btn-primary ella-btn-lg" onClick={(e) => e.preventDefault()}>
                <IconUsers width="20" height="20" />
                {isEs ? 'Únete a la lista' : 'Join the waitlist'}
              </button>
              <button type="button" className="ella-btn ella-btn-text" onClick={() => setRoute('about')}>
                {isEs ? 'Conoce a Jessica →' : 'Meet Jessica →'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

window.CommunityBanner = CommunityBanner;

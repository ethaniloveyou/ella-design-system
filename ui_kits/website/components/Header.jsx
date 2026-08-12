// Header, sticky cream bar with logo, nav, search, language toggle.

function LangToggle({ lang, setLang }) {
  return (
    <div className="ella-langtoggle" role="group" aria-label="Language">
      <button
        type="button"
        aria-pressed={lang === 'es'}
        className={lang === 'es' ? 'is-active' : ''}
        onClick={() => setLang('es')}
      >ES</button>
      <button
        type="button"
        aria-pressed={lang === 'en'}
        className={lang === 'en' ? 'is-active' : ''}
        onClick={() => setLang('en')}
      >EN</button>
    </div>
  );
}

export function Header({ lang, setLang, route, setRoute, goToCategory }) {
  const t = useT(lang);
  const isEs = lang === 'es';
  // Top-bar sections, ordered by reader journey:
  //   Nutrition → Exercise → Mental Health → Supplements → Resources
  const items = [
    { id: 'home',          label: 'Ella',                                   route: 'home' },
    { id: 'nutrition',     label: isEs ? 'Nutrición'    : 'Nutrition',      route: 'nutrition' },
    { id: 'exercise',      label: isEs ? 'Ejercicio'    : 'Exercise',       route: 'articles', category: isEs ? 'Ejercicio' : 'Exercise' },
    { id: 'mental-health', label: isEs ? 'Salud mental' : 'Mental Health', route: 'articles', category: isEs ? 'Salud mental' : 'Mental Health' },
    { id: 'supplements',   label: t('nav_supplements'),                    route: 'supplements' },
    { id: 'resources',     label: isEs ? 'Recursos'     : 'Resources',     route: 'doctor' },
    { id: 'about',         label: isEs ? 'Sobre'        : 'About',         route: 'about' },
  ];

  function handleNav(it) {
    if (it.category) goToCategory(it.route, it.category);
    else setRoute(it.route);
  }

  return (
    <header className="ella-header" style={{ backgroundColor: '#D1ADAD' }}>
      <div className="ella-header-inner">
        <a
          href="#"
          className="ella-logo"
          onClick={(e) => { e.preventDefault(); setRoute('home'); }}
          aria-label="Ella home"
        >
          <LogoMarkSvg size={32} />
          <span className="ella-logo-word">Ella</span>
        </a>
        <nav className="ella-nav" aria-label="Primary">
          {items.slice(1).map((it) => (
            <a
              key={it.id}
              href="#"
              className={'ella-navlink' + (route === it.route && !it.category ? ' is-active' : '')}
              onClick={(e) => { e.preventDefault(); handleNav(it); }}
            >{it.label}</a>
          ))}
        </nav>
        <div className="ella-header-end">
          <button type="button" className="ella-iconbtn" aria-label="Search">
            <IconSearch width="20" height="20" />
          </button>
          <a
            href={(window.ELLA_LINKS && window.ELLA_LINKS.calendar) || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="ella-btn ella-btn-primary ella-header-book"
          >{isEs ? 'Reservar' : 'Book a call'}</a>
          <LangToggle lang={lang} setLang={setLang} />
        </div>
      </div>
    </header>
  );
}

window.Header = Header;
window.LangToggle = LangToggle;

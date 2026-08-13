import { useEffect, useState } from 'react';
import { useLang } from '../i18n/lang';
import { THEMES } from '../themes';
import { ELLA_LINKS } from '../content/site';
import { onSectionChange } from '../scene/sceneState';

const NAV_SECTIONS = ['nutricion', 'ejercicio', 'salud-mental', 'suplementos', 'recursos', 'sobre'];

function LangToggle() {
  const { lang, setLang } = useLang();
  return (
    <div className="flex items-center rounded-full border border-cream/25 p-0.5" role="group" aria-label="Language / Idioma">
      {['ES', 'EN'].map((code) => {
        const value = code.toLowerCase();
        const active = lang === value;
        return (
          <button
            key={code}
            type="button"
            aria-pressed={active}
            onClick={() => setLang(value)}
            className={`rounded-full px-3 py-1 text-[0.72rem] font-semibold tracking-wider transition-colors duration-200 ${
              active ? 'bg-cream text-[#1a2f23]' : 'text-cream/70 hover:text-cream'
            }`}
          >
            {code}
          </button>
        );
      })}
    </div>
  );
}

export function Nav({ route, goHome }) {
  const { lang, isEs } = useLang();
  const [compact, setCompact] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => onSectionChange(setActive), []);

  // Close the mobile sheet whenever the route changes under it.
  useEffect(() => setOpen(false), [route]);

  function go(e, id) {
    e.preventDefault();
    setOpen(false);
    if (route !== 'home') {
      goHome(id);
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  const links = NAV_SECTIONS.map((id) => {
    const theme = THEMES.find((t) => t.id === id);
    return { id, label: theme ? theme.label[lang] : id };
  });

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-out ${
        compact ? 'bg-black/55 backdrop-blur-md' : 'bg-gradient-to-b from-black/45 to-transparent'
      }`}
    >
      <div
        className={`mx-auto flex max-w-[1200px] items-center gap-3 px-5 transition-all duration-300 ease-out sm:gap-6 sm:px-6 ${
          compact ? 'h-16' : 'h-20 sm:h-24'
        }`}
      >
        <a
          href="#hero"
          onClick={(e) => go(e, 'hero')}
          className="font-display text-cream no-underline transition-all duration-300"
          style={{ fontSize: compact ? '1.5rem' : '1.95rem', letterSpacing: '-0.02em' }}
        >
          Ella
        </a>

        <nav aria-label="Primary" className="ml-auto hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={(e) => go(e, l.id)}
              aria-current={route === 'home' && THEMES[active]?.id === l.id ? 'true' : undefined}
              className={`text-[0.95rem] no-underline transition-colors duration-200 ${
                route === 'home' && THEMES[active]?.id === l.id ? 'text-gold' : 'text-cream/80 hover:text-cream'
              }`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-3 lg:ml-0">
          <a
            href={ELLA_LINKS.calendar}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-cream px-4 py-2 text-[0.82rem] font-medium whitespace-nowrap text-[#1a2f23] no-underline transition-colors duration-200 hover:bg-white sm:px-5 sm:py-2.5 sm:text-[0.9rem]"
          >
            {isEs ? 'Reservar' : 'Book a call'}
          </a>
          <LangToggle />
          <button
            type="button"
            className="lg:hidden rounded-md p-2 text-cream"
            aria-expanded={open}
            aria-controls="ella-mobile-nav"
            aria-label={isEs ? 'Menú' : 'Menu'}
            onClick={() => setOpen((v) => !v)}
          >
            <span aria-hidden="true" className="block text-xl leading-none">
              {open ? '✕' : '☰'}
            </span>
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="ella-mobile-nav"
          aria-label={isEs ? 'Navegación principal' : 'Primary navigation'}
          className="border-t border-cream/10 bg-black/85 px-6 py-4 backdrop-blur-md lg:hidden"
        >
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={(e) => go(e, l.id)}
              className="block py-3 text-lg text-cream no-underline"
            >
              {l.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}

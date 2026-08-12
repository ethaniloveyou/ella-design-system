// Ella website kit, interactive prototype shell. Single-page router
// across the 5 screens, plus a Tweaks panel for color / type / hero
// variant / language.

// ---- Shared external links (replace placeholders with real ones) ----
const ELLA_LINKS = {
  whatsapp: 'https://wa.me/15555550123',                 // TODO: real WhatsApp number
  calendar: 'https://calendar.app.google/your-booking',  // TODO: real Google Calendar booking link
  pauseLife: 'https://thepauselife.com/',
};
window.ELLA_LINKS = ELLA_LINKS;

const ELLA_TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "primary": "#c87f6e",
  "displayFont": "DM Serif Display",
  "bodyFont": "Nunito",
  "heroVariant": "default",
  "showOrnaments": true,
  "lang": "en"
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(ELLA_TWEAK_DEFAULTS);
  const [route, setRoute] = React.useState('home');
  const [articleId, setArticleId] = React.useState('protein-after-45');
  const [articleCategory, setArticleCategory] = React.useState(null);
  const headerRef = React.useRef(null);

  function goToCategory(targetRoute, category) {
    setArticleCategory(category);
    setRoute(targetRoute);
  }

  // Apply tweaks to root CSS vars
  React.useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--ella-rose', t.primary);
    // derive a hover shade
    root.style.setProperty('--brand-primary', t.primary);

    // font swap
    root.style.setProperty('--font-display', `'${t.displayFont}', 'Cormorant Garamond', Georgia, serif`);
    root.style.setProperty('--font-body', `'${t.bodyFont}', 'Avenir Next', 'Segoe UI', system-ui, sans-serif`);
  }, [t.primary, t.displayFont, t.bodyFont]);

  // Sticky-header scroll polish
  React.useEffect(() => {
    function onScroll() {
      const h = document.querySelector('.ella-header');
      if (h) h.classList.toggle('is-scrolled', window.scrollY > 4);
    }
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Reset scroll on route change
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [route]);

  // Scroll-reveal: fade/slide sections in as they enter the viewport
  React.useEffect(() => {
    const targets = document.querySelectorAll('main section, main .ella-about-hero, main .ella-about-grid');
    if (!targets.length) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    targets.forEach((el, i) => {
      el.classList.add('ella-reveal');
      el.style.transitionDelay = (i === 0 ? 0 : Math.min(i, 3) * 60) + 'ms';
      io.observe(el);
    });
    return () => io.disconnect();
  }, [route]);

  const lang = t.lang;
  const setLang = (l) => setTweak('lang', l);

  let screen = null;
  if (route === 'home')        screen = <Homepage lang={lang} setRoute={setRoute} primaryColor={t.primary} heroVariant={t.heroVariant} />;
  else if (route === 'quiz')   screen = <AwarenessQuiz lang={lang} setRoute={setRoute} />;
  else if (route === 'article')screen = <ArticleView lang={lang} setRoute={setRoute} articleId={articleId} setArticleId={setArticleId} />;
  else if (route === 'articles') screen = <ArticlesHub lang={lang} setRoute={setRoute} setArticleId={setArticleId} initialCategory={articleCategory} />;
  else if (route === 'nutrition') screen = <NutritionHub lang={lang} setRoute={setRoute} setArticleId={setArticleId} />;
  else if (route === 'doctor') screen = <AskYourDoctor lang={lang} setRoute={setRoute} />;
  else if (route === 'supplements') screen = <SupplementsHub lang={lang} setRoute={setRoute} />;
  else if (route === 'about')  screen = <AboutJessica lang={lang} setRoute={setRoute} />;
  else if (route === 'hormones') screen = <HormonalTherapy lang={lang} setRoute={setRoute} />;
  else if (route === 'cancer') screen = <ReproductiveHealth lang={lang} setRoute={setRoute} />;
  else screen = <Homepage lang={lang} setRoute={setRoute} primaryColor={t.primary} heroVariant={t.heroVariant} />;

  return (
    <div className={t.showOrnaments ? '' : 'ella-no-ornaments'}>
      <Header lang={lang} setLang={setLang} route={route} setRoute={setRoute} goToCategory={goToCategory} />
      <main key={route} className="ella-main-fade">{screen}</main>
      {route === 'about' && (
        <div className="ella-about-contact" style={{ height: 166 }}>
          <h2>{lang === 'es' ? 'Contacto' : 'Get in touch'}</h2>
          <a className="ella-btn ella-btn-secondary" href={ELLA_LINKS.calendar} target="_blank" rel="noopener noreferrer" style={{ lineHeight: '20.4px', justifyContent: 'center', backgroundColor: '#B97361', color: '#FFFFFF' }}>
            <IconCalendar width="18" height="18" />
            {lang === 'es' ? 'O reserva una consulta de 30 minutos' : 'Or book a 30-minute consultation'}
          </a>
        </div>
      )}
      <Footer lang={lang} setRoute={setRoute} />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Brand">
          <TweakColor
            label="Primary color"
            value={t.primary}
            options={['#c87f6e', '#a85f4d', '#7e5266', '#6f7e5d']}
            onChange={(v) => setTweak('primary', v)}
          />
          <TweakRadio
            label="Hero copy"
            value={t.heroVariant}
            options={[
              { value: 'default',   label: 'Default' },
              { value: 'editorial', label: 'Editorial' },
              { value: 'soft',      label: 'Soft' },
            ]}
            onChange={(v) => setTweak('heroVariant', v)}
          />
          <TweakToggle
            label="Show botanical ornaments"
            value={t.showOrnaments}
            onChange={(v) => setTweak('showOrnaments', v)}
          />
        </TweakSection>

        <TweakSection label="Type">
          <TweakSelect
            label="Display"
            value={t.displayFont}
            options={[
              { value: 'DM Serif Display', label: 'DM Serif Display' },
              { value: 'Cormorant Garamond', label: 'Cormorant Garamond' },
              { value: 'Fraunces', label: 'Fraunces (alt)' },
              { value: 'Lora', label: 'Lora (soft serif)' },
            ]}
            onChange={(v) => setTweak('displayFont', v)}
          />
          <TweakSelect
            label="Body"
            value={t.bodyFont}
            options={[
              { value: 'Nunito', label: 'Nunito' },
              { value: 'Manrope', label: 'Manrope' },
              { value: 'Inter', label: 'Inter' },
            ]}
            onChange={(v) => setTweak('bodyFont', v)}
          />
        </TweakSection>

        <TweakSection label="Audience">
          <TweakRadio
            label="Language"
            value={t.lang}
            options={[
              { value: 'en', label: 'English' },
              { value: 'es', label: 'Espa\u00f1ol' },
            ]}
            onChange={(v) => setTweak('lang', v)}
          />
        </TweakSection>

        <TweakSection label="Jump to screen">
          <TweakButton label="Homepage"           onClick={() => setRoute('home')} />
          <TweakButton label="About Jessica"      onClick={() => setRoute('about')} secondary />
          <TweakButton label="Articles hub"       onClick={() => setRoute('articles')} secondary />
          <TweakButton label="Nutrition hub"      onClick={() => setRoute('nutrition')} secondary />
          <TweakButton label="Awareness Quiz"     onClick={() => setRoute('quiz')} secondary />
          <TweakButton label="Hormonal Therapy"   onClick={() => setRoute('hormones')} secondary />
          <TweakButton label="Cancer & HPV"       onClick={() => setRoute('cancer')} secondary />
          <TweakButton label="Supplements"        onClick={() => setRoute('supplements')} secondary />
          <TweakButton label="Doctor Checklist"   onClick={() => setRoute('doctor')} secondary />
        </TweakSection>
      </TweaksPanel>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

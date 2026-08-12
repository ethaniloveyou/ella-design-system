/* @ds-bundle: {"format":4,"namespace":"EllaDesignSystem_313f80","components":[{"name":"CommunityBanner","sourcePath":"ui_kits/website/components/CommunityBanner.jsx"},{"name":"FeaturedIn","sourcePath":"ui_kits/website/components/FeaturedIn.jsx"},{"name":"Footer","sourcePath":"ui_kits/website/components/Footer.jsx"},{"name":"Header","sourcePath":"ui_kits/website/components/Header.jsx"},{"name":"Icons","sourcePath":"ui_kits/website/components/Icons.jsx"},{"name":"InfoLinks","sourcePath":"ui_kits/website/components/InfoLinks.jsx"},{"name":"Photo","sourcePath":"ui_kits/website/components/Photo.jsx"},{"name":"PromoBar","sourcePath":"ui_kits/website/components/PromoBar.jsx"},{"name":"SvgAssets","sourcePath":"ui_kits/website/components/SvgAssets.jsx"},{"name":"Testimonials","sourcePath":"ui_kits/website/components/Testimonials.jsx"},{"name":"AboutJessica","sourcePath":"ui_kits/website/screens/AboutJessica.jsx"},{"name":"ArticleView","sourcePath":"ui_kits/website/screens/ArticleView.jsx"},{"name":"ArticlesHub","sourcePath":"ui_kits/website/screens/ArticlesHub.jsx"},{"name":"AskYourDoctor","sourcePath":"ui_kits/website/screens/AskYourDoctor.jsx"},{"name":"AwarenessQuiz","sourcePath":"ui_kits/website/screens/AwarenessQuiz.jsx"},{"name":"Homepage","sourcePath":"ui_kits/website/screens/Homepage.jsx"},{"name":"HormonalTherapy","sourcePath":"ui_kits/website/screens/HormonalTherapy.jsx"},{"name":"NutritionHub","sourcePath":"ui_kits/website/screens/NutritionHub.jsx"},{"name":"ReproductiveHealth","sourcePath":"ui_kits/website/screens/ReproductiveHealth.jsx"},{"name":"SupplementsHub","sourcePath":"ui_kits/website/screens/SupplementsHub.jsx"}],"sourceHashes":{"ui_kits/website/app.jsx":"efb0a5227ae7","ui_kits/website/components/CommunityBanner.jsx":"edcda92f50d5","ui_kits/website/components/FeaturedIn.jsx":"daceceb50af1","ui_kits/website/components/Footer.jsx":"cbac081bc56c","ui_kits/website/components/Header.jsx":"3604e32fe742","ui_kits/website/components/Icons.jsx":"9fb0961a0365","ui_kits/website/components/InfoLinks.jsx":"63fd8a2b98f7","ui_kits/website/components/Photo.jsx":"92c73bcdba8e","ui_kits/website/components/PromoBar.jsx":"9bce70d51bb2","ui_kits/website/components/SvgAssets.jsx":"4075928e6bee","ui_kits/website/components/Testimonials.jsx":"0b92de38b7ee","ui_kits/website/components/i18n.jsx":"586c82f98640","ui_kits/website/screens/AboutJessica.jsx":"5e6a63d9048e","ui_kits/website/screens/ArticleView.jsx":"96567ad51508","ui_kits/website/screens/ArticlesHub.jsx":"fa1fbd8c4282","ui_kits/website/screens/AskYourDoctor.jsx":"85581338d5d0","ui_kits/website/screens/AwarenessQuiz.jsx":"3e5fb233d3dd","ui_kits/website/screens/Homepage.jsx":"bcc2aec85d04","ui_kits/website/screens/HormonalTherapy.jsx":"8cd5261be58d","ui_kits/website/screens/NutritionHub.jsx":"c21ad2d7bf12","ui_kits/website/screens/ReproductiveHealth.jsx":"84f38e387518","ui_kits/website/screens/SupplementsHub.jsx":"4d067a2a49c0","ui_kits/website/screens/articleData.jsx":"76a9a2edbf89","ui_kits/website/tweaks-panel.jsx":"82c387552588","workbook-app.js":"5de5f895c7cf","workbook-data.js":"a4ef3835595c"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.EllaDesignSystem_313f80 = window.EllaDesignSystem_313f80 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// ui_kits/website/app.jsx
try { (() => {
// Ella website kit, interactive prototype shell. Single-page router
// across the 5 screens, plus a Tweaks panel for color / type / hero
// variant / language.

// ---- Shared external links (replace placeholders with real ones) ----
const ELLA_LINKS = {
  whatsapp: 'https://wa.me/15555550123',
  // TODO: real WhatsApp number
  calendar: 'https://calendar.app.google/your-booking',
  // TODO: real Google Calendar booking link
  pauseLife: 'https://thepauselife.com/'
};
window.ELLA_LINKS = ELLA_LINKS;
const ELLA_TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "primary": "#c87f6e",
  "displayFont": "DM Serif Display",
  "bodyFont": "Nunito",
  "heroVariant": "default",
  "showOrnaments": true,
  "lang": "es"
} /*EDITMODE-END*/;
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
    window.scrollTo({
      top: 0,
      behavior: 'instant'
    });
  }, [route]);

  // Scroll-reveal: fade/slide sections in as they enter the viewport
  React.useEffect(() => {
    const targets = document.querySelectorAll('main section, main .ella-about-hero, main .ella-about-grid');
    if (!targets.length) return;
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -8% 0px'
    });
    targets.forEach((el, i) => {
      el.classList.add('ella-reveal');
      el.style.transitionDelay = (i === 0 ? 0 : Math.min(i, 3) * 60) + 'ms';
      io.observe(el);
    });
    return () => io.disconnect();
  }, [route]);
  const lang = t.lang;
  const setLang = l => setTweak('lang', l);
  let screen = null;
  if (route === 'home') screen = /*#__PURE__*/React.createElement(Homepage, {
    lang: lang,
    setRoute: setRoute,
    primaryColor: t.primary,
    heroVariant: t.heroVariant
  });else if (route === 'quiz') screen = /*#__PURE__*/React.createElement(AwarenessQuiz, {
    lang: lang,
    setRoute: setRoute
  });else if (route === 'article') screen = /*#__PURE__*/React.createElement(ArticleView, {
    lang: lang,
    setRoute: setRoute,
    articleId: articleId,
    setArticleId: setArticleId
  });else if (route === 'articles') screen = /*#__PURE__*/React.createElement(ArticlesHub, {
    lang: lang,
    setRoute: setRoute,
    setArticleId: setArticleId,
    initialCategory: articleCategory
  });else if (route === 'nutrition') screen = /*#__PURE__*/React.createElement(NutritionHub, {
    lang: lang,
    setRoute: setRoute,
    setArticleId: setArticleId
  });else if (route === 'doctor') screen = /*#__PURE__*/React.createElement(AskYourDoctor, {
    lang: lang,
    setRoute: setRoute
  });else if (route === 'supplements') screen = /*#__PURE__*/React.createElement(SupplementsHub, {
    lang: lang,
    setRoute: setRoute
  });else if (route === 'about') screen = /*#__PURE__*/React.createElement(AboutJessica, {
    lang: lang,
    setRoute: setRoute
  });else if (route === 'hormones') screen = /*#__PURE__*/React.createElement(HormonalTherapy, {
    lang: lang,
    setRoute: setRoute
  });else if (route === 'cancer') screen = /*#__PURE__*/React.createElement(ReproductiveHealth, {
    lang: lang,
    setRoute: setRoute
  });else screen = /*#__PURE__*/React.createElement(Homepage, {
    lang: lang,
    setRoute: setRoute,
    primaryColor: t.primary,
    heroVariant: t.heroVariant
  });
  return /*#__PURE__*/React.createElement("div", {
    className: t.showOrnaments ? '' : 'ella-no-ornaments'
  }, /*#__PURE__*/React.createElement(Header, {
    lang: lang,
    setLang: setLang,
    route: route,
    setRoute: setRoute,
    goToCategory: goToCategory
  }), /*#__PURE__*/React.createElement("main", {
    key: route,
    className: "ella-main-fade"
  }, screen), route === 'about' && /*#__PURE__*/React.createElement("div", {
    className: "ella-about-contact",
    style: {
      height: 166
    }
  }, /*#__PURE__*/React.createElement("h2", null, lang === 'es' ? 'Contacto' : 'Get in touch'), /*#__PURE__*/React.createElement("a", {
    className: "ella-btn ella-btn-secondary",
    href: ELLA_LINKS.calendar,
    target: "_blank",
    rel: "noopener noreferrer",
    style: {
      lineHeight: '20.4px',
      justifyContent: 'center',
      backgroundColor: '#B97361',
      color: '#FFFFFF'
    }
  }, /*#__PURE__*/React.createElement(IconCalendar, {
    width: "18",
    height: "18"
  }), lang === 'es' ? 'O reserva una consulta de 30 minutos' : 'Or book a 30-minute consultation')), /*#__PURE__*/React.createElement(Footer, {
    lang: lang,
    setRoute: setRoute
  }), /*#__PURE__*/React.createElement(TweaksPanel, {
    title: "Tweaks"
  }, /*#__PURE__*/React.createElement(TweakSection, {
    label: "Brand"
  }, /*#__PURE__*/React.createElement(TweakColor, {
    label: "Primary color",
    value: t.primary,
    options: ['#c87f6e', '#a85f4d', '#7e5266', '#6f7e5d'],
    onChange: v => setTweak('primary', v)
  }), /*#__PURE__*/React.createElement(TweakRadio, {
    label: "Hero copy",
    value: t.heroVariant,
    options: [{
      value: 'default',
      label: 'Default'
    }, {
      value: 'editorial',
      label: 'Editorial'
    }, {
      value: 'soft',
      label: 'Soft'
    }],
    onChange: v => setTweak('heroVariant', v)
  }), /*#__PURE__*/React.createElement(TweakToggle, {
    label: "Show botanical ornaments",
    value: t.showOrnaments,
    onChange: v => setTweak('showOrnaments', v)
  })), /*#__PURE__*/React.createElement(TweakSection, {
    label: "Type"
  }, /*#__PURE__*/React.createElement(TweakSelect, {
    label: "Display",
    value: t.displayFont,
    options: [{
      value: 'DM Serif Display',
      label: 'DM Serif Display'
    }, {
      value: 'Cormorant Garamond',
      label: 'Cormorant Garamond'
    }, {
      value: 'Fraunces',
      label: 'Fraunces (alt)'
    }, {
      value: 'Lora',
      label: 'Lora (soft serif)'
    }],
    onChange: v => setTweak('displayFont', v)
  }), /*#__PURE__*/React.createElement(TweakSelect, {
    label: "Body",
    value: t.bodyFont,
    options: [{
      value: 'Nunito',
      label: 'Nunito'
    }, {
      value: 'Manrope',
      label: 'Manrope'
    }, {
      value: 'Inter',
      label: 'Inter'
    }],
    onChange: v => setTweak('bodyFont', v)
  })), /*#__PURE__*/React.createElement(TweakSection, {
    label: "Audience"
  }, /*#__PURE__*/React.createElement(TweakRadio, {
    label: "Language",
    value: t.lang,
    options: [{
      value: 'en',
      label: 'English'
    }, {
      value: 'es',
      label: 'Espa\u00f1ol'
    }],
    onChange: v => setTweak('lang', v)
  })), /*#__PURE__*/React.createElement(TweakSection, {
    label: "Jump to screen"
  }, /*#__PURE__*/React.createElement(TweakButton, {
    label: "Homepage",
    onClick: () => setRoute('home')
  }), /*#__PURE__*/React.createElement(TweakButton, {
    label: "About Jessica",
    onClick: () => setRoute('about'),
    secondary: true
  }), /*#__PURE__*/React.createElement(TweakButton, {
    label: "Articles hub",
    onClick: () => setRoute('articles'),
    secondary: true
  }), /*#__PURE__*/React.createElement(TweakButton, {
    label: "Nutrition hub",
    onClick: () => setRoute('nutrition'),
    secondary: true
  }), /*#__PURE__*/React.createElement(TweakButton, {
    label: "Awareness Quiz",
    onClick: () => setRoute('quiz'),
    secondary: true
  }), /*#__PURE__*/React.createElement(TweakButton, {
    label: "Hormonal Therapy",
    onClick: () => setRoute('hormones'),
    secondary: true
  }), /*#__PURE__*/React.createElement(TweakButton, {
    label: "Cancer & HPV",
    onClick: () => setRoute('cancer'),
    secondary: true
  }), /*#__PURE__*/React.createElement(TweakButton, {
    label: "Supplements",
    onClick: () => setRoute('supplements'),
    secondary: true
  }), /*#__PURE__*/React.createElement(TweakButton, {
    label: "Doctor Checklist",
    onClick: () => setRoute('doctor'),
    secondary: true
  }))));
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/app.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/components/CommunityBanner.jsx
try { (() => {
// Community CTA banner, large invitation block, photo background.
// Echoes The Pause Life's "Find Your Community" banner.

function CommunityBanner({
  lang,
  setRoute
}) {
  const isEs = lang === 'es';
  return /*#__PURE__*/React.createElement("section", {
    className: "ella-section-tight",
    "data-screen-label": "community"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-community"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-community-photo"
  }, /*#__PURE__*/React.createElement(Photo, {
    aspect: "4/3",
    tint: "rose",
    caption: isEs ? 'FOTO REAL · mujeres en círculo, cálido' : 'REAL PHOTO · women in circle, warm light',
    radius: "24px"
  })), /*#__PURE__*/React.createElement("div", {
    className: "ella-community-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-eyebrow"
  }, isEs ? 'GRATIS · PRÓXIMAMENTE' : 'FREE · LAUNCHING SOON'), /*#__PURE__*/React.createElement("h2", {
    className: "ella-h2-italic"
  }, isEs ? /*#__PURE__*/React.createElement(React.Fragment, null, "Encuentra tu comunidad ", /*#__PURE__*/React.createElement("em", null, "aqu\xED.")) : /*#__PURE__*/React.createElement(React.Fragment, null, "Find your community ", /*#__PURE__*/React.createElement("em", null, "here."))), /*#__PURE__*/React.createElement("p", null, isEs ? 'Una comunidad gratuita donde puedes hacer preguntas, compartir lo que está funcionando, y simplemente ser escuchada. Sin vergüenza, sin presión.' : 'A free community where you can ask questions, share what’s working, and just be heard. No shame, no pressure.'), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "ella-btn ella-btn-primary ella-btn-lg",
    onClick: e => e.preventDefault()
  }, /*#__PURE__*/React.createElement(IconUsers, {
    width: "20",
    height: "20"
  }), isEs ? 'Únete a la lista' : 'Join the waitlist'), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "ella-btn ella-btn-text",
    onClick: () => setRoute('about')
  }, isEs ? 'Conoce a Jessica →' : 'Meet Jessica →'))))));
}
window.CommunityBanner = CommunityBanner;
Object.assign(__ds_scope, { CommunityBanner });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/components/CommunityBanner.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/components/FeaturedIn.jsx
try { (() => {
// Featured-in press strip, placeholder media badges in the editorial
// style of thepauselife.com.

function FeaturedIn({
  lang
}) {
  const isEs = lang === 'es';
  // PLACEHOLDER outlets. Replace with real press once Ella gets coverage.
  const outlets = ['Good Housekeeping', "Women's Health", 'Bustle', 'Well+Good', 'Forbes Health', 'The Cut'];
  return /*#__PURE__*/React.createElement("section", {
    className: "ella-featured-in"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-featured-label"
  }, isEs ? 'COMO SE HA VISTO EN' : 'AS SEEN IN'), /*#__PURE__*/React.createElement("div", {
    className: "ella-featured-grid"
  }, outlets.map(o => /*#__PURE__*/React.createElement("div", {
    key: o,
    className: "ella-featured-logo"
  }, o)))));
}
window.FeaturedIn = FeaturedIn;
Object.assign(__ds_scope, { FeaturedIn });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/components/FeaturedIn.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/components/Footer.jsx
try { (() => {
// Footer, generous 4-column layout. Resources / Learn / Company / Connect.
// Inspired by The Pause Life's footer organization.

function Footer({
  lang,
  setRoute
}) {
  const t = useT(lang);
  const isEs = lang === 'es';
  const cols = [{
    title: isEs ? 'Recursos' : 'Resources',
    links: [{
      label: isEs ? 'Reserva una consulta' : 'Book a consultation',
      href: window.ELLA_LINKS && window.ELLA_LINKS.calendar || '#'
    }]
  }, {
    title: isEs ? 'Sobre' : 'Company',
    links: [{
      label: isEs ? 'Sobre Jessica' : 'About Jessica',
      onClick: () => setRoute('about')
    }, {
      label: isEs ? 'Contacto' : 'Contact',
      onClick: () => setRoute('about')
    }, {
      label: isEs ? 'Privacidad' : 'Privacy',
      onClick: () => {}
    }]
  }, {
    title: isEs ? 'Conecta' : 'Connect',
    links: [{
      label: 'Instagram',
      onClick: () => {}
    }]
  }];
  return /*#__PURE__*/React.createElement("footer", {
    className: "ella-footer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-footer-inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-footer-newsletter-block"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-eyebrow",
    style: {
      color: 'var(--ella-rose-deep)'
    }
  }, isEs ? 'BOLET\u00cdN' : 'NEWSLETTER'), /*#__PURE__*/React.createElement("h2", {
    className: "ella-h2-italic",
    style: {
      marginTop: 8,
      fontSize: 'clamp(32px, 4vw, 48px)',
      height: 66,
      color: '#2F261D'
    }
  }, isEs ? /*#__PURE__*/React.createElement(React.Fragment, null, "Recibe la nota ", /*#__PURE__*/React.createElement("em", {
    style: {
      fontStyle: 'normal',
      color: '#2F261D'
    }
  }, "semanal.")) : /*#__PURE__*/React.createElement(React.Fragment, null, "Get the ", /*#__PURE__*/React.createElement("em", {
    style: {
      fontStyle: 'normal',
      color: '#2F261D'
    }
  }, "weekly note."))), /*#__PURE__*/React.createElement("form", {
    className: "ella-newsletter-form",
    onSubmit: e => e.preventDefault()
  }, /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "ella-btn ella-btn-primary"
  }, t('newsletter_cta')), /*#__PURE__*/React.createElement("input", {
    type: "email",
    placeholder: t('newsletter_placeholder'),
    "aria-label": "Email"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "ella-footer-divider"
  }), /*#__PURE__*/React.createElement("div", {
    className: "ella-footer-brand-row"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(LogoEllaSvg, {
    width: 140
  }), /*#__PURE__*/React.createElement("p", {
    className: "ella-footer-tagline"
  }, t('footer_tagline')), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 10,
      fontSize: 14,
      color: 'var(--ella-taupe-500)'
    }
  }, isEs ? '\u00bfTienes una pregunta, una idea o quieres colaborar? Escr\u00edbeme a ' : 'Question, idea, or collaboration? Reach me at ', /*#__PURE__*/React.createElement("a", {
    href: "mailto:jessica@ellahealth.com"
  }, "jessica@ellahealth.com"), "."))), /*#__PURE__*/React.createElement("div", {
    className: "ella-footer-cols"
  }, cols.map(c => /*#__PURE__*/React.createElement("div", {
    key: c.title,
    className: "ella-footer-col"
  }, /*#__PURE__*/React.createElement("h5", null, c.title), /*#__PURE__*/React.createElement("ul", null, c.links.map((l, i) => /*#__PURE__*/React.createElement("li", {
    key: i
  }, l.href ? /*#__PURE__*/React.createElement("a", {
    href: l.href,
    target: "_blank",
    rel: "noopener noreferrer"
  }, l.label) : /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      l.onClick();
    }
  }, l.label))))))), /*#__PURE__*/React.createElement("div", {
    className: "ella-footer-divider"
  }), /*#__PURE__*/React.createElement("div", {
    className: "ella-footer-bottom"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-footer-copy"
  }, "\xA9 ", new Date().getFullYear(), " Ella \xB7 ", isEs ? 'Por Jessica Zavala' : 'By Jessica Zavala'), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'var(--ella-taupe-500)',
      maxWidth: 480
    }
  }, isEs ? 'El contenido tiene fines informativos y no sustituye la consulta m\u00e9dica.' : 'This content is for informational purposes and does not replace medical advice.'))));
}
window.Footer = Footer;
Object.assign(__ds_scope, { Footer });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/components/Footer.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/components/Header.jsx
try { (() => {
// Header, sticky cream bar with logo, nav, search, language toggle.

function LangToggle({
  lang,
  setLang
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "ella-langtoggle",
    role: "group",
    "aria-label": "Language"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-pressed": lang === 'es',
    className: lang === 'es' ? 'is-active' : '',
    onClick: () => setLang('es')
  }, "ES"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-pressed": lang === 'en',
    className: lang === 'en' ? 'is-active' : '',
    onClick: () => setLang('en')
  }, "EN"));
}
function Header({
  lang,
  setLang,
  route,
  setRoute,
  goToCategory
}) {
  const t = useT(lang);
  const isEs = lang === 'es';
  // Top-bar sections, ordered by reader journey:
  //   Nutrition → Exercise → Mental Health → Supplements → Resources
  const items = [{
    id: 'home',
    label: 'Ella',
    route: 'home'
  }, {
    id: 'nutrition',
    label: isEs ? 'Nutrición' : 'Nutrition',
    route: 'nutrition'
  }, {
    id: 'exercise',
    label: isEs ? 'Ejercicio' : 'Exercise',
    route: 'articles',
    category: isEs ? 'Ejercicio' : 'Exercise'
  }, {
    id: 'mental-health',
    label: isEs ? 'Salud mental' : 'Mental Health',
    route: 'articles',
    category: isEs ? 'Salud mental' : 'Mental Health'
  }, {
    id: 'supplements',
    label: t('nav_supplements'),
    route: 'supplements'
  }, {
    id: 'resources',
    label: isEs ? 'Recursos' : 'Resources',
    route: 'doctor'
  }, {
    id: 'about',
    label: isEs ? 'Sobre' : 'About',
    route: 'about'
  }];
  function handleNav(it) {
    if (it.category) goToCategory(it.route, it.category);else setRoute(it.route);
  }
  return /*#__PURE__*/React.createElement("header", {
    className: "ella-header",
    style: {
      backgroundColor: '#D1ADAD'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-header-inner"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "ella-logo",
    onClick: e => {
      e.preventDefault();
      setRoute('home');
    },
    "aria-label": "Ella home"
  }, /*#__PURE__*/React.createElement(LogoMarkSvg, {
    size: 32
  }), /*#__PURE__*/React.createElement("span", {
    className: "ella-logo-word"
  }, "Ella")), /*#__PURE__*/React.createElement("nav", {
    className: "ella-nav",
    "aria-label": "Primary"
  }, items.slice(1).map(it => /*#__PURE__*/React.createElement("a", {
    key: it.id,
    href: "#",
    className: 'ella-navlink' + (route === it.route && !it.category ? ' is-active' : ''),
    onClick: e => {
      e.preventDefault();
      handleNav(it);
    }
  }, it.label))), /*#__PURE__*/React.createElement("div", {
    className: "ella-header-end"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "ella-iconbtn",
    "aria-label": "Search"
  }, /*#__PURE__*/React.createElement(IconSearch, {
    width: "20",
    height: "20"
  })), /*#__PURE__*/React.createElement("a", {
    href: window.ELLA_LINKS && window.ELLA_LINKS.calendar || '#',
    target: "_blank",
    rel: "noopener noreferrer",
    className: "ella-btn ella-btn-primary ella-header-book"
  }, isEs ? 'Reservar' : 'Book a call'), /*#__PURE__*/React.createElement(LangToggle, {
    lang: lang,
    setLang: setLang
  }))));
}
window.Header = Header;
window.LangToggle = LangToggle;
Object.assign(__ds_scope, { Header });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/components/Header.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/components/Icons.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// Lucide-style icons used across the kit. 1.5px stroke, rounded caps.
// Inline JSX so they're tweakable from a component file rather than fetched.

const SVG_BASE = {
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round'
};
const IconHeart = p => /*#__PURE__*/React.createElement("svg", _extends({}, SVG_BASE, p), /*#__PURE__*/React.createElement("path", {
  d: "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
}));
const IconLeaf = p => /*#__PURE__*/React.createElement("svg", _extends({}, SVG_BASE, p), /*#__PURE__*/React.createElement("path", {
  d: "M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"
}), /*#__PURE__*/React.createElement("path", {
  d: "M2 21c0-3 1.85-5.36 5.08-6"
}));
const IconDumbbell = p => /*#__PURE__*/React.createElement("svg", _extends({}, SVG_BASE, p), /*#__PURE__*/React.createElement("path", {
  d: "M14.4 14.4 9.6 9.6"
}), /*#__PURE__*/React.createElement("path", {
  d: "M18.657 21.485a2 2 0 1 1-2.829-2.828l-1.767 1.768a2 2 0 1 1-2.829-2.829l6.364-6.364a2 2 0 1 1 2.829 2.829l-1.768 1.767a2 2 0 1 1 2.828 2.829z"
}), /*#__PURE__*/React.createElement("path", {
  d: "m21.5 21.5-1.4-1.4"
}), /*#__PURE__*/React.createElement("path", {
  d: "M3.9 3.9 2.5 2.5"
}), /*#__PURE__*/React.createElement("path", {
  d: "M6.404 12.768a2 2 0 1 1-2.829-2.829l1.768-1.767a2 2 0 1 1-2.828-2.829l2.828-2.828a2 2 0 1 1 2.829 2.828l1.767-1.768a2 2 0 1 1 2.829 2.829z"
}));
const IconBrain = p => /*#__PURE__*/React.createElement("svg", _extends({}, SVG_BASE, p), /*#__PURE__*/React.createElement("path", {
  d: "M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"
}), /*#__PURE__*/React.createElement("path", {
  d: "M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"
}), /*#__PURE__*/React.createElement("path", {
  d: "M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"
}));
const IconSun = p => /*#__PURE__*/React.createElement("svg", _extends({}, SVG_BASE, p), /*#__PURE__*/React.createElement("circle", {
  cx: "12",
  cy: "12",
  r: "4"
}), /*#__PURE__*/React.createElement("path", {
  d: "M12 2v2"
}), /*#__PURE__*/React.createElement("path", {
  d: "M12 20v2"
}), /*#__PURE__*/React.createElement("path", {
  d: "m4.93 4.93 1.41 1.41"
}), /*#__PURE__*/React.createElement("path", {
  d: "m17.66 17.66 1.41 1.41"
}), /*#__PURE__*/React.createElement("path", {
  d: "M2 12h2"
}), /*#__PURE__*/React.createElement("path", {
  d: "M20 12h2"
}), /*#__PURE__*/React.createElement("path", {
  d: "m6.34 17.66-1.41 1.41"
}), /*#__PURE__*/React.createElement("path", {
  d: "m19.07 4.93-1.41 1.41"
}));
const IconMoon = p => /*#__PURE__*/React.createElement("svg", _extends({}, SVG_BASE, p), /*#__PURE__*/React.createElement("path", {
  d: "M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"
}));
const IconDroplet = p => /*#__PURE__*/React.createElement("svg", _extends({}, SVG_BASE, p), /*#__PURE__*/React.createElement("path", {
  d: "M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7Z"
}));
const IconSparkle = p => /*#__PURE__*/React.createElement("svg", _extends({}, SVG_BASE, p), /*#__PURE__*/React.createElement("path", {
  d: "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"
}));
const IconCheck = p => /*#__PURE__*/React.createElement("svg", _extends({}, SVG_BASE, p), /*#__PURE__*/React.createElement("circle", {
  cx: "12",
  cy: "12",
  r: "10"
}), /*#__PURE__*/React.createElement("path", {
  d: "m9 12 2 2 4-4"
}));
const IconArrow = p => /*#__PURE__*/React.createElement("svg", _extends({}, SVG_BASE, p), /*#__PURE__*/React.createElement("path", {
  d: "M5 12h14"
}), /*#__PURE__*/React.createElement("path", {
  d: "m12 5 7 7-7 7"
}));
const IconChevron = p => /*#__PURE__*/React.createElement("svg", _extends({}, SVG_BASE, p), /*#__PURE__*/React.createElement("path", {
  d: "m9 18 6-6-6-6"
}));
const IconDown = p => /*#__PURE__*/React.createElement("svg", _extends({}, SVG_BASE, p), /*#__PURE__*/React.createElement("path", {
  d: "m6 9 6 6 6-6"
}));
const IconMenu = p => /*#__PURE__*/React.createElement("svg", _extends({}, SVG_BASE, p), /*#__PURE__*/React.createElement("line", {
  x1: "4",
  x2: "20",
  y1: "6",
  y2: "6"
}), /*#__PURE__*/React.createElement("line", {
  x1: "4",
  x2: "20",
  y1: "12",
  y2: "12"
}), /*#__PURE__*/React.createElement("line", {
  x1: "4",
  x2: "20",
  y1: "18",
  y2: "18"
}));
const IconSearch = p => /*#__PURE__*/React.createElement("svg", _extends({}, SVG_BASE, p), /*#__PURE__*/React.createElement("circle", {
  cx: "11",
  cy: "11",
  r: "8"
}), /*#__PURE__*/React.createElement("path", {
  d: "m21 21-4.3-4.3"
}));
const IconDownload = p => /*#__PURE__*/React.createElement("svg", _extends({}, SVG_BASE, p), /*#__PURE__*/React.createElement("path", {
  d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
}), /*#__PURE__*/React.createElement("polyline", {
  points: "7 10 12 15 17 10"
}), /*#__PURE__*/React.createElement("line", {
  x1: "12",
  x2: "12",
  y1: "15",
  y2: "3"
}));
const IconUsers = p => /*#__PURE__*/React.createElement("svg", _extends({}, SVG_BASE, p), /*#__PURE__*/React.createElement("path", {
  d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
}), /*#__PURE__*/React.createElement("circle", {
  cx: "9",
  cy: "7",
  r: "4"
}), /*#__PURE__*/React.createElement("path", {
  d: "M22 21v-2a4 4 0 0 0-3-3.87"
}), /*#__PURE__*/React.createElement("path", {
  d: "M16 3.13a4 4 0 0 1 0 7.75"
}));
const IconBookmark = p => /*#__PURE__*/React.createElement("svg", _extends({}, SVG_BASE, p), /*#__PURE__*/React.createElement("path", {
  d: "m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"
}));
const IconMail = p => /*#__PURE__*/React.createElement("svg", _extends({}, SVG_BASE, p), /*#__PURE__*/React.createElement("rect", {
  width: "20",
  height: "16",
  x: "2",
  y: "4",
  rx: "2"
}), /*#__PURE__*/React.createElement("path", {
  d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"
}));
const IconQuote = p => /*#__PURE__*/React.createElement("svg", _extends({}, SVG_BASE, p), /*#__PURE__*/React.createElement("path", {
  d: "M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"
}), /*#__PURE__*/React.createElement("path", {
  d: "M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"
}));
const IconCalendar = p => /*#__PURE__*/React.createElement("svg", _extends({}, SVG_BASE, p), /*#__PURE__*/React.createElement("path", {
  d: "M8 2v4"
}), /*#__PURE__*/React.createElement("path", {
  d: "M16 2v4"
}), /*#__PURE__*/React.createElement("rect", {
  width: "18",
  height: "18",
  x: "3",
  y: "4",
  rx: "2"
}), /*#__PURE__*/React.createElement("path", {
  d: "M3 10h18"
}));
const IconWhatsApp = p => /*#__PURE__*/React.createElement("svg", _extends({}, p, {
  width: p.width || 24,
  height: p.height || 24,
  viewBox: "0 0 24 24",
  fill: "currentColor",
  xmlns: "http://www.w3.org/2000/svg"
}), /*#__PURE__*/React.createElement("path", {
  d: "M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 1.67c2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.42 5.82c0 4.54-3.7 8.23-8.24 8.23-1.48 0-2.93-.4-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.16 8.16 0 0 1-1.26-4.37c0-4.54 3.7-8.24 8.24-8.24zm4.52 10.43c-.06-.1-.22-.16-.46-.28-.24-.12-1.43-.7-1.65-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.43-1.34-1.67-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.47-.39-.4-.54-.41l-.46-.01c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2 0 1.18.86 2.32.98 2.48.12.16 1.69 2.58 4.1 3.62.57.25 1.02.4 1.37.51.57.18 1.1.16 1.51.1.46-.07 1.43-.58 1.63-1.15.2-.56.2-1.05.14-1.15z"
}));
Object.assign(window, {
  IconHeart,
  IconLeaf,
  IconDumbbell,
  IconBrain,
  IconSun,
  IconMoon,
  IconDroplet,
  IconSparkle,
  IconCheck,
  IconArrow,
  IconChevron,
  IconDown,
  IconMenu,
  IconSearch,
  IconDownload,
  IconUsers,
  IconBookmark,
  IconMail,
  IconQuote,
  IconCalendar,
  IconWhatsApp
});

// Single lookup-by-name entry point, for design-system export purposes.
const ICON_MAP = {
  heart: IconHeart,
  leaf: IconLeaf,
  dumbbell: IconDumbbell,
  brain: IconBrain,
  sun: IconSun,
  moon: IconMoon,
  droplet: IconDroplet,
  sparkle: IconSparkle,
  check: IconCheck,
  arrow: IconArrow,
  chevron: IconChevron,
  down: IconDown,
  menu: IconMenu,
  search: IconSearch,
  download: IconDownload,
  users: IconUsers,
  bookmark: IconBookmark,
  mail: IconMail,
  quote: IconQuote,
  calendar: IconCalendar,
  whatsapp: IconWhatsApp
};
function Icons({
  name = 'heart',
  ...rest
}) {
  const Cmp = ICON_MAP[name] || IconHeart;
  return /*#__PURE__*/React.createElement(Cmp, rest);
}
window.Icons = Icons;
Object.assign(__ds_scope, { Icons });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/components/Icons.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/components/InfoLinks.jsx
try { (() => {
// "Information You Need", a 3-column link grid of quick jumps.
// Inspired by thepauselife.com's same-named section.

function InfoLinks({
  lang,
  setRoute
}) {
  const isEs = lang === 'es';
  const columns = [{
    title: isEs ? 'Nutrición y ejercicio' : 'Nutrition & exercise',
    tone: 'sage',
    links: [{
      label: isEs ? 'Proteína después de los 45' : 'Protein after 45',
      onClick: () => setRoute('article')
    }, {
      label: isEs ? 'Alimentos a evitar' : 'Foods to avoid',
      onClick: () => setRoute('article')
    }, {
      label: isEs ? 'Entrenamiento de fuerza para principiantes' : 'Strength training for beginners',
      onClick: () => setRoute('article')
    }, {
      label: isEs ? 'Yoga para la salud mental' : 'Yoga for mental health',
      onClick: () => setRoute('article')
    }, {
      label: isEs ? 'Calculadora de proteína' : 'Protein calculator',
      onClick: () => setRoute('article')
    }]
  }, {
    title: isEs ? 'Peri/Menopausia' : 'Peri/Menopause',
    tone: 'rose',
    links: [{
      label: isEs ? 'Opciones de terapia hormonal' : 'Hormonal therapy options',
      onClick: () => setRoute('hormones')
    }, {
      label: isEs ? 'Lista para tu ginecóloga' : 'Your OB-GYN visit checklist',
      onClick: () => setRoute('doctor')
    }, {
      label: isEs ? 'Cómo encontrar un especialista' : 'How to find a menopause specialist',
      onClick: () => setRoute('hormones')
    }, {
      label: isEs ? 'Suplementos principales' : 'The supplements to know',
      onClick: () => setRoute('supplements')
    }]
  }, {
    title: isEs ? 'Salud reproductiva' : 'Reproductive health',
    tone: 'plum',
    links: [{
      label: isEs ? 'VPH, lo que debes saber' : 'HPV, what to know',
      onClick: () => setRoute('cancer')
    }, {
      label: isEs ? 'Calendario de detección' : 'Your screening schedule',
      onClick: () => setRoute('cancer')
    }, {
      label: isEs ? 'Síntomas que no debes ignorar' : 'Symptoms not to brush off',
      onClick: () => setRoute('cancer')
    }, {
      label: isEs ? 'Salud mental y los 45+' : 'Mental health and 45+',
      onClick: () => setRoute('article')
    }, {
      label: isEs ? 'Cuidado de la piel y hormonas' : 'Skin care and hormones',
      onClick: () => setRoute('article')
    }]
  }];
  return /*#__PURE__*/React.createElement("section", {
    className: "ella-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-section-head",
    style: {
      textAlign: 'center',
      margin: '0 auto 32px',
      maxWidth: 720
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-eyebrow"
  }, isEs ? 'TODO LO QUE NECESITAS' : 'EVERYTHING YOU NEED'), /*#__PURE__*/React.createElement("h2", {
    className: "ella-h2-italic"
  }, isEs ? /*#__PURE__*/React.createElement(React.Fragment, null, "La ", /*#__PURE__*/React.createElement("em", null, "informaci\xF3n"), " que buscas.") : /*#__PURE__*/React.createElement(React.Fragment, null, "The ", /*#__PURE__*/React.createElement("em", null, "information"), " you need."))), /*#__PURE__*/React.createElement("div", {
    className: "ella-infolinks"
  }, columns.map(c => /*#__PURE__*/React.createElement("div", {
    key: c.title,
    className: "ella-infolinks-col",
    "data-tone": c.tone
  }, /*#__PURE__*/React.createElement("h3", {
    className: "ella-h3-italic"
  }, /*#__PURE__*/React.createElement("em", null, c.title)), /*#__PURE__*/React.createElement("ul", null, c.links.map((l, i) => /*#__PURE__*/React.createElement("li", {
    key: i
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      l.onClick();
    }
  }, l.label, /*#__PURE__*/React.createElement(IconArrow, {
    width: "14",
    height: "14"
  }))))))))));
}
window.InfoLinks = InfoLinks;
Object.assign(__ds_scope, { InfoLinks });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/components/InfoLinks.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/components/Photo.jsx
try { (() => {
// Photo, renders a real photograph when given `src`, otherwise a warm,
// textured placeholder rectangle (a gradient with a loose figure suggestion
// and an optional caption). Production photography is women 45-70 in natural light.

function Photo({
  aspect = '4/3',
  caption,
  tint = 'rose',
  radius = '16px',
  className = '',
  style = {},
  src,
  alt,
  objectPosition = 'center'
}) {
  const tints = {
    rose: {
      from: '#f6dcd1',
      to: '#efe7da',
      figure: '#c87f6e'
    },
    cream: {
      from: '#efe7da',
      to: '#e4d9c7',
      figure: '#8b7c64'
    },
    sage: {
      from: '#e2e6d9',
      to: '#efe7da',
      figure: '#6f7e5d'
    },
    plum: {
      from: '#e8dde2',
      to: '#efe7da',
      figure: '#7e5266'
    }
  };
  const c = tints[tint] || tints.rose;
  return /*#__PURE__*/React.createElement("div", {
    "aria-label": alt || caption || 'Photograph',
    className: className,
    style: {
      aspectRatio: aspect,
      width: '100%',
      background: `linear-gradient(135deg, ${c.from} 0%, ${c.to} 100%)`,
      borderRadius: radius,
      position: 'relative',
      overflow: 'hidden',
      ...style
    }
  }, src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: alt || '',
    loading: "lazy",
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      objectPosition,
      display: 'block'
    }
  }) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 400 300",
    preserveAspectRatio: "xMidYMid slice",
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%'
    }
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("radialGradient", {
    id: `g-${tint}`,
    cx: "62%",
    cy: "50%",
    r: "55%"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: c.figure,
    stopOpacity: "0.35"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "60%",
    stopColor: c.figure,
    stopOpacity: "0.06"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: c.figure,
    stopOpacity: "0"
  }))), /*#__PURE__*/React.createElement("rect", {
    width: "400",
    height: "300",
    fill: `url(#g-${tint})`
  }), /*#__PURE__*/React.createElement("g", {
    opacity: "0.22",
    fill: c.figure
  }, /*#__PURE__*/React.createElement("ellipse", {
    cx: "260",
    cy: "130",
    rx: "42",
    ry: "48"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M 200 300 Q 210 200 260 195 Q 320 200 330 300 Z"
  }))), caption ? /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 10,
      left: 12,
      fontFamily: 'var(--font-body)',
      fontSize: 11,
      fontWeight: 600,
      color: '#fff',
      background: 'rgba(47,38,29,0.55)',
      padding: '4px 10px',
      borderRadius: 999,
      letterSpacing: '0.04em'
    }
  }, caption) : null));
}
window.Photo = Photo;
Object.assign(__ds_scope, { Photo });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/components/Photo.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/components/PromoBar.jsx
try { (() => {
// Rotating promo bar, cream-colored strip at the very top of the site.
// Cycles short calls-to-action every 4s. Inspired by thepauselife.com.

function PromoBar({
  lang
}) {
  const isEs = lang === 'es';
  const promos = isEs ? [{
    label: 'Nuevo: Lista de preguntas para tu m\u00e9dico  \u2192',
    href: '#doctor'
  }, {
    label: 'Recibe la nota semanal de Jessica  \u2192',
    href: '#newsletter'
  }, {
    label: 'Toma el chequeo de 5 preguntas  \u2192',
    href: '#quiz'
  }, {
    label: 'Disponible en espa\u00f1ol  \u00b7  Available in English',
    href: '#'
  }] : [{
    label: 'New: Free doctor-visit checklist (PDF)  \u2192',
    href: '#doctor'
  }, {
    label: "Get Jessica's weekly note in your inbox  \u2192",
    href: '#newsletter'
  }, {
    label: 'Take the 5-question check-in  \u2192',
    href: '#quiz'
  }, {
    label: 'Disponible en espa\u00f1ol  \u00b7  Available in English',
    href: '#'
  }];
  const [i, setI] = React.useState(0);
  React.useEffect(() => {
    const id = setInterval(() => setI(n => (n + 1) % promos.length), 4200);
    return () => clearInterval(id);
  }, [promos.length]);
  return /*#__PURE__*/React.createElement("div", {
    className: "ella-promo"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-promo-track",
    "aria-live": "polite"
  }, promos.map((p, idx) => /*#__PURE__*/React.createElement("a", {
    key: idx,
    href: p.href,
    className: 'ella-promo-msg' + (idx === i ? ' is-active' : '')
  }, p.label))));
}
window.PromoBar = PromoBar;
Object.assign(__ds_scope, { PromoBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/components/PromoBar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/components/SvgAssets.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// Inline SVG assets, used instead of <img src="..."> so the bundle is
// fully self-contained when shared as a single HTML file.

function LogoEllaSvg({
  width = 160,
  color = '#2f261d',
  accent = '#c87f6e',
  ...rest
}) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 320 96",
    width: width,
    height: width * (96 / 320)
  }, rest), /*#__PURE__*/React.createElement("g", {
    transform: "translate(8, 22)",
    fill: "none",
    stroke: accent,
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M28 50 Q28 28 28 8"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M28 38 Q18 34 12 24"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M28 32 Q38 28 44 18"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M28 24 Q22 20 18 12"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M28 18 Q34 14 38 6"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "28",
    cy: "6",
    r: "2",
    fill: accent
  })), /*#__PURE__*/React.createElement("text", {
    x: "68",
    y: "68",
    style: {
      fontFamily: "'DM Serif Display', 'Cormorant Garamond', Georgia, serif",
      fontSize: 64,
      fill: color
    }
  }, "Ella"));
}
function LogoMarkSvg({
  size = 32,
  color = '#c87f6e',
  ...rest
}) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 64 64",
    width: size,
    height: size
  }, rest), /*#__PURE__*/React.createElement("g", {
    transform: "translate(18, 6)",
    fill: "none",
    stroke: color,
    strokeWidth: "1.75",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M14 52 Q14 30 14 6"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M14 40 Q4 36 -2 26"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M14 34 Q24 30 30 20"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M14 26 Q8 22 4 14"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M14 20 Q20 16 24 8"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "14",
    cy: "6",
    r: "2",
    fill: color
  })));
}
function IllustrationSprig({
  width = 120,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 120 80",
    width: width
  }, rest), /*#__PURE__*/React.createElement("g", {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M60 76 Q60 40 60 8"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M60 58 Q42 54 32 40"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M60 50 Q78 46 88 32"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M60 40 Q48 36 40 26"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M60 30 Q72 26 80 16"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M60 22 Q52 18 48 10"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "60",
    cy: "8",
    r: "2.4",
    fill: "currentColor"
  })));
}
function IllustrationBranch({
  width = 160,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 160 120",
    width: width
  }, rest), /*#__PURE__*/React.createElement("g", {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M20 100 C40 80 60 60 80 60 C100 60 120 60 140 40"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M50 78 Q56 70 54 60"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M70 66 Q76 56 74 46"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M90 60 Q96 50 100 40"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M110 54 Q118 50 124 42"
  }), /*#__PURE__*/React.createElement("ellipse", {
    cx: "40",
    cy: "92",
    rx: "10",
    ry: "4",
    transform: "rotate(-30 40 92)"
  }), /*#__PURE__*/React.createElement("ellipse", {
    cx: "60",
    cy: "74",
    rx: "9",
    ry: "3.5",
    transform: "rotate(-30 60 74)"
  }), /*#__PURE__*/React.createElement("ellipse", {
    cx: "80",
    cy: "64",
    rx: "9",
    ry: "3.5",
    transform: "rotate(-20 80 64)"
  }), /*#__PURE__*/React.createElement("ellipse", {
    cx: "105",
    cy: "56",
    rx: "8",
    ry: "3",
    transform: "rotate(-15 105 56)"
  })));
}
Object.assign(window, {
  LogoEllaSvg,
  LogoMarkSvg,
  IllustrationSprig,
  IllustrationBranch
});

// Single lookup-by-name entry point, for design-system export purposes.
const SVG_MAP = {
  logo: LogoEllaSvg,
  mark: LogoMarkSvg,
  sprig: IllustrationSprig,
  branch: IllustrationBranch
};
function SvgAssets({
  name = 'logo',
  ...rest
}) {
  const Cmp = SVG_MAP[name] || LogoEllaSvg;
  return /*#__PURE__*/React.createElement(Cmp, rest);
}
window.SvgAssets = SvgAssets;
Object.assign(__ds_scope, { SvgAssets });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/components/SvgAssets.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/components/Testimonials.jsx
try { (() => {
// Testimonials carousel, quote cards. Inspired by The Pause Life's
// "I feel seen" testimonials section. Manual prev/next + auto-rotate.

function Testimonials({
  lang
}) {
  const isEs = lang === 'es';
  const items = isEs ? [{
    quote: 'Por primera vez siento que tengo información real, sin alarmismo, sin que me vendan algo.',
    author: 'Marta R., 52'
  }, {
    quote: 'Llevé la lista a mi ginecóloga y por fin tuvimos una conversación de verdad.',
    author: 'Elena G., 48'
  }, {
    quote: 'Que esté en español marca toda la diferencia. Mi mamá lo lee conmigo.',
    author: 'Carolina M., 50'
  }, {
    quote: 'No me sentí juzgada. Me sentí escuchada, lo opuesto a la mayoría de las citas médicas.',
    author: 'Patricia D., 55'
  }, {
    quote: 'El chequeo me ayudó a entender dónde estoy. No sabía que era perimenopausia.',
    author: 'Lorena S., 46'
  }] : [{
    quote: 'For the first time I feel like I have real information, no alarmism, nothing being sold to me.',
    author: 'Marta R., 52'
  }, {
    quote: 'I brought the list to my OB-GYN and we actually had a real conversation.',
    author: 'Elena G., 48'
  }, {
    quote: 'Having it in Spanish makes all the difference. My mom reads it with me.',
    author: 'Carolina M., 50'
  }, {
    quote: 'I didn’t feel judged. I felt heard, the opposite of how most doctor visits feel.',
    author: 'Patricia D., 55'
  }, {
    quote: 'The check-in helped me understand where I am. I didn’t know it was perimenopause.',
    author: 'Lorena S., 46'
  }];
  const [i, setI] = React.useState(0);
  React.useEffect(() => {
    const id = setInterval(() => setI(n => (n + 1) % items.length), 6500);
    return () => clearInterval(id);
  }, [items.length]);
  return /*#__PURE__*/React.createElement("section", {
    className: "ella-section ella-bg-blush",
    "data-screen-label": "testimonials"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-container"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      marginBottom: 40
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-eyebrow",
    style: {
      fontSize: 18,
      fontWeight: 800
    }
  }, isEs ? 'EN PALABRAS DE NUESTRAS LECTORAS' : 'IN THEIR OWN WORDS')), /*#__PURE__*/React.createElement("div", {
    className: "ella-testimonials"
  }, items.map((q, idx) => /*#__PURE__*/React.createElement("figure", {
    key: idx,
    className: 'ella-testimonial' + (idx === i ? ' is-active' : ''),
    "aria-hidden": idx !== i
  }, /*#__PURE__*/React.createElement(IconQuote, {
    width: "36",
    height: "36",
    style: {
      color: 'var(--ella-rose-300)'
    }
  }), /*#__PURE__*/React.createElement("blockquote", null, q.quote), /*#__PURE__*/React.createElement("figcaption", null, ', ' + q.author)))), /*#__PURE__*/React.createElement("div", {
    className: "ella-testimonial-dots"
  }, items.map((_, idx) => /*#__PURE__*/React.createElement("button", {
    key: idx,
    type: "button",
    "aria-label": (isEs ? 'Testimonio ' : 'Testimonial ') + (idx + 1),
    "aria-current": idx === i,
    className: 'ella-testimonial-dot' + (idx === i ? ' is-active' : ''),
    onClick: () => setI(idx)
  })))));
}
window.Testimonials = Testimonials;
Object.assign(__ds_scope, { Testimonials });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/components/Testimonials.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/components/i18n.jsx
try { (() => {
// Simple EN/ES dictionary used throughout the kit.
// Real translations would be commissioned alongside English, not auto-translated.

const T_DICT = {
  en: {
    nav_learn: 'Learn',
    nav_supplements: 'Supplements',
    nav_doctor: 'Ask your doctor',
    nav_quiz: 'Where am I?',
    nav_about: 'About Jessica',
    nav_hormones: 'Hormonal therapy',
    nav_cancer: 'Cancer & HPV',
    cta_start: 'Start exploring',
    cta_watch: "Watch Jessica's intro",
    eyebrow_intro: 'A NOTE FROM JESSICA',
    hero_title: 'You\u2019re not imagining it.',
    hero_sub: 'Honest, plainspoken information about menopause, nutrition, supplements, exercise, mental health, and the questions to ask your doctor. Built by a physician assistant for women who deserve answers.',
    awareness_eyebrow: 'WHERE AM I?',
    awareness_title: 'A short, gentle check-in.',
    awareness_sub: 'Five quick questions. No score, no judgment, just a clearer picture of what stage your body is in and what to read next.',
    awareness_start: 'Begin the check-in',
    pillars_eyebrow: 'WHAT WE COVER',
    pillars_title: 'Everything in one trusted place.',
    pillar_nutrition: 'Nutrition',
    pillar_nutrition_desc: 'Foods to include, protein needs during menopause, healthier swaps. No meal plans, just real information.',
    pillar_supplements: 'Supplements',
    pillar_supplements_desc: 'Omega-3, Vit D, Vit K, collagen, magnesium glycinate, fiber. What\u2019s worth taking, with links to buy.',
    pillar_exercise: 'Exercise',
    pillar_exercise_desc: 'Strength training, walking, yoga. Light weights count. Less cardio, more muscle.',
    pillar_mental: 'Mental health',
    pillar_mental_desc: 'Support groups, meetups, resource links. You\u2019re not alone, and the data backs that up.',
    pillar_skin: 'Skin care',
    pillar_skin_desc: 'What hormonal changes do to your skin, and what actually helps.',
    pillar_hormones: 'Hormonal therapy',
    pillar_hormones_desc: 'HRT options explained in plain English. No endorsements, just clarity.',
    doctor_eyebrow: 'PRINTABLE',
    doctor_title: 'Questions to bring to your next OB-GYN visit.',
    doctor_sub: 'Most doctors don\u2019t focus on menopause. This printable list helps you walk in prepared, covering perimenopause, HRT options, and how to find a menopause specialist.',
    doctor_cta: 'Download the list (PDF)',
    newsletter_title: 'Get the weekly note.',
    newsletter_sub: 'Honest, useful, never spammy.',
    newsletter_placeholder: 'you@example.com',
    newsletter_cta: 'Subscribe',
    footer_tagline: 'Women supporting women through every hormonal stage of life.',
    footer_about: 'About Jessica',
    footer_credentials: 'Credentials',
    footer_contact: 'Contact',
    footer_privacy: 'Privacy',
    quiz_q1: 'What do you know about perimenopause vs. menopause?',
    quiz_q1_a1: 'I know the difference well',
    quiz_q1_a2: 'I\u2019ve heard the terms but I\u2019m unsure',
    quiz_q1_a3: 'Honestly, not much',
    quiz_q2: 'Are you experiencing any of these symptoms?',
    quiz_q2_a1: 'Hot flashes or night sweats',
    quiz_q2_a2: 'Sleep changes or insomnia',
    quiz_q2_a3: 'Mood shifts, anxiety, or low mood',
    quiz_q2_a4: 'Brain fog or memory lapses',
    quiz_q2_a5: 'Irregular or heavy periods',
    quiz_q2_a6: 'None of the above',
    quiz_q3: 'Does thinking about these symptoms cause you stress or embarrassment?',
    quiz_q3_a1: 'Yes, a lot',
    quiz_q3_a2: 'Sometimes',
    quiz_q3_a3: 'Not really',
    quiz_back: 'Back',
    quiz_next: 'Next',
    quiz_finish: 'See what to read next',
    quiz_progress: 'Question {n} of {total}',
    article_back: 'All articles',
    article_save: 'Save',
    article_share: 'Share',
    article_reading: '8 min read'
  },
  es: {
    nav_about: 'Sobre Jessica',
    nav_learn: 'Aprende',
    nav_supplements: 'Suplementos',
    nav_doctor: 'Pregunta a tu m\u00e9dico',
    nav_quiz: '\u00bfD\u00f3nde estoy?',
    nav_hormones: 'Terapia hormonal',
    nav_cancer: 'C\u00e1ncer y VPH',
    cta_start: 'Empieza a explorar',
    cta_watch: 'Mira la introducci\u00f3n de Jessica',
    eyebrow_intro: 'UN MENSAJE DE JESSICA',
    hero_title: 'No te lo est\u00e1s imaginando.',
    hero_sub: 'Informaci\u00f3n honesta y clara sobre la menopausia, nutrici\u00f3n, suplementos, ejercicio, salud mental, y las preguntas que debes hacerle a tu m\u00e9dico. Creado por una asistente m\u00e9dica para mujeres que merecen respuestas.',
    awareness_eyebrow: '\u00bfD\u00d3NDE ESTOY?',
    awareness_title: 'Un peque\u00f1o chequeo, sin presi\u00f3n.',
    awareness_sub: 'Cinco preguntas rápidas. Sin puntaje, sin juicio, solo una imagen más clara de la etapa en la que está tu cuerpo y qué leer después.',
    awareness_start: 'Comenzar',
    pillars_eyebrow: 'LO QUE CUBRIMOS',
    pillars_title: 'Todo en un solo lugar de confianza.',
    pillar_nutrition: 'Nutrici\u00f3n',
    pillar_nutrition_desc: 'Alimentos para incluir, necesidades de prote\u00edna durante la menopausia, sustituciones m\u00e1s sanas. Sin planes de comidas, solo informaci\u00f3n real.',
    pillar_supplements: 'Suplementos',
    pillar_supplements_desc: 'Omega-3, Vit D, Vit K, col\u00e1geno, glicinato de magnesio, fibra. Qu\u00e9 vale la pena tomar, con enlaces para comprar.',
    pillar_exercise: 'Ejercicio',
    pillar_exercise_desc: 'Entrenamiento de fuerza, caminar, yoga. Las pesas ligeras cuentan. Menos cardio, m\u00e1s m\u00fasculo.',
    pillar_mental: 'Salud mental',
    pillar_mental_desc: 'Grupos de apoyo, reuniones, recursos. No est\u00e1s sola, y los datos lo confirman.',
    pillar_skin: 'Cuidado de la piel',
    pillar_skin_desc: 'Qu\u00e9 le hacen los cambios hormonales a tu piel, y qu\u00e9 realmente ayuda.',
    pillar_hormones: 'Terapia hormonal',
    pillar_hormones_desc: 'Las opciones de TRH explicadas con claridad. Sin recomendaciones, solo informaci\u00f3n.',
    doctor_eyebrow: 'IMPRIMIBLE',
    doctor_title: 'Preguntas para tu pr\u00f3xima cita ginecol\u00f3gica.',
    doctor_sub: 'La mayor\u00eda de los m\u00e9dicos no se enfocan en la menopausia. Esta lista imprimible te ayuda a llegar preparada, cubre la perimenopausia, opciones de TRH, y c\u00f3mo encontrar un especialista en menopausia.',
    doctor_cta: 'Descargar la lista (PDF)',
    newsletter_title: 'Recibe la nota semanal.',
    newsletter_sub: 'Honesta, \u00fatil, nunca spam.',
    newsletter_placeholder: 'tu@ejemplo.com',
    newsletter_cta: 'Suscribirme',
    footer_tagline: 'Mujeres apoyando a mujeres en cada etapa hormonal de la vida.',
    footer_about: 'Sobre Jessica',
    footer_credentials: 'Credenciales',
    footer_contact: 'Contacto',
    footer_privacy: 'Privacidad',
    quiz_q1: '\u00bfQu\u00e9 sabes sobre la perimenopausia vs. la menopausia?',
    quiz_q1_a1: 'Conozco bien la diferencia',
    quiz_q1_a2: 'He o\u00eddo los t\u00e9rminos pero no estoy segura',
    quiz_q1_a3: 'Honestamente, no mucho',
    quiz_q2: '\u00bfEst\u00e1s experimentando alguno de estos s\u00edntomas?',
    quiz_q2_a1: 'Sofocos o sudores nocturnos',
    quiz_q2_a2: 'Cambios en el sue\u00f1o o insomnio',
    quiz_q2_a3: 'Cambios de humor, ansiedad o tristeza',
    quiz_q2_a4: 'Niebla mental o lapsos de memoria',
    quiz_q2_a5: 'Per\u00edodos irregulares o abundantes',
    quiz_q2_a6: 'Ninguno de los anteriores',
    quiz_q3: '\u00bfPensar en estos s\u00edntomas te causa estr\u00e9s o verg\u00fcenza?',
    quiz_q3_a1: 'S\u00ed, mucho',
    quiz_q3_a2: 'A veces',
    quiz_q3_a3: 'En realidad no',
    quiz_back: 'Atr\u00e1s',
    quiz_next: 'Siguiente',
    quiz_finish: 'Ver qu\u00e9 leer despu\u00e9s',
    quiz_progress: 'Pregunta {n} de {total}',
    article_back: 'Todos los art\u00edculos',
    article_save: 'Guardar',
    article_share: 'Compartir',
    article_reading: '8 min de lectura'
  }
};
function useT(lang) {
  return React.useCallback((key, vars) => {
    let s = T_DICT[lang] && T_DICT[lang][key] || T_DICT.en[key] || key;
    if (vars) for (const k in vars) s = s.replace('{' + k + '}', vars[k]);
    return s;
  }, [lang]);
}
window.useT = useT;
window.T_DICT = T_DICT;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/components/i18n.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/screens/AboutJessica.jsx
try { (() => {
// About Jessica, founder story, credentials, mission, and why Ella exists.

function AboutJessica({
  lang,
  setRoute
}) {
  const t = useT(lang);
  const isEs = lang === 'es';
  return /*#__PURE__*/React.createElement("div", {
    "data-screen-label": "07 About Jessica"
  }, /*#__PURE__*/React.createElement("section", {
    className: "ella-section-tight"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-about-hero",
    style: {
      width: 1080
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-about-photo"
  }, /*#__PURE__*/React.createElement(Photo, {
    aspect: "4/5",
    tint: "rose",
    src: "./img_9953-msmdchef-e47h.png",
    alt: isEs ? 'Retrato de Jessica' : 'Portrait of Jessica',
    radius: "24px",
    style: {
      width: 340,
      height: 459
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "ella-about-intro"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-eyebrow"
  }, isEs ? 'CONOCE A LA FUNDADORA' : 'MEET THE FOUNDER'), /*#__PURE__*/React.createElement("h1", null, isEs ? 'Hola, soy Jessica.' : 'Hi, I\u2019m Jessica.'), /*#__PURE__*/React.createElement("p", {
    className: "ella-article-lede"
  }, isEs ? 'Tengo 53 a\u00f1os, soy madre de tres, y empec\u00e9 la perimenopausia m\u00e1s tarde que la mayor\u00eda de las mujeres. Por eso no la tom\u00e9 en serio hasta que me lleg\u00f3 de lleno, y cuando lleg\u00f3, nada se parec\u00eda a lo que me hab\u00edan contado.' : 'I\u2019m 53, a mother of three, and I started perimenopause later than most women do. That\u2019s part of why I didn\u2019t take it seriously until it hit, and when it did, none of it looked like what I\u2019d been told to expect.'), /*#__PURE__*/React.createElement("p", {
    className: "ella-article-lede",
    style: {
      marginTop: 12
    }
  }, isEs ? 'No tuve el aumento de peso dr\u00e1stico. Mis s\u00edntomas no se parec\u00edan a la lista t\u00edpica de sofocos y baja libido que todo el mundo menciona. Ah\u00ed entend\u00ed algo importante: la menopausia no empieza igual en cada mujer. Puede llegar tan pronto como a los 40, o hasta mediados de los 50.' : 'I didn\u2019t have the dramatic weight gain. My symptoms didn\u2019t match the usual list everyone mentions, hot flashes, low libido. That\u2019s when it hit me: menopause doesn\u2019t start the same way for every woman. It can begin as early as 40, or as late as your mid-50s.'), /*#__PURE__*/React.createElement("p", {
    className: "ella-article-lede",
    style: {
      marginTop: 12
    }
  }, isEs ? 'Esa experiencia me inspir\u00f3 a guiar a otras mujeres que se sienten tan perdidas como yo me sent\u00ed. Ahora me siento bien, y quiero compartir mi investigaci\u00f3n y experiencia con todas las mujeres que no saben c\u00f3mo reunir esta informaci\u00f3n por su cuenta, especialmente las que hablan espa\u00f1ol, que muchas veces tienen a\u00fan menos recursos accesibles.' : 'That experience is what pushed me to guide other women who feel as lost as I once did. I feel good now, and I want to share my research and experience with every woman who doesn\u2019t know how to gather all this information herself, especially Spanish speakers, who often have even fewer accessible resources.'), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 28,
      marginTop: 22
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 28,
      color: 'var(--ella-clay-900)'
    }
  }, "53"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'var(--ella-taupe-500)'
    }
  }, isEs ? 'a\u00f1os' : 'years old')), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 28,
      color: 'var(--ella-clay-900)'
    }
  }, "3"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'var(--ella-taupe-500)'
    }
  }, isEs ? 'hijos' : 'children')), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 28,
      color: 'var(--ella-clay-900)'
    }
  }, "2"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'var(--ella-taupe-500)'
    }
  }, isEs ? 'idiomas' : 'languages'))))))));
}
window.AboutJessica = AboutJessica;
Object.assign(__ds_scope, { AboutJessica });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/screens/AboutJessica.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/screens/ArticleView.jsx
try { (() => {
// ArticleView, generic article reader. Renders any article by id.
// Replaces the hardcoded NutritionArticle screen.

function ArticleView({
  lang,
  setRoute,
  articleId,
  setArticleId
}) {
  const t = useT(lang);
  const isEs = lang === 'es';
  const article = getArticle(articleId || 'protein-after-45', lang);

  // category eyebrow color by tone
  const toneColor = article.tone === 'sage' ? 'var(--ella-sage-700)' : article.tone === 'plum' ? 'var(--ella-plum-500)' : 'var(--ella-rose-deep)';
  return /*#__PURE__*/React.createElement("div", {
    "data-screen-label": "04 Article"
  }, /*#__PURE__*/React.createElement("section", {
    className: "ella-section-tight"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-article"
  }, /*#__PURE__*/React.createElement("a", {
    className: "ella-article-back",
    href: "#",
    onClick: e => {
      e.preventDefault();
      setRoute('articles');
    }
  }, /*#__PURE__*/React.createElement(IconChevron, {
    width: "16",
    height: "16",
    style: {
      transform: 'rotate(180deg)'
    }
  }), t('article_back')), /*#__PURE__*/React.createElement("div", {
    className: "ella-eyebrow",
    style: {
      color: toneColor
    }
  }, article.category.toUpperCase()), /*#__PURE__*/React.createElement("h1", null, article.title), /*#__PURE__*/React.createElement("p", {
    className: "ella-article-lede"
  }, article.lede), /*#__PURE__*/React.createElement("div", {
    className: "ella-article-meta"
  }, /*#__PURE__*/React.createElement("span", null, "Jessica Zavala, PA-C"), /*#__PURE__*/React.createElement("span", {
    className: "dot"
  }), /*#__PURE__*/React.createElement("span", null, article.readTime), /*#__PURE__*/React.createElement("span", {
    className: "dot"
  }), /*#__PURE__*/React.createElement("span", null, article.published)), /*#__PURE__*/React.createElement("div", {
    className: "ella-article-actions"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "ella-article-pill"
  }, /*#__PURE__*/React.createElement(IconBookmark, {
    width: "16",
    height: "16"
  }), t('article_save')), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "ella-article-pill"
  }, /*#__PURE__*/React.createElement(IconMail, {
    width: "16",
    height: "16"
  }), t('article_share'))), /*#__PURE__*/React.createElement("div", {
    className: "ella-article-cover"
  }, /*#__PURE__*/React.createElement(Photo, {
    aspect: "16/9",
    tint: article.tone || 'rose',
    src: article.image,
    alt: article.title,
    radius: "24px"
  })), /*#__PURE__*/React.createElement("div", {
    className: "ella-article-body"
  }, article.body.map((block, i) => {
    if (block.kind === 'p') return /*#__PURE__*/React.createElement("p", {
      key: i
    }, block.text);
    if (block.kind === 'h2') return /*#__PURE__*/React.createElement("h2", {
      key: i
    }, block.text);
    if (block.kind === 'pull') return /*#__PURE__*/React.createElement("div", {
      key: i,
      className: "ella-article-pull"
    }, block.text);
    if (block.kind === 'ul') return /*#__PURE__*/React.createElement("ul", {
      key: i,
      style: {
        fontSize: 18,
        lineHeight: 1.75,
        color: 'var(--ella-clay-700)',
        paddingLeft: 22
      }
    }, block.items.map((it, j) => /*#__PURE__*/React.createElement("li", {
      key: j
    }, it)));
    if (block.kind === 'table') return /*#__PURE__*/React.createElement("table", {
      key: i,
      className: "ella-protein-table"
    }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, block.headers.map((h, j) => /*#__PURE__*/React.createElement("th", {
      key: j
    }, h)))), /*#__PURE__*/React.createElement("tbody", null, block.rows.map((row, j) => /*#__PURE__*/React.createElement("tr", {
      key: j
    }, row.map((cell, k) => /*#__PURE__*/React.createElement("td", {
      key: k
    }, cell))))));
    return null;
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 28
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      setRoute('doctor');
    }
  }, isEs ? 'Descarga la lista de preguntas para tu médico' : 'Grab the doctor checklist', " \u2192"))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 80,
      paddingTop: 40,
      borderTop: '1px solid var(--border-default)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-eyebrow",
    style: {
      marginBottom: 16
    }
  }, isEs ? 'SIGUE LEYENDO' : 'KEEP READING'), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
      gap: 16
    }
  }, getArticles(lang).filter(a => a.id !== article.id).slice(0, 3).map(a => /*#__PURE__*/React.createElement("a", {
    key: a.id,
    href: "#",
    className: "ella-article-mini",
    onClick: e => {
      e.preventDefault();
      setArticleId(a.id);
      window.scrollTo({
        top: 0
      });
    }
  }, /*#__PURE__*/React.createElement(Photo, {
    aspect: "16/10",
    tint: a.tone || 'rose',
    src: a.image,
    alt: a.title,
    radius: "14px"
  }), /*#__PURE__*/React.createElement("div", {
    className: "ella-article-mini-cat"
  }, a.category), /*#__PURE__*/React.createElement("div", {
    className: "ella-article-mini-title"
  }, a.title)))))))));
}
window.ArticleView = ArticleView;
Object.assign(__ds_scope, { ArticleView });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/screens/ArticleView.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/screens/ArticlesHub.jsx
try { (() => {
// ArticlesHub, grid of all Ella articles, filterable by category.

function ArticlesHub({
  lang,
  setRoute,
  setArticleId,
  initialCategory
}) {
  const isEs = lang === 'es';
  const articles = getArticles(lang);
  const CATEGORY_ORDER = isEs ? ['Nutrici\u00f3n', 'Ejercicio', 'Salud mental'] : ['Nutrition', 'Exercise', 'Mental Health'];
  const present = new Set(articles.map(a => a.category));
  const categories = CATEGORY_ORDER.filter(c => present.has(c));
  const allLabel = isEs ? 'Todos' : 'All';
  const [filter, setFilter] = React.useState(initialCategory || categories[0]);
  React.useEffect(() => {
    if (initialCategory) setFilter(initialCategory);
  }, [initialCategory]);
  const shown = filter === 'All' ? articles : articles.filter(a => a.category === filter);
  function open(id) {
    setArticleId(id);
    setRoute('article');
    window.scrollTo({
      top: 0
    });
  }
  return /*#__PURE__*/React.createElement("div", {
    "data-screen-label": "04 Articles Hub"
  }, /*#__PURE__*/React.createElement("section", {
    className: "ella-section-tight"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-container"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 820,
      marginBottom: 32
    }
  }, /*#__PURE__*/React.createElement("h1", {
    className: "ella-h2-italic",
    style: {
      marginTop: 12,
      fontSize: 'clamp(40px, 5vw, 64px)'
    }
  }, filter)), /*#__PURE__*/React.createElement("div", {
    className: "ella-article-filters"
  }, categories.map(c => /*#__PURE__*/React.createElement("button", {
    key: c,
    type: "button",
    className: 'ella-article-filter' + (filter === c ? ' is-active' : ''),
    onClick: () => setFilter(c)
  }, c === 'All' ? allLabel : c))), /*#__PURE__*/React.createElement("div", {
    className: "ella-article-grid"
  }, shown.map(a => /*#__PURE__*/React.createElement("article", {
    key: a.id,
    className: "ella-article-card",
    "data-tone": a.tone
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "ella-article-card-img",
    onClick: () => open(a.id),
    "aria-label": a.title
  })))), shown.length === 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      padding: 60,
      color: 'var(--ella-taupe-500)'
    }
  }, isEs ? 'No hay artículos en esta categoría todavía.' : 'No articles in this category yet.') : null)));
}
window.ArticlesHub = ArticlesHub;
Object.assign(__ds_scope, { ArticlesHub });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/screens/ArticlesHub.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/screens/AskYourDoctor.jsx
try { (() => {
// "What to ask your doctor", printable, downloadable. The artifact view
// of the homepage's checklist CTA. Designed to look like a real document.

function AskYourDoctor({
  lang,
  setRoute
}) {
  const t = useT(lang);
  const isEs = lang === 'es';
  return /*#__PURE__*/React.createElement("div", {
    "data-screen-label": "05 Doctor Checklist"
  }, /*#__PURE__*/React.createElement("section", {
    className: "ella-section-tight"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-article",
    style: {
      maxWidth: 860
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      marginBottom: 28,
      flexWrap: 'wrap'
    }
  })))));
}
window.AskYourDoctor = AskYourDoctor;
Object.assign(__ds_scope, { AskYourDoctor });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/screens/AskYourDoctor.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/screens/AwarenessQuiz.jsx
try { (() => {
// Awareness Quiz, a gentle 5-question check-in. No score, no diagnosis.
// Answers (stage, symptoms, impact, goals, doctor history) feed a
// recommendation engine that points each woman to the right reading.

function AwarenessQuiz({
  lang,
  setRoute
}) {
  const t = useT(lang);
  const isEs = lang === 'es';
  const [step, setStep] = React.useState(0);
  const [answers, setAnswers] = React.useState({});

  // ---- Question set. Bilingual labels live here so the engine can match
  // on stable answer KEYS regardless of language. ----
  const questions = [{
    id: 'stage',
    kind: 'single',
    text: isEs ? '¿En qué parte de tu camino estás?' : 'Where are you in your journey?',
    help: isEs ? 'No hace falta certeza. Elige lo que más se acerque.' : 'No need to be certain. Pick whatever feels closest.',
    opts: [{
      key: 'regular',
      label: isEs ? 'Mis períodos siguen siendo regulares' : 'My periods are still regular'
    }, {
      key: 'changing',
      label: isEs ? 'Mis períodos están cambiando o son irregulares' : 'My periods are changing or irregular'
    }, {
      key: 'post',
      label: isEs ? 'Han pasado 12+ meses desde mi último período' : "It's been 12+ months since my last period"
    }, {
      key: 'surgical',
      label: isEs ? 'Tuve menopausia quirúrgica o médica' : "I've had surgical or medical menopause"
    }, {
      key: 'unsure',
      label: isEs ? 'No estoy segura de dónde estoy' : "I'm not sure where I am"
    }]
  }, {
    id: 'symptoms',
    kind: 'multi',
    text: isEs ? '¿Cuáles de estos has notado últimamente?' : "Which of these have you noticed lately?",
    help: isEs ? 'Elige todas las que apliquen. Está bien dejarlo en blanco.' : 'Choose all that apply. It is okay to leave it blank.',
    opts: [{
      key: 'hot',
      label: isEs ? 'Sofocos o sudores nocturnos' : 'Hot flashes or night sweats'
    }, {
      key: 'sleep',
      label: isEs ? 'Cambios en el sueño o insomnio' : 'Sleep changes or insomnia'
    }, {
      key: 'mood',
      label: isEs ? 'Cambios de humor, ansiedad o tristeza' : 'Mood shifts, anxiety, or low mood'
    }, {
      key: 'fog',
      label: isEs ? 'Niebla mental o lapsos de memoria' : 'Brain fog or memory lapses'
    }, {
      key: 'periods',
      label: isEs ? 'Períodos irregulares o abundantes' : 'Irregular or heavy periods'
    }, {
      key: 'intimacy',
      label: isEs ? 'Sequedad vaginal o cambios en la libido' : 'Vaginal dryness or changes in libido'
    }, {
      key: 'body',
      label: isEs ? 'Dolores articulares o cambios de peso' : 'Joint aches or weight changes'
    }, {
      key: 'none',
      label: isEs ? 'Ninguno de estos por ahora' : 'None of these right now',
      exclusive: true
    }]
  }, {
    id: 'impact',
    kind: 'single',
    text: isEs ? '¿Cuánto está afectando tu día a día?' : 'How much is this affecting your daily life?',
    opts: [{
      key: 'curious',
      label: isEs ? 'Apenas, tengo curiosidad' : "Barely, I'm mostly curious"
    }, {
      key: 'some',
      label: isEs ? 'Algunos días son más difíciles' : 'Some days are harder than others'
    }, {
      key: 'lot',
      label: isEs ? 'Mucho, es difícil de ignorar' : "A lot, it's hard to ignore"
    }, {
      key: 'unsure',
      label: isEs ? 'Honestamente, no estoy segura' : "I'm honestly not sure"
    }]
  }, {
    id: 'goals',
    kind: 'multi',
    text: isEs ? '¿Qué te sería más útil ahora mismo?' : 'What would feel most helpful right now?',
    help: isEs ? 'Elige todas las que apliquen.' : 'Choose all that apply.',
    opts: [{
      key: 'understand',
      label: isEs ? 'Entender qué le pasa a mi cuerpo' : "Understanding what's happening to my body"
    }, {
      key: 'nutrition',
      label: isEs ? 'Nutrición y ejercicio para esta etapa' : 'Nutrition and exercise that fit this stage'
    }, {
      key: 'supplements',
      label: isEs ? 'Saber qué suplementos valen la pena' : 'Knowing which supplements are worth it'
    }, {
      key: 'hormones',
      label: isEs ? 'Conocer las opciones de terapia hormonal' : 'Learning about hormone therapy options'
    }, {
      key: 'doctor',
      label: isEs ? 'Saber qué preguntarle a mi médico' : 'Knowing what to ask my doctor'
    }, {
      key: 'support',
      label: isEs ? 'Sentirme menos sola en esto' : 'Feeling less alone in it'
    }]
  }, {
    id: 'care',
    kind: 'single',
    text: isEs ? '¿Has hablado con un médico sobre esto?' : 'Have you talked to a doctor about this?',
    opts: [{
      key: 'helpful',
      label: isEs ? 'Sí, y fue útil' : 'Yes, and it was helpful'
    }, {
      key: 'dismissed',
      label: isEs ? 'Sí, pero me sentí ignorada' : 'Yes, but I felt dismissed'
    }, {
      key: 'notyet',
      label: isEs ? 'Todavía no' : 'Not yet'
    }, {
      key: 'how',
      label: isEs ? 'No, no sé cómo sacar el tema' : "No, I'm not sure how to bring it up"
    }]
  }];
  const done = step >= questions.length;
  const q = questions[step];
  const selected = answers[q?.id] || (q?.kind === 'multi' ? [] : null);
  function select(opt) {
    if (q.kind === 'multi') {
      let next;
      if (opt.exclusive) {
        next = selected.includes(opt.key) ? [] : [opt.key];
      } else {
        const base = selected.filter(k => {
          const o = q.opts.find(x => x.key === k);
          return !(o && o.exclusive); // picking a real option clears "none"
        });
        next = base.includes(opt.key) ? base.filter(o => o !== opt.key) : [...base, opt.key];
      }
      setAnswers({
        ...answers,
        [q.id]: next
      });
    } else {
      setAnswers({
        ...answers,
        [q.id]: opt.key
      });
    }
  }
  const canAdvance = q && (q.kind === 'multi' ? true : !!selected);

  // ---------- Recommendation engine ----------
  function buildCards() {
    return {
      foundations: {
        icon: /*#__PURE__*/React.createElement(IconSparkle, {
          width: "26",
          height: "26"
        }),
        tone: 'plum',
        route: 'article',
        title: isEs ? 'Empieza aquí: ¿qué es la perimenopausia?' : 'Start here: what is perimenopause?',
        desc: isEs ? 'Un panorama claro de las etapas, en unos 6 minutos.' : 'A clear overview of the stages, in about 6 minutes.',
        cta: isEs ? 'Leer' : 'Read'
      },
      postLife: {
        icon: /*#__PURE__*/React.createElement(IconMoon, {
          width: "26",
          height: "26"
        }),
        tone: 'plum',
        route: 'article',
        title: isEs ? 'La vida después de la menopausia' : 'Life after menopause',
        desc: isEs ? 'Qué cambia a largo plazo y cómo cuidarte ahora.' : 'What changes long term, and how to care for yourself now.',
        cta: isEs ? 'Leer' : 'Read'
      },
      hot: {
        icon: /*#__PURE__*/React.createElement(IconHeart, {
          width: "26",
          height: "26"
        }),
        tone: 'rose',
        route: 'hormones',
        title: isEs ? 'Sofocos y sudores nocturnos' : 'Hot flashes & night sweats',
        desc: isEs ? 'Qué los causa y las opciones que realmente tienes.' : 'What causes them and the options you actually have.',
        cta: isEs ? 'Explorar opciones' : 'Explore options'
      },
      sleep: {
        icon: /*#__PURE__*/React.createElement(IconMoon, {
          width: "26",
          height: "26"
        }),
        tone: 'plum',
        route: 'article',
        title: isEs ? 'Sueño, hormonas y cortisol' : 'Sleep, hormones & cortisol',
        desc: isEs ? 'Por qué cambia el sueño y qué realmente ayuda.' : 'Why sleep shifts now, and what actually helps.',
        cta: isEs ? 'Leer' : 'Read'
      },
      mood: {
        icon: /*#__PURE__*/React.createElement(IconBrain, {
          width: "26",
          height: "26"
        }),
        tone: 'plum',
        route: 'article',
        title: isEs ? 'Cambios de humor en los 40 y 50' : 'Mood shifts in your 40s and 50s',
        desc: isEs ? 'No es solo estrés. La conexión hormonal, explicada.' : "It's not just stress. The hormonal connection, explained.",
        cta: isEs ? 'Leer' : 'Read'
      },
      fog: {
        icon: /*#__PURE__*/React.createElement(IconBrain, {
          width: "26",
          height: "26"
        }),
        tone: 'plum',
        route: 'article',
        title: isEs ? 'Niebla mental, explicada' : 'Brain fog, explained',
        desc: isEs ? 'Qué pasa con la concentración y qué ayuda.' : 'What happens to focus, and what helps.',
        cta: isEs ? 'Leer' : 'Read'
      },
      periods: {
        icon: /*#__PURE__*/React.createElement(IconDownload, {
          width: "26",
          height: "26"
        }),
        tone: 'rose',
        route: 'doctor',
        title: isEs ? 'Cuándo hablar con tu ginecóloga' : 'When to talk to your OB-GYN',
        desc: isEs ? 'Una lista para llevar a tu próxima visita.' : 'A checklist to bring to your next visit.',
        cta: isEs ? 'Ver lista' : 'See checklist'
      },
      intimacy: {
        icon: /*#__PURE__*/React.createElement(IconHeart, {
          width: "26",
          height: "26"
        }),
        tone: 'rose',
        route: 'hormones',
        title: isEs ? 'Intimidad y sequedad, sin tabúes' : 'Intimacy & dryness, without the taboo',
        desc: isEs ? 'Lo que cambia y qué opciones ayudan de verdad.' : 'What changes, and which options genuinely help.',
        cta: isEs ? 'Explorar opciones' : 'Explore options'
      },
      body: {
        icon: /*#__PURE__*/React.createElement(IconLeaf, {
          width: "26",
          height: "26"
        }),
        tone: 'sage',
        route: 'nutrition',
        title: isEs ? 'Articulaciones, músculo y peso' : 'Joints, muscle & weight',
        desc: isEs ? 'Por qué cambia el cuerpo y qué hábitos importan más ahora.' : 'Why the body shifts, and which habits matter most now.',
        cta: isEs ? 'Explorar' : 'Explore'
      },
      nutrition: {
        icon: /*#__PURE__*/React.createElement(IconLeaf, {
          width: "26",
          height: "26"
        }),
        tone: 'sage',
        route: 'nutrition',
        title: isEs ? 'Comer para el cambio hormonal' : 'Eating for hormonal change',
        desc: isEs ? 'Cambios simples que importan más en esta etapa.' : 'Simple swaps that matter more at this stage.',
        cta: isEs ? 'Explorar' : 'Explore'
      },
      supplements: {
        icon: /*#__PURE__*/React.createElement(IconDroplet, {
          width: "26",
          height: "26"
        }),
        tone: 'rose',
        route: 'supplements',
        title: isEs ? 'Los suplementos que conviene conocer' : 'The supplements worth knowing',
        desc: isEs ? 'Qué vale la pena tomar, con la evidencia detrás.' : 'What is worth taking, with the evidence behind it.',
        cta: isEs ? 'Ver lista' : 'See the list'
      },
      hormones: {
        icon: /*#__PURE__*/React.createElement(IconHeart, {
          width: "26",
          height: "26"
        }),
        tone: 'rose',
        route: 'hormones',
        title: isEs ? 'Terapia hormonal, en lenguaje claro' : 'Hormone therapy, in plain language',
        desc: isEs ? 'Las opciones explicadas. Sin recomendar, solo claridad.' : 'The options explained. No endorsements, just clarity.',
        cta: isEs ? 'Explorar opciones' : 'Explore options'
      },
      doctor: {
        icon: /*#__PURE__*/React.createElement(IconDownload, {
          width: "26",
          height: "26"
        }),
        tone: 'rose',
        route: 'doctor',
        title: isEs ? 'Preguntas para tu próxima cita' : 'Questions for your next appointment',
        desc: isEs ? 'Una lista imprimible para llegar preparada.' : 'A printable list so you walk in prepared.',
        cta: isEs ? 'Ver lista' : 'See checklist'
      },
      specialist: {
        icon: /*#__PURE__*/React.createElement(IconArrow, {
          width: "26",
          height: "26"
        }),
        tone: 'plum',
        route: 'hormones',
        title: isEs ? 'Cómo encontrar un especialista en menopausia' : 'How to find a menopause specialist',
        desc: isEs ? 'Qué buscar cuando no te sientes escuchada.' : "What to look for when you don't feel heard.",
        cta: isEs ? 'Aprender' : 'Learn how'
      },
      support: {
        icon: /*#__PURE__*/React.createElement(IconUsers, {
          width: "26",
          height: "26"
        }),
        tone: 'sage',
        route: 'about',
        title: isEs ? 'No estás sola en esto' : "You're not alone in this",
        desc: isEs ? 'Conoce a Jessica y por qué existe Ella.' : 'Meet Jessica and why Ella exists.',
        cta: isEs ? 'Conocer' : 'Meet Jessica'
      }
    };
  }
  function getRecommendations() {
    const cards = buildCards();
    const stage = answers.stage;
    const symptoms = (answers.symptoms || []).filter(k => k !== 'none');
    const goals = answers.goals || [];
    const impact = answers.impact;
    const care = answers.care;
    const recs = [];
    const seen = new Set();
    const add = card => {
      if (card && !seen.has(card.title)) {
        seen.add(card.title);
        recs.push(card);
      }
    };

    // 1. If she felt dismissed or hasn't raised it yet, lead with advocacy tools.
    if ((care === 'dismissed' || care === 'how') && (symptoms.length || impact === 'lot' || impact === 'some')) {
      add(cards.doctor);
      if (care === 'dismissed') add(cards.specialist);
    }

    // 2. Symptom-specific reading, in the order she selected.
    symptoms.forEach(s => add(cards[s]));

    // 3. Honor what she said she's looking for.
    const goalMap = {
      understand: cards.foundations,
      nutrition: cards.nutrition,
      supplements: cards.supplements,
      hormones: cards.hormones,
      doctor: cards.doctor,
      support: cards.support
    };
    goals.forEach(g => add(goalMap[g]));

    // 4. Stage-aware foundations.
    if (stage === 'unsure' || stage === 'regular' || stage === 'changing') add(cards.foundations);
    if (stage === 'post' || stage === 'surgical') add(cards.postLife);

    // 5. Make sure she leaves with at least three doors open.
    [cards.foundations, cards.nutrition, cards.supplements].forEach(add);
    return recs.slice(0, 4);
  }

  // Responsible flag: postmenopausal bleeding is always worth a doctor visit.
  function safetyNote() {
    const stage = answers.stage;
    const symptoms = answers.symptoms || [];
    if ((stage === 'post' || stage === 'surgical') && symptoms.includes('periods')) {
      return isEs ? 'Un dato importante: cualquier sangrado después de la menopausia merece una llamada a tu médico, aunque casi siempre sea benigno. Vale la pena revisarlo.' : 'One important note: any bleeding after menopause is worth a call to your doctor, even though it is usually nothing serious. It is worth getting checked.';
    }
    return null;
  }
  function resultIntro() {
    const symptoms = (answers.symptoms || []).filter(k => k !== 'none');
    const impact = answers.impact;
    const care = answers.care;
    if (care === 'dismissed') {
      return isEs ? 'Que te ignoren es más común de lo que debería, y no es tu culpa. Empecemos por herramientas para que la próxima conversación sea distinta.' : "Being dismissed is more common than it should be, and it is not your fault. Let's start with tools to make the next conversation go differently.";
    }
    if (impact === 'lot') {
      return isEs ? 'Lo que describes suena pesado de cargar. Aquí hay algunas lecturas para sentirte con más control, sin juicio y sin prisa.' : "What you're describing sounds like a lot to carry. Here are a few reads to help you feel more in control, no judgment and no rush.";
    }
    if (symptoms.length === 0) {
      return isEs ? 'No marcaste síntomas, y este es un gran momento para conocer el terreno antes de que las cosas cambien. Aquí está por dónde empezar.' : "You didn't flag any symptoms, and this is a great moment to learn the lay of the land before things shift. Here's where to start.";
    }
    return isEs ? 'Aquí está un punto de partida basado en lo que compartiste. Sin puntaje, sin diagnóstico, solo el siguiente paso correcto.' : "Here's a starting place based on what you shared. No score, no diagnosis, just the right next step.";
  }

  // Small human-readable recap of the answers.
  function recapChips() {
    const chips = [];
    const stageLabels = {
      regular: isEs ? 'Períodos regulares' : 'Regular periods',
      changing: isEs ? 'Períodos cambiando' : 'Periods changing',
      post: isEs ? 'Posmenopausia' : 'Postmenopause',
      surgical: isEs ? 'Menopausia médica' : 'Medical menopause',
      unsure: isEs ? 'Etapa por definir' : 'Stage to be determined'
    };
    if (answers.stage) chips.push(stageLabels[answers.stage]);
    const symCount = (answers.symptoms || []).filter(k => k !== 'none').length;
    if (symCount) chips.push(isEs ? `${symCount} síntoma${symCount > 1 ? 's' : ''}` : `${symCount} symptom${symCount > 1 ? 's' : ''}`);
    const impactLabels = {
      curious: isEs ? 'Con curiosidad' : 'Curious',
      some: isEs ? 'Algunos días difíciles' : 'Some hard days',
      lot: isEs ? 'Difícil de ignorar' : 'Hard to ignore',
      unsure: isEs ? 'Sin certeza' : 'Not sure yet'
    };
    if (answers.impact) chips.push(impactLabels[answers.impact]);
    return chips;
  }

  // ============ RESULTS ============
  if (done) {
    const recs = getRecommendations();
    const note = safetyNote();
    const chips = recapChips();
    return /*#__PURE__*/React.createElement("div", {
      "data-screen-label": "03 Quiz Results"
    }, /*#__PURE__*/React.createElement("section", {
      className: "ella-section"
    }, /*#__PURE__*/React.createElement("div", {
      className: "ella-container"
    }, /*#__PURE__*/React.createElement("div", {
      className: "ella-quiz"
    }, /*#__PURE__*/React.createElement("div", {
      className: "ella-eyebrow"
    }, isEs ? 'GRACIAS POR COMPARTIR' : 'THANK YOU FOR SHARING'), /*#__PURE__*/React.createElement("h2", {
      className: "ella-quiz-q",
      style: {
        marginTop: 14
      }
    }, isEs ? 'Aquí está un punto de partida, solo para ti.' : "Here's a starting place, just for you."), chips.length > 0 && /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: 8,
        marginTop: 18,
        marginBottom: 4
      }
    }, chips.map((c, i) => /*#__PURE__*/React.createElement("span", {
      key: i,
      style: {
        fontSize: 13,
        fontWeight: 700,
        letterSpacing: '0.02em',
        color: 'var(--ella-clay-700)',
        background: 'var(--ella-cream-100)',
        border: '1px solid var(--border-default)',
        borderRadius: 999,
        padding: '6px 14px'
      }
    }, c))), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 18,
        lineHeight: 1.65,
        color: 'var(--ella-clay-700)',
        maxWidth: '60ch',
        marginTop: 16
      }
    }, resultIntro()), note && /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 12,
        alignItems: 'flex-start',
        background: 'var(--ella-blush-50)',
        border: '1px solid var(--ella-blush-100)',
        borderRadius: 14,
        padding: '16px 18px',
        margin: '20px 0 4px',
        maxWidth: '62ch'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--ella-rose-deep)',
        flexShrink: 0,
        marginTop: 2
      }
    }, /*#__PURE__*/React.createElement(IconHeart, {
      width: "20",
      height: "20"
    })), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 15.5,
        lineHeight: 1.55,
        color: 'var(--ella-clay-700)',
        margin: 0
      }
    }, note)), /*#__PURE__*/React.createElement("div", {
      className: "ella-pillars",
      style: {
        marginTop: 32
      }
    }, recs.map((r, i) => /*#__PURE__*/React.createElement("a", {
      key: i,
      className: "ella-pillar-card",
      "data-tone": r.tone,
      href: "#",
      onClick: e => {
        e.preventDefault();
        setRoute(r.route);
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "ella-pillar-icon"
    }, r.icon), /*#__PURE__*/React.createElement("h3", null, r.title), /*#__PURE__*/React.createElement("p", null, r.desc), /*#__PURE__*/React.createElement("span", {
      className: "ella-pillar-cta"
    }, r.cta, " ", /*#__PURE__*/React.createElement(IconArrow, {
      width: "16",
      height: "16"
    }))))), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 32,
        display: 'flex',
        gap: 16,
        flexWrap: 'wrap',
        alignItems: 'center'
      }
    }, /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "ella-btn ella-btn-text",
      onClick: () => {
        setStep(0);
        setAnswers({});
      }
    }, isEs ? 'Repetir el chequeo' : 'Retake the check-in'), /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "ella-btn ella-btn-text",
      onClick: () => setRoute('articles')
    }, isEs ? 'Ver todos los artículos' : 'Browse all articles', " ", /*#__PURE__*/React.createElement(IconArrow, {
      width: "16",
      height: "16"
    }))), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 13.5,
        lineHeight: 1.5,
        color: 'var(--ella-taupe-500)',
        marginTop: 28,
        maxWidth: '60ch'
      }
    }, isEs ? 'Esto es información general, no consejo médico ni un diagnóstico. Para tu situación específica, habla con tu médico.' : 'This is general information, not medical advice or a diagnosis. For your specific situation, talk with your own doctor.')))));
  }

  // ============ QUESTION ============
  const pct = Math.round(step / questions.length * 100);
  return /*#__PURE__*/React.createElement("div", {
    "data-screen-label": "03 Quiz"
  }, /*#__PURE__*/React.createElement("section", {
    className: "ella-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-quiz"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-quiz-progress"
  }, /*#__PURE__*/React.createElement("span", null, t('quiz_progress', {
    n: step + 1,
    total: questions.length
  })), /*#__PURE__*/React.createElement("span", null, pct, "%")), /*#__PURE__*/React.createElement("div", {
    className: "ella-quiz-bar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-quiz-bar-fill",
    style: {
      width: `${pct}%`
    }
  })), /*#__PURE__*/React.createElement("h2", {
    className: "ella-quiz-q"
  }, q.text), q.help && /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 16,
      lineHeight: 1.5,
      color: 'var(--ella-taupe-500)',
      margin: '-4px 0 22px'
    }
  }, q.help), /*#__PURE__*/React.createElement("div", {
    className: "ella-quiz-opts"
  }, q.opts.map(opt => {
    const isSel = q.kind === 'multi' ? (selected || []).includes(opt.key) : selected === opt.key;
    return /*#__PURE__*/React.createElement("button", {
      key: opt.key,
      type: "button",
      className: 'ella-quiz-opt' + (isSel ? ' is-selected' : ''),
      onClick: () => select(opt)
    }, /*#__PURE__*/React.createElement("span", {
      className: "ella-quiz-check"
    }), /*#__PURE__*/React.createElement("span", null, opt.label));
  })), /*#__PURE__*/React.createElement("div", {
    className: "ella-quiz-nav"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "ella-btn ella-btn-text",
    onClick: () => step === 0 ? setRoute('home') : setStep(step - 1)
  }, '\u2190 ', t('quiz_back')), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "ella-btn ella-btn-primary",
    disabled: !canAdvance,
    style: !canAdvance ? {
      opacity: 0.45,
      cursor: 'not-allowed'
    } : null,
    onClick: () => canAdvance && setStep(step + 1)
  }, step === questions.length - 1 ? t('quiz_finish') : t('quiz_next'), /*#__PURE__*/React.createElement(IconArrow, {
    width: "18",
    height: "18"
  })))))));
}
window.AwarenessQuiz = AwarenessQuiz;
Object.assign(__ds_scope, { AwarenessQuiz });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/screens/AwarenessQuiz.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/screens/Homepage.jsx
try { (() => {
// Homepage, final Pause-Life-inspired editorial layout.
// Order: hero → "why this matters" intro → pillars → quiz banner →
//        consultation → testimonials → info link grid.

function Homepage({
  lang,
  setRoute,
  primaryColor,
  heroVariant
}) {
  const t = useT(lang);
  const isEs = lang === 'es';
  return /*#__PURE__*/React.createElement("div", {
    "data-screen-label": "01 Homepage"
  }, /*#__PURE__*/React.createElement("section", {
    className: "ella-hero",
    "data-screen-label": "hero"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-hero-grid"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", null, isEs ? /*#__PURE__*/React.createElement(React.Fragment, null, "Por mujeres, ", /*#__PURE__*/React.createElement("em", null, "para mujeres.")) : /*#__PURE__*/React.createElement(React.Fragment, null, "By women, ", /*#__PURE__*/React.createElement("em", null, "for women."))), /*#__PURE__*/React.createElement("p", {
    style: {
      fontWeight: 500
    }
  }, isEs ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("b", null, "Todo lo que necesitas saber sobre la menopausia."), " Informaci\xF3n sobre nutrici\xF3n, suplementos, ejercicio, salud mental, y las preguntas que debes hacerle a tu m\xE9dico. Hecho para ser accesible y asequible.") : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("b", null, "Everything you need to know about menopause."), " Information about nutrition, supplements, exercise, mental health, and the questions to ask your doctor. Built to be accessible and affordable.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      flexWrap: 'wrap',
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "ella-btn ella-btn-primary ella-btn-lg",
    onClick: () => setRoute('articles')
  }, isEs ? 'Empieza a leer' : 'Start reading', /*#__PURE__*/React.createElement(IconArrow, {
    width: "20",
    height: "20"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "ella-hero-cred",
    "aria-label": "About the author"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-hero-cred-avatar"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", null, "Jessica Zavala, PA-C"), " \xB7 ", isEs ? 'Certificado en bienestar de la mujer' : "Women's wellness certificate"))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement(IllustrationSprig, {
    width: 120,
    className: "ella-hero-ornament tl"
  }), /*#__PURE__*/React.createElement(Photo, {
    aspect: "4/5",
    tint: "rose",
    src: "assets/photos/portrait-terrace.jpg",
    objectPosition: "68% center",
    alt: isEs ? 'Mujer sonriendo en una terraza a la luz natural' : 'Woman smiling on a terrace in natural light',
    radius: "24px"
  }, /*#__PURE__*/React.createElement(IllustrationBranch, {
    width: 160,
    className: "ella-hero-ornament br"
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 24
    }
  }))), /*#__PURE__*/React.createElement("section", {
    className: "ella-section ella-bg-cream",
    "data-screen-label": "why"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-container"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 780,
      margin: '0 auto',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-eyebrow",
    style: {
      fontSize: 24,
      fontWeight: 800
    }
  }, isEs ? 'POR QUÉ IMPORTA' : 'WHY THIS MATTERS'), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 19,
      lineHeight: 1.65,
      color: 'var(--ella-clay-700)',
      marginTop: 18,
      fontWeight: 500
    }
  }, isEs ? 'Cerca de la mitad de todas las mujeres pasan por la menopausia, y aun así, la mayoría de los planes de estudio médicos le dedican menos de una hora. El resultado: millones de mujeres atraviesan una década de cambios hormonales casi sin orientación real.' : 'About half of all women will go through menopause, and yet most medical curricula spend less than an hour on it. The result: millions of women navigate a decade of hormonal change with almost no real guidance.'), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 19,
      lineHeight: 1.65,
      color: 'var(--ella-clay-700)',
      marginTop: 16,
      fontWeight: 500
    }
  }, isEs ? 'Saber qué está pasando, qué vale la pena hacer al respecto, y qué preguntas hacerle a tu médico, esa es la diferencia entre sentirte perdida y sentirte al mando. Ella es para lo segundo.' : 'Know what’s happening, what to do about it, and what questions to ask your doctor.')))), /*#__PURE__*/React.createElement("section", {
    className: "ella-section-tight",
    "data-screen-label": "quote"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-container",
    style: {
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-display)',
      fontStyle: 'italic',
      fontSize: 'clamp(22px, 2.6vw, 30px)',
      lineHeight: 1.4,
      color: 'var(--ella-clay-900)',
      maxWidth: 680,
      margin: '0 auto'
    }
  }, isEs ? '\u00abNo est\u00e1s sola en esto, y mereces informaci\u00f3n en tu propio idioma.\u00bb' : '\u201cYou\u2019re not alone in this, and you deserve real information, in your own language.\u201d'), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 14,
      fontSize: 14,
      letterSpacing: '0.04em',
      color: 'var(--ella-taupe-500)',
      textTransform: 'uppercase'
    }
  }, "\u2014 Jessica Zavala"))), /*#__PURE__*/React.createElement("section", {
    className: "ella-section",
    "data-screen-label": "pillars"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-section-head",
    style: {
      maxWidth: 720,
      margin: '0 auto 32px',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("h2", {
    className: "ella-h2-italic"
  }, isEs ? /*#__PURE__*/React.createElement(React.Fragment, null, "Todo en un solo ", /*#__PURE__*/React.createElement("em", null, "lugar.")) : /*#__PURE__*/React.createElement(React.Fragment, null, "Everything in ", /*#__PURE__*/React.createElement("em", null, "one place."))), /*#__PURE__*/React.createElement("div", {
    className: "ella-eyebrow",
    style: {
      fontSize: 18,
      fontStyle: 'normal',
      fontWeight: 800,
      textAlign: 'center'
    }
  }, t('pillars_eyebrow'))), /*#__PURE__*/React.createElement("div", {
    className: "ella-pillars"
  }, /*#__PURE__*/React.createElement("a", {
    className: "ella-pillar-card",
    "data-tone": "sage",
    href: "#",
    onClick: e => {
      e.preventDefault();
      setRoute('nutrition');
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-pillar-icon"
  }, /*#__PURE__*/React.createElement(IconLeaf, {
    width: "28",
    height: "28"
  })), /*#__PURE__*/React.createElement("h3", null, t('pillar_nutrition')), /*#__PURE__*/React.createElement("p", null, isEs ? 'Alimentos para incluir, necesidades de proteína durante la menopausia, sustituciones más sanas.' : 'Foods to include, protein needs during menopause, healthier swaps.'), /*#__PURE__*/React.createElement("span", {
    className: "ella-pillar-cta"
  }, isEs ? 'Explorar' : 'Explore', " ", /*#__PURE__*/React.createElement(IconArrow, {
    width: "16",
    height: "16"
  }))), /*#__PURE__*/React.createElement("a", {
    className: "ella-pillar-card",
    href: "#",
    onClick: e => {
      e.preventDefault();
      setRoute('supplements');
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-pillar-icon"
  }, /*#__PURE__*/React.createElement(IconDroplet, {
    width: "28",
    height: "28"
  })), /*#__PURE__*/React.createElement("h3", null, t('pillar_supplements')), /*#__PURE__*/React.createElement("p", null, t('pillar_supplements_desc')), /*#__PURE__*/React.createElement("span", {
    className: "ella-pillar-cta"
  }, isEs ? 'Ver lista' : 'See the list', " ", /*#__PURE__*/React.createElement(IconArrow, {
    width: "16",
    height: "16"
  }))), /*#__PURE__*/React.createElement("a", {
    className: "ella-pillar-card",
    "data-tone": "sage",
    href: "#",
    onClick: e => {
      e.preventDefault();
      setRoute('articles');
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-pillar-icon"
  }, /*#__PURE__*/React.createElement(IconDumbbell, {
    width: "28",
    height: "28"
  })), /*#__PURE__*/React.createElement("h3", null, t('pillar_exercise')), /*#__PURE__*/React.createElement("p", null, isEs ? 'Entrenamiento de fuerza, caminar, yoga. Las pesas ligeras cuentan.' : 'Strength training, walking, yoga. Light weights count.'), /*#__PURE__*/React.createElement("span", {
    className: "ella-pillar-cta"
  }, isEs ? 'Empezar' : 'Get started', " ", /*#__PURE__*/React.createElement(IconArrow, {
    width: "16",
    height: "16"
  }))), /*#__PURE__*/React.createElement("a", {
    className: "ella-pillar-card",
    "data-tone": "plum",
    href: "#",
    onClick: e => {
      e.preventDefault();
      setRoute('articles');
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-pillar-icon"
  }, /*#__PURE__*/React.createElement(IconBrain, {
    width: "28",
    height: "28"
  })), /*#__PURE__*/React.createElement("h3", null, t('pillar_mental')), /*#__PURE__*/React.createElement("p", null, isEs ? 'Grupos de apoyo y recursos.' : 'Support groups and resource links.'), /*#__PURE__*/React.createElement("span", {
    className: "ella-pillar-cta"
  }, isEs ? 'Encuentra apoyo' : 'Find support', " ", /*#__PURE__*/React.createElement(IconArrow, {
    width: "16",
    height: "16"
  }))), /*#__PURE__*/React.createElement("a", {
    className: "ella-pillar-card",
    href: "#",
    onClick: e => {
      e.preventDefault();
      setRoute('articles');
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-pillar-icon"
  }, /*#__PURE__*/React.createElement(IconSparkle, {
    width: "28",
    height: "28"
  })), /*#__PURE__*/React.createElement("h3", null, t('pillar_skin')), /*#__PURE__*/React.createElement("p", null, t('pillar_skin_desc')), /*#__PURE__*/React.createElement("span", {
    className: "ella-pillar-cta"
  }, isEs ? 'Aprender' : 'Learn', " ", /*#__PURE__*/React.createElement(IconArrow, {
    width: "16",
    height: "16"
  })))))), /*#__PURE__*/React.createElement("section", {
    className: "ella-section-tight",
    "data-screen-label": "checkin"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-checkin"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-checkin-num",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("span", null, "1"), /*#__PURE__*/React.createElement("span", null, "2")), /*#__PURE__*/React.createElement("div", {
    className: "ella-checkin-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-eyebrow"
  }, isEs ? 'CHEQUEO PERSONAL' : 'PERSONAL CHECK-IN'), /*#__PURE__*/React.createElement("h2", {
    className: "ella-h2-italic",
    style: {
      marginTop: 10
    }
  }, isEs ? /*#__PURE__*/React.createElement(React.Fragment, null, "\xBFNo sabes ", /*#__PURE__*/React.createElement("em", null, "por d\xF3nde empezar?")) : /*#__PURE__*/React.createElement(React.Fragment, null, "Not sure ", /*#__PURE__*/React.createElement("em", null, "where to start?"))), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 18,
      lineHeight: 1.6,
      color: 'var(--ella-clay-700)',
      marginTop: 14,
      maxWidth: '52ch'
    }
  }, isEs ? 'Responde unas preguntas rápidas y te mostraremos qué leer primero, según lo que estás viviendo.' : 'Answer a few quick questions and we\u2019ll point you to the right reading, based on what you\u2019re actually experiencing.'), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "ella-btn ella-btn-primary ella-btn-lg",
    style: {
      marginTop: 22
    },
    onClick: () => setRoute('quiz')
  }, isEs ? 'Hacer el chequeo' : 'Take the check-in', /*#__PURE__*/React.createElement(IconArrow, {
    width: "20",
    height: "20"
  })))))), /*#__PURE__*/React.createElement("section", {
    className: "ella-section",
    "data-screen-label": "consultation",
    id: "book"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-consult"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-consult-art"
  }, /*#__PURE__*/React.createElement(Photo, {
    aspect: "4/5",
    tint: "sage",
    alt: isEs ? 'Retrato cálido de Jessica' : 'Warm portrait of Jessica',
    radius: "22px"
  }), /*#__PURE__*/React.createElement("div", {
    className: "ella-consult-badge"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ella-consult-badge-min"
  }, "30"), /*#__PURE__*/React.createElement("span", {
    className: "ella-consult-badge-lbl"
  }, isEs ? 'min' : 'min'))), /*#__PURE__*/React.createElement("div", {
    className: "ella-consult-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-eyebrow",
    style: {
      fontSize: 18
    }
  }, isEs ? 'TRABAJA CONMIGO' : 'WORK WITH ME'), /*#__PURE__*/React.createElement("h2", {
    className: "ella-h2-italic",
    style: {
      marginTop: 10
    }
  }, isEs ? /*#__PURE__*/React.createElement(React.Fragment, null, "Reserva una ", /*#__PURE__*/React.createElement("em", null, "consulta de bienestar"), " de 30 minutos.") : /*#__PURE__*/React.createElement(React.Fragment, null, "Book a 30-minute ", /*#__PURE__*/React.createElement("em", null, "wellness consultation."))), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 18,
      lineHeight: 1.6,
      color: 'var(--ella-clay-700)',
      marginTop: 14,
      maxWidth: '54ch'
    }
  }, isEs ? 'Una llamada con Jessica para hablar de tus síntomas, tus preguntas, y qué dirección tomar.' : 'A call with Jessica to talk through your symptoms, your questions, and where to go next.'), /*#__PURE__*/React.createElement("ul", {
    className: "ella-consult-list"
  }, /*#__PURE__*/React.createElement("li", null, isEs ? 'Por dónde empezar' : 'Where to start'), /*#__PURE__*/React.createElement("li", null, isEs ? 'Qué preguntarle a tu médico' : 'What to ask your own doctor'), /*#__PURE__*/React.createElement("li", null, isEs ? 'Orientación personalizada para tu etapa' : 'Personalized guidance for your stage')), /*#__PURE__*/React.createElement("div", {
    className: "ella-consult-actions"
  }, /*#__PURE__*/React.createElement("a", {
    className: "ella-btn ella-btn-primary ella-btn-lg",
    href: ELLA_LINKS.calendar,
    target: "_blank",
    rel: "noopener noreferrer",
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement(IconCalendar, {
    width: "20",
    height: "20"
  }), isEs ? 'Agendar en Google Calendar' : 'Schedule on Google Calendar'), /*#__PURE__*/React.createElement("a", {
    className: "ella-btn ella-btn-whatsapp ella-btn-lg",
    href: ELLA_LINKS.whatsapp,
    target: "_blank",
    rel: "noopener noreferrer",
    style: {
      color: '#FFFFFF',
      backgroundColor: '#2B1D14'
    }
  }, /*#__PURE__*/React.createElement(IconWhatsApp, {
    width: "20",
    height: "20"
  }), isEs ? 'Escríbeme por WhatsApp' : 'Message me on WhatsApp')))))), /*#__PURE__*/React.createElement(Testimonials, {
    lang: lang
  }), /*#__PURE__*/React.createElement("section", {
    className: "ella-section ella-bg-cream",
    "data-screen-label": "faq"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-section-head",
    style: {
      maxWidth: 720,
      margin: '0 auto 32px',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-eyebrow"
  }, isEs ? 'PREGUNTAS FRECUENTES' : 'FREQUENTLY ASKED'), /*#__PURE__*/React.createElement("h2", {
    className: "ella-h2-italic"
  }, isEs ? /*#__PURE__*/React.createElement(React.Fragment, null, "Lo que m\xE1s ", /*#__PURE__*/React.createElement("em", null, "me preguntan.")) : /*#__PURE__*/React.createElement(React.Fragment, null, "What people ", /*#__PURE__*/React.createElement("em", null, "ask me most.")))), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 720,
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, [{
    q: isEs ? '\u00bfQui\u00e9n es Jessica?' : 'Who is Jessica?',
    a: isEs ? 'Soy una mujer de 53 a\u00f1os, madre de tres, que pas\u00f3 por su propia perimenopausia m\u00e1s tarde de lo esperado y con s\u00edntomas que no se parec\u00edan a lo que me hab\u00edan contado. Cre\u00e9 Ella para compartir lo que aprend\u00ed con otras mujeres, especialmente hispanohablantes.' : "I'm a 53-year-old mother of three who went through my own perimenopause later than expected, with symptoms that didn't match what I'd been told to expect. I created Ella to share what I learned with other women, especially Spanish speakers."
  }, {
    q: isEs ? '\u00bfElla reemplaza a mi m\u00e9dico?' : 'Does Ella replace my doctor?',
    a: isEs ? 'No. Ella comparte informaci\u00f3n general, no consejo m\u00e9dico personalizado ni diagn\u00f3stico. Siempre habla con tu propio m\u00e9dico sobre tu situaci\u00f3n espec\u00edfica.' : "No. Ella shares general information, not personalized medical advice or a diagnosis. Always talk to your own doctor about your specific situation."
  }, {
    q: isEs ? '\u00bfPor qu\u00e9 en espa\u00f1ol?' : 'Why in Spanish?',
    a: isEs ? 'Las personas hispanohablantes suelen tener menos acceso a informaci\u00f3n confiable sobre la menopausia. Nac\u00ed en EE. UU. en una familia inmigrante y hablo ambos idiomas, as\u00ed que quise que Ella fuera accesible en los dos.' : 'Spanish speakers often have less access to reliable menopause information. I was born in the U.S. to an immigrant family and speak both languages, so I wanted Ella to be accessible in both.'
  }, {
    q: isEs ? '\u00bfCu\u00e1ndo empieza la menopausia?' : 'When does menopause start?',
    a: isEs ? 'No hay una edad fija. Puede comenzar tan pronto como a los 40 o hasta mediados de los 50. Cada cuerpo es distinto, y eso es exactamente por lo que Ella existe.' : "There's no fixed age. It can start as early as 40 or as late as your mid-50s. Every body is different, and that's exactly why Ella exists."
  }].map((item, i) => /*#__PURE__*/React.createElement("details", {
    key: i,
    style: {
      background: 'var(--ella-cream-50)',
      border: '1px solid var(--border-default)',
      borderRadius: 14,
      padding: '18px 22px'
    }
  }, /*#__PURE__*/React.createElement("summary", {
    style: {
      cursor: 'pointer',
      fontFamily: 'var(--font-display)',
      fontSize: 19,
      color: 'var(--ella-clay-900)',
      listStyle: 'none'
    }
  }, item.q), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 10,
      fontSize: 16,
      lineHeight: 1.6,
      color: 'var(--ella-clay-700)'
    }
  }, item.a)))))));
}
window.Homepage = Homepage;
Object.assign(__ds_scope, { Homepage });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/screens/Homepage.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/screens/HormonalTherapy.jsx
try { (() => {
// Hormonal Therapy, explains options + external links.
// Tone: options-only, never endorsing.

function HormonalTherapy({
  lang,
  setRoute
}) {
  const isEs = lang === 'es';
  const options = [{
    name: isEs ? 'Estr\u00f3geno sist\u00e9mico' : 'Systemic estrogen',
    kind: isEs ? 'TRH \u00b7 P\u00edldora, parche, gel o spray' : 'HRT \u00b7 Pill, patch, gel, or spray',
    desc: isEs ? 'La forma m\u00e1s estudiada de aliviar los sofocos, sudores nocturnos y cambios de humor. Si todav\u00eda tienes \u00fatero, generalmente se combina con progestina.' : 'The most-studied option for hot flashes, night sweats, and mood shifts. If you still have a uterus, it\u2019s usually paired with a progestin.'
  }, {
    name: isEs ? 'Estr\u00f3geno vaginal de dosis baja' : 'Low-dose vaginal estrogen',
    kind: isEs ? 'TRH local \u00b7 Crema, anillo o tableta' : 'Local HRT \u00b7 Cream, ring, or tablet',
    desc: isEs ? 'Tratamiento dirigido para sequedad, dolor con relaciones sexuales y s\u00edntomas urinarios. Muy poco entra al torrente sangu\u00edneo.' : 'Targeted treatment for vaginal dryness, painful sex, and urinary symptoms. Very little reaches the bloodstream.'
  }, {
    name: isEs ? 'Progestina sola' : 'Progestin only',
    kind: isEs ? 'No es estr\u00f3geno' : 'Non-estrogen',
    desc: isEs ? 'Una opci\u00f3n cuando el estr\u00f3geno no es seguro o no es deseado. Puede ayudar con el sue\u00f1o y algunos s\u00edntomas.' : 'An option when estrogen isn\u2019t safe or wanted. Can help with sleep and some symptoms.'
  }, {
    name: isEs ? 'Medicamentos no hormonales' : 'Non-hormonal medications',
    kind: isEs ? 'ISRS / IRSN, gabapentina, fezolinetant' : 'SSRIs / SNRIs, gabapentin, fezolinetant',
    desc: isEs ? 'Para mujeres que no pueden o prefieren no usar hormonas. Fezolinetant es un medicamento nuevo aprobado por la FDA espec\u00edficamente para sofocos.' : 'For women who can\u2019t, or prefer not to, use hormones. Fezolinetant is a newer FDA-approved option specifically for hot flashes.'
  }, {
    name: isEs ? 'TRH bioid\u00e9ntica' : 'Bioidentical HRT',
    kind: isEs ? 'Compuesta vs. aprobada por FDA' : 'Compounded vs. FDA-approved',
    desc: isEs ? 'Importante: las versiones aprobadas por la FDA son bioid\u00e9nticas. Las versiones compuestas (mezcladas en farmacias) no est\u00e1n reguladas y los estudios son limitados.' : 'Important: FDA-approved hormone therapies are already bioidentical. Compounded versions (custom-mixed at pharmacies) are unregulated and have limited safety data.'
  }, {
    name: isEs ? 'Sin tratamiento' : 'No treatment',
    kind: isEs ? 'Una opci\u00f3n leg\u00edtima' : 'A legitimate option',
    desc: isEs ? 'Algunas mujeres atraviesan la transici\u00f3n con s\u00edntomas leves y eligen no tratar. Tambi\u00e9n es una opci\u00f3n v\u00e1lida.' : 'Some women move through this transition with mild symptoms and choose not to treat. That\u2019s also a valid path.'
  }];
  const resources = [{
    label: 'The Pause Life, Dr. Mary Claire Haver',
    sub: isEs ? 'Educaci\u00f3n y comunidad sobre la menopausia de una OB-GYN reconocida' : 'Menopause education & community from a leading OB-GYN',
    href: window.ELLA_LINKS && window.ELLA_LINKS.pauseLife || 'https://thepauselife.com/'
  }, {
    label: 'The Menopause Society (formerly NAMS)',
    sub: isEs ? 'Encuentra un especialista certificado en menopausia (MSCP)' : 'Find a certified menopause specialist (MSCP)',
    href: 'https://menopause.org/'
  }, {
    label: 'ACOG, Menopause Resources',
    sub: isEs ? 'Gu\u00edas oficiales del Colegio Americano de Obstetras y Ginec\u00f3logos' : 'Official guidelines from the American College of OB-GYNs',
    href: 'https://www.acog.org/womens-health/faqs/the-menopause-years'
  }, {
    label: 'Office on Women\u2019s Health',
    sub: isEs ? 'Recurso oficial del gobierno de EE.UU. \u00b7 disponible en espa\u00f1ol' : 'Official US government resource \u00b7 available in Spanish',
    href: 'https://www.womenshealth.gov/menopause'
  }, {
    label: 'Mayo Clinic, Hormone Therapy',
    sub: isEs ? 'Resumen cl\u00ednico de beneficios, riesgos y elegibilidad' : 'Clinical overview of benefits, risks, and eligibility',
    href: 'https://www.mayoclinic.org/diseases-conditions/menopause/in-depth/hormone-therapy/art-20046372'
  }, {
    label: 'Let\u2019s Talk Menopause',
    sub: isEs ? 'Sin fines de lucro \u00b7 educaci\u00f3n y defensa' : 'Nonprofit \u00b7 education and advocacy',
    href: 'https://www.letstalkmenopause.org/'
  }];

  // Sites written natively in Spanish (not machine-translated).
  const spanishResources = [{
    label: 'MedlinePlus en espa\u00f1ol, Menopausia',
    sub: 'Biblioteca Nacional de Medicina de EE.UU. \u00b7 escrito en espa\u00f1ol',
    href: 'https://medlineplus.gov/spanish/menopause.html'
  }, {
    label: 'AEEM, Asociaci\u00f3n Espa\u00f1ola para el Estudio de la Menopausia',
    sub: 'Sociedad m\u00e9dica espa\u00f1ola \u00b7 informaci\u00f3n para pacientes',
    href: 'https://aeem.es/'
  }, {
    label: 'CuidatePlus, Menopausia',
    sub: 'Gu\u00eda de salud en espa\u00f1ol revisada por profesionales',
    href: 'https://cuidateplus.marca.com/enfermedades/ginecologicas/menopausia.html'
  }];
  return /*#__PURE__*/React.createElement("div", {
    "data-screen-label": "08 Hormonal Therapy"
  }, /*#__PURE__*/React.createElement("section", {
    className: "ella-section-tight"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-article"
  }, /*#__PURE__*/React.createElement("a", {
    className: "ella-article-back",
    href: "#",
    onClick: e => {
      e.preventDefault();
      setRoute('home');
    }
  }, /*#__PURE__*/React.createElement(IconChevron, {
    width: "16",
    height: "16",
    style: {
      transform: 'rotate(180deg)'
    }
  }), isEs ? 'Inicio' : 'Home'), /*#__PURE__*/React.createElement("div", {
    className: "ella-eyebrow",
    style: {
      color: 'var(--ella-plum-500)'
    }
  }, isEs ? 'TERAPIA HORMONAL' : 'HORMONAL THERAPY'), /*#__PURE__*/React.createElement("h1", null, isEs ? 'Tus opciones, en lenguaje claro.' : 'Your options, in plain English.'), /*#__PURE__*/React.createElement("p", {
    className: "ella-article-lede"
  }, isEs ? 'Ella no recomienda una terapia hormonal espec\u00edfica. Lo que hace es ayudarte a entender lo que existe, para que la conversaci\u00f3n con tu m\u00e9dico empiece de un lugar informado, no de cero.' : 'Ella doesn\u2019t recommend a specific therapy. What it does is help you understand what exists, so the conversation with your doctor starts from an informed place, not from scratch.'), /*#__PURE__*/React.createElement("div", {
    className: "ella-article-body"
  }, /*#__PURE__*/React.createElement("h2", null, isEs ? 'Las opciones principales' : 'The main options')), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 16,
      marginTop: 12
    }
  }, options.map(o => /*#__PURE__*/React.createElement("div", {
    key: o.name,
    style: {
      background: 'var(--ella-cream-50)',
      border: '1px solid var(--border-default)',
      borderRadius: 16,
      padding: '24px 28px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-eyebrow",
    style: {
      color: 'var(--ella-plum-500)',
      fontSize: 11
    }
  }, o.kind), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 26,
      lineHeight: 1.2,
      margin: '6px 0 10px',
      color: 'var(--ella-clay-900)'
    }
  }, o.name), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 16,
      lineHeight: 1.6,
      color: 'var(--ella-clay-700)',
      margin: 0
    }
  }, o.desc)))), /*#__PURE__*/React.createElement("div", {
    className: "ella-article-body",
    style: {
      marginTop: 40
    }
  }, /*#__PURE__*/React.createElement("h2", null, isEs ? 'D\u00f3nde aprender m\u00e1s' : 'Where to learn more'), /*#__PURE__*/React.createElement("p", null, isEs ? 'Estos son recursos confiables que recomiendo a mis pacientes. Todos son organizaciones m\u00e9dicas o sin fines de lucro, nada patrocinado.' : 'These are the resources I trust and send patients to. All are medical or nonprofit organizations, nothing sponsored.')), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 12,
      marginTop: 8
    }
  }, resources.map(r => /*#__PURE__*/React.createElement("a", {
    key: r.label,
    href: r.href,
    target: "_blank",
    rel: "noopener noreferrer",
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 16,
      background: 'var(--ella-white)',
      border: '1px solid var(--border-default)',
      borderRadius: 14,
      padding: '18px 22px',
      textDecoration: 'none',
      color: 'inherit',
      transition: 'box-shadow 200ms, border-color 200ms'
    },
    onMouseEnter: e => {
      e.currentTarget.style.boxShadow = 'var(--shadow-lifted)';
      e.currentTarget.style.borderColor = 'var(--ella-sand-300)';
    },
    onMouseLeave: e => {
      e.currentTarget.style.boxShadow = '';
      e.currentTarget.style.borderColor = 'var(--border-default)';
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 20,
      color: 'var(--ella-clay-900)'
    }
  }, r.label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: 'var(--ella-clay-700)',
      marginTop: 4
    }
  }, r.sub)), /*#__PURE__*/React.createElement(IconArrow, {
    width: "20",
    height: "20",
    style: {
      color: 'var(--ella-rose-deep)',
      flex: '0 0 20px',
      transform: 'rotate(-45deg)'
    }
  })))), /*#__PURE__*/React.createElement("div", {
    className: "ella-article-body",
    style: {
      marginTop: 40
    }
  }, /*#__PURE__*/React.createElement("h2", null, isEs ? 'En espa\u00f1ol' : 'In Spanish'), /*#__PURE__*/React.createElement("p", null, isEs ? 'Recursos escritos originalmente en espa\u00f1ol, no traducciones autom\u00e1ticas.' : 'Resources written natively in Spanish, not machine translations.')), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 12,
      marginTop: 8
    }
  }, spanishResources.map(r => /*#__PURE__*/React.createElement("a", {
    key: r.label,
    href: r.href,
    target: "_blank",
    rel: "noopener noreferrer",
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 16,
      background: 'var(--ella-white)',
      border: '1px solid var(--border-default)',
      borderRadius: 14,
      padding: '18px 22px',
      textDecoration: 'none',
      color: 'inherit',
      transition: 'box-shadow 200ms, border-color 200ms'
    },
    onMouseEnter: e => {
      e.currentTarget.style.boxShadow = 'var(--shadow-lifted)';
      e.currentTarget.style.borderColor = 'var(--ella-sand-300)';
    },
    onMouseLeave: e => {
      e.currentTarget.style.boxShadow = '';
      e.currentTarget.style.borderColor = 'var(--border-default)';
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 20,
      color: 'var(--ella-clay-900)'
    }
  }, r.label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: 'var(--ella-clay-700)',
      marginTop: 4
    }
  }, r.sub)), /*#__PURE__*/React.createElement(IconArrow, {
    width: "20",
    height: "20",
    style: {
      color: 'var(--ella-rose-deep)',
      flex: '0 0 20px',
      transform: 'rotate(-45deg)'
    }
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 40,
      padding: '20px 24px',
      background: 'var(--ella-cream-100)',
      borderRadius: 16,
      fontSize: 14,
      color: 'var(--ella-clay-700)',
      fontStyle: 'italic',
      lineHeight: 1.5
    }
  }, isEs ? 'Esta p\u00e1gina es informaci\u00f3n, no consejo m\u00e9dico. Habla con tu m\u00e9dico antes de empezar, cambiar o detener cualquier tratamiento hormonal.' : 'This page is information, not medical advice. Talk to your doctor before starting, changing, or stopping any hormone therapy.'), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 32,
      display: 'flex',
      gap: 12,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "ella-btn ella-btn-primary",
    onClick: () => setRoute('doctor')
  }, /*#__PURE__*/React.createElement(IconDownload, {
    width: "18",
    height: "18"
  }), isEs ? 'Lista de preguntas para tu m\u00e9dico' : 'Get the doctor checklist'))))));
}
window.HormonalTherapy = HormonalTherapy;
Object.assign(__ds_scope, { HormonalTherapy });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/screens/HormonalTherapy.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/screens/NutritionHub.jsx
try { (() => {
// NutritionHub, nutrition-focused landing. Pre-filters articles to Nutrition
// + Exercise, includes a high-protein foods quick reference card, links out
// to supplements.

function NutritionHub({
  lang,
  setRoute,
  setArticleId
}) {
  const isEs = lang === 'es';
  const all = getArticles(lang);
  const nutrition = all.filter(a => a.category === 'Nutrition' || a.category === 'Nutrición' || a.category === 'Exercise' || a.category === 'Ejercicio');
  function open(id) {
    setArticleId(id);
    setRoute('article');
    window.scrollTo({
      top: 0
    });
  }
  const foods = isEs ? [{
    name: 'Yogur griego (puro)',
    amt: '17 g / taza',
    tag: 'PROTEÍNA'
  }, {
    name: 'Huevos',
    amt: '6 g / unidad',
    tag: 'PROTEÍNA'
  }, {
    name: 'Pechuga de pollo',
    amt: '31 g / 100 g',
    tag: 'PROTEÍNA'
  }, {
    name: 'Lentejas cocidas',
    amt: '18 g / taza',
    tag: 'PROTEÍNA + FIBRA'
  }, {
    name: 'Requesón',
    amt: '25 g / taza',
    tag: 'PROTEÍNA'
  }, {
    name: 'Tofu firme',
    amt: '20 g / 100 g',
    tag: 'PROTEÍNA'
  }, {
    name: 'Salmón',
    amt: '22 g / 100 g',
    tag: 'PROTEÍNA + OMEGA-3'
  }, {
    name: 'Edamame',
    amt: '17 g / taza',
    tag: 'PROTEÍNA + FIBRA'
  }, {
    name: 'Quinoa cocida',
    amt: '8 g / taza',
    tag: 'PROTEÍNA + FIBRA'
  }, {
    name: 'Almendras',
    amt: '6 g / 28 g',
    tag: 'PROTEÍNA + GRASA'
  }] : [{
    name: 'Greek yogurt (plain)',
    amt: '17 g / cup',
    tag: 'PROTEIN'
  }, {
    name: 'Eggs',
    amt: '6 g / each',
    tag: 'PROTEIN'
  }, {
    name: 'Chicken breast',
    amt: '31 g / 100 g',
    tag: 'PROTEIN'
  }, {
    name: 'Cooked lentils',
    amt: '18 g / cup',
    tag: 'PROTEIN + FIBER'
  }, {
    name: 'Cottage cheese',
    amt: '25 g / cup',
    tag: 'PROTEIN'
  }, {
    name: 'Firm tofu',
    amt: '20 g / 100 g',
    tag: 'PROTEIN'
  }, {
    name: 'Salmon',
    amt: '22 g / 100 g',
    tag: 'PROTEIN + OMEGA-3'
  }, {
    name: 'Edamame',
    amt: '17 g / cup',
    tag: 'PROTEIN + FIBER'
  }, {
    name: 'Cooked quinoa',
    amt: '8 g / cup',
    tag: 'PROTEIN + FIBER'
  }, {
    name: 'Almonds',
    amt: '6 g / 28 g',
    tag: 'PROTEIN + FAT'
  }];
  return /*#__PURE__*/React.createElement("div", {
    "data-screen-label": "04 Nutrition Hub"
  }, /*#__PURE__*/React.createElement("section", {
    className: "ella-section-tight"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-section-head",
    style: {
      maxWidth: 820,
      margin: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-eyebrow",
    style: {
      color: 'var(--ella-sage-700)'
    }
  }, isEs ? 'NUTRICIÓN' : 'NUTRITION'), /*#__PURE__*/React.createElement("h1", {
    className: "ella-h2-italic",
    style: {
      fontSize: 'clamp(40px, 5vw, 64px)'
    }
  }, isEs ? 'Por qué la proteína es importante' : 'Why protein is important'), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 19,
      lineHeight: 1.6,
      color: 'var(--ella-clay-700)',
      marginTop: 18,
      maxWidth: '60ch'
    }
  }, isEs ? 'palabras palabras palabras' : 'words words words')))), /*#__PURE__*/React.createElement("section", {
    className: "ella-section-tight"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-container"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'space-between',
      marginBottom: 24
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 32,
      color: 'var(--ella-clay-900)',
      margin: 0
    }
  }, isEs ? 'Proteína y los alimentos a evitar' : 'Protein and The Foods To Avoid')))), /*#__PURE__*/React.createElement("section", {
    className: "ella-section-tight ella-bg-cream"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-container"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gap: 32,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 720
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-eyebrow",
    style: {
      color: 'var(--ella-sage-700)'
    }
  }, isEs ? 'REFERENCIA RÁPIDA' : 'QUICK REFERENCE'), /*#__PURE__*/React.createElement("h2", {
    className: "ella-h2-italic",
    style: {
      marginTop: 12
    }
  }, isEs ? /*#__PURE__*/React.createElement(React.Fragment, null, "Diez alimentos para ", /*#__PURE__*/React.createElement("em", null, "llenar tu plato.")) : /*#__PURE__*/React.createElement(React.Fragment, null, "Ten foods to ", /*#__PURE__*/React.createElement("em", null, "fill your plate."))), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 18,
      lineHeight: 1.6,
      color: 'var(--ella-clay-700)',
      marginTop: 16,
      maxWidth: '56ch'
    }
  }, isEs ? 'Cantidades de proteína por porción típica. Apunta a 25–30 g por comida y deja que las elecciones se vuelvan automáticas.' : 'Protein per typical serving. Aim for 25–30 g per meal and let the choices become automatic.')), /*#__PURE__*/React.createElement("div", {
    className: "ella-food-grid"
  }, foods.map(f => /*#__PURE__*/React.createElement("div", {
    key: f.name,
    className: "ella-food-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-food-tag"
  }, f.tag), /*#__PURE__*/React.createElement("div", {
    className: "ella-food-name"
  }, f.name), /*#__PURE__*/React.createElement("div", {
    className: "ella-food-amt"
  }, f.amt))))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 36,
      display: 'flex',
      gap: 12,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "ella-btn ella-btn-primary",
    onClick: () => setRoute('supplements')
  }, isEs ? 'Ver suplementos recomendados' : 'See recommended supplements', /*#__PURE__*/React.createElement(IconArrow, {
    width: "18",
    height: "18"
  })), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "ella-btn ella-btn-text",
    onClick: () => setRoute('doctor')
  }, isEs ? 'Lista para tu médico →' : 'Grab the doctor checklist →')))));
}
window.NutritionHub = NutritionHub;
Object.assign(__ds_scope, { NutritionHub });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/screens/NutritionHub.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/screens/ReproductiveHealth.jsx
try { (() => {
// Reproductive Cancers & HPV, awareness, screening, and where to learn more.
// Sensitive content. Frame as: clear info, actionable next steps, no scaring.

function ReproductiveHealth({
  lang,
  setRoute
}) {
  const isEs = lang === 'es';
  const screenings = [{
    name: isEs ? 'Citolog\u00eda / Papanicolaou' : 'Pap smear',
    every: isEs ? 'Cada 3 a\u00f1os \u00b7 21\u201365' : 'Every 3 years \u00b7 ages 21\u201365',
    desc: isEs ? 'Detecta cambios celulares en el cuello uterino. La perimenopausia no te exime, sigue siendo importante.' : 'Catches cervical cell changes early. Perimenopause doesn\u2019t exempt you, keep going.'
  }, {
    name: isEs ? 'Prueba de VPH' : 'HPV test',
    every: isEs ? 'Cada 5 a\u00f1os \u00b7 30\u201365' : 'Every 5 years \u00b7 ages 30\u201365',
    desc: isEs ? 'Detecta los tipos de VPH que causan c\u00e1ncer. Se puede hacer junto con el Papanicolaou (co-prueba).' : 'Detects the cancer-causing strains of HPV. Often done with the Pap smear (co-testing).'
  }, {
    name: isEs ? 'Mamograf\u00eda' : 'Mammogram',
    every: isEs ? 'Cada 1\u20132 a\u00f1os \u00b7 40+' : 'Every 1\u20132 years \u00b7 ages 40+',
    desc: isEs ? 'Detecci\u00f3n temprana del c\u00e1ncer de mama. Habla con tu m\u00e9dico sobre tu riesgo personal.' : 'Early detection for breast cancer. Talk to your doctor about your personal risk.'
  }, {
    name: isEs ? 'Examen p\u00e9lvico' : 'Pelvic exam',
    every: isEs ? 'Anual o seg\u00fan recomendaci\u00f3n' : 'Yearly or as recommended',
    desc: isEs ? 'Detecta cambios en ovarios y \u00fatero. Reporta cualquier sangrado posmenop\u00e1usico de inmediato.' : 'Catches ovarian and uterine changes. Report any post-menopausal bleeding right away.'
  }];
  const cancers = [{
    name: isEs ? 'C\u00e1ncer cervical' : 'Cervical cancer',
    cause: isEs ? 'Casi siempre causado por VPH' : 'Almost always caused by HPV',
    detail: isEs ? 'Altamente prevenible con detecci\u00f3n regular. Si te has saltado pruebas, es momento de retomarlas.' : 'Highly preventable with regular screening. If you\u2019ve missed Paps, now is the time to get back on schedule.'
  }, {
    name: isEs ? 'C\u00e1ncer de ovario' : 'Ovarian cancer',
    cause: isEs ? 'A menudo silencioso' : 'Often silent in early stages',
    detail: isEs ? 'Vigila s\u00edntomas persistentes: hinchaz\u00f3n, dolor p\u00e9lvico, sensaci\u00f3n de llenura r\u00e1pida. Si duran m\u00e1s de 2\u20133 semanas, ve al m\u00e9dico.' : 'Watch for persistent symptoms: bloating, pelvic pain, feeling full quickly. Lasting more than 2\u20133 weeks? See your doctor.'
  }, {
    name: isEs ? 'C\u00e1ncer uterino / endometrial' : 'Uterine / endometrial cancer',
    cause: isEs ? 'M\u00e1s com\u00fan despu\u00e9s de los 50' : 'Most common after age 50',
    detail: isEs ? 'Cualquier sangrado despu\u00e9s de la menopausia debe evaluarse. No esperes, esto es importante.' : 'Any bleeding after menopause needs to be checked. Don\u2019t wait, this one matters.'
  }, {
    name: isEs ? 'C\u00e1ncer de mama' : 'Breast cancer',
    cause: isEs ? 'El riesgo aumenta con la edad' : 'Risk rises with age',
    detail: isEs ? 'Conoce tus senos. Reporta cualquier bulto, cambio en la piel o secreci\u00f3n del pez\u00f3n.' : 'Know your breasts. Report any lump, skin change, or nipple discharge.'
  }, {
    name: isEs ? 'C\u00e1ncer vaginal y vulvar' : 'Vaginal & vulvar cancer',
    cause: isEs ? 'Frecuentemente relacionado con VPH' : 'Frequently HPV-linked',
    detail: isEs ? 'Raro pero real. Picaz\u00f3n persistente, bultos o cambios en la piel deben revisarse.' : 'Rare but real. Persistent itching, lumps, or skin changes should be looked at.'
  }];
  const links = [{
    label: isEs ? 'CDC, VPH y c\u00e1ncer' : 'CDC, HPV and cancer',
    sub: isEs ? 'Hechos en lenguaje claro \u00b7 espa\u00f1ol disponible' : 'Plain-language facts \u00b7 available in Spanish',
    href: 'https://www.cdc.gov/hpv/'
  }, {
    label: 'American Cancer Society',
    sub: isEs ? 'Gu\u00edas de detecci\u00f3n y vista general por tipo de c\u00e1ncer' : 'Screening guidelines and overviews by cancer type',
    href: 'https://www.cancer.org/'
  }, {
    label: isEs ? 'Instituto Nacional del C\u00e1ncer' : 'National Cancer Institute',
    sub: isEs ? 'Investigaci\u00f3n y recursos del gobierno de EE.UU.' : 'US government research and resources',
    href: 'https://www.cancer.gov/'
  }, {
    label: isEs ? 'Encuentra detecci\u00f3n gratuita o de bajo costo' : 'Find free or low-cost screening',
    sub: isEs ? 'Programa NBCCEDP de los CDC' : 'CDC\u2019s NBCCEDP program',
    href: 'https://www.cdc.gov/cancer/nbccedp/'
  }];
  return /*#__PURE__*/React.createElement("div", {
    "data-screen-label": "09 Cancer & HPV"
  }, /*#__PURE__*/React.createElement("section", {
    className: "ella-section-tight"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-article"
  }, /*#__PURE__*/React.createElement("a", {
    className: "ella-article-back",
    href: "#",
    onClick: e => {
      e.preventDefault();
      setRoute('home');
    }
  }, /*#__PURE__*/React.createElement(IconChevron, {
    width: "16",
    height: "16",
    style: {
      transform: 'rotate(180deg)'
    }
  }), isEs ? 'Inicio' : 'Home'), /*#__PURE__*/React.createElement("div", {
    className: "ella-eyebrow",
    style: {
      color: 'var(--ella-plum-500)'
    }
  }, isEs ? 'C\u00c1NCERES REPRODUCTIVOS Y VPH' : 'REPRODUCTIVE CANCERS & HPV'), /*#__PURE__*/React.createElement("h1", null, isEs ? 'Lo que vale la pena vigilar.' : 'What\u2019s worth keeping an eye on.'), /*#__PURE__*/React.createElement("p", {
    className: "ella-article-lede"
  }, isEs ? 'Esta secci\u00f3n no est\u00e1 aqu\u00ed para asustarte. Est\u00e1 aqu\u00ed para que sepas qu\u00e9 pruebas necesitas, cu\u00e1ndo, y qu\u00e9 s\u00edntomas no debes ignorar despu\u00e9s de los 45.' : 'This section isn\u2019t here to scare you. It\u2019s here so you know which screenings you need, when, and which symptoms not to brush off after 45.'), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--ella-plum-100)',
      borderRadius: 20,
      padding: '28px 32px',
      margin: '16px 0 32px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-eyebrow",
    style: {
      color: 'var(--ella-plum-700)'
    }
  }, isEs ? 'PRIMERO: VPH' : 'FIRST: HPV'), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 32,
      lineHeight: 1.15,
      margin: '6px 0 12px',
      color: 'var(--ella-clay-900)'
    }
  }, isEs ? 'El VPH es com\u00fan. La mayor\u00eda de los c\u00e1nceres relacionados con VPH son prevenibles.' : 'HPV is common. Most HPV-related cancers are preventable.'), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 17,
      lineHeight: 1.65,
      color: 'var(--ella-clay-700)',
      margin: 0
    }
  }, isEs ? 'Aproximadamente 8 de cada 10 mujeres tendr\u00e1n VPH en alg\u00fan momento. La mayor\u00eda de las infecciones se eliminan solas. Algunos tipos pueden causar c\u00e1ncer cervical, vaginal, vulvar, anal y orofar\u00edngeo. La detecci\u00f3n regular y la vacuna son tus dos herramientas m\u00e1s poderosas, y la vacuna ahora est\u00e1 aprobada hasta los 45 a\u00f1os.' : 'About 8 in 10 women will have HPV at some point. Most infections clear on their own. A few strains can cause cervical, vaginal, vulvar, anal, and throat cancers. Regular screening and the vaccine are your two most powerful tools, and the vaccine is now approved through age 45.')), /*#__PURE__*/React.createElement("div", {
    className: "ella-article-body"
  }, /*#__PURE__*/React.createElement("h2", null, isEs ? 'Tu calendario de detecci\u00f3n' : 'Your screening schedule'), /*#__PURE__*/React.createElement("p", null, isEs ? 'Una vista r\u00e1pida de lo que normalmente se recomienda. Tu m\u00e9dico puede ajustar seg\u00fan tu historia personal.' : 'A quick overview of what\u2019s typically recommended. Your doctor may adjust based on your personal history.')), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 14,
      gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
      marginTop: 8
    }
  }, screenings.map(s => /*#__PURE__*/React.createElement("div", {
    key: s.name,
    style: {
      background: 'var(--ella-cream-50)',
      border: '1px solid var(--border-default)',
      borderRadius: 16,
      padding: 22
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      padding: '4px 10px',
      borderRadius: 999,
      background: 'var(--ella-plum-100)',
      color: 'var(--ella-plum-700)',
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: '0.04em',
      textTransform: 'uppercase'
    }
  }, /*#__PURE__*/React.createElement(IconCheck, {
    width: "14",
    height: "14"
  }), s.every), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 22,
      lineHeight: 1.2,
      margin: '10px 0 8px',
      color: 'var(--ella-clay-900)'
    }
  }, s.name), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      lineHeight: 1.55,
      color: 'var(--ella-clay-700)',
      margin: 0
    }
  }, s.desc)))), /*#__PURE__*/React.createElement("div", {
    className: "ella-article-body",
    style: {
      marginTop: 48
    }
  }, /*#__PURE__*/React.createElement("h2", null, isEs ? 'Qu\u00e9 vigilar' : 'What to watch for'), /*#__PURE__*/React.createElement("p", null, isEs ? 'No para alarmarte, para informarte. Si notas s\u00edntomas persistentes en cualquiera de estas \u00e1reas, no esperes a tu pr\u00f3xima cita anual. Pide una m\u00e1s pronto.' : 'Not to alarm you, to inform you. If you notice persistent symptoms in any of these areas, don\u2019t wait for your next annual. Get in sooner.')), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 12,
      marginTop: 8
    }
  }, cancers.map(c => /*#__PURE__*/React.createElement("div", {
    key: c.name,
    style: {
      background: 'var(--ella-white)',
      border: '1px solid var(--border-default)',
      borderRadius: 14,
      padding: '20px 24px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      gap: 12,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("h4", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 22,
      lineHeight: 1.2,
      margin: 0,
      color: 'var(--ella-clay-900)'
    }
  }, c.name), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      color: 'var(--ella-rose-deep)'
    }
  }, c.cause)), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 15,
      lineHeight: 1.55,
      color: 'var(--ella-clay-700)',
      margin: '8px 0 0'
    }
  }, c.detail)))), /*#__PURE__*/React.createElement("div", {
    className: "ella-article-body",
    style: {
      marginTop: 48
    }
  }, /*#__PURE__*/React.createElement("h2", null, isEs ? 'Recursos confiables' : 'Trusted resources')), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 12,
      marginTop: 8
    }
  }, links.map(r => /*#__PURE__*/React.createElement("a", {
    key: r.label,
    href: r.href,
    target: "_blank",
    rel: "noopener noreferrer",
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 16,
      background: 'var(--ella-white)',
      border: '1px solid var(--border-default)',
      borderRadius: 14,
      padding: '18px 22px',
      textDecoration: 'none',
      color: 'inherit',
      transition: 'box-shadow 200ms, border-color 200ms'
    },
    onMouseEnter: e => {
      e.currentTarget.style.boxShadow = 'var(--shadow-lifted)';
      e.currentTarget.style.borderColor = 'var(--ella-sand-300)';
    },
    onMouseLeave: e => {
      e.currentTarget.style.boxShadow = '';
      e.currentTarget.style.borderColor = 'var(--border-default)';
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 20,
      color: 'var(--ella-clay-900)'
    }
  }, r.label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: 'var(--ella-clay-700)',
      marginTop: 4
    }
  }, r.sub)), /*#__PURE__*/React.createElement(IconArrow, {
    width: "20",
    height: "20",
    style: {
      color: 'var(--ella-rose-deep)',
      flex: '0 0 20px',
      transform: 'rotate(-45deg)'
    }
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 40,
      display: 'flex',
      gap: 12,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "ella-btn ella-btn-primary",
    onClick: () => setRoute('doctor')
  }, /*#__PURE__*/React.createElement(IconDownload, {
    width: "18",
    height: "18"
  }), isEs ? 'Preguntas para tu m\u00e9dico' : 'Get the doctor checklist'))))));
}
window.ReproductiveHealth = ReproductiveHealth;
Object.assign(__ds_scope, { ReproductiveHealth });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/screens/ReproductiveHealth.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/screens/SupplementsHub.jsx
try { (() => {
// Supplements hub, list of supplements Ella discusses. Click any card to
// expand the full "why", dosing notes, and the research backing it up.

function SupplementsHub({
  lang,
  setRoute
}) {
  const t = useT(lang);
  const isEs = lang === 'es';
  const [open, setOpen] = React.useState(null); // index of open supplement

  const items = [{
    name: 'Creatine',
    tag: isEs ? 'M\u00daSCULO \u00b7 FUERZA' : 'MUSCLE \u00b7 STRENGTH',
    desc: isEs ? 'Apoya la masa muscular y la fuerza, junto con el entrenamiento de fuerza.' : 'Supports muscle mass and strength, alongside strength training.',
    tone: 'rose',
    why: isEs ? ['La p\u00e9rdida de m\u00fasculo se acelera despu\u00e9s de la menopausia. La creatina, combinada con entrenamiento de fuerza, ayuda a mantener m\u00fasculo y fuerza.', 'Investigaciones recientes sugieren beneficios adicionales para la energ\u00eda y la funci\u00f3n cognitiva en mujeres de mediana edad.'] : ['Muscle loss speeds up after menopause. Creatine, combined with strength training, helps maintain muscle and strength.', 'Newer research suggests added benefits for energy and cognitive function in midlife women.'],
    dose: isEs ? '~3\u20135 g al d\u00eda de monohidrato de creatina.' : '~3\u20135 g a day of creatine monohydrate.',
    research: isEs ? 'Resumen basado en evidencia de los Institutos Nacionales de Salud (NIH).' : 'Evidence summary from the U.S. National Institutes of Health (NIH).',
    source: {
      label: 'NIH Office of Dietary Supplements',
      href: 'https://ods.od.nih.gov/factsheets/'
    }
  }, {
    name: 'Omega-3',
    tag: isEs ? 'CORAZ\u00d3N \u00b7 CEREBRO' : 'HEART \u00b7 BRAIN',
    desc: isEs ? 'Antiinflamatorio. Apoya el coraz\u00f3n, el cerebro y el estado de \u00e1nimo.' : 'Anti-inflammatory. Supports heart, brain, and mood.',
    tone: 'sage',
    why: isEs ? ['El estr\u00f3geno protege el coraz\u00f3n, al bajar, el riesgo cardiovascular sube. Los omega-3 (EPA/DHA) ayudan a mantener los triglic\u00e9ridos y la inflamaci\u00f3n bajo control.', 'El DHA es un componente estructural del cerebro y puede apoyar la memoria y el estado de \u00e1nimo durante la transici\u00f3n.', 'Tambi\u00e9n pueden aliviar la rigidez articular que muchas mujeres notan en la perimenopausia.'] : ['Estrogen protects the heart, as it drops, cardiovascular risk rises. Omega-3s (EPA/DHA) help keep triglycerides and inflammation in check.', 'DHA is a structural building block of the brain and may support memory and mood through the transition.', 'They can also ease the joint stiffness many women notice in perimenopause.'],
    dose: isEs ? 'Busca ~1\u20132 g combinados de EPA + DHA al d\u00eda, con comida.' : 'Aim for ~1\u20132 g combined EPA + DHA per day, with food.',
    research: isEs ? 'Resumen basado en evidencia de los Institutos Nacionales de Salud (NIH).' : 'Evidence summary from the U.S. National Institutes of Health (NIH).',
    source: {
      label: 'NIH Office of Dietary Supplements',
      href: 'https://ods.od.nih.gov/factsheets/Omega3FattyAcids-Consumer/'
    }
  }, {
    name: 'Vitamin D3',
    tag: isEs ? 'HUESOS \u00b7 INMUNIDAD' : 'BONES \u00b7 IMMUNITY',
    desc: isEs ? 'La mayor\u00eda de mujeres 45+ tienen deficiencia. P\u00eddele a tu m\u00e9dico que te la mida.' : 'Most women 45+ are deficient. Ask your doctor to test your levels first.',
    tone: 'sage',
    why: isEs ? ['La p\u00e9rdida \u00f3sea se acelera tras la menopausia. La vitamina D es necesaria para absorber el calcio y proteger los huesos.', 'Niveles bajos se asocian con fatiga, dolor muscular y bajo estado de \u00e1nimo, s\u00edntomas f\u00e1ciles de confundir con la menopausia.', 'La deficiencia es muy com\u00fan en mujeres mayores de 45 a\u00f1os, sobre todo en climas con poco sol.'] : ['Bone loss speeds up after menopause. Vitamin D is required to absorb calcium and protect your bones.', 'Low levels are linked to fatigue, muscle aches, and low mood, symptoms easy to mistake for menopause itself.', 'Deficiency is very common in women over 45, especially in low-sunlight climates.'],
    dose: isEs ? 'Pide un an\u00e1lisis de sangre primero. Muchos m\u00e9dicos sugieren 1000\u20132000 UI/d\u00eda seg\u00fan el resultado.' : 'Get a blood test first. Many providers suggest 1000\u20132000 IU/day depending on your result.',
    research: isEs ? 'Hoja informativa basada en evidencia del NIH.' : 'Evidence-based fact sheet from the NIH.',
    source: {
      label: 'NIH Office of Dietary Supplements',
      href: 'https://ods.od.nih.gov/factsheets/VitaminD-Consumer/'
    }
  }, {
    name: 'Vitamin K2',
    tag: isEs ? 'HUESOS' : 'BONES',
    desc: isEs ? 'Funciona en pareja con la Vit D para llevar el calcio donde tiene que ir.' : 'Pairs with Vit D to get calcium where it belongs.',
    tone: 'plum',
    why: isEs ? ['La vitamina K ayuda a dirigir el calcio hacia los huesos y a mantenerlo fuera de las arterias.', 'Trabaja en conjunto con la vitamina D, tomarlas juntas tiene m\u00e1s sentido que por separado.'] : ['Vitamin K helps direct calcium into your bones and keep it out of your arteries.', 'It works hand-in-hand with vitamin D, taking them together makes more sense than either alone.'],
    dose: isEs ? 'A menudo se combina con la vitamina D en un solo suplemento (forma K2/MK-7).' : 'Often combined with vitamin D in a single supplement (K2/MK-7 form).',
    research: isEs ? 'Hoja informativa basada en evidencia del NIH.' : 'Evidence-based fact sheet from the NIH.',
    source: {
      label: 'NIH Office of Dietary Supplements',
      href: 'https://ods.od.nih.gov/factsheets/VitaminK-Consumer/'
    }
  }, {
    name: 'Magnesium L-Threonate',
    tag: isEs ? 'SUE\u00d1O \u00b7 ESTR\u00c9S' : 'SLEEP \u00b7 STRESS',
    desc: isEs ? 'Cruza mejor al cerebro. Apoya el sue\u00f1o, la calma y la memoria.' : 'Crosses into the brain better. Supports sleep, calm, and memory.',
    tone: 'plum',
    why: isEs ? ['El magnesio ayuda a regular el sistema nervioso, la relajaci\u00f3n muscular y el sue\u00f1o, tres cosas que la menopausia suele alterar.', 'La forma L-treonato cruza la barrera hematoencef\u00e1lica mejor que otras formas, por lo que se asocia m\u00e1s con beneficios cognitivos y de memoria.', 'Tambi\u00e9n participa en la salud \u00f3sea y en la regulaci\u00f3n del az\u00facar en sangre.'] : ['Magnesium helps regulate the nervous system, muscle relaxation, and sleep, three things menopause tends to disrupt.', 'The L-threonate form crosses the blood-brain barrier better than other forms, so it\u2019s more associated with cognitive and memory benefits.', 'It also plays a role in bone health and blood-sugar regulation.'],
    dose: isEs ? 'Sigue la dosis del producto, suele ser ~1\u20132 g al d\u00eda de magnesio L-treonato.' : 'Follow the product dosing, typically ~1\u20132 g a day of magnesium L-threonate.',
    research: isEs ? 'Hoja informativa basada en evidencia del NIH.' : 'Evidence-based fact sheet from the NIH.',
    source: {
      label: 'NIH Office of Dietary Supplements',
      href: 'https://ods.od.nih.gov/factsheets/Magnesium-Consumer/'
    }
  }, {
    name: 'Turmeric',
    tag: isEs ? 'INFLAMACI\u00d3N \u00b7 ARTICULACIONES' : 'INFLAMMATION \u00b7 JOINTS',
    desc: isEs ? 'Antiinflamatorio natural. Ayuda con el dolor articular y la hinchaz\u00f3n.' : 'Natural anti-inflammatory. Helps with joint pain and swelling.',
    tone: 'sage',
    why: isEs ? ['La curcumina, el compuesto activo de la c\u00farcuma, tiene propiedades antiinflamatorias que pueden ayudar con el dolor articular com\u00fan en la perimenopausia.', 'Algunos estudios sugieren beneficios adicionales para el estado de \u00e1nimo y la salud cardiovascular.'] : ['Curcumin, turmeric\u2019s active compound, has anti-inflammatory properties that may help with the joint pain common in perimenopause.', 'Some studies suggest added benefits for mood and cardiovascular health.'],
    dose: isEs ? 'Busca curcumina con piperina o una forma biodisponible, ~500\u20131000 mg al d\u00eda.' : 'Look for curcumin with piperine or a bioavailable form, ~500\u20131000 mg a day.',
    research: isEs ? 'La evidencia es prometedora pero a\u00fan limitada; habla con tu m\u00e9dico.' : 'Evidence is promising but still limited; talk to your doctor.',
    source: null
  }, {
    name: 'Fiber',
    tag: isEs ? 'DIGESTI\u00d3N \u00b7 HORMONAS' : 'GUT \u00b7 HORMONES',
    desc: isEs ? 'Apunta a 25 g al d\u00eda. Ayuda al estr\u00f3geno a salir del cuerpo correctamente.' : 'Aim for 25 g a day. Helps estrogen leave the body the way it should.',
    tone: 'sage',
    why: isEs ? ['La fibra alimenta a las bacterias intestinales que ayudan a metabolizar y eliminar el estr\u00f3geno de forma equilibrada.', 'Estabiliza el az\u00facar en sangre y la saciedad, \u00fatil cuando el metabolismo cambia en la menopausia.', 'Apoya la salud del coraz\u00f3n al ayudar a controlar el colesterol.'] : ['Fiber feeds the gut bacteria that help metabolize and clear estrogen in a balanced way.', 'It steadies blood sugar and fullness, helpful when metabolism shifts in menopause.', 'It supports heart health by helping manage cholesterol.'],
    dose: isEs ? 'Apunta a ~25 g al d\u00eda, idealmente de alimentos; un suplemento puede llenar el vac\u00edo.' : 'Aim for ~25 g a day, ideally from food; a supplement can fill the gap.',
    research: isEs ? 'Recomendaci\u00f3n general de salud p\u00fablica.' : 'General public-health guidance.',
    source: null
  }, {
    name: 'Probiotics',
    tag: isEs ? 'DIGESTI\u00d3N \u00b7 INMUNIDAD' : 'GUT \u00b7 IMMUNITY',
    desc: isEs ? 'Apoya la salud intestinal, que influye en hormonas, inmunidad y estado de \u00e1nimo.' : 'Supports gut health, which influences hormones, immunity, and mood.',
    tone: 'plum',
    why: isEs ? ['El microbioma intestinal ayuda a metabolizar el estr\u00f3geno y puede influir en c\u00f3mo se siente el cuerpo durante la transici\u00f3n.', 'Un intestino equilibrado tambi\u00e9n se relaciona con mejor inmunidad y menor inflamaci\u00f3n.'] : ['The gut microbiome helps metabolize estrogen and can influence how the body feels through the transition.', 'A balanced gut is also linked to better immunity and lower inflammation.'],
    dose: isEs ? 'Busca una cepa con investigaci\u00f3n respaldada, sigue la dosis del producto.' : 'Look for a well-researched strain, follow the product\u2019s dosing.',
    research: isEs ? 'La evidencia var\u00eda seg\u00fan la cepa; habla con tu m\u00e9dico.' : 'Evidence varies by strain; talk to your doctor.',
    source: null
  }];
  const toneBg = tone => tone === 'rose' ? 'var(--ella-blush-50)' : tone === 'plum' ? 'var(--ella-plum-100)' : 'var(--ella-sage-100)';
  const toneFg = tone => tone === 'rose' ? 'var(--ella-rose)' : tone === 'plum' ? 'var(--ella-plum-500)' : 'var(--ella-sage-500)';
  const tagFg = tone => tone === 'rose' ? 'var(--ella-terracotta)' : tone === 'plum' ? 'var(--ella-plum-700)' : 'var(--ella-sage-700)';
  const s = open != null ? items[open] : null;
  return /*#__PURE__*/React.createElement("div", {
    "data-screen-label": "06 Supplements"
  }, /*#__PURE__*/React.createElement("section", {
    className: "ella-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-section-head",
    style: {
      maxWidth: 760
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-eyebrow"
  }, t('nav_supplements').toUpperCase()), /*#__PURE__*/React.createElement("h2", null, isEs ? 'M\u00e1s importantes que un multivitam\u00ednico, ahora.' : 'More important than a multivitamin, at this stage.')), /*#__PURE__*/React.createElement("div", {
    className: "ella-supp-grid"
  }, items.map((sup, idx) => /*#__PURE__*/React.createElement("button", {
    key: sup.name,
    type: "button",
    className: "ella-supp-card",
    onClick: () => setOpen(idx),
    "aria-haspopup": "dialog"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 48,
      height: 48,
      borderRadius: 12,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: toneBg(sup.tone),
      color: toneFg(sup.tone)
    }
  }, /*#__PURE__*/React.createElement(IconDroplet, {
    width: "24",
    height: "24"
  })), /*#__PURE__*/React.createElement("span", {
    className: "ella-supp-tag",
    style: {
      background: toneBg(sup.tone),
      color: tagFg(sup.tone)
    }
  }, sup.tag), /*#__PURE__*/React.createElement("h4", null, sup.name), /*#__PURE__*/React.createElement("p", null, sup.desc), /*#__PURE__*/React.createElement("span", {
    className: "ella-pillar-cta",
    style: {
      marginTop: 'auto',
      paddingTop: 6
    }
  }, isEs ? 'Ver el porqu\u00e9 y la ciencia' : 'See the why & the science', " ", /*#__PURE__*/React.createElement(IconArrow, {
    width: "14",
    height: "14"
  }))))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 40,
      padding: '20px 24px',
      background: 'var(--ella-cream-100)',
      borderRadius: 16,
      fontSize: 14,
      color: 'var(--ella-clay-700)',
      fontStyle: 'italic',
      lineHeight: 1.5
    }
  }, isEs ? 'Habla con tu m\u00e9dica antes de empezar cualquier suplemento, especialmente si tomas medicamentos. Ella comparte informaci\u00f3n, no consejo m\u00e9dico personalizado.' : 'Talk to your doctor before starting any supplement, especially if you take medication. Ella shares information, not personalized medical advice.'))), s && /*#__PURE__*/React.createElement("div", {
    className: "ella-supp-modal-overlay",
    onClick: () => setOpen(null),
    role: "dialog",
    "aria-modal": "true",
    "aria-label": s.name
  }, /*#__PURE__*/React.createElement("div", {
    className: "ella-supp-modal",
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "ella-supp-modal-close",
    "aria-label": isEs ? 'Cerrar' : 'Close',
    onClick: () => setOpen(null)
  }, "\\u00d7"), /*#__PURE__*/React.createElement("div", {
    className: "ella-supp-modal-head"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 52,
      height: 52,
      borderRadius: 14,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: toneBg(s.tone),
      color: toneFg(s.tone),
      flex: '0 0 52px'
    }
  }, /*#__PURE__*/React.createElement(IconDroplet, {
    width: "26",
    height: "26"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "ella-supp-tag",
    style: {
      background: toneBg(s.tone),
      color: tagFg(s.tone)
    }
  }, s.tag), /*#__PURE__*/React.createElement("h3", null, s.name))), /*#__PURE__*/React.createElement("h4", {
    className: "ella-supp-modal-sub"
  }, isEs ? 'Por qu\u00e9 importa ahora' : 'Why it matters now'), /*#__PURE__*/React.createElement("ul", {
    className: "ella-supp-why"
  }, s.why.map((w, i) => /*#__PURE__*/React.createElement("li", {
    key: i
  }, w))), /*#__PURE__*/React.createElement("div", {
    className: "ella-supp-dose"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ella-supp-dose-lbl"
  }, isEs ? 'C\u00d3MO TOMARLO' : 'HOW TO TAKE IT'), /*#__PURE__*/React.createElement("p", null, s.dose)), /*#__PURE__*/React.createElement("h4", {
    className: "ella-supp-modal-sub"
  }, isEs ? 'La investigaci\u00f3n' : 'The research'), /*#__PURE__*/React.createElement("p", {
    className: "ella-supp-research"
  }, s.research), s.source && /*#__PURE__*/React.createElement("a", {
    className: "ella-supp-source",
    href: s.source.href,
    target: "_blank",
    rel: "noopener noreferrer"
  }, s.source.label, /*#__PURE__*/React.createElement(IconArrow, {
    width: "15",
    height: "15",
    style: {
      transform: 'rotate(-45deg)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "ella-supp-modal-actions"
  }, /*#__PURE__*/React.createElement("a", {
    className: "ella-btn ella-btn-primary",
    href: "#",
    onClick: e => e.preventDefault()
  }, isEs ? 'Ver marca recomendada' : 'See recommended brand', /*#__PURE__*/React.createElement(IconArrow, {
    width: "18",
    height: "18"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "ella-supp-modal-disc"
  }, isEs ? 'Ella puede ganar una peque\u00f1a comisi\u00f3n por algunos enlaces.' : 'Ella may earn a small affiliate fee on some links.'))));
}
window.SupplementsHub = SupplementsHub;
Object.assign(__ds_scope, { SupplementsHub });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/screens/SupplementsHub.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/screens/articleData.jsx
try { (() => {
// Article data store, 6 sample articles spanning Ella's content pillars.
// Each article has: id, category, tone, title, lede, readTime, body (array of
// block objects). Bilingual via lang parameter.
//
// Body block kinds:
//   { kind: 'p',    text }
//   { kind: 'h2',   text }
//   { kind: 'pull', text }
//   { kind: 'ul',   items: [...] }
//   { kind: 'table', headers: [...], rows: [[...], ...] }

const ELLA_ARTICLES = {
  en: [{
    id: 'protein-after-45',
    category: 'Nutrition',
    tone: 'sage',
    title: 'Protein after 45: why it suddenly matters so much.',
    lede: 'Your body starts losing muscle faster than before, and protein is the single most useful tool to slow it down. Here’s what you actually need.',
    readTime: '8 min read',
    published: 'March 2026',
    body: [{
      kind: 'p',
      text: 'If you’re entering perimenopause and your body suddenly feels like it isn’t the same, you’re not imagining it. After 45, we lose muscle faster, about 1% a year. The good news: protein works, and it works pretty quickly.'
    }, {
      kind: 'pull',
      text: '“Aim for 1.2–1.6 grams of protein per kilo of body weight a day. For most women, that means rethinking breakfast first.”'
    }, {
      kind: 'h2',
      text: 'How much do you actually need?'
    }, {
      kind: 'p',
      text: 'The old guideline (the RDA of 0.8 g/kg) was set to prevent deficiency, not to preserve muscle through hormonal transition. Newer research suggests roughly double that.'
    }, {
      kind: 'table',
      headers: ['Your weight', 'Floor', 'Target'],
      rows: [['55 kg / 121 lb', '66 g', '88 g'], ['65 kg / 143 lb', '78 g', '104 g'], ['75 kg / 165 lb', '90 g', '120 g'], ['85 kg / 187 lb', '102 g', '136 g']]
    }, {
      kind: 'h2',
      text: 'Foods to add this week'
    }, {
      kind: 'p',
      text: 'We’re not building a meal plan here, just giving you the building blocks. Aim for 25–30 g of protein per meal. Easiest wins:'
    }, {
      kind: 'ul',
      items: ['Greek yogurt (plain), 17 g per cup', 'Eggs, 6 g each', 'Chicken breast, 31 g per 100 g', 'Cooked lentils, 18 g per cup', 'Cottage cheese, 25 g per cup', 'Firm tofu, 20 g per 100 g']
    }]
  }, {
    id: 'what-is-perimenopause',
    category: 'Perimenopause',
    tone: 'rose',
    title: 'What is perimenopause, really?',
    lede: 'The years before menopause are often the loudest. Here’s what’s actually happening, when it usually starts, and what to expect.',
    readTime: '6 min read',
    published: 'March 2026',
    body: [{
      kind: 'p',
      text: 'Perimenopause is the transition leading up to menopause, the years when your hormones start swinging unpredictably. It usually begins in your 40s but can start in your late 30s, and lasts anywhere from 4 to 10 years on average.'
    }, {
      kind: 'h2',
      text: 'The hormone shift in plain English'
    }, {
      kind: 'p',
      text: 'Estrogen doesn’t fall steadily, it spikes and dips. Progesterone drops more steadily. That mismatch is what causes most of the symptoms women report: heavy periods, mood shifts, sleep changes, brain fog, hot flashes, and joint aches.'
    }, {
      kind: 'pull',
      text: '“If your symptoms feel ‘out of nowhere’ in your 40s, perimenopause is the most likely answer, even if your periods are still regular.”'
    }, {
      kind: 'h2',
      text: 'Common signs (you don’t need all of them)'
    }, {
      kind: 'ul',
      items: ['Periods that get heavier, lighter, closer together, or further apart', 'Hot flashes or night sweats', 'Sleep that’s suddenly different', 'Mood shifts, anxiety, or low mood', 'Brain fog or memory lapses', 'Joint stiffness, especially mornings', 'Lower libido']
    }, {
      kind: 'h2',
      text: 'Menopause vs. perimenopause'
    }, {
      kind: 'p',
      text: 'Menopause is officially diagnosed after 12 consecutive months without a period. Everything before that, even if you’re having symptoms, is perimenopause. Most women spend more time in perimenopause than they realize.'
    }]
  }, {
    id: 'foods-to-avoid',
    category: 'Nutrition',
    tone: 'sage',
    title: 'Foods to avoid, and why.',
    lede: 'No food is forbidden. But a few things tend to make perimenopause symptoms louder. Here are the ones worth cutting back on, and what changes when you do.',
    readTime: '5 min read',
    published: 'February 2026',
    body: [{
      kind: 'p',
      text: 'A reminder: Ella doesn’t do rules or guilt. This isn’t a list of things you can never eat again. It’s a short, honest look at the foods that most often worsen hot flashes, sleep, and energy in midlife, so you can choose what’s worth it.'
    }, {
      kind: 'h2',
      text: '1. Alcohol'
    }, {
      kind: 'p',
      text: 'It’s the single biggest sleep disruptor for women 45+, and a common hot-flash trigger. You don’t have to quit, but notice how a glass of red wine affects your night.'
    }, {
      kind: 'h2',
      text: '2. Added sugar and refined carbs'
    }, {
      kind: 'p',
      text: 'White bread, pastries, and sugary drinks spike your blood sugar and then drop it, which can feed energy crashes and mood swings. The fix isn’t zero sugar, it’s less of it and more fiber alongside.'
    }, {
      kind: 'h2',
      text: '3. Too much caffeine'
    }, {
      kind: 'p',
      text: 'Caffeine can intensify hot flashes and linger in your system longer than it used to. If sleep is rough, try a noon cutoff before anything else.'
    }, {
      kind: 'h2',
      text: '4. Ultra-processed and fried foods'
    }, {
      kind: 'p',
      text: 'High in inflammatory oils and sodium, low in the fiber and protein your body needs more of now. The occasional fry is fine, the everyday habit is what adds up.'
    }, {
      kind: 'h2',
      text: '5. Very spicy food and piping-hot drinks'
    }, {
      kind: 'p',
      text: 'Both can set off a hot flash by raising your core temperature. If you’re flashing a lot, these are easy, temporary things to dial back and test.'
    }, {
      kind: 'pull',
      text: '“This isn’t about restriction. It’s about noticing which foods cost you a good night’s sleep, and deciding for yourself.”'
    }]
  }, {
    id: 'sleep-hormones',
    category: 'Mental Health',
    tone: 'plum',
    title: 'Sleep, hormones, and what actually helps.',
    lede: 'Sleep changes in perimenopause are real, frustrating, and fixable. Here’s what’s happening and what’s worth trying.',
    readTime: '7 min read',
    published: 'February 2026',
    body: [{
      kind: 'p',
      text: 'You’re waking up at 3 a.m. and can’t fall back asleep. Or you’re tired but wired. Or you wake up soaked. None of this is your imagination, it’s your hormones.'
    }, {
      kind: 'h2',
      text: 'Why sleep gets weird now'
    }, {
      kind: 'p',
      text: 'Progesterone has a calming, sleep-promoting effect, and it drops first in perimenopause. Estrogen affects body temperature, which is why night sweats wake you up. Cortisol rhythms also shift. All of this stacks.'
    }, {
      kind: 'h2',
      text: 'What actually helps'
    }, {
      kind: 'ul',
      items: ['Magnesium glycinate, 200–400 mg, 30 min before bed', 'A cool room, 65–68°F / 18–20°C is the sweet spot', 'Caffeine cutoff by noon, not 3 p.m.', 'Alcohol is the single biggest sleep disruptor for women 45+', 'Strength training earlier in the day improves sleep depth']
    }, {
      kind: 'pull',
      text: '“Alcohol is the single biggest sleep disruptor for women in midlife. Cutting it for two weeks is the fastest experiment you can run.”'
    }, {
      kind: 'h2',
      text: 'When to ask your doctor'
    }, {
      kind: 'p',
      text: 'If sleep has been bad for more than 3 months and the basics haven’t helped, talk to your doctor about hormone therapy, low-dose estrogen, or non-hormonal options. You don’t have to white-knuckle it.'
    }]
  }, {
    id: 'strength-beginners',
    category: 'Exercise',
    tone: 'sage',
    title: 'Strength training when you’ve never lifted before.',
    lede: 'You don’t need a gym, a coach, or any equipment to start. Here’s a beginner-friendly path that actually works.',
    readTime: '6 min read',
    published: 'January 2026',
    body: [{
      kind: 'p',
      text: 'Strength training is the highest-leverage thing you can do for your body after 45. It protects bone, builds muscle, improves sleep, and helps insulin work better. And you can absolutely start at zero.'
    }, {
      kind: 'h2',
      text: 'A two-week starter plan'
    }, {
      kind: 'ul',
      items: ['Day 1: 10 squats, 10 wall push-ups, 10-second plank. Two rounds.', 'Day 2: Walk 20 minutes.', 'Day 3: Same as Day 1, add one more round.', 'Day 4: Rest or walk.', 'Day 5: Add 5 lb dumbbells (or two cans of beans) to your squats.', 'Day 6–7: Repeat what feels good.']
    }, {
      kind: 'h2',
      text: 'What “light weights” really means'
    }, {
      kind: 'p',
      text: 'Light is a relative word. For someone who’s never lifted, 5 lb dumbbells are perfect. The point isn’t the weight, it’s the consistency. Two short sessions a week, every week, beats one heroic gym day a month.'
    }, {
      kind: 'pull',
      text: '“Two short sessions a week, every week, beats one heroic gym day a month.”'
    }]
  }, {
    id: 'life-after-menopause',
    category: 'Menopause',
    tone: 'plum',
    title: 'Life after menopause: what changes, and what doesn’t.',
    lede: 'Menopause is a single day, twelve months after your last period. Everything after that is its own long chapter. Here’s what actually shifts.',
    readTime: '6 min read',
    published: 'March 2026',
    body: [{
      kind: 'p',
      text: 'Once you’re postmenopausal, the wild hormone swings of perimenopause settle into something steadier, low and stable. For many women, that alone brings relief: fewer surprises, more predictability.'
    }, {
      kind: 'h2',
      text: 'What tends to ease up'
    }, {
      kind: 'ul',
      items: ['Periods, obviously, are done', 'Mood swings often stabilize once hormones stop fluctuating', 'Hot flashes fade for most women within a few years, though not all']
    }, {
      kind: 'h2',
      text: 'What deserves ongoing attention'
    }, {
      kind: 'p',
      text: 'Lower estrogen long-term affects bone density, heart health, and vaginal tissue. None of this is scary, it’s just worth knowing so you can stay ahead of it with your doctor: bone density screening, cardiovascular checkups, and options for vaginal dryness if it comes up.'
    }, {
      kind: 'h2',
      text: 'Early or surgical menopause'
    }, {
      kind: 'p',
      text: 'If menopause happened earlier than expected, before 45, or suddenly through surgery, the same long-term considerations apply sooner. It’s worth an honest conversation with your doctor about hormone therapy given the longer stretch of time involved.'
    }, {
      kind: 'pull',
      text: '“Menopause isn’t an ending. It’s a steadier chapter, and one worth knowing how to take care of.”'
    }]
  }, {
    id: 'intimacy-and-connection',
    category: 'Mental Health',
    tone: 'plum',
    title: 'Intimacy and connection through the change.',
    lede: 'Desire, dryness, and closeness with a partner all shift during this transition. None of it is shameful, and most of it is workable.',
    readTime: '6 min read',
    published: 'February 2026',
    body: [{
      kind: 'p',
      text: 'Lower estrogen thins and dries vaginal tissue, which can make sex uncomfortable or even painful. Lower testosterone and the general fatigue of this stage can lower desire too. Both are common, and neither has to be permanent.'
    }, {
      kind: 'h2',
      text: 'What helps with dryness and discomfort'
    }, {
      kind: 'ul',
      items: ['Vaginal moisturizers (used regularly, not just before sex)', 'Silicone or water-based lubricant during intimacy', 'Low-dose vaginal estrogen, ask your doctor, it’s different from systemic HRT', 'Longer foreplay and unhurried pacing, arousal often takes more time now']
    }, {
      kind: 'h2',
      text: 'The emotional side'
    }, {
      kind: 'p',
      text: 'A dip in desire isn’t a verdict on your relationship or your body. Talking about it, with a partner or a doctor, tends to help more than staying quiet about it. Many women find that connection deepens once the conversation is out in the open.'
    }, {
      kind: 'pull',
      text: '“You’re not broken, and you’re not alone. This is one of the most common, least talked-about parts of the transition.”'
    }]
  }, {
    id: 'hot-flashes',
    category: 'Menopause',
    tone: 'rose',
    title: 'The truth about hot flashes.',
    lede: 'Why they happen, why they feel different at 3 a.m., and the surprisingly long menu of things that help.',
    readTime: '5 min read',
    published: 'January 2026',
    body: [{
      kind: 'p',
      text: 'A hot flash is your brain misreading your body temperature. Estrogen fluctuation messes with the thermoregulation center in your hypothalamus. The result: your body thinks it’s overheating, opens the blood vessels near your skin, and tries to dump heat fast. That’s the flush.'
    }, {
      kind: 'h2',
      text: 'Why night sweats feel worse'
    }, {
      kind: 'p',
      text: 'At night, you’re horizontal, your blanket is on, and your body is in repair mode. A hot flash interrupts sleep and floods you with cortisol, which is why you can’t fall back asleep.'
    }, {
      kind: 'h2',
      text: 'What’s worth trying'
    }, {
      kind: 'ul',
      items: ['Layered clothing and a cool bedroom, obvious but real', 'Avoid triggers: red wine, spicy food, very hot drinks', 'Paced breathing (4 in, 6 out) at the first sign of a flush', 'CBT for hot flashes has clinical support', 'For severe symptoms, talk to your doctor about HRT or fezolinetant']
    }, {
      kind: 'pull',
      text: '“If flashes are stealing your sleep or your sanity, you do not have to push through. There is a long menu of options.”'
    }]
  }],
  es: [{
    id: 'protein-after-45',
    category: 'Nutrición',
    tone: 'sage',
    title: 'Proteína después de los 45: por qué importa tanto.',
    lede: 'Tu cuerpo está perdiendo músculo más rápido que antes, y la proteína es la herramienta más útil para detenerlo. Esto es lo que realmente necesitas.',
    readTime: '8 min de lectura',
    published: 'Marzo 2026',
    body: [{
      kind: 'p',
      text: 'Si entras a la perimenopausia y de repente sientes que tu cuerpo no es el mismo, no te lo estás imaginando. Después de los 45, perdemos músculo más rápido, alrededor de 1% al año. La buena noticia: la proteína funciona, y funciona bastante rápido.'
    }, {
      kind: 'pull',
      text: '«Apunta a 1.2–1.6 gramos de proteína por kilo de peso al día. Para la mayoría de mujeres, eso significa repensar el desayuno primero.»'
    }, {
      kind: 'h2',
      text: '¿Cuánta necesitas, realmente?'
    }, {
      kind: 'p',
      text: 'Las viejas pautas (la RDA de 0.8 g/kg) fueron creadas para evitar la deficiencia, no para mantener el músculo durante la transición hormonal. Investigación reciente sugiere casi el doble.'
    }, {
      kind: 'table',
      headers: ['Tu peso', 'Mínimo', 'Objetivo'],
      rows: [['55 kg', '66 g', '88 g'], ['65 kg', '78 g', '104 g'], ['75 kg', '90 g', '120 g'], ['85 kg', '102 g', '136 g']]
    }, {
      kind: 'h2',
      text: 'Alimentos para incluir'
    }, {
      kind: 'p',
      text: 'No estamos haciendo un plan de comidas, solo te damos los bloques. Apunta a 25–30 g de proteína por comida.'
    }, {
      kind: 'ul',
      items: ['Yogur griego (puro), 17 g por taza', 'Huevos, 6 g cada uno', 'Pechuga de pollo, 31 g por 100 g', 'Lentejas cocidas, 18 g por taza', 'Requesón, 25 g por taza', 'Tofu firme, 20 g por 100 g']
    }]
  }, {
    id: 'what-is-perimenopause',
    category: 'Perimenopausia',
    tone: 'rose',
    title: '¿Qué es la perimenopausia, en realidad?',
    lede: 'Los años antes de la menopausia suelen ser los más ruidosos. Esto es lo que está pasando, cuándo suele empezar, y qué esperar.',
    readTime: '6 min de lectura',
    published: 'Marzo 2026',
    body: [{
      kind: 'p',
      text: 'La perimenopausia es la transición hacia la menopausia, los años en que tus hormonas empiezan a moverse de forma impredecible. Suele comenzar en los 40, pero puede empezar a finales de los 30, y dura entre 4 y 10 años en promedio.'
    }, {
      kind: 'h2',
      text: 'El cambio hormonal en lenguaje claro'
    }, {
      kind: 'p',
      text: 'El estrógeno no baja de forma constante, sube y baja. La progesterona baja más establemente. Ese desajuste causa la mayoría de los síntomas: periodos abundantes, cambios de humor, problemas de sueño, niebla mental, sofocos y dolor articular.'
    }, {
      kind: 'pull',
      text: '«Si tus síntomas aparecen "de la nada" en los 40, la perimenopausia es la respuesta más probable, aunque tus periodos sigan regulares.»'
    }, {
      kind: 'h2',
      text: 'Signos comunes (no necesitas tenerlos todos)'
    }, {
      kind: 'ul',
      items: ['Periodos más abundantes, más ligeros, más juntos o más separados', 'Sofocos o sudores nocturnos', 'Sueño que de repente es diferente', 'Cambios de humor, ansiedad o tristeza', 'Niebla mental o lapsos de memoria', 'Rigidez articular, especialmente por la mañana', 'Menos deseo sexual']
    }]
  }, {
    id: 'foods-to-avoid',
    category: 'Nutrición',
    tone: 'sage',
    title: 'Alimentos a evitar, y por qué.',
    lede: 'Ningún alimento está prohibido. Pero algunas cosas tienden a empeorar los síntomas de la perimenopausia. Estas son las que vale la pena reducir, y qué cambia cuando lo haces.',
    readTime: '5 min de lectura',
    published: 'Febrero 2026',
    body: [{
      kind: 'p',
      text: 'Un recordatorio: Ella no hace reglas ni culpa. Esto no es una lista de cosas que nunca podrás volver a comer. Es una mirada corta y honesta a los alimentos que con más frecuencia empeoran los sofocos, el sueño y la energía en la mediana edad, para que tú decidas qué vale la pena.'
    }, {
      kind: 'h2',
      text: '1. Alcohol'
    }, {
      kind: 'p',
      text: 'Es el mayor perturbador del sueño para mujeres de 45+, y un desencadenante común de sofocos. No tienes que dejarlo, pero nota cómo una copa de vino tinto afecta tu noche.'
    }, {
      kind: 'h2',
      text: '2. Azúcar añadida y carbohidratos refinados'
    }, {
      kind: 'p',
      text: 'El pan blanco, la repostería y las bebidas azucaradas suben tu azúcar en sangre y luego la bajan, lo que alimenta bajones de energía y cambios de humor. La solución no es cero azúcar, es menos y con más fibra al lado.'
    }, {
      kind: 'h2',
      text: '3. Demasiada cafeína'
    }, {
      kind: 'p',
      text: 'La cafeína puede intensificar los sofocos y quedarse en tu sistema más tiempo que antes. Si el sueño es difícil, prueba un límite al mediodía antes que nada.'
    }, {
      kind: 'h2',
      text: '4. Alimentos ultraprocesados y fritos'
    }, {
      kind: 'p',
      text: 'Altos en aceites inflamatorios y sodio, bajos en la fibra y proteína que tu cuerpo necesita más ahora. Una fritura ocasional está bien, el hábito diario es lo que suma.'
    }, {
      kind: 'h2',
      text: '5. Comida muy picante y bebidas muy calientes'
    }, {
      kind: 'p',
      text: 'Ambas pueden desatar un sofoco al subir tu temperatura corporal. Si tienes muchos sofocos, son cosas fáciles y temporales para reducir y poner a prueba.'
    }, {
      kind: 'pull',
      text: '«Esto no se trata de restricción. Se trata de notar qué alimentos te cuestan una buena noche de sueño, y decidir por ti misma.»'
    }]
  }, {
    id: 'sleep-hormones',
    category: 'Salud mental',
    tone: 'plum',
    title: 'Sueño, hormonas, y qué realmente ayuda.',
    lede: 'Los cambios de sueño en la perimenopausia son reales, frustrantes y solucionables. Esto es lo que está pasando.',
    readTime: '7 min de lectura',
    published: 'Febrero 2026',
    body: [{
      kind: 'p',
      text: 'Te despiertas a las 3 a.m. y no te puedes volver a dormir. O estás cansada pero acelerada. O te despiertas empapada. Nada de esto es tu imaginación, son tus hormonas.'
    }, {
      kind: 'h2',
      text: 'Qué realmente ayuda'
    }, {
      kind: 'ul',
      items: ['Glicinato de magnesio, 200–400 mg, 30 min antes de dormir', 'Cuarto fresco, 18–20 °C es ideal', 'Cafeína antes del mediodía, no a las 3 p.m.', 'El alcohol es el mayor disruptor del sueño en mujeres 45+', 'Entrenamiento de fuerza temprano en el día mejora la profundidad del sueño']
    }, {
      kind: 'pull',
      text: '«El alcohol es el mayor disruptor del sueño en mujeres en la mediana edad. Quitarlo dos semanas es el experimento más rápido que puedes hacer.»'
    }]
  }, {
    id: 'strength-beginners',
    category: 'Ejercicio',
    tone: 'sage',
    title: 'Entrenamiento de fuerza cuando nunca has levantado pesas.',
    lede: 'No necesitas gimnasio, entrenador, ni equipamiento para empezar. Aquí tienes un camino para principiantes que sí funciona.',
    readTime: '6 min de lectura',
    published: 'Enero 2026',
    body: [{
      kind: 'p',
      text: 'El entrenamiento de fuerza es lo más importante que puedes hacer por tu cuerpo después de los 45. Protege los huesos, construye músculo, mejora el sueño. Y puedes empezar desde cero.'
    }, {
      kind: 'h2',
      text: 'Un plan inicial de dos semanas'
    }, {
      kind: 'ul',
      items: ['Día 1: 10 sentadillas, 10 lagartijas en la pared, plancha de 10 segundos. Dos rondas.', 'Día 2: Camina 20 minutos.', 'Día 3: Igual que el día 1, agrega una ronda más.', 'Día 4: Descanso o caminar.', 'Día 5: Agrega mancuernas de 2 kg (o dos latas de frijoles) a las sentadillas.', 'Día 6–7: Repite lo que se sienta bien.']
    }, {
      kind: 'pull',
      text: '«Dos sesiones cortas a la semana, cada semana, ganan a un día heroico de gimnasio al mes.»'
    }]
  }, {
    id: 'life-after-menopause',
    category: 'Menopausia',
    tone: 'plum',
    title: 'La vida después de la menopausia: qué cambia y qué no.',
    lede: 'La menopausia es un solo día, doce meses después de tu último periodo. Todo lo que sigue es su propio capítulo. Esto es lo que realmente cambia.',
    readTime: '6 min de lectura',
    published: 'Marzo 2026',
    body: [{
      kind: 'p',
      text: 'Una vez que estás en la posmenopausia, los cambios hormonales bruscos de la perimenopausia se vuelven algo más estable, bajo pero constante. Para muchas mujeres, eso ya trae alivio: menos sorpresas, más previsibilidad.'
    }, {
      kind: 'h2',
      text: 'Qué suele mejorar'
    }, {
      kind: 'ul',
      items: ['Los periodos, obviamente, terminan', 'Los cambios de humor suelen estabilizarse', 'Los sofocos se desvanecen para la mayoría en unos años, aunque no para todas']
    }, {
      kind: 'h2',
      text: 'Qué merece atención continua'
    }, {
      kind: 'p',
      text: 'El estrógeno bajo a largo plazo afecta la densidad ósea, la salud del corazón, y el tejido vaginal. Nada de esto da miedo, solo vale la pena saberlo para adelantarte con tu médico: revisión de densidad ósea, chequeos cardiovasculares, y opciones para la sequedad vaginal si aparece.'
    }, {
      kind: 'h2',
      text: 'Menopausia temprana o quirúrgica'
    }, {
      kind: 'p',
      text: 'Si la menopausia llegó antes de lo esperado, antes de los 45, o de repente por cirugía, las mismas consideraciones a largo plazo aplican antes. Vale la pena una conversación honesta con tu médico sobre terapia hormonal dado el periodo más largo involucrado.'
    }, {
      kind: 'pull',
      text: '«La menopausia no es un final. Es un capítulo más estable, y vale la pena saber cómo cuidarlo.»'
    }]
  }, {
    id: 'intimacy-and-connection',
    category: 'Salud mental',
    tone: 'plum',
    title: 'Intimidad y conexión durante el cambio.',
    lede: 'El deseo, la sequedad, y la cercanía con tu pareja cambian durante esta transición. Nada de esto es motivo de vergüenza, y la mayoría se puede trabajar.',
    readTime: '6 min de lectura',
    published: 'Febrero 2026',
    body: [{
      kind: 'p',
      text: 'El estrógeno bajo adelgaza y reseca el tejido vaginal, lo que puede hacer el sexo incómodo o doloroso. La testosterona baja y el cansancio general de esta etapa también pueden bajar el deseo. Ambos son comunes, y ninguno tiene que ser permanente.'
    }, {
      kind: 'h2',
      text: 'Qué ayuda con la sequedad y la incomodidad'
    }, {
      kind: 'ul',
      items: ['Hidratantes vaginales (usados con regularidad, no solo antes del sexo)', 'Lubricante de silicona o base acuosa durante la intimidad', 'Estrógeno vaginal en dosis baja, pregunta a tu médico, es diferente a la TRH sistémica', 'Más tiempo en el juego previo y sin prisas, la excitación suele tomar más tiempo ahora']
    }, {
      kind: 'h2',
      text: 'El lado emocional'
    }, {
      kind: 'p',
      text: 'Una baja en el deseo no es un veredicto sobre tu relación o tu cuerpo. Hablarlo, con tu pareja o con tu médico, suele ayudar más que quedarse callada. Muchas mujeres encuentran que la conexión se profundiza una vez que la conversación sale a la luz.'
    }, {
      kind: 'pull',
      text: '«No estás rota, y no estás sola. Esta es una de las partes más comunes y menos habladas de la transición.»'
    }]
  }, {
    id: 'hot-flashes',
    category: 'Menopausia',
    tone: 'rose',
    title: 'La verdad sobre los sofocos.',
    lede: 'Por qué pasan, por qué se sienten diferentes a las 3 a.m., y la sorprendente lista de cosas que ayudan.',
    readTime: '5 min de lectura',
    published: 'Enero 2026',
    body: [{
      kind: 'p',
      text: 'Un sofoco es tu cerebro malinterpretando la temperatura de tu cuerpo. La fluctuación de estrógeno afecta el centro de termorregulación en tu hipotálamo. El resultado: tu cuerpo cree que tiene calor de más, abre los vasos sanguíneos cerca de la piel, y trata de soltar calor rápido.'
    }, {
      kind: 'h2',
      text: 'Qué vale la pena probar'
    }, {
      kind: 'ul',
      items: ['Ropa en capas y dormitorio fresco, obvio pero real', 'Evita disparadores: vino tinto, comida picante, bebidas muy calientes', 'Respiración pausada (4 inhalando, 6 exhalando) al primer signo de sofoco', 'La TCC para sofocos tiene respaldo clínico', 'Para síntomas severos, habla con tu médico sobre TRH o fezolinetant']
    }]
  }]
};

// Attach real cover photography to each article by id (applies to both languages).
const ELLA_ARTICLE_IMAGES = {
  'protein-after-45': 'assets/photos/nutrition-kitchen.jpg',
  'what-is-perimenopause': 'assets/photos/reflective.jpg',
  'foods-to-avoid': 'assets/photos/nutrition-greens.jpg',
  'sleep-hormones': 'assets/photos/calm-boho.jpg',
  'strength-beginners': 'assets/photos/exercise-situps.jpg',
  'life-after-menopause': 'assets/photos/reflective.jpg',
  'intimacy-and-connection': 'assets/photos/calm-boho.jpg',
  'hot-flashes': 'assets/photos/portrait-terrace.jpg'
};
['en', 'es'].forEach(lng => {
  (ELLA_ARTICLES[lng] || []).forEach(a => {
    a.image = ELLA_ARTICLE_IMAGES[a.id] || null;
  });
});
function getArticles(lang) {
  return ELLA_ARTICLES[lang] || ELLA_ARTICLES.en;
}
function getArticle(id, lang) {
  return getArticles(lang).find(a => a.id === id) || getArticles(lang)[0];
}
window.getArticles = getArticles;
window.getArticle = getArticle;
window.ELLA_ARTICLES = ELLA_ARTICLES;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/screens/articleData.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/tweaks-panel.jsx
try { (() => {
// tweaks-panel.jsx
// Reusable Tweaks shell + form-control helpers.
//
// Owns the host protocol (listens for __activate_edit_mode / __deactivate_edit_mode,
// posts __edit_mode_available / __edit_mode_set_keys / __edit_mode_dismissed) so
// individual prototypes don't re-roll it. Ships a consistent set of controls so you
// don't hand-draw <input type="range">, segmented radios, steppers, etc.
//
// Usage (in an HTML file that loads React + Babel):
//
//   const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
//     "primaryColor": "#D97757",
//     "palette": ["#D97757", "#29261b", "#f6f4ef"],
//     "fontSize": 16,
//     "density": "regular",
//     "dark": false
//   }/*EDITMODE-END*/;
//
//   function App() {
//     const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
//     return (
//       <div style={{ fontSize: t.fontSize, color: t.primaryColor }}>
//         Hello
//         <TweaksPanel>
//           <TweakSection label="Typography" />
//           <TweakSlider label="Font size" value={t.fontSize} min={10} max={32} unit="px"
//                        onChange={(v) => setTweak('fontSize', v)} />
//           <TweakRadio  label="Density" value={t.density}
//                        options={['compact', 'regular', 'comfy']}
//                        onChange={(v) => setTweak('density', v)} />
//           <TweakSection label="Theme" />
//           <TweakColor  label="Primary" value={t.primaryColor}
//                        options={['#D97757', '#2A6FDB', '#1F8A5B', '#7A5AE0']}
//                        onChange={(v) => setTweak('primaryColor', v)} />
//           <TweakColor  label="Palette" value={t.palette}
//                        options={[['#D97757', '#29261b', '#f6f4ef'],
//                                  ['#475569', '#0f172a', '#f1f5f9']]}
//                        onChange={(v) => setTweak('palette', v)} />
//           <TweakToggle label="Dark mode" value={t.dark}
//                        onChange={(v) => setTweak('dark', v)} />
//         </TweaksPanel>
//       </div>
//     );
//   }
//
// ─────────────────────────────────────────────────────────────────────────────

const __TWEAKS_STYLE = `
  .twk-panel{position:fixed;right:16px;bottom:16px;z-index:2147483646;width:280px;
    max-height:calc(100vh - 32px);display:flex;flex-direction:column;
    transform:scale(var(--dc-inv-zoom,1));transform-origin:bottom right;
    background:rgba(250,249,247,.78);color:#29261b;
    -webkit-backdrop-filter:blur(24px) saturate(160%);backdrop-filter:blur(24px) saturate(160%);
    border:.5px solid rgba(255,255,255,.6);border-radius:14px;
    box-shadow:0 1px 0 rgba(255,255,255,.5) inset,0 12px 40px rgba(0,0,0,.18);
    font:11.5px/1.4 ui-sans-serif,system-ui,-apple-system,sans-serif;overflow:hidden}
  .twk-hd{display:flex;align-items:center;justify-content:space-between;
    padding:10px 8px 10px 14px;cursor:move;user-select:none}
  .twk-hd b{font-size:12px;font-weight:600;letter-spacing:.01em}
  .twk-x{appearance:none;border:0;background:transparent;color:rgba(41,38,27,.55);
    width:22px;height:22px;border-radius:6px;cursor:default;font-size:13px;line-height:1}
  .twk-x:hover{background:rgba(0,0,0,.06);color:#29261b}
  .twk-body{padding:2px 14px 14px;display:flex;flex-direction:column;gap:10px;
    overflow-y:auto;overflow-x:hidden;min-height:0;
    scrollbar-width:thin;scrollbar-color:rgba(0,0,0,.15) transparent}
  .twk-body::-webkit-scrollbar{width:8px}
  .twk-body::-webkit-scrollbar-track{background:transparent;margin:2px}
  .twk-body::-webkit-scrollbar-thumb{background:rgba(0,0,0,.15);border-radius:4px;
    border:2px solid transparent;background-clip:content-box}
  .twk-body::-webkit-scrollbar-thumb:hover{background:rgba(0,0,0,.25);
    border:2px solid transparent;background-clip:content-box}
  .twk-row{display:flex;flex-direction:column;gap:5px}
  .twk-row-h{flex-direction:row;align-items:center;justify-content:space-between;gap:10px}
  .twk-lbl{display:flex;justify-content:space-between;align-items:baseline;
    color:rgba(41,38,27,.72)}
  .twk-lbl>span:first-child{font-weight:500}
  .twk-val{color:rgba(41,38,27,.5);font-variant-numeric:tabular-nums}

  .twk-sect{font-size:10px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;
    color:rgba(41,38,27,.45);padding:10px 0 0}
  .twk-sect:first-child{padding-top:0}

  .twk-field{appearance:none;box-sizing:border-box;width:100%;min-width:0;height:26px;padding:0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;
    background:rgba(255,255,255,.6);color:inherit;font:inherit;outline:none}
  .twk-field:focus{border-color:rgba(0,0,0,.25);background:rgba(255,255,255,.85)}
  select.twk-field{padding-right:22px;
    background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'><path fill='rgba(0,0,0,.5)' d='M0 0h10L5 6z'/></svg>");
    background-repeat:no-repeat;background-position:right 8px center}

  .twk-slider{appearance:none;-webkit-appearance:none;width:100%;height:4px;margin:6px 0;
    border-radius:999px;background:rgba(0,0,0,.12);outline:none}
  .twk-slider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;
    width:14px;height:14px;border-radius:50%;background:#fff;
    border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}
  .twk-slider::-moz-range-thumb{width:14px;height:14px;border-radius:50%;
    background:#fff;border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}

  .twk-seg{position:relative;display:flex;padding:2px;border-radius:8px;
    background:rgba(0,0,0,.06);user-select:none}
  .twk-seg-thumb{position:absolute;top:2px;bottom:2px;border-radius:6px;
    background:rgba(255,255,255,.9);box-shadow:0 1px 2px rgba(0,0,0,.12);
    transition:left .15s cubic-bezier(.3,.7,.4,1),width .15s}
  .twk-seg.dragging .twk-seg-thumb{transition:none}
  .twk-seg button{appearance:none;position:relative;z-index:1;flex:1;border:0;
    background:transparent;color:inherit;font:inherit;font-weight:500;min-height:22px;
    border-radius:6px;cursor:default;padding:4px 6px;line-height:1.2;
    overflow-wrap:anywhere}

  .twk-toggle{position:relative;width:32px;height:18px;border:0;border-radius:999px;
    background:rgba(0,0,0,.15);transition:background .15s;cursor:default;padding:0}
  .twk-toggle[data-on="1"]{background:#34c759}
  .twk-toggle i{position:absolute;top:2px;left:2px;width:14px;height:14px;border-radius:50%;
    background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.25);transition:transform .15s}
  .twk-toggle[data-on="1"] i{transform:translateX(14px)}

  .twk-num{display:flex;align-items:center;box-sizing:border-box;min-width:0;height:26px;padding:0 0 0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;background:rgba(255,255,255,.6)}
  .twk-num-lbl{font-weight:500;color:rgba(41,38,27,.6);cursor:ew-resize;
    user-select:none;padding-right:8px}
  .twk-num input{flex:1;min-width:0;height:100%;border:0;background:transparent;
    font:inherit;font-variant-numeric:tabular-nums;text-align:right;padding:0 8px 0 0;
    outline:none;color:inherit;-moz-appearance:textfield}
  .twk-num input::-webkit-inner-spin-button,.twk-num input::-webkit-outer-spin-button{
    -webkit-appearance:none;margin:0}
  .twk-num-unit{padding-right:8px;color:rgba(41,38,27,.45)}

  .twk-btn{appearance:none;height:26px;padding:0 12px;border:0;border-radius:7px;
    background:rgba(0,0,0,.78);color:#fff;font:inherit;font-weight:500;cursor:default}
  .twk-btn:hover{background:rgba(0,0,0,.88)}
  .twk-btn.secondary{background:rgba(0,0,0,.06);color:inherit}
  .twk-btn.secondary:hover{background:rgba(0,0,0,.1)}

  .twk-swatch{appearance:none;-webkit-appearance:none;width:56px;height:22px;
    border:.5px solid rgba(0,0,0,.1);border-radius:6px;padding:0;cursor:default;
    background:transparent;flex-shrink:0}
  .twk-swatch::-webkit-color-swatch-wrapper{padding:0}
  .twk-swatch::-webkit-color-swatch{border:0;border-radius:5.5px}
  .twk-swatch::-moz-color-swatch{border:0;border-radius:5.5px}

  .twk-chips{display:flex;gap:6px}
  .twk-chip{position:relative;appearance:none;flex:1;min-width:0;height:46px;
    padding:0;border:0;border-radius:6px;overflow:hidden;cursor:default;
    box-shadow:0 0 0 .5px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.06);
    transition:transform .12s cubic-bezier(.3,.7,.4,1),box-shadow .12s}
  .twk-chip:hover{transform:translateY(-1px);
    box-shadow:0 0 0 .5px rgba(0,0,0,.18),0 4px 10px rgba(0,0,0,.12)}
  .twk-chip[data-on="1"]{box-shadow:0 0 0 1.5px rgba(0,0,0,.85),
    0 2px 6px rgba(0,0,0,.15)}
  .twk-chip>span{position:absolute;top:0;bottom:0;right:0;width:34%;
    display:flex;flex-direction:column;box-shadow:-1px 0 0 rgba(0,0,0,.1)}
  .twk-chip>span>i{flex:1;box-shadow:0 -1px 0 rgba(0,0,0,.1)}
  .twk-chip>span>i:first-child{box-shadow:none}
  .twk-chip svg{position:absolute;top:6px;left:6px;width:13px;height:13px;
    filter:drop-shadow(0 1px 1px rgba(0,0,0,.3))}
`;

// ── useTweaks ───────────────────────────────────────────────────────────────
// Single source of truth for tweak values. setTweak persists via the host
// (__edit_mode_set_keys → host rewrites the EDITMODE block on disk).
function useTweaks(defaults) {
  const [values, setValues] = React.useState(defaults);
  // Accepts either setTweak('key', value) or setTweak({ key: value, ... }) so a
  // useState-style call doesn't write a "[object Object]" key into the persisted
  // JSON block.
  const setTweak = React.useCallback((keyOrEdits, val) => {
    const edits = typeof keyOrEdits === 'object' && keyOrEdits !== null ? keyOrEdits : {
      [keyOrEdits]: val
    };
    setValues(prev => ({
      ...prev,
      ...edits
    }));
    window.parent.postMessage({
      type: '__edit_mode_set_keys',
      edits
    }, '*');
    // Same-window signal so in-page listeners (deck-stage rail thumbnails)
    // can react — the parent message only reaches the host, not peers.
    window.dispatchEvent(new CustomEvent('tweakchange', {
      detail: edits
    }));
  }, []);
  return [values, setTweak];
}

// ── TweaksPanel ─────────────────────────────────────────────────────────────
// Floating shell. Registers the protocol listener BEFORE announcing
// availability — if the announce ran first, the host's activate could land
// before our handler exists and the toolbar toggle would silently no-op.
// The close button posts __edit_mode_dismissed so the host's toolbar toggle
// flips off in lockstep; the host echoes __deactivate_edit_mode back which
// is what actually hides the panel.
function TweaksPanel({
  title = 'Tweaks',
  children
}) {
  const [open, setOpen] = React.useState(false);
  const dragRef = React.useRef(null);
  const offsetRef = React.useRef({
    x: 16,
    y: 16
  });
  const PAD = 16;
  const clampToViewport = React.useCallback(() => {
    const panel = dragRef.current;
    if (!panel) return;
    const w = panel.offsetWidth,
      h = panel.offsetHeight;
    const maxRight = Math.max(PAD, window.innerWidth - w - PAD);
    const maxBottom = Math.max(PAD, window.innerHeight - h - PAD);
    offsetRef.current = {
      x: Math.min(maxRight, Math.max(PAD, offsetRef.current.x)),
      y: Math.min(maxBottom, Math.max(PAD, offsetRef.current.y))
    };
    panel.style.right = offsetRef.current.x + 'px';
    panel.style.bottom = offsetRef.current.y + 'px';
  }, []);
  React.useEffect(() => {
    if (!open) return;
    clampToViewport();
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', clampToViewport);
      return () => window.removeEventListener('resize', clampToViewport);
    }
    const ro = new ResizeObserver(clampToViewport);
    ro.observe(document.documentElement);
    return () => ro.disconnect();
  }, [open, clampToViewport]);
  React.useEffect(() => {
    const onMsg = e => {
      const t = e?.data?.type;
      if (t === '__activate_edit_mode') setOpen(true);else if (t === '__deactivate_edit_mode') setOpen(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({
      type: '__edit_mode_available'
    }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);
  const dismiss = () => {
    setOpen(false);
    window.parent.postMessage({
      type: '__edit_mode_dismissed'
    }, '*');
  };
  const onDragStart = e => {
    const panel = dragRef.current;
    if (!panel) return;
    const r = panel.getBoundingClientRect();
    const sx = e.clientX,
      sy = e.clientY;
    const startRight = window.innerWidth - r.right;
    const startBottom = window.innerHeight - r.bottom;
    const move = ev => {
      offsetRef.current = {
        x: startRight - (ev.clientX - sx),
        y: startBottom - (ev.clientY - sy)
      };
      clampToViewport();
    };
    const up = () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
  };
  if (!open) return null;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, __TWEAKS_STYLE), /*#__PURE__*/React.createElement("div", {
    ref: dragRef,
    className: "twk-panel",
    "data-omelette-chrome": "",
    style: {
      right: offsetRef.current.x,
      bottom: offsetRef.current.y
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-hd",
    onMouseDown: onDragStart
  }, /*#__PURE__*/React.createElement("b", null, title), /*#__PURE__*/React.createElement("button", {
    className: "twk-x",
    "aria-label": "Close tweaks",
    onMouseDown: e => e.stopPropagation(),
    onClick: dismiss
  }, "\u2715")), /*#__PURE__*/React.createElement("div", {
    className: "twk-body"
  }, children)));
}

// ── Layout helpers ──────────────────────────────────────────────────────────

function TweakSection({
  label,
  children
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "twk-sect"
  }, label), children);
}
function TweakRow({
  label,
  value,
  children,
  inline = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: inline ? 'twk-row twk-row-h' : 'twk-row'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label), value != null && /*#__PURE__*/React.createElement("span", {
    className: "twk-val"
  }, value)), children);
}

// ── Controls ────────────────────────────────────────────────────────────────

function TweakSlider({
  label,
  value,
  min = 0,
  max = 100,
  step = 1,
  unit = '',
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label,
    value: `${value}${unit}`
  }, /*#__PURE__*/React.createElement("input", {
    type: "range",
    className: "twk-slider",
    min: min,
    max: max,
    step: step,
    value: value,
    onChange: e => onChange(Number(e.target.value))
  }));
}
function TweakToggle({
  label,
  value,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-row twk-row-h"
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "twk-toggle",
    "data-on": value ? '1' : '0',
    role: "switch",
    "aria-checked": !!value,
    onClick: () => onChange(!value)
  }, /*#__PURE__*/React.createElement("i", null)));
}
function TweakRadio({
  label,
  value,
  options,
  onChange
}) {
  const trackRef = React.useRef(null);
  const [dragging, setDragging] = React.useState(false);
  // The active value is read by pointer-move handlers attached for the lifetime
  // of a drag — ref it so a stale closure doesn't fire onChange for every move.
  const valueRef = React.useRef(value);
  valueRef.current = value;

  // Segments wrap mid-word once per-segment width runs out. The track is
  // ~248px (280 panel − 28 body pad − 4 seg pad), each button loses 12px
  // to its own padding, and 11.5px system-ui averages ~6.3px/char — so 2
  // options fit ~16 chars each, 3 fit ~10. Past that (or >3 options), fall
  // back to a dropdown rather than wrap.
  const labelLen = o => String(typeof o === 'object' ? o.label : o).length;
  const maxLen = options.reduce((m, o) => Math.max(m, labelLen(o)), 0);
  const fitsAsSegments = maxLen <= ({
    2: 16,
    3: 10
  }[options.length] ?? 0);
  if (!fitsAsSegments) {
    // <select> emits strings — map back to the original option value so the
    // fallback stays type-preserving (numbers, booleans) like the segment path.
    const resolve = s => {
      const m = options.find(o => String(typeof o === 'object' ? o.value : o) === s);
      return m === undefined ? s : typeof m === 'object' ? m.value : m;
    };
    return /*#__PURE__*/React.createElement(TweakSelect, {
      label: label,
      value: value,
      options: options,
      onChange: s => onChange(resolve(s))
    });
  }
  const opts = options.map(o => typeof o === 'object' ? o : {
    value: o,
    label: o
  });
  const idx = Math.max(0, opts.findIndex(o => o.value === value));
  const n = opts.length;
  const segAt = clientX => {
    const r = trackRef.current.getBoundingClientRect();
    const inner = r.width - 4;
    const i = Math.floor((clientX - r.left - 2) / inner * n);
    return opts[Math.max(0, Math.min(n - 1, i))].value;
  };
  const onPointerDown = e => {
    setDragging(true);
    const v0 = segAt(e.clientX);
    if (v0 !== valueRef.current) onChange(v0);
    const move = ev => {
      if (!trackRef.current) return;
      const v = segAt(ev.clientX);
      if (v !== valueRef.current) onChange(v);
    };
    const up = () => {
      setDragging(false);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("div", {
    ref: trackRef,
    role: "radiogroup",
    onPointerDown: onPointerDown,
    className: dragging ? 'twk-seg dragging' : 'twk-seg'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-seg-thumb",
    style: {
      left: `calc(2px + ${idx} * (100% - 4px) / ${n})`,
      width: `calc((100% - 4px) / ${n})`
    }
  }), opts.map(o => /*#__PURE__*/React.createElement("button", {
    key: o.value,
    type: "button",
    role: "radio",
    "aria-checked": o.value === value
  }, o.label))));
}
function TweakSelect({
  label,
  value,
  options,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("select", {
    className: "twk-field",
    value: value,
    onChange: e => onChange(e.target.value)
  }, options.map(o => {
    const v = typeof o === 'object' ? o.value : o;
    const l = typeof o === 'object' ? o.label : o;
    return /*#__PURE__*/React.createElement("option", {
      key: v,
      value: v
    }, l);
  })));
}
function TweakText({
  label,
  value,
  placeholder,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("input", {
    className: "twk-field",
    type: "text",
    value: value,
    placeholder: placeholder,
    onChange: e => onChange(e.target.value)
  }));
}
function TweakNumber({
  label,
  value,
  min,
  max,
  step = 1,
  unit = '',
  onChange
}) {
  const clamp = n => {
    if (min != null && n < min) return min;
    if (max != null && n > max) return max;
    return n;
  };
  const startRef = React.useRef({
    x: 0,
    val: 0
  });
  const onScrubStart = e => {
    e.preventDefault();
    startRef.current = {
      x: e.clientX,
      val: value
    };
    const decimals = (String(step).split('.')[1] || '').length;
    const move = ev => {
      const dx = ev.clientX - startRef.current.x;
      const raw = startRef.current.val + dx * step;
      const snapped = Math.round(raw / step) * step;
      onChange(clamp(Number(snapped.toFixed(decimals))));
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-num"
  }, /*#__PURE__*/React.createElement("span", {
    className: "twk-num-lbl",
    onPointerDown: onScrubStart
  }, label), /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: value,
    min: min,
    max: max,
    step: step,
    onChange: e => onChange(clamp(Number(e.target.value)))
  }), unit && /*#__PURE__*/React.createElement("span", {
    className: "twk-num-unit"
  }, unit));
}

// Relative-luminance contrast pick — checkmarks drawn over a swatch need to
// read on both #111 and #fafafa without per-option configuration. Hex input
// only (#rgb / #rrggbb); named or rgb()/hsl() colors fall through to "light".
function __twkIsLight(hex) {
  const h = String(hex).replace('#', '');
  const x = h.length === 3 ? h.replace(/./g, c => c + c) : h.padEnd(6, '0');
  const n = parseInt(x.slice(0, 6), 16);
  if (Number.isNaN(n)) return true;
  const r = n >> 16 & 255,
    g = n >> 8 & 255,
    b = n & 255;
  return r * 299 + g * 587 + b * 114 > 148000;
}
const __TwkCheck = ({
  light
}) => /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 14 14",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("path", {
  d: "M3 7.2 5.8 10 11 4.2",
  fill: "none",
  strokeWidth: "2.2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  stroke: light ? 'rgba(0,0,0,.78)' : '#fff'
}));

// TweakColor — curated color/palette picker. Each option is either a single
// hex string or an array of 1-5 hex strings; the card adapts — a lone color
// renders solid, a palette renders colors[0] as the hero (left ~2/3) with the
// rest stacked in a sharp column on the right. onChange emits the
// option in the shape it was passed (string stays string, array stays array).
// Without options it falls back to the native color input for back-compat.
function TweakColor({
  label,
  value,
  options,
  onChange
}) {
  if (!options || !options.length) {
    return /*#__PURE__*/React.createElement("div", {
      className: "twk-row twk-row-h"
    }, /*#__PURE__*/React.createElement("div", {
      className: "twk-lbl"
    }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("input", {
      type: "color",
      className: "twk-swatch",
      value: value,
      onChange: e => onChange(e.target.value)
    }));
  }
  // Native <input type=color> emits lowercase hex per the HTML spec, so
  // compare case-insensitively. String() guards JSON.stringify(undefined),
  // which returns the primitive undefined (no .toLowerCase).
  const key = o => String(JSON.stringify(o)).toLowerCase();
  const cur = key(value);
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-chips",
    role: "radiogroup"
  }, options.map((o, i) => {
    const colors = Array.isArray(o) ? o : [o];
    const [hero, ...rest] = colors;
    const sup = rest.slice(0, 4);
    const on = key(o) === cur;
    return /*#__PURE__*/React.createElement("button", {
      key: i,
      type: "button",
      className: "twk-chip",
      role: "radio",
      "aria-checked": on,
      "data-on": on ? '1' : '0',
      "aria-label": colors.join(', '),
      title: colors.join(' · '),
      style: {
        background: hero
      },
      onClick: () => onChange(o)
    }, sup.length > 0 && /*#__PURE__*/React.createElement("span", null, sup.map((c, j) => /*#__PURE__*/React.createElement("i", {
      key: j,
      style: {
        background: c
      }
    }))), on && /*#__PURE__*/React.createElement(__TwkCheck, {
      light: __twkIsLight(hero)
    }));
  })));
}
function TweakButton({
  label,
  onClick,
  secondary = false
}) {
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: secondary ? 'twk-btn secondary' : 'twk-btn',
    onClick: onClick
  }, label);
}
Object.assign(window, {
  useTweaks,
  TweaksPanel,
  TweakSection,
  TweakRow,
  TweakSlider,
  TweakToggle,
  TweakRadio,
  TweakSelect,
  TweakText,
  TweakNumber,
  TweakColor,
  TweakButton
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/tweaks-panel.jsx", error: String((e && e.message) || e) }); }

// workbook-app.js
try { (() => {
/* Ella Content Workbook — renderer, autosave, and export. Vanilla JS. */
(function () {
  var STORE = 'ella_wb_v1__';
  var flags = {
    source: {
      txt: 'NEEDS A SOURCE',
      cls: 'flag-source'
    },
    real: {
      txt: 'MUST BE REAL',
      cls: 'flag-real'
    },
    scope: {
      txt: 'PENDING SCOPE (Q1)',
      cls: 'flag-scope'
    }
  };
  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }
  function esc(s) {
    return (s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  function key(id) {
    return STORE + id;
  }
  var allSlots = [];
  WORKBOOK.forEach(function (sec) {
    sec.slots.forEach(function (s) {
      allSlots.push(s);
    });
  });
  function filledCount() {
    var n = 0;
    allSlots.forEach(function (s) {
      if ((localStorage.getItem(key(s.id)) || '').trim()) n++;
    });
    return n;
  }
  function updateProgress() {
    var done = filledCount(),
      total = allSlots.length;
    var pct = Math.round(done / total * 100);
    document.getElementById('wb-count').textContent = done + ' / ' + total + ' slots written';
    document.getElementById('wb-bar-fill').style.width = pct + '%';
  }
  function autosize(ta) {
    ta.style.height = 'auto';
    ta.style.height = Math.max(ta.scrollHeight, 44) + 'px';
  }
  function render() {
    var root = document.getElementById('wb-sections');
    WORKBOOK.forEach(function (sec, si) {
      var secEl = el('section', 'wb-sec');
      secEl.id = 'sec-' + si;
      var head = el('div', 'wb-sec-head');
      head.appendChild(el('h2', null, esc(sec.page)));
      if (sec.blurb) head.appendChild(el('p', 'wb-sec-blurb', esc(sec.blurb)));
      secEl.appendChild(head);
      sec.slots.forEach(function (slot) {
        var card = el('div', 'wb-slot');
        var top = el('div', 'wb-slot-top');
        top.appendChild(el('span', 'wb-slot-label', esc(slot.label)));
        if (slot.flag && flags[slot.flag]) {
          top.appendChild(el('span', 'wb-flag ' + flags[slot.flag].cls, flags[slot.flag].txt));
        }
        card.appendChild(top);
        if (slot.guide) card.appendChild(el('p', 'wb-guide', esc(slot.guide)));
        if (slot.current) {
          var cur = el('div', 'wb-current');
          cur.appendChild(el('span', 'wb-current-tag', 'On the site now'));
          cur.appendChild(el('div', 'wb-current-text', esc(slot.current).replace(/\n/g, '<br>')));
          card.appendChild(cur);
        }
        var ta = el('textarea', 'wb-input');
        ta.placeholder = 'Your words…';
        ta.value = localStorage.getItem(key(slot.id)) || '';
        ta.addEventListener('input', function () {
          localStorage.setItem(key(slot.id), ta.value);
          autosize(ta);
          updateProgress();
        });
        card.appendChild(ta);
        secEl.appendChild(card);
        // size after insert
        requestAnimationFrame(function () {
          autosize(ta);
        });
      });
      root.appendChild(secEl);
    });
    updateProgress();
  }
  function buildExport() {
    var out = ['ELLA — CONTENT WORKBOOK', 'Filled: ' + filledCount() + ' / ' + allSlots.length, ''];
    WORKBOOK.forEach(function (sec) {
      out.push('========================================');
      out.push(sec.page.toUpperCase());
      out.push('========================================');
      sec.slots.forEach(function (s) {
        var v = (localStorage.getItem(key(s.id)) || '').trim();
        out.push('');
        out.push('— ' + s.label + (s.flag ? '  [' + (flags[s.flag] ? flags[s.flag].txt : s.flag) + ']' : ''));
        out.push(v ? v : '(not yet written)');
      });
      out.push('');
    });
    return out.join('\n');
  }
  function flash(msg) {
    var t = document.getElementById('wb-toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(flash._t);
    flash._t = setTimeout(function () {
      t.classList.remove('show');
    }, 2200);
  }
  document.addEventListener('DOMContentLoaded', function () {
    render();
    document.getElementById('wb-copy').addEventListener('click', function () {
      var text = buildExport();
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () {
          flash('Copied! Paste it back to me in the chat.');
        }, function () {
          fallbackCopy(text);
        });
      } else {
        fallbackCopy(text);
      }
    });
    function fallbackCopy(text) {
      var ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand('copy');
        flash('Copied! Paste it back to me in the chat.');
      } catch (e) {
        flash('Press Ctrl/Cmd+C to copy.');
      }
      document.body.removeChild(ta);
    }
    document.getElementById('wb-download').addEventListener('click', function () {
      var blob = new Blob([buildExport()], {
        type: 'text/plain'
      });
      var a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'ella-content.txt';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      flash('Downloaded ella-content.txt');
    });
    document.getElementById('wb-clear').addEventListener('click', function () {
      if (!confirm('Clear everything you\u2019ve written here? This can\u2019t be undone.')) return;
      allSlots.forEach(function (s) {
        localStorage.removeItem(key(s.id));
      });
      document.querySelectorAll('.wb-input').forEach(function (ta) {
        ta.value = '';
        autosize(ta);
      });
      updateProgress();
      flash('Cleared.');
    });
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "workbook-app.js", error: String((e && e.message) || e) }); }

// workbook-data.js
try { (() => {
/* Ella Content Workbook — slot data.
   Each section maps to a place on the site. Each slot has:
   id      stable key (used to save your words locally)
   label   what this piece of text is
   guide   how long + what tone (a guide, not a rule)
   current the placeholder that's on the site right now (reference only)
   long    true → big multi-line field
   flag    optional banner: 'source' (needs a citation) | 'real' (must be real, not invented) | 'scope' (pending the menopause-vs-wellness decision)
*/
window.WORKBOOK = [{
  page: 'Global (appears on every page)',
  blurb: 'The little persistent bits — the top strip, the footer, the newsletter.',
  slots: [{
    id: 'promo',
    label: 'Rotating top strip',
    long: true,
    guide: '4 short nudges, ~5–9 words each, each ending in an action. These rotate at the very top of every page.',
    current: 'New: Free doctor-visit checklist (PDF)\nGet Jessica\u2019s weekly note in your inbox\nTake the 5-question check-in\nAvailable in English / Espa\u00f1ol'
  }, {
    id: 'footer_tagline',
    label: 'Footer tagline',
    guide: 'One warm line, ~8–14 words. Your mission in a single breath.',
    current: 'Women supporting women through every hormonal stage of life.'
  }, {
    id: 'newsletter',
    label: 'Newsletter block (title · subtitle · button)',
    long: true,
    guide: 'Title ~3–5 words, subtitle ~4–8 words, button 1–2 words. This is your main list-building moment.',
    current: 'Get the weekly note.\nHonest, useful, never spammy.\nSubscribe'
  }]
}, {
  page: 'Homepage — Hero',
  blurb: 'The first screen. ~90% of the decision to stay happens here. Every word earns its place.',
  slots: [{
    id: 'hero_eyebrow',
    label: 'Eyebrow (tiny label above the headline)',
    guide: '2–4 words, ALL CAPS. Your positioning in a breath. (Currently "BY WOMEN, FOR WOMEN".)',
    current: 'BY WOMEN, FOR WOMEN'
  }, {
    id: 'hero_h1',
    label: 'Main headline',
    guide: '3–6 words. The emotional hook — what she feels, not what you sell. One word can be italic for emphasis.',
    current: 'You\u2019re not imagining it.'
  }, {
    id: 'hero_sub',
    label: 'Sub-headline',
    guide: '1–2 sentences, ~25–40 words. What Ella is + who it\u2019s for. Plain, calm, specific.',
    current: 'Honest, plainspoken information about menopause, nutrition, supplements, exercise, mental health, and the questions to ask your doctor. Built by a physician assistant for women who deserve answers.'
  }, {
    id: 'hero_afford',
    label: 'Affordability line (the highlighted quote)',
    guide: '1 sentence. The accessibility promise.',
    current: 'Everything you need to know about menopause without breaking the bank. Built to be affordable and accessible.'
  }, {
    id: 'hero_ctas',
    label: 'The two buttons',
    guide: 'Two labels, 1–3 words each. One primary action, one softer.',
    current: 'Start reading  /  Meet Jessica'
  }, {
    id: 'hero_cred',
    label: 'Credential line (under the buttons)',
    flag: 'source',
    guide: 'Factual, verifiable credentials only. This is the trust anchor — keep it true.',
    current: 'Jessica Zavala, PA-C · OB-GYN background · Women\u2019s wellness certificate'
  }]
}, {
  page: 'Homepage — Why this matters',
  blurb: 'The "why should I care" section. Sets the stakes for menopause specifically.',
  slots: [{
    id: 'why_eyebrow',
    label: 'Eyebrow',
    guide: '2–4 words, caps.',
    current: 'WHY THIS MATTERS'
  }, {
    id: 'why_h2',
    label: 'Section headline',
    guide: '1 line, can wrap to two. A reframe or a truth. Italic emphasis allowed.',
    current: 'Menopause isn\u2019t the end of anything. It just doesn\u2019t get talked about.'
  }, {
    id: 'why_p1',
    label: 'Paragraph 1',
    long: true,
    flag: 'source',
    guide: '~40–60 words. The problem. Any statistic here needs a source (see the Sources page).',
    current: 'About half of all women will go through menopause — and yet most medical curricula spend less than an hour on it. The result: millions of women navigate a decade of hormonal change with almost no real guidance.'
  }, {
    id: 'why_p2',
    label: 'Paragraph 2',
    long: true,
    guide: '~40–60 words. The turn toward hope / agency. End on what Ella does.',
    current: 'Knowing what\u2019s happening, what\u2019s worth doing about it, and what questions to ask your doctor — that\u2019s the difference between feeling lost and feeling in charge. Ella is for the second one.'
  }, {
    id: 'why_stats',
    label: 'Two stats',
    long: true,
    flag: 'source',
    guide: 'Two punchy numbers + labels. EACH NEEDS A SOURCE. Replace with stats you can stand behind.',
    current: '7–14 yrs — Average length of perimenopause\nless than 1 hour — Typical medical-school coverage of menopause'
  }]
}, {
  page: 'Homepage — What we cover (the 6 pillars)',
  blurb: 'The content map. If Ella becomes menopause-only, some of these get reframed or cut (see your Q1 decision).',
  slots: [{
    id: 'pillars_eyebrow',
    label: 'Eyebrow',
    guide: '2–4 words, caps.',
    current: 'WHAT WE COVER'
  }, {
    id: 'pillars_h2',
    label: 'Section headline',
    guide: '1 short line.',
    current: 'Everything in one trusted place.'
  }, {
    id: 'pillar_nutrition',
    label: 'Pillar 1 — Nutrition (title + 1 line)',
    guide: 'Title 1–2 words, description ~12–18 words. Frame it through the menopause lens.',
    current: 'Nutrition — Foods to include, protein needs during menopause, healthier swaps. No meal plans, just real information.'
  }, {
    id: 'pillar_supplements',
    label: 'Pillar 2 — Supplements (title + 1 line)',
    flag: 'scope',
    guide: 'Same shape. Note: this is the most likely future revenue area — keep it honest, "what\u2019s worth it" not "buy this".',
    current: 'Supplements — Omega-3, Vit D, Vit K, collagen, magnesium glycinate, fiber. What\u2019s worth taking, with links to buy.'
  }, {
    id: 'pillar_exercise',
    label: 'Pillar 3 — Exercise (title + 1 line)',
    guide: 'Same shape.',
    current: 'Exercise — Strength training, walking, yoga. Light weights count. Less cardio, more muscle.'
  }, {
    id: 'pillar_mental',
    label: 'Pillar 4 — Mental health (title + 1 line)',
    guide: 'Same shape.',
    current: 'Mental health — Support groups, meetups, resource links. You\u2019re not alone, and the data backs that up.'
  }, {
    id: 'pillar_skin',
    label: 'Pillar 5 — Skin care (title + 1 line)',
    flag: 'scope',
    guide: 'Pending Q1: if Ella is menopause-only, this may get cut or folded into another pillar.',
    current: 'Skin care — What hormonal changes do to your skin, and what actually helps.'
  }, {
    id: 'pillar_hormones',
    label: 'Pillar 6 — Hormonal therapy (title + 1 line)',
    guide: 'Same shape. Keep the "options, not endorsements" stance.',
    current: 'Hormonal therapy — HRT options explained in plain English. No endorsements, just clarity.'
  }]
}, {
  page: 'Homepage — Check-in banner',
  blurb: 'Invites her into the quiz.',
  slots: [{
    id: 'checkin_eyebrow',
    label: 'Eyebrow',
    guide: '2–3 words, caps.',
    current: 'PERSONAL CHECK-IN'
  }, {
    id: 'checkin_h2',
    label: 'Headline',
    guide: 'A question or invitation, ~3–6 words.',
    current: 'Not sure where to start?'
  }, {
    id: 'checkin_p',
    label: 'Paragraph',
    long: true,
    guide: '~20–30 words. What the quiz does and why it\u2019s safe (no score, no judgment).',
    current: 'Answer a few quick questions and we\u2019ll point you to the right reading, based on what you\u2019re actually experiencing.'
  }, {
    id: 'checkin_btn',
    label: 'Button label',
    guide: '2–4 words.',
    current: 'Take the check-in'
  }]
}, {
  page: 'Homepage — Work with Jessica (consultation)',
  blurb: 'The soft sell: a 15-minute call. Keep low-pressure.',
  slots: [{
    id: 'consult_eyebrow',
    label: 'Eyebrow',
    guide: '2–3 words, caps.',
    current: 'WORK WITH ME'
  }, {
    id: 'consult_h2',
    label: 'Headline',
    guide: '~4–8 words. Name the offer plainly.',
    current: 'Book a 15-minute wellness consultation.'
  }, {
    id: 'consult_p',
    label: 'Paragraph',
    long: true,
    guide: '~30–45 words. What the call is, what it isn\u2019t. No pressure.',
    current: 'A short, no-pressure call with Jessica to talk through your symptoms, your questions, and where to go next. No commitment, just clarity.'
  }, {
    id: 'consult_list',
    label: 'Three bullet points',
    long: true,
    guide: 'Three short outcomes, ~4–7 words each.',
    current: 'Personalized guidance for your stage\nWhat to ask your own doctor\nWhere to start, without the overwhelm'
  }]
}, {
  page: 'Homepage — Testimonials',
  blurb: 'Social proof. These build or break trust instantly.',
  slots: [{
    id: 'testi_eyebrow',
    label: 'Eyebrow',
    guide: '2–5 words, caps.',
    current: 'IN THEIR OWN WORDS'
  }, {
    id: 'testi_h2',
    label: 'Headline',
    guide: '~2–4 words.',
    current: 'Feeling seen, finally.'
  }, {
    id: 'testi_quotes',
    label: 'The quotes',
    long: true,
    flag: 'real',
    guide: 'These are INVENTED right now. Use only REAL quotes (with permission). One per line: "quote" — First name L., age. Start with 2–3 real ones; better few-and-true than many-and-fake.',
    current: '"For the first time I feel like I have real information." — Marta R., 52\n"I brought the list to my OB-GYN and we had a real conversation." — Elena G., 48\n"Having it in Spanish makes all the difference." — Carolina M., 50\n"I didn\u2019t feel judged. I felt heard." — Patricia D., 55\n"The check-in helped me understand where I am." — Lorena S., 46'
  }]
}, {
  page: 'Homepage — Everything you need (link grid)',
  blurb: 'The closing directory of quick jumps. Pure navigation.',
  slots: [{
    id: 'info_eyebrow',
    label: 'Eyebrow',
    guide: '2–4 words, caps.',
    current: 'EVERYTHING YOU NEED'
  }, {
    id: 'info_h2',
    label: 'Headline',
    guide: '~3–5 words.',
    current: 'The information you need.'
  }, {
    id: 'info_cols',
    label: 'Three columns (title + link labels)',
    long: true,
    guide: 'Three groupings, each a title + 4–5 link labels. These should mirror your real sections.',
    current: 'Nutrition & exercise: Protein after 45 · Healthier swaps · Strength training for beginners · Yoga for mental health\nPeri/Menopause: Hormonal therapy options · OB-GYN visit checklist · Find a specialist · Supplements to know\nReproductive health: HPV, what to know · Screening schedule · Symptoms not to brush off · Skin care and hormones'
  }]
}, {
  page: 'The Check-in Quiz',
  blurb: '5 questions → a personalized reading list. Tone: gentle, no score, no diagnosis.',
  slots: [{
    id: 'quiz_intro',
    label: 'Quiz intro (title + subtitle)',
    long: true,
    guide: 'Title ~4–6 words, subtitle ~15–25 words. Reassure: short, no judgment.',
    current: 'A short, gentle check-in.\nFive quick questions. No score, no judgment, just a clearer picture of what stage your body is in and what to read next.'
  }, {
    id: 'quiz_q1',
    label: 'Q1 — Stage (question + 5 options)',
    long: true,
    guide: 'Question + 5 options, one per line. Keep it kind and uncertain-friendly.',
    current: 'Where are you in your journey?\n• My periods are still regular\n• My periods are changing or irregular\n• It\u2019s been 12+ months since my last period\n• I\u2019ve had surgical or medical menopause\n• I\u2019m not sure where I am'
  }, {
    id: 'quiz_q2',
    label: 'Q2 — Symptoms (question + 8 options, multi-select)',
    long: true,
    guide: 'Question + up to 8 options + a "none" option. One per line.',
    current: 'Which of these have you noticed lately?\n• Hot flashes or night sweats\n• Sleep changes or insomnia\n• Mood shifts, anxiety, or low mood\n• Brain fog or memory lapses\n• Irregular or heavy periods\n• Vaginal dryness or changes in libido\n• Joint aches or weight changes\n• None of these right now'
  }, {
    id: 'quiz_q3',
    label: 'Q3 — Daily impact (question + 4 options)',
    long: true,
    guide: 'Question + 4 options.',
    current: 'How much is this affecting your daily life?\n• Barely, I\u2019m mostly curious\n• Some days are harder than others\n• A lot, it\u2019s hard to ignore\n• I\u2019m honestly not sure'
  }, {
    id: 'quiz_q4',
    label: 'Q4 — Goals (question + 6 options, multi-select)',
    long: true,
    guide: 'Question + 6 options.',
    current: 'What would feel most helpful right now?\n• Understanding what\u2019s happening to my body\n• Nutrition and exercise that fit this stage\n• Knowing which supplements are worth it\n• Learning about hormone therapy options\n• Knowing what to ask my doctor\n• Feeling less alone in it'
  }, {
    id: 'quiz_q5',
    label: 'Q5 — Doctor history (question + 4 options)',
    long: true,
    guide: 'Question + 4 options.',
    current: 'Have you talked to a doctor about this?\n• Yes, and it was helpful\n• Yes, but I felt dismissed\n• Not yet\n• No, I\u2019m not sure how to bring it up'
  }, {
    id: 'quiz_result',
    label: 'Results headline + disclaimer',
    long: true,
    flag: 'source',
    guide: 'Headline ~5–8 words. Keep the medical disclaimer (general info, not advice).',
    current: 'Here\u2019s a starting place, just for you.\n[Disclaimer] This is general information, not medical advice or a diagnosis. For your specific situation, talk with your own doctor.'
  }]
}, {
  page: 'About Jessica',
  blurb: 'The founder page. For this audience, this page is the trust engine. Write it in first person.',
  slots: [{
    id: 'about_eyebrow',
    label: 'Eyebrow',
    guide: '2–4 words, caps.',
    current: 'MEET THE FOUNDER'
  }, {
    id: 'about_h1',
    label: 'Headline',
    guide: 'A warm hello, ~2–4 words.',
    current: 'Hi, I\u2019m Jessica.'
  }, {
    id: 'about_lede',
    label: 'Opening paragraph',
    long: true,
    guide: '~40–60 words. Who you are + the moment that made you build Ella.',
    current: 'I\u2019m a physician assistant with an OB-GYN background. I built Ella because, over and over, I watched women in their forties and fifties walk into the clinic exhausted, scared, and without answers. You shouldn\u2019t have to piece this together alone.'
  }, {
    id: 'about_creds',
    label: 'Credentials (list)',
    long: true,
    flag: 'source',
    guide: 'Real, verifiable credentials only. One per line.',
    current: 'Physician Assistant, Certified (PA-C)\nClinical training in obstetrics and gynecology\nWomen\u2019s Wellness certificate\nYears of personal research in women\u2019s hormonal health'
  }, {
    id: 'about_why',
    label: '"Why Ella" paragraph',
    long: true,
    flag: 'source',
    guide: '~40–60 words. The gap Ella fills. (Stat about med-school coverage needs a source.)',
    current: 'Most medical curricula spend under an hour on menopause. That means millions of women are navigating a decade of hormonal change with almost no guidance. That gap is exactly why Ella exists.'
  }, {
    id: 'about_promise',
    label: 'Your promise (pull-quote)',
    long: true,
    guide: '1 sentence, quotable. Your core stance.',
    current: 'My promise is simple: honest information, no alarmism, no selling you anything you don\u2019t need.'
  }, {
    id: 'about_isnt',
    label: '"What Ella isn\u2019t" paragraph',
    long: true,
    guide: '~30–45 words. Sets boundaries: not a doctor, no diagnosis, no endorsements.',
    current: 'Ella doesn\u2019t replace your doctor. It doesn\u2019t diagnose. It doesn\u2019t endorse any specific brand, hormone protocol, or therapy. What it does: help you understand your options and walk into your next appointment with the right questions.'
  }, {
    id: 'about_contact',
    label: 'Contact line + email',
    flag: 'real',
    guide: 'One line + a real email address.',
    current: 'Question, idea, or collaboration? Reach me at jessica@ellahealth.com'
  }]
}, {
  page: 'Articles (6)',
  blurb: 'Each article = a title, a one-line lede, and the body. Rewrite the body in your voice — aim for ~4–8 short sections with one pull-quote. Any number/claim needs a source.',
  slots: [{
    id: 'art_protein',
    label: 'Article — Protein after 45 (Nutrition)',
    long: true,
    flag: 'source',
    guide: 'Title + lede + body. Current sections: How much do you need · Foods to add this week. The protein numbers need sources.',
    current: 'Title: Protein after 45: why it suddenly matters so much.\nLede: Your body starts losing muscle faster than before, and protein is the single most useful tool to slow it down.'
  }, {
    id: 'art_peri',
    label: 'Article — What is perimenopause (Perimenopause)',
    long: true,
    flag: 'source',
    guide: 'Title + lede + body. Current sections: The hormone shift in plain English · Common signs.',
    current: 'Title: What is perimenopause, really?\nLede: The years before menopause are often the loudest. Here\u2019s what\u2019s actually happening, when it usually starts, and what to expect.'
  }, {
    id: 'art_swaps',
    label: 'Article — Five food swaps (Nutrition)',
    long: true,
    guide: 'Title + lede + body. List of 5 swaps.',
    current: 'Title: Five food swaps your hormones will thank you for.\nLede: Small changes, not a meal plan. Five swaps that nudge your nutrition in the right direction.'
  }, {
    id: 'art_sleep',
    label: 'Article — Sleep & hormones (Mental health)',
    long: true,
    flag: 'source',
    guide: 'Title + lede + body. Keep claims sourced.',
    current: 'Title: Sleep, hormones, and what actually helps.\nLede: Sleep changes in perimenopause are real, frustrating, and fixable.'
  }, {
    id: 'art_strength',
    label: 'Article — Strength training for beginners (Exercise)',
    long: true,
    guide: 'Title + lede + body.',
    current: 'Title: Strength training when you\u2019ve never lifted before.\nLede: You don\u2019t need a gym, a coach, or any equipment to start.'
  }, {
    id: 'art_hotflash',
    label: 'Article — The truth about hot flashes (Perimenopause)',
    long: true,
    flag: 'source',
    guide: 'Title + lede + body.',
    current: 'Title: The truth about hot flashes.\nLede: Why they happen, why they feel different at 3 a.m., and the surprisingly long menu of things that help.'
  }]
}, {
  page: 'Other pages (longer — outline these)',
  blurb: 'These hold more content. For now, give me the headline + the list of items/sections you want; we\u2019ll draft the bodies together.',
  slots: [{
    id: 'sec_supplements',
    label: 'Supplements hub',
    long: true,
    flag: 'scope',
    guide: 'Intro headline + which supplements to feature + your stance on each. (Future revenue area — keep it "what\u2019s worth it".)',
    current: 'Currently lists: Omega-3, Vitamin D, Vitamin K, collagen, magnesium glycinate, fiber — each with a "why", dosing notes, and research backing.'
  }, {
    id: 'sec_hormones',
    label: 'Hormonal therapy page',
    long: true,
    flag: 'source',
    guide: 'Intro headline + the options you want to explain. Keep "options, not endorsements". Link authoritative sources.',
    current: 'Currently: explains HRT options + external links, framed as options-only, never endorsing.'
  }, {
    id: 'sec_doctor',
    label: 'Doctor-visit checklist (printable)',
    long: true,
    guide: 'The actual questions you want women to bring to their OB-GYN. This is a flagship freebie — make it genuinely useful.',
    current: 'Currently: a printable/downloadable list covering perimenopause, HRT options, and finding a menopause specialist.'
  }, {
    id: 'sec_cancer',
    label: 'Cancer & HPV page',
    long: true,
    flag: 'scope',
    guide: 'PENDING your Q1 scope call. If Ella stays menopause-only, this likely gets cut or folded into a single "screenings still matter" article.',
    current: 'Currently: a full screen on reproductive cancers, HPV, screening, and where to learn more.'
  }]
}];
})(); } catch (e) { __ds_ns.__errors.push({ path: "workbook-data.js", error: String((e && e.message) || e) }); }

__ds_ns.CommunityBanner = __ds_scope.CommunityBanner;

__ds_ns.FeaturedIn = __ds_scope.FeaturedIn;

__ds_ns.Footer = __ds_scope.Footer;

__ds_ns.Header = __ds_scope.Header;

__ds_ns.Icons = __ds_scope.Icons;

__ds_ns.InfoLinks = __ds_scope.InfoLinks;

__ds_ns.Photo = __ds_scope.Photo;

__ds_ns.PromoBar = __ds_scope.PromoBar;

__ds_ns.SvgAssets = __ds_scope.SvgAssets;

__ds_ns.Testimonials = __ds_scope.Testimonials;

__ds_ns.AboutJessica = __ds_scope.AboutJessica;

__ds_ns.ArticleView = __ds_scope.ArticleView;

__ds_ns.ArticlesHub = __ds_scope.ArticlesHub;

__ds_ns.AskYourDoctor = __ds_scope.AskYourDoctor;

__ds_ns.AwarenessQuiz = __ds_scope.AwarenessQuiz;

__ds_ns.Homepage = __ds_scope.Homepage;

__ds_ns.HormonalTherapy = __ds_scope.HormonalTherapy;

__ds_ns.NutritionHub = __ds_scope.NutritionHub;

__ds_ns.ReproductiveHealth = __ds_scope.ReproductiveHealth;

__ds_ns.SupplementsHub = __ds_scope.SupplementsHub;

})();

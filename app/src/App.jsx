import { Suspense, lazy, useEffect, useState } from 'react';
import { LangProvider, useLang } from './i18n/lang';
import { Nav } from './ui/Nav';
import { Footer } from './ui/Footer';
import { Ejercicio, Hero, Nutricion, Recursos, SaludMental, Sobre, Suplementos, WhyBand } from './sections';
import { ArticlesHub, ArticleView, DoctorChecklist, Hormones, Quiz, Reproductive } from './routes';
import { useScrollScene } from './hooks/useScrollScene';
import { useReveal } from './hooks/useReveal';
import { qualityTier } from './hooks/useQualityTier';
import { onSectionChange, sceneState } from './scene/sceneState';
import { THEMES } from './themes';

// The whole WebGL stack is code-split — on the `low` tier it never downloads.
const SceneRoot = lazy(() => import('./scene/SceneRoot').then((m) => ({ default: m.SceneRoot })));

const DEEP_ROUTES = ['articles', 'article', 'quiz', 'doctor', 'hormones', 'cancer'];

function Shell() {
  const { isEs } = useLang();
  const [route, setRoute] = useState('home');
  const [articleId, setArticleId] = useState('protein-after-45');
  const [tier, setTier] = useState('low');

  // Tier detection touches the DOM, so it waits for mount. Until then the CSS
  // fallback background is what's on screen.
  useEffect(() => setTier(qualityTier()), []);

  const isHome = route === 'home';
  useScrollScene(isHome);
  useReveal([route, isEs]);

  // The scene dims while a deep page is open — that's a reading surface.
  useEffect(() => {
    sceneState.idle = !isHome;
  }, [isHome]);

  // Drives the CSS-only fallback palette.
  useEffect(
    () =>
      onSectionChange((i) => {
        document.documentElement.dataset.section = THEMES[i]?.id || 'hero';
      }),
    []
  );

  useEffect(() => {
    if (!isHome) window.scrollTo({ top: 0, behavior: 'instant' });
  }, [route, isHome]);

  function goHome(sectionId) {
    setRoute('home');
    if (!sectionId) return;
    // Wait for the home tree to paint before scrolling to a section inside it.
    requestAnimationFrame(() =>
      requestAnimationFrame(() => document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' }))
    );
  }

  function onRoute(target) {
    if (DEEP_ROUTES.includes(target)) {
      setRoute(target);
      return;
    }
    // Anything else is a section on the home page.
    goHome(target === 'supplements-page' ? 'suplementos' : target);
  }

  function openArticle(id) {
    setArticleId(id);
    setRoute('article');
  }

  return (
    <>
      <div className="ella-fallback" aria-hidden="true" />
      {tier !== 'low' && (
        <Suspense fallback={null}>
          <SceneRoot tier={tier} />
        </Suspense>
      )}

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-cream focus:px-4 focus:py-2 focus:text-[#1a2f23]"
      >
        {isEs ? 'Saltar al contenido' : 'Skip to content'}
      </a>

      <Nav route={route} goHome={goHome} />

      <main id="main" className="relative">
        {isHome && (
          <>
            <Hero onStartReading={() => setRoute('articles')} />
            <WhyBand />
            <Nutricion onOpenArticles={() => setRoute('articles')} />
            <Ejercicio />
            <SaludMental />
            <Suplementos />
            <Recursos onRoute={onRoute} />
            <Sobre />
          </>
        )}

        {route === 'articles' && <ArticlesHub onBack={() => goHome()} onOpenArticle={openArticle} />}
        {route === 'article' && <ArticleView articleId={articleId} onBack={() => setRoute('articles')} />}
        {route === 'quiz' && <Quiz onBack={() => goHome()} onRoute={onRoute} />}
        {route === 'doctor' && <DoctorChecklist onBack={() => goHome()} />}
        {route === 'hormones' && <Hormones onBack={() => goHome()} onRoute={onRoute} />}
        {route === 'cancer' && <Reproductive onBack={() => goHome()} />}
      </main>

      <Footer onRoute={onRoute} />
    </>
  );
}

export default function App() {
  return (
    <LangProvider>
      <Shell />
    </LangProvider>
  );
}

import { useState } from 'react';
import { useLang } from '../i18n/lang';
import { getSite, ELLA_LINKS } from '../content/site';

export function Footer({ onRoute }) {
  const { lang, isEs, t } = useLang();
  const site = getSite(lang);
  const [sent, setSent] = useState(false);

  return (
    <footer className="relative border-t border-cream/10 bg-black/35 px-6 py-20 backdrop-blur-[2px]">
      <div className="mx-auto grid max-w-[1200px] gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="font-display text-[2rem] text-cream">Ella</div>
          <p className="mt-4 max-w-[34ch] text-[1rem] leading-relaxed text-cream/75">{site.footer.tagline}</p>
        </div>

        <nav aria-label={isEs ? 'Pie de página' : 'Footer'}>
          <h2 className="text-[0.72rem] font-semibold tracking-[0.2em] text-gold uppercase">
            {isEs ? 'Explorar' : 'Explore'}
          </h2>
          <ul className="mt-4 space-y-2">
            {[
              { label: t('nav_quiz'), route: 'quiz' },
              { label: t('nav_doctor'), route: 'doctor' },
              { label: t('nav_hormones'), route: 'hormones' },
              { label: t('nav_cancer'), route: 'cancer' },
              { label: isEs ? 'Artículos' : 'Articles', route: 'articles' },
            ].map((l) => (
              <li key={l.route}>
                <button
                  type="button"
                  onClick={() => onRoute(l.route)}
                  className="text-[0.98rem] text-cream/80 transition-colors duration-200 hover:text-cream"
                >
                  {l.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-[0.72rem] font-semibold tracking-[0.2em] text-gold uppercase">{t('newsletter_title')}</h2>
          <p className="mt-3 text-[0.95rem] text-cream/75">{t('newsletter_sub')}</p>
          <form
            className="mt-5 flex flex-col gap-3 sm:flex-row"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            <label className="sr-only" htmlFor="ella-newsletter">
              {t('newsletter_placeholder')}
            </label>
            <input
              id="ella-newsletter"
              type="email"
              required
              placeholder={t('newsletter_placeholder')}
              className="min-w-0 flex-1 rounded-lg border border-cream/25 bg-black/30 px-4 py-3 text-[1rem] text-cream placeholder:text-cream/45"
            />
            <button
              type="submit"
              className="rounded-lg bg-cream px-5 py-3 text-[0.95rem] font-medium text-[#1a2f23] transition-colors duration-200 hover:bg-white"
            >
              {t('newsletter_cta')}
            </button>
          </form>
          {/* ponytail: no backend yet, so this only confirms locally. Wire to a
              real list provider before launch. */}
          <p aria-live="polite" className="mt-3 min-h-[1.2rem] text-[0.85rem] text-blush">
            {sent ? (isEs ? 'Gracias, te escribiremos pronto.' : 'Thank you, we’ll be in touch soon.') : ''}
          </p>
        </div>
      </div>

      <div className="mx-auto mt-14 flex max-w-[1200px] flex-wrap items-center justify-between gap-4 border-t border-cream/10 pt-8">
        <p className="max-w-[60ch] text-[0.85rem] text-cream/60">{site.footer.disclaimer}</p>
        <a
          href={ELLA_LINKS.calendar}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[0.85rem] text-gold no-underline hover:underline"
        >
          {isEs ? 'Reservar una consulta' : 'Book a consultation'}
        </a>
      </div>
    </footer>
  );
}

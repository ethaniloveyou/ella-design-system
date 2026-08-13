// The seven scroll sections. Each one's `id` matches a theme id in themes.js —
// that string is the only coupling between the content layer and the 3D layer.

import { useEffect, useState } from 'react';
import { useLang } from '../i18n/lang';
import { getSite } from '../content/site';
import { getFoods } from '../content/foods';
import { getSupplements } from '../content/supplements';
import { ELLA_LINKS } from '../content/site';
import { SECTION_ACCENT } from '../themes';
import { CTAButton, ContentCard, Disclaimer, ExternalLinkRow, Eyebrow, Headline } from '../ui/primitives';

export function Section({ id, children, className = '', wide = false }) {
  return (
    <section id={id} className={`relative flex min-h-screen items-center py-28 ${className}`}>
      <div className={`mx-auto w-full px-6 ${wide ? 'max-w-[1240px]' : 'max-w-[1080px]'}`}>{children}</div>
    </section>
  );
}

/* ------------------------------------------------------------------ HERO */

export function Hero({ onStartReading }) {
  const { isEs } = useLang();
  const s = getSite(isEs ? 'es' : 'en').hero;

  return (
    <Section id="hero" wide>
      <div className="grid items-center gap-14 md:grid-cols-[1.15fr_0.85fr]">
        <div>
          <Headline
            as="h1"
            lead={`${s.titleLead} `}
            em={s.titleEm}
            className="text-[clamp(3rem,7.5vw,5.6rem)] text-cream"
          />
          <p className="mt-8 max-w-[54ch] text-[1.12rem] leading-relaxed text-cream/85">
            <strong className="font-semibold text-cream">{s.leadStrong}</strong>
            {s.lead}
          </p>
          <div className="mt-10">
            <CTAButton onClick={onStartReading}>
              {s.cta}
              <span aria-hidden="true">→</span>
            </CTAButton>
          </div>
          <div className="mt-12 flex items-center gap-4">
            <img
              src="photos/jessica.jpg"
              alt=""
              className="h-14 w-14 rounded-full object-cover"
              loading="lazy"
              width="56"
              height="56"
            />
            <p className="text-[0.92rem] text-cream/75">
              <strong className="font-semibold text-cream">{s.credName}</strong> · {s.credRole}
            </p>
          </div>
        </div>

        <div className="relative justify-self-center" data-parallax>
          <img
            src="photos/portrait-terrace.jpg"
            alt={isEs ? 'Mujer sonriendo en una terraza a la luz natural' : 'Woman smiling on a terrace in natural light'}
            className="aspect-[4/5] w-full max-w-[380px] rounded-full object-cover"
            style={{ objectPosition: '68% center' }}
            width="380"
            height="475"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-blush/30"
            style={{ boxShadow: '0 0 90px rgba(232,196,184,0.18)' }}
          />
        </div>
      </div>

      <a
        href="#nutricion"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById('nutricion')?.scrollIntoView({ behavior: 'smooth' });
        }}
        className="mt-20 inline-flex items-center gap-3 text-[0.8rem] tracking-[0.2em] text-cream/60 uppercase no-underline hover:text-cream"
      >
        {s.scroll}
        <span aria-hidden="true" className="animate-bounce">
          ↓
        </span>
      </a>
    </Section>
  );
}

/* ------------------------------------------------- WHY / PULL QUOTE band */

export function WhyBand() {
  const { lang } = useLang();
  const s = getSite(lang).why;

  return (
    <div className="relative py-28">
      <div className="mx-auto max-w-[760px] px-6 text-center">
        <Eyebrow>{s.eyebrow}</Eyebrow>
        {s.paras.map((p) => (
          <p key={p.slice(0, 24)} data-reveal className="mt-6 text-[1.1rem] leading-[1.75] text-cream/85">
            {p}
          </p>
        ))}
        <blockquote data-reveal className="mt-16 font-display text-[clamp(1.4rem,3vw,2.1rem)] italic leading-snug text-blush">
          {s.quote}
        </blockquote>
        <p className="mt-4 text-[0.78rem] tracking-[0.18em] text-cream/55 uppercase">— {s.quoteAuthor}</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------- NUTRICIÓN */

export function Nutricion({ onOpenArticles }) {
  const { lang, isEs } = useLang();
  const s = getSite(lang).nutrition;
  const foods = getFoods(lang);

  return (
    <Section id="nutricion" wide>
      <div className="grid gap-14 md:grid-cols-[0.95fr_1.05fr] md:items-start">
        <div>
          <Eyebrow>{s.eyebrow}</Eyebrow>
          <Headline as="h2" lead={s.title} className="mt-4 text-[clamp(2.4rem,5vw,3.8rem)] text-cream" />
          <p className="mt-6 max-w-[52ch] text-[1.08rem] leading-relaxed text-cream/85">{s.lead}</p>

          <img
            src="photos/nutrition-greens.jpg"
            alt=""
            data-parallax
            className="mt-10 aspect-[4/3] w-full rounded-2xl object-cover"
            loading="lazy"
          />

          <div className="mt-10 flex flex-wrap gap-4">
            <CTAButton onClick={onOpenArticles}>
              {isEs ? 'Leer los artículos' : 'Read the articles'}
              <span aria-hidden="true">→</span>
            </CTAButton>
          </div>
        </div>

        <div>
          <Eyebrow>{s.quickEyebrow}</Eyebrow>
          <Headline
            as="h3"
            lead={s.quickTitleLead}
            em={s.quickTitleEm}
            className="mt-3 text-[clamp(1.7rem,3.2vw,2.4rem)] text-cream"
          />
          <p className="mt-4 max-w-[48ch] text-[1rem] leading-relaxed text-cream/75">{s.quickLead}</p>

          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {foods.map((f) => (
              <li key={f.name} data-reveal>
                <ContentCard className="h-full p-5">
                  <div className="text-[0.66rem] font-semibold tracking-[0.16em] text-leaf uppercase">{f.tag}</div>
                  <div className="mt-2 font-display text-[1.15rem] text-cream">{f.name}</div>
                  <div className="mt-1 text-[0.9rem] text-cream/70">{f.amt}</div>
                </ContentCard>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------- EJERCICIO */

export function Ejercicio() {
  const { lang } = useLang();
  const s = getSite(lang).exercise;

  return (
    <Section id="ejercicio" wide>
      <div className="grid gap-14 md:grid-cols-[1fr_1fr] md:items-center">
        <div>
          <Eyebrow>{s.eyebrow}</Eyebrow>
          <Headline
            as="h2"
            lead={s.titleLead}
            em={s.titleEm}
            className="mt-4 text-[clamp(2.4rem,5vw,3.8rem)] text-cream"
          />
          <p className="mt-6 max-w-[50ch] text-[1.08rem] leading-relaxed text-cream/85">{s.lead}</p>

          <div className="mt-10 grid gap-4">
            {s.points.map((p) => (
              <ContentCard key={p.title} data-reveal accent="#e8b84c">
                <h3 className="font-display text-[1.35rem] text-cream">{p.title}</h3>
                <p className="mt-2 text-[0.98rem] leading-relaxed text-cream/75">{p.body}</p>
              </ContentCard>
            ))}
          </div>
        </div>

        <img
          src="photos/exercise-situps.jpg"
          alt=""
          data-parallax
          className="aspect-[4/5] w-full rounded-2xl object-cover"
          loading="lazy"
        />
      </div>
    </Section>
  );
}

/* ---------------------------------------------------------- SALUD MENTAL */

export function SaludMental() {
  const { lang } = useLang();
  const s = getSite(lang).mental;

  return (
    <Section id="salud-mental">
      {/* The spec asks for this section to feel the most spacious — hence the
          narrower column and the extra vertical air. */}
      <div className="mx-auto max-w-[680px] text-center">
        <Eyebrow>{s.eyebrow}</Eyebrow>
        <Headline
          as="h2"
          lead={s.titleLead}
          em={s.titleEm}
          className="mt-6 text-[clamp(2.3rem,4.6vw,3.6rem)] text-cream"
        />
        <p className="mx-auto mt-10 max-w-[46ch] text-[1.1rem] leading-[1.8] text-cream/85">{s.lead}</p>
      </div>

      <img
        src="photos/reflective.jpg"
        alt=""
        data-parallax
        className="mx-auto mt-20 aspect-[16/9] w-full max-w-[760px] rounded-2xl object-cover"
        loading="lazy"
      />

      <div className="mx-auto mt-20 grid max-w-[720px] gap-3">
        {s.links.map((l) => (
          <div key={l.label} data-reveal>
            <ExternalLinkRow {...l} />
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ----------------------------------------------------------- SUPLEMENTOS */

export function Suplementos() {
  const { lang, isEs } = useLang();
  const s = getSite(lang).supplements;
  const items = getSupplements(lang);
  const [open, setOpen] = useState(null);

  // Escape closes the detail dialog.
  useEffect(() => {
    if (open === null) return undefined;
    const onKey = (e) => e.key === 'Escape' && setOpen(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const detail = open === null ? null : items[open];

  return (
    <Section id="suplementos" wide>
      <div className="max-w-[720px]">
        <Eyebrow>{s.eyebrow}</Eyebrow>
        <Headline as="h2" lead={s.title} className="mt-4 text-[clamp(2.2rem,4.6vw,3.4rem)] text-cream" />
      </div>

      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((sup, idx) => (
          <button
            key={sup.name}
            type="button"
            data-reveal
            onClick={() => setOpen(idx)}
            aria-haspopup="dialog"
            className="flex h-full flex-col rounded-2xl border border-cream/12 bg-black/45 p-6 text-left transition-colors duration-200 hover:border-sage/70"
          >
            <span className="text-[0.64rem] font-semibold tracking-[0.16em] text-sand uppercase">{sup.tag}</span>
            <span className="mt-3 font-display text-[1.3rem] text-cream">{sup.name}</span>
            <span className="mt-2 text-[0.94rem] leading-relaxed text-cream/72">{sup.desc}</span>
            <span className="mt-auto pt-5 text-[0.85rem] text-gold">
              {isEs ? 'Ver el porqué y la ciencia' : 'See the why & the science'} →
            </span>
          </button>
        ))}
      </div>

      <Disclaimer>{s.disclaimer}</Disclaimer>

      {detail && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={() => setOpen(null)}
          role="presentation"
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={detail.name}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[85vh] w-full max-w-[640px] overflow-y-auto rounded-2xl border border-cream/15 bg-[#191a17] p-9"
          >
            <div className="flex items-start justify-between gap-6">
              <div>
                <div className="text-[0.64rem] font-semibold tracking-[0.16em] text-sand uppercase">{detail.tag}</div>
                <h3 className="mt-2 font-display text-[2rem] text-cream">{detail.name}</h3>
              </div>
              <button
                type="button"
                onClick={() => setOpen(null)}
                aria-label={isEs ? 'Cerrar' : 'Close'}
                className="rounded-md p-2 text-2xl leading-none text-cream/70 hover:text-cream"
              >
                ×
              </button>
            </div>

            <h4 className="mt-8 text-[0.72rem] font-semibold tracking-[0.2em] text-gold uppercase">
              {isEs ? 'Por qué importa ahora' : 'Why it matters now'}
            </h4>
            <ul className="mt-3 space-y-3">
              {detail.why.map((w) => (
                <li key={w.slice(0, 20)} className="text-[1rem] leading-relaxed text-cream/85">
                  {w}
                </li>
              ))}
            </ul>

            <div className="mt-7 rounded-xl border border-cream/12 bg-black/30 px-5 py-4">
              <div className="text-[0.66rem] font-semibold tracking-[0.18em] text-sand uppercase">
                {isEs ? 'CÓMO TOMARLO' : 'HOW TO TAKE IT'}
              </div>
              <p className="mt-2 text-[0.98rem] leading-relaxed text-cream/85">{detail.dose}</p>
            </div>

            <h4 className="mt-7 text-[0.72rem] font-semibold tracking-[0.2em] text-gold uppercase">
              {isEs ? 'La investigación' : 'The research'}
            </h4>
            <p className="mt-2 text-[0.98rem] leading-relaxed text-cream/80">{detail.research}</p>
            {detail.source && (
              <div className="mt-4">
                <ExternalLinkRow label={detail.source.label} href={detail.source.href} />
              </div>
            )}

            <p className="mt-7 text-[0.8rem] italic text-cream/55">{s.affiliate}</p>
          </div>
        </div>
      )}
    </Section>
  );
}

/* -------------------------------------------------------------- RECURSOS */

export function Recursos({ onRoute }) {
  const { lang } = useLang();
  const s = getSite(lang).resources;

  return (
    <Section id="recursos" wide>
      <div className="mx-auto max-w-[720px] text-center">
        <Eyebrow>{s.eyebrow}</Eyebrow>
        <Headline
          as="h2"
          lead={s.titleLead}
          em={s.titleEm}
          tail={s.titleTail}
          className="mt-4 text-[clamp(2.3rem,4.8vw,3.6rem)] text-cream"
        />
      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {s.columns.map((col) => (
          <ContentCard key={col.title} data-reveal accent={SECTION_ACCENT[col.section]}>
            <h3 className="font-display text-[1.4rem] italic text-cream">{col.title}</h3>
            <ul className="mt-5 space-y-1">
              {col.links.map((l) => (
                <li key={l.label}>
                  <button
                    type="button"
                    onClick={() => onRoute(l.route)}
                    className="flex w-full items-center justify-between gap-3 py-2.5 text-left text-[1rem] text-cream/85 transition-colors duration-200 hover:text-gold"
                  >
                    {l.label}
                    <span aria-hidden="true">→</span>
                  </button>
                </li>
              ))}
            </ul>
          </ContentCard>
        ))}
      </div>
    </Section>
  );
}

/* ----------------------------------------------------------------- SOBRE */

export function Sobre() {
  const { lang, isEs } = useLang();
  const site = getSite(lang);
  const s = site.about;

  return (
    <Section id="sobre" wide>
      <div className="grid gap-14 md:grid-cols-[0.85fr_1.15fr] md:items-center">
        <img
          src="photos/jessica.jpg"
          alt={isEs ? 'Retrato de Jessica' : 'Portrait of Jessica'}
          data-parallax
          className="aspect-[4/5] w-full max-w-[360px] justify-self-center rounded-2xl object-cover"
          loading="lazy"
        />
        <div>
          <Eyebrow>{s.eyebrow}</Eyebrow>
          <Headline as="h2" lead={s.title} className="mt-4 text-[clamp(2.4rem,5vw,3.6rem)] text-cream" />
          {s.paras.map((p) => (
            <p key={p.slice(0, 24)} data-reveal className="mt-5 max-w-[58ch] text-[1.05rem] leading-[1.75] text-cream/85">
              {p}
            </p>
          ))}
          <dl className="mt-10 flex gap-12">
            {s.stats.map((st) => (
              <div key={st.label}>
                <dt className="sr-only">{st.label}</dt>
                <dd>
                  <span className="block font-display text-[2rem] text-blush">{st.n}</span>
                  <span className="text-[0.85rem] text-cream/65">{st.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Consultation — the Reservar path, kept prominent per the spec. */}
      <div data-reveal className="mt-24 rounded-3xl border border-cream/12 bg-black/40 p-10 md:p-14">
        <Eyebrow>{s.consultEyebrow}</Eyebrow>
        <Headline
          as="h3"
          lead={s.consultTitleLead}
          em={s.consultTitleEm}
          tail={s.consultTitleTail}
          className="mt-4 max-w-[20ch] text-[clamp(1.9rem,3.6vw,2.8rem)] text-cream"
        />
        <p className="mt-5 max-w-[54ch] text-[1.05rem] leading-relaxed text-cream/85">{s.consultLead}</p>
        <ul className="mt-6 space-y-2">
          {s.consultList.map((item) => (
            <li key={item} className="text-[1rem] text-cream/80">
              — {item}
            </li>
          ))}
        </ul>
        <div className="mt-9 flex flex-wrap gap-4">
          <CTAButton as="a" href={ELLA_LINKS.calendar} target="_blank" rel="noopener noreferrer" variant="accent">
            {s.consultCalendar}
          </CTAButton>
          <CTAButton as="a" href={ELLA_LINKS.whatsapp} target="_blank" rel="noopener noreferrer" variant="ghost">
            {s.consultWhatsapp}
          </CTAButton>
        </div>
      </div>

      <Testimonials />
    </Section>
  );
}

/* ---------------------------------------------------------- TESTIMONIALS */

function Testimonials() {
  const { lang, isEs } = useLang();
  const site = getSite(lang);
  const items = site.testimonials;
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % items.length), 6500);
    return () => clearInterval(id);
  }, [items.length]);

  return (
    <div className="mt-24 text-center">
      <Eyebrow className="mb-8">{site.testimonialsEyebrow}</Eyebrow>
      <div className="relative mx-auto min-h-[190px] max-w-[720px]">
        {items.map((q, idx) => (
          <figure
            key={q.author}
            aria-hidden={idx !== i}
            className={`absolute inset-0 transition-opacity duration-500 ${idx === i ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
          >
            <blockquote className="font-display text-[clamp(1.3rem,2.6vw,1.85rem)] italic leading-snug text-cream">
              {q.quote}
            </blockquote>
            <figcaption className="mt-5 text-[0.85rem] tracking-[0.12em] text-cream/60 uppercase">{q.author}</figcaption>
          </figure>
        ))}
      </div>
      <div className="mt-6 flex justify-center gap-2">
        {items.map((q, idx) => (
          <button
            key={q.author}
            type="button"
            aria-label={(isEs ? 'Testimonio ' : 'Testimonial ') + (idx + 1)}
            aria-current={idx === i}
            onClick={() => setI(idx)}
            className={`h-2 w-2 rounded-full transition-colors duration-200 ${idx === i ? 'bg-gold' : 'bg-cream/30'}`}
          />
        ))}
      </div>
    </div>
  );
}

// Deep content that doesn't belong in the seven-section scroll: the article
// library, the check-in quiz, the doctor checklist, hormone therapy and
// reproductive health. Same 3D backdrop, but the scene idles while you read.

import { useMemo, useState } from 'react';
import { useLang } from '../i18n/lang';
import { getArticle, getArticles } from '../content/articles';
import { getHormoneContent } from '../content/hormones';
import { getReproductiveContent } from '../content/reproductive';
import { getQuestions, getRecommendations, recapChips, resultIntro, safetyNote } from '../content/quiz';
import { CTAButton, ContentCard, Disclaimer, ExternalLinkRow, Eyebrow, Headline } from '../ui/primitives';

function Page({ children, onBack, backLabel }) {
  return (
    <div className="mx-auto min-h-screen w-full max-w-[860px] px-6 pt-36 pb-28">
      <button
        type="button"
        onClick={onBack}
        className="mb-10 text-[0.9rem] text-cream/70 transition-colors duration-200 hover:text-cream"
      >
        ← {backLabel}
      </button>
      {children}
    </div>
  );
}

/* -------------------------------------------------------- ARTICLES HUB */

export function ArticlesHub({ onBack, onOpenArticle }) {
  const { lang, isEs } = useLang();
  const articles = getArticles(lang);
  const [category, setCategory] = useState(null);

  const categories = useMemo(() => [...new Set(articles.map((a) => a.category))], [articles]);
  const shown = category ? articles.filter((a) => a.category === category) : articles;

  return (
    <Page onBack={onBack} backLabel={isEs ? 'Inicio' : 'Home'}>
      <Eyebrow>{isEs ? 'ARTÍCULOS' : 'ARTICLES'}</Eyebrow>
      <Headline
        as="h1"
        lead={isEs ? 'Lecturas, ' : 'Reading, '}
        em={isEs ? 'sin prisa.' : 'no rush.'}
        className="mt-4 text-[clamp(2.4rem,5vw,3.6rem)] text-cream"
      />

      <div className="mt-10 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setCategory(null)}
          aria-pressed={category === null}
          className={`rounded-full border px-4 py-2 text-[0.85rem] transition-colors duration-200 ${
            category === null ? 'border-gold bg-gold/15 text-gold' : 'border-cream/25 text-cream/75 hover:text-cream'
          }`}
        >
          {isEs ? 'Todos' : 'All'}
        </button>
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCategory(c)}
            aria-pressed={category === c}
            className={`rounded-full border px-4 py-2 text-[0.85rem] transition-colors duration-200 ${
              category === c ? 'border-gold bg-gold/15 text-gold' : 'border-cream/25 text-cream/75 hover:text-cream'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-4">
        {shown.map((a) => (
          <button key={a.id} type="button" onClick={() => onOpenArticle(a.id)} className="text-left">
            <ContentCard className="hover:border-gold/60">
              <div className="text-[0.66rem] font-semibold tracking-[0.16em] text-gold uppercase">
                {a.category} · {a.readTime}
              </div>
              <h2 className="mt-3 font-display text-[1.6rem] leading-snug text-cream">{a.title}</h2>
              <p className="mt-3 text-[1rem] leading-relaxed text-cream/75">{a.lede}</p>
            </ContentCard>
          </button>
        ))}
      </div>
    </Page>
  );
}

/* --------------------------------------------------------- ARTICLE VIEW */

function Block({ block }) {
  switch (block.kind) {
    case 'h2':
      return <h2 className="mt-12 font-display text-[1.8rem] text-cream">{block.text}</h2>;
    case 'pull':
      return (
        <blockquote className="my-10 border-l-2 border-gold pl-6 font-display text-[1.35rem] italic leading-snug text-blush">
          {block.text}
        </blockquote>
      );
    case 'ul':
      return (
        <ul className="mt-5 space-y-2">
          {block.items.map((it) => (
            <li key={it} className="text-[1.05rem] leading-relaxed text-cream/85">
              — {it}
            </li>
          ))}
        </ul>
      );
    case 'table':
      return (
        <div className="mt-8 overflow-x-auto">
          <table className="w-full border-collapse text-left text-[0.98rem]">
            <thead>
              <tr>
                {block.headers.map((h) => (
                  <th key={h} className="border-b border-cream/25 py-3 pr-6 font-semibold text-gold">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row) => (
                <tr key={row.join('|')}>
                  {row.map((cell) => (
                    <td key={cell} className="border-b border-cream/10 py-3 pr-6 text-cream/85">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    default:
      return <p className="mt-5 text-[1.08rem] leading-[1.75] text-cream/85">{block.text}</p>;
  }
}

export function ArticleView({ articleId, onBack }) {
  const { lang, isEs } = useLang();
  const article = getArticle(articleId, lang);

  return (
    <Page onBack={onBack} backLabel={isEs ? 'Todos los artículos' : 'All articles'}>
      <Eyebrow>
        {article.category} · {article.readTime}
      </Eyebrow>
      <h1 className="mt-4 font-display text-[clamp(2.2rem,4.6vw,3.2rem)] leading-[1.1] text-cream">{article.title}</h1>
      <p className="mt-6 text-[1.2rem] leading-relaxed text-cream/80">{article.lede}</p>
      {article.published && <p className="mt-4 text-[0.85rem] text-cream/55">{article.published}</p>}

      <article className="mt-8">
        {article.body.map((block, i) => (
          <Block key={`${block.kind}-${i}`} block={block} />
        ))}
      </article>
    </Page>
  );
}

/* ------------------------------------------------------------------ QUIZ */

export function Quiz({ onBack, onRoute }) {
  const { lang, isEs, t } = useLang();
  const questions = getQuestions(lang);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});

  const done = step >= questions.length;
  const q = questions[step];
  const selected = answers[q?.id] || (q?.kind === 'multi' ? [] : null);

  function select(opt) {
    if (q.kind === 'multi') {
      let next;
      if (opt.exclusive) {
        next = selected.includes(opt.key) ? [] : [opt.key];
      } else {
        // Picking a real option clears the exclusive "none of these".
        const base = selected.filter((k) => {
          const o = q.opts.find((x) => x.key === k);
          return !(o && o.exclusive);
        });
        next = base.includes(opt.key) ? base.filter((o) => o !== opt.key) : [...base, opt.key];
      }
      setAnswers({ ...answers, [q.id]: next });
    } else {
      setAnswers({ ...answers, [q.id]: opt.key });
    }
  }

  if (done) {
    const recs = getRecommendations(answers, lang);
    const note = safetyNote(answers, lang);
    const chips = recapChips(answers, lang);

    return (
      <Page onBack={onBack} backLabel={isEs ? 'Inicio' : 'Home'}>
        <Eyebrow>{isEs ? '¿DÓNDE ESTOY?' : 'WHERE AM I?'}</Eyebrow>
        <Headline
          as="h1"
          lead={isEs ? 'Tu punto de ' : 'Your starting '}
          em={isEs ? 'partida.' : 'place.'}
          className="mt-4 text-[clamp(2.2rem,4.6vw,3.4rem)] text-cream"
        />
        <p className="mt-6 text-[1.1rem] leading-relaxed text-cream/85">{resultIntro(answers, lang)}</p>

        {chips.length > 0 && (
          <ul className="mt-8 flex flex-wrap gap-2">
            {chips.map((c) => (
              <li key={c} className="rounded-full border border-cream/25 px-4 py-1.5 text-[0.82rem] text-cream/80">
                {c}
              </li>
            ))}
          </ul>
        )}

        {note && (
          <p className="mt-8 rounded-xl border border-ember/50 bg-ember/10 px-6 py-5 text-[1rem] leading-relaxed text-cream">
            {note}
          </p>
        )}

        <div className="mt-10 grid gap-4">
          {recs.map((card) => (
            <button key={card.title} type="button" onClick={() => onRoute(card.target)} className="text-left">
              <ContentCard className="hover:border-gold/60">
                <h2 className="font-display text-[1.4rem] text-cream">{card.title}</h2>
                <p className="mt-2 text-[1rem] leading-relaxed text-cream/75">{card.desc}</p>
                <span className="mt-4 inline-block text-[0.88rem] text-gold">{card.cta} →</span>
              </ContentCard>
            </button>
          ))}
        </div>

        <div className="mt-10">
          <CTAButton
            variant="ghost"
            onClick={() => {
              setAnswers({});
              setStep(0);
            }}
          >
            {isEs ? 'Empezar de nuevo' : 'Start over'}
          </CTAButton>
        </div>
      </Page>
    );
  }

  const canAdvance = q.kind === 'multi' ? true : !!selected;

  return (
    <Page onBack={onBack} backLabel={isEs ? 'Inicio' : 'Home'}>
      <Eyebrow>{t('quiz_progress', { n: step + 1, total: questions.length })}</Eyebrow>

      <div
        className="mt-4 h-0.5 w-full bg-cream/15"
        role="progressbar"
        aria-valuenow={step + 1}
        aria-valuemin={1}
        aria-valuemax={questions.length}
      >
        <div
          className="h-full bg-gold transition-[width] duration-300 ease-out"
          style={{ width: `${((step + 1) / questions.length) * 100}%` }}
        />
      </div>

      <h1 className="mt-10 font-display text-[clamp(1.9rem,4vw,2.8rem)] leading-tight text-cream">{q.text}</h1>
      {q.help && <p className="mt-4 text-[1rem] text-cream/70">{q.help}</p>}

      <div className="mt-10 grid gap-3">
        {q.opts.map((opt) => {
          const active = q.kind === 'multi' ? selected.includes(opt.key) : selected === opt.key;
          return (
            <button
              key={opt.key}
              type="button"
              aria-pressed={active}
              onClick={() => select(opt)}
              className={`rounded-xl border px-6 py-5 text-left text-[1.05rem] transition-colors duration-200 ${
                active ? 'border-gold bg-gold/12 text-cream' : 'border-cream/18 bg-black/20 text-cream/85 hover:border-cream/45'
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>

      <div className="mt-10 flex items-center gap-6">
        {step > 0 && (
          <CTAButton variant="text" onClick={() => setStep(step - 1)}>
            {t('quiz_back')}
          </CTAButton>
        )}
        <CTAButton onClick={() => setStep(step + 1)} disabled={!canAdvance} className={canAdvance ? '' : 'opacity-40'}>
          {step === questions.length - 1 ? t('quiz_finish') : t('quiz_next')}
        </CTAButton>
      </div>
    </Page>
  );
}

/* ------------------------------------------------------ DOCTOR CHECKLIST */

// The previous AskYourDoctor screen shipped with its body content stripped —
// only the CTA copy survived in the dictionary. These questions are newly
// written, drawn from topics already covered elsewhere on the site. They are
// questions to ask, not advice.
function checklist(isEs) {
  return [
    {
      group: isEs ? 'Dónde estoy' : 'Where I am',
      items: isEs
        ? [
            '¿Mis síntomas encajan con la perimenopausia o hay otra cosa que deberíamos descartar?',
            '¿Vale la pena hacer análisis de hormonas en mi caso, o no cambiarían el plan?',
            '¿Qué debería esperar en los próximos dos o tres años?',
          ]
        : [
            'Do my symptoms fit perimenopause, or is there something else we should rule out?',
            'Is hormone testing worth it in my case, or would it not change the plan?',
            'What should I expect over the next two or three years?',
          ],
    },
    {
      group: isEs ? 'Opciones de tratamiento' : 'Treatment options',
      items: isEs
        ? [
            '¿Soy candidata para terapia hormonal? ¿Cuáles son los riesgos y beneficios en mi situación?',
            'Si la terapia hormonal no es para mí, ¿qué opciones no hormonales existen?',
            '¿Cuánto tiempo suele tardar en notarse una diferencia?',
          ]
        : [
            'Am I a candidate for hormone therapy? What are the risks and benefits in my situation?',
            'If hormone therapy isn’t right for me, what non-hormonal options exist?',
            'How long does it usually take to notice a difference?',
          ],
    },
    {
      group: isEs ? 'Prevención y seguimiento' : 'Prevention and follow-up',
      items: isEs
        ? [
            '¿Estoy al día con mis pruebas de detección (Papanicolaou, VPH, mamografía)?',
            '¿Debería revisar mi densidad ósea, colesterol o vitamina D?',
            '¿Cuándo debería volver, y qué señales significan que debo llamar antes?',
          ]
        : [
            'Am I up to date on screening (Pap, HPV, mammogram)?',
            'Should we check my bone density, cholesterol, or vitamin D?',
            'When should I come back, and what signs mean I should call sooner?',
          ],
    },
    {
      group: isEs ? 'Si no me siento escuchada' : 'If I don’t feel heard',
      items: isEs
        ? [
            '¿Puede referirme a un especialista certificado en menopausia?',
            '¿Podemos anotar en mi expediente lo que hablamos hoy?',
          ]
        : [
            'Can you refer me to a certified menopause specialist?',
            'Can we note what we discussed today in my chart?',
          ],
    },
  ];
}

export function DoctorChecklist({ onBack }) {
  const { isEs, t } = useLang();

  return (
    <Page onBack={onBack} backLabel={isEs ? 'Inicio' : 'Home'}>
      <Eyebrow>{t('doctor_eyebrow')}</Eyebrow>
      <h1 className="mt-4 font-display text-[clamp(2.2rem,4.6vw,3.2rem)] leading-tight text-cream">{t('doctor_title')}</h1>
      <p className="mt-6 text-[1.1rem] leading-relaxed text-cream/85">{t('doctor_sub')}</p>

      <div className="mt-6">
        <CTAButton onClick={() => window.print()}>{isEs ? 'Imprimir la lista' : 'Print the list'}</CTAButton>
      </div>

      <div className="mt-12 grid gap-8">
        {checklist(isEs).map((group) => (
          <section key={group.group}>
            <h2 className="font-display text-[1.5rem] text-blush">{group.group}</h2>
            <ul className="mt-4 space-y-3">
              {group.items.map((item) => (
                <li key={item} className="flex gap-4 text-[1.05rem] leading-relaxed text-cream/85">
                  <span aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 rounded-sm border border-cream/40" />
                  {item}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <Disclaimer>
        {isEs
          ? 'Esta lista es información, no consejo médico. Llévala como punto de partida para tu propia conversación.'
          : 'This list is information, not medical advice. Bring it as a starting point for your own conversation.'}
      </Disclaimer>
    </Page>
  );
}

/* ------------------------------------------------------ HORMONAL THERAPY */

export function Hormones({ onBack, onRoute }) {
  const { lang, isEs } = useLang();
  const { options, resources, spanishResources } = getHormoneContent(lang);

  return (
    <Page onBack={onBack} backLabel={isEs ? 'Inicio' : 'Home'}>
      <Eyebrow>{isEs ? 'TERAPIA HORMONAL' : 'HORMONAL THERAPY'}</Eyebrow>
      <h1 className="mt-4 font-display text-[clamp(2.2rem,4.6vw,3.2rem)] leading-tight text-cream">
        {isEs ? 'Tus opciones, en lenguaje claro.' : 'Your options, in plain English.'}
      </h1>
      <p className="mt-6 text-[1.1rem] leading-relaxed text-cream/85">
        {isEs
          ? 'Ella no recomienda una terapia hormonal específica. Lo que hace es ayudarte a entender lo que existe, para que la conversación con tu médico empiece de un lugar informado, no de cero.'
          : 'Ella doesn’t recommend a specific therapy. What it does is help you understand what exists, so the conversation with your doctor starts from an informed place, not from scratch.'}
      </p>

      <h2 className="mt-14 font-display text-[1.8rem] text-cream">{isEs ? 'Las opciones principales' : 'The main options'}</h2>
      <div className="mt-6 grid gap-4">
        {options.map((o) => (
          <ContentCard key={o.name}>
            <div className="text-[0.66rem] font-semibold tracking-[0.16em] text-lavender uppercase">{o.kind}</div>
            <h3 className="mt-2 font-display text-[1.45rem] text-cream">{o.name}</h3>
            <p className="mt-3 text-[1rem] leading-relaxed text-cream/80">{o.desc}</p>
          </ContentCard>
        ))}
      </div>

      <h2 className="mt-16 font-display text-[1.8rem] text-cream">{isEs ? 'Dónde aprender más' : 'Where to learn more'}</h2>
      <p className="mt-3 text-[1.02rem] leading-relaxed text-cream/80">
        {isEs
          ? 'Estos son recursos confiables que recomiendo a mis pacientes. Todos son organizaciones médicas o sin fines de lucro, nada patrocinado.'
          : 'These are the resources I trust and send patients to. All are medical or nonprofit organizations, nothing sponsored.'}
      </p>
      <div className="mt-6 grid gap-3">
        {resources.map((r) => (
          <ExternalLinkRow key={r.label} {...r} />
        ))}
      </div>

      <h2 className="mt-16 font-display text-[1.8rem] text-cream">{isEs ? 'En español' : 'In Spanish'}</h2>
      <p className="mt-3 text-[1.02rem] leading-relaxed text-cream/80">
        {isEs
          ? 'Recursos escritos originalmente en español, no traducciones automáticas.'
          : 'Resources written natively in Spanish, not machine translations.'}
      </p>
      <div className="mt-6 grid gap-3">
        {spanishResources.map((r) => (
          <ExternalLinkRow key={r.label} {...r} />
        ))}
      </div>

      <Disclaimer>
        {isEs
          ? 'Esta página es información, no consejo médico. Habla con tu médico antes de empezar, cambiar o detener cualquier tratamiento hormonal.'
          : 'This page is information, not medical advice. Talk to your doctor before starting, changing, or stopping any hormone therapy.'}
      </Disclaimer>

      <div className="mt-8">
        <CTAButton onClick={() => onRoute('doctor')}>
          {isEs ? 'Lista de preguntas para tu médico' : 'Get the doctor checklist'}
        </CTAButton>
      </div>
    </Page>
  );
}

/* ---------------------------------------------------- REPRODUCTIVE HEALTH */

export function Reproductive({ onBack }) {
  const { lang, isEs } = useLang();
  const { screenings, cancers, links } = getReproductiveContent(lang);

  return (
    <Page onBack={onBack} backLabel={isEs ? 'Inicio' : 'Home'}>
      <Eyebrow>{isEs ? 'SALUD REPRODUCTIVA' : 'REPRODUCTIVE HEALTH'}</Eyebrow>
      <h1 className="mt-4 font-display text-[clamp(2.2rem,4.6vw,3.2rem)] leading-tight text-cream">
        {isEs ? 'VPH, detección y lo que conviene vigilar.' : 'HPV, screening, and what to watch for.'}
      </h1>

      <h2 className="mt-14 font-display text-[1.8rem] text-cream">{isEs ? 'Tu calendario de detección' : 'Your screening schedule'}</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {screenings.map((s) => (
          <ContentCard key={s.name}>
            <h3 className="font-display text-[1.35rem] text-cream">{s.name}</h3>
            <div className="mt-1 text-[0.8rem] tracking-wide text-gold">{s.every}</div>
            <p className="mt-3 text-[0.98rem] leading-relaxed text-cream/80">{s.desc}</p>
          </ContentCard>
        ))}
      </div>

      <h2 className="mt-16 font-display text-[1.8rem] text-cream">{isEs ? 'Qué vigilar' : 'What to watch for'}</h2>
      <div className="mt-6 grid gap-4">
        {cancers.map((c) => (
          <ContentCard key={c.name}>
            <div className="text-[0.66rem] font-semibold tracking-[0.16em] text-lavender uppercase">{c.cause}</div>
            <h3 className="mt-2 font-display text-[1.35rem] text-cream">{c.name}</h3>
            <p className="mt-3 text-[0.98rem] leading-relaxed text-cream/80">{c.detail}</p>
          </ContentCard>
        ))}
      </div>

      <h2 className="mt-16 font-display text-[1.8rem] text-cream">{isEs ? 'Dónde aprender más' : 'Where to learn more'}</h2>
      <div className="mt-6 grid gap-3">
        {links.map((r) => (
          <ExternalLinkRow key={r.label} {...r} />
        ))}
      </div>

      <Disclaimer>
        {isEs
          ? 'Esta página es información, no consejo médico. Cualquier síntoma persistente merece una consulta.'
          : 'This page is information, not medical advice. Any persistent symptom is worth a visit.'}
      </Disclaimer>
    </Page>
  );
}

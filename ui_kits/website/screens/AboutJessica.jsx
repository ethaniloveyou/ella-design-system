// About Jessica, founder story, credentials, mission, and why Ella exists.

export function AboutJessica({ lang, setRoute }) {
  const t = useT(lang);
  const isEs = lang === 'es';
  return (
    <div data-screen-label="07 About Jessica">
      <section className="ella-section-tight">
        <div className="ella-container">
          <div className="ella-about-hero" style={{ width: 1080 }}>
            <div className="ella-about-photo">
              <Photo aspect="4/5" tint="rose" src="./img_9953-msmdchef-e47h.png" alt={isEs ? 'Retrato de Jessica' : 'Portrait of Jessica'} radius="24px" style={{ width: 340, height: 459 }} />
            </div>
            <div className="ella-about-intro">
              <div className="ella-eyebrow">{isEs ? 'CONOCE A LA FUNDADORA' : 'MEET THE FOUNDER'}</div>
              <h1>{isEs ? 'Hola, soy Jessica.' : 'Hi, I\u2019m Jessica.'}</h1>
              <p className="ella-article-lede">
                {isEs
                  ? 'Tengo 53 a\u00f1os, soy madre de tres, y empec\u00e9 la perimenopausia m\u00e1s tarde que la mayor\u00eda de las mujeres. Por eso no la tom\u00e9 en serio hasta que me lleg\u00f3 de lleno, y cuando lleg\u00f3, nada se parec\u00eda a lo que me hab\u00edan contado.'
                  : 'I\u2019m 53, a mother of three, and I started perimenopause later than most women do. That\u2019s part of why I didn\u2019t take it seriously until it hit, and when it did, none of it looked like what I\u2019d been told to expect.'}
              </p>
              <p className="ella-article-lede" style={{ marginTop: 12 }}>
                {isEs
                  ? 'No tuve el aumento de peso dr\u00e1stico. Mis s\u00edntomas no se parec\u00edan a la lista t\u00edpica de sofocos y baja libido que todo el mundo menciona. Ah\u00ed entend\u00ed algo importante: la menopausia no empieza igual en cada mujer. Puede llegar tan pronto como a los 40, o hasta mediados de los 50.'
                  : 'I didn\u2019t have the dramatic weight gain. My symptoms didn\u2019t match the usual list everyone mentions, hot flashes, low libido. That\u2019s when it hit me: menopause doesn\u2019t start the same way for every woman. It can begin as early as 40, or as late as your mid-50s.'}
              </p>
              <p className="ella-article-lede" style={{ marginTop: 12 }}>
                {isEs
                  ? 'Esa experiencia me inspir\u00f3 a guiar a otras mujeres que se sienten tan perdidas como yo me sent\u00ed. Ahora me siento bien, y quiero compartir mi investigaci\u00f3n y experiencia con todas las mujeres que no saben c\u00f3mo reunir esta informaci\u00f3n por su cuenta, especialmente las que hablan espa\u00f1ol, que muchas veces tienen a\u00fan menos recursos accesibles.'
                  : 'That experience is what pushed me to guide other women who feel as lost as I once did. I feel good now, and I want to share my research and experience with every woman who doesn\u2019t know how to gather all this information herself, especially Spanish speakers, who often have even fewer accessible resources.'}
              </p>
              <div style={{ display: 'flex', gap: 28, marginTop: 22 }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, color: 'var(--ella-clay-900)' }}>53</div>
                  <div style={{ fontSize: 13, color: 'var(--ella-taupe-500)' }}>{isEs ? 'a\u00f1os' : 'years old'}</div>
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, color: 'var(--ella-clay-900)' }}>3</div>
                  <div style={{ fontSize: 13, color: 'var(--ella-taupe-500)' }}>{isEs ? 'hijos' : 'children'}</div>
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, color: 'var(--ella-clay-900)' }}>2</div>
                  <div style={{ fontSize: 13, color: 'var(--ella-taupe-500)' }}>{isEs ? 'idiomas' : 'languages'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

window.AboutJessica = AboutJessica;

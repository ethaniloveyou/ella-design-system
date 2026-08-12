// Testimonials carousel, quote cards. Inspired by The Pause Life's
// "I feel seen" testimonials section. Manual prev/next + auto-rotate.

export function Testimonials({ lang }) {
  const isEs = lang === 'es';
  const items = isEs ? [
    { quote: 'Por primera vez siento que tengo información real, sin alarmismo, sin que me vendan algo.', author: 'Marta R., 52' },
    { quote: 'Llevé la lista a mi ginecóloga y por fin tuvimos una conversación de verdad.', author: 'Elena G., 48' },
    { quote: 'Que esté en español marca toda la diferencia. Mi mamá lo lee conmigo.', author: 'Carolina M., 50' },
    { quote: 'No me sentí juzgada. Me sentí escuchada, lo opuesto a la mayoría de las citas médicas.', author: 'Patricia D., 55' },
    { quote: 'El chequeo me ayudó a entender dónde estoy. No sabía que era perimenopausia.', author: 'Lorena S., 46' },
  ] : [
    { quote: 'For the first time I feel like I have real information, no alarmism, nothing being sold to me.', author: 'Marta R., 52' },
    { quote: 'I brought the list to my OB-GYN and we actually had a real conversation.', author: 'Elena G., 48' },
    { quote: 'Having it in Spanish makes all the difference. My mom reads it with me.', author: 'Carolina M., 50' },
    { quote: 'I didn’t feel judged. I felt heard, the opposite of how most doctor visits feel.', author: 'Patricia D., 55' },
    { quote: 'The check-in helped me understand where I am. I didn’t know it was perimenopause.', author: 'Lorena S., 46' },
  ];

  const [i, setI] = React.useState(0);
  React.useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % items.length), 6500);
    return () => clearInterval(id);
  }, [items.length]);

  return (
    <section className="ella-section ella-bg-blush" data-screen-label="testimonials">
      <div className="ella-container">
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div className="ella-eyebrow" style={{ fontSize: 18, fontWeight: 800 }}>{isEs ? 'EN PALABRAS DE NUESTRAS LECTORAS' : 'IN THEIR OWN WORDS'}</div>
        </div>

        <div className="ella-testimonials">
          {items.map((q, idx) => (
            <figure key={idx} className={'ella-testimonial' + (idx === i ? ' is-active' : '')} aria-hidden={idx !== i}>
              <IconQuote width="36" height="36" style={{ color: 'var(--ella-rose-300)' }} />
              <blockquote>{q.quote}</blockquote>
              <figcaption>{', ' + q.author}</figcaption>
            </figure>
          ))}
        </div>

        <div className="ella-testimonial-dots">
          {items.map((_, idx) => (
            <button
              key={idx}
              type="button"
              aria-label={(isEs ? 'Testimonio ' : 'Testimonial ') + (idx + 1)}
              aria-current={idx === i}
              className={'ella-testimonial-dot' + (idx === i ? ' is-active' : '')}
              onClick={() => setI(idx)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

window.Testimonials = Testimonials;

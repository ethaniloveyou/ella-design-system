// ArticleView, generic article reader. Renders any article by id.
// Replaces the hardcoded NutritionArticle screen.

export function ArticleView({ lang, setRoute, articleId, setArticleId }) {
  const t = useT(lang);
  const isEs = lang === 'es';
  const article = getArticle(articleId || 'protein-after-45', lang);

  // category eyebrow color by tone
  const toneColor = article.tone === 'sage' ? 'var(--ella-sage-700)'
                  : article.tone === 'plum' ? 'var(--ella-plum-500)'
                  : 'var(--ella-rose-deep)';

  return (
    <div data-screen-label="04 Article">
      <section className="ella-section-tight">
        <div className="ella-container">
          <div className="ella-article">
            <a className="ella-article-back" href="#"
              onClick={(e) => { e.preventDefault(); setRoute('articles'); }}>
              <IconChevron width="16" height="16" style={{ transform: 'rotate(180deg)' }} />
              {t('article_back')}
            </a>

            <div className="ella-eyebrow" style={{ color: toneColor }}>
              {article.category.toUpperCase()}
            </div>
            <h1>{article.title}</h1>
            <p className="ella-article-lede">{article.lede}</p>

            <div className="ella-article-meta">
              <span>Jessica Zavala, PA-C</span>
              <span className="dot" />
              <span>{article.readTime}</span>
              <span className="dot" />
              <span>{article.published}</span>
            </div>
            <div className="ella-article-actions">
              <button type="button" className="ella-article-pill"><IconBookmark width="16" height="16" />{t('article_save')}</button>
              <button type="button" className="ella-article-pill"><IconMail width="16" height="16" />{t('article_share')}</button>
            </div>

            <div className="ella-article-cover">
              <Photo aspect="16/9" tint={article.tone || 'rose'} src={article.image}
                alt={article.title}
                radius="24px" />
            </div>

            <div className="ella-article-body">
              {article.body.map((block, i) => {
                if (block.kind === 'p')    return <p key={i}>{block.text}</p>;
                if (block.kind === 'h2')   return <h2 key={i}>{block.text}</h2>;
                if (block.kind === 'pull') return <div key={i} className="ella-article-pull">{block.text}</div>;
                if (block.kind === 'ul')   return (
                  <ul key={i} style={{ fontSize: 18, lineHeight: 1.75, color: 'var(--ella-clay-700)', paddingLeft: 22 }}>
                    {block.items.map((it, j) => <li key={j}>{it}</li>)}
                  </ul>
                );
                if (block.kind === 'table') return (
                  <table key={i} className="ella-protein-table">
                    <thead><tr>{block.headers.map((h, j) => <th key={j}>{h}</th>)}</tr></thead>
                    <tbody>{block.rows.map((row, j) => (
                      <tr key={j}>{row.map((cell, k) => <td key={k}>{cell}</td>)}</tr>
                    ))}</tbody>
                  </table>
                );
                return null;
              })}

              <p style={{ marginTop: 28 }}>
                <a href="#" onClick={(e) => { e.preventDefault(); setRoute('doctor'); }}>
                  {isEs ? 'Descarga la lista de preguntas para tu médico' : 'Grab the doctor checklist'} →
                </a>
              </p>
            </div>

            {/* More to read */}
            <div style={{ marginTop: 80, paddingTop: 40, borderTop: '1px solid var(--border-default)' }}>
              <div className="ella-eyebrow" style={{ marginBottom: 16 }}>{isEs ? 'SIGUE LEYENDO' : 'KEEP READING'}</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
                {getArticles(lang).filter(a => a.id !== article.id).slice(0, 3).map((a) => (
                  <a key={a.id} href="#" className="ella-article-mini"
                    onClick={(e) => { e.preventDefault(); setArticleId(a.id); window.scrollTo({ top: 0 }); }}>
                    <Photo aspect="16/10" tint={a.tone || 'rose'} src={a.image} alt={a.title} radius="14px" />
                    <div className="ella-article-mini-cat">{a.category}</div>
                    <div className="ella-article-mini-title">{a.title}</div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

window.ArticleView = ArticleView;

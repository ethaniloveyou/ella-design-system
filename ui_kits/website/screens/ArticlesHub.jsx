// ArticlesHub, grid of all Ella articles, filterable by category.

export function ArticlesHub({ lang, setRoute, setArticleId, initialCategory }) {
  const isEs = lang === 'es';
  const articles = getArticles(lang);
  const CATEGORY_ORDER = isEs
    ? ['Nutrici\u00f3n', 'Ejercicio', 'Salud mental']
    : ['Nutrition', 'Exercise', 'Mental Health'];
  const present = new Set(articles.map(a => a.category));
  const categories = CATEGORY_ORDER.filter(c => present.has(c));
  const allLabel = isEs ? 'Todos' : 'All';

  const [filter, setFilter] = React.useState(initialCategory || categories[0]);
  React.useEffect(() => { if (initialCategory) setFilter(initialCategory); }, [initialCategory]);

  const shown = filter === 'All' ? articles : articles.filter(a => a.category === filter);

  function open(id) {
    setArticleId(id);
    setRoute('article');
    window.scrollTo({ top: 0 });
  }

  return (
    <div data-screen-label="04 Articles Hub">
      <section className="ella-section-tight">
        <div className="ella-container">
          <div style={{ maxWidth: 820, marginBottom: 32 }}>
            <h1 className="ella-h2-italic" style={{ marginTop: 12, fontSize: 'clamp(40px, 5vw, 64px)' }}>
              {filter}
            </h1>
          </div>

          {/* Filter chips */}
          <div className="ella-article-filters">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                className={'ella-article-filter' + (filter === c ? ' is-active' : '')}
                onClick={() => setFilter(c)}
              >{c === 'All' ? allLabel : c}</button>
            ))}
          </div>

          {/* Article grid */}
          <div className="ella-article-grid">
            {shown.map((a) => (
              <article key={a.id} className="ella-article-card" data-tone={a.tone}>
                <button type="button" className="ella-article-card-img" onClick={() => open(a.id)} aria-label={a.title}>
                </button>
              </article>
            ))}
          </div>

          {shown.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 60, color: 'var(--ella-taupe-500)' }}>
              {isEs ? 'No hay artículos en esta categoría todavía.' : 'No articles in this category yet.'}
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
}

window.ArticlesHub = ArticlesHub;

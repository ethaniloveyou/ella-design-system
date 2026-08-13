// Shared UI atoms. Everything sits on a dark, moving 3D background, so the
// rules are: cream text at AA contrast, generous size (45+ audience), and no
// transform-based hover — the old system banned bouncy motion and that still
// holds here.

export function CTAButton({ as = 'button', variant = 'primary', className = '', children, ...props }) {
  const Tag = as;
  const base =
    'inline-flex items-center gap-3 rounded-xl px-7 py-4 text-[1.05rem] font-medium ' +
    'transition-colors duration-200 ease-out no-underline';
  const styles = {
    primary: 'bg-cream text-[#1a2f23] hover:bg-white',
    accent: 'bg-gold text-[#20180c] hover:bg-[#d6b881]',
    ghost: 'border border-cream/30 text-cream hover:border-cream/70 hover:bg-cream/5',
    text: 'px-0 py-0 text-cream/80 underline decoration-cream/30 underline-offset-4 hover:text-cream hover:decoration-cream',
  };
  return (
    <Tag className={`${base} ${styles[variant]} ${className}`} {...props}>
      {children}
    </Tag>
  );
}

export function Eyebrow({ children, className = '' }) {
  return (
    <div className={`text-[0.72rem] font-semibold tracking-[0.22em] text-gold uppercase ${className}`}>{children}</div>
  );
}

/** Display headline. `em` renders italic in the display serif — the one piece
 *  of the old brand voice the spec explicitly asked to keep and make bolder. */
export function Headline({ lead, em, tail, as = 'h2', className = '' }) {
  const Tag = as;
  return (
    <Tag className={`font-display text-balance leading-[1.05] tracking-[-0.02em] ${className}`}>
      {lead}
      {em ? <em className="italic text-blush">{em}</em> : null}
      {tail}
    </Tag>
  );
}

export function ContentCard({ children, className = '', accent, ...props }) {
  return (
    <div
      className={`rounded-2xl border border-cream/12 bg-black/45 p-7 backdrop-blur-[2px] transition-colors duration-200 hover:border-cream/30 ${className}`}
      style={accent ? { borderLeft: `3px solid ${accent}` } : undefined}
      {...props}
    >
      {children}
    </div>
  );
}

export function ExternalLinkRow({ label, sub, href }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center justify-between gap-6 rounded-xl border border-cream/12 bg-black/45 px-6 py-5 no-underline transition-colors duration-200 hover:border-gold/60"
    >
      <span>
        <span className="block font-display text-[1.2rem] text-cream">{label}</span>
        {sub ? <span className="mt-1 block text-[0.85rem] text-cream/65">{sub}</span> : null}
      </span>
      <span aria-hidden="true" className="shrink-0 text-gold transition-transform duration-200 group-hover:translate-x-1">
        ↗
      </span>
    </a>
  );
}

export function Disclaimer({ children }) {
  return (
    <p className="mt-10 rounded-xl border border-cream/10 bg-black/20 px-6 py-5 text-[0.9rem] italic leading-relaxed text-cream/70">
      {children}
    </p>
  );
}

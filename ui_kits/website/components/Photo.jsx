// Photo, renders a real photograph when given `src`, otherwise a warm,
// textured placeholder rectangle (a gradient with a loose figure suggestion
// and an optional caption). Production photography is women 45-70 in natural light.

export function Photo({ aspect = '4/3', caption, tint = 'rose', radius = '16px', className = '', style = {}, src, alt, objectPosition = 'center' }) {
  const tints = {
    rose:  { from: '#f6dcd1', to: '#efe7da', figure: '#c87f6e' },
    cream: { from: '#efe7da', to: '#e4d9c7', figure: '#8b7c64' },
    sage:  { from: '#e2e6d9', to: '#efe7da', figure: '#6f7e5d' },
    plum:  { from: '#e8dde2', to: '#efe7da', figure: '#7e5266' },
  };
  const c = tints[tint] || tints.rose;
  return (
    <div
      aria-label={alt || caption || 'Photograph'}
      className={className}
      style={{
        aspectRatio: aspect,
        width: '100%',
        background: `linear-gradient(135deg, ${c.from} 0%, ${c.to} 100%)`,
        borderRadius: radius,
        position: 'relative',
        overflow: 'hidden',
        ...style,
      }}
    >
      {src ? (
        <img
          src={src}
          alt={alt || ''}
          loading="lazy"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition, display: 'block' }}
        />
      ) : (
        <React.Fragment>
          {/* abstract figure suggestion */}
          <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
            <defs>
              <radialGradient id={`g-${tint}`} cx="62%" cy="50%" r="55%">
                <stop offset="0%" stopColor={c.figure} stopOpacity="0.35"/>
                <stop offset="60%" stopColor={c.figure} stopOpacity="0.06"/>
                <stop offset="100%" stopColor={c.figure} stopOpacity="0"/>
              </radialGradient>
            </defs>
            <rect width="400" height="300" fill={`url(#g-${tint})`} />
            {/* loose figure silhouette */}
            <g opacity="0.22" fill={c.figure}>
              <ellipse cx="260" cy="130" rx="42" ry="48" />
              <path d="M 200 300 Q 210 200 260 195 Q 320 200 330 300 Z" />
            </g>
          </svg>
          {caption ? (
            <div style={{
              position: 'absolute', bottom: 10, left: 12,
              fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 600,
              color: '#fff', background: 'rgba(47,38,29,0.55)',
              padding: '4px 10px', borderRadius: 999, letterSpacing: '0.04em',
            }}>{caption}</div>
          ) : null}
        </React.Fragment>
      )}
    </div>
  );
}

window.Photo = Photo;

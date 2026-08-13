// Device capability tiers. 'low' means we never mount WebGL at all and fall
// back to CSS gradients — the site has to look good without it.

const TIER_KEY = 'ella-quality-tier';

export function detectQualityTier() {
  if (typeof window === 'undefined') return 'low'; // prerender pass
  const forced = new URLSearchParams(window.location.search).get('quality');
  if (forced === 'low' || forced === 'medium' || forced === 'high') return forced;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return 'low';

  // No WebGL2 → no scene.
  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
  if (!gl) return 'low';

  const cores = navigator.hardwareConcurrency || 2;
  const memory = navigator.deviceMemory || 4;
  const coarse = window.matchMedia('(pointer: coarse)').matches;
  const maxTex = gl.getParameter(gl.MAX_TEXTURE_SIZE) || 2048;

  if (cores <= 4 || memory <= 2 || maxTex < 4096) return 'low';
  if (coarse || cores <= 6 || memory <= 4) return 'medium';
  return 'high';
}

export const TIER_SETTINGS = {
  high: { particles: 4000, dpr: [1, 2], post: true, terrainSegments: 160 },
  medium: { particles: 1800, dpr: [0.75, 1.25], post: false, terrainSegments: 90 },
  low: { particles: 0, dpr: [0.5, 1], post: false, terrainSegments: 0 },
};

let cached = null;

export function qualityTier() {
  if (cached) return cached;
  cached = detectQualityTier();
  try {
    sessionStorage.setItem(TIER_KEY, cached);
  } catch {
    /* private mode — fine */
  }
  return cached;
}

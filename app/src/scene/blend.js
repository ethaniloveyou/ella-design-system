// The blended "current theme". Recomputed once per frame by <ThemeDriver/>
// (priority -1) and read by every other scene component, so the whole scene
// agrees on one interpolated state without any React re-renders.

import { Color } from 'three';
import { sceneState, themeBracket } from './sceneState';

const lerp = (a, b, t) => a + (b - a) * t;

export const blended = {
  bgA: new Color('#1a2f23'),
  bgB: new Color('#2a2419'),
  particle: new Color('#e8c4b8'),
  accent: new Color('#c4a46c'),
  text: new Color('#f5f0e8'),
  speed: 1,
  drift: 1,
  spread: 1,
  flicker: 0,
  settle: 0,
  rainbow: 0,
  geoShow: 1,
  geoPos: [0, 0, 0],
  geoFreq: 1.15,
  geoAmp: 0.3,
  geoFacet: 0,
  geoScale: 1,
  terrain: 0,
  heat: 0,
  ripple: 0,
  contour: 0,
  grain: 0.35,
  bloom: 0.85,
  aberration: 0,
  vignette: 0.55,
};

// Scratch colours so we allocate nothing per frame.
const tmp = new Color();

function mixColor(target, a, b, t) {
  target.set(a);
  tmp.set(b);
  target.lerp(tmp, t);
}

export function updateBlend() {
  const [a, b, t] = themeBracket();

  mixColor(blended.bgA, a.bgA, b.bgA, t);
  mixColor(blended.bgB, a.bgB, b.bgB, t);
  mixColor(blended.particle, a.particle, b.particle, t);
  mixColor(blended.accent, a.accent, b.accent, t);
  mixColor(blended.text, a.text, b.text, t);

  blended.speed = lerp(a.particles.speed, b.particles.speed, t);
  blended.drift = lerp(a.particles.drift, b.particles.drift, t);
  blended.spread = lerp(a.particles.spread, b.particles.spread, t);
  blended.flicker = lerp(a.particles.flicker, b.particles.flicker, t);
  blended.settle = lerp(a.particles.settle, b.particles.settle, t);
  blended.rainbow = lerp(a.particles.rainbow || 0, b.particles.rainbow || 0, t);

  blended.geoShow = lerp(a.geo.show, b.geo.show, t);
  for (let i = 0; i < 3; i++) blended.geoPos[i] = lerp(a.pos[i], b.pos[i], t);
  blended.geoFreq = lerp(a.geo.freq, b.geo.freq, t);
  blended.geoAmp = lerp(a.geo.amp, b.geo.amp, t);
  blended.geoFacet = lerp(a.geo.facet, b.geo.facet, t);
  blended.geoScale = lerp(a.geo.scale, b.geo.scale, t);
  blended.terrain = lerp(a.terrain, b.terrain, t);

  blended.heat = lerp(a.shader.heat, b.shader.heat, t);
  blended.ripple = lerp(a.shader.ripple, b.shader.ripple, t);
  blended.contour = lerp(a.shader.contour, b.shader.contour, t);
  blended.grain = lerp(a.shader.grain, b.shader.grain, t);

  blended.bloom = lerp(a.post.bloom, b.post.bloom, t);
  blended.aberration = lerp(a.post.aberration, b.post.aberration, t);
  blended.vignette = lerp(a.post.vignette, b.post.vignette, t);

  // Deep pages (article, quiz, checklist) are reading surfaces. The scene
  // stays alive but drops to a quiet drifting field — no central form, no
  // terrain, nothing that can sit under a paragraph.
  if (sceneState.idle) {
    blended.geoShow = 0;
    blended.terrain = 0;
    blended.speed *= 0.35;
    blended.flicker = 0;
    blended.bloom *= 0.45;
    blended.aberration = 0;
  }
}

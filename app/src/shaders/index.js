// GLSL lives in .glsl files (editor tooling, no template-string escaping) and
// gets stitched here. `#include_noise` is our own one-line include because
// WebGL has no preprocessor include of its own.

import noise from './noise.glsl?raw';
import bgVert from './background.vert.glsl?raw';
import bgFrag from './background.frag.glsl?raw';
import particlesVert from './particles.vert.glsl?raw';
import particlesFrag from './particles.frag.glsl?raw';
import organicVert from './organic.vert.glsl?raw';
import organicFrag from './organic.frag.glsl?raw';
import terrainVert from './terrain.vert.glsl?raw';
import terrainFrag from './terrain.frag.glsl?raw';

const withIncludes = (src) => src.replace('#include_noise', noise);

export const BACKGROUND_VERT = withIncludes(bgVert);
export const BACKGROUND_FRAG = withIncludes(bgFrag);
export const PARTICLES_VERT = withIncludes(particlesVert);
export const PARTICLES_FRAG = withIncludes(particlesFrag);
export const ORGANIC_VERT = withIncludes(organicVert);
export const ORGANIC_FRAG = withIncludes(organicFrag);
export const TERRAIN_VERT = withIncludes(terrainVert);
export const TERRAIN_FRAG = withIncludes(terrainFrag);

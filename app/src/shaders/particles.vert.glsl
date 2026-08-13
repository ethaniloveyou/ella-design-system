// Seeds / spores / embers / dust. One buffer, one draw call — behaviour is
// driven entirely by uniforms so the field morphs between sections instead of
// being rebuilt.

precision highp float;

attribute float aSeed;
attribute float aSize;

uniform float uTime;
uniform float uSpeed;
uniform float uDrift;
uniform float uSpread;
uniform float uSettle;   // 1 = dust settling onto terrain
uniform float uHeight;
uniform vec2  uPointer;
uniform float uPixelRatio;

varying float vSeed;
varying float vDepth;

void main() {
  vec3 p = position;

  // Horizontal spread widens/narrows per theme.
  p.xz *= uSpread;

  // Upward drift, wrapped. Per-particle speed jitter from the seed.
  float speed = uSpeed * (0.55 + aSeed * 0.9);
  p.y = mod(p.y + uTime * speed + aSeed * uHeight, uHeight) - uHeight * 0.5;

  // Lateral wander.
  float w = uTime * 0.25 + aSeed * 6.2831;
  p.x += sin(w) * uDrift * 0.9;
  p.z += cos(w * 0.83) * uDrift * 0.7;

  // Settling: pull everything down onto a plane and fan it outwards.
  float floorY = -3.4;
  p.y = mix(p.y, floorY + sin(aSeed * 12.0 + uTime * 0.2) * 0.25, uSettle);
  p.xz = mix(p.xz, p.xz * 2.1, uSettle);

  // Cursor parallax — subtle, it should read as air moving, not a cursor toy.
  p.x += uPointer.x * (0.5 + aSeed) * 0.55;
  p.y += uPointer.y * (0.5 + aSeed) * 0.35;

  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  vDepth = -mv.z;
  vSeed = aSeed;

  gl_PointSize = aSize * uPixelRatio * (14.0 / max(vDepth, 0.1));
  gl_Position = projectionMatrix * mv;
}

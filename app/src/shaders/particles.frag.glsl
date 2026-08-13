precision highp float;

uniform vec3  uColor;
uniform vec3  uAccent;
uniform float uFlicker;
uniform float uRainbow;
uniform float uTime;
uniform float uOpacity;

varying float vSeed;
varying float vDepth;

vec3 hue(float h) {
  vec3 k = vec3(1.0, 2.0 / 3.0, 1.0 / 3.0);
  vec3 p = abs(fract(vec3(h) + k) * 6.0 - 3.0);
  return clamp(p - 1.0, 0.0, 1.0);
}

void main() {
  // Soft round sprite, no texture needed.
  vec2 d = gl_PointCoord - 0.5;
  float r = length(d);
  float alpha = smoothstep(0.5, 0.06, r);
  if (alpha < 0.01) discard;

  vec3 col = mix(uColor, uAccent, vSeed * 0.6);

  // Convergence section: particles cycle every previous section's colour.
  col = mix(col, mix(col, hue(fract(vSeed + uTime * 0.03)), 0.45), uRainbow);

  // Ember flicker.
  float flick = 1.0 + uFlicker * sin(uTime * 6.0 + vSeed * 40.0) * 0.55;

  // Depth fade so the field has air in it.
  float depthFade = smoothstep(26.0, 5.0, vDepth);

  gl_FragColor = vec4(col * flick, alpha * depthFade * uOpacity);
}

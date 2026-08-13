precision highp float;

uniform vec3  uColor;
uniform vec3  uAccent;
uniform float uOpacity;

varying float vHeight;
varying vec2  vUvT;

void main() {
  float h = vHeight * 0.5 + 0.5;

  // Contour rings, thickness compensated so lines stay ~1px on slopes.
  float scaled = h * 18.0;
  float dist = abs(fract(scaled) - 0.5) / max(fwidth(scaled), 0.0001);
  float line = 1.0 - smoothstep(0.0, 1.6, dist);

  // Kept deliberately dim — this is ground the content sits above, not a
  // surface competing with the supplement cards for attention.
  vec3 col = mix(uColor * 0.04, uColor * 0.30, h);
  col += uAccent * line * 0.30;

  // Fade the plane out at its edges so it never shows a hard rectangle.
  vec2 e = abs(vUvT - 0.5) * 2.0;
  float edge = 1.0 - smoothstep(0.55, 1.0, max(e.x, e.y));

  gl_FragColor = vec4(col, edge * uOpacity * 0.55);
}

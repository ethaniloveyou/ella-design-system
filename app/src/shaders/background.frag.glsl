// Background gradient. One shader, four blended modes — heat shimmer
// (Ejercicio), lunar ripple (Salud mental), topographic contours
// (Suplementos), plus the base Perlin-warped gradient everything shares.
// Blending by uniform rather than swapping materials is what makes the
// section transitions continuous instead of a cut.

precision highp float;

varying vec2 vUv;

uniform float uTime;
uniform vec2  uResolution;
uniform vec2  uMouse;      // -1..1
uniform vec3  uColorA;     // deep base
uniform vec3  uColorB;     // secondary
uniform vec3  uAccent;
uniform float uHeat;
uniform float uRipple;
uniform float uContour;
uniform float uGrain;

#include_noise

void main() {
  vec2 uv = vUv;
  float aspect = uResolution.x / max(uResolution.y, 1.0);
  vec2 p = vec2((uv.x - 0.5) * aspect, uv.y - 0.5);

  // --- heat shimmer: sine UV distortion, strongest low on screen ---
  float heatMask = smoothstep(1.0, 0.0, uv.y);
  uv.x += uHeat * heatMask * 0.018 * sin(uv.y * 22.0 - uTime * 1.4);
  uv.y += uHeat * heatMask * 0.010 * sin(uv.x * 17.0 + uTime * 0.9);

  // --- lunar ripple: slow standing waves + a soft ring under the cursor ---
  float d = length(p - uMouse * vec2(0.5 * aspect, 0.5));
  float ring = sin(d * 16.0 - uTime * 1.1) * exp(-d * 3.2);
  uv += uRipple * (ring * 0.012 + vec2(
    sin(uv.y * 5.0 + uTime * 0.18) * 0.010,
    sin(uv.x * 4.0 - uTime * 0.13) * 0.008
  ));

  // --- base gradient, warped by slow fbm so it never reads as flat ---
  float warp = fbm(vec3(uv * 2.1, uTime * 0.045)) * 0.5 + 0.5;
  float g = clamp(uv.y * 0.85 + warp * 0.30, 0.0, 1.0);
  vec3 col = mix(uColorA, uColorB, g);

  // A very soft accent bloom drifting through the field.
  float wash = fbm(vec3(uv * 1.4 + vec2(0.0, uTime * 0.02), uTime * 0.03));
  col = mix(col, uAccent, smoothstep(0.45, 1.0, wash) * 0.14);

  // --- topographic contour lines ---
  if (uContour > 0.001) {
    float h = fbm(vec3(uv * 3.4, uTime * 0.02)) * 0.5 + 0.5;
    float lines = abs(fract(h * 14.0) - 0.5);
    float band = smoothstep(0.06, 0.0, lines);
    col += uAccent * band * 0.22 * uContour;
  }

  // --- ember glow low in frame ---
  col += uAccent * uHeat * heatMask * heatMask * 0.10;

  // Dither. Kills banding on the big flat gradients, and does the job a
  // grain overlay would without another texture.
  float dither = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
  col += (dither - 0.5) * uGrain * 0.012;

  gl_FragColor = vec4(col, 1.0);
}

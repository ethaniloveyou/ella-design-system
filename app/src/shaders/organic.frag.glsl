precision highp float;

uniform vec3  uColor;
uniform vec3  uAccent;
uniform vec3  uDeep;
uniform float uOpacity;

varying vec3 vNormalW;
varying vec3 vViewDir;
varying float vDisp;

void main() {
  vec3 n = normalize(vNormalW);
  vec3 v = normalize(vViewDir);

  // Soft key light from upper-left, warm fill from below.
  vec3 key = normalize(vec3(-0.5, 0.8, 0.6));
  float lambert = clamp(dot(n, key) * 0.5 + 0.5, 0.0, 1.0);
  float fill = clamp(dot(n, -key) * 0.5 + 0.5, 0.0, 1.0);

  // Rim: this is what makes it read as a lit object against a dark field.
  float fres = pow(1.0 - clamp(dot(n, v), 0.0, 1.0), 2.4);

  vec3 col = mix(uDeep, uColor, lambert);
  col = mix(col, uAccent, fill * 0.25 + vDisp * 0.2);
  col += uAccent * fres * 0.9;

  gl_FragColor = vec4(col, uOpacity);
}

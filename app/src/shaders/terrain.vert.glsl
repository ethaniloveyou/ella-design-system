// Suplementos: the form flattens into ground. Procedural height on a plane,
// contour lines drawn in the fragment stage from the same height value.

precision highp float;

uniform float uTime;
uniform float uAmp;

varying float vHeight;
varying vec2  vUvT;

#include_noise

void main() {
  vUvT = uv;
  float h = fbm(vec3(uv * 3.0, uTime * 0.03));
  vHeight = h;

  vec3 p = position;
  p.z += h * uAmp;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
}

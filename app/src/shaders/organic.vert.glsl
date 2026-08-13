// The central form. An icosahedron whose vertices are pushed along their
// normals by noise — raising uFreq turns the smooth blob branchy, uFacet
// quantises the displacement into flat planes for the ember/crystal look.

precision highp float;

uniform float uTime;
uniform float uFreq;
uniform float uAmp;
uniform float uFacet;
uniform float uBreath;

varying vec3 vNormalW;
varying vec3 vViewDir;
varying float vDisp;

#include_noise

float displace(vec3 p) {
  float n = fbm(p * uFreq + vec3(0.0, uTime * 0.10, 0.0));
  // Quantise into facets. Same field, harder edges.
  float faceted = floor(n * 4.0) / 4.0;
  return mix(n, faceted, uFacet) * uAmp;
}

void main() {
  vec3 n = normalize(normal);
  float d = displace(position);

  // Recompute the normal from two nearby samples so lighting follows the
  // displacement instead of the original sphere.
  vec3 tangent = normalize(cross(n, vec3(0.0, 1.0, 0.0) + 0.001));
  vec3 bitan = normalize(cross(n, tangent));
  float e = 0.06;
  float dt = displace(position + tangent * e);
  float db = displace(position + bitan * e);
  vec3 newN = normalize(n - (tangent * (dt - d) + bitan * (db - d)) / e);

  vec3 p = position + n * d;
  p *= uBreath;

  vec4 world = modelMatrix * vec4(p, 1.0);
  vNormalW = normalize(mat3(modelMatrix) * newN);
  vViewDir = normalize(cameraPosition - world.xyz);
  vDisp = d / max(uAmp, 0.0001);

  gl_Position = projectionMatrix * viewMatrix * world;
}

precision highp float;

varying vec2 vUv;

void main() {
  vUv = uv;
  // Fullscreen triangle — already in clip space, no camera involved.
  gl_Position = vec4(position.xy, 1.0, 1.0);
}

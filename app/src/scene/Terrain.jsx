import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Color, PlaneGeometry, ShaderMaterial, DoubleSide } from 'three';
import { TERRAIN_FRAG, TERRAIN_VERT } from '../shaders';
import { blended } from './blend';

/**
 * Suplementos only. Crossfades in as the organic form fades out — a genuine
 * vertex morph between a sphere and a ground plane looks like a bug, a
 * crossfade reads as the form settling into terrain.
 */
export function Terrain({ segments = 160 }) {
  const meshRef = useRef();
  const geometry = useMemo(() => new PlaneGeometry(22, 22, segments, segments), [segments]);

  const material = useMemo(
    () =>
      new ShaderMaterial({
        vertexShader: TERRAIN_VERT,
        fragmentShader: TERRAIN_FRAG,
        transparent: true,
        depthWrite: false,
        side: DoubleSide,
        uniforms: {
          uTime: { value: 0 },
          uAmp: { value: 1.6 },
          uColor: { value: new Color('#d4c4a8') },
          uAccent: { value: new Color('#7c8c6c') },
          uOpacity: { value: 0 },
        },
      }),
    []
  );

  useFrame((_, dt) => {
    const u = material.uniforms;
    u.uTime.value += dt;
    u.uColor.value.copy(blended.particle);
    u.uAccent.value.copy(blended.accent);
    u.uOpacity.value = blended.terrain;
    if (meshRef.current) meshRef.current.visible = blended.terrain > 0.01;
  });

  // Tilted away from the camera so it reads as ground, not a wall.
  return (
    <mesh ref={meshRef} geometry={geometry} material={material} rotation={[-1.32, 0, 0]} position={[0, -4.6, -2]} />
  );
}

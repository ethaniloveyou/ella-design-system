import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Color, FrontSide, IcosahedronGeometry, ShaderMaterial } from 'three';
import { ORGANIC_FRAG, ORGANIC_VERT } from '../shaders';
import { blended } from './blend';

/**
 * The single central form. It never gets swapped out — the noise uniforms
 * driving its vertex displacement are what turn it from a breathing blob into
 * a branching shape into a faceted crystal into a cratered moon.
 */
export function OrganicGeometry({ detail = 5 }) {
  const meshRef = useRef();
  const geometry = useMemo(() => new IcosahedronGeometry(1.55, detail), [detail]);

  const material = useMemo(
    () =>
      new ShaderMaterial({
        vertexShader: ORGANIC_VERT,
        fragmentShader: ORGANIC_FRAG,
        transparent: true,
        // Front faces + depth write. With DoubleSide and no depth write the
        // back of the form drew over its own front and read as flat plates.
        side: FrontSide,
        depthWrite: true,
        uniforms: {
          uTime: { value: 0 },
          uFreq: { value: 1.15 },
          uAmp: { value: 0.3 },
          uFacet: { value: 0 },
          uBreath: { value: 1 },
          uColor: { value: new Color('#e8c4b8') },
          uAccent: { value: new Color('#c4a46c') },
          uDeep: { value: new Color('#101d16') },
          uOpacity: { value: 1 },
        },
      }),
    []
  );

  useFrame((_, dt) => {
    const u = material.uniforms;
    u.uTime.value += dt;
    u.uFreq.value = blended.geoFreq;
    u.uAmp.value = blended.geoAmp;
    u.uFacet.value = blended.geoFacet;
    // Breathing: slow sine, never a bounce.
    u.uBreath.value = blended.geoScale * (1 + Math.sin(u.uTime.value * 0.42) * 0.035);
    u.uColor.value.copy(blended.particle);
    u.uAccent.value.copy(blended.accent);
    u.uDeep.value.copy(blended.bgA);
    u.uOpacity.value = blended.geoShow;

    if (meshRef.current) {
      // Per-theme placement, lerped — it has to stay clear of the text column.
      meshRef.current.position.set(blended.geoPos[0], blended.geoPos[1], blended.geoPos[2]);
      meshRef.current.rotation.y += dt * 0.055;
      meshRef.current.rotation.x = Math.sin(u.uTime.value * 0.12) * 0.12;
      meshRef.current.visible = blended.geoShow > 0.01;
    }
  });

  return <mesh ref={meshRef} geometry={geometry} material={material} />;
}

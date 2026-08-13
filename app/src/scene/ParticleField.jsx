import { useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { AdditiveBlending, BufferAttribute, BufferGeometry, Color, ShaderMaterial } from 'three';
import { PARTICLES_FRAG, PARTICLES_VERT } from '../shaders';
import { blended } from './blend';
import { sceneState } from './sceneState';

const FIELD_HEIGHT = 18;

// ponytail: THREE.Points, not InstancedMesh. The spec asked for instancing to
// keep it to one draw call — Points is one draw call *and* skips per-instance
// matrices, so it's strictly cheaper here. Switch to InstancedMesh only if the
// particles ever need real geometry (they're round sprites today).
export function ParticleField({ count = 4000 }) {
  const { viewport } = useThree();

  const geometry = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const seed = new Float32Array(count);
    const size = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 0] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = (Math.random() - 0.5) * FIELD_HEIGHT;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 12 - 2;
      seed[i] = Math.random();
      size[i] = 0.6 + Math.random() * 2.4;
    }
    const g = new BufferGeometry();
    g.setAttribute('position', new BufferAttribute(pos, 3));
    g.setAttribute('aSeed', new BufferAttribute(seed, 1));
    g.setAttribute('aSize', new BufferAttribute(size, 1));
    return g;
  }, [count]);

  const material = useMemo(
    () =>
      new ShaderMaterial({
        vertexShader: PARTICLES_VERT,
        fragmentShader: PARTICLES_FRAG,
        transparent: true,
        depthWrite: false,
        blending: AdditiveBlending,
        uniforms: {
          uTime: { value: 0 },
          uSpeed: { value: 1 },
          uDrift: { value: 1 },
          uSpread: { value: 1 },
          uSettle: { value: 0 },
          uFlicker: { value: 0 },
          uRainbow: { value: 0 },
          uHeight: { value: FIELD_HEIGHT },
          uPointer: { value: { x: 0, y: 0 } },
          uPixelRatio: { value: 1 },
          uColor: { value: new Color('#e8c4b8') },
          uAccent: { value: new Color('#c4a46c') },
          uOpacity: { value: 1 },
        },
      }),
    []
  );

  useFrame((_, dt) => {
    const u = material.uniforms;
    u.uTime.value += dt;
    u.uSpeed.value = blended.speed;
    u.uDrift.value = blended.drift;
    u.uSpread.value = blended.spread;
    u.uSettle.value = blended.settle;
    u.uFlicker.value = blended.flicker;
    u.uRainbow.value = blended.rainbow;
    u.uPixelRatio.value = viewport.dpr;
    u.uPointer.value.x = sceneState.pointer.x;
    u.uPointer.value.y = sceneState.pointer.y;
    u.uColor.value.copy(blended.particle);
    u.uAccent.value.copy(blended.accent);
    u.uOpacity.value = sceneState.idle ? 0.35 : 1;
  });

  return <points geometry={geometry} material={material} frustumCulled={false} />;
}

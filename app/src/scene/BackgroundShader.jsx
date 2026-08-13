import { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { BufferAttribute, BufferGeometry, Color, ShaderMaterial, Vector2 } from 'three';
import { BACKGROUND_FRAG, BACKGROUND_VERT } from '../shaders';
import { blended } from './blend';
import { sceneState } from './sceneState';

/** Fullscreen triangle — cheaper than a quad and never needs resizing. */
function fullscreenTriangle() {
  const g = new BufferGeometry();
  g.setAttribute('position', new BufferAttribute(new Float32Array([-1, -1, 0, 3, -1, 0, -1, 3, 0]), 3));
  g.setAttribute('uv', new BufferAttribute(new Float32Array([0, 0, 2, 0, 0, 2]), 2));
  return g;
}

export function BackgroundShader() {
  const { size, viewport } = useThree();
  const matRef = useRef();

  const geometry = useMemo(fullscreenTriangle, []);

  const material = useMemo(
    () =>
      new ShaderMaterial({
        vertexShader: BACKGROUND_VERT,
        fragmentShader: BACKGROUND_FRAG,
        depthTest: false,
        depthWrite: false,
        uniforms: {
          uTime: { value: 0 },
          uResolution: { value: new Vector2(1, 1) },
          uMouse: { value: new Vector2(0, 0) },
          uColorA: { value: new Color('#1a2f23') },
          uColorB: { value: new Color('#2a2419') },
          uAccent: { value: new Color('#c4a46c') },
          uHeat: { value: 0 },
          uRipple: { value: 0 },
          uContour: { value: 0 },
          uGrain: { value: 0.35 },
        },
      }),
    []
  );

  useFrame((_, dt) => {
    const u = material.uniforms;
    u.uTime.value += dt;
    u.uResolution.value.set(size.width * viewport.dpr, size.height * viewport.dpr);
    u.uMouse.value.set(sceneState.pointer.x, sceneState.pointer.y);
    u.uColorA.value.copy(blended.bgA);
    u.uColorB.value.copy(blended.bgB);
    u.uAccent.value.copy(blended.accent);
    u.uHeat.value = blended.heat;
    u.uRipple.value = blended.ripple;
    u.uContour.value = blended.contour;
    u.uGrain.value = blended.grain;
  });

  return <mesh ref={matRef} geometry={geometry} material={material} renderOrder={-10} frustumCulled={false} />;
}

import { Suspense, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Bloom, ChromaticAberration, EffectComposer, Vignette } from '@react-three/postprocessing';
import { BackgroundShader } from './BackgroundShader';
import { ParticleField } from './ParticleField';
import { OrganicGeometry } from './OrganicGeometry';
import { Terrain } from './Terrain';
import { blended, updateBlend } from './blend';
import { sceneState } from './sceneState';
import { TIER_SETTINGS } from '../hooks/useQualityTier';

/** Runs before every other useFrame (negative priority) so the frame is consistent. */
function ThemeDriver() {
  const { camera } = useThree();
  useFrame((_, dt) => {
    // Ease the pointer so parallax glides instead of snapping.
    const k = Math.min(1, dt * 3.5);
    sceneState.pointer.x += (sceneState.pointerTarget.x - sceneState.pointer.x) * k;
    sceneState.pointer.y += (sceneState.pointerTarget.y - sceneState.pointer.y) * k;

    updateBlend();

    // Camera pulls back through the page, then tilts down over the terrain.
    const target = 9 + sceneState.progress * 3.4;
    camera.position.z += (target - camera.position.z) * Math.min(1, dt * 2);
    camera.position.y += (blended.terrain * 1.6 - camera.position.y) * Math.min(1, dt * 2);
    camera.lookAt(0, blended.terrain * -0.9, 0);
  }, -1);
  return null;
}

function Post() {
  const bloom = useRef();
  const aberration = useRef();
  const vignette = useRef();

  useFrame(() => {
    if (bloom.current) bloom.current.intensity = blended.bloom;
    if (aberration.current) aberration.current.offset.set(blended.aberration * 0.0016, blended.aberration * 0.0012);
    if (vignette.current) vignette.current.darkness = blended.vignette;
  });

  return (
    <EffectComposer multisampling={0}>
      <Bloom ref={bloom} intensity={0.85} luminanceThreshold={0.15} luminanceSmoothing={0.5} mipmapBlur />
      <ChromaticAberration ref={aberration} offset={[0, 0]} />
      <Vignette ref={vignette} eskil={false} offset={0.28} darkness={0.55} />
    </EffectComposer>
  );
}

export function SceneRoot({ tier }) {
  const settings = TIER_SETTINGS[tier] || TIER_SETTINGS.medium;

  return (
    <div className="fixed inset-0 -z-10" aria-hidden="true">
      <Canvas
        dpr={settings.dpr}
        gl={{ antialias: false, powerPreference: 'high-performance', alpha: false }}
        camera={{ position: [0, 0, 9], fov: 45 }}
      >
        <Suspense fallback={null}>
          <ThemeDriver />
          <BackgroundShader />
          <ParticleField count={settings.particles} />
          <OrganicGeometry detail={tier === 'high' ? 5 : 3} />
          <Terrain segments={settings.terrainSegments} />
          {settings.post && <Post />}
        </Suspense>
      </Canvas>
    </div>
  );
}

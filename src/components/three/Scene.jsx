import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import Lighting from './Lighting';
import Planet from './Planet';
import Particles from './Particles';
import WebGLFallback from './WebGLFallback';

function CameraRig({ tier, reducedMotion }) {
  useFrame((state) => {
    if (reducedMotion || tier === 'mobile') {
      return;
    }

    const targetX = state.pointer.x * 0.35;
    const targetY = state.pointer.y * 0.22 + 0.15;

    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetX, 0.04);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, 0.04);
    state.camera.lookAt(0, 0, 0);
  });

  return null;
}

/**
 * Adaptive, lazy-loaded React Three Fiber 3D Hero canvas.
 */
export default function Scene({ tier = 'desktop', reducedMotion = false }) {
  const [contextLost, setContextLost] = useState(false);
  const cleanupRef = useRef(null);

  useEffect(() => {
    return () => {
      cleanupRef.current?.();
    };
  }, []);

  if (contextLost) {
    return <WebGLFallback reducedMotion={reducedMotion} />;
  }

  const dpr = tier === 'desktop' ? [1, 1.75] : tier === 'tablet' ? [1, 1.4] : [1, 1.2];

  return (
    <div className="relative h-full w-full touch-pan-y select-none" aria-hidden="true">
      <Canvas
        dpr={dpr}
        frameloop={reducedMotion ? 'demand' : 'always'}
        camera={{ position: [0, 0.15, 6.1], fov: 42, near: 0.1, far: 40 }}
        gl={{
          antialias: tier !== 'mobile',
          alpha: true,
          powerPreference: 'high-performance',
        }}
        onCreated={({ gl }) => {
          cleanupRef.current?.();
          const canvas = gl.domElement;

          const handleContextLost = (event) => {
            event.preventDefault();
            setContextLost(true);
          };

          const handleContextRestored = () => {
            setContextLost(false);
          };

          canvas.addEventListener('webglcontextlost', handleContextLost);
          canvas.addEventListener('webglcontextrestored', handleContextRestored);

          cleanupRef.current = () => {
            canvas.removeEventListener('webglcontextlost', handleContextLost);
            canvas.removeEventListener('webglcontextrestored', handleContextRestored);
          };
        }}
      >
        <Lighting />
        <Particles tier={tier} reducedMotion={reducedMotion} />
        <Planet tier={tier} reducedMotion={reducedMotion} />
        <CameraRig tier={tier} reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
}

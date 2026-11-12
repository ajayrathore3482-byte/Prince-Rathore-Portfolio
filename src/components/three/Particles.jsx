import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const PARTICLE_COUNTS = {
  desktop: 850,
  tablet: 420,
  mobile: 200,
};

/**
 * GPU-friendly BufferGeometry starfield & cosmic dust particles scaled by device tier.
 */
export default function Particles({ tier = 'desktop', reducedMotion = false }) {
  const pointsRef = useRef(null);
  const count = PARTICLE_COUNTS[tier] || PARTICLE_COUNTS.desktop;

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const palette = [
      new THREE.Color('#ffffff'),
      new THREE.Color('#398BFF'),
      new THREE.Color('#8B5CF6'),
      new THREE.Color('#93c5fd'),
    ];

    for (let i = 0; i < count; i += 1) {
      // Deterministic spherical distribution around the orbital scene
      const radius = 3.6 + ((i * 73) % 100) * 0.055;
      const theta = i * 2.399963229728653; // Golden angle
      const phi = Math.acos(1 - (2 * (i + 0.5)) / count);

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.78;
      pos[i * 3 + 2] = radius * Math.cos(phi);

      const tint = palette[i % palette.length];
      col[i * 3] = tint.r;
      col[i * 3 + 1] = tint.g;
      col[i * 3 + 2] = tint.b;
    }

    return { positions: pos, colors: col };
  }, [count]);

  useFrame((state, delta) => {
    if (reducedMotion || !pointsRef.current) {
      return;
    }

    const clampedDelta = Math.min(delta, 0.05);
    pointsRef.current.rotation.y += clampedDelta * 0.035;

    if (tier !== 'mobile') {
      pointsRef.current.rotation.x = THREE.MathUtils.lerp(
        pointsRef.current.rotation.x,
        state.pointer.y * 0.08,
        0.04
      );
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry key={count}>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={tier === 'mobile' ? 0.045 : 0.035}
        vertexColors
        transparent
        opacity={0.78}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

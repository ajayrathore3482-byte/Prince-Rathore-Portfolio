import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const SEGMENTS_BY_TIER = {
  desktop: 48,
  tablet: 36,
  mobile: 24,
};

/**
 * Procedural futuristic 3D planet with wireframe lattice, atmospheric rim, and dual orbital rings.
 */
export default function Planet({ tier = 'desktop', reducedMotion = false }) {
  const groupRef = useRef(null);
  const coreRef = useRef(null);
  const outerRingRef = useRef(null);
  const innerRingRef = useRef(null);
  const satelliteRef = useRef(null);

  const segments = SEGMENTS_BY_TIER[tier] || SEGMENTS_BY_TIER.desktop;
  const ringSegments = tier === 'mobile' ? 64 : 110;
  const baseScale = tier === 'mobile' ? 0.88 : tier === 'tablet' ? 0.96 : 1.04;

  useFrame((state, delta) => {
    if (reducedMotion || !groupRef.current) {
      return;
    }

    const clampedDelta = Math.min(delta, 0.05);

    if (coreRef.current) {
      coreRef.current.rotation.y += clampedDelta * 0.16;
    }
    if (outerRingRef.current) {
      outerRingRef.current.rotation.z += clampedDelta * 0.14;
    }
    if (innerRingRef.current) {
      innerRingRef.current.rotation.z -= clampedDelta * 0.2;
    }
    if (satelliteRef.current) {
      const t = state.clock.elapsedTime * 0.7;
      satelliteRef.current.position.set(
        Math.cos(t) * 2.1,
        Math.sin(t * 0.6) * 0.35,
        Math.sin(t) * 2.1
      );
    }

    // Subtle mouse-responsive tilt (disabled on mobile touch viewports)
    if (tier !== 'mobile') {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        state.pointer.x * 0.28,
        0.05
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -state.pointer.y * 0.18,
        0.05
      );
    }
  });

  return (
    <group ref={groupRef} scale={baseScale}>
      {/* Core planet + engineering wireframe shell */}
      <group ref={coreRef}>
        <mesh>
          <sphereGeometry key={`core-${segments}`} args={[1.28, segments, segments]} />
          <meshStandardMaterial
            color="#101a36"
            emissive="#0c1c3f"
            emissiveIntensity={0.65}
            roughness={0.42}
            metalness={0.55}
          />
        </mesh>

        {/* Subtle geometric tech grid over planet */}
        <mesh scale={1.015}>
          <icosahedronGeometry key={`wire-${tier}`} args={[1.28, tier === 'mobile' ? 2 : 3]} />
          <meshBasicMaterial color="#398BFF" wireframe transparent opacity={0.14} />
        </mesh>
      </group>

      {/* Atmospheric rim halo */}
      <mesh scale={1.08}>
        <sphereGeometry key={`halo-${segments}`} args={[1.28, segments, segments]} />
        <meshBasicMaterial
          color="#398BFF"
          transparent
          opacity={0.09}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>

      {/* Primary electric-blue orbital ring */}
      <mesh ref={outerRingRef} rotation={[Math.PI / 2.6, 0.24, 0]}>
        <torusGeometry key={`outer-${ringSegments}`} args={[2.1, 0.018, 12, ringSegments]} />
        <meshBasicMaterial color="#398BFF" transparent opacity={0.68} />
      </mesh>

      {/* Secondary violet counter-tilted orbital ring */}
      <mesh ref={innerRingRef} rotation={[Math.PI / 2.1, -0.38, 0.2]}>
        <torusGeometry
          key={`inner-${ringSegments}`}
          args={[1.76, 0.013, 10, Math.max(48, ringSegments - 14)]}
        />
        <meshBasicMaterial color="#8B5CF6" transparent opacity={0.55} />
      </mesh>

      {/* Orbiting data-node satellite */}
      <mesh ref={satelliteRef} position={[2.1, 0, 0]}>
        <sphereGeometry args={[0.065, 16, 16]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
    </group>
  );
}

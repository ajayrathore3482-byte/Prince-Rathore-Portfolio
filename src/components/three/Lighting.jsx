/**
 * Electric blue and violet space lighting rig for the 3D Hero planet and orbital rings.
 */
export default function Lighting() {
  return (
    <>
      <ambientLight intensity={0.45} color="#b8d0ff" />
      <directionalLight position={[5, 4, 5]} intensity={2.1} color="#398BFF" />
      <pointLight position={[-4.5, -2.5, 3]} intensity={2.4} distance={16} color="#8B5CF6" />
      <pointLight position={[0, 4, -4]} intensity={1.1} distance={14} color="#60a5fa" />
    </>
  );
}


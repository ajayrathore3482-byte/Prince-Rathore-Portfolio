/**
 * Lightweight CSS space backdrop with layered starfields, soft ambient lighting, and subtle grid.
 */
export default function CosmicBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#080A12]"
    >
      {/* Distant & near CSS starfields */}
      <div className="cosmic-stars-far animate-star-twinkle absolute inset-0 opacity-60" />
      <div className="cosmic-stars-near absolute inset-0 opacity-45" />

      {/* Subtle architectural perspective grid */}
      <div className="space-grid-overlay absolute inset-0" />

      {/* Restrained blue and violet ambient nebula lighting */}
      <div
        className="absolute -top-40 -left-32 h-[30rem] w-[30rem] rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(57, 139, 255, 0.12) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute top-[28%] -right-36 h-[28rem] w-[28rem] rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute bottom-[-10rem] left-1/3 h-[26rem] w-[26rem] rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(57, 139, 255, 0.08) 0%, transparent 72%)',
        }}
      />
    </div>
  );
}


/**
 * Static CSS/SVG cosmic fallback rendered when WebGL is unavailable, fails, or while 3D assets load.
 */
export default function WebGLFallback({ reducedMotion = false }) {
  return (
    <div
      data-testid="webgl-fallback"
      aria-hidden="true"
      className="relative flex h-full min-h-[280px] w-full items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-[#101522]/45 backdrop-blur-sm"
    >
      {/* Subtle radial cosmic glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 48%, rgba(57, 139, 255, 0.16) 0%, rgba(139, 92, 246, 0.1) 36%, transparent 70%)',
        }}
      />

      {/* Orbital rings + planet silhouette */}
      <div className="relative flex h-56 w-56 items-center justify-center sm:h-64 sm:w-64">
        <div
          className={`absolute inset-0 rounded-full border border-[#398BFF]/35 border-t-[#398BFF] ${
            reducedMotion ? '' : 'animate-orbit'
          }`}
        />
        <div
          className={`absolute inset-5 rounded-full border border-[#8B5CF6]/30 border-b-[#8B5CF6] ${
            reducedMotion ? '' : 'animate-orbit-reverse'
          }`}
        />
        <div
          className="relative h-28 w-28 rounded-full border border-white/20 shadow-[0_0_40px_rgba(57,139,255,0.22)] sm:h-32 sm:w-32"
          style={{
            background:
              'radial-gradient(circle at 32% 30%, #398BFF 0%, #1d2d5c 45%, #080A12 95%)',
          }}
        >
          <div className="absolute inset-2 rounded-full border border-white/10" />
        </div>
      </div>
    </div>
  );
}


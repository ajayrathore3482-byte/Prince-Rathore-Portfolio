import { Calendar, FileSearch, Layers, Mail, MessageSquare, Server } from 'lucide-react';

/**
 * Original CSS-based illustrative software architecture preview.
 * Intentionally avoids exposing confidential company UI, source code, or business data.
 */
export default function ProjectMockup({ type = 'erp', title }) {
  const isRecruitment = type === 'recruitment';

  return (
    <div
      aria-label={`Illustrative software preview for ${title}`}
      className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/10 bg-[#080A12] p-4 transition-transform duration-300 group-hover:scale-[1.02]"
    >
      {/* Subtle space ambient accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: isRecruitment
            ? 'radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.16), transparent 60%)'
            : 'radial-gradient(circle at 20% 20%, rgba(57, 139, 255, 0.16), transparent 60%)',
        }}
      />

      {/* Stylized application window bar */}
      <div className="relative flex items-center justify-between border-b border-white/10 pb-2.5">
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="h-2 w-2 rounded-full bg-white/25" />
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="h-2 w-2 rounded-full bg-[#398BFF]/60" />
        </div>
        <span className="rounded-full border border-white/12 bg-[#101522]/90 px-2.5 py-0.5 text-[10px] font-medium tracking-wider text-[#A1A1AA] uppercase">
          Illustrative Mockup
        </span>
      </div>

      {/* Abstract module representation */}
      {isRecruitment ? (
        <div className="relative mt-4 grid grid-cols-3 gap-2.5">
          {[
            { icon: FileSearch, label: 'Resume Scan', accent: 'text-[#8B5CF6]' },
            { icon: Mail, label: 'Email API', accent: 'text-[#398BFF]' },
            { icon: MessageSquare, label: 'WhatsApp', accent: 'text-[#8B5CF6]' },
          ].map(({ icon: Icon, label, accent }) => (
            <div
              key={label}
              className="rounded-lg border border-white/10 bg-[#101522]/85 p-2.5 text-center"
            >
              <Icon className={`mx-auto h-4 w-4 ${accent}`} aria-hidden="true" />
              <p className="mt-1.5 truncate text-[11px] font-medium text-white/85">{label}</p>
            </div>
          ))}
          <div className="col-span-3 flex items-center justify-between rounded-lg border border-white/10 bg-[#101522]/70 px-3 py-2">
            <div className="flex items-center gap-2">
              <Calendar className="h-3.5 w-3.5 text-[#398BFF]" aria-hidden="true" />
              <span className="text-[11px] font-medium text-[#A1A1AA]">
                Interview Scheduling Workflow
              </span>
            </div>
            <span className="h-1.5 w-12 rounded-full bg-[#8B5CF6]/45" aria-hidden="true" />
          </div>
        </div>
      ) : (
        <div className="relative mt-4 grid grid-cols-2 gap-2.5">
          {[
            { label: 'Sales Module', color: 'bg-[#398BFF]/55' },
            { label: 'Purchase Module', color: 'bg-[#8B5CF6]/55' },
            { label: 'Manufacturing', color: 'bg-[#398BFF]/45' },
            { label: 'Accounting & Inventory', color: 'bg-[#8B5CF6]/45' },
          ].map(({ label, color }) => (
            <div
              key={label}
              className="rounded-lg border border-white/10 bg-[#101522]/85 p-2.5"
            >
              <div className="flex items-center justify-between">
                <Layers className="h-3.5 w-3.5 text-[#398BFF]" aria-hidden="true" />
                <span className={`h-1.5 w-8 rounded-full ${color}`} aria-hidden="true" />
              </div>
              <p className="mt-2 truncate text-[11px] font-medium text-white/85">{label}</p>
            </div>
          ))}
          <div className="col-span-2 flex items-center gap-2 rounded-lg border border-white/10 bg-[#101522]/65 px-3 py-1.5">
            <Server className="h-3.5 w-3.5 text-[#398BFF]" aria-hidden="true" />
            <span className="text-[11px] text-[#A1A1AA]">PHP &bull; MySQL &bull; AJAX Logic</span>
          </div>
        </div>
      )}
    </div>
  );
}


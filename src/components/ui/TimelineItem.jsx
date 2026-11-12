import { Building2, Calendar, CheckCircle2 } from 'lucide-react';
import GlassCard from './GlassCard';

/**
 * Reusable vertical timeline entry for professional experience.
 */
export default function TimelineItem({ item }) {
  const dateDisplay =
    item.startDate && item.endDate
      ? `${item.startDate} – ${item.endDate}`
      : item.duration || item.endDate;

  return (
    <div className="relative pl-9 sm:pl-12">
      {/* Timeline Node */}
      <span
        aria-hidden="true"
        className="absolute top-7 left-2.5 flex h-5 w-5 -translate-x-1/2 items-center justify-center rounded-full border border-[#398BFF]/60 bg-[#080A12] shadow-[0_0_14px_rgba(57,139,255,0.45)] sm:left-3"
      >
        <span className="h-2 w-2 rounded-full bg-[#398BFF]" />
      </span>

      <GlassCard interactive>
        <div className="flex flex-col justify-between gap-4 border-b border-white/10 pb-5 sm:flex-row sm:items-start">
          <div className="space-y-1.5">
            <h3 className="font-display text-xl font-bold text-white sm:text-2xl">
              {item.position}
            </h3>
            <div className="flex items-center gap-2 text-sm font-medium text-[#398BFF]">
              <Building2 className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{item.company}</span>
            </div>
          </div>

          {dateDisplay && (
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-[#8B5CF6]/35 bg-[#8B5CF6]/12 px-3.5 py-1.5 text-xs font-medium text-[#c4b5fd]">
              <Calendar className="h-3.5 w-3.5 text-[#8B5CF6]" aria-hidden="true" />
              <span>{dateDisplay}</span>
            </span>
          )}
        </div>

        {item.summary && (
          <p className="mt-4 text-sm leading-relaxed text-[#A1A1AA] sm:text-base">
            {item.summary}
          </p>
        )}

        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {item.responsibilities.map((resp) => (
            <li
              key={resp}
              className="flex items-start gap-2.5 text-sm leading-relaxed text-white/85"
            >
              <CheckCircle2
                className="mt-0.5 h-4 w-4 shrink-0 text-[#398BFF]"
                aria-hidden="true"
              />
              <span>{resp}</span>
            </li>
          ))}
        </ul>

        {item.technologies?.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2 border-t border-white/10 pt-4">
            {item.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-lg border border-white/12 bg-[#080A12]/75 px-3 py-1 text-xs font-medium text-[#A1A1AA] transition-colors hover:border-[#398BFF]/45 hover:text-white"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </GlassCard>
    </div>
  );
}

import { GraduationCap } from 'lucide-react';
import { educationList } from '../../data/education';
import Container from '../ui/Container';
import GlassCard from '../ui/GlassCard';
import SectionHeading from '../ui/SectionHeading';

/**
 * Editable Education & Certifications section driven by src/data/education.js.
 */
export default function Education() {
  return (
    <section id="education" className="section-shell">
      <Container>
        <SectionHeading
          eyebrow="Education"
          title="Academic & Technical Foundation"
          subtitle="Educational qualifications, technical learning, and verified certifications."
        />
        {educationList.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2">
            {educationList.map((entry) => (
              <GlassCard key={entry.id} interactive>
                <div className="flex items-start gap-3.5">
                  <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#398BFF]/35 bg-[#398BFF]/12 text-[#398BFF]">
                    <GraduationCap className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-white">
                      {entry.title}
                    </h3>
                    {entry.institution && (
                      <p className="mt-0.5 text-sm font-medium text-[#398BFF]">
                        {entry.institution}
                      </p>
                    )}
                    {entry.period && (
                      <p className="mt-1 text-xs text-[#A1A1AA]">{entry.period}</p>
                    )}
                    {entry.description && (
                      <p className="mt-3 text-sm leading-relaxed text-[#A1A1AA]">
                        {entry.description}
                      </p>
                    )}
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        ) : (
          <GlassCard className="flex items-center gap-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#398BFF]/30 bg-[#398BFF]/10 text-[#398BFF]">
              <GraduationCap className="h-5 w-5" aria-hidden="true" />
            </span>
            <p className="text-sm text-[#A1A1AA]">
              Academic qualifications and verified technical certifications will be published here.
            </p>
          </GlassCard>
        )}
      </Container>
    </section>
  );
}

import { useRef } from 'react';
import { Code2, Database, Layers, Server } from 'lucide-react';
import { personalInfo } from '../../data/personal';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import Container from '../ui/Container';
import GlassCard from '../ui/GlassCard';
import SectionHeading from '../ui/SectionHeading';

const FOCUS_HIGHLIGHTS = [
  {
    icon: Server,
    title: 'Backend Engineering',
    detail: 'Structured PHP business logic, RESTful endpoints, and dependable server workflows.',
  },
  {
    icon: Database,
    title: 'Relational Databases',
    detail: 'MySQL schema organization, data integrity, and practical query optimization.',
  },
  {
    icon: Layers,
    title: 'ERP & Web Modules',
    detail: 'End-to-end business features built for everyday operational reliability.',
  },
];

/**
 * About Me section featuring a split narrative and interactive dark-space developer visual card.
 */
export default function About() {
  const sectionRef = useRef(null);
  useScrollReveal(sectionRef);

  return (
    <section id="about" ref={sectionRef} className="section-shell">
      <Container>
        <SectionHeading
          eyebrow="About Me"
          title="Engineering Practical Software From the Backend Up"
          subtitle={personalInfo.positioning}
        />

        <div className="grid items-stretch gap-8 lg:grid-cols-12">
          {/* Narrative Column */}
          <GlassCard data-reveal interactive className="flex flex-col justify-between lg:col-span-7">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.16em] text-[#398BFF] uppercase">
                <Code2 className="h-4 w-4" aria-hidden="true" />
                <span>Developer Profile</span>
              </div>

              {personalInfo.aboutNarrative.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-base leading-relaxed text-[#A1A1AA] sm:text-[1.03rem]"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-8 border-t border-white/10 pt-5">
              <p className="text-xs font-medium tracking-[0.14em] text-[#A1A1AA] uppercase">
                Core Focus Areas
              </p>
              <div className="mt-3 flex flex-wrap gap-2.5">
                {personalInfo.focusAreas.map((area) => (
                  <span
                    key={area}
                    className="rounded-xl border border-[#398BFF]/30 bg-[#398BFF]/10 px-3.5 py-1.5 text-xs font-medium text-white transition-colors hover:border-[#398BFF]/60"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </GlassCard>

          {/* Space-Universe Visual Architecture Card */}
          <GlassCard
            data-reveal
            interactive
            className="relative flex flex-col justify-between overflow-hidden lg:col-span-5"
          >
            {/* Subtle orbital background ring inside visual card */}
            <div
              aria-hidden="true"
              className="pointer-events-none -top-14 -right-14 absolute h-48 w-48 rounded-full border border-[#398BFF]/20"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none -top-8 -right-8 absolute h-36 w-36 rounded-full border border-[#8B5CF6]/20"
            />

            <div className="relative flex items-center gap-4 border-b border-white/10 pb-5">
              <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-[#398BFF]/40 bg-[#398BFF]/12 font-display text-lg font-bold text-[#398BFF]">
                {personalInfo.initials}
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-white">
                  {personalInfo.name}
                </h3>
                <p className="text-sm font-medium text-[#8B5CF6]">{personalInfo.role}</p>
                <p className="text-xs text-[#A1A1AA]">{personalInfo.company}</p>
              </div>
            </div>

            <div className="relative mt-5 space-y-3.5">
              {FOCUS_HIGHLIGHTS.map(({ icon: Icon, title, detail }) => (
                <div
                  key={title}
                  className="group flex items-start gap-3.5 rounded-xl border border-white/10 bg-[#080A12]/65 p-3.5 transition-colors hover:border-[#398BFF]/40"
                >
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#398BFF]/30 bg-[#398BFF]/10 text-[#398BFF] transition-colors group-hover:bg-[#398BFF]/20">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div>
                    <h4 className="font-display text-sm font-semibold text-white">{title}</h4>
                    <p className="mt-0.5 text-xs leading-relaxed text-[#A1A1AA]">{detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </Container>
    </section>
  );
}

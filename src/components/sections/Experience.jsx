import { useRef } from 'react';
import { experienceList } from '../../data/experience';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import Container from '../ui/Container';
import SectionHeading from '../ui/SectionHeading';
import TimelineItem from '../ui/TimelineItem';

/**
 * Professional Experience section presenting career roles along a glowing vertical timeline.
 */
export default function Experience() {
  const sectionRef = useRef(null);
  useScrollReveal(sectionRef);

  return (
    <section id="experience" ref={sectionRef} className="section-shell">
      <Container>
        <SectionHeading
          eyebrow="Experience"
          title="Professional Experience"
          subtitle="Real-world backend engineering, ERP software modules, and business application workflows."
        />

        <div className="relative">
          {/* Vertical timeline spine */}
          <div
            aria-hidden="true"
            className="absolute top-2 bottom-2 left-2.5 w-px bg-gradient-to-b from-[#398BFF]/75 via-[#8B5CF6]/45 to-transparent sm:left-3"
          />

          <div className="space-y-8">
            {experienceList.map((item) => (
              <div key={item.id} data-reveal>
                <TimelineItem item={item} />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

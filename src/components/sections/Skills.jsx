import { useRef, useState } from 'react';
import { skillCategories } from '../../data/skills';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import Container from '../ui/Container';
import SectionHeading from '../ui/SectionHeading';
import SkillCard from '../ui/SkillCard';

/**
 * Technical Skills section featuring interactive category filters and iconized skill cards.
 */
export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const sectionRef = useRef(null);

  useScrollReveal(sectionRef);

  const visibleCategories =
    selectedCategory === 'all'
      ? skillCategories
      : skillCategories.filter((cat) => cat.id === selectedCategory);

  const filterTabs = [
    { id: 'all', label: 'All Skills' },
    ...skillCategories.map(({ id, label }) => ({ id, label })),
  ];

  return (
    <section id="skills" ref={sectionRef} className="section-shell">
      <Container>
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Technical Skills"
            title="Technologies & Engineering Toolkit"
            subtitle="Practical frontend, backend, database, and development tools used to build business applications."
            className="mb-0 lg:mb-0"
          />

          {/* Interactive Category Filter */}
          <div
            role="group"
            aria-label="Filter skills by category"
            className="flex flex-wrap gap-2"
          >
            {filterTabs.map((tab) => {
              const isActive = selectedCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`rounded-xl border px-3.5 py-2 text-xs font-medium transition-all duration-200 cursor-pointer sm:text-sm ${
                    isActive
                      ? 'border-[#398BFF]/60 bg-[#398BFF]/18 text-white shadow-[0_4px_16px_rgba(57,139,255,0.18)]'
                      : 'border-white/12 bg-[#101522]/65 text-[#A1A1AA] hover:border-white/25 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <div
          data-reveal
          className={`mt-10 grid gap-6 ${
            visibleCategories.length === 1
              ? 'max-w-xl grid-cols-1'
              : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
          }`}
        >
          {visibleCategories.map((category) => (
            <SkillCard key={category.id} category={category} />
          ))}
        </div>
      </Container>
    </section>
  );
}

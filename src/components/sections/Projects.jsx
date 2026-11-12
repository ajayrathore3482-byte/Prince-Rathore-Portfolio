import { useRef, useState } from 'react';
import { FolderCode } from 'lucide-react';
import { projectCategories, projectsList } from '../../data/projects';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import Container from '../ui/Container';
import GlassCard from '../ui/GlassCard';
import ProjectCard from '../ui/ProjectCard';
import ProjectModal from '../ui/ProjectModal';
import SectionHeading from '../ui/SectionHeading';

/**
 * Interactive Featured Projects showcase with category filters and accessible detail modal.
 */
export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeProject, setActiveProject] = useState(null);
  const sectionRef = useRef(null);

  useScrollReveal(sectionRef);

  const filteredProjects =
    selectedCategory === 'All'
      ? projectsList
      : projectsList.filter((project) => project.category === selectedCategory);

  return (
    <section id="projects" ref={sectionRef} className="section-shell">
      <Container>
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Portfolio"
            title="Featured Projects"
            subtitle="Some of the software and applications I've worked on."
            className="mb-0 lg:mb-0"
          />

          {/* Category Filter */}
          <div
            role="group"
            aria-label="Filter projects by category"
            className="flex flex-wrap gap-2"
          >
            {projectCategories.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-xl border px-3.5 py-2 text-xs font-medium transition-all duration-200 cursor-pointer sm:text-sm ${
                    isActive
                      ? 'border-[#398BFF]/60 bg-[#398BFF]/18 text-white shadow-[0_4px_16px_rgba(57,139,255,0.18)]'
                      : 'border-white/12 bg-[#101522]/65 text-[#A1A1AA] hover:border-white/25 hover:text-white'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        <div data-reveal className="mt-10">
          {filteredProjects.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2">
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onSelect={setActiveProject}
                />
              ))}
            </div>
          ) : (
            <GlassCard className="flex flex-col items-center py-12 text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#398BFF]/30 bg-[#398BFF]/10 text-[#398BFF]">
                <FolderCode className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold text-white">
                More Projects Coming Soon
              </h3>
              <p className="mt-2 max-w-md text-sm text-[#A1A1AA]">
                Personal development projects will appear here as they are published in{' '}
                <code className="text-[#398BFF]">src/data/projects.js</code>.
              </p>
            </GlassCard>
          )}
        </div>
      </Container>

      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </section>
  );
}

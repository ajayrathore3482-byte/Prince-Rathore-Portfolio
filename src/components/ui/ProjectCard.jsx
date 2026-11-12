import { ArrowUpRight, Eye, Github } from 'lucide-react';
import GlassCard from './GlassCard';
import PrimaryButton from './PrimaryButton';
import ProjectMockup from './ProjectMockup';

/**
 * Interactive project showcase card with illustrative mockup, tech tags, and detail trigger.
 */
export default function ProjectCard({ project, onSelect }) {
  const hasLiveUrl = Boolean(project.liveUrl?.trim());
  const hasGithubUrl = Boolean(project.githubUrl?.trim());

  return (
    <GlassCard interactive className="group flex h-full flex-col justify-between">
      <div>
        <ProjectMockup type={project.mockupType} title={project.title} />

        <div className="mt-5 flex flex-wrap items-center justify-between gap-2">
          <span className="inline-flex items-center rounded-full border border-[#8B5CF6]/35 bg-[#8B5CF6]/12 px-3 py-1 text-xs font-medium text-[#c4b5fd]">
            {project.category}
          </span>
          {project.role && (
            <span className="text-xs font-medium text-[#398BFF]">{project.role}</span>
          )}
        </div>

        <h3 className="mt-3 font-display text-xl font-bold text-white sm:text-2xl">
          {project.title}
        </h3>

        <p className="mt-2.5 text-sm leading-relaxed text-[#A1A1AA] sm:text-base">
          {project.description}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-lg border border-white/10 bg-[#080A12]/75 px-2.5 py-1 text-xs font-medium text-[#A1A1AA] transition-colors group-hover:border-[#398BFF]/30 group-hover:text-white/90"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-white/10 pt-5">
        <PrimaryButton
          size="sm"
          icon={Eye}
          onClick={() => onSelect(project)}
          aria-label={`View details for ${project.title}`}
        >
          View Details
        </PrimaryButton>

        {hasLiveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-xl border border-white/12 bg-[#080A12]/70 px-3.5 py-2 text-sm font-medium text-white transition-colors hover:border-[#398BFF]/55 hover:text-[#398BFF]"
          >
            <span>Live Demo</span>
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        )}

        {hasGithubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-xl border border-white/12 bg-[#080A12]/70 px-3.5 py-2 text-sm font-medium text-white transition-colors hover:border-[#398BFF]/55 hover:text-[#398BFF]"
          >
            <Github className="h-4 w-4" aria-hidden="true" />
            <span>GitHub</span>
          </a>
        )}
      </div>
    </GlassCard>
  );
}


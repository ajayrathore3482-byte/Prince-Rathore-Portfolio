import { useEffect, useRef } from 'react';
import { ArrowUpRight, CheckCircle2, Github, Layers, UserCheck, X } from 'lucide-react';
import ProjectMockup from './ProjectMockup';

/**
 * Accessible modal presenting full project overview, role, tech stack, features, and contributions.
 */
export default function ProjectModal({ project, onClose }) {
  const closeButtonRef = useRef(null);
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!project) {
      return undefined;
    }

    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }

      if (event.key === 'Tab' && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      if (previousFocus && typeof previousFocus.focus === 'function') {
        previousFocus.focus();
      }
    };
  }, [project, onClose]);

  if (!project) {
    return null;
  }

  const hasLiveUrl = Boolean(project.liveUrl?.trim());
  const hasGithubUrl = Boolean(project.githubUrl?.trim());

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm sm:p-6"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        className="glass-surface-scrolled relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl p-6 sm:p-8"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-5">
          <div>
            <span className="inline-flex items-center rounded-full border border-[#8B5CF6]/35 bg-[#8B5CF6]/12 px-3 py-1 text-xs font-medium text-[#c4b5fd]">
              {project.category}
            </span>
            <h3
              id="project-modal-title"
              className="mt-3 font-display text-2xl font-bold text-white sm:text-3xl"
            >
              {project.title}
            </h3>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close project details"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/12 bg-[#080A12]/80 text-[#A1A1AA] transition-colors hover:border-[#398BFF]/55 hover:text-white cursor-pointer"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        {/* Illustrative Visual */}
        <div className="mt-5">
          <ProjectMockup type={project.mockupType} title={project.title} />
        </div>

        {/* Overview & Role */}
        <div className="mt-6 space-y-5">
          <div>
            <h4 className="font-display text-sm font-semibold tracking-wider text-[#398BFF] uppercase">
              Project Overview
            </h4>
            <p className="mt-2 text-sm leading-relaxed text-[#A1A1AA] sm:text-base">
              {project.description}
            </p>
          </div>

          {project.role && (
            <div className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-[#080A12]/65 px-4 py-3">
              <UserCheck className="h-4 w-4 shrink-0 text-[#398BFF]" aria-hidden="true" />
              <div className="text-sm">
                <span className="text-[#A1A1AA]">My Role: </span>
                <span className="font-semibold text-white">{project.role}</span>
              </div>
            </div>
          )}

          {/* Technologies */}
          <div>
            <h4 className="font-display text-sm font-semibold tracking-wider text-[#398BFF] uppercase">
              Technologies Used
            </h4>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-lg border border-white/12 bg-[#080A12]/75 px-3 py-1 text-xs font-medium text-white/90"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Key Features */}
          {project.features?.length > 0 && (
            <div>
              <h4 className="flex items-center gap-2 font-display text-sm font-semibold tracking-wider text-[#398BFF] uppercase">
                <Layers className="h-4 w-4" aria-hidden="true" />
                <span>Key Features</span>
              </h4>
              <ul className="mt-2.5 grid gap-2 sm:grid-cols-2">
                {project.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2 rounded-lg border border-white/10 bg-[#080A12]/55 px-3 py-2 text-sm text-white/85"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#8B5CF6]" aria-hidden="true" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Contributions */}
          {project.contributions?.length > 0 && (
            <div>
              <h4 className="font-display text-sm font-semibold tracking-wider text-[#398BFF] uppercase">
                My Contributions
              </h4>
              <ul className="mt-2.5 space-y-2">
                {project.contributions.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm leading-relaxed text-[#A1A1AA]"
                  >
                    <CheckCircle2
                      className="mt-0.5 h-4 w-4 shrink-0 text-[#398BFF]"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Conditional External Links */}
          {(hasLiveUrl || hasGithubUrl) && (
            <div className="flex flex-wrap gap-3 border-t border-white/10 pt-5">
              {hasLiveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#398BFF] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#2b7cf0]"
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
                  className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-[#080A12]/80 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:border-[#398BFF]/55"
                >
                  <Github className="h-4 w-4" aria-hidden="true" />
                  <span>GitHub Repository</span>
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

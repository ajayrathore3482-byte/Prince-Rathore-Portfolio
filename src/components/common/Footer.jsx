import { ArrowUp } from 'lucide-react';
import { personalInfo } from '../../data/personal';
import Container from '../ui/Container';
import SocialLinks from '../ui/SocialLinks';

/**
 * Site footer displaying Prince Rathore, Backend Developer role & positioning,
 * location, configured social links, dynamic copyright year, and back-to-top button.
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 border-t border-white/12 bg-[#080A12]/90 py-10 backdrop-blur-md">
      <Container className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <div>
          <p className="font-display text-lg font-semibold text-white">{personalInfo.name}</p>
          <p className="mt-1 text-sm text-[#A1A1AA]">
            {personalInfo.role} &bull; {personalInfo.location}
          </p>
          <p className="mt-1 text-xs text-[#398BFF]/90">{personalInfo.positioning}</p>
          <p className="mt-2 text-xs text-[#A1A1AA]/80">
            &copy; {currentYear} {personalInfo.name}. All rights reserved.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <SocialLinks size="md" />

          <button
            type="button"
            onClick={handleBackToTop}
            aria-label="Back to top"
            className="inline-flex h-10 items-center gap-2 rounded-xl border border-white/12 bg-[#101522]/80 px-4 text-xs font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:border-[#398BFF]/55 hover:bg-[#398BFF]/12 cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="h-3.5 w-3.5 text-[#398BFF]" aria-hidden="true" />
          </button>
        </div>
      </Container>
    </footer>
  );
}

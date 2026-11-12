import { ChevronDown } from 'lucide-react';

/**
 * Subtle scroll indicator encouraging exploration below the Hero viewport.
 */
export default function ScrollIndicator({ targetId = 'about', label = 'Scroll to explore' }) {
  const handleClick = (event) => {
    event.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <a
      href={`#${targetId}`}
      onClick={handleClick}
      aria-label={label}
      className="group inline-flex flex-col items-center gap-2 text-xs font-medium tracking-[0.18em] text-[#A1A1AA] uppercase transition-colors hover:text-white"
    >
      <span className="flex h-8 w-5 items-start justify-center rounded-full border border-white/20 bg-[#101522]/60 p-1.5 transition-colors group-hover:border-[#398BFF]/60">
        <span className="animate-scroll-wheel h-1.5 w-1 rounded-full bg-[#398BFF]" aria-hidden="true" />
      </span>
      <span className="inline-flex items-center gap-1">
        <span>Explore</span>
        <ChevronDown className="h-3.5 w-3.5 text-[#398BFF] transition-transform group-hover:translate-y-0.5" aria-hidden="true" />
      </span>
    </a>
  );
}


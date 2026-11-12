import { useEffect, useMemo, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { navigationLinks, personalInfo } from '../../data/personal';
import { useActiveSection } from '../../hooks/useActiveSection';
import Container from '../ui/Container';

/**
 * Floating navigation bar with active section indicator, scroll-triggered glassmorphism, and mobile drawer.
 */
export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef(null);

  const sectionIds = useMemo(() => navigationLinks.map((item) => item.id), []);
  const activeSection = useActiveSection(sectionIds, 'home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };

    const handlePointerDown = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handlePointerDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handlePointerDown);
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (event, id) => {
    event.preventDefault();
    setMobileMenuOpen(false);

    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="fixed inset-x-0 top-0 z-40 pt-3.5 sm:pt-4">
      <Container>
        <nav
          ref={navRef}
          aria-label="Primary Navigation"
          className={`rounded-2xl px-4 py-2.5 transition-all duration-300 sm:px-6 ${
            isScrolled
              ? 'glass-surface-scrolled'
              : 'border border-white/10 bg-[#080A12]/45 backdrop-blur-md'
          }`}
        >
          <div className="flex items-center justify-between gap-4">
            {/* Brand Identity */}
            <a
              href="#home"
              onClick={(event) => handleNavClick(event, 'home')}
              className="group flex items-center gap-2.5 rounded-lg py-1 text-white transition-colors hover:text-[#398BFF]"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#398BFF]/40 bg-[#398BFF]/12 font-display text-sm font-bold text-[#398BFF] transition-colors group-hover:border-[#398BFF] group-hover:bg-[#398BFF]/20">
                {personalInfo.initials}
              </span>
              <span className="font-display text-base font-semibold tracking-tight sm:text-lg">
                {personalInfo.name}
              </span>
            </a>

            {/* Desktop Links */}
            <ul className="hidden items-center gap-1 md:flex">
              {navigationLinks.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      onClick={(event) => handleNavClick(event, item.id)}
                      aria-current={isActive ? 'location' : undefined}
                      className={`relative rounded-xl px-3.5 py-2 text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? 'bg-[#398BFF]/14 text-white'
                          : 'text-[#A1A1AA] hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      {item.label}
                      {isActive && (
                        <span
                          aria-hidden="true"
                          className="absolute inset-x-3.5 bottom-1 h-0.5 rounded-full bg-[#398BFF]"
                        />
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-drawer"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/12 bg-[#101522]/80 text-white transition-colors hover:border-[#398BFF]/55 md:hidden cursor-pointer"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>

          {/* Mobile Drawer */}
          {mobileMenuOpen && (
            <div
              id="mobile-navigation-drawer"
              className="mt-3 border-t border-white/10 pt-3 md:hidden"
            >
              <ul className="flex flex-col gap-1">
                {navigationLinks.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        onClick={(event) => handleNavClick(event, item.id)}
                        aria-current={isActive ? 'location' : undefined}
                        className={`flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
                          isActive
                            ? 'border border-[#398BFF]/35 bg-[#398BFF]/14 text-white'
                            : 'text-[#A1A1AA] hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        <span>{item.label}</span>
                        {isActive && (
                          <span className="h-1.5 w-1.5 rounded-full bg-[#398BFF]" aria-hidden="true" />
                        )}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </nav>
      </Container>
    </header>
  );
}

import { Suspense, lazy } from 'react';
import { ArrowRight, Download, Mail, MapPin } from 'lucide-react';
import { personalInfo } from '../../data/personal';
import { useDeviceTier } from '../../hooks/useDeviceTier';
import ErrorBoundary from '../common/ErrorBoundary';
import Button from '../common/Button';
import WebGLFallback from '../three/WebGLFallback';
import Container from '../ui/Container';
import PrimaryButton from '../ui/PrimaryButton';
import SecondaryButton from '../ui/SecondaryButton';
import SocialLinks from '../ui/SocialLinks';
import ScrollIndicator from '../ui/ScrollIndicator';

const Scene = lazy(() => import('../three/Scene'));

/**
 * Full-screen Hero section pairing unobstructed typography/CTAs with a lazy-loaded 3D space scene.
 */
export default function Hero() {
  const { tier, webglSupported, prefersReducedMotion } = useDeviceTier();
  const hasResume = Boolean(personalInfo.resumeUrl?.trim());

  return (
    <section
      id="home"
      aria-label="Introduction"
      className="relative flex min-h-screen flex-col justify-between pt-28 pb-10 sm:pt-32"
    >
      <Container className="my-auto grid items-center gap-10 lg:grid-cols-12 lg:gap-8">
        {/* Primary Hero Content: stays strictly unobstructed and interactive */}
        <div className="relative z-20 space-y-6 lg:col-span-7">
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-[#398BFF]/30 bg-[#398BFF]/10 px-4 py-1.5 text-xs font-medium tracking-[0.12em] text-[#398BFF] uppercase">
              <span className="h-2 w-2 rounded-full bg-[#398BFF]" aria-hidden="true" />
              <span>
                {personalInfo.role} &bull; {personalInfo.company}
              </span>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-[#101522]/75 px-3.5 py-1.5 text-xs font-medium text-[#A1A1AA]">
              <MapPin className="h-3.5 w-3.5 text-[#8B5CF6]" aria-hidden="true" />
              <span>{personalInfo.location}</span>
            </span>
          </div>

          <div className="space-y-3">
            <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {personalInfo.name.toUpperCase()}
            </h1>
            <p className="font-display text-xl font-medium text-[#8B5CF6] sm:text-2xl">
              {personalInfo.role}
            </p>
            <p className="text-xs font-medium tracking-wider text-[#398BFF] uppercase sm:text-sm">
              {personalInfo.positioning}
            </p>
          </div>

          <p className="text-lg font-medium text-white/95 sm:text-xl">
            &ldquo;{personalInfo.tagline}&rdquo;
          </p>

          <p className="max-w-xl text-base leading-relaxed text-[#A1A1AA] sm:text-lg">
            {personalInfo.intro}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <PrimaryButton href="#projects" size="lg" iconRight={ArrowRight}>
              Explore My Work
            </PrimaryButton>
            <SecondaryButton href="#contact" size="lg" icon={Mail}>
              Contact Me
            </SecondaryButton>
            {hasResume && (
              <Button
                href={personalInfo.resumeUrl}
                download={personalInfo.resumeDownloadFilename}
                variant="ghost"
                size="lg"
                icon={Download}
              >
                Download Resume
              </Button>
            )}
          </div>

          <div className="pt-2">
            <SocialLinks size="md" showLabels />
          </div>
        </div>

        {/* Dedicated 3D Canvas Viewport with ErrorBoundary, Suspense, and WebGL Fallback */}
        <div className="relative z-10 h-[300px] w-full sm:h-[380px] lg:col-span-5 lg:h-[460px]">
          {webglSupported ? (
            <ErrorBoundary fallback={<WebGLFallback reducedMotion={prefersReducedMotion} />}>
              <Suspense fallback={<WebGLFallback reducedMotion={prefersReducedMotion} />}>
                <Scene tier={tier} reducedMotion={prefersReducedMotion} />
              </Suspense>
            </ErrorBoundary>
          ) : (
            <WebGLFallback reducedMotion={prefersReducedMotion} />
          )}
        </div>
      </Container>

      <div className="relative z-20 mt-8 flex justify-center">
        <ScrollIndicator targetId="about" />
      </div>
    </section>
  );
}

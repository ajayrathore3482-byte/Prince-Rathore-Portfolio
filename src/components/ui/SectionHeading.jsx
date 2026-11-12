/**
 * Section heading featuring an eyebrow badge, Space Grotesk title, and concise subtitle.
 */
export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  className = '',
}) {
  const alignmentClasses =
    align === 'center' ? 'mx-auto text-center items-center' : 'text-left items-start';

  return (
    <div className={`mb-10 flex max-w-2xl flex-col gap-3 sm:mb-14 ${alignmentClasses} ${className}`.trim()}>
      {eyebrow && (
        <span className="inline-flex items-center gap-2 rounded-full border border-[#398BFF]/30 bg-[#398BFF]/10 px-3.5 py-1 text-xs font-medium tracking-[0.14em] text-[#398BFF] uppercase">
          <span className="h-1.5 w-1.5 rounded-full bg-[#8B5CF6]" aria-hidden="true" />
          {eyebrow}
        </span>
      )}
      <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-[2.625rem] lg:leading-[1.15]">
        {title}
      </h2>
      {subtitle && (
        <p className="text-base leading-relaxed text-[#A1A1AA] sm:text-lg">{subtitle}</p>
      )}
    </div>
  );
}

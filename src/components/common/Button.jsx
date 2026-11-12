/**
 * Shared button/link primitive implementing consistent sizing, accessible focus rings, and icon slots.
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  type = 'button',
  className = '',
  icon: Icon,
  iconRight: IconRight,
  ...props
}) {
  const baseClasses =
    'inline-flex items-center justify-center gap-2 rounded-xl font-medium tracking-tight transition-all duration-200 cursor-pointer select-none disabled:opacity-50 disabled:cursor-not-allowed';

  const variantClasses = {
    primary:
      'bg-[#398BFF] text-white hover:bg-[#2b7cf0] hover:-translate-y-0.5 shadow-[0_6px_20px_rgba(57,139,255,0.22)] hover:shadow-[0_10px_28px_rgba(57,139,255,0.3)]',
    secondary:
      'border border-white/15 bg-[#101522]/75 text-white backdrop-blur-md hover:border-[#8B5CF6]/55 hover:bg-[#101522] hover:-translate-y-0.5',
    violet:
      'bg-[#8B5CF6] text-white hover:bg-[#7c4dff] hover:-translate-y-0.5 shadow-[0_6px_20px_rgba(139,92,246,0.22)]',
    outline:
      'border border-white/15 bg-[#101522]/70 text-white hover:border-[#398BFF]/60 hover:bg-[#101522]',
    ghost:
      'border border-transparent text-[#A1A1AA] hover:border-white/10 hover:bg-white/5 hover:text-white',
  };

  const sizeClasses = {
    sm: 'px-3.5 py-2 text-sm',
    md: 'px-5 py-2.5 text-sm sm:text-base',
    lg: 'px-6 py-3 text-base',
  };

  const combinedClasses = `${baseClasses} ${variantClasses[variant] || variantClasses.primary} ${
    sizeClasses[size] || sizeClasses.md
  } ${className}`.trim();

  const content = (
    <>
      {Icon && <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />}
      <span>{children}</span>
      {IconRight && <IconRight className="h-4 w-4 shrink-0" aria-hidden="true" />}
    </>
  );

  if (href) {
    return (
      <a href={href} className={combinedClasses} {...props}>
        {content}
      </a>
    );
  }

  return (
    <button type={type} className={combinedClasses} {...props}>
      {content}
    </button>
  );
}

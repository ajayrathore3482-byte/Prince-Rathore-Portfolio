/**
 * Reusable glassmorphism surface container with optional interactive hover lift.
 */
export default function GlassCard({
  children,
  interactive = false,
  padding = 'md',
  as: Component = 'div',
  className = '',
  ...props
}) {
  const paddingClasses = {
    none: 'p-0',
    sm: 'p-4 sm:p-5',
    md: 'p-6 sm:p-7',
    lg: 'p-7 sm:p-9',
  };

  return (
    <Component
      className={`glass-card ${interactive ? 'glass-card-interactive' : ''} ${
        paddingClasses[padding] || paddingClasses.md
      } ${className}`.trim()}
      {...props}
    >
      {children}
    </Component>
  );
}

/**
 * Responsive layout container enforcing consistent max-width and horizontal gutters across breakpoints.
 */
export default function Container({
  children,
  size = 'default',
  as: Component = 'div',
  className = '',
  ...props
}) {
  const sizeClasses = {
    narrow: 'max-w-4xl',
    default: 'max-w-7xl',
    wide: 'max-w-[88rem]',
  };

  return (
    <Component
      className={`mx-auto w-full px-5 sm:px-8 lg:px-10 ${sizeClasses[size] || sizeClasses.default} ${className}`.trim()}
      {...props}
    >
      {children}
    </Component>
  );
}


import Button from '../common/Button';

/**
 * Secondary glassmorphic button/link with subtle violet hover border.
 */
export default function SecondaryButton({ children, variant = 'secondary', ...props }) {
  return (
    <Button variant={variant} {...props}>
      {children}
    </Button>
  );
}


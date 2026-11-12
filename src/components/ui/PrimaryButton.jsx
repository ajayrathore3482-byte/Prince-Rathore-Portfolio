import Button from '../common/Button';

/**
 * Primary electric-blue call-to-action button/link.
 */
export default function PrimaryButton({ children, ...props }) {
  return (
    <Button variant="primary" {...props}>
      {children}
    </Button>
  );
}


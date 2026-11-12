import { Github, Linkedin, Mail } from 'lucide-react';
import { personalInfo } from '../../data/personal';
import { isValidConfiguredUrl } from '../../utils/validators';

/**
 * Displays configured GitHub, LinkedIn, and Email links.
 * Links without valid configured URLs are omitted to avoid fake or broken links.
 */
export default function SocialLinks({
  size = 'md',
  showLabels = false,
  className = '',
}) {
  const emailValue = personalInfo.contact?.email?.trim();

  const candidates = [
    {
      id: 'github',
      label: 'GitHub',
      href: personalInfo.socials?.github?.trim() || '',
      icon: Github,
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      href: personalInfo.socials?.linkedin?.trim() || '',
      icon: Linkedin,
    },
    {
      id: 'email',
      label: 'Email',
      href: emailValue ? `mailto:${emailValue}` : '',
      icon: Mail,
    },
  ];

  const validItems = candidates.filter((item) => isValidConfiguredUrl(item.href));

  if (validItems.length === 0) {
    return null;
  }

  const sizeClasses =
    size === 'sm'
      ? showLabels
        ? 'h-9 px-3 text-xs'
        : 'h-9 w-9'
      : showLabels
        ? 'h-10 px-4 text-sm'
        : 'h-10 w-10';

  return (
    <div className={`flex flex-wrap items-center gap-2.5 ${className}`.trim()}>
      {validItems.map(({ id, label, href, icon: Icon }) => {
        const isExternal = !href.startsWith('mailto:');

        return (
          <a
            key={id}
            href={href}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noopener noreferrer' : undefined}
            aria-label={label}
            className={`inline-flex items-center justify-center gap-2 rounded-xl border border-white/12 bg-[#101522]/75 text-[#A1A1AA] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#398BFF]/55 hover:text-white ${sizeClasses}`}
          >
            <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
            {showLabels && <span className="font-medium">{label}</span>}
          </a>
        );
      })}
    </div>
  );
}
